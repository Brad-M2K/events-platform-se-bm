import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

afterAll(async () => {
    await prisma.$disconnect()
})

describe('Database seed', () => {
    test('seeds the expected number of events', async () => {
        const eventCount = await prisma.event.count()

        expect(eventCount).toBe(34)
    })

    test('gives every seeded event at least one signup', async () => {
        const eventsWithoutSignups = await prisma.event.findMany({
        where: { signups: { none: {} } },
        })

        expect(eventsWithoutSignups).toHaveLength(0)
    })
})

describe('Event model', () => {
    test('seeded event has required fields and defaults', async () => {
        const event = await prisma.event.findFirst({ include: { signups: true } })

        expect(event).not.toBeNull()

        expect(event).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        dateTime: expect.any(Date),
        durationMins: expect.any(Number),
        location: expect.any(String),
        capacity: expect.any(Number),
        })
        expect(event!.createdAt).toBeInstanceOf(Date)
        expect(event!.capacity).toBeGreaterThan(0)
        expect(event!.durationMins).toBeGreaterThan(0)
        expect(event!.signups.length).toBeGreaterThan(0)
    })

    test('seed populates optional fields (imageUrl, category)', async () => {
        const event = await prisma.event.findFirst({
        select: { imageUrl: true, category: true },
        })

        expect(event).not.toBeNull()

        expect(typeof event!.imageUrl).toBe('string')
        expect(event!.imageUrl!.trim().length).toBeGreaterThan(0)
        expect(typeof event!.category).toBe('string')
        expect(event!.category!.trim().length).toBeGreaterThan(0)
    })

    test('allows creating an event without optional fields', async () => {
        const newEventData = {
        title: 'Test Event Without Optionals',
        description: 'Ensures optional fields truly are optional.',
        dateTime: new Date('2030-01-01T12:00:00Z'),
        durationMins: 90,
        location: 'Testville',
        capacity: 25,
        }

        const createdEvent = await prisma.event.create({ data: newEventData })

        try {
        expect(createdEvent.imageUrl).toBeNull()
        expect(createdEvent.category).toBeNull()
        expect(createdEvent.createdAt).toBeInstanceOf(Date)
        } finally {
        await prisma.event.delete({ where: { id: createdEvent.id } })
        }
    })
})

describe('Signup model', () => {
    test('seeded signup has required fields and defaults', async () => {
        const signup = await prisma.signup.findFirst()

        expect(signup).not.toBeNull()

        expect(signup).toMatchObject({
        id: expect.any(String),
        eventId: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        })
        expect(signup!.createdAt).toBeInstanceOf(Date)
    })

    test('must reference an existing event (FK integrity)', async () => {
        await expect(
        prisma.signup.create({
            data: {
            eventId: 'nonexistent-id',
            name: 'Fake User',
            email: 'fake@test.com',
            },
        }),
        ).rejects.toMatchObject({ code: 'P2003' })
    })

    test('enforces unique email per event', async () => {
        const event = await prisma.event.create({
        data: {
            title: 'Signup Uniqueness Event',
            description: 'Used to test unique constraint per event.',
            dateTime: new Date('2030-02-01T18:00:00Z'),
            durationMins: 60,
            location: 'Constraint City',
            capacity: 40,
        },
        })

        const sharedEmail = 'unique-per-event@test.com'

        try {
        await prisma.signup.create({
            data: {
            eventId: event.id,
            name: 'First Attendee',
            email: sharedEmail,
            },
        })

        await expect(
            prisma.signup.create({
            data: {
                eventId: event.id,
                name: 'Second Attendee',
                email: sharedEmail,
            },
            }),
        ).rejects.toMatchObject({ code: 'P2002' })
        } finally {
        await prisma.signup.deleteMany({ where: { eventId: event.id } })
        await prisma.event.delete({ where: { id: event.id } })
        }
    })

    test('allows the same email to signup for different events', async () => {
        const email = 'shared-across-events@test.com'

        const [eventA, eventB] = await Promise.all([
        prisma.event.create({
            data: {
            title: 'Email Sharing Event A',
            description: 'First event for shared email test.',
            dateTime: new Date('2030-03-01T12:00:00Z'),
            durationMins: 120,
            location: 'Hall A',
            capacity: 75,
            },
        }),
        prisma.event.create({
            data: {
            title: 'Email Sharing Event B',
            description: 'Second event for shared email test.',
            dateTime: new Date('2030-03-02T12:00:00Z'),
            durationMins: 120,
            location: 'Hall B',
            capacity: 75,
            },
        }),
        ])

        try {
        const signupForEventA = await prisma.signup.create({
            data: {
            eventId: eventA.id,
            name: 'Shared Email User',
            email,
            },
        })

        const signupForEventB = await prisma.signup.create({
            data: {
            eventId: eventB.id,
            name: 'Shared Email User',
            email,
            },
        })

        expect(signupForEventA.email).toBe(email)
        expect(signupForEventB.email).toBe(email)
        } finally {
        await prisma.signup.deleteMany({ where: { email } })
        await prisma.event.deleteMany({ where: { id: { in: [eventA.id, eventB.id] } } })
        }
    })

    test('prevents deleting an event that still has signups', async () => {
        const event = await prisma.event.create({
        data: {
            title: 'Deletion Guard Event',
            description: 'Verifies FK restriction when deleting events with signups.',
            dateTime: new Date('2030-04-01T10:00:00Z'),
            durationMins: 45,
            location: 'Guarded Venue',
            capacity: 30,
        },
        })

        await prisma.signup.create({
        data: {
            eventId: event.id,
            name: 'Protected Signup',
            email: 'protected@test.com',
        },
        })

        await expect(
        prisma.event.delete({
            where: { id: event.id },
        }),
        ).rejects.toMatchObject({ code: 'P2003' })

        await prisma.signup.deleteMany({ where: { eventId: event.id } })
        await prisma.event.delete({ where: { id: event.id } })
    })
})

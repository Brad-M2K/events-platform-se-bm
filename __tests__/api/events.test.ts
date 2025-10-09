import { PrismaClient } from '@prisma/client'

import { GET as getEvents } from '@/app/api/events/route'
import { GET as getEvent} from '@/app/api/events/[id]/route'

const prisma = new PrismaClient()

afterAll(async () => {
    await prisma.$disconnect()
})


describe('/api/events', () => {
    
    describe('GET', () => {
        test('returns 200 status', async () => {
            
            const response = await getEvents()
            
            expect(response.status).toBe(200)
        })

        test('returns list of events', async () => {
            const response = await getEvents();
            const data = await response.json();


            expect(Array.isArray(data)).toEqual(true)
        })

        test('sorts by date by dateTime asc', async () => {
            const response = await getEvents()
            const data = await response.json()

            const first = new Date(data[0].dateTime).getTime()
            const last = new Date(data[data.length - 1].dateTime).getTime()
            
            expect(first).toBeLessThanOrEqual(last)
        })

        test('includes required fields on each event', async () => {
            const response = await getEvents()
            const data = await response.json()

            expect(data.length).toBeGreaterThan(0)

            expect(data[0]).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    description: expect.any(String),
                    dateTime: expect.any(String),
                    durationMins: expect.any(Number),
                    location: expect.any(String),
                    capacity: expect.any(Number),
                    available: expect.any(Number),
                }),
            )
        })

        test('dateTime values are ISO strings', async () => {
            const response = await getEvents()
            const data = await response.json()

            const sample = data[0]

            expect(new Date(sample.dateTime).toString()).not.toBe('Invalid Date')
        })

        test('available matches capacity minus signups', async () => {
            const fromDb = await prisma.event.findFirst({
                include: { _count: { select: { signups: true } } },
            })

            expect(fromDb).not.toBeNull()

            const response = await getEvents()
            const data = await response.json()

            const match = data.find((event: any) => event.id === fromDb!.id)

            expect(match).toBeDefined()
            expect(match.available).toBe(
                Math.max(fromDb!.capacity - fromDb!._count.signups, 0),
            )
        })

    })

    describe(' /api/events/:id', () => {

        describe('GET', () => {
            test('returns 200 status', async () => {
                const found = await prisma.event.findFirst({ select: { id: true } })
                const id = found!.id
    
                const response = await getEvent(undefined, { params: { id } })

                expect(response.status).toBe(200)
            })
    
            test('returns single event by id', async () => {
                const found = await prisma.event.findFirst({ select: { id: true } })
                const id = found!.id

                const response = await getEvent(undefined, { params: { id } })
                const data = await response.json()

                expect(data).toHaveProperty('id', id)
                expect(data).toEqual(
                    expect.objectContaining({
                        title: expect.any(String),
                        description: expect.any(String),
                        dateTime: expect.any(String),
                        durationMins: expect.any(Number),
                        location: expect.any(String),
                        capacity: expect.any(Number),
                        available: expect.any(Number),
                    }),
                )
            })

            test('single event dateTime is ISO string', async () => {
                const found = await prisma.event.findFirst({ select: { id: true } })
                const id = found!.id

                const response = await getEvent(undefined, { params: { id } })
                const data = await response.json()

                expect(new Date(data.dateTime).toString()).not.toBe('Invalid Date')
            })

            test('single event available matches capacity minus signups', async () => {
                const found = await prisma.event.findFirst({ select: { id: true } })
                const id = found!.id

                const response = await getEvent(undefined, { params: { id } })
                const data = await response.json()

                const fromDb = await prisma.event.findUnique({
                    where: { id },
                    include: { _count: { select: { signups: true } } },
                })

                expect(fromDb).not.toBeNull()
                expect(data.available).toBe(
                    Math.max(fromDb!.capacity - fromDb!._count.signups, 0),
                )
            })

            test('returns 404 for invalid id', async () => {
                const badId = '00000000-0000-0000-0000-000000000000'
    
                const response = await getEvent(undefined, { params: { id: badId } })
                
                expect(response.status).toBe(404)
            })
        })
    })

})

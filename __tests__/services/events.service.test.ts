import { PrismaClient } from '@prisma/client'

import { createEvent, getEventById, listEvents, signupForEvent } from '@/server/services/events.service'
import { NotFoundError } from '@/server/errors'

const prisma = new PrismaClient()

afterAll(async () => {
  await prisma.$disconnect()
})

describe('events.service', () => {
  test('listEvents returns events ordered by date with availability and time fields', async () => {
    const events = await listEvents()

    expect(Array.isArray(events)).toBe(true)
    expect(events.length).toBeGreaterThan(0)

    const timestamps = events.map((event) => new Date(event.dateTime).getTime())
    const sorted = [...timestamps].sort((a, b) => a - b)

    expect(timestamps).toEqual(sorted)

    const sample = events[0]
    const fromDb = await prisma.event.findUnique({
      where: { id: sample.id },
      include: { _count: { select: { signups: true } } },
    })

    expect(fromDb).not.toBeNull()
    expect(sample.available).toBe(Math.max(fromDb!.capacity - fromDb!._count.signups, 0))
    expect(sample.endDateTime).toEqual(expect.any(String))
    expect(sample.startTime).toMatch(/\d{2}:\d{2}/)
    expect(sample.endTime).toMatch(/\d{2}:\d{2}/)
    expect(sample).toHaveProperty('price')
    expect(sample.price === null || typeof sample.price === 'number').toBe(true)

    const start = new Date(sample.dateTime).getTime()
    const end = new Date(sample.endDateTime).getTime()
    expect(end).toBeGreaterThan(start)
  })

  test('getEventById returns the matching event with derived time fields', async () => {
    const existing = await prisma.event.findFirst({ select: { id: true } })
    const event = await getEventById(existing!.id)

    expect(event.id).toBe(existing!.id)
    expect(event.dateTime).toEqual(expect.any(String))
    expect(event.available).toEqual(expect.any(Number))
    expect(event.endDateTime).toEqual(expect.any(String))
    expect(event.startTime).toMatch(/\d{2}:\d{2}/)
    expect(event.endTime).toMatch(/\d{2}:\d{2}/)
    expect(new Date(event.endDateTime).getTime()).toBeGreaterThan(new Date(event.dateTime).getTime())
    expect(event.price === null || typeof event.price === 'number').toBe(true)
  })

  test('getEventById throws for unknown ids', async () => {
    await expect(
      getEventById('00000000-0000-0000-0000-000000000000'),
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  test('signupForEvent persists a signup record', async () => {
    const existing = await prisma.event.findFirst({ select: { id: true } })

    const signup = await signupForEvent(existing!.id, {
      name: 'Service Test User',
      email: `service-test-${Date.now()}@example.com`,
    })

    expect(signup).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        eventId: existing!.id,
        name: 'Service Test User',
      }),
    )
  })

  test('createEvent persists and normalises event data', async () => {
    const input = {
      title: 'API Created Event',
      description: 'Created during tests',
      dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      durationMins: 120,
      location: 'Test Lab',
      capacity: 50,
      price: 25,
      imageUrl: 'https://example.com/test.jpg',
      category: 'Testing',
    }

    const created = await createEvent(input)

    expect(created).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: input.title,
        description: input.description,
        durationMins: input.durationMins,
        capacity: input.capacity,
        price: input.price,
        imageUrl: input.imageUrl,
        category: input.category,
        available: input.capacity,
      }),
    )

    const fromDb = await prisma.event.findUnique({ where: { id: created.id } })
    expect(fromDb).not.toBeNull()
    expect(fromDb!.title).toBe(input.title)

    await prisma.event.delete({ where: { id: created.id } })
  })
})

import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'


import { GET as getEvents, POST as postEvent } from '@/app/api/events/route'
import { GET as getEvent } from '@/app/api/events/[id]/route'

const prisma = new PrismaClient()

afterAll(async () => {
  await prisma.$disconnect()
})

describe('/api/events', () => {
  describe('GET /api/events', () => {
    test('responds with 200 OK', async () => {
      const response = await getEvents()

      expect(response.status).toBe(200)
    })

    test('responds with a JSON array body', async () => {
      const response = await getEvents()
      const data = await response.json()

      expect(Array.isArray(data)).toBe(true)
      if (data.length > 0) {
        expect(data[0]).toHaveProperty('price')
        expect(data[0].price === null || typeof data[0].price === 'number').toBe(true)
      }
    })
  })

  describe('POST /api/events', () => {
    test('creates an event with valid payload', async () => {
      const payload = {
        title: 'API Route Event',
        description: 'Created via POST /api/events test',
        dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        durationMins: 45,
        location: 'Test Venue',
        capacity: 20,
        price: 10,
        imageUrl: 'https://example.com/image.png',
        category: 'Testing',
      }

      const request = new NextRequest(new URL('http://localhost/api/events'), {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'content-type': 'application/json' },
      })

      const response = await postEvent(request)
      expect(response.status).toBe(201)

      const data = await response.json()
      expect(data).toEqual(expect.objectContaining({ id: expect.any(String), title: payload.title }))

      await prisma.event.delete({ where: { id: data.id } })
    })

    test('returns 400 when payload is invalid', async () => {
      const request = new NextRequest(new URL('http://localhost/api/events'), {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'content-type': 'application/json' },
      })

      const response = await postEvent(request)
      expect(response.status).toBe(400)

      const body = await response.json()
      expect(body).toHaveProperty('message', 'Invalid request parameters')
    })
  })

  describe('GET /api/events/:id', () => {
    describe('existing event', () => {
      test('responds with 200 OK', async () => {
        const found = await prisma.event.findFirst({ select: { id: true } })
        const id = found!.id

        const request = new NextRequest(new URL(`http://localhost/api/events/${id}`))
        const response = await getEvent(request, { params: Promise.resolve({ id }) })

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data).toHaveProperty('price')
        expect(data.price === null || typeof data.price === 'number').toBe(true)
      })
    })

    describe('missing event', () => {
      test('responds with 404 Not Found', async () => {
        const badId = '00000000-0000-0000-0000-000000000000'

        const request = new NextRequest(new URL(`http://localhost/api/events/${badId}`))
        const response = await getEvent(request, { params: Promise.resolve({ id: badId }) })

        expect(response.status).toBe(404)
      })
    })
  })
})

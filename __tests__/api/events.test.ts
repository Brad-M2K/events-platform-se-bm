import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'


import { GET as getEvents } from '@/app/api/events/route'
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

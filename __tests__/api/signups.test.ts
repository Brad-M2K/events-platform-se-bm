import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

import { POST as postSignup } from '@/app/api/events/[id]/signup/route'

const prisma = new PrismaClient()

let eventId: string

beforeAll(async () => {
    const event = await prisma.event.findFirst()
    eventId = event!.id
})

afterAll(async () => {
    await prisma.signup.deleteMany({
        where: { email: 'brad@test.com' },
    })

    await prisma.$disconnect()
})

describe('/api/events/:id/signups', () => {
    describe('POST /api/events/:id/signups', () => {
        test('responds with 201 Created when signup succeeds', async () => {
        const request = new NextRequest(`http://test/api/events/${eventId}/signups`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Brad', email: 'brad@test.com' }),
        })

        const response = await postSignup(request, { params: Promise.resolve({ id: eventId }) })

        expect(response.status).toBe(201)

        const data = await response.json()

        expect(data).toHaveProperty('email', 'brad@test.com')

        const created = await prisma.signup.findUnique({ where: { id: data.id } })

        expect(created).not.toBeNull()
        })

        test('responds with 404 Not Found when the event is missing', async () => {
        const missingId = '00000000-0000-0000-0000-000000000000'

        const request = new NextRequest(`http://test/api/events/${missingId}/signups`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Brad', email: 'notfound@test.com' }),
        })

        const response = await postSignup(request, { params: Promise.resolve({ id: missingId }) })

        expect(response.status).toBe(404)
        })

        test('responds with 400 Bad Request when required fields are missing', async () => {
        const reqNoName = new NextRequest(`http://test/api/events/${eventId}/signups`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'x@test.com' }),
        })
        const resNoName = await postSignup(reqNoName, { params: Promise.resolve({ id: eventId }) })
        expect(resNoName.status).toBe(400)

        const reqNoEmail = new NextRequest(`http://test/api/events/${eventId}/signups`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Brad' }),
        })
        const resNoEmail = await postSignup(reqNoEmail, { params: Promise.resolve({ id: eventId }) })
        expect(resNoEmail.status).toBe(400)
        })

        test('responds with 409 Conflict when a signup already exists', async () => {
        const request = new NextRequest(`http://test/api/events/${eventId}/signups`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Brad', email: 'brad@test.com' }),
        })

        const response = await postSignup(request, { params: Promise.resolve({ id: eventId }) })

        expect(response.status).toBe(409)
        })
    })
})

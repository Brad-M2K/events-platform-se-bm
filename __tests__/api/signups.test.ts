import { PrismaClient } from '@prisma/client'

import { POST as postSignup } from '@/app/api/events/[id]/signup/route'

const prisma = new PrismaClient()

let eventId: string;

beforeAll(async () => {
    // identical event Id to use for happy and unhappy path
    const event = await prisma.event.findFirst()
            eventId = event!.id
})

afterAll(async () => {
    //clean up original signup after tested duplictae 409 status
    await prisma.signup.deleteMany({
        where: { email: 'brad@test.com'}
    })

    await prisma.$disconnect()
})


describe('/api/events/:id/signups', () => {

    describe('POST', () => {
        
        test('returns 201, and inserts into DB', async () => {
            const request = new Request(`http://test/api/events/${eventId}/signups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'Brad', email: 'brad@test.com' }),
            })

            const response = await postSignup(request, { params: { id: eventId } })
            
            expect(response.status).toBe(201)

            const data = await response.json()

            expect(data).toHaveProperty('email', 'brad@test.com')

            const created = await prisma.signup.findUnique({ where: { id: data.id } })

            expect(created).not.toBeNull()
        })

        test('returns 404 if the event does not exist', async () => {
            const eventId = '00000000-0000-0000-0000-000000000000'

            const request = new Request(`http://test/api/events/${eventId}/signups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'Brad', email: 'notfound@test.com' }),
            })

            const response = await postSignup(request, { params: { id: eventId } })
            
            expect(response.status).toBe(404)

        })

        test('returns 400 if name or email missing', async () => {
            const reqNoName = new Request(`http://test/api/events/${eventId}/signups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'x@test.com' }),
            })
            const resNoName = await postSignup(reqNoName, { params: { id: eventId } })
            expect(resNoName.status).toBe(400)

            const reqNoEmail = new Request(`http://test/api/events/${eventId}/signups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'Brad' }),
            })
            const resNoEmail = await postSignup(reqNoEmail, { params: { id: eventId } })
            expect(resNoEmail.status).toBe(400)
        })

        test('returns 409 if user already signed up', async () => {
            const request = new Request(`http://test/api/events/${eventId}/signups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'Brad', email: 'brad@test.com' }),
            })

            const response = await postSignup(request, { params: { id: eventId } })
            
            expect(response.status).toBe(409)
        })

    })
})
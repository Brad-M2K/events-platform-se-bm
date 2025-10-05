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
            
            const res = await getEvents()
            
            expect(res.status).toBe(200)
        })

        test('returns list of events', async () => {
            const res = await getEvents();
            const data = await res.json();
            

            expect(Array.isArray(data)).toEqual(true)
        })

        test('sorts by date by dateTime asc', async () => {
            const res = await getEvents()
            const data = await res.json()

            const first = new Date(data[0].dateTime).getTime()
            const last = new Date(data[data.length - 1].dateTime).getTime()
            
            expect(first).toBeLessThanOrEqual(last)
        })

    })

    describe(' /api/events/:id', () => {

        describe('GET', () => {
            test('returns 200 status', async () => {
                const found = await prisma.event.findFirst({ select: { id: true } })
                const id = found!.id
    
                const res = await getEvent(undefined, { params: { id } })

                expect(res.status).toBe(200)
            })
    
            test('returns single event by id', async () => {
                const found = await prisma.event.findFirst({ select: { id: true } })
                const id = found!.id
    
                const res = await getEvent(undefined, { params: { id } })
                const data = await res.json()
    
                expect(data).toHaveProperty('id', id)
                expect(typeof data.title).toBe('string')
                expect(new Date(data.dateTime.toString())).not.toBe('Invalid Date')
            })
    
            test('returns 404 for invalid id', async () => {
                const badId = '00000000-0000-0000-0000-000000000000'
    
                const res = await getEvent(undefined, { params: { id: badId } })
                
                expect(res.status).toBe(404)
            })
        })
    })

})
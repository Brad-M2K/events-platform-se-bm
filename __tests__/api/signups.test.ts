import { PrismaClient } from '@prisma/client'

import { POST as postSignup } from '@/app/api/events/[id]/signups/route'

const prisma = new PrismaClient()

afterAll(async () => {
    await prisma.$disconnect()
})

describe('/api/events/:id/signups', () => {
    test.skip('', async () => {
        
    })
})
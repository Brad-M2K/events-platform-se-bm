import { NextResponse } from 'next/server'
import handlePrismaError from '@/lib/handlePrismaError'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request, context: { params: { id: string } }) {

    const { id: eventId } = context.params
    const { name, email } = await request.json()

    if (!name || !email) {
        return NextResponse.json({ message: 'Missing name or email' }, { status: 400 })
    }
    

    try {
        const signup = await prisma.signup.create({ data: { eventId, name, email } })
        
        return NextResponse.json(signup, { status: 201 })

    } catch (err) {
        return handlePrismaError(err)
    }


}
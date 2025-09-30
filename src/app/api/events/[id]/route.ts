import { NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client';
export const runtime = 'nodejs';
const prisma = new PrismaClient();


export async function GET(req: Request, context: { params: { id: string } }) {
    

    const event = await prisma.event.findUnique({
        where: { id: context.params.id}
    })

    return NextResponse.json(event)
}
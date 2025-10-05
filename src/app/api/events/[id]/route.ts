import { NextResponse } from 'next/server'

export const runtime = 'nodejs';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function GET(req?: Request, context?: { params: { id: string } }) {
    const { id } = context!.params;

    const event = await prisma.event.findUnique({
        where: { id }
    })

    if(!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(event)
}
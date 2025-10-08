import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

export const runtime = 'nodejs';
const prisma = new PrismaClient();


export async function GET() {
    const events = await prisma.event.findMany({
        orderBy: { dateTime: 'asc'}
    })

    return NextResponse.json(events);
}

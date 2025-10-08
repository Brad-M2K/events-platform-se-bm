import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';



export default function handlePrismaError(error: unknown){

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                return NextResponse.json({ error: 'Duplicate entry' }, { status: 409 })
            case 'P2003':
                return NextResponse.json({ error: 'Related record not found' }, { status: 404 })
            default:
                return NextResponse.json({ error: `Database error: ${error.code}`}, { status: 500 })
        }
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
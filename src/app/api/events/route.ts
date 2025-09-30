import { NextResponse } from 'next/server'
import { events } from '@/lib/store'

export async function GET() {
    return NextResponse.json(events)
}
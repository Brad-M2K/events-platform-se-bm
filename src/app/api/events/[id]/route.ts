import { NextResponse } from 'next/server'
import { events } from '@/lib/store'

export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = context.params;
    const event = events.find(e => e.id === id);
    if (!event) {
        return NextResponse.json({ error: 'Event not found'}, { status: 404})
    }
    return NextResponse.json(event)
}
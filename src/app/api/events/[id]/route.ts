import { NextResponse } from 'next/server'

import { findEventById } from '@/lib/data/events'

export const runtime = 'nodejs'

export async function GET(_request?: Request, context?: { params: { id: string } }) {
  const { id } = context!.params

  const event = await findEventById(id)

  if (!event) return NextResponse.json({ error: 'Event Not found' }, { status: 404 })

  return NextResponse.json(event)
}

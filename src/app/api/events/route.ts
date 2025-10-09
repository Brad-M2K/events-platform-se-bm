import { NextResponse } from 'next/server'

import { listEvents } from '@/lib/data/events'

export const runtime = 'nodejs'

export async function GET() {
  const events = await listEvents()

  return NextResponse.json(events)
}

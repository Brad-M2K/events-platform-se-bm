import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { createEventSchema } from '@/server/schema/events'
import { createEvent, listEvents } from '@/server/services/events.service'
import { AuthError, NotFoundError, PermissionError } from '@/server/errors'

export const runtime = 'nodejs'

const handleRouteError = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json({ message: 'Invalid request parameters', issues: error.issues }, { status: 400 })
  }
  if (error instanceof NotFoundError) {
    return NextResponse.json({ message: error.message }, { status: 404 })
  }
  if (error instanceof AuthError) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }
  if (error instanceof PermissionError) {
    return NextResponse.json({ message: error.message }, { status: 403 })
  }

  console.error('Unexpected error', error)
  return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
}

export async function GET() {
  try {
    const events = await listEvents()

    return NextResponse.json(events)
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = createEventSchema.parse({
      ...body,
      durationMins: Number(body.durationMins),
      capacity: Number(body.capacity),
      dateTime: typeof body.dateTime === 'string' ? body.dateTime : '',
      price:
        body.price === null || body.price === undefined || body.price === ''
          ? null
          : Number(body.price),
    })

    const created = await createEvent(parsed)

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return handleRouteError(error)
  }
}

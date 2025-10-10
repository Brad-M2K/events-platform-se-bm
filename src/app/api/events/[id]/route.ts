import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { eventIdParamSchema } from '@/server/schema/events'
import { getEventById } from '@/server/services/events.service'
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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = eventIdParamSchema.parse(await params)

    const event = await getEventById(id)

    return NextResponse.json(event)
  } catch (error) {
    return handleRouteError(error)
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import handlePrismaError from '@/lib/handlePrismaError'
import { signupSchema, eventIdParamSchema } from '@/server/schema/events'
import { signupForEvent } from '@/server/services/events.service'
import { AuthError, NotFoundError, PermissionError } from '@/server/errors'

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id: eventId } = eventIdParamSchema.parse(await params)
        const payload = signupSchema.parse(await request.json())

        const signup = await signupForEvent(eventId, payload)

        return NextResponse.json(signup, { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ message: 'Invalid request body', issues: error.issues }, { status: 400 })
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

        return handlePrismaError(error)
    }
}

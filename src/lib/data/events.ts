import type { Prisma } from '@prisma/client'

import type { AppEvent } from '@/lib/types'
import { prisma } from '@/lib/prisma'

type EventWithSignupCount = Prisma.EventGetPayload<{
  include: { _count: { select: { signups: true } } }
}>

function toAppEvent(event: EventWithSignupCount): AppEvent {
  const { _count, dateTime, ...rest } = event

  return {
    ...rest,
    dateTime: dateTime.toISOString(),
    available: Math.max(rest.capacity - _count.signups, 0),
  }
}

export async function listEvents(): Promise<AppEvent[]> {
  const events = await prisma.event.findMany({
    orderBy: { dateTime: 'asc' },
    include: { _count: { select: { signups: true } } },
  })

  return events.map(toAppEvent)
}

export async function findEventById(id: string): Promise<AppEvent | null> {
  const event = await prisma.event.findUnique({
    where: { id },
    include: { _count: { select: { signups: true } } },
  })

  if (!event) return null

  return toAppEvent(event)
}

type SignupCreateInput = Pick<Prisma.SignupCreateInput, 'name' | 'email'>

export async function createSignup(eventId: string, data: SignupCreateInput) {
  return prisma.signup.create({
    data: {
      eventId,
      ...data,
    },
  })
}

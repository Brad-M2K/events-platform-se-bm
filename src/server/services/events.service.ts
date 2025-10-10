import type { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import type { AppEvent } from '@/lib/types'
import { NotFoundError } from '@/server/errors'

export type CreateEventInput = {
  title: string
  description: string
  dateTime: string | Date
  durationMins: number
  location: string
  capacity: number
  imageUrl?: string | null
  category?: string | null
}

export type UpdateEventInput = Partial<CreateEventInput>

export type SignupForEventInput = {
  name: string
  email: string
}

type EventWithSignupCount = Prisma.EventGetPayload<{
  include: { _count: { select: { signups: true } } }
}>

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
})

const toAppEvent = (event: EventWithSignupCount): AppEvent => {
  const { _count, dateTime, ...rest } = event
  const startDate = new Date(dateTime)
  const endDate = new Date(startDate.getTime() + rest.durationMins * 60_000)

  return {
    ...rest,
    dateTime: startDate.toISOString(),
    endDateTime: endDate.toISOString(),
    startTime: timeFormatter.format(startDate),
    endTime: timeFormatter.format(endDate),
    available: Math.max(rest.capacity - _count.signups, 0),
  }
}

export const listEvents = async (): Promise<AppEvent[]> => {
  const events = await prisma.event.findMany({
    orderBy: { dateTime: 'asc' },
    include: { _count: { select: { signups: true } } },
  })

  return events.map(toAppEvent)
}

export const getEventById = async (id: string): Promise<AppEvent> => {
  const event = await prisma.event.findUnique({
    where: { id },
    include: { _count: { select: { signups: true } } },
  })

  if (!event) {
    throw new NotFoundError(`Event ${id} not found`)
  }

  return toAppEvent(event)
}

export const createEvent = async (input: CreateEventInput): Promise<AppEvent> => {
  const { dateTime, ...rest } = input

  const created = await prisma.event.create({
    data: {
      ...rest,
      dateTime: typeof dateTime === 'string' ? new Date(dateTime) : dateTime,
    },
    include: { _count: { select: { signups: true } } },
  })

  return toAppEvent(created)
}

export const updateEvent = async (
  id: string,
  input: UpdateEventInput,
): Promise<AppEvent> => {
  const { dateTime, ...rest } = input

  try {
    const updated = await prisma.event.update({
      where: { id },
      data: {
        ...rest,
        ...(dateTime !== undefined
          ? { dateTime: typeof dateTime === 'string' ? new Date(dateTime) : dateTime }
          : {}),
      },
      include: { _count: { select: { signups: true } } },
    })

    return toAppEvent(updated)
  } catch {
    throw new NotFoundError(`Event ${id} not found`)
  }
}

export const deleteEvent = async (id: string): Promise<void> => {
  try {
    await prisma.event.delete({ where: { id } })
  } catch {
    throw new NotFoundError(`Event ${id} not found`)
  }
}

export const signupForEvent = async (eventId: string, input: SignupForEventInput) => {
  return prisma.signup.create({
    data: {
      eventId,
      name: input.name,
      email: input.email,
    },
  })
}

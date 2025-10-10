'use client'

import { Button } from '@/components/ui/button'
import { useMemo } from 'react'

type SignupSuccessProps = {
  eventId: string
  eventDetails: {
    title: string
    description: string
    dateTime: string
    durationMins: number
    location: string
  }
}

const formatForCalendar = (date: Date) =>
  date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')

export default function SignupSuccess({ eventId, eventDetails }: SignupSuccessProps) {
  const calendarUrl = useMemo(() => {
    const start = new Date(eventDetails.dateTime)
    const end = new Date(start.getTime() + eventDetails.durationMins * 60_000)

    const url = new URL('https://calendar.google.com/calendar/render')
    url.searchParams.set('action', 'TEMPLATE')
    url.searchParams.set('text', eventDetails.title)
    url.searchParams.set('dates', `${formatForCalendar(start)}/${formatForCalendar(end)}`)

    if (eventDetails.description) {
      url.searchParams.set('details', eventDetails.description)
    }

    if (eventDetails.location) {
      url.searchParams.set('location', eventDetails.location)
    }

    return url.toString()
  }, [
    eventDetails.dateTime,
    eventDetails.description,
    eventDetails.durationMins,
    eventDetails.location,
    eventDetails.title,
  ])

  return (
    <div className="space-y-4 text-center">
      <p className="text-sm font-semibold text-green-600">Success! Your spot is reserved.</p>
      <p className="text-sm text-slate-700">
        Thanks for signing up! We’ll send you a confirmation email soon.
      </p>
      <Button
        asChild
        variant="outline"
        className="cursor-pointer justify-center"
        aria-label="Add this event to Google Calendar"
        data-event-id={eventId}
      >
        <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
          Add to Google Calendar
        </a>
      </Button>
    </div>
  )
}

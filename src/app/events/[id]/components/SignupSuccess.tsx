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
      <p className="text-sm font-semibold text-green-600 dark:text-green-400">Success! Your spot is reserved.</p>
      <p className="text-sm text-muted-foreground">
        Thanks for signing up! We’ll send you a confirmation email soon.
      </p>
      <Button
        asChild
        variant="outline"
        className="cursor-pointer justify-center border-[#dadce0] bg-white text-[#3c4043] hover:bg-[#f1f3f4] dark:border-[#444746] dark:bg-[#1f1f1f] dark:text-[#e8eaed] dark:hover:bg-[#2b2b2b]"
        aria-label="Add this event to Google Calendar"
        data-event-id={eventId}
      >
        <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="h-4 w-4">
              <path fill="#4285f4" d="M533.5 278.4c0-18.5-1.4-37.1-4.4-55.3H272v104.9h147.5c-6.1 33.9-24.5 64.2-52 83.8v69h83.9c49.1-45.2 77.1-111.9 77.1-202.4z"/>
              <path fill="#34a853" d="M272 544.3c70.3 0 129.6-23.4 172.8-63.5l-83.9-69c-23.3 15.7-53.1 24.7-88.9 24.7-68.3 0-126.2-46.1-146.9-108.1H37.3v67.8c42.6 84.4 128.7 148.1 234.7 148.1z"/>
              <path fill="#fbbc05" d="M125.1 328.4c-10.9-33.9-10.9-70.6 0-104.5V156.1H37.3c-42.1 83.8-42.1 183.7 0 267.5l87.8-67.8z"/>
              <path fill="#ea4335" d="M272 107.7c37.7-.6 74.1 13.3 101.8 38.9l76.1-76.1C402 24.6 343.1-.1 272 0 166 0 79.9 63.7 37.3 148.1l87.8 67.8c20.6-62.1 78.6-108.2 146.9-108.2z"/>
            </svg>
          </span>
          Add to Google Calendar
        </a>
      </Button>
    </div>
  )
}

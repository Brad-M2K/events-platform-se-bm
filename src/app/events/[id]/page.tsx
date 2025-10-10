import Link from 'next/link'
import Image from 'next/image'

import type { AppEvent } from '@/lib/types'
import { getEventById } from '@/server/services/events.service'
import { NotFoundError } from '@/server/errors'
import EventQuickFacts from './components/EventQuickFacts'
import SignupPanel from './components/SignupPanel'
import EventDetailHeader from './components/EventDetailHeader'
import EventNotFound from './components/EventNotFound'

type EventDetailPageProps = {
  params: { id: string }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  let event: AppEvent
  try {
    event = await getEventById(params.id)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return <EventNotFound eventId={params.id} />
    }

    throw error
  }


  const { title, description, dateTime, location, imageUrl } = event

  const dateDetailFormatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const startTime = dateDetailFormatter.format(new Date(dateTime))

  return (
    <div className="space-y-10">
      <EventDetailHeader event={event} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          {imageUrl && (
            <div className="overflow-hidden rounded-3xl">
              <div className="relative h-72 w-full">
                <Image src={imageUrl} alt={title} fill className="object-cover" loading="lazy" />
              </div>
            </div>
          )}

          <EventQuickFacts event={event} />

          <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">About this event</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Event details</h2>
            <dl className="space-y-3 text-sm text-muted-foreground">
              <div>
                <dt className="font-medium text-foreground">Start time</dt>
                <dd>{startTime}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Venue</dt>
                <dd>{location}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="space-y-6">
          <SignupPanel
            eventId={event.id}
            eventDetails={{
              title,
              description,
              dateTime,
              durationMins: event.durationMins,
              location,
            }}
            ctaLabel="Sign me up"
          />

          <Link href="/events" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80">
            ← Back to events
          </Link>
        </div>
      </div>
    </div>
  )
}

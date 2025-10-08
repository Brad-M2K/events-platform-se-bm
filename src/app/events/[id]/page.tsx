import Link from 'next/link'

import type { AppEvent } from '@/lib/types'

import EventQuickFacts from './components/EventQuickFacts'
import SignupPanel from './components/SignupPanel'
import EventDetailHeader from './components/EventDetailHeader'

type EventDetailPageProps = {
  params: { id: string }
}

const dateDetailFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event: AppEvent | null = null

  if (!event) {
    return (
      <div className="space-y-6 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">
          Event data not loaded yet
        </h1>
        <p className="text-sm text-slate-600">
          Fetch event <code>{params.id}</code> and pass it into this page. Remove this message once
          the route is hooked up to your backend.
        </p>
        <Link href="/events" className="inline-flex items-center text-sm font-semibold text-indigo-600">
          ← Back to events
        </Link>
      </div>
    )
  }

  

  return (
    <div className="space-y-10">
      <EventDetailHeader event={event} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          {event.imageUrl && (
            <div className="overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-72 w-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <EventQuickFacts event={event} />

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">About this event</h2>
            <p className="text-sm text-slate-600">{event.description}</p>
          </section>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Event details</h2>
            <dl className="space-y-3 text-sm text-slate-600">
              <div>
                <dt className="font-medium text-slate-700">Start time</dt>
                <dd>{startTime}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-700">Venue</dt>
                <dd>{event.location}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="space-y-6">
          <SignupPanel ctaLabel="Sign me up" />

          <Link href="/events" className="inline-flex items-center text-sm font-semibold text-indigo-600">
            ← Back to events
          </Link>
        </div>
      </div>
    </div>
  )
}

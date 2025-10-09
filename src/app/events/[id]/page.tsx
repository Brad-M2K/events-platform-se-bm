import Link from 'next/link'
import Image from 'next/image'

import { findEventById } from '@/lib/data/events'
import EventQuickFacts from './components/EventQuickFacts'
import SignupPanel from './components/SignupPanel'
import EventDetailHeader from './components/EventDetailHeader'
import EventNotFound from './components/EventNotFound'

type EventDetailPageProps = {
  params: { id: string }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {

  const event = await findEventById(params.id)

  if (!event) {
    return <EventNotFound eventId={params.id} />
  }


  const {
    title,
    description,
    dateTime,
    location,
    imageUrl,
    
  } = event

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
          {event.imageUrl && (
            <div className="overflow-hidden rounded-3xl ">
              <div className='relative h-72 w-full'>
                <Image
                  src={imageUrl!}
                  alt={title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          <EventQuickFacts event={event} />

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">About this event</h2>
            <p className="text-sm text-slate-600">{description}</p>
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
                <dd>{location}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="space-y-6">
          <SignupPanel ctaLabel="Sign me up" />

          <Link href="/events" className="inline-flex items-center text-sm font-semibold text-purple-600">
            ← Back to events
          </Link>
        </div>
      </div>
    </div>
  )
}

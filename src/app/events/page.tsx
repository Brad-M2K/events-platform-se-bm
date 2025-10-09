import Link from 'next/link'

import { listEvents } from '@/lib/data/events'
import PageHero from '@/components/PageHero'
import type { AppEvent } from '@/lib/types'

import EventFilterBar from './components/EventFilterBar'
import EventGrid from './components/EventGrid'

export default async function EventListPage() {
  const events: AppEvent[] = await listEvents()

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Events"
        title="Find your next community moment"
        description="Browse upcoming gatherings curated by the team. Filter by theme, pick your favourite, and claim a seat."
        actions={
          <>
            <Link
              href="#upcoming"
              className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              View upcoming events
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Back to home
            </Link>
          </>
        }
      />

      <EventFilterBar categories={[]} />

      <section id="upcoming" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Upcoming events</h2>
          <p className="text-sm text-slate-600">All times displayed in your local timezone.</p>
        </div>

        <EventGrid events={events} />
      </section>
    </div>
  )
}

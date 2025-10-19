import Link from 'next/link'

import { listEvents } from '@/server/services/events.service'
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
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              View upcoming events
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-border px-5 py-2 text-sm font-semibold text-muted-foreground transition hover:border-border hover:text-foreground"
            >
              Back to home
            </Link>
          </>
        }
      />

      <EventFilterBar categories={[]} />

      <section id="upcoming" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Upcoming events</h2>
          <p className="text-sm text-muted-foreground">All times displayed in your local timezone.</p>
        </div>

        <EventGrid events={events} />
      </section>
    </div>
  )
}

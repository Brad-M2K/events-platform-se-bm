import Link from 'next/link'

import EventCard from '@/components/EventCard'
import PageHero from '@/components/PageHero'
import type { AppEvent } from '@/lib/types'

const demoEvent: AppEvent = {
  id: 'demo-event',
  title: 'ShadCN Showcase Evening',
  description:
    'Preview the updated signup panel powered by shadcn/ui components while enjoying a relaxed dev social.',
  dateTime: new Date('2024-08-20T18:00:00Z').toISOString(),
  durationMins: 120,
  location: 'Innovation Hub',
  capacity: 40,
  category: 'Community',
  available: 16,
  imageUrl:
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop',
}

const valueProps = [
  {
    title: 'Curated lineup',
    description: 'Every event is hand-picked by staff to deliver value to our community.',
  },
  {
    title: 'Simple signups',
    description: 'Secure a seat with your name and email—no logins required (yet).',
  },
  {
    title: 'Calendar ready',
    description: 'Add events to your calendar in one click once integrations go live.',
  },
]

export default function Home() {
  return (
    <div className="space-y-12">
      <PageHero
        eyebrow="Tech Returners Community"
        title="Events that bring people together"
        description="Discover workshops, socials, and meetups crafted for people who love to learn, connect, and grow."
        actions={
          <>
            <Link
              href="/events"
              className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              Browse all events
            </Link>
            <Link
              href="#highlights"
              className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              See highlights
            </Link>
          </>
        }
      />

      <section className="grid gap-6 md:grid-cols-3" aria-label="Key benefits">
        {valueProps.map((prop) => (
          <article
            key={prop.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">{prop.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{prop.description}</p>
          </article>
        ))}
      </section>

      <section id="highlights" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Upcoming highlights</h2>
          <Link href="/events" className="text-sm font-semibold text-purple-600">
            View the full schedule →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <EventCard event={demoEvent} />
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-600">
            Hook this area to your API when ready. The card on the left is a single demo event so you
            can click through the flow.
          </div>
        </div>
      </section>
    </div>
  )
}

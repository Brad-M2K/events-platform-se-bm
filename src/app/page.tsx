import Link from 'next/link'

import EventCard from '@/components/EventCard'
import PageHero from '@/components/PageHero'
import { listEvents }  from '@/server/services/events.service'

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




export default async function Home() {


  const events = await listEvents()
  const featured = events.slice(0, 2)


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
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Browse all events
            </Link>
            <Link
              href="#highlights"
              className="rounded-lg border border-border px-5 py-2 text-sm font-semibold text-muted-foreground transition hover:border-border hover:text-foreground"
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
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-foreground">{prop.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{prop.description}</p>
          </article>
        ))}
      </section>

      <section id="highlights" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Upcoming highlights</h2>
          <Link href="/events" className="text-sm font-semibold text-primary hover:text-primary/80">
            View the full schedule →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Highlighted events will appear here once the backend is wired up.
          </div>
        )}
      </section>
    </div>
  )
}

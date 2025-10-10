import Link from 'next/link'

type EventNotFoundProps = {
  eventId: string
}

export default function EventNotFound({ eventId }: EventNotFoundProps) {
  return (
    <div className="space-y-8 rounded-3xl border border-dashed border-[color:var(--primary-border)] bg-card p-10 text-center shadow-sm">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--primary-soft-strong)]">
          Event not found
        </p>
        <h1 className="text-3xl font-bold text-foreground">We couldn&apos;t find that event</h1>
        <p className="text-sm text-muted-foreground">
          The event with ID <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">{eventId}</code> may
          have been removed or never existed. Try browsing the full schedule below to find something
          else that interests you.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/events"
          className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Browse all events
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-semibold text-muted-foreground transition hover:border-border hover:text-foreground"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  )
}

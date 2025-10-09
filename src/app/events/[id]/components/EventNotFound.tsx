import Link from 'next/link'

type EventNotFoundProps = {
  eventId: string
}

export default function EventNotFound({ eventId }: EventNotFoundProps) {
  return (
    <div className="space-y-8 rounded-3xl border border-dashed border-purple-200/80 bg-white p-10 text-center shadow-sm">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">
          Event not found
        </p>
        <h1 className="text-3xl font-bold text-slate-900">We couldn&apos;t find that event</h1>
        <p className="text-sm text-slate-600">
          The event with ID <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">{eventId}</code> may
          have been removed or never existed. Try browsing the full schedule below to find something
          else that interests you.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/events"
          className="inline-flex items-center rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
        >
          Browse all events
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  )
}

import EventCard from '@/components/EventCard'
import type { AppEvent } from '@/lib/types'

type EventGridProps = {
  events: AppEvent[]
}

export default function EventGrid({ events }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
        <p className="text-lg font-semibold text-slate-700">No events to show just yet.</p>
        <p className="mt-2">
          Once you hook up the API, upcoming events will appear here automatically.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

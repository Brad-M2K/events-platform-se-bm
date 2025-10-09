import type { AppEvent } from '@/lib/types'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

type EventDetailHeaderProps = {
  event: AppEvent
}

export default function EventDetailHeader({ event }: EventDetailHeaderProps) {
  const { title, dateTime, location, category } = event

  return (
    <header className="space-y-6 rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg">
      <div className="flex flex-wrap items-center gap-3 text-sm text-purple-200">
        {category && (
          <span className="inline-flex items-center rounded-full bg-purple-600/70 px-3 py-1 uppercase tracking-wide">
            {category}
          </span>
        )}
        <span>{dateFormatter.format(new Date(dateTime))}</span>
        <span aria-hidden="true">•</span>
        <span>{location}</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      </div>
    </header>
  )
}

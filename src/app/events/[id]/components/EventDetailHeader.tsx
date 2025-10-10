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
    <header className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/60 px-8 py-10 text-slate-900 shadow-xl backdrop-blur">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-32 h-64 w-64 rounded-full bg-purple-400/25 blur-3xl" />
        <div className="absolute -bottom-20 -right-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-purple-100/30" />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        {category && (
          <span className="inline-flex items-center rounded-full border border-purple-200/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-600">
            {category}
          </span>
        )}
        <span className="font-medium text-slate-700">{dateFormatter.format(new Date(dateTime))}</span>
        <span aria-hidden="true" className="text-slate-300">
          •
        </span>
        <span className="text-slate-600">{location}</span>
      </div>

      <div className="mt-6 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
      </div>
    </header>
  )
}

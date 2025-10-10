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
    <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 px-8 py-10 text-foreground shadow-xl backdrop-blur">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-32 h-64 w-64 rounded-full bg-[color:var(--primary)]/25 blur-3xl" />
        <div className="absolute -bottom-20 -right-24 h-72 w-72 rounded-full bg-[color:var(--primary-soft-strong)]/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--card)]/70 via-[color:var(--card)]/40 to-[color:var(--primary-soft)]/30" />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        {category && (
          <span className="inline-flex items-center rounded-full border border-[color:var(--primary-border)] bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {category}
          </span>
        )}
        <span className="font-medium text-foreground">{dateFormatter.format(new Date(dateTime))}</span>
        <span aria-hidden="true" className="text-muted-foreground/60">
          •
        </span>
        <span className="text-muted-foreground">{location}</span>
      </div>

      <div className="mt-6 space-y-2">
        <h1 className="sm:text-4xl text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      </div>
    </header>
  )
}

import type { AppEvent } from '@/lib/types'

type EventQuickFactsProps = {
  event: AppEvent
}

const factLabels: Array<{ key: keyof AppEvent; label: string }> = [
  { key: 'startTime', label: 'Starts at' },
  { key: 'endTime', label: 'Ends at' },
  { key: 'durationMins', label: 'Duration' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'available', label: 'Spots left' },
  { key: 'price', label: 'Price' },
]

export default function EventQuickFacts({ event }: EventQuickFactsProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-base font-semibold text-foreground">Event snapshot</h2>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {factLabels.map(({ key, label }) => {
          const value = event[key]
          let display: string | number = value as string | number

          if (key === 'durationMins' && typeof value === 'number') {
            display = `${value as number} mins`
          } else if (key === 'available') {
            display = value != null ? (value as number) : '—'
          } else if (key === 'startTime' || key === 'endTime') {
            display = value as string
          } else if (key === 'price') {
            display = value != null ? `£${value as number}` : 'Free'
          }

          return (
            <div
              key={key}
              className="rounded-xl bg-muted px-4 py-3 text-center text-sm font-medium text-foreground"
            >
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
              <dd className="mt-1 text-lg text-foreground">{display}</dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

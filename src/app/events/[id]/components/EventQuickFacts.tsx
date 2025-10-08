import type { AppEvent } from '@/lib/types'

type EventQuickFactsProps = {
  event: AppEvent
}

const factLabels: Array<{ key: keyof AppEvent; label: string }> = [
  { key: 'durationMins', label: 'Duration' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'available', label: 'Spots left' },
]

export default function EventQuickFacts({ event }: EventQuickFactsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Event snapshot</h2>
      <dl className="mt-4 grid gap-4 sm:grid-cols-3">
        {factLabels.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-700"
          >
            <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-1 text-lg text-slate-900">
              {key === 'durationMins'
                ? `${event[key] as number} mins`
                : (event[key] as number)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

import Image from 'next/image'
import Link from 'next/link'

import type { AppEvent } from '@/lib/types'

type EventCardProps = {
  event: AppEvent
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const durationFormatter = new Intl.NumberFormat('en-GB', {
  maximumFractionDigits: 0,
})

export default function EventCard({ event }: EventCardProps) {
  const {
    id,
    title,
    // description,
    dateTime,
    location,
    category,
    durationMins,
    available,
    imageUrl,
  } = event

  return (
    <Link
      href={`/events/${id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary-hover)] focus-visible:ring-offset-2"
    >
      <article className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[color:var(--primary-soft)] via-white to-slate-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-105"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-semibold text-[color:var(--primary-soft-strong)]">
                {title.slice(0, 1)}
              </span>
            </div>
          )}
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 font-medium text-slate-700">
              <span>{dateFormatter.format(new Date(dateTime))}</span>
              <span aria-hidden="true">·</span>
              <span>{durationFormatter.format(durationMins)} mins</span>
            </span>
            {category && (
              <span className="rounded-full border border-slate-300 px-2.5 py-0.5 text-xs uppercase tracking-wide text-slate-600">
                {category}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 group-hover:text-[color:var(--primary)]">
              {title}
            </h3>
            {/* <p className="text-sm text-slate-600">{description}</p> */}
          </div>

          <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="font-medium text-slate-700">Location</dt>
              <dd className="text-slate-600">{location}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">Spots left</dt>
              <dd className="text-slate-600">{available ?? '—'}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Link>
  )
}

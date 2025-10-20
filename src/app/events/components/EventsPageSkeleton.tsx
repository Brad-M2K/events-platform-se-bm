import EventGridSkeleton from './EventGridSkeleton'

function HeroSkeleton() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 px-8 py-12 shadow-xl backdrop-blur lg:px-12 lg:py-16"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-32 h-64 w-64 rounded-full bg-[color:var(--primary)]/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-28 h-72 w-72 rounded-full bg-[color:var(--primary-soft-strong)]/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--card)]/60 via-[color:var(--card)]/40 to-[color:var(--primary-soft)]/30" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between animate-pulse">
        <div className="max-w-3xl space-y-4">
          <div className="h-3 w-32 rounded-full bg-muted/80" />
          <div className="h-8 w-4/5 rounded-full bg-muted/90" />
          <div className="h-4 w-3/4 rounded-full bg-muted/70" />
          <div className="h-4 w-2/3 rounded-full bg-muted/60" />
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex h-8 w-32 items-center rounded-full bg-muted/50" />
            <span className="inline-flex h-8 w-36 items-center rounded-full bg-muted/40" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="h-10 w-36 rounded-lg bg-muted/60" />
          <span className="h-10 w-36 rounded-lg bg-muted/40" />
        </div>
      </div>
    </section>
  )
}

function FilterSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between"
      aria-hidden="true"
    >
      <div className="flex flex-wrap gap-2">
        <span className="h-8 w-24 rounded-full bg-muted/60 animate-pulse" />
        <span className="h-8 w-24 rounded-full bg-muted/50 animate-pulse" />
        <span className="h-8 w-20 rounded-full bg-muted/40 animate-pulse" />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="h-4 w-24 rounded-full bg-muted/60 animate-pulse" />
        <span className="h-6 w-16 rounded-full bg-muted/50 animate-pulse" />
        <span className="h-6 w-16 rounded-full bg-muted/40 animate-pulse" />
      </div>
    </div>
  )
}

export default function EventsPageSkeleton() {
  return (
    <div className="space-y-10" aria-hidden="true">
      <HeroSkeleton />
      <FilterSkeleton />
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="h-6 w-40 rounded-full bg-muted/80 animate-pulse" />
          <span className="h-4 w-28 rounded-full bg-muted/60 animate-pulse" />
        </div>
        <EventGridSkeleton />
      </section>
    </div>
  )
}

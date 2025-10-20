export default function EventDetailSkeleton() {
  return (
    <div className="space-y-10" aria-hidden="true">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 px-8 py-10 shadow-xl backdrop-blur">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-32 h-64 w-64 rounded-full bg-[color:var(--primary)]/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-24 h-72 w-72 rounded-full bg-[color:var(--primary-soft-strong)]/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--card)]/60 via-[color:var(--card)]/40 to-[color:var(--primary-soft)]/30" />
        </div>

        <div className="space-y-4 animate-pulse">
          <div className="h-3 w-32 rounded-full bg-muted/70" />
          <div className="h-8 w-2/3 rounded-full bg-muted/90" />
          <div className="h-4 w-1/2 rounded-full bg-muted/70" />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/60">
            <div className="h-72 w-full max-w-[720px] animate-pulse bg-muted" />
          </div>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-3 w-20 rounded-full bg-muted/70" />
                  <div className="h-4 w-16 rounded-full bg-muted/50" />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="h-5 w-32 rounded-full bg-muted/80" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded-full bg-muted/60" />
              <div className="h-4 w-5/6 rounded-full bg-muted/50" />
              <div className="h-4 w-2/3 rounded-full bg-muted/40" />
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="h-5 w-36 rounded-full bg-muted/80" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-1">
                  <div className="h-3 w-20 rounded-full bg-muted/70" />
                  <div className="h-4 w-3/4 rounded-full bg-muted/50" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-4 animate-pulse">
              <div className="h-5 w-36 rounded-full bg-muted/80" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded-full bg-muted/60" />
                <div className="h-4 w-full rounded-full bg-muted/50" />
              </div>
              <div className="h-10 w-full rounded-md bg-muted/70" />
            </div>
          </div>

          <div className="h-5 w-24 rounded-full bg-muted/50 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

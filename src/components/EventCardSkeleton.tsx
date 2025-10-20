export default function EventCardSkeleton() {
  return (
    <article
      className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-sm animate-pulse"
      aria-hidden="true"
    >
      <div className="relative h-48 w-full overflow-hidden bg-muted" />

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex w-40 items-center gap-2">
            <span className="h-3 w-24 rounded-full bg-muted/80" />
            <span className="h-3 w-12 rounded-full bg-muted/60" />
          </span>
          <span className="h-3 w-16 rounded-full bg-muted/70" />
          <span className="ml-auto h-3 w-14 rounded-full bg-muted/70" />
        </div>

        <div className="space-y-3">
          <div className="h-5 w-3/4 rounded-full bg-muted/80" />
          <div className="h-3 w-2/3 rounded-full bg-muted/60" />
        </div>

        <dl className="grid gap-3 text-sm">
          <div className="space-y-1">
            <dt className="h-3 w-16 rounded-full bg-muted/70" />
            <dd className="h-3 w-24 rounded-full bg-muted/60" />
          </div>
          <div className="space-y-1">
            <dt className="h-3 w-20 rounded-full bg-muted/70" />
            <dd className="h-3 w-16 rounded-full bg-muted/60" />
          </div>
        </dl>
      </div>
    </article>
  )
}

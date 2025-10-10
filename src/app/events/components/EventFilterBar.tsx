type EventFilterBarProps = {
  filters?: Array<{ label: string; active?: boolean }>
  categories: string[]
}

export default function EventFilterBar({ filters = [], categories }: EventFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.length === 0 ? (
          <span className="text-sm text-muted-foreground">
            filters coming soon.
          </span>
        ) : (
          filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter.active
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/90'
              }`}
            >
              {filter.label}
            </button>
          ))
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Categories</span>
        <div className="flex flex-wrap gap-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide"
              >
                {category}
              </span>
            ))
          ) : (
            <span className="text-xs text-muted-foreground/70">Categories will appear here.</span>
          )}
        </div>
      </div>
    </div>
  )
}

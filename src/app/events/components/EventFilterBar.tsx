type EventFilterBarProps = {
  filters?: Array<{ label: string; active?: boolean }>
  categories: string[]
}

export default function EventFilterBar({ filters = [], categories }: EventFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.length === 0 ? (
          <span className="text-sm text-slate-500">
            Hook up filters to refine the list (e.g. date, availability).
          </span>
        ) : (
          filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter.active
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <span className="font-medium text-slate-700">Categories</span>
        <div className="flex flex-wrap gap-2">
          {categories.length > 0 ? (
            categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs uppercase tracking-wide"
              >
                {category}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400">Categories will appear here.</span>
          )}
        </div>
      </div>
    </div>
  )
}

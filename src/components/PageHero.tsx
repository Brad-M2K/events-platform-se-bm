type PageHeroProps = {
  eyebrow?: string
  title: string
  description: string
  actions?: React.ReactNode
}

export default function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/60 px-8 py-12 shadow-xl backdrop-blur lg:px-12 lg:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-32 h-64 w-64 rounded-full bg-purple-500/25 blur-3xl" />
        <div className="absolute -bottom-20 -right-28 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-purple-100/30" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl space-y-4">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
            <p className="text-lg text-slate-600">{description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/70 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              Live beta
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/70 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              34 seeded events ready
            </span>
          </div>
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </section>
  )
}

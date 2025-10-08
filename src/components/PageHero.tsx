type PageHeroProps = {
  eyebrow?: string
  title: string
  description: string
  actions?: React.ReactNode
}

export default function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="space-y-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-slate-50 px-8 py-12 shadow-sm">
      <div className="max-w-3xl space-y-4">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        <p className="text-lg text-slate-600">{description}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </section>
  )
}

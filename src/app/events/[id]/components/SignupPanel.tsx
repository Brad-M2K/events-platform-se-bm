type SignupPanelProps = {
  ctaLabel?: string
}

export default function SignupPanel({ ctaLabel = 'Reserve your spot' }: SignupPanelProps) {
  return (
    <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Join this event</h2>
        <p className="text-sm text-slate-600">
          Enter your details below. Hook up the submit handler to integrate with the signup API.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Alex Johnson"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="alex@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          {ctaLabel}
        </button>
      </form>

      <p className="text-xs text-slate-500">
        We will confirm your reservation via email. Add the calendar integration once ready.
      </p>
    </aside>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 pb-20 pt-16 lg:pb-28 lg:pt-24">
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-cyber-600/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyber-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-slategray-500/10 blur-3xl" />
      </div>

      <div className="page-container relative">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slategray-700/50 bg-navy-800/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slategray-100">
              Delivering Excellence Nationwide
            </div>
            <div className="space-y-5">
              <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                TPC Logistics Company delivers fast, reliable logistics across Nigeria.
              </h1>
              <p className="max-w-xl text-base text-slategray-100 sm:text-lg">
                We provide comprehensive logistics solutions to meet your needs, from nationwide transportation and
                warehousing to supply chain optimization, customs clearance support for Nigeria-bound cargo, and
                real-time delivery tracking within the country.
              </p>
            </div>

            <div className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-4 shadow-glow">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">
                Track Your Shipment
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder="Enter Tracking ID (TPC-XXXXX)"
                  className="w-full flex-1 rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder:text-slategray-500 focus:border-cyber-500 focus:outline-none"
                />
                <button
                  type="button"
                  className="rounded-2xl bg-cyber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
                >
                  Track Shipment
                </button>
              </div>
              <p className="mt-2 text-xs text-slategray-400">Example: TPC-10452</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Nationwide coverage', value: 'Across Nigeria' },
                { label: 'Competitive rates', value: 'Fair pricing' },
                { label: 'Fast & efficient', value: 'On-time focus' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slategray-700/40 bg-navy-800/50 p-4"
                >
                  <p className="text-sm text-slategray-300">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slategray-700/40 bg-navy-800/70 p-6 shadow-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">
                    Operations Desk
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Local visibility, end-to-end</h2>
                </div>
                <div className="rounded-2xl bg-cyber-600/20 px-3 py-2 text-xs font-semibold text-cyber-100">Active</div>
              </div>
              <p className="mt-4 text-sm text-slategray-100">
                Track pickups, hub scans, and proof of delivery in one place with proactive exception management.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  'Pickup scheduling support',
                  'Hub-to-hub status updates',
                  'Proof of delivery on request',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slategray-100">
                    <span className="h-2 w-2 rounded-full bg-cyber-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slategray-700/40 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">
                Why choose us?
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Competitive rates. Experienced team. Fast and efficient service.
              </h3>
              <p className="mt-3 text-sm text-slategray-100">
                We keep deliveries moving with clear communication, dependable handling, and nationwide reach.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Competitive rates', 'Experienced team', 'Fast & efficient'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slategray-700/50 px-3 py-1 text-xs text-slategray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


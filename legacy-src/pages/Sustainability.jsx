import SustainabilityWidget from '../components/SustainabilityWidget'

export default function SustainabilityPage() {
  return (
    <section className="bg-navy-900 pb-16 pt-12">
      <div className="page-container space-y-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Sustainability</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Reduce emissions with smarter routing</h1>
          <p className="mt-2 text-sm text-slategray-100">
            Use our estimator to understand carbon impact and plan greener logistics strategies.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <SustainabilityWidget />
          <aside className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-6 text-sm text-slategray-100">
            <h2 className="text-lg font-semibold text-white">Sustainability commitments</h2>
            <p className="mt-3">
              TPC Logistics works with carriers and clients to improve load efficiency, reduce idle time, and
              prioritize lower-carbon lanes where possible.
            </p>
            <ul className="mt-4 space-y-2">
              <li>- Consolidated shipments to reduce empty miles</li>
              <li>- Carbon reporting dashboards for enterprise clients</li>
              <li>- Continuous carrier performance audits</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}



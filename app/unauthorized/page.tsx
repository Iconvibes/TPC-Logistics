import Link from 'next/link'
import TopNav from '../../components/TopNav'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <TopNav />
      <section className="page-container py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-slategray-700/40 bg-navy-800/70 p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Access Restricted</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">You do not have permission</h1>
          <p className="mt-2 text-sm text-slategray-100">
            This area is reserved for authorized TPC Logistics administrators.
          </p>
          <Link
            href="/portal"
            className="mt-6 inline-flex rounded-2xl bg-cyber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
          >
            Go to Client Portal
          </Link>
        </div>
      </section>
    </div>
  )
}

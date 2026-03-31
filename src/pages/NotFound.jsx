import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="bg-navy-900 pb-16 pt-20">
      <div className="page-container text-center">
        <h1 className="text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-3 text-sm text-slategray-100">The page you requested does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-2xl bg-cyber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
        >
          Return home
        </Link>
      </div>
    </section>
  )
}

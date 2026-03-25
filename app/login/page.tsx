'use client'

import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import TopNav from '../../components/TopNav'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Unable to log in')
      }

      const data = await response.json()
      const role = data?.user?.role
      const destination = nextPath || (role === 'ADMIN' ? '/admin' : '/portal')
      window.location.href = destination
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to log in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <TopNav />
      <section className="page-container py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-slategray-700/40 bg-navy-800/70 p-8 shadow-glow">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Client & Admin Access</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Sign in to your account</h1>
          <p className="mt-2 text-sm text-slategray-100">
            Use your email and password to access the client portal or admin dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="text-sm text-slategray-100">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                required
              />
            </label>
            <label className="text-sm text-slategray-100">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                required
              />
            </label>

            {error ? (
              <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-cyber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-xs text-slategray-400">
            Need access? Contact TPC Logistics for client onboarding.
          </div>
        </div>
      </section>
    </div>
  )
}

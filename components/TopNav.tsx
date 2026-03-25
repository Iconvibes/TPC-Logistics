'use client'

import Link from 'next/link'

export default function TopNav() {
  return (
    <header className="border-b border-slategray-700/40 bg-navy-950/80 backdrop-blur">
      <div className="page-container flex flex-wrap items-center justify-between gap-4 py-5">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
          TPC <span className="text-cyber-500">Logistics</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-6 text-sm text-slategray-100">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <Link href="/track" className="transition hover:text-white">Track Shipment</Link>
          <Link href="/#services" className="transition hover:text-white">Services</Link>
          <Link href="/#contact" className="transition hover:text-white">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/portal"
            className="rounded-full border border-slategray-700/60 px-4 py-2 text-sm text-slategray-100 transition hover:border-cyber-500 hover:text-white"
          >
            Client Portal
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-cyber-500/60 px-4 py-2 text-sm text-cyber-100 transition hover:bg-cyber-500/20"
          >
            Admin
          </Link>
          <Link
            href="/track"
            className="rounded-full bg-cyber-600 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-cyber-500"
          >
            Track Now
          </Link>
        </div>
      </div>
    </header>
  )
}



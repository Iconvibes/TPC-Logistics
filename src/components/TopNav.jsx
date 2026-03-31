import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `transition hover:text-white ${isActive ? 'text-white' : 'text-slategray-100'}`

export default function TopNav() {
  return (
    <header className="border-b border-slategray-700/40 bg-navy-950/80 backdrop-blur">
      <div className="page-container flex flex-wrap items-center justify-between gap-4 py-5">
        <NavLink to="/" className="text-lg font-semibold tracking-wide text-white">
          TPC <span className="text-cyber-500">Logistics</span>
        </NavLink>
        <nav className="flex flex-wrap items-center gap-6 text-sm">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/track" className={linkClass}>Track Shipment</NavLink>
          <NavLink to="/quote" className={linkClass}>Request a Quote</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/sustainability" className={linkClass}>Sustainability</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <NavLink
            to="/dashboard"
            className="rounded-full border border-slategray-700/60 px-4 py-2 text-sm text-slategray-100 transition hover:border-cyber-500 hover:text-white"
          >
            Client Portal
          </NavLink>
          <NavLink
            to="/track"
            className="rounded-full bg-cyber-600 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-cyber-500"
          >
            Track Now
          </NavLink>
        </div>
      </div>
    </header>
  )
}

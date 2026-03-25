import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import TopNav from './TopNav'

export default function Layout() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cyber-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <TopNav />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

import './globals.css'
import type { ReactNode } from 'react'
import SiteFooter from '../components/SiteFooter'

export const metadata = {
  title: 'TPC Logistics',
  description: 'Nationwide logistics and delivery services across Nigeria with real-time tracking.',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-navy-900 text-white">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}


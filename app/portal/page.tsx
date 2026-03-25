import { redirect } from 'next/navigation'
import Link from 'next/link'
import TopNav from '../../components/TopNav'
import LogoutButton from '../../components/LogoutButton'
import { prisma } from '../../lib/db/prisma'
import { getSessionFromCookies } from '../../lib/auth'
import { TrackingStatus } from '@prisma/client'

const statusLabel: Record<TrackingStatus, string> = {
  CREATED: 'Created',
  BOOKED: 'Booked',
  PICKED_UP: 'Picked Up',
  IN_TRANSIT: 'In Transit',
  AT_PORT: 'At Hub',
  AT_CUSTOMS: 'At Hub',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  DELAYED: 'Delayed',
  EXCEPTION: 'Exception',
  CANCELLED: 'Cancelled',
}

export default async function PortalPage() {
  const session = await getSessionFromCookies()
  if (!session) {
    redirect('/login')
  }

  const shipments = await prisma.shipment.findMany({
    where: { clientId: session.userId },
    orderBy: { createdAt: 'desc' },
    include: {
      trackingEvents: { orderBy: { timestamp: 'desc' }, take: 1 },
    },
  })

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <TopNav />
      <section className="page-container py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Client Portal</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back, {session.name ?? 'Client'}</h1>
            <p className="mt-2 text-sm text-slategray-100">
              Track active deliveries, download updates, and monitor milestones across Nigeria.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/track"
              className="rounded-2xl bg-cyber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
            >
              Track a new shipment
            </Link>
            <LogoutButton
              className="rounded-2xl border border-slategray-700/60 px-5 py-3 text-sm font-semibold text-slategray-100 transition hover:border-cyber-500 hover:text-white"
            />
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-slategray-700/40 bg-navy-800/60">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-navy-950/80 text-slategray-300">
                <tr>
                  <th className="px-6 py-4 font-semibold">Tracking ID</th>
                  <th className="px-6 py-4 font-semibold">Route</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Last Update</th>
                  <th className="px-6 py-4 font-semibold">Quick Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slategray-700/40">
                {shipments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-6 text-slategray-200">
                      No shipments found yet. Contact the operations desk to create your first booking.
                    </td>
                  </tr>
                ) : (
                  shipments.map((shipment) => {
                    const lastEvent = shipment.trackingEvents[0]
                    return (
                      <tr key={shipment.id} className="text-slategray-100">
                        <td className="px-6 py-4 font-semibold text-white">{shipment.trackingNumber}</td>
                        <td className="px-6 py-4">
                          {shipment.origin} - {shipment.destination}
                        </td>
                        <td className="px-6 py-4">{statusLabel[shipment.status]}</td>
                        <td className="px-6 py-4">
                          {lastEvent
                            ? new Date(lastEvent.timestamp).toLocaleString('en-GB', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })
                            : 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/track?trackingId=${shipment.trackingNumber}`}
                            className="rounded-full border border-cyber-500/60 px-4 py-2 text-xs font-semibold text-cyber-100 transition hover:bg-cyber-500/20"
                          >
                            View Tracking
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

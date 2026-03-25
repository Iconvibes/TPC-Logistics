'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import TopNav from '../../components/TopNav'
import TrackingTimeline from '../../components/TrackingTimeline'

const statusLabelMap: Record<string, string> = {
  CREATED: 'Created',
  BOOKED: 'Created',
  PICKED_UP: 'In Transit',
  IN_TRANSIT: 'In Transit',
  AT_PORT: 'At Hub',
  AT_CUSTOMS: 'At Hub',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  DELAYED: 'Delayed',
  EXCEPTION: 'Delayed',
  CANCELLED: 'Delayed',
}

const badgeStyles: Record<string, string> = {
  Created: 'border-slategray-500/40 bg-slategray-500/15 text-slategray-100',
  'In Transit': 'border-cyber-500/50 bg-cyber-500/15 text-cyber-100',
  'At Hub': 'border-cyber-300/50 bg-cyber-300/15 text-cyber-100',
  'Out for Delivery': 'border-amber-300/40 bg-amber-300/15 text-amber-100',
  Delivered: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-100',
  Delayed: 'border-rose-400/40 bg-rose-400/15 text-rose-100',
}

type Shipment = {
  trackingNumber: string
  origin: string
  destination: string
  weight: number
  freightMode: string
  status: string
  trackingEvents: {
    location: string
    status: string
    timestamp: string
    notes?: string | null
  }[]
}

export default function TrackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [trackingId, setTrackingId] = useState(searchParams.get('trackingId') ?? '')
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const normalizedTrackingId = trackingId.trim().toUpperCase()

  const fetchShipment = async (trackingNumber: string) => {
    setStatus('loading')
    setError('')
    try {
      const response = await fetch(`/api/track?trackingId=${encodeURIComponent(trackingNumber)}`)
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Unable to fetch tracking data')
      }
      const data = await response.json()
      setShipment(data.shipment)
      setStatus('success')
    } catch (err) {
      setShipment(null)
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Unable to fetch tracking data')
    }
  }

  useEffect(() => {
    const initialId = searchParams.get('trackingId')
    if (initialId) {
      setTrackingId(initialId)
      fetchShipment(initialId.trim())
    }
  }, [searchParams])

  const timelineEvents = useMemo(() => {
    if (!shipment?.trackingEvents) return []
    return shipment.trackingEvents.map((event, index) => ({
      id: `${shipment.trackingNumber}-${index}`,
      location: event.location,
      timestamp: new Date(event.timestamp).toLocaleString('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      status: statusLabelMap[event.status] ?? 'Created',
      description: event.notes || 'Status update recorded.',
    }))
  }, [shipment])

  const displayStatus = shipment?.status ? statusLabelMap[shipment.status] ?? 'Created' : 'Created'

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!normalizedTrackingId) return
    router.replace(`/track?trackingId=${encodeURIComponent(normalizedTrackingId)}`)
  }

  return (
    <div>
      <TopNav />
      <section className="bg-navy-900 pb-16 pt-12">
        <div className="page-container space-y-10">
          <div className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Track Shipment</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">Real-time tracking visibility</h1>
                <p className="mt-2 text-sm text-slategray-100">
                  Enter your tracking ID to view live milestones and delivery status updates.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="sr-only" htmlFor="tracking-id">Tracking ID</label>
              <input
                id="tracking-id"
                type="text"
                value={trackingId}
                onChange={(event) => setTrackingId(event.target.value)}
                placeholder="Enter Tracking ID (TPC-XXXXX)"
                className="w-full flex-1 rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder:text-slategray-500 focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
              />
              <button
                type="submit"
                className="rounded-2xl bg-cyber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
              >
                {status === 'loading' ? 'Searching...' : 'Track Shipment'}
              </button>
            </form>
            {error ? (
              <p className="mt-3 text-sm text-rose-200" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          {status === 'success' && shipment ? (
            <div className="space-y-8">
              <div className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-8">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Tracking Result</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">{shipment.trackingNumber}</h2>
                    <p className="mt-2 text-sm text-slategray-100">
                      Origin: {shipment.origin} - Destination: {shipment.destination}
                    </p>
                  </div>
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                      badgeStyles[displayStatus] || badgeStyles.Created
                    }`}
                  >
                    Status: {displayStatus}
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    { label: 'Transport Mode', value: shipment.freightMode },
                    { label: 'Weight', value: `${shipment.weight} kg` },
                    {
                      label: 'Last Scan',
                      value: timelineEvents.length ? timelineEvents[timelineEvents.length - 1].timestamp : 'N/A',
                    },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slategray-700/40 bg-navy-900/70 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slategray-400">{item.label}</p>
                      <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <TrackingTimeline events={timelineEvents} />
                <aside className="space-y-6">
                  <div className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-6">
                    <h3 className="text-lg font-semibold text-white">Shipment Intelligence</h3>
                    <p className="mt-3 text-sm text-slategray-100">
                      Your shipment is actively monitored by the TPC operations desk. Reach out for documentation or
                      escalation support.
                    </p>
                    <div className="mt-6 space-y-3">
                      {[
                        'Proof of delivery available on request',
                        'Dispatch and hub updates shared promptly',
                        'Proactive exception monitoring enabled',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-slategray-100">
                          <span className="mt-1 h-2 w-2 rounded-full bg-cyber-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slategray-700/40 bg-navy-900/80 p-6">
                    <h4 className="text-lg font-semibold text-white">Need support?</h4>
                    <p className="mt-3 text-sm text-slategray-100">
                      Contact the operations desk for status escalations and documentation requests.
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-slategray-200">
                      <p>Phone: +234 802 255 0250, +234 903 702 8237</p>
                      <p>Email: tpclogisticscompany@gmail.com</p>
                      <p>WhatsApp: +234 802 255 0250</p>
                      <p>Response SLA: Under 2 hours</p>
                    </div>
                    <a
                      href="https://wa.me/2348022550250"
                      className="mt-6 inline-flex w-full justify-center rounded-2xl bg-cyber-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

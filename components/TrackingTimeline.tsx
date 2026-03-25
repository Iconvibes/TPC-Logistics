'use client'

export type TrackingStatus =
  | 'Created'
  | 'In Transit'
  | 'At Hub'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Delayed'

export type TrackingEvent = {
  id: string
  location: string
  timestamp: string
  status: TrackingStatus
  description: string
}

const statusStyles: Record<TrackingStatus, string> = {
  Created: 'border-slategray-500/40 bg-slategray-500/15 text-slategray-100',
  'In Transit': 'border-cyber-500/40 bg-cyber-500/15 text-cyber-100',
  'At Hub': 'border-cyber-300/40 bg-cyber-300/15 text-cyber-100',
  'Out for Delivery': 'border-amber-300/40 bg-amber-300/15 text-amber-100',
  Delivered: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-100',
  Delayed: 'border-rose-400/40 bg-rose-400/15 text-rose-100',
}

const dotStyles: Record<TrackingStatus, string> = {
  Created: 'bg-slategray-300',
  'In Transit': 'bg-cyber-500',
  'At Hub': 'bg-cyber-300',
  'Out for Delivery': 'bg-amber-300',
  Delivered: 'bg-emerald-400',
  Delayed: 'bg-rose-400',
}

type TrackingTimelineProps = {
  events: TrackingEvent[]
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-slategray-700/60" aria-hidden="true" />
      <div className="space-y-8">
        {events.map((event) => (
          <div key={event.id} className="relative pl-12">
            <div className="absolute left-0 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slategray-700/60 bg-navy-900">
              <span className={`h-3 w-3 rounded-full ${dotStyles[event.status]}`} />
            </div>
            <div className="rounded-2xl border border-slategray-700/40 bg-navy-800/70 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{event.location}</h3>
                  <p className="mt-1 text-sm text-slategray-100">{event.description}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusStyles[event.status]
                    }`}
                  >
                    {event.status}
                  </span>
                  <p className="mt-2 text-xs text-slategray-400">{event.timestamp}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



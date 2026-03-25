import { FreightMode, TrackingStatus } from '@prisma/client'
import { prisma } from '../../lib/db/prisma'

export type TrackingEventDTO = {
  location: string
  status: TrackingStatus
  timestamp: Date
  notes: string | null
}

export type ShipmentTrackDTO = {
  trackingNumber: string
  origin: string
  destination: string
  weight: number
  freightMode: FreightMode
  status: TrackingStatus
  createdAt: Date
  trackingEvents: TrackingEventDTO[]
}

export async function getShipmentWithHistory(
  trackingNumber: string,
): Promise<ShipmentTrackDTO | null> {
  return prisma.shipment.findUnique({
    where: { trackingNumber },
    select: {
      trackingNumber: true,
      origin: true,
      destination: true,
      weight: true,
      freightMode: true,
      status: true,
      createdAt: true,
      trackingEvents: {
        orderBy: { timestamp: 'asc' },
        select: {
          location: true,
          status: true,
          timestamp: true,
          notes: true,
        },
      },
    },
  })
}

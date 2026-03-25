import { NextRequest, NextResponse } from 'next/server'
import { getShipmentWithHistory } from '../../../server/services/tracking'
import { trackingIdSchema } from '../../../server/validators/tracking'

export type TrackSuccessResponse = {
  shipment: Awaited<ReturnType<typeof getShipmentWithHistory>>
}

export type TrackErrorResponse = {
  error: string
  details?: string
}

export async function GET(request: NextRequest) {
  const rawTrackingId = request.nextUrl.searchParams.get('trackingId')

  if (!rawTrackingId) {
    return NextResponse.json<TrackErrorResponse>(
      { error: 'trackingId is required' },
      { status: 400 },
    )
  }

  const normalized = rawTrackingId.trim().toUpperCase()
  const validation = trackingIdSchema.safeParse(normalized)

  if (!validation.success) {
    return NextResponse.json<TrackErrorResponse>(
      { error: 'Invalid trackingId format', details: 'Expected TPC-XXXXX' },
      { status: 400 },
    )
  }

  const shipment = await getShipmentWithHistory(validation.data)

  if (!shipment) {
    return NextResponse.json<TrackErrorResponse>(
      { error: 'Shipment not found' },
      { status: 404 },
    )
  }

  return NextResponse.json<TrackSuccessResponse>({ shipment })
}

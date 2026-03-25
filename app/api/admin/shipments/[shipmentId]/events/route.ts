import { NextResponse, type NextRequest } from 'next/server'
import { Role, TrackingStatus } from '@prisma/client'
import { prisma } from '../../../../../../lib/db/prisma'
import { getSessionFromRequest } from '../../../../../../lib/auth'
import { z } from 'zod'

const eventSchema = z.object({
  location: z.string().min(2),
  status: z.nativeEnum(TrackingStatus),
  timestamp: z.string().optional(),
  notes: z.string().optional(),
})

const requireAdmin = async (request: NextRequest) => {
  const session = await getSessionFromRequest(request)
  if (!session || session.role !== Role.ADMIN) {
    return null
  }
  return session
}

export async function POST(request: NextRequest, context: { params: { shipmentId: string } }) {
  const session = await requireAdmin(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = eventSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid tracking update' }, { status: 400 })
  }

  const shipment = await prisma.shipment.findUnique({
    where: { id: context.params.shipmentId },
    select: { id: true },
  })
  if (!shipment) {
    return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })
  }

  const timestamp = parsed.data.timestamp ? new Date(parsed.data.timestamp) : new Date()

  const event = await prisma.trackingUpdate.create({
    data: {
      shipmentId: context.params.shipmentId,
      location: parsed.data.location,
      status: parsed.data.status,
      timestamp,
      notes: parsed.data.notes ?? null,
    },
  })

  await prisma.shipment.update({
    where: { id: context.params.shipmentId },
    data: { status: parsed.data.status },
  })

  return NextResponse.json({ event })
}

import { NextResponse, type NextRequest } from 'next/server'
import { FreightMode, Role, TrackingStatus } from '@prisma/client'
import { prisma } from '../../../../lib/db/prisma'
import { getSessionFromRequest } from '../../../../lib/auth'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

const shipmentSchema = z.object({
  trackingNumber: z.string().trim().regex(/^TPC-\d{5}$/),
  clientId: z.string().uuid(),
  origin: z.string().min(2),
  destination: z.string().min(2),
  weight: z.coerce.number().positive(),
  freightMode: z.nativeEnum(FreightMode),
  status: z.nativeEnum(TrackingStatus).optional(),
  description: z.string().optional(),
})

const requireAdmin = async (request: NextRequest) => {
  const session = await getSessionFromRequest(request)
  if (!session || session.role !== Role.ADMIN) {
    return null
  }
  return session
}

export async function GET(request: NextRequest) {
  const session = await requireAdmin(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const shipments = await prisma.shipment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      client: { select: { id: true, name: true, email: true } },
      trackingEvents: { orderBy: { timestamp: 'desc' }, take: 1 },
    },
  })

  return NextResponse.json({ shipments })
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = shipmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid shipment details' }, { status: 400 })
  }

  const status = parsed.data.status ?? TrackingStatus.CREATED
  try {
    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber: parsed.data.trackingNumber.trim().toUpperCase(),
        clientId: parsed.data.clientId,
        origin: parsed.data.origin,
        destination: parsed.data.destination,
        weight: parsed.data.weight,
        freightMode: parsed.data.freightMode,
        status,
        description: parsed.data.description,
        trackingEvents: {
          create: [
            {
              location: parsed.data.origin,
              status,
              timestamp: new Date(),
              notes: 'Shipment created',
            },
          ],
        },
      },
      include: {
        client: { select: { id: true, name: true, email: true } },
      },
    })

    return NextResponse.json({ shipment })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'Tracking number already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Unable to create shipment' }, { status: 500 })
  }
}

import { NextResponse, type NextRequest } from 'next/server'
import { Role } from '@prisma/client'
import { prisma } from '../../../../lib/db/prisma'
import { getSessionFromRequest } from '../../../../lib/auth'

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  if (!session || session.role !== Role.CLIENT) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const shipments = await prisma.shipment.findMany({
    where: { clientId: session.userId },
    orderBy: { createdAt: 'desc' },
    include: {
      trackingEvents: { orderBy: { timestamp: 'asc' } },
    },
  })

  return NextResponse.json({ shipments })
}

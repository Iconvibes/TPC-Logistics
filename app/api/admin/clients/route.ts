import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '../../../../lib/db/prisma'
import { getSessionFromRequest } from '../../../../lib/auth'
import { createClientSchema } from '../../../../server/validators/auth'
import { Role } from '@prisma/client'

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

  const clients = await prisma.user.findMany({
    where: { role: Role.CLIENT },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, phone: true, isActive: true },
  })

  return NextResponse.json({ clients })
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = createClientSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid client details' }, { status: 400 })
  }

  const email = parsed.data.email.trim().toLowerCase()
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10)
  const client = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      phone: parsed.data.phone,
      passwordHash,
      role: Role.CLIENT,
      isActive: true,
    },
    select: { id: true, name: true, email: true, phone: true, isActive: true },
  })

  return NextResponse.json({ client })
}

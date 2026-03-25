import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '../../../../lib/db/prisma'
import { loginSchema } from '../../../../server/validators/auth'
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from '../../../../lib/auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid login details' }, { status: 400 })
  }

  const email = parsed.data.email.trim().toLowerCase()
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !user.isActive) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  })

  const response = NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  })
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions)
  return response
}

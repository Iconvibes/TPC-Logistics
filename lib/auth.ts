import { SignJWT, jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'tpc_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

export type UserRole = 'ADMIN' | 'CLIENT'

export type SessionPayload = {
  userId: string
  email: string
  role: UserRole
  name?: string | null
}

const getSecret = () => {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error('AUTH_SECRET is not set')
  }
  return new TextEncoder().encode(secret)
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_TTL_SECONDS,
}

export async function createSessionToken(payload: SessionPayload) {
  const secret = getSecret()
  return new SignJWT({
    email: payload.email,
    role: payload.role,
    name: payload.name ?? null,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secret)
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getSecret()
    const { payload } = await jwtVerify(token, secret)
    if (!payload.sub || typeof payload.email !== 'string' || typeof payload.role !== 'string') {
      return null
    }
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role as UserRole,
      name: typeof payload.name === 'string' ? payload.name : null,
    }
  } catch {
    return null
  }
}

export async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export async function getSessionFromCookies() {
  const token = cookies().get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}

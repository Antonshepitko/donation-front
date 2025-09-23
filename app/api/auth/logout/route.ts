// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  // Сносим cookie
  res.cookies.set('tipit_token', '', { httpOnly: true, path: '/', maxAge: 0 })
  return res
}

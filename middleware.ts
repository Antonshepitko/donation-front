// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

/**
 * Защищаем всё под /(protected) — пускаем только при наличии HttpOnly-cookie "tipit_token".
 * Если токена нет — редиректим на /auth/login?next=<исходный путь>.
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const isProtected = url.pathname.startsWith('/(protected)')

  if (!isProtected) return NextResponse.next()

  const token = req.cookies.get('tipit_token')?.value
  if (token) return NextResponse.next()

  const next = encodeURIComponent(url.pathname + (url.search || ''))
  const loginUrl = new URL(`/auth/login?next=${next}`, req.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  // матчим только секцию /(protected)
  matcher: ['/((protected)(/.*)?)'],
}

// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'

/**
 * Проксируем логин на бэкенд и ставим HttpOnly-cookie "tipit_token".
 * 
 * В кластере идём прямо на сервис бэка (DNS K8s):
 *   http://donation-backend.donation-app.svc.cluster.local:5000
 * Можно переопределить через ENV INTERNAL_API_BASE.
 * Для локалки при желании можно указать  http://localhost:30081  (NodePort) 
 */
const INTERNAL_API_BASE =
  process.env.INTERNAL_API_BASE ||
  'http://donation-backend.donation-app.svc.cluster.local:5000'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    const r = await fetch(`${INTERNAL_API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // !!! если у бэка self-signed TLS и вы хотите https — оставайтесь на http внутри кластера
      body: JSON.stringify({ username, password }),
    })

    if (!r.ok) {
      let message = `Login failed (${r.status})`
      try {
        const data = await r.json()
        message = data?.error || data?.message || message
      } catch {
        try { message = await r.text() } catch {}
      }
      return NextResponse.json({ error: message }, { status: 401 })
    }

    const data = await r.json() as { token: string }

    // Ставим HttpOnly cookie
    const res = NextResponse.json({ ok: true })
    const secure = process.env.NODE_ENV === 'production'
    res.cookies.set('tipit_token', data.token, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    })
    return res
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}

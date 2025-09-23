// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Публичные пути — пропускаем без проверки
  if (
    pathname.startsWith('/auth') ||      // /auth/login, /auth/register, ...
    pathname.startsWith('/api')  ||      // API роуты Next (включая /api/auth/login|logout)
    pathname.startsWith('/_next')||      // статика Next
    pathname === '/favicon.ico' ||
    pathname.startsWith('/images')       // если кладёте картинки в /public/images
  ) {
    return NextResponse.next();
  }

  // Всё остальное — приватно: нужен HttpOnly cookie с токеном
  const token = req.cookies.get('tipit_token')?.value;
  if (token) return NextResponse.next();

  const next = encodeURIComponent(pathname + (search || ''));
  const url  = new URL(`/auth/login?next=${next}`, req.url);
  return NextResponse.redirect(url);
}

// Важно: корректный matcher без capture-групп.
// Перехватываем все пути, кроме очевидных статик-ресурсов.
// (Это безопаснее и проще, чем пытаться матчить /(protected) — его в URL не существует.)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

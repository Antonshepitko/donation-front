'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Запрещаем пререндер: заставляем рендерить на запросе
export const dynamic = 'force-dynamic';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch {
        // игнорируем сетевые ошибки — всё равно уводим на логин
      } finally {
        // Берём next из реального location, без useSearchParams (чтобы не требовать Suspense)
        const sp = new URLSearchParams(window.location.search);
        const next = sp.get('next') || '/';
        router.replace(`/auth/login?next=${encodeURIComponent(next)}`);
      }
    })();
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-sm text-gray-400">
      Signing out…
    </div>
  );
}

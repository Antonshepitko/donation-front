// app/logout/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch {
        // игнорируем сеть/ошибки — всё равно уводим на логин
      } finally {
        const next = sp.get('next') || '/';
        router.replace(`/auth/login?next=${encodeURIComponent(next)}`);
      }
    })();
  }, [router, sp]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-sm text-gray-400">
      Signing out…
    </div>
  );
}

// components/RequireAuth.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getToken } from '@/lib/api';

/**
 * Оборачивает приватные страницы. Если токена нет — редиректит на /auth/login
 * и добавляет ?next=... для возврата после логина.
 */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      const next = encodeURIComponent(pathname || '/');
      router.replace(`/auth/login?next=${next}`);
      return;
    }
    setAllowed(true);
  }, [router, pathname]);

  if (!allowed) {
    // Можно отрендерить скелетон/спиннер, пока решается доступ
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-gray-400">
        Checking access…
      </div>
    );
  }

  return <>{children}</>;
}

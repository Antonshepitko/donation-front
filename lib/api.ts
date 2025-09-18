// lib/api.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE && process.env.NEXT_PUBLIC_API_BASE.trim() !== ''
    ? process.env.NEXT_PUBLIC_API_BASE
    : '/api';

export async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    // в браузере нам не нужен кеш для динамики
    cache: 'no-store',
    credentials: 'include',
    ...(init || {}),
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`${res.status} ${text}`);
  }
  // если пустой ответ, не падаем
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

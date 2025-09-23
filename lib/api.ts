// lib/api.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.trim() || '/api';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

type ApiOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
  auth?: boolean; // если true — подставим Bearer
};

export async function api<T = any>(path: string, opts: ApiOptions = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const token = opts.auth ? getToken() : null;

  const res = await fetch(url, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      message = data?.error || data?.message || message;
    } catch {
      try { message = await res.text(); } catch {}
    }
    throw new Error(message);
  }

  if (res.status === 204) return null as T;
  const text = await res.text();
  if (!text) return null as T;
  try { return JSON.parse(text) as T; }
  catch { return text as unknown as T; }
}

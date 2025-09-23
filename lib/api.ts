// lib/api.ts
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || '/api').trim();

export type LoginPayload = { username: string; password: string };
export type RegisterPayload = { username: string; password: string };

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}
export function setToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

async function request<T = any>(path: string, init: RequestInit = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    // постараемся достать внятное сообщение об ошибке
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
  try { return JSON.parse(text) as T; } catch { return text as unknown as T; }
}

export const authApi = {
  async login(body: LoginPayload): Promise<{ token: string }> {
    return request('/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  async register(body: RegisterPayload): Promise<any> {
    return request('/register', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
};

// опционально: обёртка для приватных запросов
export async function apiAuthed<T = any>(path: string, init: RequestInit = {}) {
  const token = getToken();
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
    cache: 'no-store',
  }).then(async (res) => {
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
    const text = await res.text();
    if (!text) return null as T;
    try { return JSON.parse(text) as T; } catch { return text as unknown as T; }
  });
}

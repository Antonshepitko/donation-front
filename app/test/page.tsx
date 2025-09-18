'use client';

import * as React from 'react';
import { api, API_BASE } from '@/lib/api';

type Health = { status: string };
type Donation = {
  _id?: string;
  amount: number;
  currency: string;
  name: string;
  message: string;
  streamer: string;
  timestamp?: string;
};

export default function TestPage() {
  const [health, setHealth] = React.useState<string>('…');
  const [creating, setCreating] = React.useState(false);
  const [created, setCreated] = React.useState<Donation | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // простая проверка /api/health
  React.useEffect(() => {
    api<Health>('/health')
      .then((h) => setHealth(h.status))
      .catch((e) => setHealth(`ERROR: ${e instanceof Error ? e.message : String(e)}`));
  }, []);

  // форма для создания доната (ПУБЛИЧНЫЙ POST)
  const [form, setForm] = React.useState<Donation>({
    amount: 123,
    currency: 'RUB',
    name: 'Tester',
    message: 'hi',
    streamer: 'streamer1', // подставь существующего юзера из /api/register
  });

  const submit = async () => {
    setError(null);
    setCreated(null);
    setCreating(true);
    try {
      // у тебя в бэке есть два пути: /api/donate (старый) и /api/donations (алиас)
      const res = await api<Donation>('/donations', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setCreated(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Test front → backend</h1>

      <p>
        <strong>API_BASE:</strong> {API_BASE}
      </p>
      <p>
        <strong>/api/health:</strong> {health}
      </p>

      <hr />

      <h2>Создать донат (POST {`/api/donations`})</h2>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
        <label>Amount <input type="number" value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} /></label>
        <label>Currency <input value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })} /></label>
        <label>Name <input value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Message <input value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
        <label>Streamer <input value={form.streamer}
          onChange={(e) => setForm({ ...form, streamer: e.target.value })} /></label>
      </div>
      <button disabled={creating} onClick={submit} style={{ marginTop: 12, padding: '8px 14px' }}>
        {creating ? 'Отправляем…' : 'Создать донат'}
      </button>

      {error && (
        <p style={{ color: 'crimson', marginTop: 12 }}>
          Ошибка: {error}
        </p>
      )}
      {created && (
        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
          {JSON.stringify(created, null, 2)}
        </pre>
      )}
    </div>
  );
}

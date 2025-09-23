// components/Form.tsx
'use client';

import React from 'react';

type Props = {
  title: string;
  submitLabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  success?: string | null;
};

export default function Form({
  title,
  submitLabel,
  onSubmit,
  children,
  loading,
  error,
  success,
}: Props) {
  return (
    <div className="mx-auto max-w-md p-6 rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>

      {error ? (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-700 text-sm">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mb-4 rounded-md border border-green-300 bg-green-50 p-3 text-green-700 text-sm">
          {success}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl px-4 py-2 border bg-black text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Подождите…' : submitLabel}
        </button>
      </form>
    </div>
  );
}

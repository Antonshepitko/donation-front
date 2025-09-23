// app/layout.tsx
import type { Metadata } from 'next'
import "./globals.css"

export const metadata: Metadata = {
  title: 'TipIt',
  description: 'TipIt front',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      {/* Если у тебя есть глобальные стили (например, app/globals.css), подключи тут:
          <link rel="stylesheet" href="/globals.css" />  или импортом вверху файла */}
      <body>{children}</body>
    </html>
  )
}

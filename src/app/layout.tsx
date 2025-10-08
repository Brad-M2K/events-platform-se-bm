
import "./globals.css";
import Link from 'next/link'

// src/app/layout.tsx
export const metadata = { title: 'Events', description: 'Browse events' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b">
          <nav className="mx-auto max-w-5xl p-4 flex gap-4">
            <Link href="/" className="font-semibold">Home</Link>
            <Link href="/events">Events</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
      </body>
    </html>
  );
}
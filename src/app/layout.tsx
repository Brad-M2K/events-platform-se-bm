import './globals.css'
import Link from 'next/link'
import { MousePointerClick } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

// src/app/layout.tsx
export const metadata = { title: 'Events', description: 'Browse events' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex items-center justify-between gap-6 px-4 py-3 max-w-5xl">
            <Link href="/" className="group flex items-center gap-2 text-primary">
              <MousePointerClick className="h-6 w-6 transition-transform duration-300 group-hover:rotate-10 group-hover:scale-110" aria-hidden />
              <span className="text-xl font-semibold text-foreground">EventClick</span>
            </Link>

            <div className="flex items-center gap-3">
              <nav className="flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                <Link href="/" className="transition-colors hover:text-primary">Home</Link>
                <Link href="/events" className="transition-colors hover:text-primary">Events</Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl p-4 text-foreground">{children}</main>
      </body>
    </html>
  );
}

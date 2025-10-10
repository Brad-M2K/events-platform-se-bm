'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'eventclick-theme'

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const initial = getPreferredTheme()
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const isDark = theme === 'dark'

  const handleToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="rounded-full"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type SkeletonCardProps = HTMLAttributes<HTMLDivElement>

export function SkeletonCard({ className, ...props }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'h-40 w-full rounded-xl bg-muted/60 animate-pulse shadow-sm',
        'border border-border/50',
        className,
      )}
      {...props}
    />
  )
}

type EventListSkeletonProps = {
  count?: number
  className?: string
}

export function EventListSkeleton({ count = 6, className }: EventListSkeletonProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} className="h-48" />
      ))}
    </div>
  )
}

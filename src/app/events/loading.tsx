import { EventListSkeleton } from '@/components/SkeletonCard'

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <EventListSkeleton />
      </div>
    </div>
  )
}

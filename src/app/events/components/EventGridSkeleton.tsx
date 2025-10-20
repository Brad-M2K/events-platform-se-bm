import EventCardSkeleton from '@/components/EventCardSkeleton'

type EventGridSkeletonProps = {
  count?: number
}

export default function EventGridSkeleton({ count = 6 }: EventGridSkeletonProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  )
}

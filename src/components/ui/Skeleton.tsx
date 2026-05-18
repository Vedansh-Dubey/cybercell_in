import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skel', className)} />
}

export function CardSkeleton() {
  return (
    <div className="card">
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}

export function NewsSkeleton() {
  return (
    <div className="news-grid">
      {[0, 1, 2].map(i => (
        <div key={i} className={`card news-card ${i === 0 ? 'featured' : ''}`}>
          <div className="thumb">
            <Skeleton className="absolute inset-0 rounded-none" />
          </div>
          <div className="body">
            <Skeleton className="h-4 w-1/4 mb-3" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-4/5 mb-3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

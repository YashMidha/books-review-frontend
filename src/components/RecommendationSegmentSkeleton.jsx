import React from 'react'
import RecommendedCardSkeleton from './RecommendedCardSkeleton'
import { Skeleton } from './ui/skeleton'

const RecommendationSegmentSkeleton = () => {
  return (
    <div className='mt-12'>
        <Skeleton className='mb-4 w-3/6 md:w-2/6 h-6 bg-gray-200' />
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {Array.from({ length: 6 }).map((_, idx) => (
                <RecommendedCardSkeleton key={idx} />
            ))}
        </div>
    </div>
  )
}

export default RecommendationSegmentSkeleton


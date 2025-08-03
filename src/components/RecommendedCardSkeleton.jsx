import React from 'react'
import { Skeleton } from './ui/skeleton'

const RecommendedCardSkeleton = () => {
  return (
    <div className="shrink-0 relative w-38 sm:w-50 block rounded-md overflow-hidden bg-gray-200">
      <Skeleton className="w-full h-55 sm:h-75"/>
    </div>
  )
}

export default RecommendedCardSkeleton

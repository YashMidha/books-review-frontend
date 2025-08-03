import React from 'react'
import { Skeleton } from './ui/skeleton'

const ReviewCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white space-y-4 overflow-hidden">
      <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
        <Skeleton className="bg-gray-200 w-14 h-14 rounded-full border flex items-center justify-center overflow-hidden flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <Skeleton className="bg-gray-200 h-4 w-30" />
            <Skeleton className="bg-gray-200 h-4 w-10" />
          </div>

          <div className="flex items-center gap-1 text-sm mt-1">
            <Skeleton className="bg-gray-200 h-4 w-10" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-5/6 bg-gray-200" />
          <Skeleton className="h-4 w-4/6 bg-gray-200" />
          <Skeleton className="h-4 w-3/6 bg-gray-200" />
        </div>
    </div>
  )
}

export default ReviewCardSkeleton
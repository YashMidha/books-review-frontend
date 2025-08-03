import { Skeleton } from "@/components/ui/skeleton"
import RecommendedCardSkeleton from "./RecommendedCardSkeleton"
import ReviewCardSkeleton from "./ReviewCardSkeleton"

const BookPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-12 py-10 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">

        <div className="max-w-[260px] w-full mx-auto flex flex-col gap-5">
          <Skeleton className="w-full h-[350px] bg-gray-200 rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full bg-gray-200" />
            <Skeleton className="h-10 w-full bg-gray-200" />
            <Skeleton className="block md:hidden h-10 w-full bg-gray-200" />
          </div>
          <div className="hidden md:block space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full bg-gray-200" />
            ))}
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-4 space-y-6">
            <div className="space-y-3 flex flex-col md:items-start items-center">
                <Skeleton className="h-8 w-1/2 bg-gray-200" />
                <Skeleton className="h-4 w-1/3 bg-gray-200" />
            </div>
            <div className="flex flex-col md:items-start items-center">
                <Skeleton className="h-4 w-28 bg-gray-200" />
            </div>
          <Skeleton className="h-24 w-full bg-gray-200" />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full bg-gray-200" />
            ))}
          </div>

          <hr className="border-t" />
          <div>
            <Skeleton className="h-6 w-40 mb-4 bg-gray-200" />
            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <RecommendedCardSkeleton key={i} />
              ))}
            </div>
          </div>

          <hr className="border-t" />
          <div>
            <Skeleton className="h-6 w-40 mb-4 bg-gray-200" />
            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <RecommendedCardSkeleton key={i} />
              ))}
            </div>
          </div>

          <hr className="border-t" />
          <div className="space-y-6">
            <Skeleton className="h-6 w-32 mb-4 bg-gray-200" />
            {Array.from({ length: 3 }).map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default BookPageSkeleton

import { Skeleton } from "@/components/ui/skeleton";

const SearchCardSkeleton = () => {
  return (
    <div className="p-4 border border-gray-200 rounded-xl shadow-sm space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4 bg-gray-200" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/2 bg-gray-200" /> 
          <Skeleton className="h-4 w-10 bg-gray-200" />
        </div>
      </div>

      <Skeleton className="h-px w-full bg-gray-200" />

      <div className="flex gap-4">
        <Skeleton className="w-24 h-36 rounded-md bg-gray-200" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-5/6 bg-gray-200" />
          <Skeleton className="h-4 w-4/6 bg-gray-200" />
        </div>
      </div>

      <Skeleton className="h-3 w-1/3 bg-gray-200" />
    </div>
  );
};

export default SearchCardSkeleton;

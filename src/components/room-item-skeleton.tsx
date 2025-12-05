import { Skeleton } from "@/components/ui/skeleton";

export const RoomItemSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm max-w-sm mx-auto w-full">
      <div className="relative h-56 w-full">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 border border-t-0 border-green-500 rounded-b-lg p-5 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          <div className="pt-2 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
};
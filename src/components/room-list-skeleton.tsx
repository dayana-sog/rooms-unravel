import { RoomItemSkeleton } from './room-item-skeleton';

interface RoomListSkeletonProps {
    loadingMoreLength?: number;
}

export const RoomListSkeleton = ({loadingMoreLength}: RoomListSkeletonProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
    {Array.from({ length: loadingMoreLength || 8 }).map((_, index) => (
      <RoomItemSkeleton key={index} />
    ))}
  </div>
);

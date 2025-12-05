import { RoomItemSkeleton } from './room-item-skeleton';

export const RoomListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
    {Array.from({ length: 8 }).map((_, index) => (
      <RoomItemSkeleton key={index} />
    ))}
  </div>
);

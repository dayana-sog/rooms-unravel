import type { Room } from '../types/room';
import RoomItem from './room-item';
import { RoomListSkeleton } from './room-list-skeleton';

interface RoomListProps {
  rooms: Room[];
  loading?: boolean;
}

const RoomList = ({ rooms, loading }: RoomListProps) => {
  if (loading && rooms.length === 0) {
    return <RoomListSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {rooms.map((room, index) => (
        <RoomItem key={index} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
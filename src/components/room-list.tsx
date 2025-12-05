import {useState} from 'react';
import type { Room } from '../types/room';
import RoomItem from './room-item';
import { RoomListSkeleton } from './room-list-skeleton';

interface RoomListProps {
  rooms: Room[];
  loading?: boolean;
}

const RoomList = ({ rooms, loading }: RoomListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (loading && rooms.length === 0) {
    return <RoomListSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {rooms.map((room, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <div
            key={index}
            className={`
              relative transition-all duration-300
              ${isExpanded ? "z-0" : "z-0"}
            `}
          >
          <RoomItem
              room={room}
              expanded={isExpanded}
              onToggle={() =>
                setExpandedIndex(isExpanded ? null : index)
              }
            />
          </div>
        )
      })}
    </div>
  );
};

export default RoomList;
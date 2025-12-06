import { useEffect, useState, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'

import RoomList from '@/components/room-list';
import { RoomListSkeleton } from '@/components/room-list-skeleton';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import useIsMobile from '@/hooks/useIsMobile';
import type { RootState, AppDispatch } from '@/store';
import { fetchAllRooms } from '@/store/slices/room';
import type { Room } from '@/types/room';

const App = () => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch<AppDispatch>();

  const { rooms, hotelDetails, loading, error } = useSelector(
    (state: RootState) => state.room,
  );

  const [visibleRooms, setVisibleRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(isMobile ? 6 : 9);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore || loading) return;

    setLoadingMore(true);

    // Simulate loading delay
    setTimeout(() => {
      const start = page * pageSize;
      const end = start + pageSize;
      const nextChunk = rooms.slice(start, end);

      if (nextChunk.length === 0) {
        setHasMore(false);
      } else {
        setVisibleRooms((prev) => [...prev, ...nextChunk]);
        setPage((prev) => prev + 1);
      }

      setLoadingMore(false);
    }, 1200);
  }, [page, rooms, hasMore, loading, pageSize, loadingMore]);

  const sentinelRef = useInfiniteScroll(loadMore);

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  useEffect(() => {
    if (!rooms.length) return;

    setVisibleRooms(rooms.slice(0, pageSize));
    setPage(1);
    setHasMore(true);
  }, [rooms, pageSize]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Mockup */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-1.5 rounded-md">
                <MapPin size={20} />
            </div>
            {loading ? (
              <h1 className="text-xl font-bold text-gray-800">Loading...</h1>
            ) : (
              <h1 className="text-xl font-bold text-gray-800">{hotelDetails?.display_name}</h1>
            )}
          </div>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            Change Search
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full">
        <div className="py-6 px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Rooms</h2>
            <p className="text-gray-500 mb-6">Prices shown are after taxes and discounts.</p>

            {error ? (
              <div className="mt-8 rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-red-800">
                <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
                <p className="text-sm">{error}</p>
              </div>
            ) : (
              <RoomList rooms={visibleRooms} loading={loading} />
            )}

            {loadingMore && <RoomListSkeleton loadingMoreLength={3} />}

            {hasMore && !loadingMore && (
              <div ref={sentinelRef} style={{ height: 50 }} />
            )}
        </div>
      </main>

      {/* Footer Mockup */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          &copy; 2025 Hotel Booking App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
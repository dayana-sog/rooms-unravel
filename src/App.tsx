import { useEffect, useState } from 'react';

import type { Room, RoomsBySerialNo, HotelDetails } from './types/room';
import { MapPin } from 'lucide-react';
import RoomList from './components/room-list';

const App = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch('data/sample.json', { cache: 'no-store' })
        .then((response) => response.json())
        .then((data: { rooms_by_serial_no: RoomsBySerialNo[], hotel_details: HotelDetails }) => {
          setHotelDetails(data?.hotel_details);
          const flatRooms = data.rooms_by_serial_no.flatMap((group) => group.rooms);
          setRooms(flatRooms);
        }).finally(() => {
          setLoading(false);
        });
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Mockup */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-1.5 rounded-md">
                <MapPin size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">{hotelDetails?.display_name}</h1>
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
      
            <RoomList rooms={rooms} loading={loading} />
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
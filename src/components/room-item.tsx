import type { Room } from '../types/room';
import { Coffee, Bed, User, ChevronRight, Percent } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface RoomItemProps {
  room: Room;
  expanded: boolean;
  onToggle: () => void;
}

const RoomItem = ({ room, expanded, onToggle }: RoomItemProps) => {
  const variantsToShow = expanded
    ? room.variants
    : room.variants.slice(0, 1);

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-sm mx-auto w-full">
      {/* Image Section */}
      <div className="relative h-56 w-full">
        <img
          src="/vite.svg"
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Variants Section */}
      <div className="flex-1 border border-t-0 border-green-500 rounded-b-lg p-5 flex flex-col justify-between space-y-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-3 text-gray-700 cursor-pointer">
              <h2 className="text-lg font-semibold truncate">{room.name}</h2>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{room.name}</p>
          </TooltipContent>
        </Tooltip>

        {variantsToShow.map((variant) => {
          const mealsProp = variant.display_properties.find(
            (prop) => prop.name === 'meals_included'
          )
          const bedProp = variant.display_properties.find(
            (prop) => prop.name === 'bed_type'
          )
          const occupancyProp = variant.display_properties.find(
            (prop) => prop.name === 'adult_occupancy'
          )

          const pricing = variant.total_price;
          const promo = pricing?.promo_list?.[0];
          const originalPrice = pricing?.total_price_rounded ?? pricing?.total_price ?? 0;
          const discountedPrice = pricing?.discounted_price_rounded ?? pricing?.discounted_price ?? 0;
          const currency = pricing?.currency ?? 'RM';
          const discountPercentage = promo?.discount ? Math.round(promo.discount * 100) : 0;
          const cancellationPolicy = variant.cancellation_info.free_cancellation_info || 'Cancellation policy';

          const formatPrice = (price: number) => price.toLocaleString();

          return (
            <div key={variant.variant_id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <Coffee className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{mealsProp?.value}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Bed className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{bedProp?.value}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <User className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{occupancyProp?.value}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs text-gray-500 mb-0.5">{variant.price_info}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-400 line-through decoration-gray-400">
                    {currency}{formatPrice(originalPrice)}
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {currency}{formatPrice(discountedPrice)}
                  </span>
                  {discountPercentage > 0 && (
                    <div className="bg-[#244296] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-0.5">
                      <Percent size={10} strokeWidth={4} />
                      <span>{discountPercentage} off</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button className="flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                  {cancellationPolicy}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button className="w-full bg-[#46a14e] hover:bg-[#3d8b43] text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
                Select
              </button>
            </div>
          );
        })}

        {room.variants.length > 1 && (
          <button
            type="button"
            className="self-start text-sm font-medium text-green-700 hover:text-green-800 underline underline-offset-2"
            onClick={() => onToggle()}
          >
            {expanded
              ? 'See less options'
              : `See more ${room.variants.length - 1} option${room.variants.length - 1 > 1 ? 's' : ''}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomItem;


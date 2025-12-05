import { useState, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Coffee, Bed, User, ChevronRight, Percent, ChevronLeft } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay"

import type { Room } from '../types/room';
import { type CarouselApi } from "@/components/ui/carousel"

import LazyImage from './ui/lazy-image';
import LazyVideo from './ui/lazy-video';

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
  const [indexImagemShow, setIndexImagemShow] = useState(0);
  const [apiCarousel, setApiCarousel] = useState<CarouselApi>()

  const variantsToShow = expanded
    ? room.variants
    : room.variants.slice(0, 1);

  const imageUrls = room.properties.room_images
    ? room.properties.room_images.flatMap((img) => img.image_urls)
    : [];

  const videoUrl = room.properties.video_url
    ? room.properties.video_url.med
    : '';

  const totalSlides = (videoUrl ? 1 : 0) + imageUrls.length;

  useEffect(() => {
    if (!apiCarousel) {
      return
    }
 
    apiCarousel.on("select", () => {
      setIndexImagemShow(apiCarousel.selectedScrollSnap() + 1)
    })
  }, [apiCarousel])

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-sm mx-auto w-full">
      {/* Image Section */}
      <div className="relative h-56 w-full">
      {videoUrl || imageUrls.length > 0 ? (
        <>
          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            setApi={setApiCarousel}
            className="w-full h-full group"
          >
            <CarouselContent className="h-full">
              {videoUrl && (
                <CarouselItem className="h-56" key="video">
                  <LazyVideo
                    src={videoUrl}
                    className="w-full h-full object-cover rounded-t-lg"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </CarouselItem>
              )}

              {imageUrls.map((src, index) => (
                <CarouselItem key={index} className="h-56">
                  <LazyImage
                    src={src}
                    alt={room.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>


            {totalSlides > 1 && (
              <>
                <CarouselPrevious 
                  className="absolute cursor-pointer top-1/2 left-2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </CarouselPrevious>

                <CarouselNext 
                  className="absolute cursor-pointer top-1/2 right-2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </CarouselNext>
              </>
            )}
          </Carousel>

          {totalSlides > 1 && (
            <div className="absolute bottom-2 left-2 flex gap-1">
              {(videoUrl ? [videoUrl, ...imageUrls] : imageUrls).map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === indexImagemShow ? 'bg-white' : 'bg-white/50'
                  } border border-white/90`}
                />
              ))}
            </div>
          )}
         
        </>
      ) : null}
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
            className="cursor-pointer self-start text-sm font-medium text-green-700 hover:text-green-800 underline underline-offset-2"
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


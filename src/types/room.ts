export interface RoomsBySerialNo {
  serial_no: number;
  rooms: Room[];
}

export interface HotelDetails {
  display_name: string;
}

export interface Room {
  name: string;
  variants: RoomVariant[];
  properties: RoomProperties;
}

export interface RoomVariant {
  variant_code: string;
  variant_id: string;
  name: string;
  display_properties: RoomDisplayProperty[];
  cancellation_info: RoomCancellationInfo;
  total_price: RoomTotalPrice;
  price_info: string;
}

export interface RoomProperties {
  room_images?: RoomImage[];
  video_url?: RoomVideoProperty;
} 

export interface RoomImage {
  image_urls: string[],
}

export interface RoomVideoProperty {
  med: string;
}

export interface RoomDisplayProperty {
  name: string;
  display_name: string;
  icon_name: string;
  order: string;
  value: string;
}

export interface RoomCancellationInfo {
  free_cancellation_info: string;
}

export interface RoomTotalPrice {
  total_price: number;
  discounted_price: number;
  total_price_rounded: number;
  discounted_price_rounded: number;
  currency: string;
  promo: Promo;
  promo_list: PromoListItem[];
}

export interface Promo {
  discount: number | null;
}

export interface PromoListItem {
  discount: number;
}

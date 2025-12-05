export interface RoomsBySerialNo {
  serial_no: number;
  rooms: Room[];
}

export interface HotelDetails {
  display_name: string;
}

export interface Room {
  name: string;
  room_type_code: string;
  variants_count: number;
  variants: RoomVariant[];
  properties: RoomProperties;
}

export interface RoomVariant {
  cancellation_timeline: CancellationTimeline;
  old_cancellation_timeline: CancellationTimeline;
  is_discount: boolean;
  context: unknown | null;
  variant_code: string;
  variant_id: string;
  name: string;
  properties: RoomVariantProperties;
  display_properties: RoomDisplayProperty[];
  additional_info: RoomAdditionalInfo;
  cancellation_info: RoomCancellationInfo;
  total_price: RoomTotalPrice;
  is_bookable: boolean;
  valid_for_occupancy: unknown | null;
  price_info: string;
  original_cancellation_info: OriginalCancellationInfo;
  roomwise_coupon: unknown | null;
}

export interface RoomProperties {
  room_images?: RoomImage[];
  video_url?: RoomVideoProperty;
} 

export interface RoomImage {
  id: string,
  key: string,
  count: number,
  image_urls: string[],
  display_name: string
}

export interface CancellationTimeline {
  cancellation_rules: CancellationRule[];
  free_cancellation: number;
  no_show: number;
  no_show_description: string | null;
  free_cancellation_description: string;
}

export interface CancellationRule {
  currently_here: boolean;
  title: string;
  sub_title: string;
  type: number;
  amount: number;
  currency: string;
  to_date: string;
  from_date: string;
}

export interface RoomVariantProperties {
  passenger_names_required_for_booking: number;
  allows_extra_meals: boolean;
  allows_special_requests: boolean;
  allows_bedding_preference: boolean;
  min_stay: string;
  date_apply_min_stay: string;
  on_request: number;
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

export interface RoomAdditionalInfo {
  tariff_notes: string;
  short_tariff_notes: string;
}

export interface RoomCancellationInfo {
  free_cancellation: number;
  free_cancellation_info: string;
  free_cancel_description: string;
  free_amendment_description: string | null;
  cancellation_rules: RoomCancellationCostRule[];
}

export interface RoomCancellationCostRule {
  date_info: string;
  description: string;
  cost: number | null;
}

export interface RoomTotalPrice {
  total_price: number;
  discounted_price: number;
  total_price_rounded: number;
  discounted_price_rounded: number;
  currency: string;
  price_break_up: PriceBreakup[];
  previous_price: number | null;
  previous_price_rounded: number | null;
  price_changed: boolean | null;
  offer_present: boolean;
  promo: Promo;
  promo_list: PromoListItem[];
  markup: {
    fixed_markup: number;
    dynamic_markup: number;
  };
  markup_share: {
    discount: number;
    client_commission: number;
    unravel_commission: number;
  };
}

export interface PriceBreakup {
  unravel_markup: number;
  total_sale_price: number;
  dotw_discounted_price: number;
  fixed_markup_price: number;
  dynamic_markup_price: number;
  base_price: number;
  unravel_commission: number;
  client_commission: number;
  final_discounted_price: number;
}

export interface Promo {
  discount: number | null;
  offer_type: string | null;
  offer_title: string | null;
  offer_description: string | null;
  offer_condition: string | null;
  offer_note: string | null;
  offer_stay: string | null;
  offer_pay: string | null;
  offer_upgrade_to_room_id: string | null;
  offer_upgrade_to_meal_id: string | null;
  offer_discounted_nights: number | null;
  offer_total_price: number | null;
  offer_discounted_total_price: number | null;
}

export interface PromoListItem {
  discount: number;
  offer_type: string;
  offer_title: string;
  offer_description: string;
  offer_condition: string | null;
  offer_note: string | null;
  offer_stay: string | null;
  offer_pay: string | null;
  offer_upgrade_to_room_id: string | null;
  offer_upgrade_to_meal_id: string | null;
  offer_discounted_nights: number | null;
  offer_total_price: number;
  offer_discounted_total_price: number;
}

export interface OriginalCancellationInfo {
  count: number;
  rule: OriginalCancellationRule[];
}

export interface OriginalCancellationRule {
  runno: number;
  to_date?: string;
  to_date_details?: string;
  from_date?: string;
  from_date_details?: string;
  amend_charge: ChargeValue;
  cancel_charge: ChargeValue;
  charge: ChargeValue;
}

export interface ChargeValue {
  value: number;
  formatted: string;
}

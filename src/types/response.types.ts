export interface Auction {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  basePrice: number;
  currentPrice: number;
  bidderCount: number;
  scrapCount: number;
  thumbnailUrl: string | null;
  isScrapped: boolean | null;
}

export interface SearchHistory {
  id: number;
  keyword: string;
  createdAt: string;
}

export interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface SearchListResponse {
  totalAuctionsCount: number;
  auctionList: Auction[];
}

interface DeliveryAddress{
  id: number;
  name: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  isDefault: boolean;
}

export interface OrderResponse {
  auctionId: number;
  auctionTitle: string;
  auctionThumbnail: string;
  customerName: string;
  deliveryAddress: DeliveryAddress;
  deliveryFee: number;
  finalPrice: number;
  itemPrice: number;
}
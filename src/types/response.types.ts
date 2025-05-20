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

export interface PaymentResponse {
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  customerEmail: string;
  customerName: string;
  customerMobilePhone: string;
  finalPrice: number;
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
  orderId: string;
  auctionId: number;
  auctionTitle: string;
  auctionThumbnail: string;
  finalPrice: number;
  deliveryAddress: DeliveryAddress;
  paymentType: string;
  paymentStatus: string;
}
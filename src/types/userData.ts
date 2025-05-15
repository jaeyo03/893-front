
export interface User {
  email: string,
  name: string,
  profileUrl: string,
  provider: string,
}

export interface DeliveryAddress {
  id: number,
  name: string,
  phoneNumber: string,
  addressLine1: string,
  addressLine2: string,
  zipCode: string,
  isDefault: boolean,
}
export type Status = 'pending' | 'active' | 'completed' | 'cancelled';

export interface MyBidProduct {
  bidId: number,
  isWinning: boolean,
  bidHighestPrice: number,
  userPrice: number,
  title: string,
  endTime: string,
  startTime: string,
  status: Status,
  auctionId: number,
  mainImageUrl: string,
}

export interface MyAuctionsProduct {
  auctionId: number,
  bidHighestPrice: number,
  title: string,
  endTime: string,
  startTime: string,
  status: Status,
  mainImageUrl: string,
}

export interface MyScrapsProduct {
  auctionId: number,
  bidHighestPrice: number,
  title: string,
  endTime: string,
  startTime: string,
  status: Status,
  mainImageUrl: string,
}

export interface MyPaymentsProduct {
  auctionId: number,
  orderNumber: string,
  mainImageUrl: string,
  finalPrice: number,
  title: string,
}
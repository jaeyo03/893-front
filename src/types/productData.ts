export interface Product {
  auctionId: number;
  title: string;
  description: string;
  sellerEmailMasked: string;
  status: Status;
  itemCondition: ItemCondition;
  basePrice: number;
  isScraped: boolean;
  scrapCount: number;
  isSeller: boolean;
  category: Category;
  startTime: string;
  endTime: string;
  mainImage: Image;
  images: Image[];
  hasBeenPaid: boolean;
  currentUserBuyer: boolean;
}

export interface Image {
  originalName: string;
  storeName: string;
  url: string;
  imageSeq: number;
}

export interface Category {
  id: number;
  mainCategory: string;
  subCategory: string;
  detailCategory: string;
}

export type ItemCondition =
  | "brand_new"
  | "like_new"
  | "gently_used"
  | "heavily_used"
  | "damaged";

export type Status = "pending" | "active" | "completed" | "cancelled";

export interface Bid {
  bidId: number;
  bidderEmail: string;
  bidPrice: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface AuctionBidData {
  auctionId: number;
  totalBid: number;
  totalBidder: number;
  recentUserBid : Bid;
  bids: Bid[];
  canCancelBid: boolean;
  cancelledBids: Bid[];
  userBids: UserBids[];
}

export interface UserBids {
  bidId: number;
  pidPrice: number;
  createdAt: string;
}

export interface BidPostResponse {
  canCancelBid: boolean;
  bid : Bid;
}

export interface RelatedItem {
  auctionId: number;
  title: string;
  status: Status;
  thumbnailUrl: string;
  endTime: string;
  price?: number;
  bidCount: number;
  scrapCount: number;
  isScraped: boolean;
}

export interface AuctionCategory {
  id: number;
  name: string;
  parentId: number | null;
  childrendIdList: number[];
}

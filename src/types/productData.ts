export interface Product {
  auctionId: number;
  title: string;
  description: string;
  sellerEmailMasked: string;
  status: Status;
  itemCondition: ItemCondition;
  basePrice: number;
  isScrap: boolean;
  scrapCount: number;
  isSeller: boolean;
  category: Category;
  startTime: string;
  endTime: string;
  mainImage: Image;
  images: Image[];
}

export interface Image{
  originalName: string;
  storeName: string;
  url: string;
  imageSeq:number;
}

export interface Category{
  id :number;
  mainCategory:string;
  subCategory:string;
  detailCategory:string;
}

export type ItemCondition = 'brand_new' | 'like_new' | 'gently_used' | 'heavily_used' | 'damaged';

export type Status = 'pending' | 'active' | 'completed' | 'cancelled';

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
  bids: Bid[];
  cancelledBids: Bid[];
}

export interface AuctionStatsProps {
  product: Product;
  auctionBidData: AuctionBidData;
  isBookmarked: boolean;
  bookmarkCount: number;
  onBookmarkToggle: () => void;
}

export interface BidInteractionProps {
  currentPrice: number;
  onBid: (amount: number) => void;
  onCancelBid: () => void;
  isHighestBidder: boolean;
  cancelTimer: number;
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
  isScrapped: boolean;
}
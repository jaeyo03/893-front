export interface RelatedProduct {
  imageUrl: string;
  sellerEmail: string;
  title: string;
  status: 'yet' | 'done' | 'in-progress';
  startTime: string;
  endTime: string;
  currentPrice: number;
  startPrice:number
  bidCount: number;
  bidderCount: number;
  scrapCount: number;
  mainCategory: string;
  subCategory: string;
  lastCategory: string;
  itemId: number;
}

export const getProductDescription = (itemId: number): string => {
  // 추후 API 연동 시 이 부분을 대체
  return "해당 상품은 아디다스 신발입니다.\n 사주세요.";
};

export const getRelatedProducts = (itemId: number): RelatedProduct[] => {
  return [
    {
      imageUrl: "/images/adidas_shoe.jpg",
      title: "아디다스 삼바 블랙 팝니다",
      status: "yet",
      startTime: "2025-04-20",
      endTime: "2025-05-13 10:00:00",
      currentPrice: 30000,
      startPrice:25000,
      bidCount: 3,
      bidderCount:2,
      scrapCount: 10,
      mainCategory: "의류",
      subCategory: "신발",
      lastCategory: "아디다스",
      itemId: itemId,
      sellerEmail: "g***@gmail.com"
    },
    // 다른 상품들 추가 가능
  ];
};

export interface Bid {
  rank: number;
  email: string;
  amount: number;
  time: string;
}

export const getBids = (): Bid[] => [
  { rank: 1, email: '홍길동', amount: 30000, time: '12:35:12' },
  { rank: 2, email: '이몽룡', amount: 28000, time: '12:30:44' },
  { rank: 3, email: '성춘향', amount: 25000, time: '12:20:15' },
];

export const getCanceledBids = (): Bid[] => [
  { rank: 1, email: '변학도', amount: 27000, time: '12:10:03' },
];

export interface AuctionStatsProps {
  relatedProducts: RelatedProduct;
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
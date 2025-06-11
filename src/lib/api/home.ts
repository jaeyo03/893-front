export interface AuctionItem {
  auctionId: number;
  title: string;
  description: string;
  basePrice: number;
  thumbnailUrl: string;
  status: string;
  isScraped: boolean;
}

interface BaseResponse<T> {
  message: string;
  data: T;
}

export interface DashboardStatsResponse {
  totalUserCount: number;
  totalAuctionCount: number;
  activeAuctionCount: number;
}

export interface AuctionSoonItem {
  auctionId: number;
  title: string;
  description: string;
  scrapCount: number;
  thumbnailUrl: string;
  itemCondition:
    | "brand_new"
    | "like_new"
    | "gently_used"
    | "heavily_used"
    | "damaged";
  basePrice: number;
  leftTime: string; // "HH:MM:SS"
}

export interface TopBidItem {
  auctionId: number;
  title: string;
  bidCount: number;
  thumbnailUrl: string;
  basePrice: number;
  itemPrice: number;
  buyer: string;
}
export interface AuctionRankingItem {
  auctionId: number;
  title: string;
  description: string;
  bidCount: number;
  scrapCount: number;
  thumbnailUrl: string;
  itemCondition:
    | "brand_new"
    | "like_new"
    | "gently_used"
    | "heavily_used"
    | "damaged";
  status: "active" | "upcoming";
  rankNum: number;
}

export interface BestCategoryItem {
  auctionId: number;
  title: string;
  scrapCount: number;
  thumbnailUrl: string;
  itemCondition:
    | "brand_new"
    | "like_new"
    | "gently_used"
    | "heavily_used"
    | "damaged";
  status: "active" | "pending";
  isAuctionImminent: boolean;
  rankNum: number;
}

export interface BestCategoryGroup {
  subCategoryId: number;
  subCategoryName: string;
  items: BestCategoryItem[];
}

export const getRecentAuctions = async (): Promise<
  BaseResponse<AuctionItem[]>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home/recentAuction`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("최근 경매 목록 불러오기 실패:", error);
    throw new Error("최근 경매 목록 불러오기 실패");
  }
};

export const getDashboardStats = async (): Promise<
  BaseResponse<DashboardStatsResponse>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home/dashboard`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("대시보드 통계 불러오기 실패:", error);
    throw new Error("대시보드 통계 불러오기 실패");
  }
};

export const getAuctionSoonItems = async (): Promise<
  BaseResponse<AuctionSoonItem[]>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home/upcoming`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("경매 임박 상품 불러오기 실패:", error);
    throw new Error("경매 임박 상품 불러오기 실패");
  }
};

export const getTopBidItems = async (): Promise<BaseResponse<TopBidItem[]>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home/topBid`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상위 입찰 상품 불러오기 실패:", error);
    throw new Error("상위 입찰 상품 불러오기 실패");
  }
};

export const getRealTimeRankingActive = async (): Promise<
  BaseResponse<AuctionRankingItem[]>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home/ranking/active`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("실시간 경매 랭킹 불러오기 실패:", error);
    throw new Error("실시간 경매 랭킹 불러오기 실패");
  }
};

export const getRealTimeRankingPending = async (): Promise<
  BaseResponse<AuctionRankingItem[]>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home/ranking/pending`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("실시간 경매 랭킹 불러오기 실패:", error);
    throw new Error("실시간 경매 랭킹 불러오기 실패");
  }
};

export const getBestByCategory = async (): Promise<
  BaseResponse<BestCategoryGroup[]>
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home/best-sub-item`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("카테고리별 베스트 불러오기 실패:", error);
    throw new Error("카테고리별 베스트 불러오기 실패");
  }
};

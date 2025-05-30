import axios from "axios";

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
  isCurrentUserBuyer: string;
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

export const fetchRecentAuctions = async (): Promise<AuctionItem[]> => {
  const response = await axios.get<BaseResponse<AuctionItem[]>>(
    "http://localhost:8080/api/home/recentAuction",
    { withCredentials: true }
  );
  return response?.data?.data;
};

export const fetchDashboardStats =
  async (): Promise<DashboardStatsResponse> => {
    const response = await axios.get(
      "http://localhost:8080/api/home/dashboard",
      {
        withCredentials: true,
      }
    );

    return response?.data;
  };

export const fetchAuctionSoonItems = async (): Promise<AuctionSoonItem[]> => {
  const response = await axios.get("http://localhost:8080/api/home/upcoming", {
    withCredentials: true,
  });
  return response?.data?.data;
};

export const fetchTopBidItems = async (): Promise<TopBidItem[]> => {
  const response = await axios.get("http://localhost:8080/api/home/topBid", {
    withCredentials: true,
  });

  return response?.data?.data;
};

export const fetchRealTimeRankingActive = async (): Promise<
  AuctionRankingItem[]
> => {
  const response = await axios.get(
    "http://localhost:8080/api/home/ranking/active",
    {
      withCredentials: true,
    }
  );
  return response?.data?.data;
};

export const fetchRealTimeRankingPending = async (): Promise<
  AuctionRankingItem[]
> => {
  const response = await axios.get(
    "http://localhost:8080/api/home/ranking/pending",
    {
      withCredentials: true,
    }
  );
  return response?.data?.data;
};

export const fetchBestByCategory = async (): Promise<BestCategoryGroup[]> => {
  const response = await axios.get(
    "http://localhost:8080/api/home/best-sub-item",
    {
      withCredentials: true,
    }
  );
  return response?.data?.data;
};

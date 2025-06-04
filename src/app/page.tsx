import HomeTitle from "@/components/molecules/HomeTitle";
import SpinningWord from "@/components/atoms/SpinningWord";
import SearchInput from "@/components/templates/SearchBox";
import { Metadata } from "next";
import QueryProvider from "@/components/QueryProvider";
import { cookies } from "next/headers";
import RecentAuctionList from "@/components/home/RecentAuctionList";
import ImageCarousel, { Slide } from "@/components/home/ImageCarousel";
import DashboardStats from "@/components/home/DashboardStats.tsx";
import RealTimeRankingItem from "@/components/home/RealTimeRankingItem";
import TopBidCardList from "@/components/home/TopBidCardList";
import BestByCategory from "@/components/home/BestItemByCategory";
import AuctionSoonItemList from "@/components/home/AuctionSoonItemList";
import {
  getRecentAuctions,
  getDashboardStats,
  getAuctionSoonItems,
  getTopBidItems,
  getRealTimeRankingActive,
  getRealTimeRankingPending,
  getBestByCategory,
} from "@/lib/api/home";
export const metadata: Metadata = {
  title: "중고 경매 플랫폼 팔구삼 893",
  description: "중고 상품을 경매로 사고 팔 수 있는 팔구삼 893",
};

const slides: Slide[] = [
  {
    imageUrl: "/images/adidas.jpg",
    label: "덕질은\n삶의 에너지니까",
  },
  {
    imageUrl: "/images/nike.jpg",
    label: "음악은\n기억을 불러온다",
  },
  {
    imageUrl: "/images/맥.jpg",
    label: "음악은\n기억을 불러온다",
  },
  {
    imageUrl: "/images/자전거.jpg",
    label: "음악은\n기억을 불러온다",
  },
  {
    imageUrl: "/images/라이젠.jpg",
    label: "음악은\n기억을 불러온다",
  },
  {
    imageUrl: "/images/아이폰.jpg",
    label: "음악은\n기억을 불러온다",
  },
];

export default async function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isLoggedIn = accessToken ? true : false;

  const [
    recentAuctionListData,
    dashboardStatsData,
    auctionSoonItemListData,
    topBidCardListData,
    realTimeRankingItemActiveData,
    realTimeRankingItemPendingData,
    bestByCategoryData,
  ] = await Promise.all([
    getRecentAuctions(),
    getDashboardStats(),
    getAuctionSoonItems(),
    getTopBidItems(),
    getRealTimeRankingActive(),
    getRealTimeRankingPending(),
    getBestByCategory(),
  ]);
  const recentAuctionList = recentAuctionListData.data;
  const dashboardStats = dashboardStatsData.data;
  const auctionSoonItemList = auctionSoonItemListData.data;
  const topBidCardList = topBidCardListData.data;
  const realTimeRankingItemActive = realTimeRankingItemActiveData.data;
  const realTimeRankingItemPending = realTimeRankingItemPendingData.data;
  const bestByCategory = bestByCategoryData.data;

  return (
    <>
      <div className="w-full mt-6 px-4">
        <HomeTitle>
          <SpinningWord />
          <span>&nbsp;경매에 참여해보세요</span>
        </HomeTitle>

        <div className="flex justify-center w-full mt-4">
          <QueryProvider>
            <SearchInput isLoggedIn={isLoggedIn} />
          </QueryProvider>
        </div>

        {/*  */}
        <div className="flex items-start gap-6 w-full max-w-screen-xl  px-4 mt-6">
          {/* 좌 */}
          <div className="flex-1 max-w-[780px]">
            <DashboardStats dashboardStats={dashboardStats} />
            <div className="mt-10">
              <ImageCarousel slides={slides} />
            </div>
            <div className="mt-10">
              <RecentAuctionList recentAuctionList={recentAuctionList} />
            </div>
          </div>

          {/* 우 */}
          <div className="w-[300px] shrink-0">
            <RealTimeRankingItem
              realTimeRankingItemActive={realTimeRankingItemActive}
              realTimeRankingItemPending={realTimeRankingItemPending}
            />
          </div>
        </div>
        <div className="pt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
            경매 임박 물품
          </h2>
          <AuctionSoonItemList auctionSoonItemList={auctionSoonItemList} />
        </div>

        <div className="pt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
            최근 7일 최고 낙찰가 TOP 5
          </h2>
          <TopBidCardList topBidCardList={topBidCardList} />
        </div>

        <div className="pt-20 pb-32">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
            카테고리별 베스트 TOP3
          </h2>
          <div className="flex gap-4">
            <BestByCategory bestByCategory={bestByCategory} />
          </div>
        </div>
      </div>
    </>
  );
}

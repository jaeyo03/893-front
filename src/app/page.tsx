import HomeTitle from "@/components/molecules/HomeTitle";
import SpinningWord from "@/components/atoms/SpinningWord";
import SearchInput from "@/components/templates/SearchBox";
import { Metadata } from "next";
import QueryProvider from "@/components/QueryProvider";
import { cookies } from "next/headers";
import { Suspense } from "react";

import DashboardStats from "@/components/home/DashboardStats";
import ImageCarousel from "@/components/home/ImageCarousel";
import RecentAuctionList from "@/components/home/RecentAuctionList";
import RealTimeRankingPanel from "@/components/home/RealTimeRankingPanel";
import AuctionSoonItemList from "@/components/home/AuctionSoonItemList";
import TopBidCardList from "@/components/home/TopBidCardList";
import BestByCategory from "@/components/home/BestByCategory";

import DashboardStatsSkeleton from "@/components/home/Skeleton/DashboardStatsSkeleton";
import ImageCarouselSkeleton from "@/components/home/Skeleton/ImageCarouselSkeleton";
import RecentAuctionListSkeleton from "@/components/home/Skeleton/RecentAuctionListSkeleton";
import BestByCategorySkeleton from "@/components/home/Skeleton/BestByCategorySkeleton";
import RealTimeRankingPanelSkeleton from "@/components/home/Skeleton/RealTimeRankingPanelSkeleton";
import TopBidCardListSkeleton from "@/components/home/Skeleton/TopBidCardListSkeleton";
import AuctionSoonItemListSkeleton from "@/components/home/Skeleton/AuctionSoonItemListSkeleton";

export const metadata: Metadata = {
  title: "중고 경매 플랫폼 팔구삼 893",
  description: "중고 상품을 경매로 사고 팔 수 있는 팔구삼 893",
};

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isLoggedIn = Boolean(accessToken);

  return (
    <div className="w-[1280px] mt-6 px-4 mx-auto">
      {/* 1. 메인 타이틀 */}
      <HomeTitle data-testid="home-title">
        <SpinningWord data-testid="spinning-word" />
        <span>&nbsp;경매에 참여해보세요</span>
      </HomeTitle>

      {/* 2. 검색창 */}
      <div className="flex justify-center w-full mt-4">
        <QueryProvider>
          <SearchInput isLoggedIn={isLoggedIn} data-testid="search-input" />
        </QueryProvider>
      </div>

      <div className="flex items-start gap-6 w-full max-w-screen-xl px-4 mt-6">
        {/* 좌측 */}
        <div className="flex-1 max-w-[780px]">
          {/* 3. 대시보드 통계 */}
          <div data-testid="dashboard-stats">
            <Suspense fallback={<DashboardStatsSkeleton />}>
              <DashboardStats />
            </Suspense>
          </div>
          {/* 4. 이미지 캐러셀 */}
          <div className="mt-10" data-testid="image-carousel">
            <Suspense fallback={<ImageCarouselSkeleton />}>
              <ImageCarousel />
            </Suspense>
          </div>
          {/* 5. 최근 입찰 리스트 */}
          <div className="mt-10" data-testid="recent-auction-list">
            <Suspense fallback={<RecentAuctionListSkeleton />}>
              <RecentAuctionList />
            </Suspense>
          </div>
        </div>

        {/* 6. 실시간 랭킹 (우측) */}
        <div className="w-[300px] shrink-0" data-testid="real-time-ranking">
          <Suspense fallback={<RealTimeRankingPanelSkeleton />}>
            <RealTimeRankingPanel />
          </Suspense>
        </div>
      </div>

      {/* 7. 경매 임박 물품 */}
      <section className="pt-20" data-testid="auction-soon-list">
        <h2 className="text-2xl font-bold mb-10">경매 임박 물품</h2>
          <Suspense fallback={<AuctionSoonItemListSkeleton />}>
            <AuctionSoonItemList />
          </Suspense>
      </section>

      {/* 8. 최근 7일 최고 낙찰가 TOP 5 */}
      <section className="pt-20" data-testid="top-bid-card-list">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
          최근 7일 최고 낙찰가 TOP 5
        </h2>
          <Suspense fallback={<TopBidCardListSkeleton />}>
            <TopBidCardList />
          </Suspense>
      </section>

      {/* 9. 카테고리별 베스트 TOP 50 */}
      <section className="pt-20 pb-32" data-testid="best-by-category">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
          카테고리별 베스트 TOP 50
        </h2>
          <Suspense fallback={<BestByCategorySkeleton />}>
            <BestByCategory />
          </Suspense>
      </section>
    </div>
  );
}

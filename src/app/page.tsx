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
import AuctionSoonItem, {
  AuctionSoonItemProps,
} from "@/components/home/AuctionSoonList";
import TopBidCard, { TopBidItemProps } from "@/components/home/TopBidCard";
import BestByCategory from "@/components/home/BestItemByCategory";

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

// const statsData = [
//   { label: "현재 이용자 수", value: 1504 },
//   { label: "현재 등록된 경매 수", value: 984 },
//   { label: "현재 진행중인 경매 수", value: 324 },
// ];

const auctionSoonData: AuctionSoonItemProps[] = [
  {
    auctionId: 101,
    title: "아이폰 14 미개봉",
    description: "거의 사용 안했고 배터리 성능 90퍼예요.",
    scrapCount: 14,
    thumbnailUrl: "/images/자전거.jpg",
    itemCondition: "brand_new",
    basePrice: 66800,
    leftTime: "00:21:38",
  },
  {
    auctionId: 102,
    title: "즉시 시작 예정 제품",
    description: "이 상품은 지금 시작할 수 있어요.",
    scrapCount: 3,
    thumbnailUrl: "/images/nike.jpg",
    itemCondition: "like_new",
    basePrice: 45200,
    leftTime: "00:00:05",
  },
  {
    auctionId: 103,
    title: "미개봉 노트북",
    description: "새 제품 그대로 배송됩니다.",
    scrapCount: 6,
    thumbnailUrl: "/images/아이폰.jpg",
    itemCondition: "brand_new",
    basePrice: 120000,
    leftTime: "00:12:58",
  },
];

const top5: TopBidItemProps[] = [
  {
    auctionId: 101,
    title: "컵라면 100개 묶음 한정판",
    bidCount: 764,
    thumbnailUrl: "/images/라이젠.jpg",
    basePrice: 350000,
    itemPrice: 2400000,
    isCurrentUserBuyer: "김*진",
  },
  {
    auctionId: 102,
    title: "발마사지 발판 | 편안한 하루의 시작",
    bidCount: 152,
    thumbnailUrl: "/images/자전거.jpg",
    basePrice: 12000,
    itemPrice: 39000,
    isCurrentUserBuyer: "이*현",
  },
  {
    auctionId: 103,
    title: "무흠집 스텐 후라이팬 풀세트",
    bidCount: 321,
    thumbnailUrl: "/images/아이폰.jpg",
    basePrice: 45000,
    itemPrice: 105000,
    isCurrentUserBuyer: "최*미",
  },
  {
    auctionId: 104,
    title: "짱구 식기 세트 완구 포함 풀구성",
    bidCount: 435,
    thumbnailUrl: "/images/맥.jpg",
    basePrice: 19800,
    itemPrice: 31900,
    isCurrentUserBuyer: "박*수",
  },
  {
    auctionId: 105,
    title: "어른이를 위한 감성 타자기 세트",
    bidCount: 869,
    thumbnailUrl: "/images/nike.jpg",
    basePrice: 15000,
    itemPrice: 29400,
    isCurrentUserBuyer: "정*웅",
  },
];
export default async function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const limited = auctionSoonData.slice(0, 3); // 최대 3개만 보여줌
  const isLoggedIn = accessToken ? true : false;

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
            <DashboardStats />
            <div className="mt-10">
              <ImageCarousel slides={slides} />
            </div>
            <div className="mt-10">
              <RecentAuctionList />
            </div>
          </div>

          {/* 우 */}
          <div className="w-[300px] shrink-0">
            <RealTimeRankingItem />
          </div>
        </div>
        <div className="pt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
            경매 임박 물품
          </h2>

          <div className="flex justify-center gap-6">
            {limited.map((item) => (
              <AuctionSoonItem key={item.auctionId} {...item} />
            ))}
          </div>
        </div>

        <div className="pt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
            최근 7일 최고 낙찰가 TOP 5
          </h2>
          <div className="flex gap-4">
            {top5.map((item) => (
              <TopBidCard key={item.auctionId} {...item} />
            ))}
          </div>
        </div>

        <div className="pt-20 pb-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
            카테고리별 베스트 TOP3
          </h2>
          <div className="flex gap-4">
            <BestByCategory />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";

interface AuctionRankingItem {
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
  status: "active" | "upcoming"; // 경매 상태
  rank: number;
}

const itemConditionLabel: Record<AuctionRankingItem["itemCondition"], string> =
  {
    brand_new: "새 상품 (미사용)",
    like_new: "사용감 없음",
    gently_used: "사용감 적음",
    heavily_used: "사용감 많음",
    damaged: "고장/파손 상품",
  };

// 더미 데이터
const dummyData: AuctionRankingItem[] = [
  {
    auctionId: 101,
    title: "아이폰 14 미개봉",
    description: "거의 사용 안했고 배터리 성능 90퍼예요.",
    bidCount: 14,
    scrapCount: 6,
    thumbnailUrl: "images/자전거.jpg",
    itemCondition: "brand_new",
    status: "active",
    rank: 1,
  },

  {
    auctionId: 102,
    title: "아이폰 14 미개봉",
    description: "거의 사용 안했고 배터리 성능 90퍼예요.",
    bidCount: 14,
    scrapCount: 6,
    thumbnailUrl: "images/nike.jpg",
    itemCondition: "brand_new",
    status: "active",
    rank: 2,
  },
  {
    auctionId: 103,
    title: "아이폰 14 미개봉",
    description: "거의 사용 안했고 배터리 성능 90퍼예요.",
    bidCount: 14,
    scrapCount: 6,
    thumbnailUrl: "images/맥.jpg",
    itemCondition: "brand_new",
    status: "active",
    rank: 3,
  },
  {
    auctionId: 104,
    title: "아이폰 14 미개봉",
    description: "거의 사용 안했고 배터리 성능 90퍼예요.",
    bidCount: 14,
    scrapCount: 6,
    thumbnailUrl: "images/라이젠.jpg",
    itemCondition: "brand_new",
    status: "active",
    rank: 4,
  },
  {
    auctionId: 105,
    title: "아이폰 14 미개봉",
    description: "거의 사용 안했고 배터리 성능 90퍼예요.",
    bidCount: 14,
    scrapCount: 6,
    thumbnailUrl: "images/아이폰.jpg",
    itemCondition: "brand_new",
    status: "active",
    rank: 5,
  },
  {
    auctionId: 106,
    title: "아이폰 14 미개봉",
    description: "거의 사용 안했고 배터리 성능 90퍼예요.",
    bidCount: 14,
    scrapCount: 6,
    thumbnailUrl: "images/adidas.jpg",
    itemCondition: "brand_new",
    status: "active",
    rank: 6,
  },
  {
    auctionId: 107,
    title: "허먼밀러 의자",
    description: "정품 헤드레스트 포함, 상태 좋음, 사용감 거의 없음,테스트",
    bidCount: 0,
    scrapCount: 11,
    thumbnailUrl: "images/자전거.jpg",
    itemCondition: "like_new",
    status: "upcoming",
    rank: 1,
  },
];

export default function RealTimeRankingPanel() {
  const [tab, setTab] = useState<"active" | "upcoming">("active");

  const filteredData = dummyData.filter((item) => item.status === tab);

  return (
    <div className="w-[435px] bg-white p-4">
      <h2 className="text-xl font-bold mb-4">실시간 랭킹</h2>

      {/* 탭 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("active")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            tab === "active" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          경매진행중
        </button>
        <button
          onClick={() => setTab("upcoming")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            tab === "upcoming" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          경매예정
        </button>
      </div>

      {/* 랭킹 리스트 */}
      <div className="space-y-4 ">
        {filteredData.map((item) => (
          <div key={item.auctionId} className="flex gap-3 pt-3 items-start">
            <div className="text-lg font-bold text-gray-600">{item.rank}</div>
            <div className="flex-1">
              <div className="text-sm font-semibold truncate max-w-[200px]">
                {item.title}
              </div>
              <div className="text-xs text-gray-500 truncate max-w-[200px]">
                {item.description}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                상태: {itemConditionLabel[item.itemCondition]}
              </div>
              <div className="text-sky-500 font-bold text-sm mt-1">
                {tab === "active"
                  ? `현재 입찰 수: ${item.bidCount}회`
                  : `스크랩 ${item.scrapCount}`}
              </div>
            </div>
            <img
              src={item.thumbnailUrl}
              alt="썸네일"
              className="w-[160PX] h-[80PX] rounded object-cover border"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

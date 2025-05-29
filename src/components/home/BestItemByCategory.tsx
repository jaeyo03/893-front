"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
const dummyBestBySubCategory = [
  {
    subCategoryId: 2,
    subCategoryName: "모바일/태블릿",
    items: [
      {
        auctionId: 101,
        title: "아이폰 14 미개봉",
        scrapCount: 14,
        thumbnailUrl: "/images/아이폰.jpg",
        itemCondition: "brand_new",
        status: "active",
        isAuctionImminent: false,
        rank: 1,
      },
      {
        auctionId: 102,
        title: "갤럭시 Z플립 4",
        scrapCount: 11,
        thumbnailUrl: "/images/라이젠.jpg",
        itemCondition: "like_new",
        status: "pending",
        isAuctionImminent: false,
        rank: 2,
      },
      {
        auctionId: 103,
        title: "아이패드 에어 5세대",
        scrapCount: 9,
        thumbnailUrl: "/images/맥.jpg",
        itemCondition: "gently_used",
        status: "active",
        isAuctionImminent: true,
        rank: 3,
      },
    ],
  },
  {
    subCategoryId: 13,
    subCategoryName: "생활가전",
    items: [
      {
        auctionId: 201,
        title: "다이슨 에어랩",
        scrapCount: 22,
        thumbnailUrl: "/images/자전거.jpg",
        itemCondition: "like_new",
        status: "active",
        isAuctionImminent: false,
        rank: 1,
      },
      {
        auctionId: 202,
        title: "삼성 공기청정기",
        scrapCount: 19,
        thumbnailUrl: "/images/adidas.jpg",
        itemCondition: "gently_used",
        status: "pending",
        isAuctionImminent: true,
        rank: 2,
      },
      {
        auctionId: 203,
        title: "LG 스타일러",
        scrapCount: 17,
        thumbnailUrl: "/images/nike.jpg",
        itemCondition: "brand_new",
        status: "active",
        isAuctionImminent: false,
        rank: 3,
      },
    ],
  },
];

export default function BestByCategory() {
  const [selectedTab, setSelectedTab] = useState<number>(
    dummyBestBySubCategory[0].subCategoryId
  );
  const selectedCategory = dummyBestBySubCategory.find(
    (cat) => cat.subCategoryId === selectedTab
  );

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex gap-3 mb-6 flex-wrap">
        {dummyBestBySubCategory.map((cat) => (
          <button
            key={cat.subCategoryId}
            onClick={() => setSelectedTab(cat.subCategoryId)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedTab === cat.subCategoryId
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {cat.subCategoryName}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {selectedCategory?.items.map((item) => (
          <div
            key={item.auctionId}
            className="border rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-[390px] h-[320px] object-cover"
              />

              <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                {item.rank}
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-[18px] font-semibold">{item.title}</h3>
              <p className="text-[16px] text-gray-500 mt-2">
                스크랩 {item.scrapCount}회 ·{" "}
                {translateCondition(item.itemCondition)}
              </p>
            </div>
            <div className="flex items-center px-2 pb-2 gap-2">
              <span
                className={` top-2 right-2 text-[12px] px-2 py-1 rounded ${
                  item.status === "active" ? "bg-main" : "bg-gray-400"
                } text-white`}
              >
                {item.status === "active" ? "경매중" : "경매예정"}
              </span>
              {item.isAuctionImminent && (
                <span className=" bottom-2 right-2 bg-rose-500 text-white text-[12px] px-2 py-1 rounded">
                  곧 시작 <Flame className="inline h-4 w-4 ml-1" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 상품 상태 변환 유틸 파일로 분리 하기
function translateCondition(cond: string): string {
  const map: Record<string, string> = {
    brand_new: "새 상품 (미사용)",
    like_new: "사용감 없음",
    gently_used: "사용감 적음",
    heavily_used: "사용감 많음",
    damaged: "고장/파손 상품",
  };
  return map[cond] || cond;
}

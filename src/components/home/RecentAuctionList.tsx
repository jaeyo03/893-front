"use client";

import Image from "next/image";
import { useState } from "react";
import { Bookmark } from "lucide-react";
// 더미 데이터 정의
const dummyRecentAuctions = [
  {
    auctionId: 101,
    title: "아이폰 14 미개봉",
    description: "거의 사용 안했고 배터리 성능 90퍼예요.",
    basePrice: 120000,
    thumbnailUrl: "/images/자전거.jpg",
    status: "active",
    isScraped: true,
  },
  {
    auctionId: 102,
    title: "에어팟 프로 2세대",
    description: "정품이며 거의 새제품입니다.",
    basePrice: 90000,
    thumbnailUrl: "/images/자전거.jpg",
    status: "active",
    isScraped: false,
  },
  {
    auctionId: 103,
    title: "갤럭시 버즈 라이브",
    description: "사용감 있으나 정상 작동합니다.",
    basePrice: 30000,
    thumbnailUrl: "/images/자전거.jpg",
    status: "active",
    isScraped: true,
  },
  {
    auctionId: 104,
    title: "갤럭시 버즈 라이브",
    description: "사용감 있으나 정상 작동합니다.",
    basePrice: 30000,
    thumbnailUrl: "/images/자전거.jpg",
    status: "active",
    isScraped: true,
  },
  {
    auctionId: 105,
    title: "갤럭시 버즈 라이브",
    description: "사용감 있으나 정상 작동합니다.",
    basePrice: 30000,
    thumbnailUrl: "/images/자전거.jpg",
    status: "active",
    isScraped: true,
  },
  {
    auctionId: 106,
    title: "갤럭시 버즈 라이브",
    description: "사용감 있으나 정상 작동합니다.",
    basePrice: 30000,
    thumbnailUrl: "/images/자전거.jpg",
    status: "actives",
    isScraped: true,
  },
];

export default function RecentAuctionList() {
  const [items] = useState(dummyRecentAuctions);

  return (
    <div className="p-4">
      {/* <h2 className="mb-4 text-xl font-bold">최근 등록한 경매</h2> */}
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.auctionId}
            className="relative overflow-hidden transition border-none rounded-lg"
          >
            <div className="p-2 mb-1 bg-white rounded-xl">
              <Image
                src={item.thumbnailUrl}
                alt={item.title}
                width={500}
                height={300}
                className="rounded-xl object-cover w-full h-[130px]"
              />
            </div>

            {/* 스크랩 아이콘 */}
            {item.isScraped && (
              <div className="absolute p-1 rounded-full top-3 right-3">
                <Bookmark
                  className="w-6 h-6 text-white"
                  aria-label="스크랩 아이콘"
                />
              </div>
            )}

            <div className="p-2">
              <div className="flex justify-center items-center rounded text-[10px] text-gray-500 bg-gray-100 w-[48px] h-[18px] mb-2">
                {item.status === "active" ? "경매중" : "경매예정"}
              </div>
              <h3 className="pb-2 mt-1 text-[16px] font-bold truncate text-main line-clamp-1">
                {item.title}
              </h3>
              <p className="text-[16px] text-gray-600 line-clamp-1">
                {item.description}
              </p>
              <p className="mt-2 text-[16px] font-semibold  text-gray-600">
                {item.basePrice.toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// components/home/RealTimeRankingPanelClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EmptyState from "@/components/home/EmptyState";
import type { AuctionRankingItem } from "@/lib/api/home";

interface RealTimeRankingPanelClientProps {
  realTimeRankingItemActive: AuctionRankingItem[];
  realTimeRankingItemPending: AuctionRankingItem[];
}

const itemConditionLabel: Record<AuctionRankingItem["itemCondition"], string> = {
  brand_new: "새 상품 (미사용)",
  like_new: "사용감 없음",
  gently_used: "사용감 적음",
  heavily_used: "사용감 많음",
  damaged: "고장/파손 상품",
};

export default function RealTimeRankingPanelClient({
  realTimeRankingItemActive,
  realTimeRankingItemPending,
}: RealTimeRankingPanelClientProps) {
  const [tab, setTab] = useState<"active" | "upcoming">("active");
  const router = useRouter();

  const currentTimeRankingData =
    tab === "active"
      ? realTimeRankingItemActive
      : realTimeRankingItemPending;

  return (
    <div className="w-[435px] bg-white p-4">
      <h2 className="text-xl font-bold mb-4">실시간 랭킹</h2>

      {/* 탭 */}
      <div className="flex gap-2 mb-4">
        {(["active", "upcoming"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              tab === t ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {t === "active" ? "경매진행중" : "경매예정"}
          </button>
        ))}
      </div>

      {/* 리스트 또는 Empty */}
      {currentTimeRankingData.length === 0 ? (
        <EmptyState
          message={
            tab === "active"
              ? "실시간 경매중인 물품이 없습니다."
              : "실시간 예정된 경매가 없습니다."
          }
          className="pt-10 pb-10"
        />
      ) : (
        <div className="space-y-4">
          {currentTimeRankingData.map((item) => (
            <div
              key={item.auctionId}
              className="flex gap-3 pt-3 items-start cursor-pointer rounded px-2"
              onClick={() => router.push(`/detail/${item.auctionId}`)}
            >
              <div className="text-lg font-bold text-gray-600">
                {item.rankNum}
              </div>

              <div className="flex-1 w-[190px] h-[80px]">
                <div className="text-sm font-semibold truncate">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500 truncate">
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

              <div className="flex-shrink-0 ml-auto">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title}
                  width={160}
                  height={80}
                  className="rounded object-cover border w-[160px] h-[80px]"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  fetchRealTimeRankingActive,
  fetchRealTimeRankingPending,
  AuctionRankingItem,
} from "@/lib/api/home";

const itemConditionLabel: Record<AuctionRankingItem["itemCondition"], string> =
  {
    brand_new: "새 상품 (미사용)",
    like_new: "사용감 없음",
    gently_used: "사용감 적음",
    heavily_used: "사용감 많음",
    damaged: "고장/파손 상품",
  };

export default function RealTimeRankingPanel() {
  const [tab, setTab] = useState<"active" | "upcoming">("active");
  const [data, setData] = useState<AuctionRankingItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (tab === "active") {
          const result = await fetchRealTimeRankingActive();
          setData(result);
        } else {
          const result = await fetchRealTimeRankingPending();
          setData(result);
        }
      } catch (err) {
        console.error("실시간 랭킹 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tab]);

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
      <div className="space-y-4">
        {loading ? (
          <p className="text-sm text-gray-400">로딩 중...</p>
        ) : (
          data.map((item) => (
            <div
              key={item.auctionId}
              className="flex gap-3 pt-3 items-start cursor-pointer rounded px-2"
              onClick={() =>
                (window.location.href = `/detail/${item.auctionId}`)
              }
            >
              <div className="text-lg font-bold text-gray-600">
                {item.rankNum}
              </div>
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
                src={`http://localhost:8080${item.thumbnailUrl}`}
                alt="썸네일"
                className="w-[160px] h-[80px] rounded object-cover border"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

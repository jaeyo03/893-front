"use client";

import { Bookmark, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { AuctionBidData, Product } from "@/types/productData";
import toast from "react-hot-toast";

interface AuctionInfoProps {
  product: Product;
  auctionBidData: AuctionBidData;
  isScraped: boolean;
  scrapCount: number;
  handleScrapToggle: (e: React.MouseEvent) => void;
  isLoggedIn: boolean;
  currentPrice: number;
}

export function AuctionInfo({
  product,
  auctionBidData,
  isScraped = false,
  scrapCount = 0,
  handleScrapToggle,
  isLoggedIn,
  currentPrice,
}: AuctionInfoProps) {
  const { basePrice, startTime, endTime } = product;

  // 남은 시간과 시작 여부
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const isBeforeStart = Date.now() < start;

  const bidCount = auctionBidData?.totalBid ?? 0;
  const bidderCount = auctionBidData?.totalBidder ?? 0;

  // 시간 계산 useEffect
  useEffect(() => {
    if (isNaN(start) || isNaN(end)) {
      console.error("잘못된 날짜 형식입니다:", { startTime, endTime });
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = isBeforeStart ? start - now : end - now;
      setRemainingTime(Math.max(Math.floor(diff / 1000), 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 시간 포맷
  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${hours}:${min}:${sec}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-black">
            {currentPrice === basePrice ? "경매시작가" : "현재가"}
          </p>
          <p className="text-xl font-bold text-main">
            ₩{(currentPrice).toLocaleString()}
          </p>
        </div>
        <div className="w-1/2">
          <p className="text-sm text-black">
            {isBeforeStart ? "시작까지 남은 시간" : "종료까지 남은 시간"}
          </p>
          <p className="flex items-center gap-1 text-xl font-bold text-blue-600">
            <Timer className="w-5 h-5" />
            {formatTime(remainingTime)}
          </p>
        </div>
      </div>

      <div className="flex justify-between mb-2">
        <div>
          <p className="text-sm text-gray-600">입찰 수</p>
          <p className="text-lg font-bold">{bidCount}회</p>
        </div>
        <div className="w-1/2">
          <p className="text-sm text-gray-600">입찰자 수</p>
          <p className="text-lg font-bold">{bidderCount}명</p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-gray-700">
        <button
          onClick={handleScrapToggle}
          aria-label="북마크 토글"
          className={
            !isLoggedIn
              ? "cursor-not-allowed opacity-50 pointer-events-none"
              : ""
          }
        >
          <Bookmark
            className={`w-5 h-5 ${
              !isLoggedIn
                ? "text-gray-300"
                : isScraped
                ? "text-black fill-black"
                : "text-gray-400 hover:text-black hover:fill-black"
            }`}
          />
        </button>
        <span className="text-sm">{scrapCount}</span>
      </div>
    </div>
  );
}
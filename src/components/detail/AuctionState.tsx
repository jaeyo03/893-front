"use client";

import { Bookmark, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { AuctionStatsProps } from "@/types/productData";
import toast from "react-hot-toast";

export function AuctionState({
  product,
  auctionBidData,
  isBookmarked = false,
  bookmarkCount = 0,
  onBookmarkToggle,
  isLoggedIn,
}: AuctionStatsProps) {
  const { basePrice, startTime, endTime } = product;

  // 남은 시간과 시작 여부
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isBeforeStart, setIsBeforeStart] = useState<boolean>(false);

  // 현재 입찰가 계산 (bids 배열이 없을 경우 basePrice 사용)
  const currentPrice = auctionBidData?.bids?.length
    ? Math.max(...auctionBidData.bids.map((bid) => bid.bidPrice))
    : basePrice;

  const bidCount = auctionBidData?.totalBid ?? 0;
  const bidderCount = auctionBidData?.totalBidder ?? 0;

  // 시간 계산 useEffect
  useEffect(() => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    if (isNaN(start) || isNaN(end)) {
      console.error("잘못된 날짜 형식입니다:", { startTime, endTime });
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();

      const isBefore = now < start;
      setIsBeforeStart(isBefore);

      const diff = isBefore ? start - now : end - now;
      setRemainingTime(Math.max(Math.floor(diff / 1000), 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  // 시간 포맷
  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${hours}:${min}:${sec}`;
  };

  // 북마크 클릭
  const handleBookmarkClick = async () => {
    if (!isLoggedIn) {
      //  비로그인 시 차단
      toast.error("로그인 후 이용 가능합니다.");
      return;
    }
    try {
      await onBookmarkToggle();
    } catch (error: any) {
      console.error("북마크 토글 실패:", error);
      toast.error("북마크 변경에 실패했습니다.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-black">현재가</p>
          <p className="text-xl font-bold text-main">
            ₩{currentPrice.toLocaleString()}
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
          onClick={handleBookmarkClick}
          aria-label="북마크 토글"
          className={
            !isLoggedIn
              ? "cursor-not-allowed opacity-50 pointer-events-none"
              : ""
          }
        >
          <Bookmark
            className={`w-5 h-5 ${
              isBookmarked
                ? "text-black fill-black"
                : "text-gray-400 hover:text-black hover:fill-black"
            }`}
          />
        </button>
        <span className="text-sm">{bookmarkCount}</span>
      </div>
    </div>
  );
}

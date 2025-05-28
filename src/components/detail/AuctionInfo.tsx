"use client";

import { Bookmark, Timer } from "lucide-react";
import { AuctionBidData, Product } from "@/types/productData";
import { formatTime } from "@/lib/util/detailpage";
interface AuctionInfoProps {
  product: Product;
  auctionBidData: AuctionBidData;
  isScraped: boolean;
  scrapCount: number;
  handleScrapToggle: (e: React.MouseEvent) => void;
  isLoggedIn: boolean;
  currentPrice: number;
  remainTime: number;
  isBeforeStart: boolean;
}

export function AuctionInfo({
  product,
  auctionBidData,
  isScraped,
  scrapCount,
  handleScrapToggle,
  isLoggedIn,
  currentPrice,
  remainTime,
  isBeforeStart,
}: AuctionInfoProps) {
  const { basePrice } = product;
  const bidCount = auctionBidData?.totalBid ?? 0;
  const bidderCount = auctionBidData?.totalBidder ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-black">
            {currentPrice === basePrice ? "경매시작가" : product.status === "completed" ? "낙찰가" : "현재가"}
          </p>
          <p className="text-xl font-bold text-main">
            ₩{(currentPrice).toLocaleString()}
          </p>
        </div>
        {product.status !== "completed" && (
          <div className="w-1/2">
            <p className="text-sm text-black">
              {isBeforeStart ? "시작까지 남은 시간" : "종료까지 남은 시간"}
            </p>
            <p className="flex items-center gap-1 text-xl font-bold text-blue-600">
              <Timer className="w-5 h-5" />
              {formatTime(remainTime)}
            </p>
          </div>
        )}
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
                : "text-gray-400 hover:text-black hover:rounded"
            }`}
          />
        </button>
        <span className="text-sm">{scrapCount}</span>
      </div>
    </div>
  );
}
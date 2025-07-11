"use client";

import { Bookmark, Timer } from "lucide-react";
import { AuctionBidData, Product, Status } from "@/types/productData";
import { formatTime } from "@/lib/util/detailpage";
import ProductStatus from "./ProductStatus";
import { useAddScrap, useDeleteScrap } from "@/hooks/useScarp";
import { useState } from "react";
interface AuctionInfoProps {
  product: Product;
  auctionBidData: AuctionBidData;
  isLoggedIn: boolean;
  currentPrice: number;
  remainTime: number;
  auctionState: Status;
}

export function AuctionInfo({
  product,
  auctionBidData,
  isLoggedIn,
  currentPrice,
  remainTime,
  auctionState,
}: AuctionInfoProps) {
  const [isScraped, setIsScraped] = useState<boolean>(product.isScraped ?? false);
  const [scrapCount, setScrapCount] = useState<number>(product.scrapCount);
  
  const {mutate: addScrapMutation} = useAddScrap();
  const {mutate: removeScrapMutation} = useDeleteScrap();
  
  const handleScrapToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsScraped((prev) => !prev);
    setScrapCount((prev) => (isScraped ? prev - 1 : prev + 1));
    if (isScraped) {
      removeScrapMutation(product.auctionId);
    } else {
      addScrapMutation(product.auctionId);
    }
  };

  const { basePrice } = product;
  const bidCount = auctionBidData?.totalBid ?? 0;
  const bidderCount = auctionBidData?.totalBidder ?? 0;

  return (
    <div>
      <ProductStatus label={auctionState} />
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-black">
            {currentPrice === basePrice ? "경매시작가" : auctionState === "completed" ? "낙찰가" : "현재가"}
          </p>
          <p className="text-xl font-bold text-main">
            ₩{(currentPrice).toLocaleString()}
          </p>
        </div>
        {auctionState !== "completed" && (
          <div className="w-1/2">
            <p className="text-sm text-black">
              {auctionState === "pending" ? "시작까지 남은 시간" : "종료까지 남은 시간"}
            </p>
            <p className={`flex items-center gap-1 text-xl font-bold ${remainTime <= 10 ? "text-red" : "text-blue-600"}`}>
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
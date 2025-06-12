"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { getAuctionStatus } from "./constants/MyPageProduct";
import { MyBidProduct } from "@/types/userData";
import { getRemainingTime } from "./TimeCalculator";

interface Props {
  myBidProduct: MyBidProduct;
}

export default function MyBidsProductCard({ myBidProduct }: Props) {
  const router = useRouter();

  const status = getAuctionStatus(myBidProduct.status);
  const [isScraped, setIsScraped] = useState(false);

  const handleScrapToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsScraped((prev) => !prev);
  };

  const handleClick = () => {
    router.push(`/detail/${myBidProduct.auctionId}`);
  };

  const [remainingTime, setRemainingTime] = useState<string>(() =>
    getRemainingTime(myBidProduct.endTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime(myBidProduct.endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [myBidProduct.endTime]);

  return (
    <div className="flex flex-col items-center w-full">
      <Card
        onClick={handleClick}
        className="p-4 mb-4 w-full !h-[156px] border-width: 1.2px; border-checkbox cursor-pointer shadow-none"
      >
        <div className="flex items-center h-full">
          <img
            src={myBidProduct.mainImageUrl}
            alt={myBidProduct.title}
            className="w-32 h-32 object-cover mr-4"
          />
          <div className="flex-1">
            <p className="font-bold text-[16px]">{myBidProduct.title}</p>

            <div className="flex justify-between text-[14px] mt-2">
              <span className="w-1/2">내 입찰가</span>
              <span className="w-1/2 text-left">현재 입찰가</span>
            </div>

            <div className="flex justify-between text-[16px]">
              <span className="w-1/2">
                {myBidProduct.userPrice.toLocaleString()}원
              </span>
              <span className="w-1/2 text-left">
                {myBidProduct.bidHighestPrice.toLocaleString()}원
              </span>
            </div>

            <button
              onClick={handleScrapToggle}
              className="relative p-1 right-2"
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isScraped
                    ? "text-black fill-black"
                    : "text-gray-400 hover:text-black hover:fill-black"
                }`}
              />
            </button>
            <p className="text-xs mt-2">
              {remainingTime === "종료됨" || remainingTime === "0시간 0분 0초"
                ? "종료됨"
                : `남은 시간: ${remainingTime}`}
            </p>
          </div>

          <div className="flex flex-col justify-between items-center ml-4 h-full py-2">
            <span
              className={`text-xs text-white px-3 py-1 rounded-full ${status.className}`}
            >
              {status.label}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

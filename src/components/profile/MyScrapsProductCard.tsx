'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Bookmark } from 'lucide-react';
import { MyScrapsProduct } from "@/types/userData";
import { getAuctionStatus } from "./constants/MyPageProduct";
import { getRemainingTime } from "./TimeCalculator";

interface Props {
  scrap: MyScrapsProduct;
}

export default function MyScrapsProductCard({ scrap }: Props) {
  const router = useRouter();
  const [isScraped, setIsScraped] = useState(true); // 기본 찜 상태
  const status = getAuctionStatus(scrap.status);

  
  const [remainingTime, setRemainingTime] = useState<string>(() =>
      getRemainingTime(scrap.endTime)
    );
    
    useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime(getRemainingTime(scrap.endTime));
      }, 1000);
  
      return () => clearInterval(interval);
    }, [scrap.endTime]);
  

  const handleScrapToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsScraped((prev) => !prev);
    // TODO: 찜 해제 API 호출 등 처리
  };

  const handleClick = () => {
    router.push(`/detail/${scrap.auctionId}`);
  };
  
  return (
    <div className="flex justify-center w-full">
      <Card
        onClick={handleClick}
        className="p-4 mb-4 w-full !h-[166px] border-2 border-checkbox"
      >
        <div className="flex items-center h-full">
          <div className="w-24 h-24 bg-gray-100 mr-4" />
          <div className="flex-1">
            <p className="font-bold text-[16px]">{scrap.title}</p>

            <div className="text-[16px] mt-2">현재 입찰가: {scrap.bidHighestPrice.toLocaleString()}원</div>

            <button onClick={handleScrapToggle} className="relative p-1 right-2">
              <Bookmark
                className={`w-5 h-5 ${isScraped ? 'text-black fill-black' : 'text-gray-400 hover:text-black hover:fill-black'}`}
              />
            </button>
            <p className="text-xs mt-6">
              {remainingTime === '종료됨' || remainingTime === '0시간 0분 0초'
                ? '종료됨'
                : `남은 시간: ${remainingTime}`}
            </p>
          </div>

          <div className="flex flex-col justify-between items-center ml-4 h-full py-2">
            <span className={`text-xs text-white px-3 py-1 rounded-full ${status.className}`}>
              {status.label}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

'use client'

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { bidInfo,getAuctionStatus } from "./constants/MyPageProduct";

interface Props{
  productId:number;
}

export default function SellerProductBidCard({ productId } :Props) {

  const router = useRouter();
  const status = getAuctionStatus(bidInfo.isWinning);

  const handclick = () => {
    router.push(`/seller/detail/${productId}`);
  }
  return (
    <div className="flex justify-center w-full">
      <Card 
        onClick={handclick}
        className="p-4 mb-4 !w-[1024px] !h-[166px] border-2 border-checkbox">
        <div className="flex items-center h-full">
          <div className="w-24 h-24 bg-gray-100 mr-4" />
          <div className="flex-1">
            <p className="font-bold text-[16px]">{bidInfo.productName}</p>

            <div className="flex justify-between text-[14px] mt-2">
              <span className="w-1/2">내 입찰가</span>
              <span className="w-1/2 text-left">현재 입찰가</span>
            </div>

            <div className="flex justify-between text-[16px]">
              <span className="w-1/2">{bidInfo.myBid}</span>
              <span className="w-1/2 text-left">{bidInfo.currentBid}</span>
            </div>

            <p className="text-xs mt-6">남은 시간: {bidInfo.remainingTime}</p>
          </div>

          <div className="flex flex-col justify-between items-center ml-4 h-full py-2">
            <span className={`text-xs text-white px-3 py-1 rounded-full ${status.className}`}>
              {status.label}
            </span>
            <Button 
              className="mt-auto text-xs border-2 border-red text-red bg-white px-2 py-1 hover:bg-red hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              삭제하기
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

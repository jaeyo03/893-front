"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { calculateIncreaseRate } from "@/lib/util/priceUtils";

export type TopBidItemProps = {
  auctionId: number;
  title: string;
  bidCount: number;
  thumbnailUrl: string;
  basePrice: number;
  itemPrice: number;
  buyer: string;
};

export default function TopBidCard({
  auctionId,
  title,
  bidCount,
  thumbnailUrl,
  basePrice,
  itemPrice,
  buyer,
}: TopBidItemProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/detail/${auctionId}`)}
      className="w-[250px] rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm transition cursor-pointer"
    >
      <div className="relative">
        <Image
          src={thumbnailUrl}
          alt={title}
          width={250}
          height={130}
          className="w-full h-[130px] object-cover"
        />
      </div>
      <div className="px-3 py-2 space-y-1">
        <div className="flex justify-between">
          <p className="text-[13px] text-sky-500 font-bold">낙찰가:</p>
          <p className="text-[13px] text-sky-500 font-bold">
            {itemPrice.toLocaleString()}원
          </p>
        </div>
        <p className="text-[12px] text-gray-800 truncate">{title}</p>
        <div className="text-[12px] font-bold">
          <span className="text-gray-500 pr-5">{basePrice.toLocaleString()}원</span>
          <span className="text-[11px] font-semibold">
            {calculateIncreaseRate(basePrice, itemPrice)} 상승
          </span>
        </div>
        <p className="text-[11px] text-gray-400">낙찰자: {buyer}</p>
        <div className="flex items-center gap-1 text-[12px] text-gray-600">
          입찰수 <span className="font-semibold">({bidCount})</span>
        </div>
      </div>
    </div>
  );
}

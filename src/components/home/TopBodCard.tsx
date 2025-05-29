// import { Smile } from "lucide-react";
import { calculateIncreaseRate } from "@/lib/util/priceUtils";
export type TopBidItemProps = {
  auctionId: number;
  title: string;
  bidCount: number;
  thumbnailUrl: string;
  basePrice: number;
  itemPrice: number;
  isCurrentUserBuyer: string;
};
export default function TopBidCard({
  title,
  bidCount,
  thumbnailUrl,
  basePrice,
  itemPrice,
  isCurrentUserBuyer,
}: TopBidItemProps) {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt="썸네일"
          className="w-full h-[130px] object-cover"
        />
      </div>

      <div className="px-3 py-2 space-y-1">
        <p className="text-[13px] text-main font-bold">
          낙찰가: {itemPrice.toLocaleString()}원
        </p>
        <p className="text-[12px] text-gray-800 truncate">{title}</p>

        <div className="text-[12px] font-bold">
          <span className="text-gray-500 pr-5">{basePrice}원</span>
          <span className="text-[11px] text-warningkeword font-semibold">
            {calculateIncreaseRate(basePrice, itemPrice)} 상승
          </span>
          {/* <span className="text-main">{formatToManwon(itemPrice)} 낙찰</span> */}
        </div>

        <p className="text-[11px] text-gray-400">
          낙찰자: {isCurrentUserBuyer}
        </p>

        <div className="flex items-center gap-1 text-[12px] text-gray-600">
          {/* <span className="">
            <Smile className="w-3 h-3" />
          </span> */}
          입찰수 <span className="font-semibold ">({bidCount})</span>
        </div>
      </div>
    </div>
  );
}

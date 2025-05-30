// import { Smile } from "lucide-react";
import { calculateIncreaseRate } from "@/lib/util/priceUtils";
import { useRouter } from "next/navigation";
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

  const handleClick = () => {
    router.push(`/detail/${auctionId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm transition cursor-pointer"
    >
      <div className="relative">
        <img
          src={`http://localhost:8080${thumbnailUrl}`}
          alt="썸네일"
          className="w-full h-[130px] object-cover"
        />
      </div>

      <div className="px-3 py-2 space-y-1">
        <div className="flex justify-between">
          <p className="text-[13px] text-main font-bold">낙찰가:</p>
          <p className="text-[13px] text-main font-bold">
            {itemPrice.toLocaleString()}원
          </p>
        </div>
        <p className="text-[12px] text-gray-800 truncate">{title}</p>

        <div className="text-[12px] font-bold">
          <span className="text-gray-500 pr-5">{basePrice}원</span>
          <span className="text-[11px] text-warningkeword font-semibold">
            {calculateIncreaseRate(basePrice, itemPrice)} 상승
          </span>
        </div>

        <p className="text-[11px] text-gray-400">낙찰자: {buyer}</p>

        <div className="flex items-center gap-1 text-[12px] text-gray-600">
          입찰수 <span className="font-semibold ">({bidCount})</span>
        </div>
      </div>
    </div>
  );
}

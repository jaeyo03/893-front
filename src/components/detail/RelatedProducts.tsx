import { Auction } from "@/types/response.types";
import AuctionCard from "../AuctionCard";
import Image from "next/image";

interface RelatedProductsProps {
  isLoggedIn: boolean;
  relatedItem: Auction[] | null;
}

export default function RelatedProducts({ relatedItem, isLoggedIn }: RelatedProductsProps) {
  return (
    <div className="p-5 w-[1280px] mx-auto">
      <h2 className="pl-4 mb-2 text-xl font-bold">관련 상품</h2>
      <div className="flex gap-6 pl-4 overflow-x-auto scrollbar-hide">
        {Array.isArray(relatedItem) && relatedItem.length > 0 ? (
          relatedItem.map((item) => (
            <div key={item.id} className="min-w-[231px]">
              <AuctionCard product={item} isLoggedIn={isLoggedIn} />
            </div>
          ))
        ) : (
          <div className="grid items-center h-40 w-full gap-2 justify-center">
            <Image src="/icons/SearchEmpty.svg" alt="관련 상품이 없습니다." width={136} height={99}/>
            <div className="text-center text-gray-500">관련 상품이 없습니다</div>
          </div>
        )}
      </div>
    </div>
  )
}
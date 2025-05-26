"use client";

import { useEffect, useState } from "react";
import { Product, AuctionBidData } from "@/types/productData";
import { AuctionState } from "../../AuctionState";
import SellerProductHeader from "./SellerProductHeader";
import { addScrap, getProductData, removeScrap } from "@/lib/api/auction";

interface ProductInfoProps {
  product: Product;
  auctionBidData: AuctionBidData;
}

export default function SellerProductInfo({
  product,
  auctionBidData,
}: ProductInfoProps) {
  const [, setCurrentPrice] = useState<number>(product.basePrice);
  const [, setBidCount] = useState<number>(auctionBidData.totalBid);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(product.isScrap);
  const [scrapCount, setScrapCount] = useState<number>(product.scrapCount);

  useEffect(() => {
    const hasBids = auctionBidData.bids?.length > 0;
    const latestBid = hasBids
      ? [...auctionBidData.bids].sort((a, b) => b.bidPrice - a.bidPrice)[0]
          .bidPrice
      : product.basePrice;

    setCurrentPrice(latestBid);
    setBidCount(auctionBidData.totalBid);
  }, [auctionBidData, product.basePrice]);

  return (
    <div className="pt-5">
      <div className="mx-auto max-w-[620px] mb-4">
        <SellerProductHeader
          product={product}
          title={product.title}
          mainCategory={product.category.mainCategory}
          subCategory={product.category.subCategory}
          lastCategory={product.category.detailCategory}
          auctionId={product.auctionId}
        />
      </div>
      <div className="mx-auto max-w-[620px] border border-blue-400 rounded-lg p-4">
        <AuctionState
          product={product}
          auctionBidData={auctionBidData}
          isBookmarked={isBookmarked}
          bookmarkCount={scrapCount}
          onBookmarkToggle={async () => {
            try {
              if (isBookmarked) {
                await removeScrap(product.auctionId); // ✅ 스크랩 취소 요청
                setIsBookmarked(false);
              } else {
                await addScrap(product.auctionId); // ✅ 스크랩 추가 요청
                setIsBookmarked(true);
              }
              const updatedProduct = await getProductData(product.auctionId);
              setScrapCount(updatedProduct?.scrapCount ?? scrapCount);
            } catch (error) {
              alert("스크랩 처리 중 오류가 발생했습니다.");
            }
          }}
          isLoggedIn={true} // ✅ (임시) 판매자 페이지이므로 항상 로그인 상태로 가정? 수정해야됨 <-- 이 부분은 실제 로그인 상태에 따라 변경 필요 -->
        />
      </div>
    </div>
  );
}

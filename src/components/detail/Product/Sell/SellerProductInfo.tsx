'use client';

import { useEffect, useState } from 'react';
import { Product, AuctionBidData } from '@/types/productData';
import { AuctionState } from '../../AuctionState';
import SellerProductHeader from './SellerProductHeader';

interface ProductInfoProps {
  product: Product;
  auctionBidData: AuctionBidData;
}

export default function SellerProductInfo({ product, auctionBidData }: ProductInfoProps) {
  const [, setCurrentPrice] = useState<number>(product.basePrice);
  const [, setBidCount] = useState<number>(auctionBidData.totalBid);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(product.isScrap);
  const [bookmarkCount, setBookmarkCount] = useState<number>(product.scrapCount);

  useEffect(() => {
    const hasBids = auctionBidData.bids?.length > 0;
    const latestBid = hasBids
      ? [...auctionBidData.bids].sort((a, b) => b.bidPrice - a.bidPrice)[0].bidPrice
      : product.basePrice;

    setCurrentPrice(latestBid);
    setBidCount(auctionBidData.totalBid);
  }, [auctionBidData, product.basePrice]);

  return (
    <div className="pt-5">
      <div className="mx-auto max-w-[620px] mb-4">
        <SellerProductHeader
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
          bookmarkCount={bookmarkCount}
          onBookmarkToggle={() => {
            setIsBookmarked((prev) => !prev);
            setBookmarkCount((prev) => (isBookmarked ? prev - 1 : prev + 1));
          }}
        />
      </div>
    </div>
  );
}

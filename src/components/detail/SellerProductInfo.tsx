'use client';

import { useEffect, useState } from 'react';
import { RelatedProduct } from '@/data/productData';
import { AuctionState } from './AuctionState';
import SellerProductHeader from './SellerProductHeader';

interface ProductInfoProps {
  relatedProducts: RelatedProduct;
}

export default function SellerProductInfo({ relatedProducts }: ProductInfoProps) {
  const {
    currentPrice: initialPrice,
    bidCount: initialBidCount,
  } = relatedProducts;

  const [currentPrice] = useState<number>(initialPrice);
  const [bidCount] = useState<number>(initialBidCount);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(1);

  return (
    <div className="pt-5 ">
      <div className="mx-auto max-w-[620px] mb-4">
        <SellerProductHeader
          title={relatedProducts.title}
          mainCategory={relatedProducts.mainCategory}
          subCategory={relatedProducts.subCategory}
          lastCategory={relatedProducts.lastCategory}/>
      </div>
      <div className="mx-auto max-w-[620px] border border-blue-400 rounded-lg p-4">
        <div className="mb-4">
          <AuctionState
            relatedProducts={{
              ...relatedProducts,
              currentPrice,
              bidCount,
            }}
            isBookmarked={isBookmarked}
            bookmarkCount={bookmarkCount}
            onBookmarkToggle={() => {
              setIsBookmarked((prev) => !prev);
              setBookmarkCount((prev) => (isBookmarked ? prev - 1 : prev + 1));
            }}
          />
        </div>
      </div>
    </div>
  );
}

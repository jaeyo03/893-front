'use client';

import { useEffect, useState } from 'react';
import { RelatedProduct } from '@/data/productData';
import { AuctionState } from './AuctionState';
import BidInteraction from './BidInteraction';

interface ProductInfoProps {
  relatedProducts: RelatedProduct;
}

export default function ProductInfo({ relatedProducts }: ProductInfoProps) {
  const {
    currentPrice: initialPrice,
    bidCount: initialBidCount,
  } = relatedProducts;

  const [currentPrice, setCurrentPrice] = useState<number>(initialPrice);
  const [lastBidPrice,setLastBidPrice] = useState<number>(initialPrice)
  const [bidCount, setBidCount] = useState<number>(initialBidCount);
  const [isHighestBidder, setIsHighestBidder] = useState(false);
  const [cancelTimer, setCancelTimer] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(1);

  // 타이머 감소
  useEffect(() => {
    if (cancelTimer > 0) {
      const timer = setInterval(() => {
        setCancelTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsHighestBidder(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cancelTimer]);

  // ✅ 입찰하기 눌렀을 때 호출
  const handleBid = (amount: number) => {
    if (amount <= currentPrice) return;

    setLastBidPrice(currentPrice);
    setCurrentPrice(amount);             // 현재가 업데이트
    setBidCount((prev) => prev + 1);     // 입찰 수 증가
    setIsHighestBidder(true);
    setCancelTimer(300);                 // 5분 타이머 시작
  };

  const handleCancelBid = () => {
    setIsHighestBidder(false);
    setBidCount((prev) => prev - 1);  
    setCurrentPrice(lastBidPrice);
    setCancelTimer(0);
  };

  return (
    <div className="pt-5">
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
        <hr className="border-gray-300 my-4" />
        <div className="mt-4">
          <BidInteraction
            currentPrice={currentPrice}
            onBid={handleBid}
            onCancelBid={handleCancelBid}
            isHighestBidder={isHighestBidder}
            cancelTimer={cancelTimer}
          />
        </div>
      </div>
    </div>
  );
}

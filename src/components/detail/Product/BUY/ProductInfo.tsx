'use client';

import { useEffect, useState } from 'react';
import { Product,AuctionBidData } from '@/types/productData';
import { AuctionState } from '../../AuctionState';
import BidInteraction from '../../Bid/BidInteraction';
import ProductHeader from './ProductHeader';

interface ProductInfoProps {
  product: Product;
  auctionBidData: AuctionBidData;
}

export default function ProductInfo({ product,auctionBidData }: ProductInfoProps) {
  const [currentPrice, setCurrentPrice] = useState<number>(product.basePrice);
  const [lastBidPrice,setLastBidPrice] = useState<number>(product.basePrice)
  const [, setBidCount] = useState<number>(auctionBidData.totalBid);
  const [isHighestBidder, setIsHighestBidder] = useState<boolean>(false);
  const [cancelTimer, setCancelTimer] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(product.isScrap);
  const [bookmarkCount, setBookmarkCount] = useState<number>(1);

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
    <div className="pt-5 ">
      <div className="mx-auto max-w-[620px] mb-4">
        <ProductHeader
          title={product.title}
          sellerEmail={product.sellerEmailMasked}
          mainCategory={product.category.mainCategory}
          subCategory={product.category.subCategory}
          lastCategory={product.category.detailCategory}/>
      </div>
      <div className="mx-auto max-w-[620px] border border-blue-400 rounded-lg p-4">
        <div className="mb-4">
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

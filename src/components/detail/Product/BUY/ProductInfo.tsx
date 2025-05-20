// ProductInfo.tsx
import { useEffect, useState } from 'react';
import { Product, AuctionBidData, Bid } from '@/types/productData';
import { AuctionState } from '../../AuctionState';
import BidInteraction from '../../Bid/BidInteraction';
import ProductHeader from './ProductHeader';
import { addScrap, cancelBid, getProductData, postBid, removeScrap } from '@/lib/api/auction';
import toast from 'react-hot-toast';

interface ProductInfoProps {
  product: Product;
  auctionBidData: AuctionBidData;
  updateBidData: (newBid: Bid) => void;
  removeBidData: (bidId: number) => void; // 입찰 내역 업데이트 함수 추가
}

export default function ProductInfo({ product, auctionBidData, updateBidData, removeBidData}: ProductInfoProps) {
  const [currentPrice, setCurrentPrice] = useState<number>(product.basePrice);
  const [lastBidPrice, setLastBidPrice] = useState<number>(currentPrice);
  const [isHighestBidder, setIsHighestBidder] = useState<boolean>(false);
  const [myBidId,setMyBidId] = useState<number>(0);
  const [,setMyBidEmail] = useState<string>();
  const [cancelTimer, setCancelTimer] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(product.isScrap);
  const [scrapCount, setScrapCount] = useState<number>(product.scrapCount);

  useEffect(() => {
    if (auctionBidData.bids.length > 0) {
      const highestBid = auctionBidData.bids.reduce((max, bid) => {
        return bid.bidPrice > max ? bid.bidPrice : max;
      }, 0);
      setCurrentPrice(Math.max(highestBid, product.basePrice));
      setLastBidPrice(Math.max(highestBid, product.basePrice)); // 마지막 입찰 가격도 업데이트
    } else {
      setCurrentPrice(product.basePrice); // 입찰이 없다면 기본 가격으로 설정
      setLastBidPrice(product.basePrice);
    }
  }, [auctionBidData, product.basePrice]);

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
  const handleBid = async (amount: number) => {
    const isInitialBid = amount === product.basePrice;
    // 최초 입찰이 아닌 경우에만 현재가보다 높은 금액 요구
    if (!isInitialBid && amount <= currentPrice) return;
  
    try {
      const response = await postBid({
        itemId: product.auctionId,
        bidPrice: amount,
      });
  
      if (response) {
        const bidRespose = response.data;
        const newBid: Bid = {
          bidId: bidRespose.bidId,
          bidderEmail: bidRespose.bidderEmail,
          bidPrice: bidRespose.bidPrice,
          createdAt: bidRespose.createdAt,
          updatedAt: bidRespose.updatedAt,
        };
        setMyBidId(bidRespose.bidId);
        setMyBidEmail(bidRespose.bidderEmail);
        setLastBidPrice(currentPrice);
        setCurrentPrice(amount);
        setIsHighestBidder(true);
        setCancelTimer(60);
        updateBidData(newBid);
      }
    } catch (error) {
      toast.error('입찰에 실패했습니다. 다시 시도해 주세요.');
    }
  };
  

  const handleCancelBid = async () => {
    
    try {
      // API 호출하여 입찰 취소
      
      const response = await cancelBid({
        auctionId: product.auctionId,   // 경매 아이디 전달
        bidId: myBidId, // 입찰 아이디 전달
      });

      // API 호출이 성공하면 상태 업데이트
      if (response) {
        setIsHighestBidder(false); // 최고 입찰자 상태 변경
        setCurrentPrice(lastBidPrice); // 가격 복구
        setCancelTimer(0); // 타이머 초기화
        removeBidData(myBidId);
      }
    } catch (error) {
      alert('입찰 취소에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="pt-5 ">
      <div className="mx-auto max-w-[620px] mb-4">
        <ProductHeader
          title={product.title}
          sellerEmail={product.sellerEmailMasked}
          mainCategory={product.category.mainCategory}
          subCategory={product.category.subCategory}
          lastCategory={product.category.detailCategory}
        />
      </div>
      <div className="mx-auto max-w-[620px] border border-blue-400 rounded-lg p-4">
        <div className="mb-4">
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
                setScrapCount(updatedProduct?.data.scrapCount);
              } catch (error) {
                alert('스크랩 처리 중 오류가 발생했습니다.');
              }
            }}
          />
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="mt-4">
          <BidInteraction
            product={product}
            currentPrice={currentPrice}  // currentPrice 상태가 제대로 전달되었는지 확인
            onBid={handleBid}
            onCancelBid={handleCancelBid}
            isHighestBidder={isHighestBidder}
            cancelTimer={cancelTimer}
            endTime={product.endTime} 
            itemId={product.auctionId}
          />
        </div>
      </div>
    </div>
  );
}

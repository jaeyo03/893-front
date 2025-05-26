import { useEffect, useState } from "react";
import { Product, AuctionBidData, Bid } from "@/types/productData";
import { AuctionState } from "../../AuctionState";
import BidInteraction from "../../Bid/BidInteraction";
import ProductHeader from "./ProductHeader";
import {
  addScrap,
  cancelBid,
  getProductData,
  postBid,
  removeScrap,
} from "@/lib/api/auction";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: Product;
  auctionBidData: AuctionBidData;
  updateBidData: (newBid: Bid) => void;
  removeBidData: (bidId: number) => void;
  isLoggedIn: boolean; // ✅ 추가
}

export default function ProductInfo({
  product,
  auctionBidData,
  updateBidData,
  removeBidData,
  isLoggedIn, // ✅ 추가
}: ProductInfoProps) {
  const [currentPrice, setCurrentPrice] = useState<number>(product.basePrice);
  const [lastBidPrice, setLastBidPrice] = useState<number>(currentPrice);
  const [isHighestBidder, setIsHighestBidder] = useState<boolean>(false);
  const [myBidId, setMyBidId] = useState<number>(0);
  const [, setMyBidEmail] = useState<string>();
  const [cancelTimer, setCancelTimer] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(product.isScrap);
  const [scrapCount, setScrapCount] = useState<number>(product.scrapCount);

  useEffect(() => {
    const firstUserBid = auctionBidData?.userBids?.[0];
    if (firstUserBid) {
      const createdAt = new Date(firstUserBid.createdAt).getTime();
      const now = Date.now();
      const secondsPassed = Math.floor((now - createdAt) / 1000);
      const remainingTime = Math.max(60 - secondsPassed, 0);
      setCancelTimer(remainingTime);
    } else {
      setCancelTimer(null);
    }
  }, [auctionBidData]);

  useEffect(() => {
    if (cancelTimer && cancelTimer > 0) {
      const interval = setInterval(() => {
        setCancelTimer((prev) => {
          if (prev && prev <= 1) {
            clearInterval(interval);
            setIsHighestBidder(false);
            return 0;
          }
          return prev! - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cancelTimer]);

  const handleBid = async (amount: number) => {
    const isInitialBid = amount === product.basePrice;
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
      toast.error("입찰에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleCancelBid = async () => {
    try {
      const response = await cancelBid({
        auctionId: product.auctionId,
        bidId: myBidId,
      });

      if (response) {
        setIsHighestBidder(false);
        setCurrentPrice(lastBidPrice);
        setCancelTimer(0);
        removeBidData(myBidId);
      }
    } catch (error) {
      alert("입찰 취소에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="pt-5">
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
                  await removeScrap(product.auctionId);
                  setIsBookmarked(false);
                } else {
                  await addScrap(product.auctionId);
                  setIsBookmarked(true);
                }
                const updatedProduct = await getProductData(product.auctionId);
                if (updatedProduct) {
                  setScrapCount(updatedProduct.scrapCount);
                }
              } catch (error) {
                alert("스크랩 처리 중 오류가 발생했습니다.");
              }
            }}
            isLoggedIn={isLoggedIn}
          />
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="mt-4">
          <BidInteraction
            product={product}
            currentPrice={currentPrice}
            onBid={handleBid}
            onCancelBid={handleCancelBid}
            isHighestBidder={isHighestBidder}
            cancelTimer={Number(cancelTimer)}
            endTime={product.endTime}
            itemId={product.auctionId}
            isLoggedIn={isLoggedIn} // ✅ 전달
            isSeller={product.isSeller} // ✅ 전달
          />
        </div>
      </div>
    </div>
  );
}

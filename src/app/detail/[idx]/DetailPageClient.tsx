// src/app/detail/[idx]/DetailPageClient.tsx
"use client";

import ImageSlider from "@/components/detail/ImageSlider";
import GoodsInfo from "@/components/detail/Product/GoodsInfo";
import BidHistory from "@/components/detail/Bid/BidHistory";
import BidInteraction from "@/components/detail/BidInteraction";
import { Product, AuctionBidData, Bid, Status } from "@/types/productData";
import { useEffect, useState } from "react";
import ProductHeader from "@/components/detail/ProductHeader";
import { AuctionInfo } from "@/components/detail/AuctionInfo";
import AuctionCard from "@/components/AuctionCard";
import { Auction } from "@/types/response.types";
import QueryProvider from "@/components/QueryProvider";
import { useDeleteScrap } from "@/hooks/useScarp";
import { useAddScrap } from "@/hooks/useScarp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getRemainTime } from "@/lib/util/detailpage";

interface DetailPageClientProps {
  initialBidData: AuctionBidData;
  product: Product;
  isLoggedIn: boolean;
  relatedItem: Auction[] | null;
}

export default function DetailPageClient({
  initialBidData,
  product,
  isLoggedIn,
  relatedItem,
}: DetailPageClientProps) { 
  const [isScraped, setIsScraped] = useState<boolean>(product.isScraped ?? false);
  const [scrapCount, setScrapCount] = useState<number>(product.scrapCount);
  const [bidData, setBidData] = useState<AuctionBidData>(initialBidData);
  const [currentPrice, setCurrentPrice] = useState<number>(initialBidData.bids[0]?.bidPrice || product.basePrice);

  // 남은 시간과 시작 여부
  const { startTime, endTime } = product;
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  let currentAuctionState: Status = "pending";

  if (Date.now() < start) {
    currentAuctionState = "pending";
  } else if (Date.now() < end) {
    currentAuctionState = "active";
  } else {
    currentAuctionState = "completed";
  }

  const [auctionState, setAuctionState] = useState<Status>(currentAuctionState);
  const [remainTime, setRemainTime] = useState<number>(auctionState === "pending" ? getRemainTime(product.startTime) : getRemainTime(product.endTime));

  // 시간 계산 useEffect
  useEffect(() => {
    if (isNaN(start) || isNaN(end)) {
      console.error("잘못된 날짜 형식입니다:", { startTime, endTime });
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      let timeDiff;

      if (auctionState === "pending") {
        timeDiff = start - now;
      } else if (auctionState === "active") {
        timeDiff = end - now;
      } else {
        timeDiff = 0;
      }

      setRemainTime(Math.max(Math.floor(timeDiff / 1000), 0));

      if (now < start) {
        setAuctionState("pending");
      } else if (start <= now && now < end) {
        setAuctionState("active");
      } else {
        setAuctionState("completed");
        router.refresh();
      }
      console.log(auctionState);
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionState, end, endTime, start, startTime]);

  const {mutate: addScrapMutation} = useAddScrap();
  const {mutate: removeScrapMutation} = useDeleteScrap();
  
  const router = useRouter();

  const handlePayment = () => {
    router.push(`/payment?auctionId=${product.auctionId}`);
  };

  const handleScrapToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsScraped((prev) => !prev);
    setScrapCount((prev) => (isScraped ? prev - 1 : prev + 1));
    if (isScraped) {
      removeScrapMutation(product.auctionId);
    } else {
      addScrapMutation(product.auctionId);
    }
  };

  const updateBidDataFromSSE = (data: {
    bid: Bid;
    currentPrice: number;
    totalBid: number;
    totalBidder: number;
  }) => {
    const newBid = data.bid;
    setCurrentPrice(data.currentPrice);
    setBidData((prev) => {
      const updatedBids = [newBid, ...prev.bids];
      return {
        ...prev,
        bids: updatedBids,
        totalBid: data.totalBid,
        totalBidder: data.totalBidder,
      };
    });
  };

  const removeBidData = (bidId: number) => {
    setBidData((prev) => {
      const bidToCancel = prev.bids.find((bid) => bid.bidId === bidId);
      if (!bidToCancel) return prev;

      const updatedBids = prev.bids.filter((bid) => bid.bidId !== bidId);
      const updatedCancelledBids = [bidToCancel, ...prev.cancelledBids];

      return {
        ...prev,
        bids: updatedBids,
        cancelledBids: updatedCancelledBids,
        totalBid: updatedBids.length,
      };
    });
  };

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auctions/${product.auctionId}/stream`,
      { withCredentials: true }
    );

    eventSource.addEventListener("connect", (event) => {
      console.log("SSE connected:", event.data);
    });

    eventSource.addEventListener("bid-update", (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.isCancelled) {
          removeBidData(data.bid.bidId);
        } else {
          updateBidDataFromSSE(data);
        }
      } catch (error) {
        console.error("SSE parse error:", error);
      }
    });

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, [product.auctionId]);

  return (
    <>
      <div className="flex justify-between p-2">
        <div className="flex-1 mr-6 flex flex-col gap-6">
          <ImageSlider
            key={product.auctionId}
            images={product.images}
            auctionState={auctionState}
          />
          <GoodsInfo
            description={product.description}
            itemCondition={product.itemCondition}
          />
        </div>
        <div className="flex-1 ml-6 max-w-[620px] mt-5">
          <div className="mb-4">
            <div className="mx-auto max-w-[620px] mb-4">
              <ProductHeader
                product={product}
              />
            </div>
            <div className="mx-auto max-w-[620px] border border-blue-400 rounded-lg p-4">
              <div className="mb-4">
                <AuctionInfo
                  product={product}
                  currentPrice={currentPrice}
                  auctionBidData={bidData}
                  isScraped={isScraped}
                  scrapCount={scrapCount}
                  handleScrapToggle={handleScrapToggle}
                  isLoggedIn={isLoggedIn}
                  remainTime={remainTime}
                  auctionState={auctionState}
                />
              </div>
              
              {!isLoggedIn && auctionState === "active" && (
                <>
                  <hr className="border-gray-300 my-4" />
                  <div className="text-center text-gray-500">로그인 후 입찰 가능합니다.</div>
                </>
              )}

              {isLoggedIn && !product.isSeller && auctionState === "active" && (
                <>
                  <hr className="border-gray-300 my-4" />
                  <BidInteraction
                    product={product}
                    auctionBidData={bidData}
                    removeBidData={removeBidData}
                    isLoggedIn={isLoggedIn}
                    currentPrice={currentPrice}
                    remainTime={remainTime}
                    auctionState={auctionState}
                  />
                </>
              )}

              {!product.isSeller && product.status === "completed" && !product.hasBeenPaid && product.currentUserBuyer && (
                <>
                  <hr className="border-gray-300 my-4" />
                  <button className="w-[72px] h-[32px] text-sm text-white rounded bg-green-500 hover:bg-green-600" onClick={handlePayment}>
                    결제하기
                  </button>
                </>
              )}

              {product.hasBeenPaid && (
                <>
                  <hr className="border-gray-300 my-4" />
                  <div className="text-center text-gray-500">결제가 완료된 경매입니다.</div>
                </>
              )}

              {bidData.bids.length === 0 && auctionState === "completed" && (
                <>
                  <hr className="border-gray-300 my-4" />
                  <div className="text-center text-gray-500">유찰된 경매입니다.</div>
                </>
              )}
            </div>
          </div>
          <div className="mb-4">
            <BidHistory
              bidData={bidData.bids}
              cancelData={bidData.cancelledBids}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="p-5">
        <h2 className="pl-4 mb-2 text-xl font-bold">관련 상품</h2>
        <div className="flex gap-6 pl-4 overflow-x-auto scrollbar-hide">
          <QueryProvider>
            {Array.isArray(relatedItem) && relatedItem.length > 0 ? (
              relatedItem.map((item) => (
                <AuctionCard key={item.id} product={item} isLoggedIn={isLoggedIn} />
              ))
            ) : (
              <div className="grid items-center h-40 w-full gap-2 justify-center">
                <Image src="/icons/SearchEmpty.svg" alt="관련 상품이 없습니다." width={136} height={99}/>
                <div className="text-center text-gray-500">관련 상품이 없습니다</div>
              </div>
            )}
          </QueryProvider>
        </div>
      </div>
    </>
  );
}

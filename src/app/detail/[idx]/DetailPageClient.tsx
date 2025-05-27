// src/app/detail/[idx]/DetailPageClient.tsx
"use client";

import ImageSlider from "@/components/detail/ImageSlider";
import GoodsInfo from "@/components/detail/Product/GoodsInfo";
import BidHistory from "@/components/detail/Bid/BidHistory";
import BidInteraction from "@/components/detail/BidInteraction";
import { Product, AuctionBidData, Bid } from "@/types/productData";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import ProductHeader from "@/components/detail/ProductHeader";
import { AuctionInfo } from "@/components/detail/AuctionInfo";
import AuctionCard from "@/components/AuctionCard";
import { Auction } from "@/types/response.types";
import QueryProvider from "@/components/QueryProvider";
import { useDeleteScrap } from "@/hooks/useScarp";
import { useAddScrap } from "@/hooks/useScarp";

interface DetailPageClientProps {
  initialBidData: AuctionBidData | null;
  product: Product | null;
  isLoggedIn: boolean;
  relatedItem: Auction[];
}

export default function DetailPageClient({
  initialBidData,
  product,
  isLoggedIn,
  relatedItem,
}: DetailPageClientProps) {
  if (!product || !initialBidData) return notFound();

  const [isScraped, setIsScraped] = useState<boolean>(product.isScrap ?? false);
  const [scrapCount, setScrapCount] = useState<number>(product.scrapCount);
  const [bidData, setBidData] = useState<AuctionBidData>(initialBidData);
  const [currentPrice, setCurrentPrice] = useState<number>(initialBidData.bids[0]?.bidPrice || product.basePrice);
  
  const {mutate: addScrapMutation} = useAddScrap();
  const {mutate: removeScrapMutation} = useDeleteScrap();
  
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
    
    setBidData((prev) => {
      const updatedBids = [newBid, ...prev.bids];
      setCurrentPrice(data.currentPrice);
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
  }, []);

  return (
    <>
      <div className="flex justify-between p-2">
        <div className="flex-1 mr-6 flex flex-col gap-6">
          <ImageSlider
            key={product.auctionId}
            images={product.images}
            product={product}
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
                />
              </div>
              {!product.isSeller && (
                <>
                  <hr className="border-gray-300 my-4" />
                  <BidInteraction
                    product={product}
                    auctionBidData={bidData}
                    removeBidData={removeBidData}
                    isLoggedIn={isLoggedIn}
                    currentPrice={currentPrice}
                  />
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
                <AuctionCard product={item} isLogin={isLoggedIn} />
              ))
            ) : (
              <p className="text-sm text-gray-400 pl-4">관련 상품이 없습니다.</p>
            )}
          </QueryProvider>
        </div>
      </div>
    </>
  );
}

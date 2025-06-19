"use client";

import { useEffect, useState } from "react";
import QueryProvider from "../QueryProvider";
import { AuctionInfo } from "./AuctionInfo";
import { AuctionBidData, Bid, Product, Status } from "@/types/productData";
import { getRemainTime } from "@/lib/util/detailpage";
import { useRouter } from "next/navigation";
import BidInteraction from "./BidInteraction";

interface AuctionInfoWithBidInteractionProps {
  initialBidData: AuctionBidData;
  product: Product;
  isLoggedIn: boolean;
  bidData: AuctionBidData;
  setBidData: React.Dispatch<React.SetStateAction<AuctionBidData>>;
}

export default function AuctionInfoWithBidInteraction({ initialBidData, product, isLoggedIn, bidData, setBidData }: AuctionInfoWithBidInteractionProps) {
  const [currentPrice, setCurrentPrice] = useState<number>(initialBidData.currentPrice || product.basePrice);

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
        // router.refresh();
        // TODO 결제하기 연동 때문에 넣었는데 추후 수정 필요
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionState, end, endTime, start, startTime]);
  
  const router = useRouter();

  const handlePayment = () => {
    router.push(`/payment?auctionId=${product.auctionId}`);
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
      
      const newCurrentPrice = updatedBids.length > 0 ? updatedBids[0].bidPrice : product.basePrice;

      setCurrentPrice(newCurrentPrice);
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
      console.log('언 마운트 되며 SSE 정리')
      eventSource.close();
    };
  }, [product.auctionId]);

  return (
    <div className="mx-auto max-w-[620px] border border-blue-400 rounded-lg p-4 mb-4">
      <div className="mb-4">
        <QueryProvider>
          <AuctionInfo
            product={product}
            currentPrice={currentPrice}
            auctionBidData={bidData}
            isLoggedIn={isLoggedIn}
            remainTime={remainTime}
            auctionState={auctionState}
          />
        </QueryProvider>
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
  )
}
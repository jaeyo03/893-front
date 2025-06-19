"use client";

import { useEffect, useState } from "react";
import { Product, AuctionBidData, Status } from "@/types/productData";
import {
  cancelBid,
  postBid,
} from "@/lib/api/auction";
import toast from "react-hot-toast";
import { TriangleAlert } from "lucide-react";
import WarningModal from "./WarningModal";
import { numberToKorean, getRemainTime, formatTime } from "@/lib/util/detailpage";
import { AxiosError } from "axios";

interface BidInteractionProps {
  product: Product;
  auctionBidData: AuctionBidData;
  removeBidData: (bidId: number) => void;
  isLoggedIn: boolean;
  currentPrice: number;
  remainTime: number;
  auctionState: Status;
}

export default function BidInteraction({
  product,
  auctionBidData,
  removeBidData,
  isLoggedIn,
  currentPrice,
  remainTime,
  auctionState,
}: BidInteractionProps) {
  const [myBidId, setMyBidId] = useState<number | null>(window.sessionStorage.getItem("bidId") ? Number(window.sessionStorage.getItem("bidId")) : null);
  const [bidAmount, setBidAmount] = useState<number>(Number.isFinite(currentPrice) ? currentPrice + 100 : product.basePrice);
  const [show, setShow] = useState(false);
  const [isCancelable, setIsCancelable] = useState(auctionBidData.canCancelBid);
  const myRecentBidCreatedDate = auctionBidData?.recentUserBid?.createdAt ? new Date(auctionBidData?.recentUserBid?.createdAt) : null;
  const cancelAvailableDate = myRecentBidCreatedDate ? new Date(myRecentBidCreatedDate.getTime() + 60 * 1000) : null;
  const [cancelTimer, setCancelTimer] = useState<number>(getRemainTime(cancelAvailableDate?.toISOString() || ""));
  const [isLoading, setIsLoading] = useState(false);

  const isBidAvailable = !product.hasBeenPaid && remainTime > 0 && !product.isSeller && auctionState === "active";

  const handleBid = async () => {
    const isInitialBid = bidAmount === product.basePrice;

    if (!isInitialBid && bidAmount < currentPrice + 100) {
      toast.error("입찰 금액은 현재가보다 최소 100원 이상이어야 합니다.");
      return;
    }
    if (isInitialBid && bidAmount <= currentPrice) {
      toast.error("입찰 금액은 현재가보다 높아야 합니다.");
      return;
    }

    if (bidAmount % 100 !== 0) {
      toast.error("입찰 금액은 100원 단위여야 합니다.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await postBid({
        itemId: product.auctionId,
        bidPrice: bidAmount,
      });

      if (response) {
        const bidResponse = response.data;
        window.sessionStorage.setItem("bidId", bidResponse.bid.bidId.toString());
        setMyBidId(bidResponse.bid.bidId);

        const createdDate = new Date(bidResponse.bid.createdAt);
        const cancelDate = new Date(createdDate.getTime() + 60 * 1000);
        setCancelTimer(getRemainTime(cancelDate.toISOString()));
        
        setIsCancelable(bidResponse.canCancelBid);
      }
      toast.success("입찰이 성공적으로 처리되었습니다.");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("서버 응답 내용:", error.response?.data);
      }
      toast.error("입찰에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (!raw) {
      setBidAmount(0);
      return;
    }
    const num = Number(raw);
    if (!Number.isFinite(num)) return;
    setBidAmount(Math.min(num, 1_000_000_000));
  };

  const handleCancelBid = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if(!myBidId) {
        toast.error("입찰 정보가 없습니다. 입찰 취소에 실패했습니다.");
        return;
      }

      const response = await cancelBid({
        auctionId: product.auctionId,
        bidId: myBidId,
      });

      if (response) {
        setCancelTimer(0);
        removeBidData(myBidId);
        window.sessionStorage.removeItem("bidId");
        setMyBidId(null);
      }

      toast.success("입찰이 취소되었습니다.");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("서버 응답 내용:", error.response?.data);
      }
      toast.error("입찰 취소에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentPrice > 0) {
      setBidAmount(currentPrice + 100);
    }
  }, [currentPrice]);

  useEffect(() => {
    if (isCancelable && cancelTimer && cancelTimer > 0) {
      const interval = setInterval(() => {
        setCancelTimer((prev) => {
          if (prev && prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev! - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cancelTimer]);

  if (!product.auctionId || !product || typeof currentPrice !== "number") {
    return <div className="text-red-500">잘못된 경매 정보입니다.</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mt-4 mb-1">
        <p className="font-medium text-black text-sl">
          입찰 금액
          <span className="text-xs ml-2 font-thin text-red">
            ※ 최소 입찰 단위 100원
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-gray-500">₩</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={
            !isLoggedIn || product.isSeller ? "" : bidAmount !== 0 ? bidAmount : ""
          }
          onChange={handleInputChange}
          disabled={!isBidAvailable}
          readOnly={!isLoggedIn || product.isSeller}
          className="w-full px-2 py-1 text-right border rounded bg-gray-100"
        />

        {isLoggedIn && isBidAvailable && (
          <>
            <button className="w-[72px] h-[32px] text-sm text-white rounded bg-main hover:bg-blue-700" onClick={handleBid}>
              입찰하기
            </button>
            <div
              className="relative inline-block"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <TriangleAlert
                className="w-5 h-5 cursor-pointer"
                fill="red"
                color="white"
              />
              <WarningModal
                isOpen={show}
                positionClass="left-1/2 top-full mt-2 -translate-x-1/2"
              />
            </div>
          </>
        )}
      </div> 

      {isLoggedIn && isBidAvailable && (
        <p className="mt-1 text-xs font-thin text-right text-red mr-[96px]">
          {bidAmount > 0 ? numberToKorean(bidAmount) : ""}
        </p>
      )}

      {cancelTimer > 0 && isCancelable && (
        <div className="flex items-center justify-between p-3 text-yellow-800 bg-yellow-100 rounded-lg">
          <div>
            <p className="text-sm">
              입찰 취소 가능 시간: {formatTime(cancelTimer)}
            </p>
          </div>
          <button
            className="px-3 py-1 text-yellow-600 border border-yellow-600 rounded hover:bg-yellow-200"
            onClick={handleCancelBid}
          >
            취소하기
          </button>
        </div>
      )}
    </div>
  );
}

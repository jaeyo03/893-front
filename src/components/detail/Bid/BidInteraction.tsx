'use client';

import { useState, useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';
import { BidInteractionProps } from '@/types/productData';
import WarningModal from '../WarningModal';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';

function numberToKorean(num: number): string {
  if (num === 0) return "0원";

  const units = [
    { value: 10 ** 8, label: "억" },
    { value: 10 ** 4, label: "만" },
    { value: 1, label: "" },
  ];

  let result = "";

  for (const unit of units) {
    const unitValue = Math.floor(num / unit.value);
    if (unitValue > 0) {
      result += `${unitValue}${unit.label} `;
      num %= unit.value;
    }
  }

  return result.trim() + "원";
}

function getRemainTime(endAt: string): number {
  const now = new Date();
  const end = new Date(endAt);
  const diff = Math.floor((end.getTime() - now.getTime()) / 1000);
  return Math.max(diff, 0); // 0보다 작아지지 않도록
}

export default function BidInteraction({
  product,
  currentPrice,
  onBid,
  onCancelBid,
  isHighestBidder,
  cancelTimer,
  endTime,
  itemId,
}: BidInteractionProps) {
  const [bidAmount, setBidAmount] = useState<number>(currentPrice + 100);
  const [show, setShow] = useState(false);
  const [remainTime, setRemainTime] = useState<number>(getRemainTime(endTime));

  const isAuctionEnded = remainTime <= 0;

  const router = useRouter(); // ✅ 추가

  const handlePayment = () => {
    router.push(`/payment?auctionId=${itemId}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = getRemainTime(endTime);
      setRemainTime(timeLeft);
    }, 1000); // 매초 갱신

    return () => clearInterval(interval);
  }, [endTime]);

  useEffect(() => {
    if (currentPrice > 0) {
      setBidAmount(currentPrice + 100);
    }
  }, [currentPrice]);

  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${hours}:${min}:${sec}`;
  };

  const handleBid = async () => {
    if (isHighestBidder && cancelTimer > 0) return;
  
    const isInitialBid = currentPrice === product.basePrice;
  
    if (bidAmount % 100 !== 0) {
      toast.error('입찰 금액은 100원 단위여야 합니다.');
      return;
    }
  
    if (!isInitialBid && bidAmount < currentPrice + 100) {
      toast.error(`입찰 금액은 현재가보다 최소 100원 이상이어야 합니다.`);
      return;
    }
  
    if (isInitialBid && bidAmount <= currentPrice) {
      toast.error(`입찰 금액은 현재가보다 높아야 합니다.`);
      return;
    }
  
    try {
      await onBid(bidAmount);
    } catch (error: any) {
      toast.error(error?.message || '입찰에 실패했습니다.');
    }
  };
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    if (value === '') {
      setBidAmount(0);
      return;
    }

    const numericValue = Math.min(Number(value), 1000000000); // 10억 제한
    setBidAmount(numericValue);
  };

  const handleCancelBid = () => {
    onCancelBid();
    toast('입찰이 취소되었습니다.', {
      icon: '❌',
    });
  };
  

  return (
    <div>
      <div className="flex items-center justify-between mt-4 mb-1">
        <p className="font-medium text-black text-sl">
          입찰 금액
          <span className="text-xs font-thin text-red"> ※ 최소 입찰 단위 100원</span>
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-gray-500">₩</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={bidAmount !== 0 ? bidAmount : ''}
          onChange={handleInputChange}
          disabled={isAuctionEnded}
          className="w-full px-2 py-1 text-right border rounded bg-gray-100"
        />

        <button
          className={`w-[72px] h-[32px] text-sm text-white rounded ${
            isAuctionEnded
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-main hover:bg-blue-700'
          }`}
          onClick={isAuctionEnded ? handlePayment : handleBid}
        >
          {isAuctionEnded ? '결제하기' : '입찰하기'}
        </button>
        <div
          className="relative inline-block"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <TriangleAlert className="w-5 h-5 cursor-pointer" fill="red" color="white" />
          <WarningModal
            isOpen={show}
            positionClass="left-1/2 top-full mt-2 -translate-x-1/2"
          />
        </div>
      </div>

      <p className="mt-1 text-xs font-thin text-right text-red mr-[100px]">
        {bidAmount > 0 ? numberToKorean(bidAmount) : ''}
      </p>

      {isHighestBidder && (
        <div className="flex items-center justify-between p-3 text-yellow-800 bg-yellow-100 rounded-lg">
          <div>
            <p className="font-medium">현재 최고 입찰자입니다.</p>
            <p className="text-sm">입찰 취소 가능 시간: {formatTime(cancelTimer)}</p>
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

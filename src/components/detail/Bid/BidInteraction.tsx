'use client';

import { useState, useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';
import { BidInteractionProps } from '@/types/productData';
import WarningModal from '../WarningModal';


export default function BidInteraction({
  currentPrice,
  onBid,
  onCancelBid,
  isHighestBidder,
  cancelTimer,
}: BidInteractionProps) {
  const [bidAmount, setBidAmount] = useState<number>(currentPrice + 100);
  const [show, setShow] = useState(false);

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

  const convertToKoreanCurrency = (amount: number) => {
    const man = Math.floor(amount / 10000);
    const chun = Math.floor((amount % 10000) / 1000);
    const baek = Math.floor(amount % 1000);
    let result = '';
    if (man > 0) result += `${man}만`;
    if (chun > 0) result += ` ${chun}천`;
    if (baek > 0) result += `${baek}`;
    return result.trim() ? `${result.trim()}원` : '';
  };

  const handleBid = () => {
    if (isHighestBidder && cancelTimer > 0) return;
    if (bidAmount % 100 !== 0) return;
    if (bidAmount >= currentPrice + 100) {
      onBid(bidAmount);
    }
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
          type="number"
          step={100}
          value={bidAmount !== 0 ? bidAmount : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setBidAmount(0);
              return;
            }
            const numericValue = Number(value.replace(/^0+/, ''));
            setBidAmount(numericValue);
          }}
          className="w-full px-2 py-1 text-right border rounded"
        />
        <button
          className="w-[72px] h-[32px] text-sm text-white bg-main rounded hover:bg-blue-700"
          onClick={handleBid}
        >
          입찰하기
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
        {bidAmount > 0 ? convertToKoreanCurrency(bidAmount) : ''}
      </p>

      {isHighestBidder && (
        <div className="flex items-center justify-between p-3 text-yellow-800 bg-yellow-100 rounded-lg">
          <div>
            <p className="font-medium">현재 최고 입찰자입니다.</p>
            <p className="text-sm">입찰 취소 가능 시간: {formatTime(cancelTimer)}</p>
          </div>
          <button
            className="px-3 py-1 text-yellow-600 border border-yellow-600 rounded hover:bg-yellow-200"
            onClick={onCancelBid}
          >
            취소하기
          </button>
        </div>
      )}
    </div>
  );
}

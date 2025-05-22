'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MyAuctionsProduct } from '@/types/userData';
import { getAuctionStatus } from './constants/MyPageProduct';
import { useEffect, useState } from 'react';
import { getRemainingTime } from './TimeCalculator';
import { deleteAuction } from '@/lib/api/auction';

interface Props {
  auctions: MyAuctionsProduct;
}

export default function MyAuctionsProductCard({ auctions }: Props) {
  const router = useRouter();
  const status = getAuctionStatus(auctions.status);

  const [remainingTime, setRemainingTime] = useState<string>(() =>
    getRemainingTime(auctions.endTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime(auctions.endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [auctions.endTime]);

  const handleClick = () => {
    router.push(`/detail/${auctions.auctionId}`);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await deleteAuction(auctions.auctionId);
      alert('삭제되었습니다.');
      router.refresh()
    } catch (error) {
      alert('삭제에 실패했습니다.');
      console.error('삭제 실패:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Card
        onClick={handleClick}
        className="p-4 mb-4 w-full !h-[156px] border-width: 1.2px; border-checkbox cursor-pointer shadow-none"
      >
        <div className="flex items-center h-full">
          <img
            src={`http://localhost:8080${auctions.mainImageUrl}` || '/placeholder.jpg'}
            alt={auctions.title}
            className="w-32 h-32 object-cover rounded mr-4 bg-gray-100"
          />
          <div className="flex-1">
            <p className="font-bold text-[16px]">{auctions.title}</p>
            <div className="text-[14px] mt-2">현재 입찰가</div>
            <div className="text-[16px]">{auctions.bidHighestPrice.toLocaleString()}원</div>
            <p className="text-xs mt-6">
              {remainingTime === '종료됨' || remainingTime === '0시간 0분 0초'
                ? '종료됨'
                : `남은 시간: ${remainingTime}`}
            </p>
          </div>
          <div className="flex flex-col justify-between items-center ml-4 h-full py-2">
            <span className={`text-xs text-white px-3 py-1 rounded-full ${status.className}`}>
              {status.label}
            </span>
            <Button
              className="mt-auto text-xs tracking-wide h-[32px] border-[1px] border-red text-red bg-white px-2 py-[1px] hover:bg-red hover:text-white shadow-none"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

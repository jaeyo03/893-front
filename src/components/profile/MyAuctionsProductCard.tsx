'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MyAuctionsProduct } from '@/types/userData';
import { getAuctionStatus } from './constants/MyPageProduct';

interface Props {
  auctions: MyAuctionsProduct;
}

export default function MyAuctionsProductCard({ auctions }: Props) {
  const router = useRouter();

  const status = getAuctionStatus(auctions.status);
  const handleClick = () => {
    router.push(`/seller/detail/${auctions.auctionId}`);
  };

  const formattedEndTime = auctions.endTime
    ? new Date(auctions.endTime).toLocaleTimeString('ko-KR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '';
    

  return (
    <div className="flex flex-col items-center w-full">
      <Card
        onClick={handleClick}
        className="p-4 mb-4 w-full !h-[166px] border-2 border-checkbox cursor-pointer"
      >
        <div className="flex items-center h-full">
          <img
            src={`http://localhost:8080${auctions.mainImageUrl}` || '/placeholder.jpg'}
            alt={auctions.title}
            className="w-24 h-24 object-cover rounded mr-4 bg-gray-100"
          />
          <div className="flex-1">
            <p className="font-bold text-[16px]">{auctions.title}</p>
            <div className="text-[14px] mt-2">현재 입찰가</div>
            <div className="text-[16px]">{auctions.bidHighestPrice.toLocaleString()}원</div>
            <p className="text-xs mt-6">종료 시간: {formattedEndTime}</p>
          </div>
          <div className="flex flex-col justify-between items-center ml-4 h-full py-2">
            <span className={`text-xs text-white px-3 py-1 rounded-full ${status.className}`}>
              {status.label}
            </span>
            <Button
              className="mt-auto text-xs border-2 border-red text-red bg-white px-2 py-1 hover:bg-red hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: 삭제 처리
              }}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

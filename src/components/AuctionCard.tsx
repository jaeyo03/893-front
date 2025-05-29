'use client';

import { Bookmark, Clock, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { Auction } from '@/types/response.types';
import { useRouter } from 'next/navigation';
import { useAddScrap, useDeleteScrap } from '@/hooks/useScarp';

interface AuctionCardProps {
  product: Auction;
  isLoggedIn: boolean;
}

const statusMap: Record<Auction['status'], { label: string; color: string }> = {
  pending: {label: "경매 전", color: "bg-rightgray"},
  active: {label: "경매 중", color: "bg-main"},
  completed: {label: "종료", color: "bg-red"},
  cancelled: {label: "취소", color: "bg-red"},
};

export default function AuctionCard({product, isLoggedIn}: AuctionCardProps) {
  const router = useRouter()
  const [isScraped, setIsScraped] = useState<boolean>(product.isScraped ?? false);
  const [scrapCount, setScrapCount] = useState<number>(product.scrapCount);
  
  const statusInfo = statusMap[product.status] ?? {label: "알 수 없음", color: "bg-red-500"};
  
  const {mutate: addScrapMutation} = useAddScrap();
  const {mutate: removeScrapMutation} = useDeleteScrap();
  
  const handleScrapToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsScraped((prev) => !prev);
    setScrapCount((prev) => (isScraped ? prev - 1 : prev + 1));
    if (isScraped) {
      removeScrapMutation(product.id);
    } else {
      addScrapMutation(product.id);
    }
  };

  const handleCardClick = () => {
    router.push(`/detail/${product.id}`);
  };
  
  return (
    <div 
      onClick={handleCardClick}
      className="p-2 rounded-xl shadow border h-[330px] w-[231px] bg-white cursor-pointer hover:drop-shadow-md">
      <div className="grid grid-cols-1 grid-rows-1">
        <img
          src={`http://localhost:8080${product.thumbnailUrl}` || '/placeholder.jpg'}
          alt={product.title}
          width={231}
          height={231}
          className="row-start-1 col-start-1 w-full h-48 bg-gray-200 rounded-lg"
        />
        <span
          className={`
            row-start-1 col-start-1
            self-start justify-self-start
            mt-2 ml-2
            px-2 py-0.5 text-xs font-bold text-white rounded
            ${statusInfo.color}
          `}
        >
          {statusInfo.label}
        </span>
        {isLoggedIn && (
          <button
            onClick={handleScrapToggle}
            className="row-start-1 col-start-1 self-end justify-self-end mb-2 mr-2 p-1">
            <Bookmark
            className={`
              w-6 h-6
              ${isScraped ? 'text-black fill-black' : 'text-gray-400 hover:text-black hover:rounded'}`}
            />
          </button>
        )}
      </div>
      
      <div className="pt-3 space-y-1">
        <p className="text-sm font-semibold truncate">{product.title}</p>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock size={16}/>
          <span>경매 종료 :</span>
          <span>
            {product.endTime && new Date(product.endTime).toLocaleString('ko-KR', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <UsersRound size={16}/>
          <span>입찰자 수 :</span>
          <span>{product.status === 'pending' ? 0 : product.bidderCount}명</span>
        </div>
        <p className="pt-1 text-sm font-semibold text-black">
          {(product.status === 'pending' ? `경매 시작가 : ${product.basePrice.toLocaleString()}원` : `현재 입찰가 : ${product.currentPrice.toLocaleString()}원`)}
        </p>
        <p className="text-xs text-gray-500">스크랩 {scrapCount}</p>
      </div>
    </div>
  );
}

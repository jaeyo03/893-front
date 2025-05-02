'use client';

import Image from 'next/image';
import { Bookmark } from 'lucide-react'; // 아이콘 (lucide-react 설치 필요)

type AuctionItemCardProps = {
  imageUrl: string;
  label?: string; // "경매중" 등
};

export default function AuctionItemCard({ imageUrl, label = '경매중' }: AuctionItemCardProps) {
  return (
    <div className="p-5">
      <div className="relative border rounded-lg shadow-md overflow-hidden w-[600px] h-[600px] bg-white">
        

        {/* 이미지 */}
        <Image
          src={imageUrl}
          alt="Auction item"
          width={600}
          height={600}
          style={{objectFit: 'cover'}}
          className="object-cover"
        />
        {/* 경매 상태 뱃지 */}
        <div className="absolute px-2 py-1 text-sm font-bold text-white bg-blue-600 rounded top-2 left-2">
          {label}
        </div>

        {/* 북마크 아이콘 */}
        <div className="absolute text-gray-700 bottom-2 right-2">
          <Bookmark />
        </div>
      </div>
    </div>
  );
}

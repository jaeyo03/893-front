

import Image from 'next/image';

type AuctionItemCardProps = {
  imageUrl: string;
  label: string; // "경매중,경매전,경매 완료" 
};

export default function AuctionItemCard({ imageUrl, label = '경매중' }: AuctionItemCardProps) {
  return (
    <div className="p-5">
      <div className="relative border rounded-lg overflow-hidden w-[600px] h-[600px] bg-white">
        

        {/* 이미지 */}
        <Image
          src={imageUrl}
          alt="Auction item"
          className="object-cover  w-[600px] h-[600px]"
        />
        {/* 경매 상태 뱃지 */}
        <div className="absolute px-2 py-1 text-sm font-bold text-white bg-blue-600 rounded top-2 left-2">
          {label}
        </div>

        
      </div>
    </div>
  );
}

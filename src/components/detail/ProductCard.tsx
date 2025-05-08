'use client'
import { Bookmark } from 'lucide-react';
import { useEffect,useState } from 'react';

interface AuctionCardProps {
  imageUrl: string;
  title: string;
  status : string;
  startTime : string;
  endTime: string;
  currentPrice: number;
  bidderCount: number;
  scrapCount: number;
  isScrapped?: boolean;
}
const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: "경매 중", color: "bg-main" },
  end: { label: "종료", color: "bg-red" },
  yet: { label: "경매 전", color: "bg-rightgray" },
};


export default function AuctionCard({
  imageUrl,
  title,
  status,
  startTime,
  endTime,
  currentPrice,
  bidderCount,
  scrapCount,
  isScrapped = false,
}: AuctionCardProps) {
  const [isScraped,setIsScraped] = useState(false);
  const [bookmarkCount,setBookmarkCount] = useState(1);
  const statusInfo = statusMap[status] ?? { label: "알 수 없음", color: "bg-red-500" };

  const handleScrapToggle = () =>{
    setIsScraped((prev) => !prev);
    setBookmarkCount((count)=>(isScraped ? count -1:count+1));
  }
  return (
    <div className="p-2 rounded-xl shadow border w-[231px] bg-white">
      <div className="relative">
        <img src={imageUrl} alt={title} className="object-contain w-full h-48 bg-gray-200 rounded-lg" />
        <span className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-bold text-white rounded ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
        <button onClick={handleScrapToggle}
        className="absolute p-1 bottom-2 right-2">
          <Bookmark
            className={`w-5 h-5 ${isScrapped ? 'text-black fill-black' : 'text-gray-400 hover:text-black hover:fill-black'}`}
            
          />
        </button>
      </div>

      <div className="pt-3 space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <span>🕒 경매 종료 :</span>
          <span>{endTime}</span>
          <div className="flex items-center gap-1 ml-4 text-xs text-gray-600">
            <span>👥</span>
            <span>{bidderCount}명</span>
        </div>
        </div>
        <p className="pt-1 text-sm font-bold text-black">
          현재 입찰가 : {currentPrice.toLocaleString()}원
        </p>
        <p className="text-xs text-gray-500">스크랩 {scrapCount}</p>
      </div>
    </div>
  );
}



{/*필요한 데이터 정리
  1. 이미지 url
  2. 경매 status -> 진행 전, 경매중, 경매 완
  3. 경매 title -> 몇글자까지 보여줄 것인가.
  4. bookmark->체크 가능
  5. bookmark 유저 수
  6. 경매 시간
    a) 경매 시작 전 -> 시작까지 남은 시간? 경매 시작 시간? 경매 종료 시간?
    b) 경매 진행 중 -> 경매 종료까지 남은 시간? 경매 종료 시간?
    c) 경매 종료 -> 경매 종료 시간? 경매종료?
  7. 참여자 수
    a) 경매 시작 전일 경우 0명
    b) 경매 진행 중인 경우 n명
    c) 경매 종료 -> 참여한 사람 수.
  8. 현재 입찰가(진행중x-> 시작가)

  */}
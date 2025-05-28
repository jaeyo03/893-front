import { Status } from "@/types/productData";
import { Auction } from "@/types/response.types";

interface AuctionImageCardProps {
  imageUrl: string;
  label: Status;
};

const statusMap: Record<Auction['status'], { label: string; color: string }> = {
  pending: {label: "경매 전", color: "bg-rightgray"},
  active: {label: "경매 중", color: "bg-main"},
  completed: {label: "종료", color: "bg-red"},
  cancelled: {label: "취소", color: "bg-red"},
};

export default function AuctionImageCard({imageUrl,label}: AuctionImageCardProps) {


const statusInfo = statusMap[label] ?? {label: "알 수 없음", color: "bg-red-500"};
  return (
    <div className="p-5">
      <div className="relative border rounded-lg overflow-hidden w-[600px] h-[600px] bg-white">
        {/* 이미지 */}
        <img
          src={`http://localhost:8080${imageUrl}` || '/placeholder.jpg'}
          alt="Auction item"
          width={600}
          height={600}
          className="object-cover "
        />
        {/* 경매 상태 뱃지 */}
        <div
          className={`absolute px-2 py-1 text-sm font-bold text-white rounded top-2 left-2 ${statusInfo.color}`}
        >
          {statusInfo.label}
          </div>
        
      </div>
    </div>
  );
}

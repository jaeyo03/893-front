import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AuctionStatus {
  label: string;
  className: string;
}

const getAuctionStatus = (isWinning:Boolean) : AuctionStatus=>{
  return isWinning
  ?{label:"입찰 중",className:"bg-main"}
  :{label:"경매 중",className:"bg-warningkeword"}
}

// 입찰 카드에 표시할 데이터 정의
const bidInfo = {
  productName: "삼성 갤럭시 S23 Ultra",
  myBid: "₩750,000",
  currentBid: "₩750,000",
  remainingTime: "1일 23시간 59분",
  isWinning: false, // ← false일 경우 "입찰중" 표시됨
  status:"pending",
};

export default function ProductBidCard() {
  const status = getAuctionStatus(bidInfo.isWinning);
  return (
    <div className="flex justify-center w-full">
      <Card className="p-4 mb-4 !w-[1024px] !h-[166px] border-2 border-checkbox">
        <div className="flex items-center h-full">
          <div className="w-24 h-24 bg-gray-100 mr-4" />
          <div className="flex-1">
            <p className="font-bold text-[16px]">{bidInfo.productName}</p>

            <div className="flex justify-between text-[14px] mt-2">
              <span className="w-1/2">내 입찰가</span>
              <span className="w-1/2 text-left">현재 입찰가</span>
            </div>

            <div className="flex justify-between text-[16px]">
              <span className="w-1/2">{bidInfo.myBid}</span>
              <span className="w-1/2 text-left">{bidInfo.currentBid}</span>
            </div>

            <p className="text-xs mt-6">남은 시간: {bidInfo.remainingTime}</p>
          </div>

          <div className="flex flex-col justify-between items-center ml-4 h-full py-2">
            <span className={`text-xs text-white px-3 py-1 rounded-full ${status.className}`}>
              {status.label}
            </span>
            <Button className="mt-auto text-xs border-2 border-main text-main bg-white px-2 py-1 hover:bg-main hover:text-white">
              상세 보기
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

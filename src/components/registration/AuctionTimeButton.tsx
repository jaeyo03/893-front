import { Button } from "../ui/button";

export default function AuctionStartTimeButton() {
  return (
    <Button className="w-[560px] h-[50px] bg-white border border-registerline text-resgistertext text-[16px] font-thin rounded-[6px] px-[16px] shadow-none text-left hover:bg-divider">
      경매 소요 시간 선택 (10분 ~ 24시간)
    </Button>
  );
}

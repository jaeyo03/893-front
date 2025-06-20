import type { AuctionSoonItem } from "@/lib/api/home";
import { getAuctionSoonItems } from "@/lib/api/home";
import EmptyState from "@/components/home/EmptyState";
import AuctionSoonList from "./AuctionSoonList";

export default async function AuctionSoonItemList() {

  const { data: auctionSoonItemList }: { data: AuctionSoonItem[] } =
    await getAuctionSoonItems();

  const limited = Array.isArray(auctionSoonItemList)
    ? auctionSoonItemList.slice(0, 3)
    : [];

  if (limited.length === 0) {
    return (
      <EmptyState
        message="곧 시작할 경매 물품이 없습니다."
        className="pt-20 pb-20"
      />
    );
  }

  return (
      <div className="flex justify-start gap-6">
        {limited.map((item) => (
          <AuctionSoonList key={item.auctionId} {...item} />
        ))}
      </div>
  );
}

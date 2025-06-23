import TopBidCard from "./TopBidCard";
import EmptyState from "@/components/home/EmptyState";
import { getTopBidItems } from "@/lib/api/home";
import type { TopBidItem } from "@/lib/api/home";

export default async function TopBidCardList() {

  const { data: topBidCardList }: { data: TopBidItem[] } = await getTopBidItems();

  if (topBidCardList.length === 0) {
    return (
      <EmptyState
        message="낙찰가 높은 상품이 아직 없습니다."
        className="pt-20 pb-20"
      />
    );
  }

  return (
      <div className="flex gap-4">
        {topBidCardList.map((item) => (
          <TopBidCard key={item.auctionId} {...item} />
        ))}
      </div>
  );
}

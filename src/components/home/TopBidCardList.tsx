"use client";

import TopBidCard from "./TopBidCard";
import { TopBidItem } from "@/lib/api/home";
import EmptyState from "@/components/home/EmptyState";

interface TopBidCardProps {
  topBidCardList: TopBidItem[];
}

export default function TopBidCardList({ topBidCardList }: TopBidCardProps) {
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

// components/home/AuctionSoonItemList.tsx
"use client";

import { AuctionSoonItem } from "@/lib/api/home";
import AuctionSoonList from "./AuctionSoonList";

interface AuctionSoomItemListProps {
  auctionSoonItemList: AuctionSoonItem[];
}

export default function AuctionSoonItemList({
  auctionSoonItemList,
}: AuctionSoomItemListProps) {
  const limited = Array.isArray(auctionSoonItemList)
    ? auctionSoonItemList.slice(0, 3)
    : [];

  return (
    <div className="flex justify-center gap-6">
      {limited.map((item) => (
        <AuctionSoonList key={item.auctionId} {...item} />
      ))}
    </div>
  );
}

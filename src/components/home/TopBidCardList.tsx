"use client";

import { useEffect, useState } from "react";
import TopBidCard from "./TopBidCard";
import { TopBidItem } from "@/lib/api/home";

interface TopBidCard {
  topBidCardList: TopBidItem[];
}

export default function TopBidCardList({ topBidCardList }: TopBidCard) {
  return (
    <div className="flex gap-4">
      {topBidCardList.map((item) => (
        <TopBidCard key={item.auctionId} {...item} />
      ))}
    </div>
  );
}

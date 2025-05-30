"use client";

import { useEffect, useState } from "react";
import TopBidCard from "./TopBidCard";
import { fetchTopBidItems, TopBidItem } from "@/lib/api/home";

export default function TopBidCardList() {
  const [items, setItems] = useState<TopBidItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTopBidItems();
        setItems(data);
      } catch (err) {
        console.error("TOP 5 낙찰가 경매 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="flex gap-4">
      {items.map((item) => (
        <TopBidCard key={item.auctionId} {...item} />
      ))}
    </div>
  );
}

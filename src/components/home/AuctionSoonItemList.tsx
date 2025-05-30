// components/home/AuctionSoonItemList.tsx
"use client";

import { useEffect, useState } from "react";
import {
  fetchAuctionSoonItems,
  AuctionSoonItem as AuctionSoonItemType,
} from "@/lib/api/home";
import AuctionSoonItem from "./AuctionSoonList";

export default function AuctionSoonItemList() {
  const [items, setItems] = useState<AuctionSoonItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAuctionSoonItems();
        setItems(data);
      } catch (err) {
        console.error("경매 임박 상품 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const limited = Array.isArray(items) ? items.slice(0, 3) : [];

  return (
    <div className="flex justify-center gap-6">
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        limited.map((item) => (
          <AuctionSoonItem key={item.auctionId} {...item} />
        ))
      )}
    </div>
  );
}

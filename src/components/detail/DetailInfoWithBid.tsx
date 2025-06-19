"use client";

import AuctionInfoWithBidInteraction from "@/components/detail/AuctionInfoWithBidInteraction";
import BidHistory from "@/components/detail/Bid/BidHistory";
import { Product, AuctionBidData } from "@/types/productData";
import { useState } from "react";

interface DetailInfoWithBidProps {
  initialBidData: AuctionBidData;
  product: Product;
  isLoggedIn: boolean;
}

export default function DetailInfoWithBid({
  initialBidData,
  product,
  isLoggedIn,
}: DetailInfoWithBidProps) { 
  const [bidData, setBidData] = useState<AuctionBidData>(initialBidData);

  return (
    <>
      <AuctionInfoWithBidInteraction
        initialBidData={initialBidData}
        product={product}
        isLoggedIn={isLoggedIn}
        bidData={bidData}
        setBidData={setBidData}
      />
      <BidHistory
        bidData={bidData.bids}
        cancelData={bidData.cancelledBids}
      />
    </>
  );
}

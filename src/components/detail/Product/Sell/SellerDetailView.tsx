'use client';

import ImageSlider from "@/components/detail/ImageSlider";
import SellerProductInfo from "@/components/detail/Product/Sell/SellerProductInfo";
import GoodsInfo from "@/components/detail/Product/GoodsInfo";
import RelatedItemCard from "../RelatedItemCard";
import BidHistory from "@/components/detail/Bid/BidHistory";
import { AuctionBidData, Product, RelatedItem } from "@/types/productData";
import { useEffect, useState } from "react";

import { getBidData,getProductData, getRelatedItem } from "@/lib/api/auction";

export default function SellerDetailView({ itemId }: { itemId: number }) {
  const [bidData, setBidData] = useState<AuctionBidData>({
    bids: [],
    cancelledBids: [],
    totalBid: 0,
    auctionId: 1,
    totalBidder: 0,
  });
  const [productData, setProductData] = useState<Product>();
  const [relatedItem,setRelatedItem] = useState<RelatedItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [bid, product] = await Promise.all([
        getBidData(itemId),
        getProductData(itemId),
      ]);

      if (bid) setBidData(bid);
      if (product) setProductData(product);
    };

    fetchData();
  }, [itemId]);
  
  useEffect(() => {
      if(!itemId) return;
      const fetchRelated = async () => {
        try {
          const data = await getRelatedItem(itemId);
          setRelatedItem(data);
        } catch (error) {
          console.error('Failed to fetch related auctions:', error as Error);
          throw error;
        }
      };
  
      fetchRelated();
    }, [itemId]);

  if (!productData || !bidData) return <div>로딩 중...</div>;

  return (
    <>
      <div className="flex justify-between p-5">
        <div className="flex-1 mr-5">
          <ImageSlider images={productData.images} />
          <GoodsInfo
            description={productData.description}
            itemCondition={productData.itemCondition}
          />
        </div>
        <div className="flex-1 max-w-[620px]">
          <div className="mb-4">
            <SellerProductInfo
              product={productData}
              auctionBidData={bidData}
            />
          </div>

          <div className="mb-4">
            <BidHistory
              bidData={bidData.bids}
              cancelData={bidData.cancelledBids}
            />
          </div>
        </div>
      </div>

      <hr />

      <div style={{ padding: '20px' }}>
        <h2 className="pl-4 mb-2 text-xl font-bold">관련 상품</h2>
          <div className="flex gap-6 pl-4 overflow-x-auto scrollbar-hide">
            {relatedItem.length > 0 ? (
              relatedItem.map(item => (
                <div key={item.auctionId} className="min-w-[231px]">
                  <RelatedItemCard product={item} />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 pl-4">관련 상품이 없습니다.</p>
                )}
          </div>
      </div>
    </>
  );
}

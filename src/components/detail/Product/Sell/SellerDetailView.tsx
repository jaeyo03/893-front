'use client';

import ImageSlider from "@/components/detail/ImageSlider";
import SellerProductInfo from "@/components/detail/Product/Sell/SellerProductInfo";
import GoodsInfo from "@/components/detail/Product/GoodsInfo";
import RelatedItemCard from "../RelatedItemCard";
import BidHistory from "@/components/detail/Bid/BidHistory";
import { AuctionBidData, Product, RelatedItem, Bid } from "@/types/productData";
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

    useEffect(() => {
      if (!itemId) return;
    
      const eventSource = new EventSource(`http://localhost:8080/api/auctions/${itemId}/stream`,
        {withCredentials:true}
      );
  
      eventSource.addEventListener('connect', (event) => {
        console.log('SSE connected:', event.data);
      });
      
      eventSource.addEventListener('bid-update', (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'NEW_BID') {
            updateBidData(data.bid);
          } else if (data.type === 'CANCEL_BID') {
            removeBidData(data.bidId);
          }
        } catch (error) {
          console.error('SSE message parse error:', error);
        }
      });
      
      eventSource.onerror = (err) => {
        console.error('SSE error:', err);
        eventSource.close();
      };
      
    }, [itemId]);
    
  
    const updateBidData = (newBid: Bid) => {
      setBidData(prev => {
        const updatedBids = [newBid, ...prev.bids];
        return { ...prev, bids: updatedBids, totalBid: updatedBids.length };
      });
    };
  
    const removeBidData = (bidId: number) => {
      setBidData(prev => {
        const bidToCancel = prev.bids.find(bid => bid.bidId === bidId);
        if (!bidToCancel) return prev;
    
        const updatedBids = prev.bids.filter(bid => bid.bidId !== bidId);
        const updatedCancelledBids = [bidToCancel, ...(prev.cancelledBids || [])];
    
        return {
          ...prev,
          bids: updatedBids,
          cancelledBids: updatedCancelledBids,
          totalBid: updatedBids.length,
        };
      });
    };
    
  if (!productData || !bidData) return <div>로딩 중...</div>;

  return (
    <>
      <div className="flex justify-between p-5">
        <div className="flex-1 mr-5">
          <ImageSlider images={productData.images} product={productData}/>
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

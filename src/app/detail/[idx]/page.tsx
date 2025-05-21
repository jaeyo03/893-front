'use client';

import ImageSlider from "@/components/detail/ImageSlider";
import GoodsInfo from "@/components/detail/Product/GoodsInfo";
import RelatedItemCard from "@/components/detail/Product/RelatedItemCard";
import BidHistory from "@/components/detail/Bid/BidHistory";
import ProductInfo from "@/components/detail/Product/BUY/ProductInfo";
import SellerProductInfo from "@/components/detail/Product/Sell/SellerProductInfo";

import { Product, AuctionBidData, Bid, RelatedItem } from "@/types/productData";
import { useEffect, useState } from "react";
import { getBidData, getProductData, getRelatedItem } from "@/lib/api/auction";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { notFound, usePathname } from "next/navigation";

interface DetailPageProps {
  params: { idx: string };
}

export default function DetailPage({ params }: DetailPageProps) {
  const pathname = usePathname();
  const itemId = Number(params.idx);

  const [productData, setProductData] = useState<Product>();
  const [bidData, setBidData] = useState<AuctionBidData>({
    bids: [],
    cancelledBids: [],
    userBids: [],
    totalBid: 0,
    auctionId: 1,
    totalBidder: 0,
  });
  const [relatedItem, setRelatedItem] = useState<RelatedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bidResponse, productResponse] = await Promise.all([
          getBidData(itemId),
          getProductData(itemId),
        ]);

        if (!productResponse) {
          notFound();
        }

        setProductData(productResponse);
        if (bidResponse) setBidData(bidResponse);
      } catch (err) {
        console.error('Fetch error:', err);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pathname, itemId]);

  useEffect(() => {
    if (!itemId) return;

    const fetchRelated = async () => {
      try {
        const data = await getRelatedItem(itemId);
        setRelatedItem(data.data);
      } catch (error) {
        console.error('Failed to fetch related auctions:', error);
      }
    };

    fetchRelated();
  }, [itemId]);

  useEffect(() => {
    if (!itemId) return;

    const eventSource = new EventSource(
      `http://localhost:8080/api/auctions/${itemId}/stream`,
      { withCredentials: true }
    );

    eventSource.addEventListener('connect', (event) => {
      console.log('SSE connected:', event.data);
    });

    eventSource.addEventListener('bid-update', (event) => {
      try {
        const data = JSON.parse(event.data);
    
        // isCancelled 여부에 따라 분기 처리
        if (data.isCancelled) {
          removeBidData(data.bid.bidId);
        } else {
          updateBidDataFromSSE(data);
        }
      } catch (error) {
        console.error('SSE parse error:', error);
      }
    });
    

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
    };

    return () => {
      eventSource.close();
    };
  }, [pathname, itemId]);

  const updateBidDataFromSSE = (data: {
    bid: Bid;
    currentPrice: number;
    totalBid: number;
    totalBidder: number;
  }) => {
    const newBid = data.bid;
  
    setBidData(prev => {
      const existingBidIndex = prev.bids.findIndex(b => b.bidId === newBid.bidId);
      const updatedBids = existingBidIndex >= 0
        ? prev.bids
        : [newBid, ...prev.bids];
  
      return {
        ...prev,
        bids: updatedBids,
        totalBid: data.totalBid,
        totalBidder: data.totalBidder,
      };
    });
  
    setProductData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        currentPrice: data.currentPrice,
      };
    });
  };
  

  const updateBidData = (newBid: Bid) => {
    setBidData(prev => {
      const updatedBids = [newBid, ...prev.bids];
      return {
        ...prev,
        bids: updatedBids,
        totalBid: updatedBids.length,
      };
    });

    setProductData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        currentPrice: newBid.bidPrice,
      };
    });
  };

  const removeBidData = (bidId: number) => {
    setBidData(prev => {
      const bidToCancel = prev.bids.find(bid => bid.bidId === bidId);
      if (!bidToCancel) return prev;
  
      const updatedBids = prev.bids.filter(bid => bid.bidId !== bidId);
      const updatedCancelledBids = [bidToCancel, ...prev.cancelledBids];
      const newCurrentPrice = updatedBids.length > 0 ? updatedBids[0].bidPrice : 0;
  
      setProductData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          currentPrice: newCurrentPrice,
        };
      });
  
      return {
        ...prev,
        bids: updatedBids,
        cancelledBids: updatedCancelledBids,
        totalBid: updatedBids.length,
      };
    });
  };
  

  if (isLoading) return <LoadingSpinner />;
  if (!productData || !bidData) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-between p-5">
        <div className="flex-1 mr-5">
          <ImageSlider key={productData.auctionId} images={productData.images} product={productData} />
          <GoodsInfo
            description={productData.description}
            itemCondition={productData.itemCondition}
          />
        </div>
        <div className="flex-1 max-w-[620px]">
          <div className="mb-4">
            {productData.isSeller ? (
              <SellerProductInfo
                product={productData}
                auctionBidData={bidData}
              />
            ) : (
              <ProductInfo
                product={productData}
                auctionBidData={bidData}
                updateBidData={updateBidData}
                removeBidData={removeBidData}
              />
            )}
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

      <div className="p-5">
        <h2 className="pl-4 mb-2 text-xl font-bold">관련 상품</h2>
        <div className="flex gap-6 pl-4 overflow-x-auto scrollbar-hide">
          {Array.isArray(relatedItem) && relatedItem.length > 0 ? (
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

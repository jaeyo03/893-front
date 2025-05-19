'use client';

import ImageSlider from "@/components/detail/ImageSlider";
import ProductInfo from "@/components/detail/Product/BUY/ProductInfo";
import GoodsInfo from "@/components/detail/Product/GoodsInfo";
import RelatedItemCard from "@/components/detail/Product/RelatedItemCard";
import BidHistory from "@/components/detail/Bid/BidHistory";
import { Product, AuctionBidData, Bid,RelatedItem } from "@/types/productData";
import { useEffect, useState } from "react";
import { getBidData, getProductData,getRelatedItem } from "@/lib/api/auction";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { notFound } from "next/navigation";


interface DetailPageProps {
  params: { idx: number };
}

export default function BuyerDetailPage({ params }: DetailPageProps) {
  const itemId = params.idx;
  const [bidData, setBidData] = useState<AuctionBidData>({
    bids: [],
    cancelledBids: [],
    totalBid: 0,
    auctionId: 1,
    totalBidder: 0,
  });
  const [productData, setProductData] = useState<Product>();
  const [relatedItem,setRelatedItem] = useState<RelatedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bidResponse, productResponse] = await Promise.all([
          getBidData(itemId),
          getProductData(itemId),
        ]);
        
        if (!productResponse?.data) {
          notFound(); // ✅ 존재하지 않는 상품이면 404 페이지로
        }

        setProductData(productResponse.data);
        if (bidResponse?.data) setBidData(bidResponse.data);
      } catch (err) {
        console.error('Fetch error:', err);
        notFound();
      } finally {
        setIsLoading(false); // ✅ 로딩 끝
      }
    };

    fetchData();
  }, [itemId]);

  useEffect(() => {
    if(!itemId) return;
    const fetchRelated = async () => {
      try {
        const data = await getRelatedItem(itemId);
        setRelatedItem(data.data);
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
  

  if (isLoading) return <LoadingSpinner/>;
  if (!productData || !bidData) {
    notFound(); // ✅ 서버에서 비정상 상태일 경우 예외 처리
  }

  // 입찰 내역을 업데이트하는 함수
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
      const updatedCancelledBids = [bidToCancel, ...(prev.cancelledBids || [])]; // ✅ 안전 처리
  
      return {
        ...prev,
        bids: updatedBids,
        cancelledBids: updatedCancelledBids,
        totalBid: updatedBids.length,
      };
    });
  };

  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <ImageSlider images={productData.images} product={productData}/>
          <GoodsInfo
            description={productData.description}
            itemCondition={productData.itemCondition}
          />
        </div>
        <div style={{ flex: 1, maxWidth: '620px' }}>
          <div className="mb-4">
            <ProductInfo
              product={productData}
              auctionBidData={bidData}
              updateBidData={updateBidData} // 입찰 내역 업데이트 함수 전달
              removeBidData={removeBidData}
            />
          </div>
          <div className="mb-4">
            <BidHistory bidData={bidData.bids} cancelData={bidData.cancelledBids} />
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

function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

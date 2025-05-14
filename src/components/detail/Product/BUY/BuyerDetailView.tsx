'use client'
import ImageSlider from "@/components/detail/ImageSlider";
import ProductInfo from "@/components/detail/Product/BUY/ProductInfo";
import GoodsInfo from "@/components/detail/Product/GoodsInfo"
import ProductCard from "@/components/detail/Product/ProductCard";
import BidHistory from "@/components/detail/Bid/BidHistory";
import { Product,AuctionBidData } from "@/types/productData";
import { useEffect, useState } from "react";

import { fetchBidData, fetchProductData } from "@/lib/api/auction";
import { dummyProduct } from "@/data/dummyProductData";
import dummyBidData from "@/data/dummyBidData.json"

export default function BuyerDetailView({ itemId } : {itemId : number}) {
  const [bidData, setBidData] = useState<AuctionBidData>(dummyBidData);
  const [productData, setProductData] = useState<Product>(dummyProduct);
  
  useEffect(() => {
      const fetchData = async () => {
        const [bid, product] = await Promise.all([
          fetchBidData(itemId),
          fetchProductData(itemId),
        ]);
  
        if (bid) setBidData(bid);
        if (product) setProductData(product);
      };
  
      fetchData();
    }, [itemId]);

  if (!productData || !bidData) return <div>로딩 중...</div>;

  return(
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <ImageSlider images={productData.images} />
        <GoodsInfo 
          description={productData.description} 
          itemCondition={productData.itemCondition} />
      </div>
        <div style={{ flex: 1, maxWidth: '620px' }}>
          <div className="mb-4">
            <ProductInfo 
              product={productData}
              auctionBidData={bidData}/>
          </div>
          
          {/* BidHistory에 마진 추가 */}
          <div className="mb-4">
            <BidHistory bidData={bidData.bids} cancelData={bidData.cancelledBids} />
          </div>
        </div>

    </div>
      <hr/>
        <div style={{padding: '20px'}}>
        <h2 className="pl-4 mb-2 text-xl font-bold">관련 상품</h2>
          <div className="flex gap-6 pl-4 overflow-x-auto scrollbar-hide">
              <div className="min-w-[231px]">
                <ProductCard product={productData}/>
              </div>
        </div>
    </div>
    </>
    );
}
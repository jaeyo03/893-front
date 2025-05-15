'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ProductBidCard from "./ProductBidCard";
import ProductPurchasedCard from "./ProductParchaseCard";
import SellerProductBidCard from "./SellProductBidCard";

export default function MyTabs() {
  const [selectedTab, setSelectedTab] = useState("bids");

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
      <div className="flex flex-col">
        {/* TabsList - 탭의 리스트 정의 */}
        <TabsList className="flex space-x-4 border-b pb-2 mb-4">
          <TabsTrigger
            value="bids"
            className={`text-sm font-medium transition-all duration-200 ease-in-out ${selectedTab === "bids" ? "text-main border-b-2 border-main" : "hover:border-b-2 hover:border-main hover:text-main"}`}
          >
            내 입찰
          </TabsTrigger>
          <TabsTrigger
            value="auctions"
            className={`text-sm font-medium transition-all duration-200 ease-in-out ${selectedTab === "auctions" ? "text-main border-b-2 border-main" : "hover:border-b-2 hover:border-main hover:text-main"}`}
          >
            내 경매
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className={`text-sm font-medium transition-all duration-200 ease-in-out ${selectedTab === "favorites" ? "text-main border-b-2 border-main" : "hover:border-b-2 hover:border-main hover:text-main"}`}
          >
            찜한 상품
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className={`text-sm font-medium transition-all duration-200 ease-in-out ${selectedTab === "payments" ? "text-main border-b-2 border-main" : "hover:border-b-2 hover:border-main hover:text-main"}`}
          >
            결제 내역
          </TabsTrigger>
        </TabsList>

        {/* TabsContent - 탭의 내용 정의 */}
        <TabsContent value="bids" className="p-2">
          <ProductBidCard productId={1} />
        </TabsContent>
        <TabsContent value="auctions" className="p-2">
          <SellerProductBidCard productId={2}/>
        </TabsContent>
        <TabsContent value="favorites" className="p-2">
          <ProductBidCard productId={1}/>
        </TabsContent>
        <TabsContent value="payments" className="p-2">
          <ProductPurchasedCard />
        </TabsContent>
      </div>
    </Tabs>
  );
}

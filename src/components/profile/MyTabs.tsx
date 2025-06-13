'use client'

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import MyBidsProductCard from "./MyBidsProductCard";
import MyPaymentsProductCard from "./MyPaymentsProductCard";
import MyScrapsProductCard from "./MyScrapsProductCard";
import MyAuctionsProductCard from "./MyAuctionsProductCard";
import { getMyAuctionsProduct,getMyBidsProduct,getMyScrapsProduct,getMyPaymentsProduct } from '@/lib/api/user';
import { MyAuctionsProduct,MyBidProduct,MyPaymentsProduct,MyScrapsProduct } from '@/types/userData';

export default function MyTabs() {
  const [selectedTab, setSelectedTab] = useState("bids");
  const [auctions, setAuctions] = useState<MyAuctionsProduct[]>([]);
  const [bids, setBids] = useState<MyBidProduct[]>([]);
  const [scraps, setScraps] = useState<MyScrapsProduct[]>([]);
  const [payments,setPayments] = useState<MyPaymentsProduct[]>([]);
  
  useEffect(() => {
    if (selectedTab === 'bids' && bids.length === 0) {
      getMyBidsProduct()
        .then((data) => {
          setBids(Array.isArray(data) ? data : []);
        })
        .catch(console.error);
    }
    if (selectedTab === 'auctions' && auctions.length === 0) {
      getMyAuctionsProduct()
        .then((data) => {
          setAuctions(Array.isArray(data) ? data : []);
        })
        .catch(console.error);
    }
    if (selectedTab === 'scraps' && scraps.length === 0) {
      getMyScrapsProduct()
        .then((data) => {
          setScraps(Array.isArray(data) ? data : []);
        })
        .catch(console.error);
    }
    if (selectedTab === 'payments' && payments.length === 0) {
      getMyPaymentsProduct()
        .then((data) => {
          setPayments(Array.isArray(data) ? data : []);
        })
        .catch(console.error);
    }
  }, [selectedTab]);

  const handleDelete = (auctionId: number) => {
    setAuctions((prev) => prev.filter(item => item.auctionId !== auctionId));
  };

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
            value="scraps"
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
          {bids.map((bid, index) => (
            <MyBidsProductCard key={index + 'bids'} myBidProduct={bid} />
          ))}
        </TabsContent>
        <TabsContent value="auctions" className="p-2">
          {auctions.map((auction) => (
            <MyAuctionsProductCard 
              key={auction.auctionId + 'auctions'} 
              auctions={auction} 
              onDelete={handleDelete}/>
          ))}
        </TabsContent>
        <TabsContent value="scraps" className="p-2">
          {scraps.map((scrap) => (
            <MyScrapsProductCard key = { scrap.auctionId + 'scraps'} scrap={scrap} />
          ))}
        </TabsContent>
        <TabsContent value="payments" className="p-2">
          {payments.map((payment) => (
            <MyPaymentsProductCard key={payment.auctionId + 'payments'} payments={payment}/>
          ))}
        </TabsContent>
      </div>
    </Tabs>
  );
}

'use client'

import UserProfile from "@/components/profile/UserProfile"
import MyTabs from "@/components/profile/MyTabs"
import ProductBidCard from "@/components/profile/ProductBidCard"
import ProductPurchasedCard from "@/components/profile/ProductParchaseCard"
export default function MyPage(){
  return (
    <div className="max-w-4xl p-8 mx-auto">
          <h1 className="mb-8 text-xl font-bold">마이 페이지</h1>
          <div className="mb-4">
            <UserProfile/>
            <div className="mb-12"></div>
            <MyTabs/>
          </div>
        </div>
  )
}
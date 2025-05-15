'use client'

import { Card } from "@/components/ui/card";
import { MyPaymentsProduct } from "@/types/userData";
import { useRouter } from "next/router";

interface Props {
  key:number,
  payments: MyPaymentsProduct;
}


export default function MyPaymentsProductCard({ key,payments }: Props){
  const router = useRouter();

  const handleClick = () => {
    router.push(`/seller/detail/${payments.auctionId}`);
  };

  return(
    <div className="flex justify-center w-full">
      <Card 
        onClick={handleClick}
        className="p-4 mb-4 w-full h-[166px] border-2 border-checkbox">
        <div className="flex items-center h-full">
              <img src={`http://localhost:8080${payments.mainImageUrl}` || '/placeholder.jpg'} alt={payments.title} className="w-24 h-24 object-cover mr-4" />
              <div className="flex-1">
              <p className="font-bold text-[16px]">{payments.title}</p>
              <div className="flex justify-between text-[14px] mt-2">
                <span className="w-1/2">내 입찰가</span>
              </div>
              <div className="flex justify-between text-[16px]">
                <span className="w-1/2">{payments.finalPrice}</span>
              </div>
            <p className="text-xs mt-6">주문 번호: {payments.orderNumber}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}


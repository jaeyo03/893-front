import PaymentHeader from "@/components/payment/PaymentHead";
import ShippingInfo from "@/components/payment/ShippingInfo";
import FinalPaymentSummary from "@/components/payment/FinalPaymentSummary";
import {Checkout} from "@/components/payment/Checkout";
import { cookies } from "next/headers";
import { getUserOrderInfoForServer } from "@/lib/api/order";

export default async function Payment({ searchParams } : { searchParams : { [key: string]: string | string[] | undefined } }){
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const cookieHeader = accessToken ? `accessToken=${accessToken}` : '';
  const auctionId = searchParams.auctionId;

  const userOrderInfo = await getUserOrderInfoForServer(auctionId as string, cookieHeader);

  console.log(cookieHeader);
  console.log(userOrderInfo);
  return (
    <div className="max-w-2xl p-8 mx-auto">
      <div className="mb-4 grid items-center w-full gap-4">
        <PaymentHeader/>
        <ShippingInfo
        
        />
        {/*<PaymentMethodSelector/>*/}
        <FinalPaymentSummary productPrice={userOrderInfo.data?.finalPrice ?? 0} deliveryFee={2500}/>
        <Checkout
          finalPrice={userOrderInfo.data?.finalPrice ?? 5000}
          auctionId={auctionId as string}
        />
      </div>
    </div>
    );
}
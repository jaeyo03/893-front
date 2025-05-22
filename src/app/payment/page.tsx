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

  const userOrderData = await getUserOrderInfoForServer(auctionId as string, cookieHeader);

  console.log(cookieHeader);
  console.log(userOrderData);
  return (
    <div className="max-w-2xl p-8 mx-auto">
      <div className="mb-4 grid items-center w-full gap-4">
        <PaymentHeader/>
        <ShippingInfo
          name={userOrderData?.data?.deliveryAddress?.name ?? "알 수 없음"}
          addressLine1={userOrderData?.data?.deliveryAddress?.addressLine1 ?? "<UNK> <UNK>"}
          addressLine2={userOrderData?.data?.deliveryAddress?.addressLine2 ?? "<UNK> <UNK>"}
          phoneNumber={userOrderData?.data?.deliveryAddress?.phoneNumber ?? ""}
        />
        {/*<PaymentMethodSelector/>*/}
        <FinalPaymentSummary productPrice={userOrderData?.data?.itemPrice ?? 0} deliveryFee={userOrderData?.data?.deliveryFee ?? 0}/>
        <Checkout
          userOrderInfo={userOrderData?.data}
          auctionId={auctionId as string}
        />
      </div>
    </div>
    );
}
import PaymentHeader from "@/components/payment/PaymentHead";
import ShippingInfo from "@/components/payment/ShippingInfo";
import FinalPaymentSummary from "@/components/payment/FinalPaymentSummary";
import {Checkout} from "@/components/payment/Checkout";
import { cookies } from "next/headers";
import { getUserOrderInfoForServer } from "@/lib/api/order";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Payment({ searchParams } : { searchParams : { [key: string]: string | string[] | undefined } }){
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const cookieHeader = accessToken ? `accessToken=${accessToken}` : '';
  const auctionId = searchParams.auctionId;

  const userOrderData = await getUserOrderInfoForServer(auctionId as string, cookieHeader);

  const isErrorResponse = "type" in userOrderData;
  const isDataResponse = "data" in userOrderData;

  return (
    <div className="max-w-2xl p-8 mx-auto">
      <div className="mb-4 grid items-center w-full gap-4">
        <PaymentHeader/>
        {isErrorResponse && (
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-lg text-warningkeword font-bold">{userOrderData.title}</p>
            <p>{userOrderData.detail}</p>
            <Button className="bg-main text-white w-40 h-10 mt-8 hover:bg-main/80">
              <Link href="/">메인으로 돌아가기</Link>
            </Button>
          </div>
        )}

        {isDataResponse && userOrderData?.data?.deliveryAddress && (
          <>
            <ShippingInfo
              name={userOrderData?.data?.deliveryAddress?.name}
              addressLine1={userOrderData?.data?.deliveryAddress?.addressLine1}
              addressLine2={userOrderData?.data?.deliveryAddress?.addressLine2}
              phoneNumber={userOrderData?.data?.deliveryAddress?.phoneNumber}
            />
            <FinalPaymentSummary productPrice={userOrderData?.data?.itemPrice ?? 0} deliveryFee={userOrderData?.data?.deliveryFee ?? 0}/>
            <Checkout
              userOrderInfo={userOrderData?.data}
              auctionId={auctionId as string}
            />
          </>
        )}

        {isDataResponse && !userOrderData?.data?.deliveryAddress && (
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-lg text-warningkeword font-bold">배송지 정보가 없습니다!</p>
            <p>결제를 하기 위해서는 배송지 정보가 꼭 필요해요.</p>
            <Button className="bg-main text-white w-40 h-10 mt-8 hover:bg-main/80">
              <Link href="/profile">배송지 설정하러 가기</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
    );
}
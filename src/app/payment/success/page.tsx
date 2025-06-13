import CompletedState from "@/components/payment/CompletedState";
import { postPaymentConfirm } from "@/lib/api/order";
import { PaymentType } from "@/types/payment.types";
import { cookies } from "next/headers";

export default async function PaySuccessPage({ searchParams } : { searchParams : { [key: string]: string | string[] | undefined } }) {
  const paymentKey = searchParams.paymentKey as string;
  const orderId = searchParams.orderId as string;
  const amount = searchParams.amount as string;
  const paymentType = searchParams.paymentType as PaymentType;
  
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const cookieHeader = accessToken ? `accessToken=${accessToken}` : '';
  
  // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
  // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
  // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
  
  const response = await postPaymentConfirm({
    paymentKey,
    orderId,
    amount: Number(amount),
    paymentType,
  }, cookieHeader);

  const isErrorResponse = "type" in response;
  
  return (
    <div className="mt-10">
      {isErrorResponse && (
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-lg text-warningkeword font-bold">{response.title}</p>
          <p>{response.detail}</p>
        </div>
      )}

      {!isErrorResponse && response?.data && (
        <CompletedState paymentData={response?.data} />
      )}
    </div>
  );
}
import PaySuccess from "@/components/payment/PaySuccess";
import QueryProvider from "@/components/QueryProvider";
import { PaymentMethod } from "@/types/payment.types";

export default function PaySuccessPage({ searchParams } : { searchParams : { [key: string]: string | string[] | undefined } }) {
  const paymentKey = searchParams.paymentKey ?? "";
  const orderId = searchParams.orderId ?? "";
  const amount = searchParams.amount ?? "";
  const paymentMethod = searchParams.paymentType ?? "";
  const auctionId = searchParams.auctionId ?? "";
  
  return (
    <QueryProvider>
      <PaySuccess
        paymentKey={paymentKey as string}
        orderId={orderId as string}
        amount={amount as string}
        auctionId={auctionId as string}
        paymentMethod={paymentMethod as PaymentMethod}
      />
    </QueryProvider>
  );
}
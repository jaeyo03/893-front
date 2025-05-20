import PaySuccess from "@/components/payment/PaySuccess";
import QueryProvider from "@/components/QueryProvider";
import { PaymentType } from "@/types/payment.types";

export default function PaySuccessPage({ searchParams } : { searchParams : { [key: string]: string | string[] | undefined } }) {
  const paymentKey = searchParams.paymentKey ?? "";
  const orderId = searchParams.orderId ?? "";
  const amount = searchParams.amount ?? "";
  const paymentType = searchParams.paymentType ?? "";
  
  return (
    <QueryProvider>
      <PaySuccess
        paymentKey={paymentKey as string}
        orderId={orderId as string}
        amount={amount as string}
        paymentType={paymentType as PaymentType}
      />
    </QueryProvider>
  );
}
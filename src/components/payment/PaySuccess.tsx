"use client";

import { useEffect, useRef } from "react";
import LoadingState from "@/components/payment/LoadingState";
import CompletedState from "@/components/payment/CompletedState";
import { PaymentType } from "@/types/payment.types";
import { postPaymentConfirm } from "@/lib/api/order";
import { useMutation } from "@tanstack/react-query";

interface PaySuccessProps {
  paymentKey: string;
  orderId: string;
  amount: string;
  paymentType: PaymentType;
}

export default function PaySuccess({ paymentKey, orderId, amount, paymentType } : PaySuccessProps) {
  const hasCalledApi = useRef(false);

  // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
  // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
  // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
  
  const { mutate: confirmPayment, data: paymentResponse, isSuccess, isPending, isError } = useMutation({
    mutationFn: () => postPaymentConfirm({
      paymentKey : paymentKey || "",
      orderId : orderId || "",
      amount : Number(amount) || 0,
      paymentType : paymentType || "NORMAL",
    }),
    onSuccess: (data) => {
      console.log('Payment response:', data);
    },
    onError: (error) => {
      console.error('Payment error:', error);
    }
  });

  useEffect(() => {
    if (!hasCalledApi.current) {
      confirmPayment();
      hasCalledApi.current = true;
    }
  }, [confirmPayment]);

  return (
    <div className="mt-10">
      {isPending && <LoadingState />}

      {isSuccess && paymentResponse?.data && (
        <CompletedState paymentData={paymentResponse?.data} />
      )}

      {isError && <div>에러 발생</div>}
    </div>
  );
}
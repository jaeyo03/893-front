"use client";

import { useEffect, useState } from "react";
import LoadingState from "@/components/payment/LoadingState";
import CompletedState from "@/components/payment/CompletedState";
import { PaymentResponse } from "@/types/response.types";
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
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  console.log(paymentKey, orderId, amount, paymentType);

  // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
  // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
  // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8

  
  const { mutate: confirmPayment, data: paymentResponse } = useMutation({
    mutationFn: () => postPaymentConfirm({
      paymentKey : paymentKey || "",
      orderId : orderId || "",
      amount : Number(amount) || 0,
      paymentType : paymentType || "NORMAL",
    }),
    onSuccess: (data) => {
      console.log('Payment response:', data);
      setTimeout(() => {
        setIsConfirmed(true);
      }, 2000);
    },
    onError: (error) => {
      console.error('Payment error:', error);
      setIsConfirmed(false);
    }
  });
  
  useEffect(() => {
    confirmPayment();
  }, [confirmPayment]);
  
  const mockPaymentResponse: PaymentResponse = {
    orderId: "ORD20250515123456",
    orderName: "테스트 상품 결제",
    successUrl: "https://example.com/payment/success",
    failUrl: "https://example.com/payment/fail",
    customerEmail: "hong.gildong@example.com",
    customerName: "홍길동",
    customerMobilePhone: "010-1234-5678",
    finalPrice: 25000,
  };

  return (
    <div className="mt-10">
      {isConfirmed ? (
        // TODO 추후 payment 응답 연결
        <CompletedState paymentData={paymentResponse?.data || mockPaymentResponse} />
      ) : (
        <LoadingState />
      )}
    </div>
  );
}
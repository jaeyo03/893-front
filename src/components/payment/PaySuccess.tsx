"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingState from "@/components/payment/LoadingState";
import CompletedState from "@/components/payment/CompletedState";
import { PaymentResponse } from "@/types/response.types";
import { PaymentMethod } from "@/types/payment.types";
import { getUserOrderInfoForClient } from "@/lib/api/order";
import { useMutation } from "@tanstack/react-query";
import { postPaymentInfo } from "@/lib/api/order";

interface PaySuccessProps {
  paymentKey: string;
  orderId: string;
  amount: string;
  auctionId: string;
  paymentMethod: PaymentMethod;
}

export default function PaySuccess({ paymentKey, orderId, amount, auctionId, paymentMethod } : PaySuccessProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  console.log(paymentKey, orderId, amount, paymentMethod, auctionId);

  // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
  // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
  // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8

  const { data: userOrderInfo, isSuccess: isUserOrderInfoSuccess } = useQuery({
    queryKey: ['userOrderInfo', paymentKey, orderId, amount],
    queryFn: () => getUserOrderInfoForClient(auctionId as string),
  });
  
  const { mutate: confirmPayment, data: paymentResponse } = useMutation({
    mutationFn: () => postPaymentInfo(auctionId as string, {
      recipientName : userOrderInfo?.data?.deliveryAddress.name || "",
      phoneNumber : userOrderInfo?.data?.deliveryAddress.phoneNumber || "",
      addressLine1 : userOrderInfo?.data?.deliveryAddress.addressLine1 || "",
      zipCode : userOrderInfo?.data?.deliveryAddress.zipCode || "",
      paymentMethod : userOrderInfo?.data?.paymentMethod as PaymentMethod || "NORMAL",
      orderId : userOrderInfo?.data?.orderId || "",
      paymentKey : paymentKey || "",
      finalPrice : Number(amount) || 0,
      successUrl : "https://example.com/payment/success",
      failUrl : "https://example.com/payment/fail",
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
  
  // userOrderInfo 조회가 성공하면 자동으로 결제 확인 요청
  useEffect(() => {
    if (isUserOrderInfoSuccess && userOrderInfo) {
      confirmPayment();
    }
  }, [isUserOrderInfoSuccess, userOrderInfo, confirmPayment]);
  
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
        <CompletedState paymentData={paymentResponse?.data || mockPaymentResponse} />
      ) : (
        <LoadingState />
      )}
    </div>
  );
}
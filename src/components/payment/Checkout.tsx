"use client"

import { useEffect, useState } from "react";
import {loadTossPayments, ANONYMOUS, TossPaymentsWidgets} from "@tosspayments/tosspayments-sdk";
import { OrderResponse } from "@/types/response.types";
import {postPaymentInfo} from "@/lib/api/order";
import {TossPaymentRequest} from "@/types/payment.types";
import toast from "react-hot-toast";

interface CheckoutPageProps {
  auctionId : string;
  userOrderInfo : OrderResponse | null;
}

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function Checkout({ auctionId, userOrderInfo } : CheckoutPageProps) {
  const [, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const finalPrice = userOrderInfo?.finalPrice ?? 0;
  const amount = {
    currency: "KRW",
    value: finalPrice, // TODO 추후 예외처리 필요
  };
  
  console.log(userOrderInfo);

  const finalPaymentInfo : TossPaymentRequest = {
    recipientName: userOrderInfo?.customerName ?? "",
    phoneNumber: userOrderInfo?.deliveryAddress?.phoneNumber ?? "",
    addressLine1: userOrderInfo?.deliveryAddress?.addressLine1 ?? "",
    addressLine2: userOrderInfo?.deliveryAddress?.addressLine2 ?? "",
    zipCode: userOrderInfo?.deliveryAddress?.zipCode ?? "",
    itemPrice: userOrderInfo?.itemPrice ?? 0,
    deliveryFee: userOrderInfo?.deliveryFee ?? 0,
    finalPrice: finalPrice,
    successUrl: "http://localhost:3000/payment/success",
    failUrl: "http://localhost:3000/payment/fail"  
  }


  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      /**
       * 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
       * renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
       * @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
       */
      await widgets.setAmount(amount);

      await Promise.all([
        /**
         * 결제창을 렌더링합니다.
         * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
         */
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          // 렌더링하고 싶은 결제 UI의 variantKey
          // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
          // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
          variantKey: "DEFAULT",
        }),
        /**
         * 약관을 렌더링합니다.
         * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
         */
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);


  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button
            className="btn primary w-100"
            onClick={async () => {
              try {
                /**
                 * 결제 요청
                 * 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                 * 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                 * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
                 */
                const response = await postPaymentInfo(auctionId, finalPaymentInfo);
                console.log(response);
                const orderId = response?.data?.orderId;
                const orderName = response?.data?.orderName;
                const customerName = response?.data?.customerName;
                const customerEmail = response?.data?.customerEmail;

                if (!orderId || !orderName || !customerName || !customerEmail) {
                  toast.error("결제 정보를 가져오는데 실패했습니다.");
                  return;
                }

                await widgets?.requestPayment({
                  orderId: orderId,
                  orderName: orderName,
                  customerName: customerName,
                  customerEmail: customerEmail,
                  successUrl: `http://localhost:3000/payment/success?auctionId=${auctionId}`,
                  failUrl: "http://localhost:3000/payment/fail"
                });
              } catch (error) {
                // TODO: 에러 처리
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
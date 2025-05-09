'use client'
import PaymentHeader from "@/components/payment/PaymentHead";

export default function Payment(){

  return (
      <div className="max-w-2xl p-8 mx-auto">
        <h1 className="mb-4 text-xl font-bold">결제 페이지</h1>
        <div className="mb-4">
          <h1 className="mb-2 text-lg font-semibold">테스트</h1>
          <PaymentHeader/>
          {/* <ShippingInfo/> */}
          {/* <PaymentMethodSelector/> */}
          {/* <FinalPaymentSummary productPrice={3900} deliveryFee={2500}/> */}
        </div>
      </div>
    );

}
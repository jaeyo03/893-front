'use client'

interface FinalPaymentSummaryProps {
  productPrice: number; // 상품 가격
  deliveryFee?: number; // 배송비 (기본값: 0)
}

export default function FinalPaymentSummary({
    productPrice,
    deliveryFee = 0,
  }: FinalPaymentSummaryProps) {
  const totalPrice = productPrice + deliveryFee;

  return (
    <div className="border-[2px] border-blue-500 rounded-lg p-5 space-y-5 text-sm bg-white">
      {/* Title Section */}
      <div>
        <h2 className="text-base font-semibold mb-2">최종 결제 금액</h2>
        <div className="flex justify-between mb-1">
          <span className="text-gray-700">총 상품 가격</span>
          <span className="text-gray-900 font-medium">{productPrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">배송비</span>
          <span className="text-gray-900 font-medium">{deliveryFee.toLocaleString()}원</span>
        </div>
      </div>

      <p className="text-gray-400 text-xs">5만원 이상 구매 시 배송비 무료</p>

      {/* Divider */}
      <hr className="border-t border-gray-200" />

      {/* Total Section */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-base">총 결제 금액</span>
        <span className="text-xl font-bold text-gray-900">{totalPrice.toLocaleString()}원</span>
      </div>
    </div>
  );
}

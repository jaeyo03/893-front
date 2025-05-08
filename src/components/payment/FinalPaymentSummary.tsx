

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
    <div className="border-[2px] border-blue-500 rounded-lg p-5 space-y-5 text-sm bg-white max-w-sm">
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

      {/* Divider */}
      <hr className="border-t border-gray-200" />

      {/* Total Section */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-base">총 결제 금액</span>
        <span className="text-xl font-bold text-gray-900">{totalPrice.toLocaleString()}원</span>
      </div>

      {/* 개인정보 동의 안내 */}
      <div className="text-gray-800">
        <div className="flex justify-between items-center mb-1">
          <span>개인정보 제3자 제공 동의</span>
          <button className="text-sm text-gray-500 underline">보기</button>
        </div>
        <p className="text-xs text-gray-500 leading-snug">
          * 개별 판매자가 등록한 마켓플레이스(오픈마켓) 상품에 대한 광고, 상품주문, 배송 및 환불의 의무와 책임은 각 판매자가 부담하고, 이에 대하여 쿠팡은 통신판매중개자로서 통신판매의 당사자가 아니므로 일체 책임을 지지 않습니다.
        </p>
      </div>

      {/* Footer 문장 */}
      <p className="text-xs text-gray-600 leading-relaxed">
        위 주문 내용을 확인하였으며, 회원 본인은 개인정보 이용 및 제공(해외직구의 경우 국외제공) 및 결제에 동의합니다.
      </p>

      {/* 결제 버튼 */}
      <button className="w-full py-3 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition">
        결제하기
      </button>
    </div>
  );
}

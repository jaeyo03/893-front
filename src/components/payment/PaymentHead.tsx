export default function PaymentHeader() {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center">
        {/* 왼쪽: 제목 */}
        <h1 className="text-2xl font-bold">주문/결제</h1>

        {/* 오른쪽: 단계 표시 */}
        <div className="text-sm space-x-1">
          <span className="text-blue-600 font-semibold">주문결제</span>
          <span className="text-gray-400">{`>`}</span>
          <span className="text-gray-400">주문완료</span>
        </div>
      </div>

      {/* 하단 회색 실선 */}
      <div className="mt-2 border-b-2 border-gray-400" />
    </div>
  );
}

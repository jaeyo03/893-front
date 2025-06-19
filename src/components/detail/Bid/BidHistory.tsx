import { Bid } from "@/types/productData";

interface BidHistoryProps {
  bidData: Bid[];
  cancelData: Bid[];
}

export default function BidHistory({ bidData, cancelData }: BidHistoryProps) {
  const renderTable = (data: Bid[], title: string, isCancelled: boolean) => (
    <div className="mb-6">
      <h2
        className={`pr-4 mb-2 pt-1 pb-1 text-lg text-end font-semibold tracking-wide rounded-[3px] ${
          isCancelled ? 'text-rose-500' : ''
        }`}
      >
        {title}
      </h2>
      <div className="max-h-64 min-h-[160px] overflow-y-auto border rounded-md">
        <table className="w-full text-sm text-center table-fixed">
          <thead className="text-gray-600 border-b sticky top-0 bg-white z-10">
            <tr>
              <th className="w-[10%] px-1 py-2 font-semibold tracking-wide">순위</th>
              <th className="w-[40%] px-1 py-2 font-semibold tracking-wide">입찰자</th>
              <th className="w-[20%] px-1 py-2 font-semibold tracking-wide">입찰가</th>
              <th className="w-[30%] px-1 py-2 font-semibold tracking-wide">시간</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-1 py-2">{idx + 1}</td>
                  <td className="px-1 py-2 truncate">{item.bidderEmail}</td>
                  <td className="px-1 py-2">₩{item.bidPrice.toLocaleString()}</td>
                  <td className="px-1 py-2">{item.createdAt.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-gray-400 text-center">
                  입찰 데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-[620px] p-4 mx-auto border rounded-lg shadow-sm">
      {renderTable(bidData, "입찰 내역", false)}
      {renderTable(cancelData, "입찰 취소", true)}
    </div>
  );
}

export default function BidHistory() {
  const bidData = [
    //더미
    { rank: 1, email: '홍길동', amount: 30000, time: '12:35:12' },
    { rank: 2, email: '이몽룡', amount: 28000, time: '12:30:44' },
    { rank: 3, email: '성춘향', amount: 25000, time: '12:20:15' },
  ];

  const cancelData = [
    { rank: 1, email: '변학도', amount: 27000, time: '12:10:03' },
  ];

  const renderTable = (data: typeof bidData) => (
    <table className="w-full mt-2 text-sm text-center border-t">
      <thead className="text-gray-600 border-b">
        <tr>
          <th className="px-1 py-2">순위</th>
          <th className="px-1 py-2">이메일</th>
          <th className="px-1 py-2">입찰가</th>
          <th className="px-1 py-2">시간</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="border-b">
            <td className="px-1 py-2">{item.rank}</td>
            <td className="px-1 py-2">{item.email}</td>
            <td className="px-1 py-2">₩{item.amount.toLocaleString()}</td>
            <td className="px-1 py-2">{item.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="max-w-md p-4 mx-auto border rounded-lg shadow-sm" style={{ maxWidth: '620px' }}>
      <h2 className="pr-4 mb-2 text-lg text-end bg-detailbid"> 입찰 내역</h2>
      {renderTable(bidData)}

      <h2 className="pr-4 mt-6 mb-2 text-lg text-end bg-cancel"> 입찰 취소</h2>
      {renderTable(cancelData)}
    </div>
  );
}

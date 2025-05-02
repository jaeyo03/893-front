'use client';

import { useState } from 'react';

export default function ProductInfo() {
  const [bidAmount, setBidAmount] = useState(30000);
  const [isHighestBidder, setIsHighestBidder] = useState(true);

  return (
    <div className="p-2.5 mx-auto border rounded-lg shadow-md"
    style={{maxWidth:'620px'}}>
      <div className="mb-4">
        <h1 className="text-xl font-bold">경매 제목</h1>
        <p className="text-gray-600">👤 판매자 e-mail</p>
      </div>


      <div className="p-4 mb-4 border border-blue-400 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-black">현재가</p>
            <p className="text-xl font-bold text-main">₩30,000</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-black">남은 시간</p>
            <p className="flex items-center gap-1 text-xl font-bold text-blue-600">
              ⏰ 12:38:45
            </p>
          </div>
        </div>

        <div className="flex justify-between mb-2">
          <div>
            <p className="text-sm text-gray-600">입찰 수</p>
            <p className="text-lg font-bold">4회</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">입찰자 수</p>
            <p className="text-lg font-bold">2명</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-gray-500">₩</span>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="w-full px-2 py-1 border rounded"
            min={30100}
          />
          <button className="w-[72px] h-[32px] text-sm text-white bg-main rounded hover:bg-blue-700">
            입찰하기
          </button>
        </div>
        <p className="mt-1 text-xs text-red">※ 최소 입찰 단위 100원</p>
      </div>

      {isHighestBidder && (
        <div className="flex items-center justify-between p-3 text-yellow-800 bg-yellow-100 rounded-lg">
          <div>
            <p className="font-medium">현재 최고 입찰자입니다.</p>
            <p className="text-sm">입찰 취소 가능 시간: 5:00</p>
          </div>
          <button className="px-3 py-1 text-yellow-600 border border-yellow-600 rounded hover:bg-yellow-200">
            취소하기
          </button>
        </div>
      )}
    </div>
  );
}

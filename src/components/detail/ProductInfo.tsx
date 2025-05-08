'use client';

import { count } from 'console';
import { useState } from 'react';
import { User,Bookmark,BookmarkCheck } from 'lucide-react';

export default function ProductInfo() {
  const [bidAmount, setBidAmount] = useState< number | string>(30000);
  const [isHighestBidder, setIsHighestBidder] = useState(false);
  const [isBookmarked,setIsBookmarked] = useState(false);
  const [bookmarkCount,setBookmarkCount] = useState(1);

  const handleBookmarkToggle = () =>{
    setIsBookmarked((prev) => !prev);
    setBookmarkCount((count)=>(isBookmarked ? count -1:count+1));
  }

  return (
    <div className="p-2.5 mx-auto border rounded-lg shadow-md"
    style={{maxWidth:'620px'}}>
      <div className="mb-4">
        <h1 className="text-xl font-bold">경매 제목</h1>
        <p className="text-gray-600">
          <User size={30}/> 판매자 e-mail</p>
      </div>


      <div className="p-4 mb-4 border border-blue-400 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-black">현재가</p>
            <p className="text-xl font-bold text-main">₩30,000</p>
          </div>
          <div className="w-1/2">
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
          <div className='w-1/2'>
            <p className="text-sm text-gray-600">입찰자 수</p>
            <p className="text-lg font-bold">2명</p>
          </div>
        </div>

        
        <div className="flex items-center gap-1 text-gray-700">
          <button onClick={handleBookmarkToggle}>
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-blue-600" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-600" />
              )}
            </button>
            <span className="text-sm">{bookmarkCount}</span>
        </div>
      
        <div className="flex items-center justify-between pt-3 my-3 border-t border-gray-300"></div>
          <div className="flex items-center justify-between mt-4 mb-1">
            <p className="font-medium text-black text-sl">입찰 금액 
              <span className="text-xs font-thin text-red">    ※ 최소 입찰 단위 100원</span>
            </p>
          </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-gray-500">₩</span>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => {
              const value = e.target.value
              if(value ===''){
                setBidAmount('');
              }else{
                setBidAmount(Number(value));
              }
            }}
            className="w-full px-2 py-1 text-right border rounded"
            />
          <button className="w-[72px] h-[32px] text-sm text-white bg-main rounded hover:bg-blue-700"
          onClick={()=>setIsHighestBidder(true)}>
            입찰하기
          </button>
        </div>
        <p className="mt-1 text-xs font-thin text-right text-red mr-[72px]">
          {(() => {
            if (typeof bidAmount !== 'number' || bidAmount <= 0) return '';

            const man = Math.floor(bidAmount / 10000);
            const chun = Math.floor((bidAmount % 10000) / 1000);
            const baek = bidAmount % 1000; 
            let result = '';
            if (man > 0) {
              result += `${man}만`;
            }
            if (chun > 0) {
              result += ` ${chun},`;
            }
            if (baek > 0) {
              result += `${baek}`;
            }
            return `${result}원`;
          })()}
        </p>
      

        {isHighestBidder && (
          <div className="flex items-center justify-between p-3 text-yellow-800 bg-yellow-100 rounded-lg">
            <div>
              <p className="font-medium">현재 최고 입찰자입니다.</p>
              <p className="text-sm">입찰 취소 가능 시간: 5:00</p>
            </div>
            <button className="px-3 py-1 text-yellow-600 border border-yellow-600 rounded hover:bg-yellow-200"
            onClick={()=> setIsHighestBidder(false)}>
              취소하기
            </button>
          </div>
          )}
      </div>
    </div>
  );
}
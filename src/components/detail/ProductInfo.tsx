'use client';

import { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';

export default function ProductInfo() {
  const [bidAmount, setBidAmount] = useState<number>(30000);
  const [isHighestBidder, setIsHighestBidder] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(30000);
  const [isBookmarked,setIsBookmarked] = useState(false);
  const [bookmarkCount,setBookmarkCount] = useState(1);
  const [cancelTimer,setCancelTimer] = useState(10);

  useEffect(()=>{
    let timer: NodeJS.Timeout | undefined;
    if(isHighestBidder &&cancelTimer >0){
      timer = setInterval(() => {
        setCancelTimer((prev) => prev - 1);
      }, 1000);
    }
    if (cancelTimer <= 0) {
      clearInterval(timer);
      setIsHighestBidder(false)
    }

    return () => clearInterval(timer);
  }, [isHighestBidder, cancelTimer]);

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(1, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };
  
  const handleBid =() => {
    if (bidAmount >= currentPrice + 100){
      setCurrentPrice(bidAmount);
      setIsHighestBidder(true);
      setCancelTimer(300);
    } 
    
  }

  const handleBookmarkToggle = () =>{
    setIsBookmarked((prev) => !prev);
    setBookmarkCount((count)=>(isBookmarked ? count -1:count+1));
  }

  return (
    <div className="pt-5">
      <div className="mx-auto "
      style={{maxWidth:'620px'}}>
        <div className="mb-4">
          <div className='flex items-center justify-between'>
            <h1 className="text-xl font-bold">경매 제목</h1>
            <p className="text-gray-600">👤 판매자 e-mail</p>
          </div>
          <p className='text-xs font-thin'>카테고리/카테고리중/카테고리소</p>
        </div>


        <div className="p-4 mb-4 border border-blue-400 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-black">현재가</p>
              <p className="text-xl font-bold text-main">₩{currentPrice.toLocaleString()}</p>
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
              <Bookmark
              className={`w-5 h-5 ${
                isBookmarked ? 'text-black fill-black'
                : 'text-gray-400 hover:text-black hover:fill-black'
              }`}
              />
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
              step={100}
              value={bidAmount !== 0 ? bidAmount : ''}
              onChange={(e) => {
                const value = e.target.value
                if (value ===''){
                  setBidAmount(0);
                  return;
                }
                const numericValue = Number(value.replace(/^0+/, ''));
                setBidAmount(numericValue);
              }}
              className="w-full px-2 py-1 text-right border rounded"
              />
            <button className="w-[72px] h-[32px] text-sm text-white bg-main rounded hover:bg-blue-700"
            onClick={handleBid}>
              입찰하기
            </button>
          </div>
          <p className="mt-1 text-xs font-thin text-right text-red mr-[72px]">
            {(() => {
              if (typeof bidAmount !== 'number' || bidAmount <= 0) return '';

              const man = Math.floor(bidAmount / 10000);
              const chun = Math.floor((bidAmount % 10000) / 1000);
              const baek = Math.floor(bidAmount % 1000); 
              let result = '';
              if (man > 0) {
                result += `${man}만`;
              }
              if (chun > 0) {
                result += ` ${chun}천`;
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
                <p className="text-sm">입찰 취소 가능 시간: {formatTime(cancelTimer)}</p>
              </div>
              <button className="px-3 py-1 text-yellow-600 border border-yellow-600 rounded hover:bg-yellow-200"
              onClick={()=> setIsHighestBidder(false)}>
                취소하기
              </button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

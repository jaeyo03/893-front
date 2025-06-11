"use client";

import { useState, useEffect } from "react";

export interface AuctionTitleInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function AuctionTitleInput({
  value,
  onChange,
  maxLength = 100,
}: AuctionTitleInputProps) {
  const [count, setCount] = useState(value.length);

  // 입력값이 변경될 때마다 카운트 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue); // 부모 컴포넌트로 값 전달
      setCount(newValue.length); // 글자 수 업데이트
    }
  };

  // 수정 페이지에서는 초기 값에 따라 글자 수 재설정
  useEffect(() => {
    setCount(value.length); // 초기 값이 변경될 때마다 카운트 업데이트
  }, [value]);

  return (
    <div className="flex flex-col w-full max-w-[1240px] max-h-[48px] gap-1">
      {/* 경매 제목 입력창 */}
      <input
        id="auction-title"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="경매 제목"
        className="px-4 py-2 border rounded-md border-registerline font-extralight focus:outline-none focus:ring-2 focus:ring-main text-resgisterchecktext"
      />

      {/* 글자 수 카운터 */}
      <div className="text-xs font-thin text-right text-registertextcnt">
        {count} / {maxLength}
      </div>
    </div>
  );
}

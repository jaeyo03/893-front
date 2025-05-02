"use client";

import { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue); // 부모 컴포넌트에서 상태 관리
      setCount(newValue.length);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-1">
      {/* 입력창 */}
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

// 길이 및 UI/UX 수정하기기

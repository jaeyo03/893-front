"use client";

import { useState, useEffect } from "react";

export interface AuctionPriceInputProps {
  value: number;
  onChange: (value: number) => void;
}

// 숫자를 한글 금액으로 변환
function numberToKorean(num: number): string {
  const hanA = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  const unitA = ["", "십", "백", "천"];
  const levelUnit = ["", "만", "억", "조"];

  if (num === 0) return "영원";

  let result = "";
  let level = 0;

  while (num > 0) {
    let part = num % 10000;
    if (part !== 0) {
      let str = "";
      let digit = 0;
      while (part > 0) {
        const n = part % 10;
        if (n !== 0) {
          // '일'은 생략하는 조건 추가 (단, 일의 자리 제외)
          const digitStr = n === 1 && digit > 0 ? "" : hanA[n];
          str = digitStr + unitA[digit] + str;
        }
        digit++;
        part = Math.floor(part / 10);
      }
      result = str + levelUnit[level] + result;
    }
    level++;
    num = Math.floor(num / 10000);
  }

  return result + "원";
}
export default function AuctionPriceInput({
  value,
  onChange,
}: AuctionPriceInputProps) {
  const [inputValue, setInputValue] = useState(value.toLocaleString());

  useEffect(() => {
    // 부모에서 받은 value가 변경되었을 때 inputValue도 업데이트
    setInputValue(value ? value.toLocaleString() : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 추출
    const num = Number(raw);

    setInputValue(raw ? num.toLocaleString() : "");
    onChange(num); // 부모에게 전달
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-1">
      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleChange}
        placeholder="₩ 경매 시작 가격"
        className="px-4 py-2 text-left border rounded-md border-registerline font-extralight focus:outline-none focus:ring-2 focus:ring-main text-resgisterchecktext"
      />
      <div className="text-xs font-thin text-right text-registertextcnt">
        {value > 0 ? numberToKorean(value) : ""}
      </div>
    </div>
  );
}

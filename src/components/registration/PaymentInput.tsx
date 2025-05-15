"use client";

import { useState, useEffect } from "react";

export interface AuctionPriceInputProps {
  value: number;
  onChange: (value: number) => void;
}

// 숫자를 한글 금액으로 변환
function numberToKorean(num: number): string {
  if (num === 0) return "0원";

  const unitDigit = ["", "십", "백", "천"];
  const unitLevel = ["", "만", "억", "조", "경"];

  let result = "";
  let level = 0;

  while (num > 0) {
    const part = num % 10000;
    if (part !== 0) {
      let section = "";
      const digits = String(part).padStart(4, "0").split("").map(Number);

      digits.forEach((digit, i) => {
        const pos = 3 - i; // 천백십일 순서
        if (digit !== 0) {
          section += `${digit}${unitDigit[pos]}`;
        }
      });

      result = section + unitLevel[level] + result;
    }

    level++;
    num = Math.floor(num / 10000);
  }

  return result + "원";
}

export default function PaymentInput({
                                       value,
                                       onChange,
                                     }: AuctionPriceInputProps) {
  const [inputValue, setInputValue] = useState(typeof value === "number" ? value.toLocaleString() : "");
  useEffect(() => {
    // 부모에서 받은 value가 변경되었을 때 inputValue도 업데이트
    setInputValue(value ? value.toLocaleString() : "");
    console.log("value", value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 추출
    const num = Number(raw);

    setInputValue(raw ? num.toLocaleString() : "");
    onChange(num); // 부모에게 전달
  };

  return (
    <div className="flex flex-col w-full max-w-[1240px] max-h-[48px] gap-1">
      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleChange}
        placeholder="₩ 경매 시작 가격"
        className="px-4 py-2 text-left border rounded-md border-registerline font-extralight focus:outline-none focus:ring-2 focus:ring-main text-resgisterchecktext"
      />
      <div className="text-xs font-thin text-right text-registertextcnt">
        {numberToKorean(value)}
      </div>
    </div>
  );
}
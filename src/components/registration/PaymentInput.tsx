"use client";

import { useState, useEffect } from "react";

export interface AuctionPriceInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

// 숫자를 한글 금액으로 변환
function numberToKorean(num: number | null): string {
  if (!num || num === 0) return "0원";

  const units = [
    { value: 10 ** 8, label: "억" },
    { value: 10 ** 4, label: "만" },
    { value: 1, label: "" },
  ];

  let result = "";

  for (const unit of units) {
    const unitValue = Math.floor(num / unit.value);
    if (unitValue > 0) {
      result += `${unitValue}${unit.label} `;
      num %= unit.value;
    }
  }

  return result.trim() + "원";
}

export default function PaymentInput({
  value,
  onChange,
}: AuctionPriceInputProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value != null && value !== 0 ? value.toLocaleString() : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw === "") {
      setInputValue("");
      onChange(null); // 빈 입력 시 null 전달
      return;
    }

    let num = Number(raw);
    num = Math.min(Math.max(0, num), 100000000);

    setInputValue(num.toLocaleString());
    onChange(num);
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

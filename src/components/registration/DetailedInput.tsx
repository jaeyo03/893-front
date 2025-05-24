"use client";

import { useState } from "react";

export interface DetailedInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}
export default function DetailedInput({
  value,
  onChange,
  maxLength = 1000,
}: DetailedInputProps) {
  const [count, setCount] = useState(value.length);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue); // 부모 컴포넌트에서 상태 관리
      setCount(newValue.length);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1240px] gap-1">
      {/* 입력창 */}
      <textarea
        id="dietailed-input"
        value={value}
        onChange={handleChange}
        placeholder={`- 상품명(브랜드)\n- 구매 시기 (년, 월, 일)\n- 착용 기간\n- 오염 여부\n- 하자 여부\n* 실제 촬영한 사진과 함께 상세 정보를 입력해주세요.`}
        className="pl-[16px] pt-[35px] border rounded-md border-registerline  font-thin focus:outline-none focus:ring-2 focus:ring-main text-black resize-none h-[220px] overflow-hidden"
      />

      {/* 글자 수 카운터 */}
      <div className="text-xs font-thin text-right text-registertextcnt">
        {count} / {maxLength}
      </div>
    </div>
  );
}

// - 상품명(브랜드)
// - 구매 시기 (년, 월, 일)
// - 착용 기간
// - 오염 여부
// - 하자 여부
// * 실제 촬영한 사진과 함께 상세 정보를 입력해주세요.

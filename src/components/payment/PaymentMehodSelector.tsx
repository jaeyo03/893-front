"use client";

import { useState } from "react";

export default function PaymentMethodSelector() {
  const [selected, setSelected] = useState("");

  const methods = [
    "신용/체크카드",
    "네이버 페이",
    "카카오 페이",
    "휴대폰",
    "무통장 입금",
  ];

  return (
    <div className="border rounded-lg shadow-sm">
      <div className="bg-gray-100 px-4 py-3 font-semibold text-lg">
        결제수단
      </div>

      <div className="px-4 py-4 space-y-4">
        {methods.map((method, idx) => (
          <label
            key={idx}
            className="flex items-center space-x-3 cursor-pointer"
          >
            {/* peer 라디오 버튼 */}
            <input
              type="radio"
              name="payment"
              value={method}
              checked={selected === method}
              onChange={() => setSelected(method)}
              className="peer hidden"
            />

            {/* 외곽 원 + 내부 점 */}
            <div className="w-5 h-5 rounded-full border-2 border-graybg flex items-center justify-center">
              {/* 내부 원은 peer와 직접 형제가 아니므로 peer를 쓰면 안 됨. 대신 selected 상태로 처리 */}
              <div
                className={`
                  w-2.5 h-2.5 rounded-full transition-colors
                  ${selected === method ? "bg-main" : "bg-graybg"}
                `}
              />
            </div>

            {/* 텍스트 */}
            <span
              className={`
                text-gray-800 transition-colors
                ${selected === method ? "text-main font-semibold" : ""}
              `}
            >
              {method}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

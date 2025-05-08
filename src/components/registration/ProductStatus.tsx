import { useState } from "react";

const productConditions = [
  "새 상품 (미사용)",
  "사용감 없음",
  "사용감 적음",
  "사용감 많음",
  "고장/파손 상품",
];

const productConditionDescriptions = [
  "사용하지 않은 새 상품",
  "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",
  "눈에 띄는 흔적이나 얼룩이 약간 있음",
  "눈에 띄는 흔적이나 얼룩이 많이 있음",
  "기능 이나 외관 손상 등으로 수리/수선 필요",
];

export default function ProductStatus() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full max-w-md gap-6">
      <label className="text-resgisterchecktext font-thin font-[15px]">
        상품상태
      </label>
      <div className="flex flex-col gap-2">
        {productConditions.map((condition, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              id={`condition-${index}`}
              name="productCondition"
              className="sr-only"
              checked={selected === index}
              onChange={() => setSelected(index)}
            />
            {/* 사용자 정의 체크박스 */}
            <label
              htmlFor={`condition-${index}`}
              className={`w-5 h-5 flex items-center justify-center border-2 rounded-md cursor-pointer
                ${
                  selected === index
                    ? "bg-white border-main text-main"
                    : "border-resgistersubtext rounded-[6px] border-solid border text-transparent"
                }
              `}
            >
              ✓
            </label>
            {/* 텍스트 */}
            <label
              htmlFor={`condition-${index}`}
              className="text-resgistertext font-normal text-[16px] cursor-pointer"
            >
              {condition}
            </label>
            <span className="text-sm text-resgistersubtext font-normal font-[14px]">
              {productConditionDescriptions[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

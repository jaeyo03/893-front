import { useState } from "react";

const data = {
  전자기기: {
    "모바일/태블릿": ["스마트폰", "태블릿", "웨어러블 기기", "액세서리"],
    "컴퓨터/노트북": ["데스크탑", "노트북", "모니터", "주변기기", "부품"],
    가전제품: ["TV/오디오", "주방가전", "생활가전", "계절가전"],
  },
  "패션/의류": {
    여성의류: ["상의", "하의", "원피스/세트", "아우터", "언더웨어"],
    남성의류: ["상의", "하의", "정장/세트", "아우터", "언더웨어"],
    신발가방: ["여성신발", "남성신발", "가방/지갑", "여행용품"],
    액세서리주얼리: ["시계", "주얼리", "모자/벨트", "기타 액세서리"],
  },
  "가구/인테리어": {
    가구: ["침실가구", "거실가구", "주방가구", "사무용가구"],
    인테리어: ["조명", "커튼/카펫", "소품/장식품", "침구류"],
  },
  "취미/레저": {
    스포츠레저: ["운동용품", "캠핑용품", "낚시용품", "자전거/보드"],
    취미수집: ["음반/DVD", "책/도서", "게임", "피규어/모델", "수집품"],
  },
  "유아/아동": {
    유아용품: ["유모차/카시트", "장난감/교구", "유아의류", "유아가구"],
    아동용품: ["아동의류", "학용품", "도서/교재", "장난감"],
  },
  "뷰티/미용": {
    "화장품/향수": ["스킨케어", "메이크업", "향수", "헤어케어"],
    미용기기용품: ["미용가전", "네일/헤어 용품"],
  },
} as const;

type Step1Category = keyof typeof data;
type Step2Category<T extends Step1Category> = keyof (typeof data)[T];

export default function CategorySelector() {
  const [step1, setStep1] = useState<Step1Category | null>(null);
  const [step2, setStep2] = useState<Step2Category<Step1Category> | null>(null);
  const [step3, setStep3] = useState<string | null>(null);

  return (
    <div className="flex w-full max-w-[1280px] h-[240px] border-none rounded overflow-hidden text-resgisterchecktext font-thin text-[13.125px]">
      {/* 1단계 */}
      <div
        className={`w-1/3 overflow-y-auto border border-solid rounded${
          step1 ? " border-r border" : ""
        } scrollbar-none`}
      >
        {(Object.keys(data) as Step1Category[]).map((category) => (
          <div
            key={category}
            onClick={() => {
              setStep1(category);
              setStep2(null); // 중분류 초기화
              setStep3(null); // 하위 항목 초기화
            }}
            className={`px-4 py-2 cursor-pointer ${
              step1 === category
                ? "bg-divider font-semibold"
                : "hover:bg-divider"
            }`}
          >
            {category}
          </div>
        ))}
      </div>

      {/* 2단계 */}
      <div
        className={`w-1/3 overflow-y-auto scrollbar-none border-solid rounded${
          step1 ? "border-r border" : ""
        }`}
      >
        {step1 &&
          (Object.keys(data[step1]) as Step2Category<typeof step1>[]).map(
            (subcategory) => (
              <div
                key={subcategory}
                onClick={() => {
                  setStep2(subcategory);
                  setStep3(null); // 하위 항목 초기화
                }}
                className={`px-4 py-2 cursor-pointer ${
                  step2 === subcategory
                    ? "bg-divider font-semibold"
                    : "hover:bg-divider "
                }`}
              >
                {subcategory}
              </div>
            )
          )}
      </div>

      {/* 3단계 */}
      <div
        className={`w-1/3 overflow-y-auto scrollbar-none border-solid rounded${
          step1 && step2 ? "border-r border" : ""
        }`}
      >
        {step1 && step2 && step2 in data[step1] && (
          <div className="flex flex-col">
            {(data[step1][step2] as string[]).map((item) => (
              <div
                key={item}
                onClick={() => setStep3(item)}
                className={`px-4 py-2 cursor-pointer ${
                  step3 === item
                    ? "bg-divider font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

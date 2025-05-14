// 상수: 상품 상태 라벨 목록
export const productConditions = [
  "새 상품 (미사용)",
  "사용감 없음",
  "사용감 적음",
  "사용감 많음",
  "고장/파손 상품",
] as const;

// 설명 텍스트
export const productConditionDescriptions = [
  "사용하지 않은 새 상품",
  "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",
  "눈에 띄는 흔적이나 얼룩이 약간 있음",
  "눈에 띄는 흔적이나 얼룩이 많이 있음",
  "기능 이나 외관 손상 등으로 수리/수선 필요",
] as const;

// 라벨 → 서버 전송용 코드
export function convertLabelToServerValue(label: string): string {
  const map: Record<string, string> = {
    "새 상품 (미사용)": "brand_new",
    "사용감 없음": "like_new",
    "사용감 적음": "gently_used",
    "사용감 많음": "heavily_used",
    "고장/파손 상품": "damaged",
  };
  return map[label] ?? "unknown";
}

// 서버에서 받은 코드 → 라벨로 변환
export function convertServerValueToLabel(value: string): string {
  const reverseMap: Record<string, string> = {
    brand_new: "새 상품 (미사용)",
    like_new: "사용감 없음",
    gently_used: "사용감 적음",
    heavily_used: "사용감 많음",
    damaged: "고장/파손 상품",
  };
  return reverseMap[value] ?? "알 수 없음";
}

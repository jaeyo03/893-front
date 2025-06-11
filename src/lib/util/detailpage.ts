export function numberToKorean(num: number): string {
  if (num === 0) return "0원";
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

export function getRemainTime(endAt: string): number {
  if (!endAt || isNaN(new Date(endAt).getTime())) return 0;
  const now = new Date();
  const end = new Date(endAt);
  const diff = Math.floor((end.getTime() - now.getTime()) / 1000);
  return Math.max(diff, 0);
}

export const formatTime = (seconds: number) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${hours}:${min}:${sec}`;
};
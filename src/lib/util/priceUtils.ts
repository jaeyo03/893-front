// export function formatToManwon(price: number): string {
//   return `${Math.round(price / 10000)}만원`;
// }
export function calculateIncreaseRate(base: number, final: number): string {
  if (base <= 0) return "+0%";
  const rate = ((final - base) / base) * 100;
  return `${rate > 0 ? "+" : ""}${Math.round(rate)}%`;
}

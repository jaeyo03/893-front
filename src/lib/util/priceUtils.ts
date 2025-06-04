export function calculateIncreaseRate(base: number, final: number): string {
  if (base <= 0) return "+0%";
  const rate = ((final - base) / base) * 100;
  const rounded = Math.round(rate);

  if (rounded === 0) return "+0%";
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}

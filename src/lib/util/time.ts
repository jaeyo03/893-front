export function parseLeftTimeStringToMs(timeStr: string): number {
  const [h, m, s] = timeStr.split(":").map(Number);
  return ((h ?? 0) * 3600 + (m ?? 0) * 60 + (s ?? 0)) * 1000;
}

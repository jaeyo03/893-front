// utils/debounce.ts
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timer: number | undefined;
  return (...args: Parameters<T>) => {
    if (timer !== undefined) return; // 대기 중이면 무시
    func(...args);
    timer = window.setTimeout(() => {
      timer = undefined;
    }, wait);
  };
}

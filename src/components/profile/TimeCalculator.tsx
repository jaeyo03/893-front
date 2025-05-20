// 🕒 남은 시간을 계산하는 함수
export function getRemainingTime(endTime: string): string {
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const diff = end - now;

  if (diff <= 0) return '종료됨';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}
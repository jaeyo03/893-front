import { Status } from "@/types/userData";

// 상태 라벨 및 클래스 정의용 인터페이스
export interface AuctionStatus {
  label: string;
  className: string;
}

// 상태 조건에 따른 반환 함수
export const getAuctionStatus = (status: Status): AuctionStatus => {
  switch (status) {
    case 'pending':
      return { label: '대기 중', className: 'bg-gray-400' };
    case 'active':
      return { label: '진행 중', className: 'bg-main' };
    case 'completed':
      return { label: '완료됨', className: 'bg-green-500' };
    case 'cancelled':
      return { label: '취소됨', className: 'bg-red-500' };
    default:
      return { label: '알 수 없음', className: 'bg-gray-200' }; // fallback (optional)
  }
};

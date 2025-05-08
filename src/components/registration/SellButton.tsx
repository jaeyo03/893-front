import { useState } from "react";
import { Button } from "../ui/button";
import { ConfirmModal } from "./modal/ConfirmModal";
export default function SellButton({ agreed }: { agreed: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태 관리

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 확인 클릭했을 때 실행
  const handleConfirm = () => {
    alert("경매 물품 등록이 완료되었습니다!"); // 경매 시작 처리 코드 추가해야됨..(API 호출 등)
    setIsModalOpen(false); // 모달 닫기
  };

  // 판매하기 버튼 클릭 시
  const handleClick = () => {
    if (!agreed) {
      alert("판매를 시작하려면 판매자 약관에 동의해 주세요."); // 경고 메시지
    } else {
      openModal(); // 모달 열기
    }
  };

  return (
    <div>
      <Button
        className="w-[240px] h-[60px] bg-main text-white text-[13.12px] font-thin rounded-[6px] p-[6px] hover:bg-main/80"
        onClick={handleClick}
      >
        판매하기
      </Button>

      {/* 모달 컴포넌트 */}
      <ConfirmModal
        isOpen={isModalOpen} // 모달 열림 여부
        onClose={closeModal} // 취소 클릭 시 모달 닫기
        onConfirm={handleConfirm} // 확인 클릭 시 경매 시작 처리
      />
    </div>
  );
}

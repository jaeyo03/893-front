import { Button } from "../ui/button";
import { ConfirmModal } from "./modal/ConfirmModal";
import { useEffect } from "react";
interface SellButtonProps {
  agreed: boolean;
  label?: string;
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
}

export default function SellButton({
  agreed,
  label = "등록하기",
  isModalOpen,
  onModalOpen,
  onModalClose,
}: SellButtonProps) {
  const handleClick = () => {
    if (!agreed) {
      alert("판매를 시작하려면 판매자 약관에 동의해 주세요.");
    } else {
      onModalOpen();
    }
  };
  console.log("SellButton 렌더됨");

  useEffect(() => {
    console.log("isModalOpen changed:", isModalOpen);
  }, [isModalOpen]);
  const handleConfirm = () => {
    alert("경매 물품 등록이 완료되었습니다!");
    onModalClose();
  };

  return (
    <div>
      <Button
        className="w-[240px] h-[60px] bg-main text-white text-[13.12px] font-thin rounded-[6px] p-[6px] hover:bg-main/80"
        onClick={handleClick}
      >
        {label}
      </Button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

// ✅ TODO: 백엔드 API 연결 후 해야 할 작업 목록

// 1. /api/auctions/:id API가 제대로 작동하는지 확인
//    - 존재하지 않거나 404가 발생하지 않도록 백엔드 준비

// 2. auctionId (예: router.query.id 또는 params.id) 를 안전하게 받아오는 로직 추가
//    - CSR이면 useRouter().query
//    - App Router 사용 시 useParams() 등

// 3. API 응답 성공 시 setTitle, setPrice, setDetail 등 데이터 상태 초기화
//    - API 응답값을 상태에 정확히 반영

// 4. setIsReady(true) 호출해서 UI 표시 시작
//    - 이 값이 true여야 SellButton, ImageUploader 등 하위 UI가 뜬다

// 5. ConfirmModal은 항상 DOM에 유지되므로 상태관리만 되면 모달 정상 작동함
//    - isModalOpen 상태는 부모 컴포넌트에서 유지할 것

// 6. (선택) API 실패 시 fallback 처리도 추가 (에러 메시지 또는 redirect 등)

import { Button } from "../ui/button";
import { ConfirmModal } from "./modal/ConfirmModal";

interface SellButtonProps {
  label?: string;
  isModalOpen: boolean;
  onClick: () => void;
  onModalClose: () => void;
  onConfirm: () => void;
}

export default function SellButton({
  label = "등록하기",
  isModalOpen,
  onClick,
  onModalClose,
  onConfirm,
}: SellButtonProps) {
  return (
    <div>
      <Button
        className="w-[240px] h-[60px] bg-main text-white text-[13.12px] font-thin rounded-[6px] p-[6px] hover:bg-main/80"
        onClick={(e) => {
          e.preventDefault();
          onClick(); // 유효성 검사 및 모달 열기
        }}
      >
        {label}
      </Button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onConfirm={onConfirm} // 등록 요청
      />
    </div>
  );
}

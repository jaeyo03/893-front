import { Button } from "../ui/button";
import { ConfirmModal } from "./modal/ConfirmModal";
interface SellButtonProps {
  label?: string;
  isModalOpen: boolean;
  onClick: () => void;
  onModalClose: () => void;
  onConfirm: () => void;
  disabledRegister?: boolean;
  confirmDisabled?: boolean;
}

export default function SellButton({
  label = "등록하기",
  isModalOpen,
  onClick,
  onModalClose,
  onConfirm,
  disabledRegister = false,
  confirmDisabled = false,
}: SellButtonProps) {

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          if (!disabledRegister) onClick();
        }}
        disabled={disabledRegister}
        className="w-[240px] h-[60px] bg-main text-white ... disabled:opacity-50"
      >
        {label}
      </Button>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onConfirm={onConfirm}
        confirmDisabled={confirmDisabled}
      />
    </div>
  );
}

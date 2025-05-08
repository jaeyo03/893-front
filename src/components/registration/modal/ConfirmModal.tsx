import { Button } from "../../ui/button";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링 x

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[20px] w-[1000px] h-[580px]">
        <h2 className="text-center text-[40px] font-bold mb-[87px] mt-[105px] text-main">
          Confirm
        </h2>
        <p className="text-center text-[30px] font-normal mb-[87px] mt-[105px] text-main">
          정말로 이 물품을 등록하시겠습니까? 등록하시면 경매가 진행됩니다.
        </p>
        <div className="flex justify-around">
          {" "}
          {/* 버튼 horver 시 색상 변경 무슨색? */}
          <Button
            className="w-[140px] h-[86px] bg-main text-white font-medium text-[33px] rounded-none hover:bg-main/80"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            className="w-[140px] h-[86px] bg-white text-main font-medium text-[33px] rounded-none border-2 border-main hover:bg-main/90 hover:text-white"
            onClick={onConfirm}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

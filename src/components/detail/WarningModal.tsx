// components/WarningModal.tsx
'use client';

interface WarningModalProps {
  isOpen: boolean;
  positionClass : string; // 위치 조정용 클래스
}

export default function WarningModal({ isOpen, positionClass }: WarningModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-50 w-72 rounded-xl bg-white p-4 shadow-xl ${positionClass || ''}`}
    >
      <h2 className="text-xl font-bold text-rose-400 text-center mb-2">warning</h2>
      <ul className="list-disc list-inside space-y-1 text-rose-400 text-sm font-medium">
        <li>입찰 취소는 최대 1회만 가능합니다.</li>
        <li>입찰은 현재가 이상만 가능합니다.</li>
      </ul>
    </div>
  );
}

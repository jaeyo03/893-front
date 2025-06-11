// components/DaumPostcodeModal.tsx
"use client";

import { DaumPostcodeEmbed } from "react-daum-postcode";
import { Button } from "@/components/ui/button";

export default function DaumPostcodeModal({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: (data: { address: string, zipCode: string }) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow w-full max-w-md">
        <h2 className="text-lg font-bold mb-2">주소 검색</h2>
        <DaumPostcodeEmbed
          onComplete={(data) => {
            onComplete({
              address: data.address,
              zipCode: data.zonecode,
            }); // 상위로 주소 전달
            onClose(); // 모달 닫기
          }}
        />
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>닫기</Button>
        </div>
      </div>
    </div>
  );
}

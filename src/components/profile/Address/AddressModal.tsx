'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeliveryAddress } from "@/types/userData";
import { addAddress } from "@/lib/api/user";  // API 호출 함수
import DaumPostcodeModal from "./DaumPostcodeModal";

type AddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DeliveryAddress) => void;
};

export default function AddressModal({ isOpen, onClose, onSave }: AddressModalProps) {
  const [form, setForm] = useState<DeliveryAddress>({
    id: 0,
    name: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    isDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // 실시간 에러 제거
    if (value.trim() !== "") {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    (["name", "phoneNumber", "addressLine1", "addressLine2", "zipCode"] as const).forEach((key) => {
      if (form[key].trim() === "") {
        newErrors[key] = "이 필드는 필수입니다.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // form의 데이터가 유효한지 방어 코드
    if (!form.name || !form.phoneNumber || !form.addressLine1 || !form.addressLine2 || !form.zipCode) {
      console.error("필수 입력값이 없습니다.");
      return;
    }

    try {
      const response = await addAddress(form);  // API 호출
      if (response) {
        onSave(form);  // 성공하면 부모에게 데이터 전달
        onClose();  // 모달 닫기
        setForm({
          id: 0,
          name: "",
          phoneNumber: "",
          addressLine1: "",
          addressLine2: "",
          zipCode: "",
          isDefault: false,
        });
        setErrors({});
      }
    } catch (error) {
      console.error("배송지 추가 오류:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">배송지 입력</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.name ? "border-red" : "border-gray-300"}`}
            />
            {errors.name && <p className="text-red text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="전화번호"
              value={form.phoneNumber}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.phoneNumber ? "border-red" : "border-gray-300"}`}
            />
            {errors.phoneNumber && <p className="text-red text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* 주소 검색 + readOnly 필드 */}
          <div className="col-span-2">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="addressLine1"
                value={form.addressLine1}
                placeholder="도로명 주소"
                readOnly
                className={`w-full p-2 border rounded ${errors.addressLine1 ? "border-red" : "border-gray-300"}`}
              />
              <Button
                type="button"
                onClick={() => setIsPostcodeOpen(true)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                주소 검색
              </Button>
            </div>

            {errors.addressLine1 && <p className="text-red text-xs mt-1">{errors.addressLine1}</p>}
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="addressLine2"
              placeholder="상세 주소"
              value={form.addressLine2}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.addressLine2 ? "border-red" : "border-gray-300"}`}
            />
            {errors.addressLine2 && <p className="text-red text-xs mt-1">{errors.addressLine2}</p>}
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="zipCode"
              placeholder="우편번호"
              value={form.zipCode}
              readOnly
              className={`w-full p-2 border rounded ${errors.zipCode ? "border-red" : "border-gray-300"}`}
            />
            {errors.zipCode && <p className="text-red text-xs mt-1">{errors.zipCode}</p>}
          </div>

          <label className="col-span-2 flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>대표 배송지로 설정</span>
          </label>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSubmit}>저장</Button>
        </div>

        {isPostcodeOpen && (
          <DaumPostcodeModal
            onClose={() => setIsPostcodeOpen(false)}
            onComplete={(data) => {
              setForm((prev) => ({
                ...prev,
                addressLine1: data.address, // Address from postcode
                zipCode: data.zipCode,
              }));
            }}
          />
        )}
      </div>
    </div>
  );
}

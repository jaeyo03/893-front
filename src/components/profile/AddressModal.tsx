"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type AddressForm = {
  label: string;
  name: string;
  phone: string;
  address: string;
  detail: string;
  isMain: boolean;
};

type AddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddressForm) => void;
};

export default function AddressModal({ isOpen, onClose, onSave }: AddressModalProps) {
  const [form, setForm] = useState<AddressForm>({
    label: "",
    name: "",
    phone: "",
    address: "",
    detail: "",
    isMain: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    (["label", "name", "phone", "address", "detail"] as const).forEach((key) => {
      if (form[key].trim() === "") {
        newErrors[key] = "이 필드는 필수입니다.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSave(form);
    onClose();
    setForm({
      label: "",
      name: "",
      phone: "",
      address: "",
      detail: "",
      isMain: false,
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">배송지 입력</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {/** 배송지 라벨 */}
          <div className="col-span-2">
            <input
              type="text"
              name="label"
              placeholder="배송지 라벨 (예: 집, 회사)"
              value={form.label}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.label ? "border-red" : "border-gray-300"}`}
            />
            {errors.label && <p className="text-red text-xs mt-1">{errors.label}</p>}
          </div>

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
              name="phone"
              placeholder="전화번호"
              value={form.phone}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.phone ? "border-red" : "border-gray-300"}`}
            />
            {errors.phone && <p className="text-red text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="address"
              placeholder="도로명 주소"
              value={form.address}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.address ? "border-red" : "border-gray-300"}`}
            />
            {errors.address && <p className="text-red text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="detail"
              placeholder="상세 주소"
              value={form.detail}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.detail ? "border-red" : "border-gray-300"}`}
            />
            {errors.detail && <p className="text-red text-xs mt-1">{errors.detail}</p>}
          </div>

          <label className="col-span-2 flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="isMain"
              checked={form.isMain}
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
      </div>
    </div>
  );
}

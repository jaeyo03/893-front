"use client";

import { useState } from "react";
import ImageUploader from "@/components/registration/ImageUploader"; // 이미지 업로더 컴포넌트
import AuctionTitleInput from "@/components/registration/AuctionTitleInput";
import PaymentInput from "@/components/registration/PaymentInput";
import NotificationDropdown from "@/components/notification/NotificationDropdown";
export default function Registration() {
  const [images, setImages] = useState<File[]>([]); // 이미지 상태 관리
  const [title, setTitle] = useState<string>(""); // 경매 제목 상태 관리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-2xl p-8 mx-auto">
      <h1 className="mb-4 text-xl font-bold">등록 페이지</h1>
      <div className="mb-4">
        <h1 className="mb-2 text-lg font-semibold">테스트</h1>

        {/* <ImageUploader /> */}
        {/* <AuctionTitleInput value={title} onChange={setTitle} /> */}
        <PaymentInput value={0} onChange={() => {}} />
      </div>
    </div>
  );
}

// 이미지 등록 (144x144 섹션, 카메라 아이콘 lucid, 0/10 개 등록 + 1 씩 증가 , ) <-- 컴포넌트화
// 경매 제목 (input, 최대 100자)
// 카테고리 tree3 단계 ex) 전자기기 > 노트북 > 삼성노트북 )
// 경매 시작 가격 (input, 숫자만 가능)
// 상세 설명 작성 (input, 최대 1000자)
// 상품 상태 (checkbox, 단일 선택, 새상품,사용감 없음,사용감 적음, 사용감 많음, 고장/파손)
// 경매 시작 시간(최대 24시간)
// 경매 소용 시간(최소10분 ~ 최대 24시간)
// 판매 정보가 실제 상품과 다를 경우, 책임은 판매자에게 있음을 동의합니다. (checkbox, 필수 체크)
// 판매하기 버튼

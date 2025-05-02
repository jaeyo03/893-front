"use client";

import { useState } from "react";
import ImageUploader from "@/components/registration/ImageUploader"; // 이미지 업로더 컴포넌트
import AuctionTitleInput from "@/components/registration/AuctionTitleInput"; // 경매 제목 입력 컴포넌트
import PaymentInput from "@/components/registration/PaymentInput"; // 경매 시작 가격 입력 컴포넌트
import DetailedInput from "@/components/registration/DetailedInput"; // 상세 설명 입력 컴포넌트
import ProductStatus from "@/components/registration/ProductStatus"; // 상품 상태 컴포넌트
import CategorySelect from "@/components/registration/CategorySelect"; // 카테고리 선택 컴포넌트
import SellerAgreementCheckbox from "@/components/registration/SellerAgreementCheckbox"; // 판매자 동의 체크박스 컴포넌트
import SellButton from "@/components/registration/SellButton"; // 판매하기 버튼 컴포넌트
import AuctionStartTimeButton from "@/components/registration/AuctionStartTimeButton"; // 경매 시작 시간 버튼 컴포넌트
import AuctionTimeButton from "@/components/registration/AuctionTimeButton"; // 경매 시간 설정 버튼 컴포넌트트

export default function Registration() {
  const [images, setImages] = useState<File[]>([]); // 이미지 상태 관리
  const [title, setTitle] = useState<string>(""); // 경매 제목 상태 관리
  const [price, setPrice] = useState<number>(0); // 경매 시작 가격 상태 관리
  const [detail, setDetail] = useState<string>(""); // 상세 설명 상태 관리

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-[1280] p-8 mx-auto">
      {/* <h1 className="mb-4 text-xl font-bold">등록 페이지</h1> */}
      <div className="mb-4">
        {/* <h1 className="mb-2 text-lg font-semibold">테스트</h1> */}
        {/* <ImageUploader /> */}
        {/* <AuctionTitleInput value={title} onChange={setTitle} /> */}
        {/* <PaymentInput value={price} onChange={setPrice} /> */}
        {/* <DetailedInput value={detail} onChange={setDetail} /> */}
        {/* <ProductStatus /> */}
        {/* <CategorySelect /> */}
        {/* <SellerAgreementCheckbox /> */}
        {/* <SellButton /> */}
        {/* <AuctionStartTimeButton /> */}
        {/* <AuctionTimeButton /> */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col pb-[79px]">
            <ImageUploader />
          </div>
          <div className="flex flex-col pb-[39px]">
            <AuctionTitleInput value={title} onChange={setTitle} />
          </div>
          <div className="flex flex-col pb-[20px]">
            <CategorySelect />
          </div>
          <div className="flex flex-col pb-[20px]">
            <PaymentInput value={price} onChange={setPrice} />
          </div>
          <div className="flex flex-col pb-[38px]">
            <DetailedInput value={detail} onChange={setDetail} />
          </div>
          <div className="flex flex-col pb-[75px]">
            <ProductStatus />
          </div>
          <div className="flex justify-center flex-nowrap pb-[240px] gap-10">
            <AuctionStartTimeButton />
            <AuctionTimeButton />
          </div>
          <div className="flex justify-center pb-[20px]">
            <SellerAgreementCheckbox />
          </div>
          <div className="flex justify-center">
            <SellButton />
          </div>
        </form>
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

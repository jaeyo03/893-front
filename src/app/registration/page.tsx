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
  //const [images, setImages] = useState<File[]>([]); // 이미지 상태 관리 */추가예정 (업로드된 이미지 파일들)
  const [title, setTitle] = useState<string>(""); // 경매 제목 상태 관리
  const [price, setPrice] = useState<number>(0); // 경매 시작 가격 상태 관리
  const [detail, setDetail] = useState<string>(""); // 상세 설명 상태 관리
  const [agreed, setAgreed] = useState(false); // 체크박스 동의 여부 상태 관리

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //폼 제출을 처리 (API 호출 등)
    console.log("폼 제출됨!");
  };

  // 판매자 동의 체크박스 상태 변경 함수
  const handleAgreementChange = (checked: boolean) => {
    setAgreed(checked);
  };

  return (
    <div className="max-w-[1280] p-8 mx-auto">
      <div className="mb-4">
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
            <SellerAgreementCheckbox onChange={handleAgreementChange} />
          </div>
          <div className="flex justify-center">
            <SellButton agreed={agreed} />
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/registration/ImageUploader";
import AuctionTitleInput from "@/components/registration/AuctionTitleInput";
import PaymentInput from "@/components/registration/PaymentInput";
import DetailedInput from "@/components/registration/DetailedInput";
import ProductStatus from "@/components/registration/ProductStatus";
import CategorySelector, {
  CategoryValue,
} from "@/components/registration/CategorySelect";
import SellerAgreementCheckbox from "@/components/registration/SellerAgreementCheckbox";
import SellButton from "@/components/registration/SellButton";
import AuctionStartTimeButton from "@/components/registration/AuctionStartTimeButton";
import AuctionTimeButton from "@/components/registration/AuctionTimeButton";
import {
  productConditions,
  convertServerValueToLabel,
} from "@/components/registration/constants/productConditions";
type ServerImage = {
  url: string;
  originalName: string;
};

export default function EditRegistration() {
  const [images, setImages] = useState<File[]>([]);
  const [serverImages, setServerImages] = useState<ServerImage[]>([]);
  const [category, setCategory] = useState<CategoryValue>({
    mainCategory: "",
    subCategory: "",
    detailCategory: "",
  });

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [detail, setDetail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [productStatus, setProductStatus] = useState<number | null>(null);
  const [startTime, setStartTime] = useState({ hour: 0, minute: 0 });
  const [durationTime, setDurationTime] = useState({ hour: 0, minute: 0 });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // ✅ 서버에서 기존 정보 불러오기 (예: /api/auctions/123)
  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const res = await fetch("/api/auctions/123");
        const data = await res.json();

        setTitle(data.title);
        setPrice(data.basePrice);
        setDetail(data.description);
        setServerImages(data.images); // [{ url, originalName }]
        // 카테고리, 상태 등도 여기에 추가 가능
      } catch (err) {
        console.error("경매 데이터 로딩 실패:", err);
      }
    };

    fetchAuctionData();
  }, []);
  // ✅ 서버에서 기존 카테고리 값 불러오기 (예: /api/categories)
  useEffect(() => {
    // 백엔드에서 기존 값 받아오기
    const fetchData = async () => {
      const res = await fetch("/api/auctions/123");
      const data = await res.json();

      setCategory({
        mainCategory: data.category.mainCategory,
        subCategory: data.category.subCategory,
        detailCategory: data.category.detailCategory,
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    // 서버에서 가격 불러오기
    const fetchData = async () => {
      const res = await fetch("/api/auctions/123");
      const data = await res.json();
      setPrice(data.basePrice); // ✅ 서버에서 받은 가격으로 초기값 설정
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 서버에서 상세 설명 불러오기
    const fetchData = async () => {
      const res = await fetch("/api/auctions/123");
      const data = await res.json();
      setDetail(data.description); // ✅ API 명세서 기준
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetch("/api/auctions/123").then(async (res) => {
      const data = await res.json();
      const statusIndex = productConditions.findIndex(
        (label) => label === convertServerValueToLabel(data.itemCondition)
      );
      setProductStatus(statusIndex);
    });
  }, []);
  // 판매자 동의 체크박스 상태 변경 함수
  const handleAgreementChange = (checked: boolean) => {
    setAgreed(checked);
  };

  return (
    <div className="max-w-[1280px] p-8 mx-auto">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col pb-[79px]">
          <ImageUploader
            value={images}
            onChange={setImages}
            serverImages={serverImages}
            onDeleteServerImage={(index) => {
              const newList = [...serverImages];
              newList.splice(index, 1);
              setServerImages(newList);
            }}
            onEmptyImage={() => alert("최소 1장의 이미지를 등록해주세요.")}
          />
        </div>

        <div className="flex flex-col pb-[39px]">
          <AuctionTitleInput value={title} onChange={setTitle} />
        </div>

        <div className="flex flex-col pb-[20px]">
          <CategorySelector value={category} onChange={setCategory} />
        </div>

        <div className="flex flex-col pb-[20px]">
          <PaymentInput value={price} onChange={setPrice} />
        </div>

        <div className="flex flex-col pb-[38px]">
          <DetailedInput value={detail} onChange={setDetail} />
        </div>

        <div className="flex flex-col pb-[75px]">
          <ProductStatus value={productStatus} onChange={setProductStatus} />
        </div>

        <div className="flex justify-center flex-nowrap pb-[240px] gap-10">
          <AuctionStartTimeButton value={startTime} onChange={setStartTime} />

          <AuctionTimeButton value={durationTime} onChange={setDurationTime} />
        </div>
        <div className="flex justify-center pb-[20px]">
          <SellerAgreementCheckbox onChange={handleAgreementChange} />
        </div>

        <div className="flex justify-center">
          <SellButton
            agreed={agreed}
            label="수정하기"
            isModalOpen={isModalOpen}
            onModalOpen={() => setIsModalOpen(true)}
            onModalClose={() => setIsModalOpen(false)}
          />
        </div>
      </form>
    </div>
  );
}

// Axios GET으로 초기값 받아오기

// 받아온 값으로 상태 (setTitle, setPrice, setDetail 등) 세팅

// 버튼 클릭 시 Axios PATCH 전송

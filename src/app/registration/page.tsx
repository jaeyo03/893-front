"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  convertLabelToServerValue,
} from "@/components/registration/constants/productConditions";

export default function Registration() {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [detail, setDetail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [productStatus, setProductStatus] = useState<number | null>(null);
  const [startTime, setStartTime] = useState({ hour: 0, minute: 0 });
  const [durationTime, setDurationTime] = useState({ hour: 0, minute: 0 });
  const [category, setCategory] = useState<CategoryValue>({
    id: null,
    mainCategory: "",
    subCategory: "",
    detailCategory: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAgreementChange = (checked: boolean) => {
    setAgreed(checked);
  };

  const handleValidationAndOpenModal = () => {
    if (images.length === 0) {
      alert("최소 1장의 이미지를 등록해주세요.");
      return;
    }
    if (!title.trim()) {
      alert("경매 제목을 입력해주세요.");
      return;
    }
    if (!category.id) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    if (!price || price <= 0) {
      alert("시작 가격을 입력해주세요.");
      return;
    }
    if (!detail.trim()) {
      alert("상세 설명을 입력해주세요.");
      return;
    }
    if (productStatus === null) {
      alert("상품 상태를 선택해주세요.");
      return;
    }
    if (startTime.hour === 0 && startTime.minute === 0) {
      alert("경매 시작 시간을 설정해주세요.");
      return;
    }
    if (durationTime.hour === 0 && durationTime.minute === 0) {
      alert("경매 시간을 설정해주세요.");
      return;
    }
    if (!agreed) {
      alert("판매 동의에 체크해주세요.");
      return;
    }
    if (images.length > 10) {
      alert("이미지는 최대 10장까지 등록 가능합니다.");
      return;
    }

    // 유효성 통과 → 모달 열기
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const startDelay = startTime.hour * 60 + startTime.minute;
    const duration = durationTime.hour * 60 + durationTime.minute;

    const payload = {
      title,
      description: detail,
      basePrice: Number(price),
      itemCondition: convertLabelToServerValue(
        productConditions[productStatus!]
      ),
      startDelay,
      durationTime: duration,
      category: {
        id: category.id,
        mainCategory: category.mainCategory,
        subCategory: category.subCategory,
        detailCategory: category.detailCategory,
      },
    };

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    const jsonBlob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });
    formData.append("request", jsonBlob);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auctions",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      alert("경매 물품 등록이 완료되었습니다!");
      console.log("등록 성공:", res.data);
      setIsModalOpen(false);
      router.push("/"); // ✅ 홈으로 이동
    } catch (error: any) {
      console.error("등록 실패", error);
      if (error.response) {
        console.error("서버 응답 내용:", error.response.data);
        alert("등록에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="max-w-[1280px] p-8 mx-auto">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col pb-[79px]">
          <ImageUploader
            value={images}
            onChange={setImages}
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
            label="등록하기"
            isModalOpen={isModalOpen}
            onClick={handleValidationAndOpenModal} // ✅ 유효성 검사 & 모달 열기
            onModalClose={() => setIsModalOpen(false)}
            onConfirm={handleSubmit} // ✅ 실제 등록 수행
          />
        </div>
      </form>
    </div>
  );
}

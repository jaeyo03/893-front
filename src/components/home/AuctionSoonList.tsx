"use client";

import { useEffect, useState } from "react";

export type AuctionSoonItemProps = {
  auctionId: number;
  title: string;
  description: string;
  scrapCount: number;
  thumbnailUrl: string;
  itemCondition:
    | "brand_new"
    | "like_new"
    | "gently_used"
    | "heavily_used"
    | "damaged";
  basePrice: number;
  leftTime: string;
};

const itemConditionLabel: Record<
  AuctionSoonItemProps["itemCondition"],
  string
> = {
  brand_new: "새 상품 (미사용)",
  like_new: "사용감 없음",
  gently_used: "사용감 적음",
  heavily_used: "사용감 많음",
  damaged: "고장/파손 상품",
};

function parseLeftTimeStringToMs(timeStr: string) {
  const [h, m, s] = timeStr.split(":").map(Number);
  return ((h ?? 0) * 3600 + (m ?? 0) * 60 + (s ?? 0)) * 1000;
}

export default function AuctionSoonItem({
  title,
  description,
  scrapCount,
  thumbnailUrl,
  itemCondition,
  basePrice,
  leftTime,
}: AuctionSoonItemProps) {
  const [displayTime, setDisplayTime] = useState(leftTime);

  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const deadline = Date.now() + parseLeftTimeStringToMs(leftTime);

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, deadline - now);

      if (diff === 0) {
        setIsStarted(true);
        clearInterval(timer);
        return;
      }

      const hours = String(Math.floor(diff / 1000 / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(
        2,
        "0"
      );
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setDisplayTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [leftTime]);

  return (
    <div className="w-[1260px] h-[480px] rounded border overflow-hidden shadow-sm bg-white">
      <img
        src={thumbnailUrl}
        alt="상품 이미지"
        className="w-full h-[240px] object-cover"
      />

      <div className="p-4">
        <p className="text-[13px] font-semibold text-gray-500 text-center mb-2">
          {isStarted ? "경매 시작" : `시작까지 남은 시간 ${displayTime}`}
        </p>
        <p className="text-[14px] font-semibold truncate mb-1">{title}</p>
        <p className="text-[14px] text-gray-600">
          {itemConditionLabel[itemCondition]}
        </p>

        <p className=" text-sky-500 mt-1 text-[16px] font-semibold">
          스크랩 수 {scrapCount}
        </p>

        <div className="mt-3 text-xs text-gray-500 truncate">{description}</div>
        <p className="text-sm font-semibold mt-1">
          시작가 {basePrice.toLocaleString()}원
        </p>

        <button className="mt-3 w-full py-1.5 text-sm rounded bg-gray-200 text-gray-400 cursor-not-allowed">
          지금 참여하기
        </button>
      </div>
    </div>
  );
}
// 유틸 함수 분리하기

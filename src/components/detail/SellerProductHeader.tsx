// ProductHeader.tsx
'use client';
import { Button } from "../ui/button";

interface ProductHeaderProps {
  title: string;
  mainCategory: string;
  subCategory: string;
  lastCategory: string;
}

export default function SellerProductHeader({
  title,
  mainCategory,
  subCategory,
  lastCategory,
}: ProductHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="flex items-center gap-1 text-gray-600">
        <Button variant="default" className="w-[72px] h-[32px] bg-main hover:bg-main text-white text-sm">
          수정하기
        </Button>
        </p>
      </div>
      <p className="text-xs font-thin">
        {mainCategory} &gt; {subCategory} &gt; {lastCategory}
      </p>
    </div>
  );
}

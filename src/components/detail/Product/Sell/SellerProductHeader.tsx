'use client';
import { Button } from "@/components/ui/button";
import { Product } from "@/types/productData";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
  product: Product;
  title: string;
  mainCategory: string;
  subCategory: string;
  lastCategory: string;
  auctionId: number;
}

export default function SellerProductHeader({
  product,
  title,
  mainCategory,
  subCategory,
  lastCategory,
  auctionId,
}: ProductHeaderProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/edit/${auctionId}`);
  };

  // ⏱️ 30분 이하 남았는지 판단
  const isEditDisabled = (() => {
    const start = new Date(product.startTime).getTime();
    const now = new Date().getTime();
    const diffInMinutes = (start - now) / (1000 * 60); // 차이를 분으로 계산
    return diffInMinutes <= 30;
  })();

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
        <p className="font-thin">
          {mainCategory} &gt; {subCategory} &gt; {lastCategory}
        </p>
        <Button
          variant="default"
          className={`w-[72px] h-[32px] text-white text-sm ${
            isEditDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-main'
          }`}
          onClick={handleClick}
          disabled={isEditDisabled}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
}

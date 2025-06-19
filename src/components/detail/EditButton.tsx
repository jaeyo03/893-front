'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Product } from "@/types/productData";

interface EditButtonProps {
  product: Product;
}

export default function EditButton({ product }: EditButtonProps) {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/edit/${product.auctionId}`);
  };

  const isEditDisabled = (() => {
    const start = new Date(product.startTime).getTime();
    const now = Date.now();
    const diffInMinutes = (start - now) / (1000 * 60);
    return diffInMinutes <= 30;
  })();
  
  return (
    <Button
      variant="default"
      className={`w-[72px] h-[32px] text-white text-sm ${
        isEditDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-main'
      }`}
      onClick={handleEditClick}
      disabled={isEditDisabled}
    >
      수정하기
    </Button>
  )
}
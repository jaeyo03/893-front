// ProductHeader.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/types/productData';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({
  product,
}: ProductHeaderProps) {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/edit/${product.auctionId}`);
  };

  const isEditDisabled = (() => {
    const start = new Date(product.startTime).getTime();
    const now = new Date().getTime();
    const diffInMinutes = (start - now) / (1000 * 60);
    return diffInMinutes <= 30;
  })();

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{product.title}</h1>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
        <p className="font-thin">
          {product.category.mainCategory} &gt; {product.category.subCategory} &gt; {product.category.detailCategory}
        </p>
        {product.isSeller ? (
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
        ) : (
          <p className="flex items-center gap-1">
          <User className="w-4 h-4" />
            {product.sellerEmailMasked}
          </p>
        )}
      </div>
    </div>
  );
}
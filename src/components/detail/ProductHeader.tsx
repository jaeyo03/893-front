import { Product } from '@/types/productData';
import { User } from 'lucide-react';
import EditButton from './EditButton';

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({
  product,
}: ProductHeaderProps) {

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
          <EditButton product={product} />
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
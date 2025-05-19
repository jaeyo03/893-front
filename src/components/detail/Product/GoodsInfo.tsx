import { ItemCondition } from "@/types/productData";

interface GoodsInfoProps {
  description: string;
  itemCondition: ItemCondition;
}

export default function GoodsInfo({ description, itemCondition }: GoodsInfoProps) {
  const conditionMap: Record<ItemCondition, { label: string; badgeColor: string }> = {
    brand_new: {
      label: '새 상품',
      badgeColor: 'bg-green-100 text-green-800',
    },
    like_new: {
      label: '거의 새 상품',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    gently_used: {
      label: '사용감 적음',
      badgeColor: 'bg-yellow-100 text-yellow-800',
    },
    heavily_used: {
      label: '사용감 많음',
      badgeColor: 'bg-orange-100 text-orange-800',
    },
    damaged: {
      label: '손상 있음',
      badgeColor: 'bg-red-100 text-red-800',
    },
  };

  const { label: conditionLabel, badgeColor } = conditionMap[itemCondition] || {
    label: '기타',
    badgeColor: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="pt-10 px-5">
      <h2 className="mb-2 text-lg font-medium text-gray-700">상품 상세 정보</h2>
      <div className="p-4 text-sm text-gray-800 whitespace-pre-line rounded-lg space-y-2">
        <p>{description}</p>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${badgeColor}`}
        >
          {conditionLabel}
        </span>
      </div>
    </div>
  );
}


interface GoodsInfoProps{
  description:string;
  itemCondition: 'brand_new' | 'used' | string;
}
export default function GoodsInfo({ description,itemCondition } : GoodsInfoProps) {

  const conditionLabel = 
    itemCondition === 'brand_new' ? '새 상품' :
    itemCondition === 'used' ? '중고상품' :
    '기타';

  const badgeColor =
    itemCondition === 'brand_new' ? 'bg-green-100 text-green-800' :
    itemCondition === 'used' ? 'bg-yellow-100 text-yellow-800' :
    'bg-gray-100 text-gray-600';

  return (
    <div className="pt-10 px-5">
      <h2 className="mb-2 text-lg font-medium text-gray-700">상품 상세 정보</h2>
      <div className="p-4 text-sm text-gray-800 whitespace-pre-line rounded-lg space-y-2">
        <p>
          {description || '해당 상품은 아디다스 신발입니다.\n 사주세요.. '}
        </p>
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${badgeColor}`}>
          {conditionLabel}
        </span>
      </div>
    </div>
  );
}

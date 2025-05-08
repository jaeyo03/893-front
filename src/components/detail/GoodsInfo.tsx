
interface GoodsInfoProps{
  description:string;
}
export default function GoodsInfo({ description } : GoodsInfoProps) {

  return (
    <div className="pt-10 pl-5">
      <h2 className="mb-2 text-lg font-medium text-gray-700">상품 상세 정보</h2>
      <div className="p-2 text-sm text-gray-800 whitespace-pre-line rounded-lg ">
        {description || '해당 상품은 아디다스 신발입니다.\n 사주세요.. '}
      </div>
    </div>
  );
}

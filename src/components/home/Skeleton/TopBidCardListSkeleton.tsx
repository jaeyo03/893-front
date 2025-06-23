// components/home/TopBidCardListSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function TopBidCardListSkeleton() {
  return (
    <div className="flex gap-4 flex-wrap">
      {[1, 2, 3, 4, 5].map((_, idx) => (
        <div
          key={idx}
          className="w-[234px] rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm"
        >
          {/* 이미지 영역 */}
          <Skeleton height={130} width="100%" />

          <div className="px-3 py-2 space-y-1">
            {/* 가격 라벨 */}
            <div className="flex justify-between">
              <Skeleton height={13} width={64} />
              <Skeleton height={13} width={64} />
            </div>
            {/* 제목 */}
            <Skeleton height={12} width={150} />
            {/* 상승률 */}
            <div className="text-[12px] font-bold flex gap-2">
              <Skeleton height={12} width={80} />
              <Skeleton height={11} width={64} />
            </div>
            {/* 낙찰자 */}
            <Skeleton height={12} width={80} />
            {/* 입찰 수 */}
            <Skeleton height={12} width={48} />
          </div>
        </div>
      ))}
    </div>
  );
}

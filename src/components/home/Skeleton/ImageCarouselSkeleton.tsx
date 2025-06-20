// components/home/ImageCarouselSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ImageCarouselSkeleton() {
  return (
    <div className="relative w-full h-[250px]">
      {/* Swiper 캐러셀의 각 슬라이드에 대해 스켈레톤 UI 표시 */}
      <div className="relative w-full h-full">
        <Skeleton className="w-full h-full" />
        {/* 로딩 중 라벨은 숨길 수 있음 */}
      </div>

      {/* 이전/다음 버튼 */}
      <div className="absolute bottom-9 right-1 -translate-x-1/2 z-20 flex gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>

      {/* 진행 바 */}
      <div className="absolute -bottom-3 left-0 w-full h-[4px] z-5">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}

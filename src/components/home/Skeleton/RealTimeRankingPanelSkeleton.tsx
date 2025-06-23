// components/home/RealTimeRankingPanelSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function RealTimeRankingPanelSkeleton() {
  return (
    <div className="w-[435px] bg-white p-4">
      <h2 className="text-xl font-bold mb-4">
        <Skeleton height={30} width="50%" />
      </h2>

      {/* 탭 */}
      <div className="flex gap-2 mb-4">
        <Skeleton height={30} width="80px" />
        <Skeleton height={30} width="80px" />
      </div>

      {/* 리스트 또는 Empty */}
      <div className="space-y-4">
        {[1, 2, 3,4,5,6,7,8].map((_, idx) => (
          <div
            key={idx}
            className="flex gap-3 pt-3 items-start cursor-pointer rounded px-2"
          >
            <Skeleton height={24} width="40px" />

            <div className="flex-1 w-[190px] h-[80px]">
              <Skeleton height={20} width="100%" />
              <Skeleton height={15} width="60%" className="mt-2" />
              <Skeleton height={15} width="40%" className="mt-2" />
              <Skeleton height={20} width="70%" className="mt-2" />
            </div>

            <div className="flex-shrink-0 ml-auto">
              <Skeleton height={80} width={160} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

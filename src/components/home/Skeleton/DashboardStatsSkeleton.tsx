// components/home/DashboardStatsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardStatsSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 animate-pulse">
      {[1, 2, 3].map((_, idx) => (
        <Skeleton key={idx} className="p-4 w-[246px] h-[100px]">
          <Skeleton height={20} width="100%" />
          <Skeleton height={40} width="80%" className="mt-4" />
        </Skeleton>
      ))}
    </div>
  );
}
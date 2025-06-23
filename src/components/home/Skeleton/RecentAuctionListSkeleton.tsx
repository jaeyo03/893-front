// components/home/RecentAuctionListSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentAuctionListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3,4,5,6].map((_, idx) => (
        <div key={idx} className="relative overflow-hidden transition border-none rounded-lg cursor-pointer">
          <div className="absolute p-4 right-1 top-24">
            <Skeleton height={18} width="48px" className="bg-gray-400" />
          </div>
          <div className="p-2 bg-white rounded-xl">
            <Skeleton height={130} width="100%" />
          </div>
          <div className="p-2">
            <Skeleton height={20} width="100%" className="mb-2" />
            <Skeleton height={16} width="80%" className="mb-2" />
            <Skeleton height={16} width="60%" className="mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

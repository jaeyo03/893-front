import { Skeleton } from "@/components/ui/skeleton";

export default function AuctionSoonItemListSkeleton() {
  return (
    <div className="flex justify-start gap-6">
      {[1, 2, 3].map((_, idx) => (
        <div key={idx} className="w-full max-w-[400px] rounded border overflow-hidden shadow-sm">
          <div className="relative w-full h-[240px]">
            <Skeleton className="object-cover" height="100%" width="100%" />
          </div>

          <div className="p-4">
            <Skeleton className="mb-2" height={14} width="60%" />
            <Skeleton className="mb-1" height={18} width="80%" />
            <Skeleton className="mb-1" height={14} width="50%" />
            <Skeleton className="mb-1" height={14} width="40%" />
            <Skeleton className="mb-2" height={16} width="60%" />
            <Skeleton className="w-full mt-4 h-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

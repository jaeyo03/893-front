import { Skeleton } from "@/components/ui/skeleton";

export default function BestByCategorySkeleton() {
  return (
    <div className="p-4 overflow-x-auto">
      <div className="relative mb-6" role="tablist" data-testid="category-tabs">
        <Skeleton className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white rounded-full" height={30} width={40} />
        <div className="flex gap-3 px-8 overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth">
          {[1, 2, 4, 5, 6, 7, 8].map((_, idx) => (
            <Skeleton
              key={idx}
              className="shrink-0 px-4 py-2 rounded-full border text-sm font-medium"
              height={30}
              width="80px"
            />
          ))}
        </div>
        <Skeleton className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white rounded-full" height={30} width={40} />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((_, idx) => (
          <div
            key={idx}
            className="border rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
          >
            <div className="relative">
              <Skeleton height={130} width="100%" />
            </div>
            <div className="p-3">
              <Skeleton height={18} width="80%" className="mb-2" />
              <Skeleton height={14} width="60%" />
            </div>
            <div className="flex items-center px-2 pb-2 gap-2">
              <Skeleton height={20} width="60px" />
              <Skeleton height={20} width="60px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

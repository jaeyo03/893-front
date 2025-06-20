import { Loader2 } from "lucide-react";

export default function SearchLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-28 w-28 text-main animate-spin mb-8" />
      <h2 className="text-2xl font-semibold mb-2">로딩중</h2>
      <div className="grid text-muted-foreground text-center max-w-md">
        <p>검색 결과를 불러오고 있습니다.</p>
      </div>
    </div>
  )
}
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-16 w-16 text-main animate-spin mb-8" />
      <h2 className="text-2xl font-semibold mb-2">로딩중</h2>
      <div className="grid text-muted-foreground text-center max-w-md">
        <p>잠시만 기다려주세요</p>
      </div>
    </div>
  );
}
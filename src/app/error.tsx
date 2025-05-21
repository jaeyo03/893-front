"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러를 에러 보고 서비스에 기록
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">500</h1>
        <h2 className="text-2xl font-semibold mb-4">문제가 발생했습니다!</h2>
        <p className="text-muted-foreground mb-8">
          예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => reset()}>다시 시도</Button>
          <Button variant="outline" asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
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
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
          <div className="flex flex-col items-center max-w-md text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <AlertOctagon className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              심각한 오류
            </h1>
            <h2 className="text-2xl font-semibold mb-4">애플리케이션 충돌</h2>
            <p className="text-muted-foreground mb-8">
              애플리케이션에 심각한 오류가 발생했습니다. 우리 팀에 알림이
              전송되었습니다.
            </p>
            <Button onClick={() => reset()}>다시 시도</Button>
          </div>
        </div>
      </body>
    </html>
  );
}

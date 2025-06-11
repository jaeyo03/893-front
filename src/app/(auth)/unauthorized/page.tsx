import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <ShieldAlert className="h-10 w-10 text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">401</h1>
        <h2 className="text-2xl font-semibold mb-4">인증되지 않음</h2>
        <p className="text-muted-foreground mb-8">
          이 페이지에 접근할 권한이 없습니다. 계속하려면 로그인해 주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/login">로그인</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/Header";
import GlobalFCMSetup from "@/components/GlobalFCMSetup";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "팔구삼 893",
  description: "중고 경매 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} font-pretendard grid justify-center`}
      >
        <GlobalFCMSetup /> {/* FCM 설정 -> 로그인될때 불러오게 수정예정 */}
        <header className="sticky top-0 z-50 w-full border-b bg-background">
          <div className="container flex h-16 items-center">
            <Header />
            <div className="ml-auto flex items-center space-x-4">
              <Link href="/auth/register">
                <Button size="sm" className="bg-main hover:bg-mainLight">
                  로그인
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <div className="w-[1280px]">{children}</div>
      </body>
    </html>
  );
}

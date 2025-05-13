import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { cookies } from 'next/headers'

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
  const cookieStore = cookies()
  const isLoggedIn = cookieStore.has('accessToken')
  console.log(isLoggedIn)
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} font-pretendard grid justify-center`}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-background">
          <div className="container flex h-16 items-center">
            <Header isLoggedIn={isLoggedIn} />
          </div>
        </header>
        <div className="w-[1280px]">
          {children}
        </div>
      </body>
    </html>
  );
}

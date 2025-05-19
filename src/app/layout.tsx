import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import GlobalFCMSetup from "@/components/GlobalFCMSetup";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

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
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.has("accessToken");
  console.log(isLoggedIn);
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} font-pretendard grid justify-center`}
      >
        {isLoggedIn && <GlobalFCMSetup />}
        <header className="sticky top-0 z-50 w-full border-b bg-background">
          <div className="container flex h-16 items-center">
            <Header isLoggedIn={isLoggedIn} />
          </div>
        </header>
        <div className="w-[1280px]">{children}</div>

        {/* Toaster 컴포넌트 추가 */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              zIndex: 9999,
            },
          }}
        />
      </body>
    </html>
  );
}

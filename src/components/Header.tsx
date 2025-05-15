"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Gavel, Bell, User, Menu, X, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import NotificationDropdown from "@/components/notification/NotificationDropdown";

export function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const router = useRouter();

  const notificationWrapperRef = useRef<HTMLDivElement | null>(null);

  // 외부 클릭 시 알림창 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationWrapperRef.current &&
        !notificationWrapperRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const routes: {
    href: string;
    label: string;
    icon: JSX.Element;
    active?: boolean;
  }[] = [
    {
      href: "/",
      label: "홈",
      icon: <Home className="w-4 h-4 mr-2" />,
      active: pathname === "/",
    },
    {
      href: "/search",
      label: "경매 검색",
      icon: <Search className="w-4 h-4 mr-2" />,
      active: pathname === "/search" || pathname.startsWith("/search/"),
    },
    {
      href: "/profile",
      label: "마이페이지",
      icon: <User className="w-4 h-4 mr-2" />,
      active: pathname === "/profile" || pathname.startsWith("/profile/"),
    },
  ];

  if (isLoggedIn) {
    routes.push({
      href: "/notifications",
      label: "알림",
      icon: <Bell className="w-4 h-4 mr-2" />,
    });
  }

  const handleLogout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <>
      <div className="relative flex items-center">
        <Link href="/" className="flex items-center mr-6 space-x-2">
          <Gavel className="w-6 h-6" />
          <span className="font-bold">팔구삼</span>
        </Link>

        <div className="items-center hidden space-x-1 md:flex">
          {routes.map((route) =>
            route.href === "/notifications" ? (
              <div key={route.href} className="relative">
                <button
                  onClick={() => {
                    setIsNotificationOpen((prev) => !prev); // 알림 드롭다운 열기/닫기
                    setIsMenuOpen(false); // 모바일 메뉴 닫기
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    isNotificationOpen
                      ? "bg-main text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {route.icon}
                  {route.label}
                </button>

                {isNotificationOpen && (
                  <NotificationDropdown
                    onClose={() => setIsNotificationOpen((prev) => !prev)}
                  />
                )}
              </div>
            ) : (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  route.active
                    ? "bg-main text-primary-foreground"
                    : "hover:bg-muted"
                )}
                onClick={() => {
                  setIsNotificationOpen(false); // 알림 드롭다운 닫기
                  setIsMenuOpen(false); // 모바일 메뉴 닫기
                }}
              >
                {route.icon}
                {route.label}
              </Link>
            )
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="ml-auto md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 z-50 border-b top-16 bg-background md:hidden">
            <div className="container py-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium",
                    route.active
                      ? "bg-primary/10 text-primary"
                      : "text-secondary"
                  )}
                  onClick={() => {
                    setIsNotificationOpen(false); // 다른 메뉴 누르면 알림 드롭다운 닫기
                    setIsMenuOpen(false); // 모바일 메뉴도 닫기
                  }}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="ml-auto flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link
              href="/registration"
              className="text-sm font-medium cursor-pointer hover:underline"
            >
              상품 등록하기
            </Link>
            <Button
              size="sm"
              className="bg-main hover:bg-mainLight"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <Link href="/login">
            <Button size="sm" className="bg-main hover:bg-mainLight">
              로그인
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}

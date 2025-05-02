"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Gavel, Bell, User, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "홈",
      icon: <Home className="h-4 w-4 mr-2" />,
      active: pathname === "/",
    },
    {
      href: "/auctions",
      label: "경매 검색",
      icon: <Gavel className="h-4 w-4 mr-2" />,
      active: pathname === "/auctions" || pathname.startsWith("/auctions/"),
    },
    {
      href: "/notifications",
      label: "알림",
      icon: <Bell className="h-4 w-4 mr-2" />,
      active: pathname === "/notifications",
    },
    {
      href: "/profile",
      label: "마이페이지",
      icon: <User className="h-4 w-4 mr-2" />,
      active: pathname === "/profile" || pathname.startsWith("/profile/"),
    },
  ]

  return (
    <div className="flex items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Gavel className="h-6 w-6" />
        <span className="font-bold">팔구삼</span>
      </Link>
      <div className="hidden md:flex items-center space-x-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              route.active ? "bg-main text-primary-foreground" : "hover:bg-muted",
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </div>
      <div className="md:hidden ml-auto">
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b z-50 md:hidden">
          <div className="container py-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium",
                  route.active ? "bg-primary/10 text-primary" : "text-secondary",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { QrCode, Bell } from "lucide-react"
import type { User } from "@/app/page"

interface MobileHeaderProps {
  onProfileClick: () => void
  onQRClick: () => void
  onNotificationsClick: () => void
  unreadCount: number
  user?: User | null
}

export function MobileHeader({
  onProfileClick,
  onQRClick,
  onNotificationsClick,
  unreadCount,
  user,
}: MobileHeaderProps) {
  const userInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"

  return (
    <header className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and QR */}
        <div className="flex items-center gap-3">
          <button onClick={onQRClick} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
            <QrCode className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <svg className="w-7 h-7" viewBox="0 0 48 48">
              <path
                fill="#4285F4"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#EA4335"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            <span className="text-lg font-semibold text-foreground">Pay</span>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1">
          <button onClick={onNotificationsClick} className="relative p-2 hover:bg-muted rounded-full transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          <ThemeToggle />
          <button onClick={onProfileClick} className="p-1 ml-1">
            <Avatar className="w-8 h-8 border-2 border-blue-600/30 hover:border-blue-600 transition-colors">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-semibold dark:bg-blue-900 dark:text-blue-300">
                {userInitial}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  )
}

"use client"

import { Home, Receipt, Wallet, User, Settings, QrCode, ScanLine, Gift, Bell, LogOut, DollarSign } from "lucide-react"
import type { Screen, User as UserType } from "@/app/page"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface DesktopSidebarProps {
  currentScreen: Screen
  setCurrentScreen: (screen: Screen) => void
  onQRClick: () => void
  onScanClick: () => void
  user?: UserType | null
  onLogout?: () => void
}

export function DesktopSidebar({
  currentScreen,
  setCurrentScreen,
  onQRClick,
  onScanClick,
  user,
  onLogout,
}: DesktopSidebarProps) {
  const navItems = [
    { id: "home" as Screen, icon: Home, label: "Home" },
    { id: "transfer" as Screen, icon: Receipt, label: "Pay" },
    { id: "business" as Screen, icon: Wallet, label: "Bills & Offers" },
    { id: "bank-balance" as Screen, icon: DollarSign, label: "Bank Balance" },
    { id: "rewards" as Screen, icon: Gift, label: "Rewards" },
    { id: "profile" as Screen, icon: User, label: "Profile" },
  ]

  const userInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-card border-r border-border h-screen sticky top-0 shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <svg className="w-10 h-10" viewBox="0 0 48 48">
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
          <span className="text-2xl font-semibold text-foreground">Pay</span>
        </div>
      </div>

      {user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-blue-600/30">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              currentScreen === item.id ||
              (item.id === "home" && (currentScreen === "payment" || currentScreen === "history")) ||
              (item.id === "transfer" && currentScreen === "business")

            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentScreen(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 pt-4 border-t border-border space-y-1">
          <button
            onClick={onScanClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ScanLine className="w-5 h-5" />
            Scan & Pay
          </button>
          <button
            onClick={onQRClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <QrCode className="w-5 h-5" />
            My QR Code
          </button>
          <button
            onClick={() => setCurrentScreen("notifications")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Bell className="w-5 h-5" />
            Notifications
          </button>
        </div>
      </nav>

      {/* Footer with theme toggle and logout */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-muted"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

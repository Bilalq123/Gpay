"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ChevronLeft,
  MoreVertical,
  Building2,
  CreditCard,
  Gift,
  Settings,
  HelpCircle,
  Share2,
  ChevronRight,
  Shield,
  Bell,
  Lock,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import type { User } from "@/app/page"

interface ProfileScreenProps {
  onBack: () => void
  totalRewards: number
  user?: User | null
  onLogout?: () => void
}

export function ProfileScreen({ onBack, totalRewards, user, onLogout }: ProfileScreenProps) {
  const { theme, setTheme } = useTheme()
  const userInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"
  const upiId = user?.email ? `${user.email.split("@")[0]}@gpay` : "user@gpay"

  return (
    <div className="flex flex-col bg-background">
      {/* Header - only show back on mobile */}
      <div className="flex items-center justify-between px-4 py-3 lg:py-6 lg:border-b lg:border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors lg:hidden">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="hidden lg:block text-2xl font-semibold text-foreground">Profile</h1>
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Profile Info - Using logged in user data */}
      <div className="px-4 lg:px-6 py-6 flex items-start gap-4">
        <div className="flex-1">
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground">{user?.name || "User"}</h2>
          <p className="text-sm lg:text-base text-muted-foreground">{user?.email || "user@example.com"}</p>
          <p className="text-sm lg:text-base text-muted-foreground">{upiId}</p>
        </div>
        <Avatar className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-border">
          <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl lg:text-3xl font-semibold dark:bg-blue-900 dark:text-blue-300">
            {userInitial}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Rewards */}
      <div className="mx-4 lg:mx-6 py-4 flex items-center gap-4 border-y border-border">
        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
          <span className="text-xl lg:text-2xl">🏆</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-semibold text-foreground">₹{totalRewards}</span>
            <span className="text-sm lg:text-base text-muted-foreground">Rewards Earned</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-4 lg:px-6 py-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm lg:text-base text-muted-foreground">Set up payment methods 1/2</span>
          <ChevronRight className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex gap-6 lg:gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl border border-border flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <Building2 className="w-6 h-6 lg:w-7 lg:h-7 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-xs lg:text-sm font-medium text-foreground">Bank account</p>
              <p className="text-xs text-muted-foreground">1 account</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl border border-border flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <CreditCard className="w-6 h-6 lg:w-7 lg:h-7 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-xs lg:text-sm font-medium text-foreground">Pay businesses</p>
              <p className="text-xs text-muted-foreground">Debit/credit card</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Friends */}
      <div className="px-4 lg:px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-muted flex items-center justify-center">
            <Gift className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm lg:text-base font-medium text-foreground">Invite friends, get rewards</p>
            <p className="text-xs lg:text-sm text-muted-foreground">Share this code abd5j</p>
          </div>
          <button className="text-blue-600 text-sm lg:text-base font-medium flex items-center gap-1 hover:underline">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 lg:px-6 py-4">
        <button className="w-full flex items-center gap-4 py-4 hover:bg-muted rounded-xl px-3 transition-colors">
          <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
          <span className="text-sm lg:text-base font-medium text-foreground">Privacy & Security</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
        </button>
        <button className="w-full flex items-center gap-4 py-4 hover:bg-muted rounded-xl px-3 transition-colors">
          <Lock className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
          <span className="text-sm lg:text-base font-medium text-foreground">UPI PIN</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
        </button>
        <button className="w-full flex items-center gap-4 py-4 hover:bg-muted rounded-xl px-3 transition-colors">
          <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
          <span className="text-sm lg:text-base font-medium text-foreground">Notification Preferences</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
        </button>
        <button className="w-full flex items-center gap-4 py-4 hover:bg-muted rounded-xl px-3 transition-colors">
          <Settings className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
          <span className="text-sm lg:text-base font-medium text-foreground">Settings</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full flex items-center gap-4 py-4 hover:bg-muted rounded-xl px-3 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
          ) : (
            <Moon className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
          )}
          <span className="text-sm lg:text-base font-medium text-foreground">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
          <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
        </button>
        <button className="w-full flex items-center gap-4 py-4 hover:bg-muted rounded-xl px-3 transition-colors">
          <HelpCircle className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
          <span className="text-sm lg:text-base font-medium text-foreground">Help and feedback</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 py-4 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl px-3 transition-colors mt-4"
          >
            <LogOut className="w-5 h-5 lg:w-6 lg:h-6 text-red-500" />
            <span className="text-sm lg:text-base font-medium text-red-500">Logout</span>
          </button>
        )}
      </div>
    </div>
  )
}

"use client"

import { Home, Receipt, Wallet, User } from "lucide-react"
import type { Screen } from "@/app/page"

interface BottomNavProps {
  currentScreen: Screen
  setCurrentScreen: (screen: Screen) => void
}

export function BottomNav({ currentScreen, setCurrentScreen }: BottomNavProps) {
  const navItems = [
    { id: "home" as Screen, icon: Home, label: "Home" },
    { id: "transfer" as Screen, icon: Receipt, label: "Pay" },
    { id: "business" as Screen, icon: Wallet, label: "Bills" },
    { id: "profile" as Screen, icon: User, label: "Profile" },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border flex items-center justify-around px-4 z-50">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive =
          currentScreen === item.id ||
          (item.id === "home" && currentScreen === "payment") ||
          (item.id === "transfer" && currentScreen === "business")

        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              isActive ? "text-blue-600" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

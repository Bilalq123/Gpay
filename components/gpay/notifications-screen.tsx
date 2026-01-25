"use client"

import { ChevronLeft, Bell, CreditCard, Gift, Tag, Shield, Check } from "lucide-react"
import type { Notification } from "@/app/page"

interface NotificationsScreenProps {
  notifications: Notification[]
  onBack: () => void
  onMarkRead: (id: string) => void
}

export function NotificationsScreen({ notifications, onBack, onMarkRead }: NotificationsScreenProps) {
  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "payment":
        return CreditCard
      case "reward":
        return Gift
      case "offer":
        return Tag
      case "system":
        return Shield
      default:
        return Bell
    }
  }

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "payment":
        return "bg-green-500"
      case "reward":
        return "bg-amber-500"
      case "offer":
        return "bg-pink-500"
      case "system":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="ml-2 text-lg font-semibold text-foreground">Notifications</h1>
        </div>
        {unreadCount > 0 && <span className="text-sm text-muted-foreground">{unreadCount} unread</span>}
      </div>

      {/* Notifications List */}
      <div className="flex-1">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <Bell className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground">No notifications</p>
            <p className="text-sm text-muted-foreground">You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type)
              return (
                <button
                  key={notification.id}
                  onClick={() => onMarkRead(notification.id)}
                  className={`w-full flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors text-left ${
                    !notification.isRead ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 ${getIconColor(notification.type)} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">{notification.title}</p>
                      {!notification.isRead && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatTime(notification.date)}</p>
                  </div>
                  {notification.isRead && <Check className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ChevronLeft, Gift, Sparkles, Clock, Check } from "lucide-react"
import type { Reward } from "@/app/page"

interface RewardsScreenProps {
  rewards: Reward[]
  totalRewards: number
  onBack: () => void
  onScratch: (rewardId: string) => void
}

export function RewardsScreen({ rewards, totalRewards, onBack, onScratch }: RewardsScreenProps) {
  const [scratchingId, setScratchingId] = useState<string | null>(null)

  const handleScratch = (rewardId: string) => {
    setScratchingId(rewardId)
    setTimeout(() => {
      onScratch(rewardId)
      setScratchingId(null)
    }, 1500)
  }

  const formatTimeLeft = (date: Date) => {
    const diff = date.getTime() - Date.now()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days > 0) return `${days} days left`
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours > 0) return `${hours} hours left`
    return "Expiring soon"
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-border bg-gradient-to-r from-amber-500 to-orange-500">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-white">Rewards & Scratch Cards</h1>
      </div>

      {/* Total Rewards */}
      <div className="p-6 bg-gradient-to-br from-amber-500 to-orange-500">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-amber-100 text-sm">Total Rewards Earned</p>
            <p className="text-4xl font-bold text-white">₹{totalRewards}</p>
          </div>
        </div>
      </div>

      {/* Rewards List */}
      <div className="flex-1 p-4 lg:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Rewards</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`relative rounded-2xl overflow-hidden border border-border ${
                reward.isScratched
                  ? "bg-muted/50"
                  : "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30"
              }`}
            >
              {/* Scratch Card */}
              {reward.type === "scratch" && !reward.isScratched ? (
                <button
                  onClick={() => handleScratch(reward.id)}
                  disabled={scratchingId === reward.id}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatTimeLeft(reward.expiresAt)}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{reward.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>

                  {scratchingId === reward.id ? (
                    <div className="h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center animate-pulse">
                      <span className="text-white font-medium">Scratching...</span>
                    </div>
                  ) : (
                    <div className="h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center cursor-pointer hover:from-amber-500 hover:to-orange-500 transition-colors">
                      <span className="text-white font-medium">Tap to Scratch</span>
                    </div>
                  )}
                </button>
              ) : (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        reward.type === "cashback"
                          ? "bg-green-500"
                          : reward.type === "coupon"
                            ? "bg-purple-500"
                            : "bg-amber-500"
                      }`}
                    >
                      {reward.isScratched && reward.type === "scratch" ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <Gift className="w-6 h-6 text-white" />
                      )}
                    </div>
                    {!reward.isScratched && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTimeLeft(reward.expiresAt)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{reward.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                  {reward.amount && (
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {reward.isScratched && reward.type === "scratch" ? "Won " : ""}₹{reward.amount}
                    </p>
                  )}
                  {reward.discount && (
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{reward.discount} OFF</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

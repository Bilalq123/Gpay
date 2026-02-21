"use client"

import { ChevronLeft, Award, Zap, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { LoyaltyTier, Referral } from "@/app/page"

interface LoyaltyDashboardScreenProps {
  loyaltyTier: LoyaltyTier
  referral: Referral
  onBack: () => void
}

const TIER_ICONS: Record<string, React.ReactNode> = {
  bronze: <Award className="w-12 h-12" />,
  silver: <Award className="w-12 h-12" />,
  gold: <Crown className="w-12 h-12" />,
  platinum: <Crown className="w-12 h-12" />,
}

const TIER_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  bronze: {
    bg: "from-amber-700 to-amber-800",
    text: "text-amber-100",
    accent: "text-amber-600",
  },
  silver: {
    bg: "from-slate-500 to-slate-600",
    text: "text-slate-100",
    accent: "text-slate-600",
  },
  gold: {
    bg: "from-yellow-500 to-amber-600",
    text: "text-yellow-100",
    accent: "text-yellow-600",
  },
  platinum: {
    bg: "from-blue-400 to-purple-500",
    text: "text-blue-100",
    accent: "text-blue-600",
  },
}

const TIER_THRESHOLDS = {
  bronze: { min: 0, max: 999, nextTier: "Silver", nextThreshold: 1000 },
  silver: { min: 1000, max: 2499, nextTier: "Gold", nextThreshold: 2500 },
  gold: { min: 2500, max: 4999, nextTier: "Platinum", nextThreshold: 5000 },
  platinum: { min: 5000, max: Infinity, nextTier: null, nextThreshold: null },
}

export function LoyaltyDashboardScreen({ loyaltyTier, referral, onBack }: LoyaltyDashboardScreenProps) {
  const colors = TIER_COLORS[loyaltyTier.tier]
  const threshold = TIER_THRESHOLDS[loyaltyTier.tier as keyof typeof TIER_THRESHOLDS]
  const pointsUntilNextTier = threshold.nextThreshold ? threshold.nextThreshold - loyaltyTier.points : null
  const progressToNextTier = threshold.nextThreshold
    ? ((loyaltyTier.points - threshold.min) / (threshold.nextThreshold - threshold.min)) * 100
    : 100

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Loyalty Program</h1>
      </div>

      {/* Current Tier Card */}
      <div className={`m-4 bg-gradient-to-br ${colors.bg} rounded-2xl p-8 text-white shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className={`${colors.text} text-sm mb-2`}>Your Current Tier</p>
            <p className="text-4xl font-bold capitalize">{loyaltyTier.tier}</p>
          </div>
          <div className="text-6xl opacity-80">{TIER_ICONS[loyaltyTier.tier]}</div>
        </div>

        <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className={`${colors.text} text-sm`}>Total Points</span>
            <span className="text-3xl font-bold">{loyaltyTier.points.toLocaleString("en-IN")}</span>
          </div>

          {pointsUntilNextTier && (
            <div>
              <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden mb-2">
                <div className="bg-white h-full rounded-full transition-all" style={{ width: `${Math.min(progressToNextTier, 100)}%` }}></div>
              </div>
              <p className={`${colors.text} text-xs`}>
                {pointsUntilNextTier.toLocaleString("en-IN")} points until {threshold.nextTier}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4" />
          <span>Rewards Multiplier: {loyaltyTier.multiplier}x</span>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Benefits</h2>
        <div className="space-y-3 mb-6">
          {loyaltyTier.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
              <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.accent}`} />
              <div>
                <p className="font-medium text-foreground">{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Tiers */}
      <div className="px-4 mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">All Tiers</h3>
        <div className="space-y-3">
          {(["bronze", "silver", "gold", "platinum"] as const).map((tier) => {
            const tierThreshold = TIER_THRESHOLDS[tier]
            const tierColors = TIER_COLORS[tier]
            const isCurrent = tier === loyaltyTier.tier
            const isAchieved = loyaltyTier.points >= tierThreshold.min

            return (
              <div
                key={tier}
                className={`border-2 rounded-xl p-4 transition-all ${
                  isCurrent
                    ? `${tierColors.bg.replace("from", "border")} bg-gradient-to-r ${tierColors.bg} text-white`
                    : isAchieved
                      ? "border-green-600 bg-green-50 dark:bg-green-950"
                      : "border-border bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{TIER_ICONS[tier]}</div>
                    <div>
                      <p className={`font-bold capitalize text-lg ${isCurrent || isAchieved ? "text-foreground" : "text-muted-foreground"}`}>
                        {tier}
                      </p>
                      <p className={`text-sm ${isCurrent || isAchieved ? "text-muted-foreground" : "text-muted-foreground"}`}>
                        {tierThreshold.min.toLocaleString("en-IN")} - {tierThreshold.max === Infinity ? "∞" : tierThreshold.max.toLocaleString("en-IN")} points
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${isCurrent || isAchieved ? "text-foreground" : "text-muted-foreground"}`}>
                      {TIER_THRESHOLDS[tier as keyof typeof TIER_THRESHOLDS].nextTier || "Max"}
                    </p>
                    {isCurrent && (
                      <span className="inline-block px-2 py-1 bg-white text-black text-xs font-bold rounded mt-1">CURRENT</span>
                    )}
                    {isAchieved && !isCurrent && (
                      <span className="inline-block px-2 py-1 bg-green-600 text-white text-xs font-bold rounded mt-1">ACHIEVED</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Referral Section */}
      {referral.earnedAmount > 0 && (
        <div className="px-4 mb-6">
          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">Pending Referral Rewards</p>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-2">₹{referral.earnedAmount.toLocaleString("en-IN")}</p>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              Claim these rewards to add to your loyalty points
            </p>
          </div>
        </div>
      )}

      {/* How to Earn Points */}
      <div className="px-4 py-6 border-t border-border bg-muted/50 flex-1">
        <h3 className="font-semibold text-foreground mb-3">How to Earn Points</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <Zap className="w-4 h-4 text-foreground flex-shrink-0" />
            <span>Every transaction earns points</span>
          </div>
          <div className="flex gap-3">
            <Zap className="w-4 h-4 text-foreground flex-shrink-0" />
            <span>Referrals earn {(500 * loyaltyTier.multiplier).toFixed(0)} points (with {loyaltyTier.multiplier}x multiplier)</span>
          </div>
          <div className="flex gap-3">
            <Zap className="w-4 h-4 text-foreground flex-shrink-0" />
            <span>Reach higher tiers for better multipliers and exclusive benefits</span>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <div className="px-4 py-4">
        <Button onClick={onBack} variant="outline" className="w-full">
          Close
        </Button>
      </div>
    </div>
  )
}

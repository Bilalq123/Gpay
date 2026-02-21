"use client"

import { useState } from "react"
import { ChevronLeft, Copy, Gift, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Referral, ReferredUser } from "@/app/page"

interface ReferralScreenProps {
  referral: Referral
  onBack: () => void
  onAddReferredUser: (user: ReferredUser) => void
  onClaimReward: () => void
}

export function ReferralScreen({ referral, onBack, onAddReferredUser, onClaimReward }: ReferralScreenProps) {
  const [copied, setCopied] = useState(false)
  const [showAddUserForm, setShowAddUserForm] = useState(false)
  const [newUserName, setNewUserName] = useState("")
  const [newUserPhone, setNewUserPhone] = useState("")

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referral.referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAddReferredUser = () => {
    if (!newUserName || !newUserPhone) return

    const newUser: ReferredUser = {
      id: Date.now().toString(),
      name: newUserName,
      phone: newUserPhone,
      status: "pending",
      earnedReward: 250,
      joinDate: new Date(),
    }

    onAddReferredUser(newUser)
    setNewUserName("")
    setNewUserPhone("")
    setShowAddUserForm(false)
  }

  const rewardPerReferral = 500

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Refer & Earn</h1>
      </div>

      {/* Referral Code Section */}
      <div className="px-4 py-6">
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg mb-6">
          <p className="text-pink-100 text-sm mb-4">Your Referral Code</p>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4 flex items-center justify-between">
            <span className="text-2xl font-bold tracking-wider">{referral.referralCode}</span>
            <button
              onClick={handleCopyCode}
              className="p-2 hover:bg-white/30 rounded-lg transition-colors"
              title="Copy referral code"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          {copied && <p className="text-sm text-pink-100">Copied to clipboard!</p>}
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{referral.referredCount}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">Referred</p>
          </div>
          <div className="bg-green-50 dark:bg-green-950 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">₹{referral.earnedAmount.toLocaleString("en-IN")}</p>
            <p className="text-xs text-green-600 dark:text-green-400">Earned</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
            <Gift className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">₹{rewardPerReferral}</p>
            <p className="text-xs text-purple-600 dark:text-purple-400">Per Referral</p>
          </div>
        </div>

        {/* Claim Reward Button */}
        {referral.earnedAmount > 0 && (
          <Button
            onClick={onClaimReward}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white mb-6"
          >
            <Gift className="w-4 h-4 mr-2" />
            Claim ₹{referral.earnedAmount.toLocaleString("en-IN")} Reward
          </Button>
        )}
      </div>

      {/* Referred Users Section */}
      <div className="px-4 flex-1">
        <h2 className="text-lg font-semibold text-foreground mb-4">People You've Referred</h2>

        {!showAddUserForm ? (
          <>
            {referral.referredUsers.length > 0 ? (
              <div className="space-y-3 mb-4">
                {referral.referredUsers.map((user) => (
                  <div key={user.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === "verified" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"}`}
                      >
                        {user.status === "verified" ? "Verified" : "Pending"}
                      </span>
                    </div>
                    {user.status === "verified" && (
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Earned: ₹{user.earnedReward.toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
                <p className="text-muted-foreground text-center mb-4">No referrals yet. Share your code to earn rewards!</p>
              </div>
            )}

            <Button
              onClick={() => setShowAddUserForm(true)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            >
              Manually Add Referral
            </Button>
          </>
        ) : (
          <>
            {/* Add Referral Form */}
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter person's name"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleAddReferredUser}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                disabled={!newUserName || !newUserPhone}
              >
                Add Referral
              </Button>
              <Button
                onClick={() => setShowAddUserForm(false)}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>

      {/* How It Works Section */}
      <div className="px-4 py-6 border-t border-border bg-muted/50">
        <h3 className="font-semibold text-foreground mb-3">How It Works</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <span className="font-bold text-foreground w-6">1</span>
            <span>Share your referral code with friends</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-foreground w-6">2</span>
            <span>They sign up using your code</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-foreground w-6">3</span>
            <span>Both of you earn ₹{rewardPerReferral} each</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-foreground w-6">4</span>
            <span>Claim your rewards anytime</span>
          </div>
        </div>
      </div>
    </div>
  )
}

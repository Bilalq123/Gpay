"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Pause, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Subscription } from "@/app/page"

interface SubscriptionsScreenProps {
  subscriptions: Subscription[]
  onBack: () => void
  onAddSubscription: (subscription: Subscription) => void
  onCancelSubscription: (id: string) => void
  onPauseSubscription: (id: string) => void
}

export function SubscriptionsScreen({
  subscriptions,
  onBack,
  onAddSubscription,
  onCancelSubscription,
  onPauseSubscription,
}: SubscriptionsScreenProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    vendor: "",
    amount: "",
    frequency: "monthly" as const,
    category: "",
    autoRenew: true,
  })

  const activeSubscriptions = subscriptions.filter((s) => s.status === "active")
  const monthlySpend = activeSubscriptions.reduce((sum, s) => (s.frequency === "monthly" ? sum + s.amount : sum), 0)
  const nextBilling = activeSubscriptions.sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())[0]

  const handleAddSubscription = () => {
    if (!formData.name || !formData.amount) return

    const newSub: Subscription = {
      id: Date.now().toString(),
      name: formData.name,
      vendor: formData.vendor,
      amount: Number.parseFloat(formData.amount),
      frequency: formData.frequency,
      category: formData.category,
      autoRenew: formData.autoRenew,
      status: "active",
      startDate: new Date(),
      nextBillingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    }

    onAddSubscription(newSub)
    setFormData({
      name: "",
      vendor: "",
      amount: "",
      frequency: "monthly",
      category: "",
      autoRenew: true,
    })
    setShowAddForm(false)
  }

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Subscriptions</h1>
      </div>

      {!showAddForm ? (
        <>
          {/* Summary */}
          {activeSubscriptions.length > 0 && (
            <div className="px-4 py-4 space-y-3">
              <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Monthly Spend</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">₹{monthlySpend.toLocaleString("en-IN")}</p>
              </div>

              {nextBilling && (
                <div className="bg-purple-50 dark:bg-purple-950 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Next Billing</p>
                  <p className="text-lg font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(nextBilling.nextBillingDate).toLocaleDateString("en-IN")} - {nextBilling.name}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Subscriptions List */}
          <div className="px-4 py-4 flex-1">
            <h2 className="text-lg font-semibold text-foreground mb-4">Active Subscriptions</h2>
            {activeSubscriptions.length > 0 ? (
              <div className="space-y-3 mb-4">
                {activeSubscriptions.map((sub) => (
                  <div key={sub.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">{sub.name}</p>
                        <p className="text-sm text-muted-foreground">{sub.vendor}</p>
                      </div>
                      <span className="text-lg font-bold text-foreground">₹{sub.amount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground">{sub.frequency} • {sub.category}</span>
                      <span className="text-muted-foreground">
                        Next: {new Date(sub.nextBillingDate).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onPauseSubscription(sub.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <Pause className="w-4 h-4" />
                        <span className="text-sm font-medium">Pause</span>
                      </button>
                      <button
                        onClick={() => onCancelSubscription(sub.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span className="text-sm font-medium">Cancel</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground text-center mb-4">No active subscriptions. Add one to get started!</p>
              </div>
            )}

            {/* Paused/Cancelled Subscriptions */}
            {subscriptions.filter((s) => s.status !== "active").length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-muted-foreground mt-6 mb-3">Inactive Subscriptions</h3>
                <div className="space-y-2">
                  {subscriptions
                    .filter((s) => s.status !== "active")
                    .map((sub) => (
                      <div key={sub.id} className="bg-muted/50 rounded-lg p-3 flex justify-between items-center opacity-75">
                        <div>
                          <p className="text-sm font-medium text-foreground">{sub.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{sub.status}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">₹{sub.amount}/mo</span>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* Add Button */}
          <div className="px-4 py-4">
            <Button onClick={() => setShowAddForm(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Subscription
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Add Subscription Form */}
          <div className="px-4 py-4 flex-1">
            <h2 className="text-lg font-semibold text-foreground mb-4">Add New Subscription</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subscription Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Netflix"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Vendor/Provider</label>
                <input
                  type="text"
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                  placeholder="e.g., Netflix Inc."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="100"
                  step="10"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select category</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Music">Music</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Learning">Learning</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="autoRenew"
                  checked={formData.autoRenew}
                  onChange={(e) => setFormData({ ...formData, autoRenew: e.target.checked })}
                  className="rounded border-border"
                />
                <label htmlFor="autoRenew" className="text-sm text-foreground">
                  Auto-renew enabled
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 py-4 space-y-3">
            <Button
              onClick={handleAddSubscription}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!formData.name || !formData.amount}
            >
              Add Subscription
            </Button>
            <Button onClick={() => setShowAddForm(false)} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

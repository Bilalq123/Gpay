"use client"

import { ChevronLeft, AlertCircle, Shield, TrendingUp } from "lucide-react"

interface TransactionLimitsScreenProps {
  onBack: () => void
}

export function TransactionLimitsScreen({ onBack }: TransactionLimitsScreenProps) {
  const limits = [
    {
      type: "Per Transaction",
      limit: 100000,
      used: 0,
      description: "Maximum amount per single transaction",
    },
    {
      type: "Daily Limit",
      limit: 200000,
      used: 15420,
      description: "Total transactions allowed per day",
    },
    {
      type: "Weekly Limit",
      limit: 500000,
      used: 45890,
      description: "Total transactions allowed per week",
    },
    {
      type: "Monthly Limit",
      limit: 1000000,
      used: 182500,
      description: "Total transactions allowed per month",
    },
  ]

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Transaction Limits</h1>
      </div>

      {/* Info Banner */}
      <div className="p-4">
        <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">Secure Transactions</p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                These limits are set by your bank and UPI guidelines to protect your account from fraud.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Limits List */}
      <div className="flex-1 px-4 space-y-4">
        {limits.map((item) => {
          const percentage = (item.used / item.limit) * 100
          const isNearLimit = percentage >= 80

          return (
            <div key={item.type} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{item.type}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {isNearLimit && (
                  <div className="flex items-center gap-1 text-orange-500 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    Near limit
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isNearLimit ? "bg-orange-500" : "bg-green-500"}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Used: ₹{item.used.toLocaleString("en-IN")}</span>
                <span className="font-medium text-foreground">Limit: ₹{item.limit.toLocaleString("en-IN")}</span>
              </div>

              <div className="mt-2 text-sm text-muted-foreground">
                Remaining: ₹{(item.limit - item.used).toLocaleString("en-IN")}
              </div>
            </div>
          )
        })}
      </div>

      {/* Increase Limit Section */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-muted hover:bg-muted/80 rounded-xl text-foreground font-medium transition-colors">
          <TrendingUp className="w-5 h-5" />
          Request Limit Increase
        </button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Contact your bank to increase your UPI transaction limits
        </p>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ChevronLeft, DollarSign, Percent, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LoanCalculatorScreenProps {
  onBack: () => void
}

export function LoanCalculatorScreen({ onBack }: LoanCalculatorScreenProps) {
  const [principal, setPrincipal] = useState("200000")
  const [rate, setRate] = useState("9.5")
  const [tenure, setTenure] = useState("60")

  // EMI Calculation Formula: EMI = (P * R/12 * (1 + R/12)^N) / ((1 + R/12)^N - 1)
  const calculateEMI = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(rate) / 12 / 100
    const n = Number.parseFloat(tenure)

    if (!p || !r || !n) return 0

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return emi
  }

  const emi = calculateEMI()
  const principalNum = Number.parseFloat(principal) || 0
  const totalAmount = emi * Number.parseFloat(tenure)
  const totalInterest = totalAmount - principalNum

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Loan Calculator</h1>
      </div>

      {/* Calculator */}
      <div className="px-4 py-6 flex-1">
        <div className="space-y-6">
          {/* Principal Amount */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Loan Amount (₹)</label>
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                step="10000"
                min="0"
              />
            </div>
            <input
              type="range"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              min="10000"
              max="2000000"
              step="10000"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>₹10,000</span>
              <span>₹20,00,000</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Interest Rate (% p.a.)</label>
            <div className="flex items-center gap-3 mb-3">
              <Percent className="w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                step="0.1"
                min="0"
                max="20"
              />
              <span className="text-foreground font-medium">%</span>
            </div>
            <input
              type="range"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              min="2"
              max="20"
              step="0.1"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>2%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Loan Tenure (Months)</label>
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                step="6"
                min="6"
              />
              <span className="text-muted-foreground text-sm">months</span>
            </div>
            <input
              type="range"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              min="6"
              max="360"
              step="6"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>6 months</span>
              <span>30 years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Card */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-lg font-semibold text-foreground mb-6">Loan Summary</h2>

          <div className="space-y-4">
            {/* Monthly EMI */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                Monthly EMI
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{Math.round(emi).toLocaleString("en-IN")}</span>
            </div>

            {/* Principal Amount */}
            <div className="flex items-center justify-between pt-4 border-t border-blue-200 dark:border-blue-800">
              <span className="text-muted-foreground flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                Principal Amount
              </span>
              <span className="font-semibold text-foreground">₹{principalNum.toLocaleString("en-IN")}</span>
            </div>

            {/* Total Interest */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-600"></span>
                Total Interest
              </span>
              <span className="font-semibold text-orange-600 dark:text-orange-400">
                ₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
            </div>

            {/* Total Amount */}
            <div className="flex items-center justify-between pt-4 border-t border-blue-200 dark:border-blue-800">
              <span className="font-semibold text-foreground">Total Amount Payable</span>
              <span className="text-2xl font-bold text-foreground">₹{totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Tenure</p>
              <p className="font-semibold text-foreground">{Math.floor(Number.parseFloat(tenure) / 12)} years {Number.parseFloat(tenure) % 12} months</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Interest Rate</p>
              <p className="font-semibold text-foreground">{rate}% p.a.</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Button onClick={onBack} variant="outline" className="w-full mt-6">
          Close Calculator
        </Button>
      </div>
    </div>
  )
}

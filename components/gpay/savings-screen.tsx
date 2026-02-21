"use client"

import { useState } from "react"
import { ChevronLeft, TrendingUp, Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FixedDeposit } from "@/app/page"

interface SavingsScreenProps {
  fixedDeposits: FixedDeposit[]
  onBack: () => void
  onCreateFD: (amount: number, tenure: number, interestRate: number) => void
  balance: number
}

export function SavingsScreen({ fixedDeposits, onBack, onCreateFD, balance }: SavingsScreenProps) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [amount, setAmount] = useState("")
  const [tenure, setTenure] = useState("12")
  const [interestRate, setInterestRate] = useState("6.5")
  const [errorMessage, setErrorMessage] = useState("")

  const totalInvested = fixedDeposits.reduce((sum, fd) => sum + fd.amount, 0)
  const totalInterest = fixedDeposits.reduce((sum, fd) => sum + fd.interestEarned, 0)
  const projectedInterest = amount ? (Number.parseFloat(amount) * Number.parseFloat(interestRate) * Number.parseFloat(tenure)) / (12 * 100) : 0

  const handleCreateFD = () => {
    const amountNum = Number.parseFloat(amount)
    const tenureNum = Number.parseFloat(tenure)
    const rateNum = Number.parseFloat(interestRate)

    if (!amountNum || amountNum <= 0) {
      setErrorMessage("Please enter a valid amount")
      return
    }

    if (amountNum > balance) {
      setErrorMessage(`Insufficient balance. You have ₹${balance.toFixed(2)}`)
      return
    }

    if (tenureNum <= 0) {
      setErrorMessage("Tenure must be greater than 0")
      return
    }

    onCreateFD(amountNum, tenureNum, rateNum)
    setAmount("")
    setTenure("12")
    setInterestRate("6.5")
    setErrorMessage("")
    setShowCreateForm(false)
  }

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Fixed Deposits & Savings</h1>
      </div>

      {!showCreateForm ? (
        <>
          {/* Summary Cards */}
          <div className="px-4 py-4 space-y-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
              <p className="text-green-100 text-sm mb-1">Total Invested</p>
              <p className="text-3xl font-bold mb-4">₹{totalInvested.toLocaleString("en-IN")}</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Interest Earned: ₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Active FDs List */}
          <div className="px-4 flex-1">
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Fixed Deposits</h2>
            {fixedDeposits.length > 0 ? (
              <div className="space-y-3 mb-4">
                {fixedDeposits.map((fd) => (
                  <div key={fd.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-foreground">₹{fd.amount.toLocaleString("en-IN")}</p>
                        <p className="text-sm text-muted-foreground">{fd.tenure} months @ {fd.interestRate}% p.a.</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${fd.status === "active" ? "bg-green-100 text-green-700" : fd.status === "matured" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                        {fd.status === "active" ? "Active" : fd.status === "matured" ? "Matured" : "Closed"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Maturity Date</p>
                        <p className="text-foreground font-medium">{new Date(fd.maturityDate).toLocaleDateString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Maturity Amount</p>
                        <p className="text-foreground font-medium">₹{fd.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground text-center mb-4">No fixed deposits yet. Create one to start earning interest!</p>
              </div>
            )}
          </div>

          {/* Create FD Button */}
          <div className="px-4 py-4">
            <Button onClick={() => setShowCreateForm(true)} className="w-full bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New Fixed Deposit
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Create FD Form */}
          <div className="px-4 py-4 flex-1">
            <h2 className="text-lg font-semibold text-foreground mb-4">Create Fixed Deposit</h2>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">Investment Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="1000"
                step="100"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <p className="text-xs text-muted-foreground mt-1">Available: ₹{balance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
            </div>

            {/* Tenure Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">Tenure (Months)</label>
              <select
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="6">6 months</option>
                <option value="12">1 year</option>
                <option value="24">2 years</option>
                <option value="36">3 years</option>
                <option value="60">5 years</option>
              </select>
            </div>

            {/* Interest Rate */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">Interest Rate (% p.a.)</label>
              <select
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="5.5">5.5%</option>
                <option value="6">6%</option>
                <option value="6.5">6.5%</option>
                <option value="7">7%</option>
                <option value="7.5">7.5%</option>
              </select>
            </div>

            {/* Projection */}
            {amount && (
              <div className="bg-muted rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">Projected Returns</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Interest Earned</span>
                  <span className="text-lg font-bold text-green-600">
                    + ₹{projectedInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                  <span className="font-semibold text-foreground">Total Maturity Amount</span>
                  <span className="text-lg font-bold text-foreground">
                    ₹{(Number.parseFloat(amount || "0") + projectedInterest).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-4 py-4 space-y-3">
            <Button onClick={handleCreateFD} className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={!amount}>
              Create Fixed Deposit
            </Button>
            <Button onClick={() => setShowCreateForm(false)} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

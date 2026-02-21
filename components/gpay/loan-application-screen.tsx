"use client"

import { useState } from "react"
import { ChevronLeft, Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Loan } from "@/app/page"

interface LoanApplicationScreenProps {
  onBack: () => void
  onApplyLoan: (amount: number, tenure: number, interestRate: number) => void
  loans: Loan[]
}

export function LoanApplicationScreen({ onBack, onApplyLoan, loans }: LoanApplicationScreenProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [amount, setAmount] = useState("")
  const [tenure, setTenure] = useState("60")
  const [interestRate, setInterestRate] = useState("9.5")
  const [errorMessage, setErrorMessage] = useState("")

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const r = rate / 12 / 100
    if (r === 0) return principal / months
    return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
  }

  const handleApplyLoan = () => {
    const amountNum = Number.parseFloat(amount)
    const tenureNum = Number.parseFloat(tenure)
    const rateNum = Number.parseFloat(interestRate)

    if (!amountNum || amountNum <= 0) {
      setErrorMessage("Please enter a valid loan amount")
      return
    }

    if (amountNum < 50000) {
      setErrorMessage("Minimum loan amount is ₹50,000")
      return
    }

    if (amountNum > 5000000) {
      setErrorMessage("Maximum loan amount is ₹50,00,000")
      return
    }

    onApplyLoan(amountNum, tenureNum, rateNum)
    setAmount("")
    setTenure("60")
    setInterestRate("9.5")
    setErrorMessage("")
    setShowApplicationForm(false)
  }

  const activeLoan = loans.find((l) => l.status === "active")
  const totalLoanAmount = loans.filter((l) => l.status === "active" || l.status === "pending").reduce((sum, l) => sum + l.amount, 0)

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Loans</h1>
      </div>

      {!showApplicationForm ? (
        <>
          {/* Loan Status Summary */}
          {activeLoan && (
            <div className="px-4 py-4 space-y-3">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <p className="text-cyan-100 text-sm mb-1">Active Loan Amount</p>
                <p className="text-3xl font-bold mb-4">₹{totalLoanAmount.toLocaleString("en-IN")}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-cyan-100">Monthly EMI</p>
                    <p className="font-semibold">₹{Math.round(activeLoan.monthlyEMI).toLocaleString("en-IN")}</p>
                  </div>
                  <div>
                    <p className="text-cyan-100">Remaining</p>
                    <p className="font-semibold">₹{activeLoan.remainingAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loans List */}
          <div className="px-4 py-4 flex-1">
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Loans</h2>
            {loans.length > 0 ? (
              <div className="space-y-3">
                {loans.map((loan) => (
                  <div key={loan.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-foreground">Loan #{loan.id.slice(0, 6)}</p>
                        <p className="text-sm text-muted-foreground">₹{loan.amount.toLocaleString("en-IN")} @ {loan.interestRate}%</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          loan.status === "active"
                            ? "bg-green-100 text-green-700"
                            : loan.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : loan.status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {loan.status === "active" ? "Active" : loan.status === "pending" ? "Pending" : loan.status === "completed" ? "Completed" : "Rejected"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Monthly EMI</p>
                        <p className="font-semibold text-foreground">₹{Math.round(loan.monthlyEMI).toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Paid Amount</p>
                        <p className="font-semibold text-green-600">₹{loan.paidAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Remaining</p>
                        <p className="font-semibold text-orange-600">₹{loan.remainingAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                      </div>
                    </div>
                    {loan.status === "active" && (
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-green-600 h-full transition-all"
                          style={{ width: `${(loan.paidAmount / (loan.paidAmount + loan.remainingAmount)) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground text-center mb-4">No loans yet. Apply for a loan to get started!</p>
              </div>
            )}
          </div>

          {/* Apply Button */}
          <div className="px-4 py-4">
            <Button onClick={() => setShowApplicationForm(true)} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Apply for Loan
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Loan Application Form */}
          <div className="px-4 py-4 flex-1">
            <h2 className="text-lg font-semibold text-foreground mb-4">Apply for Loan</h2>

            <div className="space-y-4">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Loan Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="50000"
                  min="50000"
                  step="10000"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-600"
                />
                <p className="text-xs text-muted-foreground mt-1">Min: ₹50,000 | Max: ₹50,00,000</p>
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tenure (Months)</label>
                <select
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-600"
                >
                  <option value="12">1 year (12 months)</option>
                  <option value="24">2 years (24 months)</option>
                  <option value="36">3 years (36 months)</option>
                  <option value="48">4 years (48 months)</option>
                  <option value="60">5 years (60 months)</option>
                </select>
              </div>

              {/* Interest Rate (Display Only) */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Interest Rate (% p.a.)</label>
                <div className="px-4 py-3 border border-border rounded-lg bg-muted text-foreground">
                  <p className="font-medium">{interestRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on current market rates</p>
                </div>
              </div>

              {/* EMI Calculation Preview */}
              {amount && (
                <div className="bg-cyan-50 dark:bg-cyan-950 rounded-lg p-4 border border-cyan-200 dark:border-cyan-800">
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 mb-2">Estimated Monthly EMI</p>
                  <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
                    ₹{Math.round(calculateEMI(Number.parseFloat(amount), Number.parseFloat(interestRate), Number.parseFloat(tenure))).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-2">
                    Total amount to be paid: ₹
                    {(calculateEMI(Number.parseFloat(amount), Number.parseFloat(interestRate), Number.parseFloat(tenure)) * Number.parseFloat(tenure)).toLocaleString(
                      "en-IN",
                      { maximumFractionDigits: 0 },
                    )}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              {/* Terms */}
              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                <p className="mb-2">
                  <strong>Disclaimer:</strong> This is a simulation. Interest rates and terms are subject to eligibility and current policies.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 py-4 space-y-3">
            <Button
              onClick={handleApplyLoan}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              disabled={!amount || Number.parseFloat(amount) <= 0}
            >
              Apply for Loan
            </Button>
            <Button onClick={() => setShowApplicationForm(false)} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

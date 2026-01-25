"use client"

import { ChevronLeft, TrendingDown, Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LendingScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

interface LoanProduct {
  id: string
  type: "personal" | "home" | "auto" | "credit-line"
  name: string
  interestRate: number
  processingFee: number
  maxAmount: number
  tenure: string
  eligibility: string
  status: "available" | "applied" | "approved"
}

const mockLoans: LoanProduct[] = [
  {
    id: "1",
    type: "personal",
    name: "Personal Loan",
    interestRate: 10.5,
    processingFee: 0,
    maxAmount: 500000,
    tenure: "12-60 months",
    eligibility: "Credit Score 650+",
    status: "available",
  },
  {
    id: "2",
    type: "auto",
    name: "Auto Loan",
    interestRate: 8.5,
    processingFee: 1000,
    maxAmount: 2500000,
    tenure: "24-84 months",
    eligibility: "Salaried Individuals",
    status: "available",
  },
  {
    id: "3",
    type: "home",
    name: "Home Loan",
    interestRate: 6.5,
    processingFee: 5000,
    maxAmount: 10000000,
    tenure: "5-20 years",
    eligibility: "Stable Income, Property Value",
    status: "available",
  },
  {
    id: "4",
    type: "credit-line",
    name: "Credit Line",
    interestRate: 12,
    processingFee: 0,
    maxAmount: 200000,
    tenure: "Flexible",
    eligibility: "Verified Account",
    status: "approved",
  },
]

const mockUserLoans = [
  {
    id: "loan-1",
    name: "Personal Loan",
    principal: 100000,
    remaining: 85000,
    emi: 8500,
    nextDueDate: new Date("2026-02-15"),
    status: "active",
  },
]

export function LendingScreen({
  onBack,
  onNavigate,
}: LendingScreenProps) {
  const creditScore = 745
  const creditLimit = 200000
  const creditUsed = 45000

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "personal":
        return "👤"
      case "home":
        return "🏠"
      case "auto":
        return "🚗"
      case "credit-line":
        return "💳"
      default:
        return "💰"
    }
  }

  return (
    <div className="flex flex-col h-full bg-background animate-slideInUp">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border animate-slideInDown">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Loans & Credit</h1>
        <div className="w-8" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Credit Score Card */}
          <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white border-0">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-green-100 mb-1">Credit Score</div>
                <div className="text-4xl font-bold">{creditScore}</div>
                <div className="text-xs text-green-100 mt-1">Excellent (760+)</div>
              </div>
              <div className="pt-2 border-t border-green-500">
                <div className="text-xs text-green-100 mb-1">Available Credit Limit</div>
                <div className="text-xl font-semibold">
                  ₹{creditLimit.toLocaleString()}
                </div>
                <div className="mt-2 bg-green-500/30 rounded-full h-2">
                  <div
                    className="bg-white h-full rounded-full"
                    style={{
                      width: `${(creditUsed / creditLimit) * 100}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-green-100 mt-1">
                  ₹{creditUsed.toLocaleString()} used
                </div>
              </div>
            </div>
          </Card>

          {/* Active Loans */}
          {mockUserLoans.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground px-2">
                Active Loans
              </h2>
              {mockUserLoans.map((loan) => (
                <Card key={loan.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">{loan.name}</div>
                      <div className="text-xs text-muted-foreground">EMI ₹{loan.emi.toLocaleString()}</div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining Amount</span>
                      <span className="font-semibold">₹{loan.remaining.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Due</span>
                      <span className="font-semibold">
                        {loan.nextDueDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Available Loan Products */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">
              Available Loan Products
            </h2>
            {mockLoans.map((loan) => (
              <Card
                key={loan.id}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTypeIcon(loan.type)}</div>
                    <div>
                      <div className="font-semibold">{loan.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Upto ₹{(loan.maxAmount / 100000).toFixed(0)}L
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <div className="text-muted-foreground">Interest Rate</div>
                    <div className="font-semibold">{loan.interestRate}% p.a.</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Processing Fee</div>
                    <div className="font-semibold">
                      {loan.processingFee === 0 ? "Free" : `₹${loan.processingFee.toLocaleString()}`}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {loan.eligibility}
                </div>

                <Button className="w-full bg-transparent" size="sm" variant="outline">
                  {loan.status === "approved" ? "Apply Now" : "Check Eligibility"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

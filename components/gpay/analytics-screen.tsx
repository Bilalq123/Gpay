"use client"

import { ChevronLeft, TrendingUp, Target, Zap, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface AnalyticsScreenProps {
  onBack: () => void
}

interface BudgetCategory {
  name: string
  spent: number
  budget: number
  percentage: number
  color: string
}

interface FinancialGoal {
  id: string
  name: string
  target: number
  current: number
  deadline: Date
  category: string
}

export function AnalyticsScreen({ onBack }: AnalyticsScreenProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  const monthlySpending = {
    total: 45000,
    change: -12,
    categories: [
      { name: "Food & Dining", spent: 12000, budget: 15000, percentage: 80, color: "bg-orange-500" },
      { name: "Transport", spent: 8000, budget: 10000, percentage: 80, color: "bg-blue-500" },
      { name: "Shopping", spent: 15000, budget: 20000, percentage: 75, color: "bg-purple-500" },
      { name: "Utilities", spent: 5000, budget: 5000, percentage: 100, color: "bg-red-500" },
      { name: "Entertainment", spent: 5000, budget: 8000, percentage: 62.5, color: "bg-green-500" },
    ] as BudgetCategory[],
  }

  const goals: FinancialGoal[] = [
    {
      id: "1",
      name: "Emergency Fund",
      target: 300000,
      current: 180000,
      deadline: new Date("2026-12-31"),
      category: "Savings",
    },
    {
      id: "2",
      name: "Vacation to Europe",
      target: 500000,
      current: 250000,
      deadline: new Date("2026-06-30"),
      category: "Travel",
    },
    {
      id: "3",
      name: "New Laptop",
      target: 150000,
      current: 120000,
      deadline: new Date("2026-03-31"),
      category: "Electronics",
    },
    {
      id: "4",
      name: "Investment Portfolio",
      target: 1000000,
      current: 450000,
      deadline: new Date("2027-12-31"),
      category: "Investing",
    },
  ]

  const incomeVsExpense = {
    income: 150000,
    expense: 45000,
    savings: 105000,
    savingRate: 70,
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
        <h1 className="text-lg font-semibold">Insights & Analytics</h1>
        <div className="w-8" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Time Range Selector */}
          <div className="flex gap-2">
            {(["week", "month", "year"] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Button>
            ))}
          </div>

          {/* Income vs Expense */}
          <Card className="p-4 bg-gradient-to-br from-cyan-600 to-cyan-700 text-white border-0">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-cyan-100">Income</div>
                <div className="text-lg font-bold">
                  ₹{incomeVsExpense.income.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-cyan-100">Expense</div>
                <div className="text-lg font-bold">
                  ₹{incomeVsExpense.expense.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-cyan-100">Savings</div>
                <div className="text-lg font-bold">
                  ₹{incomeVsExpense.savings.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-500">
              <div className="text-xs text-cyan-100 mb-1">Savings Rate</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-cyan-500/30 rounded-full h-2">
                  <div
                    className="bg-white h-full rounded-full"
                    style={{ width: `${incomeVsExpense.savingRate}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{incomeVsExpense.savingRate}%</span>
              </div>
            </div>
          </Card>

          {/* Budget by Category */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">Budget by Category</h2>
            <div className="space-y-3">
              {monthlySpending.categories.map((category) => (
                <Card key={category.name} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ₹{category.spent.toLocaleString()} of ₹{category.budget.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{category.percentage.toFixed(0)}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`${category.color} h-full rounded-full transition-all`}
                      style={{ width: `${Math.min(category.percentage, 100)}%` }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Financial Goals */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">Financial Goals</h2>
            <div className="space-y-3">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100
                const daysLeft = Math.ceil(
                  (goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                )

                return (
                  <Card key={goal.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold">{goal.name}</div>
                        <div className="text-xs text-muted-foreground">{goal.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          ₹{goal.current.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          of ₹{goal.target.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div
                        className="bg-green-500 h-full rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{progress.toFixed(0)}% Complete</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {daysLeft} days left
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Spending Insights */}
          <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Spending Insight</h3>
                <p className="text-sm text-muted-foreground">
                  Your spending decreased by 12% this month compared to last month. You're on track with your budget!
                </p>
              </div>
            </div>
          </Card>

          {/* Savings Tip */}
          <Card className="p-4 border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Quick Tip</h3>
                <p className="text-sm text-muted-foreground">
                  You're close to your emergency fund goal! 60% complete. Keep up the great saving habits.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

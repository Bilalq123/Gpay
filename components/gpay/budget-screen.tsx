"use client"

import { ChevronLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ExpenseCategory, BudgetGoal } from "@/app/page"

interface BudgetScreenProps {
  categories: ExpenseCategory[]
  budgetGoals: BudgetGoal[]
  onBack: () => void
  onUpdateCategory: (categoryId: string, amount: number) => void
  onCreateBudgetGoal: (goal: BudgetGoal) => void
}

export function BudgetScreen({ categories, budgetGoals, onBack, onUpdateCategory, onCreateBudgetGoal }: BudgetScreenProps) {
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0)
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0)
  const remainingBudget = totalBudget - totalSpent
  const spentPercentage = (totalSpent / totalBudget) * 100

  const overBudgetCategories = categories.filter((cat) => cat.percentage > 100)

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Budget & Expenses</h1>
      </div>

      {/* Monthly Budget Overview */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-4">
          <p className="text-indigo-100 text-sm mb-1">Monthly Budget</p>
          <p className="text-3xl font-bold mb-4">₹{totalBudget.toLocaleString("en-IN")}</p>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Spent: ₹{totalSpent.toLocaleString("en-IN")}</span>
              <span>Remaining: ₹{remainingBudget.toLocaleString("en-IN")}</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all ${spentPercentage > 100 ? "bg-red-400" : spentPercentage > 80 ? "bg-yellow-400" : "bg-green-400"}`}
                style={{ width: `${Math.min(spentPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-indigo-100">{spentPercentage.toFixed(1)}% of budget used</p>
        </div>
      </div>

      {/* Over Budget Alert */}
      {overBudgetCategories.length > 0 && (
        <div className="px-4 mb-4">
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-700 dark:text-red-300 mb-1">Over Budget Alert!</p>
              <p className="text-sm text-red-600 dark:text-red-400">
                {overBudgetCategories.length} categor{overBudgetCategories.length === 1 ? "y" : "ies"} exceeded budget limit
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Budget Categories */}
      <div className="px-4 flex-1">
        <h2 className="text-lg font-semibold text-foreground mb-4">Spending by Category</h2>
        <div className="space-y-3">
          {categories.map((category) => {
            const isOverBudget = category.percentage > 100
            const isWarning = category.percentage > 80

            return (
              <div key={category.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: `${category.color}20` }}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{category.name}</p>
                    <p className="text-sm text-muted-foreground">Budget: ₹{category.budget.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{category.spent.toLocaleString("en-IN")}</p>
                    <p className={`text-sm font-medium ${isOverBudget ? "text-red-600" : isWarning ? "text-yellow-600" : "text-green-600"}`}>
                      {category.percentage.toFixed(0)}%
                    </p>
                  </div>
                </div>
                <div className={`w-full rounded-full h-2 overflow-hidden`} style={{ backgroundColor: "#e5e7eb" }}>
                  <div
                    className={`h-full transition-all ${isOverBudget ? "bg-red-600" : isWarning ? "bg-yellow-500" : "bg-green-500"}`}
                    style={{ width: `${Math.min(category.percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₹{category.spent.toLocaleString("en-IN")} spent</span>
                  <span>
                    {isOverBudget
                      ? `₹${Math.round(category.spent - category.budget)} over`
                      : `₹${Math.round(category.budget - category.spent)} left`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="px-4 py-4">
        <Button onClick={onBack} variant="outline" className="w-full">
          Close Budget
        </Button>
      </div>
    </div>
  )
}

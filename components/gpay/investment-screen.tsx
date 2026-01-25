"use client"

import { ChevronLeft, TrendingUp, Plus, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface InvestmentScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

interface Investment {
  id: string
  name: string
  type: "stock" | "mutual-fund" | "bond"
  quantity: number
  currentPrice: number
  investedAmount: number
  currentValue: number
  gain: number
  gainPercent: number
}

const mockInvestments: Investment[] = [
  {
    id: "1",
    name: "TCS",
    type: "stock",
    quantity: 10,
    currentPrice: 3500,
    investedAmount: 33000,
    currentValue: 35000,
    gain: 2000,
    gainPercent: 6.06,
  },
  {
    id: "2",
    name: "Reliance Industries",
    type: "stock",
    quantity: 5,
    currentPrice: 2800,
    investedAmount: 13500,
    currentValue: 14000,
    gain: 500,
    gainPercent: 3.7,
  },
  {
    id: "3",
    name: "HDFC Mid-Cap Fund",
    type: "mutual-fund",
    quantity: 100,
    currentPrice: 450,
    investedAmount: 42000,
    currentValue: 45000,
    gain: 3000,
    gainPercent: 7.14,
  },
  {
    id: "4",
    name: "Government Securities",
    type: "bond",
    quantity: 1,
    currentPrice: 100000,
    investedAmount: 100000,
    currentValue: 100500,
    gain: 500,
    gainPercent: 0.5,
  },
]

export function InvestmentScreen({
  onBack,
  onNavigate,
}: InvestmentScreenProps) {
  const [showBalance, setShowBalance] = useState(true)

  const totalInvested = mockInvestments.reduce(
    (sum, inv) => sum + inv.investedAmount,
    0
  )
  const totalValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalGain = totalValue - totalInvested
  const gainPercent = (totalGain / totalInvested) * 100

  const stocks = mockInvestments.filter((inv) => inv.type === "stock")
  const mutualFunds = mockInvestments.filter((inv) => inv.type === "mutual-fund")
  const bonds = mockInvestments.filter((inv) => inv.type === "bond")

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
        <h1 className="text-lg font-semibold">Investments</h1>
        <Button size="sm" variant="ghost" onClick={() => onNavigate("investment-details")}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Portfolio Summary */}
        <div className="p-4 space-y-4">
          <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-blue-100">Portfolio Value</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-blue-500/50 rounded-lg transition-colors"
              >
                {showBalance ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
            {showBalance ? (
              <>
                <div className="text-3xl font-bold mb-2">₹{totalValue.toLocaleString()}</div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    totalGain >= 0 ? "text-green-200" : "text-red-200"
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                    {totalGain >= 0 ? "+" : ""}₹{Math.abs(totalGain).toLocaleString()} ({gainPercent.toFixed(2)}%)
                  </div>
                </div>
              </>
            ) : (
              <div className="text-3xl font-bold">••••••••</div>
            )}
          </Card>

          {/* Investment Breakdown */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">Holdings by Type</h2>
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Stocks</div>
                <div className="text-lg font-semibold">{stocks.length}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Mutual Funds</div>
                <div className="text-lg font-semibold">{mutualFunds.length}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Bonds</div>
                <div className="text-lg font-semibold">{bonds.length}</div>
              </Card>
            </div>
          </div>

          {/* Stocks */}
          {stocks.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground px-2">Stocks</h3>
              <div className="space-y-2">
                {stocks.map((inv) => (
                  <Card
                    key={inv.id}
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{inv.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {inv.quantity} units @ ₹{inv.currentPrice}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{inv.currentValue.toLocaleString()}</div>
                        <div
                          className={`text-xs font-semibold ${
                            inv.gain >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {inv.gain >= 0 ? "+" : ""}₹{inv.gain.toLocaleString()} ({inv.gainPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Mutual Funds */}
          {mutualFunds.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground px-2">Mutual Funds</h3>
              <div className="space-y-2">
                {mutualFunds.map((inv) => (
                  <Card
                    key={inv.id}
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{inv.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {inv.quantity} units @ ₹{inv.currentPrice}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{inv.currentValue.toLocaleString()}</div>
                        <div
                          className={`text-xs font-semibold ${
                            inv.gain >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {inv.gain >= 0 ? "+" : ""}₹{inv.gain.toLocaleString()} ({inv.gainPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Bonds */}
          {bonds.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground px-2">Bonds</h3>
              <div className="space-y-2">
                {bonds.map((inv) => (
                  <Card
                    key={inv.id}
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{inv.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {inv.quantity} unit @ ₹{inv.currentPrice}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{inv.currentValue.toLocaleString()}</div>
                        <div
                          className={`text-xs font-semibold ${
                            inv.gain >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {inv.gain >= 0 ? "+" : ""}₹{inv.gain.toLocaleString()} ({inv.gainPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

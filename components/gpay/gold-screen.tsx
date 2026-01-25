"use client"

import { useState } from "react"
import { ChevronLeft, TrendingUp, TrendingDown, Info, ShoppingCart, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GoldScreenProps {
  onBack: () => void
  balance: number
  onBuyGold: (amount: number, grams: number) => void
  onSellGold: (grams: number, amount: number) => void
  goldBalance: number
}

export function GoldScreen({ onBack, balance, onBuyGold, onSellGold, goldBalance }: GoldScreenProps) {
  const [mode, setMode] = useState<"buy" | "sell">("buy")
  const [inputAmount, setInputAmount] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const goldPricePerGram = 6250 // Current gold price
  const priceChange = 1.2 // Percentage change
  const isPositive = priceChange > 0

  const gramsForAmount = inputAmount ? Number.parseFloat(inputAmount) / goldPricePerGram : 0
  const amountForGrams = inputAmount ? Number.parseFloat(inputAmount) * goldPricePerGram : 0

  const handleTransaction = () => {
    if (mode === "buy") {
      const amount = Number.parseFloat(inputAmount)
      if (amount > 0 && amount <= balance) {
        onBuyGold(amount, gramsForAmount)
        setShowSuccess(true)
      }
    } else {
      const grams = Number.parseFloat(inputAmount)
      if (grams > 0 && grams <= goldBalance) {
        onSellGold(grams, amountForGrams)
        setShowSuccess(true)
      }
    }
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <span className="text-4xl">✨</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{mode === "buy" ? "Gold Purchased!" : "Gold Sold!"}</h2>
        <p className="text-muted-foreground text-center mb-6">
          {mode === "buy"
            ? `You bought ${gramsForAmount.toFixed(4)} grams of gold`
            : `You sold ${inputAmount} grams for ₹${amountForGrams.toFixed(2)}`}
        </p>
        <Button onClick={onBack} className="bg-amber-500 hover:bg-amber-600 text-white">
          Done
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Digital Gold</h1>
      </div>

      {/* Gold Price Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-amber-100 text-sm">24K Gold Price</p>
              <p className="text-3xl font-bold">₹{goldPricePerGram.toLocaleString()}/g</p>
            </div>
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${isPositive ? "bg-green-500/30" : "bg-red-500/30"}`}
            >
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {isPositive ? "+" : ""}
                {priceChange}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-amber-100 text-sm">
            <Info className="w-4 h-4" />
            <span>Price updates every 5 minutes</span>
          </div>
        </div>
      </div>

      {/* Your Gold Holdings */}
      <div className="px-4 py-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your Gold Balance</p>
              <p className="text-2xl font-bold text-foreground">{goldBalance.toFixed(4)} g</p>
              <p className="text-sm text-muted-foreground">
                ≈ ₹{(goldBalance * goldPricePerGram).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
              <span className="text-2xl">🥇</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buy/Sell Toggle */}
      <div className="px-4">
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          <button
            onClick={() => {
              setMode("buy")
              setInputAmount("")
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
              mode === "buy" ? "bg-amber-500 text-white shadow-md" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Gold
          </button>
          <button
            onClick={() => {
              setMode("sell")
              setInputAmount("")
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
              mode === "sell" ? "bg-amber-500 text-white shadow-md" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Wallet className="w-4 h-4" />
            Sell Gold
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <label className="text-sm text-muted-foreground mb-2 block">
            {mode === "buy" ? "Enter amount in ₹" : "Enter grams to sell"}
          </label>
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder={mode === "buy" ? "₹500" : "0.5"}
            className="w-full text-3xl font-bold bg-transparent border-none focus:outline-none text-foreground"
          />
          <div className="mt-2 text-sm text-muted-foreground">
            {mode === "buy"
              ? `You'll get: ${gramsForAmount.toFixed(4)} grams`
              : `You'll receive: ₹${amountForGrams.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
          </div>

          {/* Quick amounts */}
          <div className="flex gap-2 mt-4">
            {mode === "buy"
              ? [500, 1000, 2000, 5000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setInputAmount(amt.toString())}
                    className="flex-1 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg text-foreground transition-colors"
                  >
                    ₹{amt}
                  </button>
                ))
              : [0.1, 0.5, 1, 2].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setInputAmount(Math.min(amt, goldBalance).toString())}
                    className="flex-1 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg text-foreground transition-colors"
                  >
                    {amt}g
                  </button>
                ))}
          </div>
        </div>

        {/* Balance Info */}
        <p className="text-sm text-muted-foreground mt-3 text-center">
          {mode === "buy"
            ? `Wallet Balance: ₹${balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
            : `Gold Balance: ${goldBalance.toFixed(4)} grams`}
        </p>
      </div>

      {/* Action Button */}
      <div className="p-4 mt-auto">
        <Button
          onClick={handleTransaction}
          disabled={
            !inputAmount ||
            (mode === "buy" && Number.parseFloat(inputAmount) > balance) ||
            (mode === "sell" && Number.parseFloat(inputAmount) > goldBalance)
          }
          className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-lg font-semibold disabled:opacity-50"
        >
          {mode === "buy" ? "Buy Gold" : "Sell Gold"}
        </Button>
      </div>
    </div>
  )
}

"use client"

import { ChevronLeft, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CryptoWallet } from "@/app/page"

interface CryptoWalletScreenProps {
  wallets: CryptoWallet[]
  onBack: () => void
  onBuySell: () => void
}

export function CryptoWalletScreen({ wallets, onBack, onBuySell }: CryptoWalletScreenProps) {
  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)
  const totalChange24h = wallets.reduce((sum, w) => sum + (w.balance * w.change24h) / 100, 0)

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Crypto Wallet</h1>
      </div>

      {/* Portfolio Overview */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-purple-100 text-sm mb-2">Total Portfolio Value</p>
          <p className="text-3xl font-bold mb-4">₹{totalBalance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
          <div className={`flex items-center gap-2 ${totalChange24h >= 0 ? "text-green-200" : "text-red-200"}`}>
            {totalChange24h >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium">
              {totalChange24h >= 0 ? "+" : ""}₹{Math.abs(totalChange24h).toFixed(2)} (24h)
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 flex gap-3 mb-6">
        <Button onClick={onBuySell} className="flex-1 bg-green-600 hover:bg-green-700">
          <ArrowDownLeft className="w-4 h-4 mr-2" />
          Buy
        </Button>
        <Button onClick={onBuySell} variant="outline" className="flex-1">
          <ArrowUpRight className="w-4 h-4 mr-2" />
          Sell
        </Button>
      </div>

      {/* Crypto Holdings */}
      <div className="px-4 flex-1">
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Holdings</h2>
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg font-bold">
                    {wallet.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{wallet.name}</p>
                    <p className="text-sm text-muted-foreground">{wallet.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">₹{wallet.balance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
                  <p className={`text-sm ${wallet.change24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {wallet.change24h >= 0 ? "+" : ""}
                    {wallet.change24h}%
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {wallet.quantity.toFixed(8)} {wallet.symbol} @ ₹{wallet.currentPrice.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State Message */}
      {wallets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <p className="text-muted-foreground text-center mb-4">No crypto holdings yet. Start investing today!</p>
          <Button onClick={onBuySell} className="bg-purple-600 hover:bg-purple-700">
            Buy Crypto
          </Button>
        </div>
      )}
    </div>
  )
}

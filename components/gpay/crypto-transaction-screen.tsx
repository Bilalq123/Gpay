"use client"

import { useState } from "react"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CryptoWallet } from "@/app/page"

interface CryptoTransactionScreenProps {
  wallets: CryptoWallet[]
  onBack: () => void
  onBuyCrypto: (walletId: string, quantity: number, pricePerUnit: number) => void
  onSellCrypto: (walletId: string, quantity: number, pricePerUnit: number) => void
  balance: number
}

export function CryptoTransactionScreen({
  wallets,
  onBack,
  onBuyCrypto,
  onSellCrypto,
  balance,
}: CryptoTransactionScreenProps) {
  const [mode, setMode] = useState<"buy" | "sell">("buy")
  const [selectedWalletId, setSelectedWalletId] = useState<string>(wallets[0]?.id || "")
  const [quantity, setQuantity] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const selectedWallet = wallets.find((w) => w.id === selectedWalletId)
  const totalAmount = selectedWallet ? Number.parseFloat(quantity || "0") * selectedWallet.currentPrice : 0

  const handleTransaction = () => {
    if (!selectedWallet) return

    const qty = Number.parseFloat(quantity)
    if (!qty || qty <= 0) {
      setErrorMessage("Please enter a valid quantity")
      return
    }

    if (mode === "buy") {
      if (totalAmount > balance) {
        setErrorMessage(`Insufficient balance. You need ₹${totalAmount.toFixed(2)}`)
        return
      }
      onBuyCrypto(selectedWalletId, qty, selectedWallet.currentPrice)
    } else {
      if (qty > selectedWallet.quantity) {
        setErrorMessage(`You only have ${selectedWallet.quantity.toFixed(8)} ${selectedWallet.symbol}`)
        return
      }
      onSellCrypto(selectedWalletId, qty, selectedWallet.currentPrice)
    }

    setErrorMessage("")
    setShowSuccess(true)
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <span className="text-4xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {mode === "buy" ? "Crypto Purchased!" : "Crypto Sold!"}
        </h2>
        <p className="text-muted-foreground text-center mb-2">
          {mode === "buy"
            ? `You bought ${quantity} ${selectedWallet?.symbol}`
            : `You sold ${quantity} ${selectedWallet?.symbol} for ₹${totalAmount.toFixed(2)}`}
        </p>
        <p className="text-muted-foreground text-center mb-6">Transaction completed successfully</p>
        <Button onClick={onBack} className="bg-green-600 hover:bg-green-700 text-white">
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
        <h1 className="text-xl font-semibold text-foreground">{mode === "buy" ? "Buy" : "Sell"} Crypto</h1>
      </div>

      {/* Mode Selector */}
      <div className="px-4 pt-4 flex gap-3">
        <button
          onClick={() => {
            setMode("buy")
            setErrorMessage("")
          }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === "buy" ? "bg-green-600 text-white" : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => {
            setMode("sell")
            setErrorMessage("")
          }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === "sell" ? "bg-red-600 text-white" : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Wallet Selection */}
      <div className="px-4 py-4">
        <label className="block text-sm font-medium text-foreground mb-2">Select Cryptocurrency</label>
        <select
          value={selectedWalletId}
          onChange={(e) => setSelectedWalletId(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          {wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.name} ({wallet.symbol}) - Current Price: ₹{wallet.currentPrice.toLocaleString("en-IN")}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity Input */}
      <div className="px-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          {mode === "buy" ? "Quantity to Buy" : "Quantity to Sell"}
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          step="0.001"
          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        {selectedWallet && (
          <p className="text-sm text-muted-foreground mt-2">
            {mode === "buy" ? "Available balance" : "Available quantity"}: {mode === "buy" ? `₹${balance.toFixed(2)}` : `${selectedWallet.quantity.toFixed(8)} ${selectedWallet.symbol}`}
          </p>
        )}
      </div>

      {/* Total Amount */}
      {selectedWallet && quantity && (
        <div className="px-4 py-4 mt-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Unit Price</span>
              <span className="font-medium text-foreground">₹{selectedWallet.currentPrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center border-t border-border pt-2">
              <span className="font-semibold text-foreground">Total Amount</span>
              <span className="text-lg font-bold text-foreground">₹{totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 py-4 mt-auto space-y-3">
        <Button
          onClick={handleTransaction}
          className={`w-full ${mode === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white`}
          disabled={!quantity || Number.parseFloat(quantity) <= 0}
        >
          {mode === "buy" ? "Buy Now" : "Sell Now"}
        </Button>
        <Button onClick={onBack} variant="outline" className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  )
}

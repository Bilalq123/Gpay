"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, X, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QRScannerScreenProps {
  onBack: () => void
  onPayment?: (merchant: string, amount: number) => void
  balance?: number
}

export function QRScannerScreen({ onBack, onPayment, balance = 5420.5 }: QRScannerScreenProps) {
  const [scanning, setScanning] = useState(true)
  const [paymentStep, setPaymentStep] = useState<"scan" | "loading" | "form" | "confirm" | "success">("scan")
  const [processing, setProcessing] = useState(false)
  const [recipientName, setRecipientName] = useState("")
  const [amount, setAmount] = useState("")
  const [upiId, setUpiId] = useState("")

  // Simulate scanning - trigger loading state after 3 seconds
  useEffect(() => {
    if (scanning && paymentStep === "scan") {
      const timer = setTimeout(() => {
        setScanning(false)
        setPaymentStep("loading")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [scanning, paymentStep])

  // Simulate loading transition to form after 2 seconds
  useEffect(() => {
    if (paymentStep === "loading") {
      const timer = setTimeout(() => {
        setPaymentStep("form")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [paymentStep])

  const handleReset = () => {
    setScanning(true)
    setRecipientName("")
    setAmount("")
    setUpiId("")
    setPaymentStep("scan")
    setProcessing(false)
  }

  const handleFormSubmit = () => {
    if (recipientName && amount && upiId) {
      const amountValue = Number.parseFloat(amount)
      if (amountValue > 0 && amountValue <= balance) {
        setPaymentStep("confirm")
      }
    }
  }

  const handlePayment = async () => {
    const amountValue = Number.parseFloat(amount)
    if (!recipientName || !amountValue || amountValue > balance) return

    setProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProcessing(false)
    setPaymentStep("success")

    if (onPayment) {
      onPayment(recipientName, amountValue)
    }
  }

  const amountValue = Number.parseFloat(amount) || 0
  const insufficientBalance = amountValue > balance

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Scan Screen - Camera View */}
      {paymentStep === "scan" && (
        <div className="flex-1 flex flex-col relative bg-black">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3">
            <button
              onClick={onBack}
              className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-lg font-semibold text-white">Scan QR Code</h1>
            <div className="w-10" />
          </div>

          {/* Camera Area */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

            {/* QR Frame */}
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 border-2 border-transparent">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-400" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-400" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-400" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-blue-400" />
              </div>

              {/* Scanning Line Animation */}
              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
                </div>
              )}
            </div>

            <p className="absolute bottom-20 text-white text-center text-sm">Position QR code within frame</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {paymentStep === "loading" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 bg-gradient-to-br from-blue-600 to-blue-700 animate-slideInUp">
          <div className="relative w-28 h-28 mb-8">
            {/* Outer rotating circle */}
            <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-spin" />
            {/* Inner rotating circle (reverse) */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-white/60 animate-spin" style={{ animationDirection: "reverse" }} />

            {/* Center spinner */}
            <div className="absolute inset-6 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Processing QR</h2>
          <p className="text-blue-100 text-center">Reading payment details...</p>
        </div>
      )}

      {/* Payment Form */}
      {paymentStep === "form" && (
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur">
            <button
              onClick={handleReset}
              className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">Enter Payment Details</h1>
            <button onClick={onBack} className="p-2 -mr-2 hover:bg-muted rounded-full transition-colors">
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-4 lg:p-6 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <div className="bg-card rounded-3xl p-8 shadow-lg space-y-6 animate-slideInUp">
                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Send Money</h2>
                  <p className="text-sm text-muted-foreground">Fill in the recipient details</p>
                </div>

                {/* Recipient Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Recipient Name</label>
                  <Input
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter name or merchant"
                    className="h-12 text-base rounded-xl border-2 border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* UPI ID Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">UPI ID</label>
                  <Input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@bankname"
                    className="h-12 text-base rounded-xl border-2 border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-foreground">₹</span>
                    <Input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      type="number"
                      min="0"
                      className="h-12 text-2xl font-bold pl-8 rounded-xl border-2 border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Balance Status */}
                <div
                  className={`p-4 rounded-xl border-2 ${
                    insufficientBalance
                      ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                      : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                  }`}
                >
                  <p className="text-xs text-muted-foreground mb-1">Available Balance</p>
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-2xl font-bold ${
                        insufficientBalance ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </p>
                    {insufficientBalance && (
                      <span className="text-xs text-red-600 dark:text-red-400 font-semibold">Insufficient</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={handleFormSubmit}
                    disabled={!recipientName || !amount || !upiId || insufficientBalance}
                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all"
                  >
                    Review Payment
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full h-12 rounded-xl bg-transparent border border-border text-foreground hover:bg-muted"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Screen */}
      {paymentStep === "confirm" && (
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur">
            <button
              onClick={() => setPaymentStep("form")}
              className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">Confirm Payment</h1>
            <div className="w-10" />
          </div>

          {/* Confirmation Content */}
          <div className="flex-1 p-4 lg:p-6 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-3xl p-8 shadow-lg border border-blue-200 dark:border-blue-800 space-y-6 animate-slideInUp">
                {/* Recipient Card */}
                <div className="bg-white dark:bg-background rounded-2xl p-6 text-center border border-border">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-3xl font-bold text-white">{recipientName.charAt(0).toUpperCase()}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{recipientName}</h3>
                  <p className="text-sm text-muted-foreground">{upiId}</p>
                </div>

                {/* Amount Display */}
                <div className="bg-white dark:bg-background rounded-2xl p-6 text-center border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Amount to Pay</p>
                  <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    ₹{amountValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-muted-foreground">From your account</p>
                </div>

                {/* Balance Summary */}
                <div className="bg-white dark:bg-background rounded-2xl p-4 border border-border space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Available Balance</span>
                    <span className="font-bold text-foreground">
                      ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">After Payment</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      ₹{(balance - amountValue).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold transition-all shadow-lg"
                  >
                    {processing ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Confirm & Pay"
                    )}
                  </Button>
                  <Button
                    onClick={() => setPaymentStep("form")}
                    disabled={processing}
                    variant="outline"
                    className="w-full h-12 rounded-xl bg-transparent border border-border text-foreground hover:bg-muted disabled:opacity-50"
                  >
                    Edit Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Screen */}
      {paymentStep === "success" && (
        <div className="flex-1 overflow-y-auto flex flex-col bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur">
            <div className="w-10" />
            <h1 className="text-lg font-semibold text-foreground">Payment Success</h1>
            <button onClick={onBack} className="p-2 -mr-2 hover:bg-muted rounded-full transition-colors">
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Success Content */}
          <div className="flex-1 p-4 lg:p-6 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center space-y-6 animate-slideInUp">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="relative w-28 h-28">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle className="w-24 h-24 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Payment Done!</h2>
                  <p className="text-muted-foreground">Your payment has been successfully processed</p>
                </div>

                {/* Details Card */}
                <div className="bg-white dark:bg-background rounded-2xl p-6 border border-border space-y-4 text-left shadow-md">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Paid To</span>
                    <span className="font-semibold text-foreground">{recipientName}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">UPI ID</span>
                    <span className="font-semibold text-foreground text-sm">{upiId}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      ₹{amountValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span className="font-semibold text-foreground text-sm">{new Date().toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={onBack}
                    className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow-lg"
                  >
                    Done
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full h-12 rounded-xl bg-transparent border border-border text-foreground hover:bg-muted"
                  >
                    Make Another Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

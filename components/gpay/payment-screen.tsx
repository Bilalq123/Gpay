"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MoreVertical, Check, ChevronDown } from "lucide-react"
import type { Contact } from "@/app/page"

interface PaymentScreenProps {
  contact: Contact
  amount: string
  setAmount: (amount: string) => void
  onBack: () => void
  onComplete: () => void
  success: boolean
  balance: number // Added balance prop
}

export function PaymentScreen({
  contact,
  amount,
  setAmount,
  onBack,
  onComplete,
  success,
  balance,
}: PaymentScreenProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      setAmount(amount.slice(0, -1))
    } else if (key === ".") {
      if (!amount.includes(".")) {
        setAmount(amount + key)
      }
    } else {
      setAmount(amount + key)
    }
  }

  const handlePay = async () => {
    const payAmount = Number.parseFloat(amount)
    if (!amount || payAmount <= 0) return
    if (payAmount > balance) {
      alert("Insufficient balance!")
      return
    }
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsProcessing(false)
    onComplete()
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background px-6">
        <div className="w-24 h-24 lg:w-32 lg:h-32 bg-blue-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
          <Check className="w-12 h-12 lg:w-16 lg:h-16 text-white" strokeWidth={3} />
        </div>
        <p className="text-4xl lg:text-5xl font-bold text-foreground mb-2">₹{amount}</p>
        <p className="text-muted-foreground text-lg mb-1">Paid to {contact.name}</p>
        <p className="text-sm text-muted-foreground mb-8">{contact.phone}</p>
        <Button
          onClick={onBack}
          className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 text-base"
        >
          Done
        </Button>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background px-6">
        <div className="w-20 h-20 lg:w-24 lg:h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-lg lg:text-xl font-medium text-foreground">Processing payment...</p>
      </div>
    )
  }

  const payAmount = Number.parseFloat(amount) || 0
  const insufficientFunds = payAmount > balance

  return (
    <div className="flex flex-col min-h-[80vh] bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-4">
        {/* Contact Info */}
        <div className="flex flex-col items-center py-6">
          <p className="text-sm lg:text-base text-muted-foreground mb-3">Paying {contact.name}</p>
          <Avatar className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-blue-600 mb-2">
            {contact.avatar ? <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} /> : null}
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xl lg:text-2xl font-semibold dark:bg-blue-900 dark:text-blue-300">
              {contact.initial || contact.name[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Amount Display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-2">
            <span
              className={`text-5xl lg:text-6xl font-bold ${insufficientFunds ? "text-red-500" : "text-foreground"}`}
            >
              ₹{amount || "0"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            Balance: ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          {insufficientFunds && <p className="text-sm text-red-500">Insufficient balance</p>}
        </div>

        {/* Payment Method */}
        <div className="py-4 border-t border-border">
          <p className="text-xs lg:text-sm text-muted-foreground mb-2">Choose an account to pay with</p>
          <button className="w-full flex items-center justify-between p-3 border border-border rounded-xl hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">SBI</span>
              </div>
              <span className="text-sm lg:text-base font-medium text-foreground">UPI Lite</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Keypad */}
        <div className="pb-6">
          <div className="grid grid-cols-3 gap-2 lg:gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "backspace"].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="h-14 lg:h-16 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center text-xl lg:text-2xl font-medium text-foreground transition-colors active:scale-95"
              >
                {key === "backspace" ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                    />
                  </svg>
                ) : (
                  key
                )}
              </button>
            ))}
          </div>
          <Button
            onClick={handlePay}
            disabled={!amount || payAmount <= 0 || insufficientFunds}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 lg:h-14 text-base lg:text-lg disabled:opacity-50"
          >
            Pay ₹{amount || "0"} via Free
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ChevronLeft, Check, Smartphone, Wifi, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RechargeScreenProps {
  balance: number
  onBack: () => void
  onRecharge: (amount: number, provider: string, number: string) => void
}

const providers = [
  { name: "Jio", color: "bg-blue-600" },
  { name: "Airtel", color: "bg-red-500" },
  { name: "Vi", color: "bg-purple-600" },
  { name: "BSNL", color: "bg-green-600" },
]

const plans = [
  { amount: 149, validity: "24 days", data: "1GB/day", description: "Unlimited calls" },
  { amount: 199, validity: "28 days", data: "1.5GB/day", description: "Unlimited calls + 100 SMS/day" },
  { amount: 299, validity: "28 days", data: "2GB/day", description: "Unlimited calls + 100 SMS/day" },
  { amount: 449, validity: "56 days", data: "2GB/day", description: "Unlimited calls + 100 SMS/day" },
  { amount: 599, validity: "84 days", data: "1.5GB/day", description: "Unlimited calls + 100 SMS/day" },
  { amount: 999, validity: "84 days", data: "2GB/day", description: "Unlimited calls + Disney+ Hotstar" },
]

export function RechargeScreen({ balance, onBack, onRecharge }: RechargeScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [step, setStep] = useState<"number" | "plan" | "confirm" | "success">("number")

  const handleSelectPlan = (amount: number) => {
    setSelectedPlan(amount)
    setStep("confirm")
  }

  const handleConfirm = () => {
    if (selectedPlan && selectedProvider && phoneNumber && selectedPlan <= balance) {
      onRecharge(selectedPlan, selectedProvider, phoneNumber)
      setStep("success")
    }
  }

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Recharge Successful!</h2>
        <p className="text-muted-foreground text-center mb-6">
          ₹{selectedPlan} recharge done for {phoneNumber}
        </p>
        <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
          Done
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-border">
        <button
          onClick={step === "number" ? onBack : () => setStep(step === "confirm" ? "plan" : "number")}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-foreground">Mobile Recharge</h1>
      </div>

      {step === "number" && (
        <div className="flex-1 p-4 lg:p-6">
          {/* Type Selection */}
          <div className="flex gap-3 mb-6">
            {[
              { icon: Smartphone, label: "Mobile" },
              { icon: Wifi, label: "DTH" },
              { icon: Tv, label: "Broadband" },
            ].map((type) => (
              <button
                key={type.label}
                className="flex-1 flex flex-col items-center gap-2 p-4 border border-border rounded-xl hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
              >
                <type.icon className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm text-foreground">{type.label}</span>
              </button>
            ))}
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">Mobile Number</label>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Enter 10 digit number"
              className="h-14 text-lg"
            />
          </div>

          {/* Provider Selection */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-3 block">Select Operator</label>
            <div className="grid grid-cols-4 gap-3">
              {providers.map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => setSelectedProvider(provider.name)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    selectedProvider === provider.name
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                      : "border-border hover:border-blue-600"
                  }`}
                >
                  <div className={`w-10 h-10 ${provider.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{provider.name[0]}</span>
                  </div>
                  <span className="text-xs text-foreground">{provider.name}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setStep("plan")}
            disabled={phoneNumber.length !== 10 || !selectedProvider}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl"
          >
            Continue
          </Button>
        </div>
      )}

      {step === "plan" && (
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex items-center gap-3 mb-6 p-4 bg-muted rounded-xl">
            <div
              className={`w-10 h-10 ${providers.find((p) => p.name === selectedProvider)?.color} rounded-full flex items-center justify-center`}
            >
              <span className="text-white text-xs font-bold">{selectedProvider?.[0]}</span>
            </div>
            <div>
              <p className="font-medium text-foreground">{phoneNumber}</p>
              <p className="text-sm text-muted-foreground">{selectedProvider} Prepaid</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">Select a Plan</h2>
          <div className="grid gap-3 lg:grid-cols-2">
            {plans.map((plan) => (
              <button
                key={plan.amount}
                onClick={() => handleSelectPlan(plan.amount)}
                className="p-4 border border-border rounded-xl text-left hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-foreground">₹{plan.amount}</span>
                  <span className="text-sm text-blue-600 font-medium">{plan.validity}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.data}</p>
                <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className="flex-1 p-4 lg:p-6">
          <div className="bg-muted rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Confirm Recharge</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mobile Number</span>
                <span className="font-medium text-foreground">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Operator</span>
                <span className="font-medium text-foreground">{selectedProvider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium text-foreground">₹{selectedPlan}</span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="font-bold text-xl text-foreground">₹{selectedPlan}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Balance: ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>

          <Button
            onClick={handleConfirm}
            disabled={!selectedPlan || selectedPlan > balance}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl"
          >
            Pay ₹{selectedPlan}
          </Button>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { ChevronLeft, Check, Zap, Droplets, Flame, Wifi, Building2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface BillsScreenProps {
  balance: number
  onBack: () => void
  onPayBill: (amount: number, billType: string, billerId: string) => void
}

const billTypes = [
  { id: "electricity", name: "Electricity", icon: Zap, color: "bg-yellow-500" },
  { id: "water", name: "Water", icon: Droplets, color: "bg-blue-500" },
  { id: "gas", name: "Gas", icon: Flame, color: "bg-orange-500" },
  { id: "broadband", name: "Broadband", icon: Wifi, color: "bg-purple-500" },
  { id: "rent", name: "Rent", icon: Building2, color: "bg-green-500" },
  { id: "credit-card", name: "Credit Card", icon: CreditCard, color: "bg-red-500" },
]

const billers = {
  electricity: ["BESCOM", "MESCOM", "TPDDL", "BSES"],
  water: ["Delhi Jal Board", "BWSSB", "Chennai Metro Water"],
  gas: ["Indane Gas", "HP Gas", "Bharat Gas", "Mahanagar Gas"],
  broadband: ["Airtel Broadband", "Jio Fiber", "ACT Fibernet", "BSNL"],
  rent: ["Pay Rent"],
  "credit-card": ["HDFC Bank", "ICICI Bank", "SBI Card", "Axis Bank"],
}

export function BillsScreen({ balance, onBack, onPayBill }: BillsScreenProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedBiller, setSelectedBiller] = useState<string | null>(null)
  const [consumerId, setConsumerId] = useState("")
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"type" | "biller" | "details" | "confirm" | "success">("type")

  const handleConfirm = () => {
    const billAmount = Number.parseFloat(amount)
    if (billAmount > 0 && billAmount <= balance && selectedType && selectedBiller) {
      onPayBill(billAmount, selectedType, selectedBiller)
      setStep("success")
    }
  }

  const selectedBillType = billTypes.find((b) => b.id === selectedType)

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Bill Paid Successfully!</h2>
        <p className="text-muted-foreground text-center mb-6">
          ₹{amount} paid to {selectedBiller}
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
          onClick={() => {
            if (step === "type") onBack()
            else if (step === "biller") setStep("type")
            else if (step === "details") setStep("biller")
            else if (step === "confirm") setStep("details")
          }}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-foreground">Pay Bills</h1>
      </div>

      {step === "type" && (
        <div className="flex-1 p-4 lg:p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Select Bill Type</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {billTypes.map((bill) => (
              <button
                key={bill.id}
                onClick={() => {
                  setSelectedType(bill.id)
                  setStep("biller")
                }}
                className="flex flex-col items-center gap-3 p-6 border border-border rounded-2xl hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
              >
                <div className={`w-14 h-14 ${bill.color} rounded-2xl flex items-center justify-center`}>
                  <bill.icon className="w-7 h-7 text-white" />
                </div>
                <span className="font-medium text-foreground">{bill.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "biller" && selectedType && (
        <div className="flex-1 p-4 lg:p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Select Biller</h2>
          <div className="grid gap-3">
            {billers[selectedType as keyof typeof billers]?.map((biller) => (
              <button
                key={biller}
                onClick={() => {
                  setSelectedBiller(biller)
                  setStep("details")
                }}
                className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all text-left"
              >
                <div className={`w-12 h-12 ${selectedBillType?.color} rounded-xl flex items-center justify-center`}>
                  {selectedBillType && <selectedBillType.icon className="w-6 h-6 text-white" />}
                </div>
                <span className="font-medium text-foreground">{biller}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "details" && (
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex items-center gap-3 mb-6 p-4 bg-muted rounded-xl">
            <div className={`w-10 h-10 ${selectedBillType?.color} rounded-xl flex items-center justify-center`}>
              {selectedBillType && <selectedBillType.icon className="w-5 h-5 text-white" />}
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedBiller}</p>
              <p className="text-sm text-muted-foreground">{selectedBillType?.name} Bill</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Consumer ID / Account Number</label>
              <Input
                type="text"
                value={consumerId}
                onChange={(e) => setConsumerId(e.target.value)}
                placeholder="Enter consumer ID"
                className="h-14"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="h-14 text-lg"
              />
            </div>
          </div>

          <Button
            onClick={() => setStep("confirm")}
            disabled={!consumerId || !amount || Number.parseFloat(amount) <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl mt-6"
          >
            Continue
          </Button>
        </div>
      )}

      {step === "confirm" && (
        <div className="flex-1 p-4 lg:p-6">
          <div className="bg-muted rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Confirm Payment</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bill Type</span>
                <span className="font-medium text-foreground">{selectedBillType?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Biller</span>
                <span className="font-medium text-foreground">{selectedBiller}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Consumer ID</span>
                <span className="font-medium text-foreground">{consumerId}</span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="font-bold text-xl text-foreground">₹{amount}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Balance: ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>

          <Button
            onClick={handleConfirm}
            disabled={Number.parseFloat(amount) > balance}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl"
          >
            Pay ₹{amount}
          </Button>
        </div>
      )}
    </div>
  )
}

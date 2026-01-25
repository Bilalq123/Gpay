"use client"

import { ChevronLeft, Building2, Plus, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BankAccountsScreenProps {
  onBack: () => void
}

const linkedAccounts = [
  {
    id: "1",
    bank: "State Bank of India",
    accountNo: "XXXX XXXX 4521",
    type: "Savings",
    primary: true,
    color: "bg-blue-600",
  },
  { id: "2", bank: "HDFC Bank", accountNo: "XXXX XXXX 7832", type: "Savings", primary: false, color: "bg-red-500" },
  { id: "3", bank: "ICICI Bank", accountNo: "XXXX XXXX 1290", type: "Current", primary: false, color: "bg-orange-500" },
]

export function BankAccountsScreen({ onBack }: BankAccountsScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-border">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-foreground">Bank Accounts</h1>
      </div>

      <div className="flex-1 p-4 lg:p-6">
        {/* Linked Accounts */}
        <h2 className="text-lg font-semibold text-foreground mb-4">Linked Accounts</h2>
        <div className="space-y-3 mb-6">
          {linkedAccounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className={`w-12 h-12 ${account.color} rounded-xl flex items-center justify-center`}>
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{account.bank}</p>
                  {account.primary && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {account.accountNo} • {account.type}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </div>

        {/* Add New Account */}
        <Button
          variant="outline"
          className="w-full h-14 border-dashed border-2 gap-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 bg-transparent"
        >
          <Plus className="w-5 h-5" />
          Link New Bank Account
        </Button>

        {/* Security Info */}
        <div className="mt-8 p-4 bg-muted rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Your accounts are secure</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your bank account details are encrypted and protected with bank-grade security. We never store your
                banking credentials.
              </p>
            </div>
          </div>
        </div>

        {/* UPI IDs */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your UPI IDs</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-foreground">justinfolly@oksbi</span>
              <span className="text-xs text-muted-foreground">Primary</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-foreground">9512345678@paytm</span>
              <span className="text-xs text-muted-foreground">Secondary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ArrowUpRight, ArrowDownLeft, Wallet, Building, Gift, Smartphone, Receipt } from "lucide-react"
import type { Transaction } from "@/app/page"

interface HistoryScreenProps {
  transactions: Transaction[]
  onBack: () => void
}

function formatDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

function getTransactionIcon(type: Transaction["type"]) {
  switch (type) {
    case "sent":
      return <ArrowUpRight className="w-4 h-4 text-red-500" />
    case "received":
      return <ArrowDownLeft className="w-4 h-4 text-green-500" />
    case "added":
      return <Wallet className="w-4 h-4 text-blue-500" />
    case "withdrawn":
      return <Building className="w-4 h-4 text-orange-500" />
    case "reward":
      return <Gift className="w-4 h-4 text-amber-500" />
    case "recharge":
      return <Smartphone className="w-4 h-4 text-green-500" />
    case "bill":
      return <Receipt className="w-4 h-4 text-purple-500" />
  }
}

function getAmountColor(type: Transaction["type"]) {
  switch (type) {
    case "sent":
    case "withdrawn":
    case "recharge":
    case "bill":
      return "text-red-500"
    case "received":
    case "added":
    case "reward":
      return "text-green-500"
  }
}

function getAmountPrefix(type: Transaction["type"]) {
  switch (type) {
    case "sent":
    case "withdrawn":
    case "recharge":
    case "bill":
      return "-"
    case "received":
    case "added":
    case "reward":
      return "+"
  }
}

function getMainIcon(type: Transaction["type"]) {
  switch (type) {
    case "added":
      return <Wallet className="w-5 h-5 text-blue-600" />
    case "withdrawn":
      return <Building className="w-5 h-5 text-orange-600" />
    case "reward":
      return <Gift className="w-5 h-5 text-amber-600" />
    case "recharge":
      return <Smartphone className="w-5 h-5 text-green-600" />
    case "bill":
      return <Receipt className="w-5 h-5 text-purple-600" />
    default:
      return <Wallet className="w-5 h-5 text-muted-foreground" />
  }
}

export function HistoryScreen({ transactions, onBack }: HistoryScreenProps) {
  return (
    <div className="flex flex-col min-h-[80vh] bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-border sticky top-0 bg-background z-10">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-foreground">Transaction History</h1>
      </div>

      <div className="flex-1 px-4 py-4">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Wallet className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-1">No transactions yet</p>
            <p className="text-sm text-muted-foreground">Your payment history will appear here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:bg-muted/50 transition-colors"
              >
                {/* Icon or Avatar */}
                <div className="relative">
                  {transaction.contact ? (
                    <Avatar className="w-12 h-12 border border-border">
                      {transaction.contact.avatar ? (
                        <AvatarImage
                          src={transaction.contact.avatar || "/placeholder.svg"}
                          alt={transaction.contact.name}
                        />
                      ) : null}
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {transaction.contact.initial || transaction.contact.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      {getMainIcon(transaction.type)}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-card border border-border rounded-full flex items-center justify-center">
                    {getTransactionIcon(transaction.type)}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {transaction.contact ? transaction.contact.name : transaction.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.contact ? transaction.description : formatDate(transaction.date)}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className={`font-semibold ${getAmountColor(transaction.type)}`}>
                    {getAmountPrefix(transaction.type)}₹{transaction.amount.toLocaleString("en-IN")}
                  </p>
                  {transaction.contact && (
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

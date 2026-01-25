"use client"

import { ChevronLeft, Share2, Download, Flag, Copy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface TransactionDetailsScreenProps {
  onBack: () => void
}

interface TransactionDetail {
  id: string
  type: "sent" | "received"
  amount: number
  to: string
  date: Date
  time: string
  status: "completed" | "pending" | "failed"
  paymentMethod: string
  transactionId: string
  reference: string
  receipt: {
    fileName: string
    uploadedAt: Date
  }
  notes: string
}

const mockTransaction: TransactionDetail = {
  id: "txn-001",
  type: "sent",
  amount: 5000,
  to: "Rajesh Kumar",
  date: new Date("2026-01-22"),
  time: "02:45 PM",
  status: "completed",
  paymentMethod: "Bank Account",
  transactionId: "GPAY20260122024500123",
  reference: "Payment for movie tickets",
  receipt: {
    fileName: "receipt_20260122.pdf",
    uploadedAt: new Date("2026-01-22"),
  },
  notes: "Thanks for the tickets!",
}

export function TransactionDetailsScreen({
  onBack,
}: TransactionDetailsScreenProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(mockTransaction.transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        <h1 className="text-lg font-semibold">Transaction Details</h1>
        <div className="w-8" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Transaction Status */}
          <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white border-0 text-center">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-12 h-12" />
            </div>
            <div className="mb-2">
              <div className="text-4xl font-bold">₹{mockTransaction.amount.toLocaleString()}</div>
              <div className="text-sm text-green-100">{mockTransaction.type === "sent" ? "Sent" : "Received"}</div>
            </div>
            <div className="text-sm text-green-100">
              {mockTransaction.date.toLocaleDateString()} at {mockTransaction.time}
            </div>
            <div className="text-xs text-green-200 mt-2 capitalize">{mockTransaction.status}</div>
          </Card>

          {/* Transaction Details */}
          <Card className="p-4 space-y-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">To</div>
              <div className="font-semibold text-lg">{mockTransaction.to}</div>
            </div>
            <div className="border-t border-border pt-4">
              <div className="text-xs text-muted-foreground mb-1">Payment Method</div>
              <div className="font-semibold">{mockTransaction.paymentMethod}</div>
            </div>
            <div className="border-t border-border pt-4">
              <div className="text-xs text-muted-foreground mb-1">Reference</div>
              <div className="font-semibold">{mockTransaction.reference}</div>
            </div>
            {mockTransaction.notes && (
              <>
                <div className="border-t border-border pt-4">
                  <div className="text-xs text-muted-foreground mb-1">Notes</div>
                  <div className="text-sm">{mockTransaction.notes}</div>
                </div>
              </>
            )}
          </Card>

          {/* Transaction ID */}
          <Card className="p-4 bg-muted">
            <div className="text-xs text-muted-foreground mb-2">Transaction ID</div>
            <div className="flex items-center justify-between gap-2">
              <code className="flex-1 text-xs font-mono bg-background p-2 rounded border border-border">
                {mockTransaction.transactionId}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-background rounded transition-colors"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </Card>

          {/* Receipt */}
          {mockTransaction.receipt && (
            <Card className="p-4">
              <div className="text-sm font-semibold mb-3">Receipt</div>
              <div className="border border-border rounded-lg p-3 flex items-center justify-between hover:bg-muted cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-red-600">PDF</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{mockTransaction.receipt.fileName}</div>
                    <div className="text-xs text-muted-foreground">
                      {mockTransaction.receipt.uploadedAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-muted-foreground" />
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
              onClick={() => {
                /* Handle share */
              }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
              onClick={() => {
                /* Handle download receipt */
              }}
            >
              <Download className="w-4 h-4" />
              Receipt
            </Button>
          </div>

          {/* Report Issue */}
          <Card className="p-4 border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
            <div className="flex items-start gap-3">
              <Flag className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Issue with this transaction?</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Report this transaction if you have any concerns.
                </p>
                <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                  Report Issue
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

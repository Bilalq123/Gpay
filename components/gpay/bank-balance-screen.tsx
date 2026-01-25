'use client'

import { ChevronLeft, Eye, EyeOff, Download, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface BankBalanceScreenProps {
  onBack: () => void
}

const bankAccounts = [
  {
    id: '1',
    bank: 'State Bank of India',
    accountNo: 'XXXX XXXX 4521',
    type: 'Savings',
    balance: 45000,
    primary: true,
    color: 'bg-blue-600',
  },
  {
    id: '2',
    bank: 'HDFC Bank',
    accountNo: 'XXXX XXXX 7832',
    type: 'Savings',
    balance: 28500,
    primary: false,
    color: 'bg-red-500',
  },
  {
    id: '3',
    bank: 'ICICI Bank',
    accountNo: 'XXXX XXXX 1290',
    type: 'Current',
    balance: 15200,
    primary: false,
    color: 'bg-orange-500',
  },
]

export function BankBalanceScreen({ onBack }: BankBalanceScreenProps) {
  const [hideBalance, setHideBalance] = useState(false)
  const totalBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <div className="flex flex-col min-h-screen bg-background animate-slideInUp">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Bank Balance</h1>
        <button className="p-2 -mr-2 hover:bg-muted rounded-full transition-colors">
          <Download className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6">
          {/* Total Balance Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white mb-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm text-blue-100">Total Balance</h2>
              <button
                onClick={() => setHideBalance(!hideBalance)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                {hideBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-5xl lg:text-6xl font-bold mb-2">
              {hideBalance ? '••••••' : `₹${totalBalance.toLocaleString('en-IN')}`}
            </p>
            <p className="text-blue-100 text-sm">Across all linked accounts</p>
          </div>

          {/* Accounts List */}
          <h3 className="text-lg font-semibold text-foreground mb-4">Linked Bank Accounts</h3>
          <div className="space-y-4">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${account.color} rounded-2xl flex items-center justify-center shadow-md`}>
                    <span className="text-2xl font-bold text-white">{account.bank.charAt(0)}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{account.bank}</h4>
                      {account.primary && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{account.accountNo}</p>
                    <p className="text-xs text-muted-foreground mt-1">{account.type} Account</p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground mb-1">
                      {hideBalance ? '•••' : `₹${account.balance.toLocaleString('en-IN')}`}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 justify-end">
                      <TrendingUp className="w-3 h-3" />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
                Add Account
              </Button>
              <Button variant="outline" className="h-12 rounded-xl border border-border text-foreground hover:bg-muted bg-transparent">
                View Details
              </Button>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-semibold text-foreground">Note:</span> Your bank details are secure and encrypted.
            </p>
            <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

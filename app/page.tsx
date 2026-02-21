"use client"

import { useState, useEffect } from "react"
import { LoginScreen } from "@/components/gpay/login-screen"
import { HomeScreen } from "@/components/gpay/home-screen"
import { ProfileScreen } from "@/components/gpay/profile-screen"
import { TransferScreen } from "@/components/gpay/transfer-screen"
import { BusinessScreen } from "@/components/gpay/business-screen"
import { PaymentScreen } from "@/components/gpay/payment-screen"
import { QRScreen } from "@/components/gpay/qr-screen"
import { HistoryScreen } from "@/components/gpay/history-screen"
import { RewardsScreen } from "@/components/gpay/rewards-screen"
import { RechargeScreen } from "@/components/gpay/recharge-screen"
import { BillsScreen } from "@/components/gpay/bills-screen"
import { BankAccountsScreen } from "@/components/gpay/bank-accounts-screen"
import { OffersScreen } from "@/components/gpay/offers-screen"
import { SplitBillScreen } from "@/components/gpay/split-bill-screen"
import { NotificationsScreen } from "@/components/gpay/notifications-screen"
import { QRScannerScreen } from "@/components/gpay/qr-scanner-screen"
import { GoldScreen } from "@/components/gpay/gold-screen"
import { GiftCardsScreen } from "@/components/gpay/gift-cards-screen"
import { RequestMoneyScreen } from "@/components/gpay/request-money-screen"
import { ChatSupportScreen } from "@/components/gpay/chat-support-screen"
import { AutopayScreen } from "@/components/gpay/autopay-screen"
import { TransactionLimitsScreen } from "@/components/gpay/transaction-limits-screen"
import { InvestmentScreen } from "@/components/gpay/investment-screen"
import { InsuranceScreen } from "@/components/gpay/insurance-screen"
import { LendingScreen } from "@/components/gpay/lending-screen"
import { AnalyticsScreen } from "@/components/gpay/analytics-screen"
import { TransactionDetailsScreen } from "@/components/gpay/transaction-details-screen"
import { SecurityScreen } from "@/components/gpay/security-screen"
import { BankBalanceScreen } from "@/components/gpay/bank-balance-screen"
import { BottomNav } from "@/components/gpay/bottom-nav"
import { DesktopSidebar } from "@/components/gpay/desktop-sidebar"
import { MobileHeader } from "@/components/gpay/mobile-header"
import { CryptoWalletScreen } from "@/components/gpay/crypto-wallet-screen"
import { CryptoTransactionScreen } from "@/components/gpay/crypto-transaction-screen"
import { SavingsScreen } from "@/components/gpay/savings-screen"
import { SubscriptionsScreen } from "@/components/gpay/subscriptions-screen"
import { LoanCalculatorScreen } from "@/components/gpay/loan-calculator-screen"
import { LoanApplicationScreen } from "@/components/gpay/loan-application-screen"
import { BudgetScreen } from "@/components/gpay/budget-screen"
import { ReferralScreen } from "@/components/gpay/referral-screen"
import { LoyaltyDashboardScreen } from "@/components/gpay/loyalty-dashboard-screen"

export type Screen =
  | "home"
  | "profile"
  | "transfer"
  | "business"
  | "payment"
  | "qr"
  | "history"
  | "rewards"
  | "recharge"
  | "bills"
  | "bank-accounts"
  | "bank-balance"
  | "offers"
  | "split-bill"
  | "notifications"
  | "qr-scanner"
  | "gold"
  | "gift-cards"
  | "request-money"
  | "chat-support"
  | "autopay"
  | "transaction-limits"
  | "investments"
  | "insurance"
  | "lending"
  | "analytics"
  | "transaction-details"
  | "security"
  | "investment-details"
  | "insurance-details"
  | "crypto-wallet"
  | "crypto-transaction"
  | "savings"
  | "subscriptions"
  | "loan-calculator"
  | "loan-application"
  | "budget"
  | "referral"
  | "loyalty-dashboard"

export interface Contact {
  id: string
  name: string
  phone: string
  avatar?: string
  initial?: string
}

export interface Transaction {
  id: string
  type: "sent" | "received" | "added" | "withdrawn" | "reward" | "recharge" | "bill"
  amount: number
  contact?: Contact
  description: string
  date: Date
}

export interface Reward {
  id: string
  type: "scratch" | "cashback" | "coupon"
  amount?: number
  discount?: string
  title: string
  description: string
  isScratched: boolean
  expiresAt: Date
}

export interface Notification {
  id: string
  type: "payment" | "reward" | "offer" | "system"
  title: string
  message: string
  date: Date
  isRead: boolean
}

export interface User {
  name: string
  email: string
}

// Crypto Wallet Models
export interface CryptoWallet {
  id: string
  symbol: string
  name: string
  quantity: number
  currentPrice: number
  balance: number
  change24h: number
  icon: string
}

export interface CryptoTransaction {
  id: string
  walletId: string
  type: "buy" | "sell"
  quantity: number
  pricePerUnit: number
  totalAmount: number
  date: Date
  status: "completed" | "pending"
}

// Fixed Deposit Model
export interface FixedDeposit {
  id: string
  amount: number
  depositDate: Date
  maturityDate: Date
  interestRate: number
  tenure: number
  status: "active" | "matured" | "closed"
  interestEarned: number
  totalAmount: number
}

// Subscription Model
export interface Subscription {
  id: string
  name: string
  vendor: string
  amount: number
  frequency: "weekly" | "monthly" | "yearly"
  nextBillingDate: Date
  startDate: Date
  status: "active" | "paused" | "cancelled"
  category: string
  autoRenew: boolean
}

// Loan Models
export interface Loan {
  id: string
  amount: number
  interestRate: number
  tenure: number
  monthlyEMI: number
  startDate: Date
  endDate: Date
  status: "approved" | "pending" | "rejected" | "active" | "completed"
  paidAmount: number
  remainingAmount: number
}

// Budget & Expense Models
export interface ExpenseCategory {
  id: string
  name: string
  icon: string
  color: string
  budget: number
  spent: number
  percentage: number
}

export interface BudgetGoal {
  id: string
  category: string
  monthlyBudget: number
  currentMonth: number
  alerts: boolean
}

// Referral & Loyalty Models
export interface ReferredUser {
  id: string
  name: string
  phone: string
  status: "pending" | "verified"
  earnedReward: number
  joinDate: Date
}

export interface Referral {
  id: string
  referralCode: string
  referredCount: number
  earnedAmount: number
  referredUsers: ReferredUser[]
  status: "active" | "inactive"
  createdDate: Date
}

export interface LoyaltyTier {
  tier: "bronze" | "silver" | "gold" | "platinum"
  points: number
  multiplier: number
  benefits: string[]
}

export default function GPay() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const [balance, setBalance] = useState(5420.5)
  const [goldBalance, setGoldBalance] = useState(1.2345)
  const [totalRewards, setTotalRewards] = useState(182)
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: "1",
      type: "scratch",
      amount: 50,
      title: "Scratch & Win",
      description: "Tap to scratch and reveal your reward!",
      isScratched: false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
    {
      id: "2",
      type: "scratch",
      amount: 25,
      title: "Lucky Draw",
      description: "You have a chance to win up to ₹100!",
      isScratched: false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    },
    {
      id: "3",
      type: "cashback",
      amount: 10,
      title: "Recharge Cashback",
      description: "Get 10% cashback on mobile recharge",
      isScratched: true,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    },
    {
      id: "4",
      type: "coupon",
      discount: "20%",
      title: "Food Delivery",
      description: "20% off on Swiggy orders above ₹199",
      isScratched: true,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    },
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "payment",
      title: "Payment Received",
      message: "You received ₹500 from Revan",
      date: new Date(Date.now() - 1000 * 60 * 30),
      isRead: false,
    },
    {
      id: "2",
      type: "reward",
      title: "New Scratch Card!",
      message: "You have a new scratch card waiting",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: false,
    },
    {
      id: "3",
      type: "offer",
      title: "Limited Time Offer",
      message: "Get 50% cashback on electricity bill payment",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: true,
    },
    {
      id: "4",
      type: "system",
      title: "Security Alert",
      message: "Your account was accessed from a new device",
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      isRead: true,
    },
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "received",
      amount: 500,
      contact: { id: "1", name: "Revan", phone: "+91 9512345678", avatar: "/young-man-face.jpg" },
      description: "Payment received",
      date: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "2",
      type: "sent",
      amount: 150,
      contact: { id: "2", name: "Jack", phone: "+91 9512345678", initial: "J" },
      description: "Payment sent",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "3",
      type: "added",
      amount: 2000,
      description: "Added to wallet",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: "4",
      type: "recharge",
      amount: 199,
      description: "Mobile Recharge - Jio",
      date: new Date(Date.now() - 1000 * 60 * 60 * 36),
    },
    {
      id: "5",
      type: "bill",
      amount: 1250,
      description: "Electricity Bill - BESCOM",
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
      id: "6",
      type: "reward",
      amount: 50,
      description: "Scratch Card Reward",
      date: new Date(Date.now() - 1000 * 60 * 60 * 72),
    },
  ])

  // Crypto Wallet State
  const [cryptoWallets, setCryptoWallets] = useState<CryptoWallet[]>([
    {
      id: "1",
      symbol: "BTC",
      name: "Bitcoin",
      quantity: 0.0234,
      currentPrice: 43250,
      balance: 1012.445,
      change24h: 2.5,
      icon: "₿",
    },
    {
      id: "2",
      symbol: "ETH",
      name: "Ethereum",
      quantity: 0.5,
      currentPrice: 2250,
      balance: 1125,
      change24h: -1.2,
      icon: "Ξ",
    },
  ])

  const [cryptoTransactions, setCryptoTransactions] = useState<CryptoTransaction[]>([])

  // Fixed Deposits State
  const [fixedDeposits, setFixedDeposits] = useState<FixedDeposit[]>([
    {
      id: "1",
      amount: 50000,
      depositDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      maturityDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 335),
      interestRate: 6.5,
      tenure: 12,
      status: "active",
      interestEarned: 3250,
      totalAmount: 53250,
    },
  ])

  // Subscriptions State
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "1",
      name: "Netflix",
      vendor: "Netflix Inc.",
      amount: 199,
      frequency: "monthly",
      nextBillingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      status: "active",
      category: "Entertainment",
      autoRenew: true,
    },
    {
      id: "2",
      name: "Spotify Premium",
      vendor: "Spotify AB",
      amount: 119,
      frequency: "monthly",
      nextBillingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
      status: "active",
      category: "Music",
      autoRenew: true,
    },
  ])

  // Loans State
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: "1",
      amount: 200000,
      interestRate: 9.5,
      tenure: 60,
      monthlyEMI: 4167,
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1740),
      status: "active",
      paidAmount: 25002,
      remainingAmount: 174998,
    },
  ])

  // Budget & Expense State
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([
    {
      id: "1",
      name: "Food & Dining",
      icon: "🍔",
      color: "#FF6B6B",
      budget: 8000,
      spent: 5240,
      percentage: 65.5,
    },
    {
      id: "2",
      name: "Transportation",
      icon: "🚗",
      color: "#4ECDC4",
      budget: 5000,
      spent: 3150,
      percentage: 63,
    },
    {
      id: "3",
      name: "Entertainment",
      icon: "🎬",
      color: "#95E1D3",
      budget: 3000,
      spent: 2100,
      percentage: 70,
    },
    {
      id: "4",
      name: "Shopping",
      icon: "🛍️",
      color: "#F8B500",
      budget: 10000,
      spent: 8750,
      percentage: 87.5,
    },
  ])

  const [budgetGoals, setBudgetGoals] = useState<BudgetGoal[]>([])

  // Referral & Loyalty State
  const [referral, setReferral] = useState<Referral>({
    id: "1",
    referralCode: "GPAY123456",
    referredCount: 5,
    earnedAmount: 2500,
    referredUsers: [
      {
        id: "1",
        name: "Arjun Singh",
        phone: "+91 9876543210",
        status: "verified",
        earnedReward: 500,
        joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
      },
      {
        id: "2",
        name: "Priya Patel",
        phone: "+91 8765432109",
        status: "verified",
        earnedReward: 500,
        joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
      },
    ],
    status: "active",
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180),
  })

  const [loyaltyTier, setLoyaltyTier] = useState<LoyaltyTier>({
    tier: "gold",
    points: 4500,
    multiplier: 1.5,
    benefits: ["Free transfers", "Priority support", "Higher cashback"],
  })

  useEffect(() => {
    const savedUser = localStorage.getItem("gpay_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem("gpay_user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("gpay_user")
    setCurrentScreen("home")
  }

  const handlePayContact = (contact: Contact) => {
    setSelectedContact(contact)
    setPaymentAmount("")
    setPaymentSuccess(false)
    setCurrentScreen("payment")
  }

  const handlePaymentComplete = () => {
    const amount = Number.parseFloat(paymentAmount)
    if (amount > 0 && selectedContact) {
      setBalance((prev) => prev - amount)
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          type: "sent",
          amount,
          contact: selectedContact,
          description: "Payment sent",
          date: new Date(),
        },
        ...prev,
      ])
    }
    setPaymentSuccess(true)
  }

  const handleAddMoney = (amount: number) => {
    setBalance((prev) => prev + amount)
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "added",
        amount,
        description: "Added to wallet",
        date: new Date(),
      },
      ...prev,
    ])
  }

  const handleWithdrawMoney = (amount: number) => {
    if (amount <= balance) {
      setBalance((prev) => prev - amount)
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          type: "withdrawn",
          amount,
          description: "Withdrawn to bank",
          date: new Date(),
        },
        ...prev,
      ])
    }
  }

  const handleRecharge = (amount: number, provider: string, number: string) => {
    if (amount <= balance) {
      setBalance((prev) => prev - amount)
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          type: "recharge",
          amount,
          description: `Mobile Recharge - ${provider} (${number})`,
          date: new Date(),
        },
        ...prev,
      ])
    }
  }

  const handleBillPayment = (amount: number, billType: string, billerId: string) => {
    if (amount <= balance) {
      setBalance((prev) => prev - amount)
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          type: "bill",
          amount,
          description: `${billType} Bill - ${billerId}`,
          date: new Date(),
        },
        ...prev,
      ])
    }
  }

  const handleScratchCard = (rewardId: string) => {
    setRewards((prev) =>
      prev.map((r) => {
        if (r.id === rewardId && !r.isScratched) {
          if (r.amount) {
            setBalance((b) => b + r.amount!)
            setTotalRewards((t) => t + r.amount!)
            setTransactions((trans) => [
              {
                id: Date.now().toString(),
                type: "reward",
                amount: r.amount!,
                description: `Scratch Card Reward - ${r.title}`,
                date: new Date(),
              },
              ...trans,
            ])
          }
          return { ...r, isScratched: true }
        }
        return r
      }),
    )
  }

  const handleMarkNotificationRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
  }

  const handleBackFromPayment = () => {
    setCurrentScreen("home")
    setSelectedContact(null)
    setPaymentAmount("")
    setPaymentSuccess(false)
  }

  const handleQRPayment = (merchant: string, amount: number) => {
    setBalance((prev) => prev - amount)
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "sent",
        amount,
        description: `Paid to ${merchant}`,
        date: new Date(),
      },
      ...prev,
    ])
  }

  const handleBuyGold = (amount: number, grams: number) => {
    setBalance((prev) => prev - amount)
    setGoldBalance((prev) => prev + grams)
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "sent",
        amount,
        description: `Bought ${grams.toFixed(4)}g Digital Gold`,
        date: new Date(),
      },
      ...prev,
    ])
  }

  const handleSellGold = (grams: number, amount: number) => {
    setGoldBalance((prev) => prev - grams)
    setBalance((prev) => prev + amount)
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "received",
        amount,
        description: `Sold ${grams.toFixed(4)}g Digital Gold`,
        date: new Date(),
      },
      ...prev,
    ])
  }

  const handleGiftCardPurchase = (cardId: string, amount: number) => {
    setBalance((prev) => prev - amount)
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "sent",
        amount,
        description: `Gift Card Purchase`,
        date: new Date(),
      },
      ...prev,
    ])
  }

  const handleRequestMoney = (contact: Contact, amount: number, note: string) => {
    setNotifications((prev) => [
      {
        id: Date.now().toString(),
        type: "payment",
        title: "Money Request Sent",
        message: `Request for ₹${amount} sent to ${contact.name}`,
        date: new Date(),
        isRead: false,
      },
      ...prev,
    ])
  }

  // Crypto Handlers
  const handleBuyCrypto = (walletId: string, quantity: number, pricePerUnit: number) => {
    const totalAmount = quantity * pricePerUnit
    if (totalAmount <= balance) {
      setBalance((prev) => prev - totalAmount)
      setCryptoWallets((prev) =>
        prev.map((w) =>
          w.id === walletId
            ? { ...w, quantity: w.quantity + quantity, balance: (w.quantity + quantity) * w.currentPrice }
            : w,
        ),
      )
      setCryptoTransactions((prev) => [
        {
          id: Date.now().toString(),
          walletId,
          type: "buy",
          quantity,
          pricePerUnit,
          totalAmount,
          date: new Date(),
          status: "completed",
        },
        ...prev,
      ])
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          type: "sent",
          amount: totalAmount,
          description: `Bought ${quantity} units of crypto`,
          date: new Date(),
        },
        ...prev,
      ])
    }
  }

  const handleSellCrypto = (walletId: string, quantity: number, pricePerUnit: number) => {
    const wallet = cryptoWallets.find((w) => w.id === walletId)
    if (wallet && wallet.quantity >= quantity) {
      const totalAmount = quantity * pricePerUnit
      setBalance((prev) => prev + totalAmount)
      setCryptoWallets((prev) =>
        prev.map((w) =>
          w.id === walletId
            ? { ...w, quantity: w.quantity - quantity, balance: (w.quantity - quantity) * w.currentPrice }
            : w,
        ),
      )
      setCryptoTransactions((prev) => [
        {
          id: Date.now().toString(),
          walletId,
          type: "sell",
          quantity,
          pricePerUnit,
          totalAmount,
          date: new Date(),
          status: "completed",
        },
        ...prev,
      ])
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          type: "received",
          amount: totalAmount,
          description: `Sold ${quantity} units of crypto`,
          date: new Date(),
        },
        ...prev,
      ])
    }
  }

  // Fixed Deposit Handlers
  const handleCreateFixedDeposit = (amount: number, tenure: number, interestRate: number) => {
    if (amount <= balance) {
      setBalance((prev) => prev - amount)
      const maturityDate = new Date()
      maturityDate.setMonth(maturityDate.getMonth() + tenure)
      const interestEarned = (amount * interestRate * tenure) / (12 * 100)

      setFixedDeposits((prev) => [
        {
          id: Date.now().toString(),
          amount,
          depositDate: new Date(),
          maturityDate,
          interestRate,
          tenure,
          status: "active",
          interestEarned,
          totalAmount: amount + interestEarned,
        },
        ...prev,
      ])
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          type: "sent",
          amount,
          description: `Fixed Deposit Created for ${tenure} months`,
          date: new Date(),
        },
        ...prev,
      ])
    }
  }

  // Subscription Handlers
  const handleAddSubscription = (subscription: Subscription) => {
    setSubscriptions((prev) => [{ ...subscription, id: Date.now().toString() }, ...prev])
  }

  const handleCancelSubscription = (subscriptionId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subscriptionId ? { ...s, status: "cancelled" } : s)),
    )
  }

  const handlePauseSubscription = (subscriptionId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subscriptionId ? { ...s, status: "paused" } : s)),
    )
  }

  // Loan Handlers
  const handleApplyLoan = (amount: number, tenure: number, interestRate: number) => {
    const monthlyEMI = (amount * (interestRate / 12 / 100) * (1 + interestRate / 12 / 100) ** tenure) / ((1 + interestRate / 12 / 100) ** tenure - 1)

    setLoans((prev) => [
      {
        id: Date.now().toString(),
        amount,
        interestRate,
        tenure,
        monthlyEMI: Math.round(monthlyEMI),
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * tenure),
        status: "pending",
        paidAmount: 0,
        remainingAmount: amount,
      },
      ...prev,
    ])
  }

  const handlePayLoanEMI = (loanId: string) => {
    const loan = loans.find((l) => l.id === loanId)
    if (loan && balance >= loan.monthlyEMI) {
      setBalance((prev) => prev - loan.monthlyEMI)
      setLoans((prev) =>
        prev.map((l) =>
          l.id === loanId
            ? {
                ...l,
                paidAmount: l.paidAmount + l.monthlyEMI,
                remainingAmount: Math.max(0, l.remainingAmount - l.monthlyEMI),
                status: l.remainingAmount - l.monthlyEMI <= 0 ? "completed" : "active",
              }
            : l,
        ),
      )
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          type: "sent",
          amount: loan.monthlyEMI,
          description: `Loan EMI Payment - ${loan.monthlyEMI}`,
          date: new Date(),
        },
        ...prev,
      ])
    }
  }

  // Budget & Expense Handlers
  const handleUpdateCategorySpent = (categoryId: string, amount: number) => {
    setExpenseCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          const spent = cat.spent + amount
          return {
            ...cat,
            spent,
            percentage: (spent / cat.budget) * 100,
          }
        }
        return cat
      }),
    )
  }

  const handleCreateBudgetGoal = (goal: BudgetGoal) => {
    setBudgetGoals((prev) => [{ ...goal, id: Date.now().toString() }, ...prev])
  }

  // Referral & Loyalty Handlers
  const handleAddReferredUser = (user: ReferredUser) => {
    setReferral((prev) => ({
      ...prev,
      referredCount: prev.referredCount + 1,
      referredUsers: [...prev.referredUsers, user],
    }))
  }

  const handleClaimReferralReward = () => {
    if (referral.earnedAmount > 0) {
      setBalance((prev) => prev + referral.earnedAmount)
      setReferral((prev) => ({ ...prev, earnedAmount: 0 }))
      setTransactions((prev) => [
        {
          id: Date.now().toString(),
          type: "received",
          amount: referral.earnedAmount,
          description: "Referral Reward Claimed",
          date: new Date(),
        },
        ...prev,
      ])
    }
  }

  const unreadNotifications = notifications.filter((n) => !n.isRead).length

  const fullScreenModes: Screen[] = [
    "payment",
    "qr",
    "qr-scanner",
    "recharge",
    "bills",
    "rewards",
    "bank-accounts",
    "offers",
    "split-bill",
    "notifications",
    "gold",
    "gift-cards",
    "request-money",
    "chat-support",
    "autopay",
    "transaction-limits",
    "crypto-wallet",
    "crypto-transaction",
    "savings",
    "subscriptions",
    "loan-calculator",
    "loan-application",
    "budget",
    "referral",
    "loyalty-dashboard",
  ]

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        onQRClick={() => setCurrentScreen("qr")}
        onScanClick={() => setCurrentScreen("qr-scanner")}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen lg:border-l lg:border-border">
        {/* Mobile Header */}
        {!fullScreenModes.includes(currentScreen) && (
          <MobileHeader
            onProfileClick={() => setCurrentScreen("profile")}
            onQRClick={() => setCurrentScreen("qr")}
            onNotificationsClick={() => setCurrentScreen("notifications")}
            unreadCount={unreadNotifications}
            user={user}
          />
        )}

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
          <div className="max-w-5xl mx-auto w-full">
            {currentScreen === "home" && (
              <HomeScreen
                balance={balance}
                totalRewards={totalRewards}
                goldBalance={goldBalance}
                onProfileClick={() => setCurrentScreen("profile")}
                onPayContact={handlePayContact}
                onTransferClick={() => setCurrentScreen("transfer")}
                onAddMoney={handleAddMoney}
                onWithdrawMoney={handleWithdrawMoney}
                onHistoryClick={() => setCurrentScreen("history")}
                onRewardsClick={() => setCurrentScreen("rewards")}
                onRechargeClick={() => setCurrentScreen("recharge")}
                onBillsClick={() => setCurrentScreen("bills")}
                onBankAccountsClick={() => setCurrentScreen("bank-accounts")}
                onOffersClick={() => setCurrentScreen("offers")}
                onSplitBillClick={() => setCurrentScreen("split-bill")}
                onScanClick={() => setCurrentScreen("qr-scanner")}
                onGoldClick={() => setCurrentScreen("gold")}
                onGiftCardsClick={() => setCurrentScreen("gift-cards")}
                onRequestMoneyClick={() => setCurrentScreen("request-money")}
                onChatSupportClick={() => setCurrentScreen("chat-support")}
                onAutopayClick={() => setCurrentScreen("autopay")}
                onLimitsClick={() => setCurrentScreen("transaction-limits")}
                onInvestmentsClick={() => setCurrentScreen("investments")}
                onInsuranceClick={() => setCurrentScreen("insurance")}
                onLendingClick={() => setCurrentScreen("lending")}
                onAnalyticsClick={() => setCurrentScreen("analytics")}
                onSecurityClick={() => setCurrentScreen("security")}
                onCryptoClick={() => setCurrentScreen("crypto-wallet")}
                onSavingsClick={() => setCurrentScreen("savings")}
                onSubscriptionsClick={() => setCurrentScreen("subscriptions")}
                onBudgetClick={() => setCurrentScreen("budget")}
                onReferralClick={() => setCurrentScreen("referral")}
                onLoyaltyClick={() => setCurrentScreen("loyalty-dashboard")}
              />
            )}
            {currentScreen === "profile" && (
              <ProfileScreen
                onBack={() => setCurrentScreen("home")}
                totalRewards={totalRewards}
                user={user}
                onLogout={handleLogout}
              />
            )}
            {currentScreen === "transfer" && (
              <TransferScreen
                onBack={() => setCurrentScreen("home")}
                onPayContact={handlePayContact}
                onBusinessClick={() => setCurrentScreen("business")}
              />
            )}
            {currentScreen === "business" && <BusinessScreen onBack={() => setCurrentScreen("transfer")} />}
            {currentScreen === "payment" && selectedContact && (
              <PaymentScreen
                contact={selectedContact}
                amount={paymentAmount}
                setAmount={setPaymentAmount}
                onBack={handleBackFromPayment}
                onComplete={handlePaymentComplete}
                success={paymentSuccess}
                balance={balance}
              />
            )}
            {currentScreen === "qr" && <QRScreen onBack={() => setCurrentScreen("home")} user={user} />}
            {currentScreen === "history" && (
              <HistoryScreen transactions={transactions} onBack={() => setCurrentScreen("home")} />
            )}
            {currentScreen === "rewards" && (
              <RewardsScreen
                rewards={rewards}
                totalRewards={totalRewards}
                onBack={() => setCurrentScreen("home")}
                onScratch={handleScratchCard}
              />
            )}
            {currentScreen === "recharge" && (
              <RechargeScreen balance={balance} onBack={() => setCurrentScreen("home")} onRecharge={handleRecharge} />
            )}
            {currentScreen === "bills" && (
              <BillsScreen balance={balance} onBack={() => setCurrentScreen("home")} onPayBill={handleBillPayment} />
            )}
            {currentScreen === "bank-accounts" && <BankAccountsScreen onBack={() => setCurrentScreen("home")} />}
            {currentScreen === "bank-balance" && <BankBalanceScreen onBack={() => setCurrentScreen("home")} />}
            {currentScreen === "offers" && <OffersScreen onBack={() => setCurrentScreen("home")} />}
            {currentScreen === "split-bill" && (
              <SplitBillScreen balance={balance} onBack={() => setCurrentScreen("home")} />
            )}
            {currentScreen === "notifications" && (
              <NotificationsScreen
                notifications={notifications}
                onBack={() => setCurrentScreen("home")}
                onMarkRead={handleMarkNotificationRead}
              />
            )}
            {currentScreen === "qr-scanner" && (
              <QRScannerScreen onBack={() => setCurrentScreen("home")} onPayment={handleQRPayment} balance={balance} />
            )}
            {currentScreen === "gold" && (
              <GoldScreen
                onBack={() => setCurrentScreen("home")}
                balance={balance}
                goldBalance={goldBalance}
                onBuyGold={handleBuyGold}
                onSellGold={handleSellGold}
              />
            )}
            {currentScreen === "gift-cards" && (
              <GiftCardsScreen
                onBack={() => setCurrentScreen("home")}
                balance={balance}
                onPurchase={handleGiftCardPurchase}
              />
            )}
            {currentScreen === "request-money" && (
              <RequestMoneyScreen onBack={() => setCurrentScreen("home")} onRequest={handleRequestMoney} />
            )}
            {currentScreen === "chat-support" && <ChatSupportScreen onBack={() => setCurrentScreen("home")} />}
            {currentScreen === "autopay" && <AutopayScreen onBack={() => setCurrentScreen("home")} />}
            {currentScreen === "transaction-limits" && (
              <TransactionLimitsScreen onBack={() => setCurrentScreen("home")} />
            )}
            {currentScreen === "investments" && (
              <InvestmentScreen
                onBack={() => setCurrentScreen("home")}
                onNavigate={setCurrentScreen}
              />
            )}
            {currentScreen === "insurance" && (
              <InsuranceScreen
                onBack={() => setCurrentScreen("home")}
                onNavigate={setCurrentScreen}
              />
            )}
            {currentScreen === "lending" && (
              <LendingScreen
                onBack={() => setCurrentScreen("home")}
                onNavigate={setCurrentScreen}
              />
            )}
            {currentScreen === "analytics" && (
              <AnalyticsScreen onBack={() => setCurrentScreen("home")} />
            )}
            {currentScreen === "transaction-details" && (
              <TransactionDetailsScreen onBack={() => setCurrentScreen("home")} />
            )}
            {currentScreen === "security" && (
              <SecurityScreen onBack={() => setCurrentScreen("home")} />
            )}
            {currentScreen === "crypto-wallet" && (
              <CryptoWalletScreen
                wallets={cryptoWallets}
                onBack={() => setCurrentScreen("home")}
                onBuySell={() => setCurrentScreen("crypto-transaction")}
              />
            )}
            {currentScreen === "crypto-transaction" && (
              <CryptoTransactionScreen
                wallets={cryptoWallets}
                onBack={() => setCurrentScreen("crypto-wallet")}
                onBuyCrypto={handleBuyCrypto}
                onSellCrypto={handleSellCrypto}
                balance={balance}
              />
            )}
            {currentScreen === "savings" && (
              <SavingsScreen
                fixedDeposits={fixedDeposits}
                onBack={() => setCurrentScreen("home")}
                onCreateFD={handleCreateFixedDeposit}
                balance={balance}
              />
            )}
            {currentScreen === "subscriptions" && (
              <SubscriptionsScreen
                subscriptions={subscriptions}
                onBack={() => setCurrentScreen("home")}
                onAddSubscription={handleAddSubscription}
                onCancelSubscription={handleCancelSubscription}
                onPauseSubscription={handlePauseSubscription}
              />
            )}
            {currentScreen === "loan-calculator" && (
              <LoanCalculatorScreen onBack={() => setCurrentScreen("home")} />
            )}
            {currentScreen === "loan-application" && (
              <LoanApplicationScreen
                onBack={() => setCurrentScreen("home")}
                onApplyLoan={handleApplyLoan}
                loans={loans}
              />
            )}
            {currentScreen === "budget" && (
              <BudgetScreen
                categories={expenseCategories}
                budgetGoals={budgetGoals}
                onBack={() => setCurrentScreen("home")}
                onUpdateCategory={handleUpdateCategorySpent}
                onCreateBudgetGoal={handleCreateBudgetGoal}
              />
            )}
            {currentScreen === "referral" && (
              <ReferralScreen
                referral={referral}
                onBack={() => setCurrentScreen("home")}
                onAddReferredUser={handleAddReferredUser}
                onClaimReward={handleClaimReferralReward}
              />
            )}
            {currentScreen === "loyalty-dashboard" && (
              <LoyaltyDashboardScreen
                loyaltyTier={loyaltyTier}
                referral={referral}
                onBack={() => setCurrentScreen("home")}
              />
            )}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        {!fullScreenModes.includes(currentScreen) && (
          <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        )}
      </main>
    </div>
  )
}

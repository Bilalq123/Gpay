"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Plus,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  X,
  Gift,
  Smartphone,
  Receipt,
  Building2,
  Percent,
  Users,
  QrCode,
  Coins,
  CreditCard,
  MessageCircle,
  Calendar,
  Shield,
  ArrowDownToLine,
  TrendingUp,
  BarChart,
} from "lucide-react"
import type { Contact } from "@/app/page"

const contacts: Contact[] = [
  { id: "1", name: "Revan", phone: "+91 9512345678", avatar: "/young-man-face.jpg" },
  { id: "2", name: "Jack", phone: "+91 9512345678", initial: "J" },
  { id: "3", name: "Scott", phone: "+91 9512345678", initial: "S" },
  { id: "4", name: "Elly", phone: "+91 9512345678", avatar: "/young-woman-face.png" },
  { id: "5", name: "Cally", phone: "+91 9512345678", initial: "C" },
  { id: "6", name: "Marina", phone: "+91 9512345678", avatar: "/diverse-woman-smiling.png" },
  { id: "7", name: "Dory", phone: "+91 9512345678", initial: "D" },
  { id: "8", name: "Hank", phone: "+91 9512345678", avatar: "/thoughtful-man-portrait.png" },
]

const businesses = [
  { name: "MakeMyTrip", logo: "MMT", color: "bg-red-500" },
  { name: "redBus", logo: "rB", color: "bg-red-600" },
  { name: "Tata Sky", logo: "TS", color: "bg-blue-600" },
  { name: "Yatra", logo: "Y", color: "bg-red-500" },
  { name: "Barista", logo: "B", color: "bg-red-700" },
]

interface HomeScreenProps {
  balance: number
  totalRewards: number
  goldBalance: number
  onProfileClick: () => void
  onPayContact: (contact: Contact) => void
  onTransferClick: () => void
  onAddMoney: (amount: number) => void
  onWithdrawMoney: (amount: number) => void
  onHistoryClick: () => void
  onRewardsClick: () => void
  onRechargeClick: () => void
  onBillsClick: () => void
  onBankAccountsClick: () => void
  onOffersClick: () => void
  onSplitBillClick: () => void
  onScanClick: () => void
  onGoldClick: () => void
  onGiftCardsClick: () => void
  onRequestMoneyClick: () => void
  onChatSupportClick: () => void
  onAutopayClick: () => void
  onLimitsClick: () => void
  onInvestmentsClick?: () => void
  onInsuranceClick?: () => void
  onLendingClick?: () => void
  onAnalyticsClick?: () => void
  onSecurityClick?: () => void
}

export function HomeScreen({
  balance,
  totalRewards,
  goldBalance,
  onProfileClick,
  onPayContact,
  onTransferClick,
  onAddMoney,
  onWithdrawMoney,
  onHistoryClick,
  onRewardsClick,
  onRechargeClick,
  onBillsClick,
  onBankAccountsClick,
  onOffersClick,
  onSplitBillClick,
  onScanClick,
  onGoldClick,
  onGiftCardsClick,
  onRequestMoneyClick,
  onChatSupportClick,
  onAutopayClick,
  onLimitsClick,
  onInvestmentsClick = () => {},
  onInsuranceClick = () => {},
  onLendingClick = () => {},
  onAnalyticsClick = () => {},
  onSecurityClick = () => {},
}: HomeScreenProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [inputAmount, setInputAmount] = useState("")

  const handleAddMoney = () => {
    const amount = Number.parseFloat(inputAmount)
    if (amount > 0) {
      onAddMoney(amount)
      setInputAmount("")
      setShowAddModal(false)
    }
  }

  const handleWithdrawMoney = () => {
    const amount = Number.parseFloat(inputAmount)
    if (amount > 0 && amount <= balance) {
      onWithdrawMoney(amount)
      setInputAmount("")
      setShowWithdrawModal(false)
    }
  }

  const quickActions = [
    { icon: QrCode, label: "Scan & Pay", onClick: onScanClick, color: "bg-blue-600" },
    { icon: Smartphone, label: "Recharge", onClick: onRechargeClick, color: "bg-green-600" },
    { icon: Receipt, label: "Pay Bills", onClick: onBillsClick, color: "bg-orange-500" },
    { icon: Building2, label: "Bank", onClick: onBankAccountsClick, color: "bg-purple-600" },
    { icon: Gift, label: "Rewards", onClick: onRewardsClick, color: "bg-amber-500" },
    { icon: Percent, label: "Offers", onClick: onOffersClick, color: "bg-pink-500" },
    { icon: Users, label: "Split Bill", onClick: onSplitBillClick, color: "bg-teal-500" },
    { icon: History, label: "History", onClick: onHistoryClick, color: "bg-slate-600" },
  ]

  const moreServices = [
    { icon: Coins, label: "Gold", onClick: onGoldClick, color: "bg-amber-500" },
    { icon: CreditCard, label: "Gift Cards", onClick: onGiftCardsClick, color: "bg-indigo-500" },
    { icon: ArrowDownToLine, label: "Request", onClick: onRequestMoneyClick, color: "bg-cyan-500" },
    { icon: Calendar, label: "Autopay", onClick: onAutopayClick, color: "bg-violet-500" },
    { icon: Shield, label: "Limits", onClick: onLimitsClick, color: "bg-emerald-500" },
    { icon: MessageCircle, label: "Support", onClick: onChatSupportClick, color: "bg-rose-500" },
  ]

  const financialServices = [
    { icon: TrendingUp, label: "Invest", onClick: onInvestmentsClick, color: "bg-green-600" },
    { icon: Shield, label: "Insurance", onClick: onInsuranceClick, color: "bg-red-600" },
    { icon: CreditCard, label: "Loans", onClick: onLendingClick, color: "bg-blue-600" },
    { icon: BarChart, label: "Insights", onClick: onAnalyticsClick, color: "bg-purple-600" },
  ]

  return (
    <div className="flex flex-col">
      {/* Balance Card */}
      <div className="px-4 lg:px-8 py-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-blue-100">Available Balance</p>
                <p className="text-3xl lg:text-4xl font-bold">
                  ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={onRewardsClick}
                className="flex flex-col items-center p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <span className="text-xl">🏆</span>
                <span className="text-xs text-blue-100">₹{totalRewards}</span>
              </button>
              <button
                onClick={onGoldClick}
                className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg transition-colors"
              >
                <span className="text-sm">🥇</span>
                <span className="text-xs text-amber-200">{goldBalance.toFixed(2)}g</span>
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 rounded-xl py-3 transition-colors"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span className="font-medium">Add Money</span>
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 rounded-xl py-3 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span className="font-medium">Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 lg:px-8 py-4">
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
          {quickActions.map((action) => (
            <button key={action.label} onClick={action.onClick} className="flex flex-col items-center gap-2 group">
              <div
                className={`w-12 h-12 lg:w-14 lg:h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
              >
                <action.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-xs text-foreground text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 lg:px-8 py-4">
        <h2 className="text-lg lg:text-xl font-semibold text-foreground mb-4">More Services</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {moreServices.map((service) => (
            <button key={service.label} onClick={service.onClick} className="flex flex-col items-center gap-2 group">
              <div
                className={`w-12 h-12 lg:w-14 lg:h-14 ${service.color} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
              >
                <service.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-xs lg:text-sm text-foreground text-center">{service.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Financial Services Section */}
      <div className="px-4 lg:px-8 py-4">
        <h2 className="text-lg lg:text-xl font-semibold text-foreground mb-4">Financial Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {financialServices.map((service) => (
            <button key={service.label} onClick={service.onClick} className="flex flex-col items-center gap-2 group">
              <div
                className={`w-12 h-12 lg:w-14 lg:h-14 ${service.color} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
              >
                <service.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-xs text-foreground text-center">{service.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Add Money</h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setInputAmount("")
                }}
                className="p-1 hover:bg-muted rounded-full"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 border border-border rounded-xl mb-4 bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex gap-2 mb-4">
              {[500, 1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setInputAmount(amt.toString())}
                  className="flex-1 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg text-foreground transition-colors"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <Button
              onClick={handleAddMoney}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12"
            >
              Add ₹{inputAmount || "0"}
            </Button>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Withdraw Money</h3>
              <button
                onClick={() => {
                  setShowWithdrawModal(false)
                  setInputAmount("")
                }}
                className="p-1 hover:bg-muted rounded-full"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Available: ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 border border-border rounded-xl mb-4 bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex gap-2 mb-4">
              {[500, 1000, 2000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setInputAmount(Math.min(amt, balance).toString())}
                  className="flex-1 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg text-foreground transition-colors"
                >
                  ₹{amt}
                </button>
              ))}
              <button
                onClick={() => setInputAmount(balance.toString())}
                className="flex-1 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg text-foreground transition-colors"
              >
                All
              </button>
            </div>
            <Button
              onClick={handleWithdrawMoney}
              disabled={!inputAmount || Number.parseFloat(inputAmount) > balance}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 disabled:opacity-50"
            >
              Withdraw ₹{inputAmount || "0"}
            </Button>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="mx-4 lg:mx-8 h-1 bg-muted rounded-full" />

      {/* People Section */}
      <div className="px-4 lg:px-8 py-6">
        <h2 className="text-lg lg:text-xl font-semibold text-foreground mb-4">People</h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 lg:gap-4">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onPayContact(contact)}
              className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity group"
            >
              <Avatar className="w-12 h-12 lg:w-14 lg:h-14 border border-border group-hover:border-blue-600 transition-colors">
                {contact.avatar ? <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} /> : null}
                <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
                  {contact.initial || contact.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs lg:text-sm text-foreground truncate w-full text-center">{contact.name}</span>
            </button>
          ))}
          <button
            onClick={onTransferClick}
            className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-border flex items-center justify-center bg-muted hover:border-blue-600 transition-colors">
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-xs lg:text-sm text-foreground">Show More</span>
          </button>
        </div>
      </div>

      {/* Businesses and Bills */}
      <div className="px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg lg:text-xl font-semibold text-foreground">Businesses and Bills</h2>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 text-xs lg:text-sm h-8 px-3 bg-transparent border-blue-600/30 hover:bg-blue-600/10"
          >
            Explore
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 lg:gap-6">
          {businesses.map((business) => (
            <div key={business.name} className="flex flex-col items-center gap-2">
              <div
                className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full ${business.color} flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-sm`}
              >
                <span className="text-white text-xs font-bold">{business.logo}</span>
              </div>
              <span className="text-xs lg:text-sm text-foreground text-center">{business.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* New Payment Button */}
      <div className="px-4 lg:px-8 pb-6 flex justify-center lg:justify-start">
        <Button
          onClick={onTransferClick}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          New payment
        </Button>
      </div>
    </div>
  )
}

"use client"

import { ChevronLeft, Clock, Percent, Gift } from "lucide-react"

interface OffersScreenProps {
  onBack: () => void
}

const offers = [
  {
    id: "1",
    title: "Flat 50% Cashback",
    description: "On electricity bill payment above ₹500",
    maxCashback: "₹200",
    validTill: "Jan 31, 2026",
    category: "Bills",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
  {
    id: "2",
    title: "20% Off on First Recharge",
    description: "Get discount on your first mobile recharge",
    maxCashback: "₹50",
    validTill: "Feb 15, 2026",
    category: "Recharge",
    color: "bg-gradient-to-r from-green-500 to-teal-500",
  },
  {
    id: "3",
    title: "Swiggy 30% Off",
    description: "Use code GPAY30 on orders above ₹199",
    maxCashback: "₹75",
    validTill: "Jan 25, 2026",
    category: "Food",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
  },
  {
    id: "4",
    title: "Amazon Pay 10% Cashback",
    description: "On adding money to Amazon Pay balance",
    maxCashback: "₹100",
    validTill: "Feb 1, 2026",
    category: "Shopping",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
  },
  {
    id: "5",
    title: "IRCTC Train Booking",
    description: "Flat ₹100 off on train tickets",
    maxCashback: "₹100",
    validTill: "Feb 28, 2026",
    category: "Travel",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
]

const categories = ["All", "Bills", "Recharge", "Food", "Shopping", "Travel"]

export function OffersScreen({ onBack }: OffersScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-border bg-gradient-to-r from-pink-500 to-purple-500">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-white">Offers & Coupons</h1>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b border-border overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((cat, index) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                index === 0 ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Offers List */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className={`${offer.color} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Percent className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded-full">{offer.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{offer.title}</h3>
                <p className="text-sm text-white/80">{offer.description}</p>
              </div>
              <div className="p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Gift className="w-4 h-4" />
                      <span>Max: {offer.maxCashback}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{offer.validTill}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 font-medium text-sm hover:underline">Apply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

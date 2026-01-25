"use client"

import { useState } from "react"
import { ChevronLeft, Search, Gift, ShoppingBag, Coffee, Gamepad2, Film, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GiftCard {
  id: string
  name: string
  logo: string
  category: string
  amounts: number[]
  discount?: number
}

interface GiftCardsScreenProps {
  onBack: () => void
  balance: number
  onPurchase: (cardId: string, amount: number) => void
}

const giftCards: GiftCard[] = [
  { id: "1", name: "Amazon", logo: "🛒", category: "shopping", amounts: [100, 250, 500, 1000, 2000], discount: 5 },
  { id: "2", name: "Flipkart", logo: "🛍️", category: "shopping", amounts: [100, 250, 500, 1000] },
  { id: "3", name: "Starbucks", logo: "☕", category: "food", amounts: [250, 500, 750, 1000], discount: 10 },
  { id: "4", name: "Domino's", logo: "🍕", category: "food", amounts: [100, 200, 500, 750] },
  { id: "5", name: "PlayStation", logo: "🎮", category: "gaming", amounts: [500, 1000, 2000, 5000] },
  { id: "6", name: "Steam", logo: "🎯", category: "gaming", amounts: [500, 1000, 2500], discount: 3 },
  { id: "7", name: "Netflix", logo: "🎬", category: "entertainment", amounts: [199, 499, 649, 799] },
  { id: "8", name: "Spotify", logo: "🎵", category: "entertainment", amounts: [119, 179, 1189] },
  { id: "9", name: "Myntra", logo: "👗", category: "shopping", amounts: [500, 1000, 2000, 3000], discount: 8 },
  { id: "10", name: "BookMyShow", logo: "🎪", category: "entertainment", amounts: [250, 500, 1000] },
]

const categories = [
  { id: "all", label: "All", icon: Gift },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "food", label: "Food", icon: Coffee },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "entertainment", label: "Entertainment", icon: Film },
]

export function GiftCardsScreen({ onBack, balance, onPurchase }: GiftCardsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredCards = giftCards.filter((card) => {
    const matchesCategory = selectedCategory === "all" || card.category === selectedCategory
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePurchase = () => {
    if (selectedCard && selectedAmount && selectedAmount <= balance) {
      onPurchase(selectedCard.id, selectedAmount)
      setShowSuccess(true)
    }
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Gift Card Purchased!</h2>
        <p className="text-muted-foreground text-center mb-2">
          {selectedCard?.name} Gift Card - ₹{selectedAmount}
        </p>
        <p className="text-sm text-muted-foreground text-center mb-6">
          The gift card code has been sent to your registered email.
        </p>
        <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700 text-white">
          Done
        </Button>
      </div>
    )
  }

  if (selectedCard) {
    const discountedPrice = selectedAmount ? selectedAmount - (selectedAmount * (selectedCard.discount || 0)) / 100 : 0

    return (
      <div className="flex flex-col bg-background min-h-screen">
        <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
          <button
            onClick={() => {
              setSelectedCard(null)
              setSelectedAmount(null)
            }}
            className="p-2 hover:bg-muted rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">{selectedCard.name} Gift Card</h1>
        </div>

        <div className="p-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center mb-6">
            <span className="text-5xl mb-3 block">{selectedCard.logo}</span>
            <h2 className="text-2xl font-bold">{selectedCard.name}</h2>
            {selectedCard.discount && (
              <span className="inline-block mt-2 px-3 py-1 bg-green-500 rounded-full text-sm font-medium">
                {selectedCard.discount}% OFF
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3">Select Amount</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {selectedCard.amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-4 rounded-xl border-2 font-semibold transition-all ${
                  selectedAmount === amount
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600"
                    : "border-border hover:border-blue-300"
                }`}
              >
                ₹{amount}
              </button>
            ))}
          </div>

          {selectedAmount && (
            <div className="bg-muted rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Gift Card Value</span>
                <span className="text-foreground">₹{selectedAmount}</span>
              </div>
              {selectedCard.discount && (
                <div className="flex justify-between text-sm mb-2 text-green-600">
                  <span>Discount ({selectedCard.discount}%)</span>
                  <span>-₹{((selectedAmount * selectedCard.discount) / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                <span className="text-foreground">You Pay</span>
                <span className="text-foreground">₹{discountedPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 mt-auto">
          <p className="text-sm text-muted-foreground text-center mb-3">
            Wallet Balance: ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <Button
            onClick={handlePurchase}
            disabled={!selectedAmount || discountedPrice > balance}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg disabled:opacity-50"
          >
            Pay ₹{discountedPrice.toFixed(2)}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Gift Cards</h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search gift cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gift Cards Grid */}
      <div className="flex-1 px-4 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="bg-card border border-border rounded-xl p-4 text-center hover:border-blue-600 hover:shadow-md transition-all group"
            >
              <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">{card.logo}</span>
              <p className="font-semibold text-foreground">{card.name}</p>
              {card.discount && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded text-xs font-medium">
                  {card.discount}% OFF
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

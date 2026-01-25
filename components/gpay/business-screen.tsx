"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ChevronLeft, MoreVertical, Search, ChevronRight, Train } from "lucide-react"

interface BusinessScreenProps {
  onBack: () => void
}

const trendingOffers = [
  {
    id: "1",
    title: "New! Hot IPOs & investment news",
    subtitle: "Learn how buy stocks",
    image: "/stock-market-charts-investment.jpg",
    cta: "See Spots",
    color: "bg-indigo-600",
  },
  {
    id: "2",
    title: "40% discount 1st Redbus",
    subtitle: "Use code ABC",
    image: "/bus-travel-booking.jpg",
    cta: "Book now",
    color: "bg-red-500",
  },
]

const foodOffers = [
  {
    id: "1",
    brand: "McDonald's",
    title: "Free Veg Pizza McPuff on ₹200 order on McDelivery",
    subtitle: "Use code PIZZA12, now till Mar 31",
    image: "/mcdonalds-burger-fries-meal.jpg",
    cta: "Order Now",
  },
]

const essentialsOffers = [
  {
    id: "1",
    brand: "BigBasket",
    title: "Buy bigbasket e-gift on woohoo get up to 20% discount",
    subtitle: "Now till Mar 31",
    image: "/grocery-shopping-vegetables-fruits.jpg",
    cta: "Buy Now",
  },
]

export function BusinessScreen({ onBack }: BusinessScreenProps) {
  const [activeTab, setActiveTab] = useState<"people" | "businesses">("businesses")

  return (
    <div className="flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 lg:py-6 lg:border-b lg:border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors lg:hidden">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search mobile number"
              className="pl-10 h-10 lg:h-11 bg-muted border-0 rounded-full text-sm lg:text-base"
            />
          </div>
        </div>
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-4 lg:px-6">
        <button
          onClick={() => setActiveTab("people")}
          className={`flex-1 lg:flex-none lg:px-8 py-3 text-sm lg:text-base font-medium border-b-2 transition-colors ${
            activeTab === "people"
              ? "text-blue-600 border-blue-600"
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          People and bills
        </button>
        <button
          onClick={() => setActiveTab("businesses")}
          className={`flex-1 lg:flex-none lg:px-8 py-3 text-sm lg:text-base font-medium border-b-2 transition-colors ${
            activeTab === "businesses"
              ? "text-blue-600 border-blue-600"
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          Businesses
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Trending Section */}
        <div className="px-4 lg:px-6 py-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Trending</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {trendingOffers.map((offer) => (
              <div
                key={offer.id}
                className={`rounded-xl overflow-hidden ${offer.color} hover:scale-[1.02] transition-transform cursor-pointer`}
              >
                <img
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.title}
                  className="w-full h-24 lg:h-32 object-cover"
                />
                <div className="p-3 lg:p-4">
                  <p className="text-white text-xs lg:text-sm font-medium line-clamp-2">{offer.title}</p>
                  <p className="text-white/70 text-xs lg:text-sm mt-1">{offer.subtitle}</p>
                  <button className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-xs lg:text-sm rounded-full hover:bg-blue-700 transition-colors">
                    {offer.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trains */}
        <div className="mx-4 lg:mx-6 py-4 flex items-center justify-between border-y border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Train className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm lg:text-base font-medium text-foreground">Trains</p>
              <p className="text-xs lg:text-sm text-muted-foreground">Tickets with IRCTC</p>
            </div>
          </div>
          <button className="text-blue-600 text-sm lg:text-base font-medium hover:underline">Book travel</button>
        </div>

        {/* Food Section */}
        <div className="px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Food</h2>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {foodOffers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-xl overflow-hidden bg-gradient-to-r from-red-600 to-red-500 hover:scale-[1.01] transition-transform cursor-pointer"
              >
                <img
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.title}
                  className="w-full h-32 lg:h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-white text-sm lg:text-base font-medium">{offer.title}</p>
                  <p className="text-white/70 text-xs lg:text-sm mt-1">{offer.subtitle}</p>
                  <button className="mt-3 px-4 py-1.5 bg-white/20 text-white text-xs lg:text-sm rounded-full hover:bg-white/30 transition-colors">
                    {offer.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Essentials */}
        <div className="px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Daily Essentials</h2>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {essentialsOffers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-xl overflow-hidden bg-gradient-to-r from-teal-600 to-teal-500 hover:scale-[1.01] transition-transform cursor-pointer"
              >
                <img
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.title}
                  className="w-full h-32 lg:h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-white text-sm lg:text-base font-medium">{offer.title}</p>
                  <p className="text-white/70 text-xs lg:text-sm mt-1">{offer.subtitle}</p>
                  <button className="mt-3 px-4 py-1.5 bg-white/20 text-white text-xs lg:text-sm rounded-full hover:bg-white/30 transition-colors">
                    {offer.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

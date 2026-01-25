"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  MoreVertical,
  Search,
  Smartphone,
  Receipt,
  Building2,
  Phone,
  QrCode,
  RefreshCw,
} from "lucide-react"
import type { Contact } from "@/app/page"

const contacts: Contact[] = [
  { id: "1", name: "Kaira", phone: "+91 9512345678", avatar: "/indian-woman-face.jpg" },
  { id: "2", name: "Revan", phone: "+91 9512345678", avatar: "/young-man-face.jpg" },
  { id: "3", name: "Scott", phone: "+91 9512345678", initial: "S" },
  { id: "4", name: "Alex", phone: "+91 9512345678", avatar: "/young-man-casual.jpg" },
  { id: "5", name: "Elly", phone: "+91 9512345678", avatar: "/young-woman-face.png" },
  { id: "6", name: "Jack", phone: "+91 9512345678", initial: "J" },
  { id: "7", name: "Bunny", phone: "+91 9512345678", avatar: "/professional-woman-portrait.png" },
]

interface TransferScreenProps {
  onBack: () => void
  onPayContact: (contact: Contact) => void
  onBusinessClick: () => void
}

export function TransferScreen({ onBack, onPayContact, onBusinessClick }: TransferScreenProps) {
  const [activeTab, setActiveTab] = useState<"people" | "businesses">("people")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery),
  )

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          onClick={() => {
            setActiveTab("businesses")
            onBusinessClick()
          }}
          className={`flex-1 lg:flex-none lg:px-8 py-3 text-sm lg:text-base font-medium border-b-2 transition-colors ${
            activeTab === "businesses"
              ? "text-blue-600 border-blue-600"
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          Businesses
        </button>
      </div>

      {/* Quick Actions */}
      <div className="px-4 lg:px-6 py-6 border-b border-border">
        <p className="text-sm lg:text-base text-muted-foreground mb-4">Recharge and pay bills</p>
        <div className="flex gap-3 lg:gap-4">
          <button className="flex-1 lg:flex-none flex items-center gap-3 px-4 py-3 border border-border rounded-xl hover:bg-muted transition-colors">
            <Smartphone className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm lg:text-base text-foreground">Mobile Recharge</span>
          </button>
          <button className="flex-1 lg:flex-none flex items-center gap-3 px-4 py-3 border border-border rounded-xl hover:bg-muted transition-colors">
            <Receipt className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm lg:text-base text-foreground">Bill Payment</span>
          </button>
        </div>
      </div>

      {/* Transfer Money */}
      <div className="px-4 lg:px-6 py-6 border-b border-border">
        <p className="text-sm lg:text-base text-muted-foreground mb-4">Transfer Money</p>
        <div className="flex justify-start gap-6 lg:gap-8">
          {[
            { icon: Building2, label: "Bank transfer" },
            { icon: Phone, label: "Phone number" },
            { icon: QrCode, label: "UPI ID or QR" },
            { icon: RefreshCw, label: "Self-transfer" },
          ].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center hover:scale-105 transition-transform">
                <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <span className="text-xs lg:text-sm text-foreground text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1">
        <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onPayContact(contact)}
              className="w-full flex items-center gap-4 px-4 lg:px-6 py-4 hover:bg-muted transition-colors"
            >
              <Avatar className="w-11 h-11 lg:w-12 lg:h-12 border border-border">
                {contact.avatar ? <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} /> : null}
                <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
                  {contact.initial || contact.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm lg:text-base font-medium text-foreground">{contact.name}</p>
                <p className="text-xs lg:text-sm text-muted-foreground">{contact.phone}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

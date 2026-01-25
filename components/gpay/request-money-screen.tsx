"use client"

import { useState } from "react"
import { ChevronLeft, Search, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Contact } from "@/app/page"

interface RequestMoneyScreenProps {
  onBack: () => void
  onRequest: (contact: Contact, amount: number, note: string) => void
}

const contacts: Contact[] = [
  { id: "1", name: "Revan", phone: "+91 9512345678", avatar: "/young-man-face.jpg" },
  { id: "2", name: "Jack", phone: "+91 9512345678", initial: "J" },
  { id: "3", name: "Scott", phone: "+91 9512345678", initial: "S" },
  { id: "4", name: "Elly", phone: "+91 9512345678", avatar: "/young-woman-face.png" },
  { id: "5", name: "Marina", phone: "+91 9512345678", avatar: "/diverse-woman-smiling.png" },
  { id: "6", name: "Dory", phone: "+91 9512345678", initial: "D" },
]

export function RequestMoneyScreen({ onBack, onRequest }: RequestMoneyScreenProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredContacts = contacts.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery),
  )

  const handleRequest = () => {
    if (selectedContact && amount) {
      onRequest(selectedContact, Number.parseFloat(amount), note)
      setShowSuccess(true)
    }
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6">
          <Send className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Request Sent!</h2>
        <p className="text-muted-foreground text-center mb-6">
          Your request for ₹{amount} has been sent to {selectedContact?.name}
        </p>
        <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700 text-white">
          Done
        </Button>
      </div>
    )
  }

  if (selectedContact) {
    return (
      <div className="flex flex-col bg-background min-h-screen">
        <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
          <button onClick={() => setSelectedContact(null)} className="p-2 hover:bg-muted rounded-full">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Request Money</h1>
        </div>

        <div className="flex flex-col items-center py-8 px-4">
          <Avatar className="w-20 h-20 border-2 border-border mb-4">
            {selectedContact.avatar && <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} />}
            <AvatarFallback className="bg-muted text-muted-foreground text-2xl font-medium">
              {selectedContact.initial || selectedContact.name[0]}
            </AvatarFallback>
          </Avatar>
          <p className="text-lg font-semibold text-foreground">{selectedContact.name}</p>
          <p className="text-sm text-muted-foreground">{selectedContact.phone}</p>
        </div>

        <div className="px-4">
          <div className="bg-card border border-border rounded-xl p-4 mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="flex-1 text-3xl font-bold bg-transparent border-none focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {[100, 200, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt.toString())}
                className="flex-1 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg text-foreground transition-colors"
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <label className="text-sm text-muted-foreground mb-2 block">Add a note (optional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Lunch money"
              className="w-full bg-transparent border-none focus:outline-none text-foreground"
            />
          </div>
        </div>

        <div className="p-4 mt-auto">
          <Button
            onClick={handleRequest}
            disabled={!amount || Number.parseFloat(amount) <= 0}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg disabled:opacity-50"
          >
            Request ₹{amount || "0"}
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
        <h1 className="text-xl font-semibold text-foreground">Request Money</h1>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search name or phone number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div className="flex-1 px-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">Select Contact</h2>
        <div className="space-y-2">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <Avatar className="w-12 h-12 border border-border">
                {contact.avatar && <AvatarImage src={contact.avatar || "/placeholder.svg"} />}
                <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                  {contact.initial || contact.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

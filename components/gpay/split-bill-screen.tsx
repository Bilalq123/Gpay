"use client"

import { useState } from "react"
import { ChevronLeft, X, Check, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SplitBillScreenProps {
  balance: number
  onBack: () => void
}

const friends = [
  { id: "1", name: "Revan", phone: "+91 9512345678", avatar: "/young-man-face.jpg" },
  { id: "2", name: "Jack", phone: "+91 9512345678", initial: "J" },
  { id: "3", name: "Elly", phone: "+91 9512345678", avatar: "/young-woman-face.png" },
  { id: "4", name: "Marina", phone: "+91 9512345678", avatar: "/diverse-woman-smiling.png" },
  { id: "5", name: "Scott", phone: "+91 9512345678", initial: "S" },
]

export function SplitBillScreen({ balance, onBack }: SplitBillScreenProps) {
  const [step, setStep] = useState<"select" | "amount" | "summary" | "success">("select")
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [totalAmount, setTotalAmount] = useState("")
  const [description, setDescription] = useState("")

  const toggleFriend = (id: string) => {
    setSelectedFriends((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const perPersonAmount = totalAmount ? (Number.parseFloat(totalAmount) / (selectedFriends.length + 1)).toFixed(2) : "0"

  const selectedFriendsData = friends.filter((f) => selectedFriends.includes(f.id))

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Split Request Sent!</h2>
        <p className="text-muted-foreground text-center mb-6">
          Payment requests sent to {selectedFriends.length} people for ₹{perPersonAmount} each
        </p>
        <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
          Done
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-border">
        <button
          onClick={() => {
            if (step === "select") onBack()
            else if (step === "amount") setStep("select")
            else if (step === "summary") setStep("amount")
          }}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-foreground">Split Bill</h1>
      </div>

      {step === "select" && (
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex items-center gap-3 mb-6 p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl">
            <Users className="w-8 h-8 text-teal-600" />
            <div>
              <p className="font-medium text-foreground">Split expenses fairly</p>
              <p className="text-sm text-muted-foreground">Select friends to split the bill with</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">Select Friends</h2>
          <div className="space-y-2">
            {friends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => toggleFriend(friend.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  selectedFriends.includes(friend.id)
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                    : "border-border hover:border-blue-600"
                }`}
              >
                <Avatar className="w-12 h-12 border border-border">
                  {friend.avatar ? <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} /> : null}
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {friend.initial || friend.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{friend.name}</p>
                  <p className="text-sm text-muted-foreground">{friend.phone}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedFriends.includes(friend.id) ? "border-blue-600 bg-blue-600" : "border-muted-foreground"
                  }`}
                >
                  {selectedFriends.includes(friend.id) && <Check className="w-4 h-4 text-white" />}
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={() => setStep("amount")}
            disabled={selectedFriends.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl mt-6"
          >
            Continue with {selectedFriends.length} friends
          </Button>
        </div>
      )}

      {step === "amount" && (
        <div className="flex-1 p-4 lg:p-6">
          {/* Selected Friends */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedFriendsData.map((friend) => (
              <div key={friend.id} className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
                <Avatar className="w-6 h-6">
                  {friend.avatar ? <AvatarImage src={friend.avatar || "/placeholder.svg"} /> : null}
                  <AvatarFallback className="text-xs">{friend.initial || friend.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">{friend.name}</span>
                <button onClick={() => toggleFriend(friend.id)}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Total Bill Amount</label>
              <Input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Enter total amount"
                className="h-14 text-2xl font-bold"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Description (Optional)</label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Dinner at restaurant"
                className="h-12"
              />
            </div>
          </div>

          {totalAmount && (
            <div className="mt-6 p-4 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">Split among {selectedFriends.length + 1} people</p>
              <p className="text-2xl font-bold text-foreground">₹{perPersonAmount} each</p>
            </div>
          )}

          <Button
            onClick={() => setStep("summary")}
            disabled={!totalAmount || Number.parseFloat(totalAmount) <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl mt-6"
          >
            Continue
          </Button>
        </div>
      )}

      {step === "summary" && (
        <div className="flex-1 p-4 lg:p-6">
          <div className="bg-muted rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Split Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-medium text-foreground">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Split Between</span>
                <span className="font-medium text-foreground">{selectedFriends.length + 1} people</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Your Share</span>
                <span className="font-medium text-foreground">₹{perPersonAmount}</span>
              </div>
              {description && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description</span>
                  <span className="font-medium text-foreground">{description}</span>
                </div>
              )}
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-3">Request from</h3>
          <div className="space-y-2 mb-6">
            {selectedFriendsData.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    {friend.avatar ? <AvatarImage src={friend.avatar || "/placeholder.svg"} /> : null}
                    <AvatarFallback>{friend.initial || friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{friend.name}</span>
                </div>
                <span className="font-semibold text-foreground">₹{perPersonAmount}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setStep("success")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl"
          >
            Send Split Request
          </Button>
        </div>
      )}
    </div>
  )
}

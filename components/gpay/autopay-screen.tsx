"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Plus, Zap, Wifi, Droplets, Phone, Trash2, Calendar, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface Autopay {
  id: string
  name: string
  type: string
  icon: React.ReactNode
  amount: number
  frequency: "weekly" | "monthly" | "yearly"
  nextDate: Date
  isActive: boolean
}

interface AutopayScreenProps {
  onBack: () => void
}

export function AutopayScreen({ onBack }: AutopayScreenProps) {
  const [autopays, setAutopays] = useState<Autopay[]>([
    {
      id: "1",
      name: "Electricity Bill",
      type: "BESCOM",
      icon: <Zap className="w-5 h-5" />,
      amount: 1500,
      frequency: "monthly",
      nextDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
      isActive: true,
    },
    {
      id: "2",
      name: "Broadband",
      type: "Jio Fiber",
      icon: <Wifi className="w-5 h-5" />,
      amount: 999,
      frequency: "monthly",
      nextDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
      isActive: true,
    },
    {
      id: "3",
      name: "Water Bill",
      type: "BWSSB",
      icon: <Droplets className="w-5 h-5" />,
      amount: 450,
      frequency: "monthly",
      nextDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 22),
      isActive: false,
    },
    {
      id: "4",
      name: "Mobile Postpaid",
      type: "Airtel",
      icon: <Phone className="w-5 h-5" />,
      amount: 599,
      frequency: "monthly",
      nextDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      isActive: true,
    },
  ])

  const [showAddNew, setShowAddNew] = useState(false)

  const toggleAutopay = (id: string) => {
    setAutopays((prev) => prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)))
  }

  const deleteAutopay = (id: string) => {
    setAutopays((prev) => prev.filter((a) => a.id !== id))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  }

  const getDaysUntil = (date: Date) => {
    const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return days
  }

  const totalMonthly = autopays.filter((a) => a.isActive).reduce((sum, a) => sum + a.amount, 0)

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Autopay</h1>
      </div>

      {/* Summary Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
          <p className="text-purple-200 text-sm mb-1">Monthly Autopay Total</p>
          <p className="text-3xl font-bold mb-4">₹{totalMonthly.toLocaleString()}</p>
          <div className="flex items-center gap-2 text-purple-200 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{autopays.filter((a) => a.isActive).length} active autopays</span>
          </div>
        </div>
      </div>

      {/* Autopay List */}
      <div className="flex-1 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Autopays</h2>
          <Button variant="outline" size="sm" onClick={() => setShowAddNew(true)} className="gap-1">
            <Plus className="w-4 h-4" />
            Add New
          </Button>
        </div>

        <div className="space-y-3">
          {autopays.map((autopay) => {
            const daysUntil = getDaysUntil(autopay.nextDate)
            return (
              <div
                key={autopay.id}
                className={`bg-card border border-border rounded-xl p-4 transition-opacity ${
                  !autopay.isActive ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        autopay.isActive
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {autopay.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{autopay.name}</p>
                      <p className="text-sm text-muted-foreground">{autopay.type}</p>
                    </div>
                  </div>
                  <Switch checked={autopay.isActive} onCheckedChange={() => toggleAutopay(autopay.id)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-foreground">
                      <IndianRupee className="w-4 h-4" />
                      <span className="font-semibold">{autopay.amount}</span>
                      <span className="text-muted-foreground text-sm">/{autopay.frequency}</span>
                    </div>
                    {autopay.isActive && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          daysUntil <= 3
                            ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `In ${daysUntil} days`}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteAutopay(autopay.id)}
                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {autopay.isActive && (
                  <p className="text-xs text-muted-foreground mt-2">Next payment on {formatDate(autopay.nextDate)}</p>
                )}
              </div>
            )
          })}
        </div>

        {autopays.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No autopays set up yet</p>
            <Button onClick={() => setShowAddNew(true)} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Autopay
            </Button>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Autopay will automatically deduct the amount from your wallet on the scheduled date. Make sure you have
          sufficient balance.
        </p>
      </div>
    </div>
  )
}

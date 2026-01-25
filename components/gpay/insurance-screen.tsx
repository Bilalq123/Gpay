"use client"

import { ChevronLeft, Shield, Plus, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InsuranceScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

interface Policy {
  id: string
  type: "life" | "health" | "travel"
  name: string
  provider: string
  coverageAmount: number
  monthlyPremium: number
  renewalDate: Date
  status: "active" | "expiring-soon" | "expired"
  documents: string[]
}

const mockPolicies: Policy[] = [
  {
    id: "1",
    type: "life",
    name: "Life Insurance Plus",
    provider: "HDFC Life",
    coverageAmount: 5000000,
    monthlyPremium: 2500,
    renewalDate: new Date("2025-12-31"),
    status: "active",
    documents: ["policy_document.pdf", "reciept.pdf"],
  },
  {
    id: "2",
    type: "health",
    name: "Health Insurance Premium",
    provider: "Apollo Insurance",
    coverageAmount: 500000,
    monthlyPremium: 1800,
    renewalDate: new Date("2025-06-30"),
    status: "active",
    documents: ["health_policy.pdf"],
  },
  {
    id: "3",
    type: "travel",
    name: "International Travel Insurance",
    provider: "Bajaj Allianz",
    coverageAmount: 500000,
    monthlyPremium: 499,
    renewalDate: new Date("2024-12-31"),
    status: "expired",
    documents: ["travel_policy.pdf"],
  },
]

export function InsuranceScreen({
  onBack,
  onNavigate,
}: InsuranceScreenProps) {
  const activeCount = mockPolicies.filter((p) => p.status === "active").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expiring-soon":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "expiring-soon":
        return "Expiring Soon"
      case "expired":
        return "Expired"
      default:
        return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "life":
        return "❤️"
      case "health":
        return "⚕️"
      case "travel":
        return "✈️"
      default:
        return "🛡️"
    }
  }

  return (
    <div className="flex flex-col h-full bg-background animate-slideInUp">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border animate-slideInDown">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Insurance</h1>
        <Button size="sm" variant="ghost" onClick={() => onNavigate("insurance-details")}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Summary Card */}
          <Card className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Insurance Summary</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-blue-100">Active Policies</div>
                <div className="text-2xl font-bold">{activeCount}</div>
              </div>
              <div>
                <div className="text-xs text-blue-100">Total Monthly Premium</div>
                <div className="text-lg font-semibold">
                  ₹{mockPolicies
                    .filter((p) => p.status === "active")
                    .reduce((sum, p) => sum + p.monthlyPremium, 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>
          </Card>

          {/* Policies List */}
          <div className="space-y-3">
            {mockPolicies.map((policy) => (
              <Card
                key={policy.id}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTypeIcon(policy.type)}</div>
                    <div>
                      <div className="font-semibold">{policy.name}</div>
                      <div className="text-xs text-muted-foreground">{policy.provider}</div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(policy.status)}>
                    {getStatusLabel(policy.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <div className="text-muted-foreground">Coverage</div>
                    <div className="font-semibold">₹{(policy.coverageAmount / 100000).toFixed(1)}L</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Monthly Premium</div>
                    <div className="font-semibold">₹{policy.monthlyPremium.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Renews {policy.renewalDate.toLocaleDateString()}
                  </div>
                  <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Learn More Section */}
          <Card className="p-4 bg-muted">
            <h3 className="font-semibold mb-2">Need Insurance?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Explore our range of insurance products designed to protect you and your family.
            </p>
            <Button className="w-full">Browse Plans</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

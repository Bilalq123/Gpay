"use client"

import React from "react"

import { ChevronLeft, Lock, Smartphone, Eye, Shield, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

interface SecurityScreenProps {
  onBack: () => void
}

interface SecurityFeature {
  id: string
  name: string
  description: string
  status: "enabled" | "disabled" | "recommended"
  icon: React.ReactNode
  action: string
}

export function SecurityScreen({ onBack }: SecurityScreenProps) {
  const [bioEnabled, setBioEnabled] = useState(true)
  const [twoFAEnabled, setTwoFAEnabled] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const securityFeatures: SecurityFeature[] = [
    {
      id: "1",
      name: "Biometric Authentication",
      description: "Use fingerprint or face recognition to unlock your account",
      status: "enabled",
      icon: <Smartphone className="w-5 h-5" />,
      action: "Manage",
    },
    {
      id: "2",
      name: "Transaction PIN",
      description: "Require PIN for all transactions above ₹10,000",
      status: "enabled",
      icon: <Lock className="w-5 h-5" />,
      action: "Change PIN",
    },
    {
      id: "3",
      name: "Two-Factor Authentication",
      description: "Get OTP on SMS/Email for sensitive operations",
      status: "enabled",
      icon: <Shield className="w-5 h-5" />,
      action: "Configure",
    },
    {
      id: "4",
      name: "Device Verification",
      description: "Recognize and verify new devices automatically",
      status: "enabled",
      icon: <CheckCircle className="w-5 h-5" />,
      action: "View Devices",
    },
  ]

  const recentActivity = [
    {
      id: "1",
      action: "Login",
      device: "iPhone 12",
      location: "New Delhi",
      time: "2 hours ago",
      status: "verified",
    },
    {
      id: "2",
      action: "Password Change",
      device: "Chrome Browser",
      location: "New Delhi",
      time: "1 day ago",
      status: "verified",
    },
    {
      id: "3",
      action: "New Device Added",
      device: "Samsung Galaxy S21",
      location: "Bangalore",
      time: "5 days ago",
      status: "verified",
    },
  ]

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
        <h1 className="text-lg font-semibold">Security Settings</h1>
        <div className="w-8" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Security Score */}
          <Card className="p-4 bg-gradient-to-br from-green-600 to-green-700 text-white border-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-green-100">Security Score</div>
                <div className="text-3xl font-bold">92/100</div>
              </div>
              <Shield className="w-12 h-12 text-green-200" />
            </div>
            <div className="text-xs text-green-100">
              Your account is well protected. Keep it secure!
            </div>
          </Card>

          {/* Security Features */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">Security Features</h2>
            {securityFeatures.map((feature) => (
              <Card
                key={feature.id}
                className="p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 dark:text-blue-400 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{feature.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      feature.status === "enabled"
                        ? "default"
                        : feature.status === "recommended"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {feature.status === "enabled"
                      ? "On"
                      : feature.status === "recommended"
                        ? "Recommended"
                        : "Off"}
                  </Badge>
                </div>
                <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                  {feature.action}
                </Button>
              </Card>
            ))}
          </div>

          {/* Quick Settings */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">Quick Settings</h2>

            <Card className="p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">Biometric Login</div>
                <div className="text-xs text-muted-foreground">
                  Login with fingerprint or face
                </div>
              </div>
              <Switch checked={bioEnabled} onCheckedChange={setBioEnabled} />
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">Two-Factor Authentication</div>
                <div className="text-xs text-muted-foreground">
                  Extra security layer for login
                </div>
              </div>
              <Switch checked={twoFAEnabled} onCheckedChange={setTwoFAEnabled} />
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">Security Notifications</div>
                <div className="text-xs text-muted-foreground">
                  Get alerts for suspicious activity
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">Recent Activity</h2>
            {recentActivity.map((activity) => (
              <Card key={activity.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-sm">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.device}</div>
                  </div>
                  <Badge variant="outline" className="h-5 text-xs">
                    {activity.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{activity.location}</span>
                  <span>{activity.time}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Security Warning */}
          <Card className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Security Tips</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Never share your OTP or PIN with anyone</li>
                  <li>• Use a strong, unique password</li>
                  <li>• Verify devices before accessing your account</li>
                  <li>• Update your contact information</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

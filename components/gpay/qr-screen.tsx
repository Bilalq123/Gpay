"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Copy, Share2, Check } from "lucide-react"
import type { User } from "@/app/page"

interface QRScreenProps {
  onBack: () => void
  user?: User | null
}

export function QRScreen({ onBack, user }: QRScreenProps) {
  const [copied, setCopied] = useState(false)

  const userInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"
  const upiId = user?.email ? `${user.email.split("@")[0]}@gpay` : "user@gpay"
  const displayName = user?.name || "User"

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-[80vh] bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-border">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-foreground">Your QR Code</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* QR Card */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-lg max-w-sm w-full">
          {/* User Info - Using logged in user data */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">{userInitial}</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{displayName}</h2>
            <p className="text-sm text-muted-foreground">{upiId}</p>
          </div>

          {/* Fake QR Code */}
          <div className="bg-white p-4 rounded-2xl mx-auto w-fit">
            <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
              {/* QR Code Pattern - Fake but realistic looking */}
              <rect fill="white" width="200" height="200" />
              {/* Corner squares */}
              <rect fill="black" x="10" y="10" width="50" height="50" />
              <rect fill="white" x="17" y="17" width="36" height="36" />
              <rect fill="black" x="24" y="24" width="22" height="22" />

              <rect fill="black" x="140" y="10" width="50" height="50" />
              <rect fill="white" x="147" y="17" width="36" height="36" />
              <rect fill="black" x="154" y="24" width="22" height="22" />

              <rect fill="black" x="10" y="140" width="50" height="50" />
              <rect fill="white" x="17" y="147" width="36" height="36" />
              <rect fill="black" x="24" y="154" width="22" height="22" />

              {/* Random pattern */}
              <rect fill="black" x="70" y="10" width="8" height="8" />
              <rect fill="black" x="86" y="10" width="8" height="8" />
              <rect fill="black" x="110" y="10" width="8" height="8" />
              <rect fill="black" x="70" y="26" width="8" height="8" />
              <rect fill="black" x="94" y="26" width="8" height="8" />
              <rect fill="black" x="118" y="26" width="8" height="8" />
              <rect fill="black" x="78" y="42" width="8" height="8" />
              <rect fill="black" x="102" y="42" width="8" height="8" />
              <rect fill="black" x="126" y="42" width="8" height="8" />

              <rect fill="black" x="10" y="70" width="8" height="8" />
              <rect fill="black" x="26" y="70" width="8" height="8" />
              <rect fill="black" x="42" y="78" width="8" height="8" />
              <rect fill="black" x="10" y="86" width="8" height="8" />
              <rect fill="black" x="34" y="94" width="8" height="8" />
              <rect fill="black" x="10" y="110" width="8" height="8" />
              <rect fill="black" x="26" y="118" width="8" height="8" />
              <rect fill="black" x="50" y="110" width="8" height="8" />

              <rect fill="black" x="70" y="70" width="8" height="8" />
              <rect fill="black" x="86" y="78" width="8" height="8" />
              <rect fill="black" x="102" y="70" width="8" height="8" />
              <rect fill="black" x="78" y="94" width="8" height="8" />
              <rect fill="black" x="94" y="86" width="8" height="8" />
              <rect fill="black" x="110" y="94" width="8" height="8" />
              <rect fill="black" x="70" y="110" width="8" height="8" />
              <rect fill="black" x="94" y="118" width="8" height="8" />
              <rect fill="black" x="118" y="110" width="8" height="8" />

              <rect fill="black" x="140" y="70" width="8" height="8" />
              <rect fill="black" x="158" y="78" width="8" height="8" />
              <rect fill="black" x="174" y="70" width="8" height="8" />
              <rect fill="black" x="148" y="94" width="8" height="8" />
              <rect fill="black" x="166" y="86" width="8" height="8" />
              <rect fill="black" x="182" y="94" width="8" height="8" />
              <rect fill="black" x="140" y="118" width="8" height="8" />
              <rect fill="black" x="166" y="110" width="8" height="8" />
              <rect fill="black" x="182" y="118" width="8" height="8" />

              <rect fill="black" x="70" y="150" width="8" height="8" />
              <rect fill="black" x="86" y="142" width="8" height="8" />
              <rect fill="black" x="102" y="158" width="8" height="8" />
              <rect fill="black" x="118" y="150" width="8" height="8" />
              <rect fill="black" x="78" y="174" width="8" height="8" />
              <rect fill="black" x="110" y="166" width="8" height="8" />
              <rect fill="black" x="126" y="182" width="8" height="8" />

              <rect fill="black" x="142" y="142" width="8" height="8" />
              <rect fill="black" x="158" y="150" width="8" height="8" />
              <rect fill="black" x="174" y="158" width="8" height="8" />
              <rect fill="black" x="150" y="174" width="8" height="8" />
              <rect fill="black" x="166" y="166" width="8" height="8" />
              <rect fill="black" x="182" y="182" width="8" height="8" />

              {/* GPay logo in center */}
              <rect fill="white" x="75" y="75" width="50" height="50" rx="8" />
              <circle fill="#4285F4" cx="90" cy="100" r="10" />
              <circle fill="#34A853" cx="110" cy="100" r="10" />
              <circle fill="#FBBC05" cx="100" cy="85" r="10" />
              <circle fill="#EA4335" cx="100" cy="115" r="10" />
            </svg>
          </div>

          {/* UPI ID */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">UPI ID:</span>
            <span className="text-sm font-medium text-foreground">{upiId}</span>
            <button onClick={handleCopy} className="p-1 hover:bg-muted rounded transition-colors">
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <Button variant="outline" className="rounded-full px-6 gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">Download</Button>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-6 max-w-xs">
          Scan this QR code to receive payments directly to your GPay account
        </p>
      </div>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatSupportScreenProps {
  onBack: () => void
}

const botResponses: Record<string, string> = {
  default: "I'm here to help! You can ask me about payments, transactions, rewards, or any other GPay features.",
  payment:
    "To make a payment, go to Home > Select a contact or use Scan & Pay. You can also search for a contact in the Pay section.",
  refund:
    "Refunds typically take 3-5 business days. If you haven't received your refund, please check your transaction history or contact your bank.",
  balance: "You can check your balance on the Home screen. The balance card shows your available wallet balance.",
  reward:
    "You can earn rewards by making payments, recharging, and paying bills. Check the Rewards section to see your scratch cards!",
  upi: "Your UPI ID is based on your registered email. You can find it in your Profile or QR Code section.",
  bank: "To link a bank account, go to Profile > Bank account > Add new account. Follow the verification steps.",
  limit: "Transaction limits vary based on your bank. Most banks allow up to ₹1,00,000 per day for UPI transactions.",
  help: "I can help you with: \n• Making payments\n• Transaction issues\n• Rewards & offers\n• Bank account linking\n• UPI settings\n\nJust type your question!",
}

export function ChatSupportScreen({ onBack }: ChatSupportScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm GPay Support Bot. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("payment") || lowerMessage.includes("pay") || lowerMessage.includes("send money")) {
      return botResponses["payment"]
    }
    if (lowerMessage.includes("refund") || lowerMessage.includes("return")) {
      return botResponses["refund"]
    }
    if (lowerMessage.includes("balance") || lowerMessage.includes("wallet")) {
      return botResponses["balance"]
    }
    if (lowerMessage.includes("reward") || lowerMessage.includes("scratch") || lowerMessage.includes("cashback")) {
      return botResponses["reward"]
    }
    if (lowerMessage.includes("upi") || lowerMessage.includes("id")) {
      return botResponses["upi"]
    }
    if (lowerMessage.includes("bank") || lowerMessage.includes("account") || lowerMessage.includes("link")) {
      return botResponses["bank"]
    }
    if (lowerMessage.includes("limit") || lowerMessage.includes("maximum")) {
      return botResponses["limit"]
    }
    if (lowerMessage.includes("help") || lowerMessage.includes("what can")) {
      return botResponses["help"]
    }

    return botResponses["default"]
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(
      () => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(input),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const quickQuestions = ["How to make a payment?", "Check my rewards", "UPI limits", "Link bank account"]

  return (
    <div className="flex flex-col bg-background h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border bg-card">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">GPay Support</h1>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "bot" ? "bg-blue-600" : "bg-muted"
              }`}
            >
              {message.sender === "bot" ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-200" : "text-muted-foreground"}`}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm">
              <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-xs text-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-muted rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

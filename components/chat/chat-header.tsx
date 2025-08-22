"use client"
import { useAuth } from "@/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bot, Zap, History, Plus } from "lucide-react"
import Link from "next/link"

interface ChatHeaderProps {
  onToggleHistory: () => void
  onNewChat: () => void
  showHistory: boolean
  currentChatTitle?: string
}

export function ChatHeader({ onToggleHistory, onNewChat, showHistory, currentChatTitle }: ChatHeaderProps) {
  const { user } = useAuth()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-serif font-black">Maxx AI Fitness Coach</h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                  {currentChatTitle && <span className="text-xs text-muted-foreground">• {currentChatTitle}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleHistory}
              className={showHistory ? "bg-primary/10" : ""}
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button variant="outline" size="sm" onClick={onNewChat}>
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
            <div className="text-right">
              <p className="text-sm font-medium">Hello, {user?.name}</p>
              <p className="text-xs text-muted-foreground">Ready to maximize your potential?</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

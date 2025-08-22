"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useSubscription } from "@/hooks/use-subscription"
import { Crown, Zap, Heart, MessageCircle, Gem } from "lucide-react"
import Link from "next/link"

export function SubscriptionIndicator() {
  const { 
    plan, 
    features, 
    isLoading, 
    getRemainingLives, 
    getAIMessageCount, 
    canSendAIMessage,
    getDailyGemsCollected
  } = useSubscription()

  if (isLoading) {
    return (
      <div className="p-3 space-y-2 animate-pulse">
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-2 bg-muted rounded"></div>
      </div>
    )
  }

  const remainingLives = getRemainingLives()
  const aiMessagesUsed = getAIMessageCount()
  const dailyGemsUsed = getDailyGemsCollected()

  const getPlanColor = () => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      case 'basic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanIcon = () => {
    switch (plan) {
      case 'free': return <Heart className="w-3 h-3" />
      case 'basic': return <Zap className="w-3 h-3" />
      case 'premium': return <Crown className="w-3 h-3" />
      default: return <Heart className="w-3 h-3" />
    }
  }

  const getPlanName = () => {
    switch (plan) {
      case 'free': return 'Gratuito'
      case 'basic': return 'Básico'
      case 'premium': return 'Premium'
      default: return 'Gratuito'
    }
  }

  return (
    <div className="px-3 py-2 space-y-3">
      {/* Plan Badge */}
      <div className="flex items-center justify-between">
        <Badge className={`text-xs font-medium ${getPlanColor()}`}>
          {getPlanIcon()}
          <span className="ml-1">{getPlanName()}</span>
        </Badge>
        {plan === 'free' && (
          <Link href="/subscription">
            <Button variant="ghost" size="sm" className="h-5 px-2 text-xs">
              Mejorar
            </Button>
          </Link>
        )}
      </div>

      {/* Usage Stats */}
      <div className="space-y-2">
        {/* Lives indicator */}
        {features.lives !== 'unlimited' && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-500" />
                <span>Vidas</span>
              </div>
              <span className="text-muted-foreground">
                {remainingLives}/{features.lives}
              </span>
            </div>
            <Progress 
              value={(remainingLives / (features.lives as number)) * 100} 
              className="h-1"
            />
          </div>
        )}

        {/* AI Messages indicator */}
        {features.maxAIMessages !== 'unlimited' && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3 text-blue-500" />
                <span>IA Hoy</span>
              </div>
              <span className="text-muted-foreground">
                {aiMessagesUsed}/{features.maxAIMessages}
              </span>
            </div>
            <Progress 
              value={(aiMessagesUsed / (features.maxAIMessages as number)) * 100} 
              className="h-1"
            />
          </div>
        )}

        {/* Daily Gems indicator */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Gem className="w-3 h-3 text-purple-500" />
              <span>Gemas Hoy</span>
            </div>
            <span className="text-muted-foreground">
              {dailyGemsUsed}/{features.maxDailyGems}
            </span>
          </div>
          <Progress 
            value={(dailyGemsUsed / features.maxDailyGems) * 100} 
            className="h-1"
          />
        </div>
      </div>

      {/* Upgrade prompt for free users */}
      {plan === 'free' && (
        <div className="mt-2 p-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
          <div className="text-xs text-center space-y-1">
            <div className="font-medium">¿Sin vidas?</div>
            <Link href="/subscription">
              <Button size="sm" className="w-full h-6 text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Vidas Ilimitadas
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Feature restrictions indicator */}
      {(plan === 'free' || (plan === 'basic' && (features.emotionalHealthRestricted || features.socialHealthRestricted))) && (
        <div className="text-xs text-muted-foreground text-center">
          {plan === 'free' && "🔒 Salud emocional y social bloqueadas"}
          {plan === 'basic' && "⚠️ Acceso limitado a algunas funciones"}
        </div>
      )}
    </div>
  )
}

export default SubscriptionIndicator

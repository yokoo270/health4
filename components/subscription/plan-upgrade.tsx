"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Star } from "lucide-react"
import { useAuth, type SubscriptionPlan } from "@/auth/auth-provider"

interface PlanFeature {
  text: string
  included: boolean
}

interface Plan {
  id: SubscriptionPlan
  name: string
  price: string
  description: string
  features: PlanFeature[]
  icon: any
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    icon: Star,
    features: [
      { text: "5 AI messages per day", included: true },
      { text: "2 workout generations per month", included: true },
      { text: "1 nutrition plan per month", included: true },
      { text: "Basic analytics", included: false },
      { text: "Priority support", included: false },
      { text: "Custom meal plans", included: false },
    ],
  },
  {
    id: "basic",
    name: "Basic",
    price: "$9.99",
    description: "Great for fitness enthusiasts",
    icon: Zap,
    features: [
      { text: "50 AI messages per day", included: true },
      { text: "10 workout generations per month", included: true },
      { text: "5 nutrition plans per month", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Data export", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19.99",
    description: "For serious athletes",
    icon: Crown,
    popular: true,
    features: [
      { text: "200 AI messages per day", included: true },
      { text: "50 workout generations per month", included: true },
      { text: "20 nutrition plans per month", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
      { text: "Custom meal plans", included: true },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$39.99",
    description: "Unlimited everything",
    icon: Crown,
    features: [
      { text: "Unlimited AI messages", included: true },
      { text: "Unlimited workout generations", included: true },
      { text: "Unlimited nutrition plans", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
      { text: "API access", included: true },
    ],
  },
]

export function PlanUpgrade() {
  const { user, upgradePlan } = useAuth()
  const [isUpgrading, setIsUpgrading] = useState<SubscriptionPlan | null>(null)

  const handleUpgrade = async (planId: SubscriptionPlan) => {
    if (planId === "free") return
    
    setIsUpgrading(planId)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const success = await upgradePlan(planId)
      if (success) {
        alert(`Successfully upgraded to ${planId} plan!`)
      } else {
        alert("Upgrade failed. Please try again.")
      }
    } catch (error) {
      alert("Payment failed. Please try again.")
    } finally {
      setIsUpgrading(null)
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => {
        const isCurrentPlan = user?.subscription?.plan === plan.id
        const Icon = plan.icon
        
        return (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} ${isCurrentPlan ? 'border-green-500' : ''}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${plan.popular ? 'from-primary to-secondary' : 'from-muted to-muted-foreground'} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">{plan.price}</div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className={`w-4 h-4 ${feature.included ? 'text-green-500' : 'text-muted-foreground opacity-50'}`} />
                    <span className={feature.included ? '' : 'text-muted-foreground line-through'}>{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <Button
                className="w-full"
                variant={isCurrentPlan ? "outline" : plan.popular ? "default" : "outline"}
                onClick={() => handleUpgrade(plan.id)}
                disabled={isCurrentPlan || isUpgrading === plan.id}
              >
                {isUpgrading === plan.id ? "Processing..." : 
                 isCurrentPlan ? "Current Plan" : 
                 plan.id === "free" ? "Current Plan" : 
                 `Upgrade to ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
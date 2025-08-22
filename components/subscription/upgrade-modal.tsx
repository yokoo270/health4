"use client"
import { useState } from "react"
import type React from "react"

import { useAuth, type SubscriptionPlan } from "@/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, Zap, CreditCard, Loader2 } from "lucide-react"

const plans = [
  {
    id: "basic" as SubscriptionPlan,
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "Perfect for getting started with AI fitness",
    features: [
      "50 AI messages per day",
      "10 workout generations per month",
      "5 nutrition plans per month",
      "Basic analytics access",
      "Data export",
    ],
    popular: false,
  },
  {
    id: "premium" as SubscriptionPlan,
    name: "Premium",
    price: "$19",
    period: "/month",
    description: "Advanced features for serious fitness enthusiasts",
    features: [
      "200 AI messages per day",
      "50 workout generations per month",
      "20 nutrition plans per month",
      "Advanced analytics",
      "Priority support",
      "Custom meal plans",
      "Data export",
    ],
    popular: true,
  },
  {
    id: "pro" as SubscriptionPlan,
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "Complete fitness ecosystem for professionals",
    features: [
      "Unlimited AI messages",
      "Unlimited workout generations",
      "Unlimited nutrition plans",
      "Advanced analytics",
      "Priority support",
      "Custom meal plans",
      "API access",
      "Data export",
    ],
    popular: false,
  },
]

interface UpgradeModalProps {
  children: React.ReactNode
}

export function UpgradeModal({ children }: UpgradeModalProps) {
  const { user, upgradePlan } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)

  const handleUpgrade = async (planId: SubscriptionPlan) => {
    setIsUpgrading(true)
    setSelectedPlan(planId)

    try {
      const success = await upgradePlan(planId)
      if (success) {
        setIsOpen(false)
        // Show success message (you could add a toast here)
      } else {
        // Show error message
        console.error("Failed to upgrade plan")
      }
    } catch (error) {
      console.error("Upgrade error:", error)
    } finally {
      setIsUpgrading(false)
      setSelectedPlan(null)
    }
  }

  const currentPlan = user?.subscription?.plan || "free"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>
            Choose the plan that best fits your fitness journey. Current plan: {currentPlan.toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative border-border/50 hover:shadow-lg transition-all duration-300 ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              } ${currentPlan === plan.id ? "opacity-50" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  <Zap className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              {currentPlan === plan.id && (
                <Badge className="absolute -top-3 right-4 bg-green-500 text-white">Current Plan</Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-serif font-black">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "glow-primary" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  disabled={currentPlan === plan.id || isUpgrading}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {isUpgrading && selectedPlan === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : currentPlan === plan.id ? (
                    "Current Plan"
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Upgrade to {plan.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">Payment Information</h4>
          <p className="text-sm text-muted-foreground">
            This is a demo version. In production, this would integrate with Stripe, PayPal, or other payment
            processors. All plan upgrades are simulated and will reset when you refresh the page.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

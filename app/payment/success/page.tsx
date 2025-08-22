"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/auth/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useSubscription, type SubscriptionPlan } from "@/hooks/use-subscription"

export default function PaymentSuccessPage() {
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const { upgradePlan } = useSubscription()

  useEffect(() => {
    // Get subscription details from localStorage
    const subId = localStorage.getItem('subscriptionId')
    const plan = localStorage.getItem('selectedPlan')

    if (subId) setSubscriptionId(subId)
    if (plan) {
      const parsedPlan = JSON.parse(plan)
      setSelectedPlan(parsedPlan)

      // Activate the subscription plan
      let planType: SubscriptionPlan = 'free'
      if (parsedPlan.name === 'Básico') planType = 'basic'
      else if (parsedPlan.name === 'Premium') planType = 'premium'

      upgradePlan(planType)
    }

    // Clean up localStorage
    localStorage.removeItem('subscriptionId')
    localStorage.removeItem('selectedPlan')
  }, [upgradePlan])

  return (
    <ProtectedRoute>
      <SidebarLayout
        breadcrumbs={[
          { label: "✅ Payment Success" }
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-green-50 dark:from-green-950/20 dark:via-background dark:to-green-950/20 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-lg">
            Welcome to HealthMaxxing {selectedPlan?.name} plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedPlan && (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Plan:</span>
                <span className="font-bold">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Price:</span>
                <span className="font-bold">{selectedPlan.price}{selectedPlan.period}</span>
              </div>
              {subscriptionId && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subscription ID:</span>
                  <span className="font-mono text-sm">{subscriptionId}</span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-semibold">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Your subscription is now active
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                You have full access to all {selectedPlan?.name} features
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                A confirmation email has been sent to your inbox
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Your subscription will auto-renew monthly
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full glow-primary gap-2">
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at{" "}
              <a href="mailto:support@healthmaxxing.com" className="text-primary hover:underline">
                support@healthmaxxing.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

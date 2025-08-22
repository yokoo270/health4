"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, CreditCard, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/auth/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"

declare global {
  interface Window {
    paypal: any
  }
}

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get selected plan from localStorage
    const plan = localStorage.getItem('selectedPlan')
    if (plan) {
      const parsedPlan = JSON.parse(plan)
      // Redirect free users back to subscription page
      if (parsedPlan.isFree) {
        window.location.href = '/subscription'
        return
      }
      setSelectedPlan(parsedPlan)
    }
    setIsLoading(false)

    // Load PayPal SDK
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=AYnr-ZFwSJfD33VfJVFtD65x07nmkG80-0SyPHgfGmcPY2G5ylkKpQ7LknsRS-GR9yn87QaczVAgn8Ma&vault=true&intent=subscription`
    script.async = true
    script.onload = () => {
      if (window.paypal && selectedPlan) {
        initializePayPal()
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [selectedPlan])

  const initializePayPal = () => {
    if (!window.paypal || !selectedPlan) return

    window.paypal.Buttons({
      style: {
        shape: 'rect',
        color: 'blue',
        layout: 'vertical',
        label: 'subscribe'
      },
      createSubscription: function(data: any, actions: any) {
        return actions.subscription.create({
          'plan_id': selectedPlan.paypalPlanId,
          'application_context': {
            'brand_name': 'HealthMaxxing',
            'locale': 'en-US',
            'shipping_preference': 'NO_SHIPPING',
            'user_action': 'SUBSCRIBE_NOW',
            'payment_method': {
              'payer_selected': 'PAYPAL',
              'payee_preferred': 'IMMEDIATE_PAYMENT_REQUIRED'
            },
            'return_url': `${window.location.origin}/payment/success`,
            'cancel_url': `${window.location.origin}/payment/cancel`
          }
        })
      },
      onApprove: function(data: any, actions: any) {
        console.log('Subscription approved:', data)
        // Store subscription info and redirect to success page
        localStorage.setItem('subscriptionId', data.subscriptionID)
        window.location.href = '/payment/success'
      },
      onError: function(err: any) {
        console.error('PayPal error:', err)
        alert('Payment failed. Please try again.')
      },
      onCancel: function(data: any) {
        console.log('Payment cancelled:', data)
        window.location.href = '/payment/cancel'
      }
    }).render('#paypal-button-container')
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarLayout
          breadcrumbs={[
            { label: "💳 Payment" }
          ]}
        >
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </SidebarLayout>
      </ProtectedRoute>
    )
  }

  if (!selectedPlan) {
    return (
      <ProtectedRoute>
        <SidebarLayout
          breadcrumbs={[
            { label: "💳 Payment" }
          ]}
        >
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
              <CardHeader className="text-center">
                <CardTitle>No Plan Selected</CardTitle>
                <CardDescription>Please select a plan from our pricing page</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/subscription">
                <Button className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Pricing
                </Button>
              </Link>
              </CardContent>
            </Card>
          </div>
        </SidebarLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <SidebarLayout
        breadcrumbs={[
          { label: "💳 Payment" }
        ]}
      >
        <div className="bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/subscription">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Pricing
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Complete Your Subscription
          </h1>
          <p className="text-muted-foreground mt-2">Secure payment powered by PayPal</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {selectedPlan.popular && <Zap className="w-5 h-5 text-primary" />}
                  {selectedPlan.name} Plan
                </CardTitle>
                {selectedPlan.popular && (
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
              </div>
              <CardDescription>{selectedPlan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold">{selectedPlan.price}</div>
                <div className="text-muted-foreground">{selectedPlan.period}</div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">What's included:</h3>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">Secure Payment</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your payment is processed securely through PayPal. Cancel anytime.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
              <CardDescription>Complete your subscription with PayPal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{selectedPlan.name} Plan</span>
                    <span className="font-bold">{selectedPlan.price}{selectedPlan.period}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Billed monthly • Cancel anytime
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Payment Method</h3>
                  <div id="paypal-button-container" className="min-h-[50px]">
                    {/* PayPal buttons will be rendered here */}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Your subscription will auto-renew monthly</p>
                  <p>• You can cancel anytime from your account settings</p>
                  <p>• All payments are processed securely by PayPal</p>
                  <p>• By subscribing, you agree to our Terms of Service and Privacy Policy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team at support@healthmaxxing.com
          </p>
        </div>
      </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

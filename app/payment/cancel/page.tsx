"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/auth/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"

export default function PaymentCancelPage() {
  const handleRetry = () => {
    window.history.back()
  }

  return (
    <ProtectedRoute>
      <SidebarLayout
        breadcrumbs={[
          { label: "❌ Payment Cancelled" }
        ]}
      >
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-background to-red-50 dark:from-red-950/20 dark:via-background dark:to-red-950/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-800 dark:text-red-200">
            Payment Cancelled
          </CardTitle>
          <CardDescription>
            Your subscription payment was cancelled. No charges were made.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">
              Don't worry! You can try again anytime. Your account remains active with the free plan features.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">What you can do:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Continue using HealthMaxxing with free features</li>
              <li>• Try the payment process again</li>
              <li>• Contact support if you experienced any issues</li>
              <li>• Explore our features before upgrading</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleRetry} className="w-full gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Payment Again
            </Button>
            <Link href="/#pricing">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                Back to Pricing
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full bg-transparent">
                Continue with Free Plan
              </Button>
            </Link>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <a href="mailto:support@healthmaxxing.com" className="text-primary hover:underline">
                Contact Support
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

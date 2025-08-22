"use client"
import { useAuth } from "@/auth/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { UpgradeModal } from "./upgrade-modal"
import { MessageCircle, Dumbbell, Apple, Crown } from "lucide-react"

export function UsageIndicator() {
  const { user, getRemainingUsage, canUseFeature } = useAuth()

  if (!user?.subscription) return null

  const remaining = getRemainingUsage()
  const currentPlan = user.subscription.plan
  const limits = user.subscription.limits

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0 // unlimited
    return Math.min((used / limit) * 100, 100)
  }

  const usageStats = user.usageStats || {
    aiMessagesToday: 0,
    workoutGenerationsThisMonth: 0,
    nutritionPlansThisMonth: 0,
    lastResetDate: new Date().toISOString(),
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
            </CardTitle>
            <CardDescription>Your current usage and limits</CardDescription>
          </div>
          {currentPlan !== "pro" && (
            <UpgradeModal>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Crown className="w-4 h-4" />
                Upgrade
              </Button>
            </UpgradeModal>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Messages */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI Messages Today</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {limits.aiMessagesPerDay === -1 ? "Unlimited" : `${remaining.aiMessages} left`}
            </span>
          </div>
          {limits.aiMessagesPerDay !== -1 && (
            <Progress value={getUsagePercentage(usageStats.aiMessagesToday, limits.aiMessagesPerDay)} className="h-2" />
          )}
        </div>

        {/* Workout Generations */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Workout Generations</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {limits.workoutGenerationsPerMonth === -1 ? "Unlimited" : `${remaining.workoutGenerations} left`}
            </span>
          </div>
          {limits.workoutGenerationsPerMonth !== -1 && (
            <Progress
              value={getUsagePercentage(usageStats.workoutGenerationsThisMonth, limits.workoutGenerationsPerMonth)}
              className="h-2"
            />
          )}
        </div>

        {/* Nutrition Plans */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Apple className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Nutrition Plans</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {limits.nutritionPlansPerMonth === -1 ? "Unlimited" : `${remaining.nutritionPlans} left`}
            </span>
          </div>
          {limits.nutritionPlansPerMonth !== -1 && (
            <Progress
              value={getUsagePercentage(usageStats.nutritionPlansThisMonth, limits.nutritionPlansPerMonth)}
              className="h-2"
            />
          )}
        </div>

        {/* Feature Access */}
        <div className="pt-2 border-t">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div
              className={`flex items-center gap-1 ${canUseFeature("analyticsAccess") ? "text-green-600" : "text-muted-foreground"}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${canUseFeature("analyticsAccess") ? "bg-green-500" : "bg-gray-300"}`}
              />
              Analytics
            </div>
            <div
              className={`flex items-center gap-1 ${canUseFeature("prioritySupport") ? "text-green-600" : "text-muted-foreground"}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${canUseFeature("prioritySupport") ? "bg-green-500" : "bg-gray-300"}`}
              />
              Priority Support
            </div>
            <div
              className={`flex items-center gap-1 ${canUseFeature("customMealPlans") ? "text-green-600" : "text-muted-foreground"}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${canUseFeature("customMealPlans") ? "bg-green-500" : "bg-gray-300"}`}
              />
              Custom Meals
            </div>
            <div
              className={`flex items-center gap-1 ${canUseFeature("apiAccess") ? "text-green-600" : "text-muted-foreground"}`}
            >
              <div className={`w-2 h-2 rounded-full ${canUseFeature("apiAccess") ? "bg-green-500" : "bg-gray-300"}`} />
              API Access
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut, User, Activity, Target, TrendingUp, MessageCircle, Bot, BarChart3, Home, Flame, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { QuickLogModal } from "@/components/tracking/quick-log-modal"
import { UsageIndicator } from "@/components/subscription/usage-indicator"
import { ExportModal } from "@/components/data-export/export-modal"

export function DashboardContent() {
  const { user, logout, getTodayStats, getWeekStats } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const todayStats = getTodayStats()
  const weekStats = getWeekStats()
  const currentStreak = user?.currentStreak || 0

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-black">Welcome back, {user?.name}!</h1>
              <p className="text-muted-foreground">Ready to maximize your health today?</p>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <ExportModal>
                <Button variant="outline" className="gap-2 bg-transparent">
                  Export Data
                </Button>
              </ExportModal>
              <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <UsageIndicator />
        </div>

        {/* AI Coach Section */}
        <div className="mb-8">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-black">Maxx AI Fitness Coach</h2>
                    <p className="text-muted-foreground">Get personalized workouts and nutrition advice</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <QuickLogModal />
                  <Link href="/chat">
                    <Button className="glow-primary gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Start Chat
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <Card className="border-secondary/20 bg-gradient-to-r from-secondary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-black">Health Analytics</h2>
                    <p className="text-muted-foreground">Track your progress with detailed insights</p>
                  </div>
                </div>
                <Link href="/analytics">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <BarChart3 className="w-4 h-4" />
                    View Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid - Now showing real user data */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Workouts</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats?.workouts || 0}</div>
              <p className="text-xs text-muted-foreground">
                {todayStats?.workouts ? `${todayStats.workouts} completed today` : "No workouts logged today"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats?.caloriesBurned || 0}</div>
              <p className="text-xs text-muted-foreground">
                {weekStats.calories > 0 ? `${weekStats.calories} this week` : "Start logging workouts"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weekStats.goalsAchieved}/10</div>
              <p className="text-xs text-muted-foreground">
                {weekStats.goalsAchieved > 0 ? "Goals completed" : "Set your first goal"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{currentStreak} days</div>
              <p className="text-xs text-muted-foreground">
                {currentStreak > 0 ? "Keep it up!" : "Start your streak today"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Personalized suggestions for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                <Badge variant="secondary">Workout</Badge>
                <span>Try a 30-minute HIIT session for maximum calorie burn</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-secondary/5 rounded-lg">
                <Badge variant="secondary">Nutrition</Badge>
                <span>Increase protein intake by 20g to support muscle recovery</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg">
                <Badge variant="secondary">Recovery</Badge>
                <span>Schedule a rest day tomorrow to prevent overtraining</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with your fitness journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/chat">
                <Button className="w-full justify-start glow-primary">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with AI Coach
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Link href="/subscription">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Activity className="w-4 h-4 mr-2" />
                Start AI Workout
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Target className="w-4 h-4 mr-2" />
                Set New Goal
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

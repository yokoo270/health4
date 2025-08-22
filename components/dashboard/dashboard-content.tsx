"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import PersonalizedRecommendations from "@/components/ai/personalized-recommendations"
import { 
  Activity, 
  Apple, 
  BarChart3, 
  Brain, 
  Dumbbell, 
  Heart, 
  MessageCircle, 
  Target, 
  TrendingUp,
  Users,
  Zap,
  Trophy,
  Clock,
  Calendar,
  Star
} from "lucide-react"
import Link from "next/link"

interface DashboardContentProps {
  userData?: any
}

export function DashboardContent({ userData }: DashboardContentProps) {
  const [currentStreak, setCurrentStreak] = useState(7)
  const [weeklyGoal, setWeeklyGoal] = useState(5)
  const [completedWorkouts, setCompletedWorkouts] = useState(3)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Health Dashboard
              </h1>
              <p className="text-muted-foreground">
                Tu centro de control personalizado
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <Zap className="w-3 h-3" />
                {currentStreak} días consecutivos
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Trophy className="w-3 h-3" />
                Nivel 12
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Entrenamientos</p>
                  <p className="text-2xl font-bold">{completedWorkouts}/{weeklyGoal}</p>
                </div>
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
              <Progress value={(completedWorkouts / weeklyGoal) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="glow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Racha actual</p>
                  <p className="text-2xl font-bold">{currentStreak} días</p>
                </div>
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Calorías hoy</p>
                  <p className="text-2xl font-bold">2,340</p>
                </div>
                <Apple className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bienestar</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
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
              <Link href="/your-path">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Activity className="w-4 h-4 mr-2" />
                  Explore Your Path
                </Button>
              </Link>
              <Link href="/tasklist">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Target className="w-4 h-4 mr-2" />
                  View Task List
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Progress</CardTitle>
              <CardDescription>Your daily health metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ejercicio</span>
                  <span>60%</span>
                </div>
                <Progress value={60} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Nutrición</span>
                  <span>80%</span>
                </div>
                <Progress value={80} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hidratación</span>
                  <span>45%</span>
                </div>
                <Progress value={45} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sueño</span>
                  <span>90%</span>
                </div>
                <Progress value={90} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations - Moved to bottom */}
        <PersonalizedRecommendations />

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Completaste entrenamiento de fuerza", time: "Hace 2 horas", icon: Dumbbell },
                { action: "Registraste comida: Ensalada César", time: "Hace 4 horas", icon: Apple },
                { action: "Sesión de meditación completada", time: "Ayer", icon: Brain },
                { action: "Meta semanal de ejercicio alcanzada", time: "Hace 2 días", icon: Trophy }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <item.icon className="w-4 h-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

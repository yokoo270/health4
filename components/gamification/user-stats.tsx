"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Flame, Star, Gem } from "lucide-react"
import { useAuth } from "@/auth/auth-provider"

export function UserStatsDisplay() {
  const { user } = useAuth()

  const level = Math.floor((user?.xp || 0) / 1000) + 1
  const xp = user?.xp || 0
  const xpToNextLevel = 1000
  const gems = user?.gems || 0
  const streak = user?.currentStreak || 0

  const xpProgress = (xp / xpToNextLevel) * 100

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {/* Nivel y XP */}
      <Card className="glow-card border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">Nivel {level}</span>
          </div>
          <Progress value={xpProgress} className="h-2 mb-1" />
          <div className="text-xs text-muted-foreground">
            {xp} / {xpToNextLevel} XP
          </div>
        </CardContent>
      </Card>

      {/* Racha */}
      <Card className="glow-card border-orange-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold">Racha</span>
          </div>
          <div className="text-2xl font-bold text-orange-500">
            {streak}
          </div>
          <div className="text-xs text-muted-foreground">días</div>
        </CardContent>
      </Card>

      {/* Gemas */}
      <Card className="glow-card border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gem className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">Gemas</span>
          </div>
          <div className="text-2xl font-bold text-blue-500">
            {gems}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

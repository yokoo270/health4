"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, Target, Zap, Heart, Dumbbell } from "lucide-react"

interface PerformanceMetricsProps {
  detailed?: boolean
}

export function PerformanceMetrics({ detailed = false }: PerformanceMetricsProps) {
  const metrics = [
    {
      name: "Strength Progress",
      current: 85,
      target: 100,
      change: 12,
      trend: "up",
      icon: Dumbbell,
      color: "text-primary",
    },
    {
      name: "Cardiovascular Fitness",
      current: 78,
      target: 90,
      change: 8,
      trend: "up",
      icon: Heart,
      color: "text-secondary",
    },
    {
      name: "Flexibility",
      current: 65,
      target: 80,
      change: -2,
      trend: "down",
      icon: Target,
      color: "text-accent",
    },
    {
      name: "Endurance",
      current: 72,
      target: 85,
      change: 5,
      trend: "up",
      icon: Zap,
      color: "text-primary",
    },
  ]

  const personalRecords = [
    { exercise: "Bench Press", weight: "85kg", date: "2 days ago", improvement: "+5kg" },
    { exercise: "Squat", weight: "120kg", date: "1 week ago", improvement: "+10kg" },
    { exercise: "Deadlift", weight: "140kg", date: "3 days ago", improvement: "+7.5kg" },
    { exercise: "5K Run", time: "22:30", date: "5 days ago", improvement: "-45s" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.name} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <div className="flex items-center space-x-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : metric.trend === "down" ? (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  ) : (
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span
                    className={`text-sm ${
                      metric.trend === "up"
                        ? "text-green-500"
                        : metric.trend === "down"
                          ? "text-red-500"
                          : "text-muted-foreground"
                    }`}
                  >
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}%
                  </span>
                </div>
              </div>

              <h3 className="font-medium text-sm mb-2">{metric.name}</h3>
              <Progress value={metric.current} className="mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{metric.current}%</span>
                <span>Target: {metric.target}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {detailed && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Records</CardTitle>
            <CardDescription>Your recent achievements and improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {personalRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{record.exercise}</div>
                    <div className="text-sm text-muted-foreground">{record.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{record.weight || record.time}</div>
                    <Badge variant="secondary" className="text-xs">
                      {record.improvement}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

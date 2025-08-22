"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
import { useAuth } from "@/auth/auth-provider"

interface ProgressChartProps {
  period: string
}

export function ProgressChart({ period }: ProgressChartProps) {
  const { user } = useAuth()

  // Generate progress data from user's daily stats or show empty state
  const generateProgressData = () => {
    if (!user?.dailyStats || user.dailyStats.length === 0) {
      return []
    }

    return user.dailyStats
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30) // Last 30 days
      .map(stat => ({
        date: new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: stat.weight || 0,
        bodyFat: 0, // This would need to be tracked separately
        muscle: 0, // This would need to be tracked separately
      }))
  }

  const data = generateProgressData()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Body Composition Progress</span>
        </CardTitle>
        <CardDescription>Track your weight, body fat, and muscle mass over time</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ChartContainer
            config={{
              weight: {
                label: "Weight (kg)",
                color: "hsl(var(--chart-1))",
              },
              bodyFat: {
                label: "Body Fat (%)",
                color: "hsl(var(--chart-2))",
              },
              muscle: {
                label: "Muscle Mass (kg)",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-chart-1)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-center">
            <div>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No progress data yet</p>
              <p className="text-sm text-muted-foreground">Start logging your daily stats to see your progress</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

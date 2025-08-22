"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import { Apple, Droplets } from "lucide-react"
import { useAuth } from "@/auth/auth-provider"

export function NutritionChart() {
  const { user } = useAuth()

  // Generate macro data from user's nutrition history
  const generateMacroData = () => {
    if (!user?.nutritionHistory || user.nutritionHistory.length === 0) {
      return []
    }

    const totalProtein = user.nutritionHistory.reduce((sum, entry) => sum + entry.protein, 0)
    const totalCarbs = user.nutritionHistory.reduce((sum, entry) => sum + entry.carbs, 0)
    const totalFats = user.nutritionHistory.reduce((sum, entry) => sum + entry.fat, 0)
    const total = totalProtein + totalCarbs + totalFats

    if (total === 0) return []

    return [
      { name: "Protein", value: Math.round((totalProtein / total) * 100), color: "hsl(var(--chart-1))" },
      { name: "Carbs", value: Math.round((totalCarbs / total) * 100), color: "hsl(var(--chart-2))" },
      { name: "Fats", value: Math.round((totalFats / total) * 100), color: "hsl(var(--chart-3))" },
    ]
  }

  // Generate weekly nutrition data from user's nutrition history
  const generateWeeklyData = () => {
    if (!user?.nutritionHistory || user.nutritionHistory.length === 0) {
      return []
    }

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split('T')[0]
    })

    return last7Days.map((date, index) => {
      const dayEntries = user.nutritionHistory?.filter(entry => entry.date.startsWith(date)) || []
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' })

      return {
        day: dayName,
        calories: dayEntries.reduce((sum, entry) => sum + entry.calories, 0),
        protein: dayEntries.reduce((sum, entry) => sum + entry.protein, 0),
        carbs: dayEntries.reduce((sum, entry) => sum + entry.carbs, 0),
        fats: dayEntries.reduce((sum, entry) => sum + entry.fat, 0),
      }
    })
  }

  const macroData = generateMacroData()
  const weeklyNutrition = generateWeeklyData()
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Apple className="w-5 h-5 text-primary" />
            <span>Macro Distribution</span>
          </CardTitle>
          <CardDescription>Your average macronutrient breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          {macroData.length > 0 ? (
            <>
              <ChartContainer
                config={{
                  protein: { label: "Protein", color: "hsl(var(--chart-1))" },
                  carbs: { label: "Carbs", color: "hsl(var(--chart-2))" },
                  fats: { label: "Fats", color: "hsl(var(--chart-3))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="grid grid-cols-3 gap-4 mt-4">
                {macroData.map((macro) => (
                  <div key={macro.name} className="text-center">
                    <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: macro.color }} />
                    <div className="text-sm font-medium">{macro.name}</div>
                    <div className="text-xs text-muted-foreground">{macro.value}%</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-center">
              <div>
                <Apple className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No nutrition data yet</p>
                <p className="text-sm text-muted-foreground">Start logging your meals to see macro breakdown</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-secondary" />
            <span>Weekly Intake</span>
          </CardTitle>
          <CardDescription>Daily calorie and macro intake this week</CardDescription>
        </CardHeader>
        <CardContent>
          {weeklyNutrition.some(day => day.calories > 0) ? (
            <ChartContainer
              config={{
                calories: { label: "Calories", color: "hsl(var(--chart-1))" },
                protein: { label: "Protein (g)", color: "hsl(var(--chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyNutrition}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="calories" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-center">
              <div>
                <Droplets className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No weekly data yet</p>
                <p className="text-sm text-muted-foreground">Log your daily nutrition to see weekly trends</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

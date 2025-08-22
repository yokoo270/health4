"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { useAuth } from "@/auth/auth-provider"

export function WorkoutHeatmap() {
  const { user } = useAuth()
  const weeks = 12
  const daysPerWeek = 7
  const today = new Date()

  const generateHeatmapData = () => {
    const data = []
    const workoutsByDate = new Map()

    // Create a map of workout dates with their intensities (number of workouts per day)
    if (user?.workoutHistory) {
      user.workoutHistory.forEach(workout => {
        const date = workout.date.split("T")[0] // Get just the date part
        workoutsByDate.set(date, (workoutsByDate.get(date) || 0) + 1)
      })
    }

    // Add planned workouts from AI-generated routines stored in chat history
    // This would integrate with the routine creation system

    for (let week = weeks - 1; week >= 0; week--) {
      const weekData = []
      for (let day = 0; day < daysPerWeek; day++) {
        const date = new Date(today)
        date.setDate(date.getDate() - (week * 7 + (6 - day)))
        const dateStr = date.toISOString().split("T")[0]

        // Get real workout intensity for this date, or 0 if no workouts
        const intensity = Math.min(workoutsByDate.get(dateStr) || 0, 4) // Cap at 4 for display

        weekData.push({
          date: dateStr,
          intensity,
          day: date.getDay(),
        })
      }
      data.push(weekData)
    }
    return data
  }

  const heatmapData = generateHeatmapData()
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-muted"
      case 1:
        return "bg-primary/20"
      case 2:
        return "bg-primary/40"
      case 3:
        return "bg-primary/60"
      case 4:
        return "bg-primary/80"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <span>Workout Activity</span>
        </CardTitle>
        <CardDescription>Your workout consistency over the last 12 weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex space-x-1 text-xs text-muted-foreground mb-2">
            {dayLabels.map((day) => (
              <div key={day} className="w-3 text-center">
                {day[0]}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {heatmapData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex space-x-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(day.intensity)} transition-all hover:scale-110`}
                    title={`${day.date}: ${day.intensity > 0 ? `${day.intensity} workout${day.intensity > 1 ? "s" : ""}` : "Rest day"}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
            <span>Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((intensity) => (
                <div key={intensity} className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

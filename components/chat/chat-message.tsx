"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User, Clock, Dumbbell, Target, Copy, Download, Utensils, ShoppingCart } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  type?: "text" | "routine" | "recommendation" | "diet"
  data?: any
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const renderRoutineCard = () => {
    if (!message.data) return null

    return (
      <Card className="mt-3 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{message.data.title}</h3>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(JSON.stringify(message.data, null, 2))}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{message.data.duration}</span>
            </div>
            <Badge variant="secondary">{message.data.difficulty}</Badge>
            <Badge variant="outline">{message.data.workoutType}</Badge>
          </div>

          <div className="space-y-2 mb-4">
            {message.data.exercises?.map((exercise: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                <div>
                  <span className="font-medium">{exercise.name}</span>
                  <div className="text-xs text-muted-foreground">
                    {exercise.muscleGroups?.join(", ")} • {exercise.equipment}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  <div>
                    {exercise.sets} sets × {exercise.reps}
                  </div>
                  <div className="text-xs">Rest: {exercise.rest}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex space-x-2">
            <Button size="sm" className="glow-primary">
              Start Workout
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent">
              Save to Library
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderDietCard = () => {
    if (!message.data) return null

    return (
      <Card className="mt-3 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold">{message.data.title}</h3>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(JSON.stringify(message.data, null, 2))}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline">
                <ShoppingCart className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
            <div className="text-center p-2 bg-background/50 rounded">
              <div className="font-semibold">{message.data.totalCalories}</div>
              <div className="text-xs text-muted-foreground">Calories</div>
            </div>
            <div className="text-center p-2 bg-background/50 rounded">
              <div className="font-semibold">{message.data.macros?.protein}g</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div className="text-center p-2 bg-background/50 rounded">
              <div className="font-semibold">{message.data.macros?.carbs}g</div>
              <div className="text-xs text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center p-2 bg-background/50 rounded">
              <div className="font-semibold">{message.data.macros?.fat}g</div>
              <div className="text-xs text-muted-foreground">Fat</div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {Object.entries(message.data.meals || {}).map(([mealType, meal]: [string, any]) => (
              <div key={mealType} className="p-2 bg-background/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium capitalize">{mealType}</span>
                    <div className="text-sm text-muted-foreground">{meal.name}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{meal.calories} cal</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex space-x-2">
            <Button size="sm" className="glow-secondary">
              Start Plan
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent">
              Save to Meal Plans
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderRecommendationCard = () => {
    if (!message.data) return null

    const icon = message.data.type === "nutrition" ? "🥗" : message.data.type === "goals" ? "🎯" : "💡"

    return (
      <Card className="mt-3 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">{icon}</span>
            <h3 className="font-semibold capitalize">{message.data.type} Recommendations</h3>
          </div>

          <div className="space-y-2">
            {message.data.recommendations?.map((rec: string, index: number) => (
              <div key={index} className="flex items-start space-x-2 p-2 bg-background/50 rounded-lg">
                <Target className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button size="sm" variant="outline" className="bg-transparent">
              Apply to My Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex space-x-3 max-w-2xl ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback
            className={isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}
          >
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>

        <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
          <Card className={`p-4 ${isUser ? "bg-primary text-primary-foreground" : "bg-card border-border/50"}`}>
            <p className="text-sm leading-relaxed">{message.content}</p>
            {message.type === "routine" && renderRoutineCard()}
            {message.type === "diet" && renderDietCard()}
            {message.type === "recommendation" && renderRecommendationCard()}
          </Card>
          <span className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  )
}

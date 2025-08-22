"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, Apple, Target, TrendingUp, Zap, Heart } from "lucide-react"

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
  {
    icon: Dumbbell,
    text: "Create a full-body workout routine for beginners",
    category: "Workout",
  },
  {
    icon: Apple,
    text: "Give me nutrition advice for muscle building",
    category: "Nutrition",
  },
  {
    icon: Target,
    text: "Help me set realistic fitness goals for this month",
    category: "Goals",
  },
  {
    icon: TrendingUp,
    text: "How can I track my progress effectively?",
    category: "Progress",
  },
  {
    icon: Zap,
    text: "Design a HIIT workout for fat loss",
    category: "Workout",
  },
  {
    icon: Heart,
    text: "What's the best cardio routine for heart health?",
    category: "Cardio",
  },
]

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-center">What would you like to explore?</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/30 group"
            onClick={() => onSuggestionClick(suggestion.text)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">
                  <suggestion.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{suggestion.text}</p>
                  <p className="text-xs text-muted-foreground">{suggestion.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

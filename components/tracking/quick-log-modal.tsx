"use client"
import { useState } from "react"
import { useAuth } from "@/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Activity, Apple, Target } from "lucide-react"

export function QuickLogModal() {
  const { addWorkout, addNutrition, addGoal } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Workout form state
  const [workoutType, setWorkoutType] = useState("")
  const [workoutDuration, setWorkoutDuration] = useState("")
  const [workoutCalories, setWorkoutCalories] = useState("")
  const [workoutExercises, setWorkoutExercises] = useState("")

  // Nutrition form state
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast")
  const [mealCalories, setMealCalories] = useState("")
  const [mealProtein, setMealProtein] = useState("")
  const [mealCarbs, setMealCarbs] = useState("")
  const [mealFat, setMealFat] = useState("")
  const [mealFoods, setMealFoods] = useState("")

  // Goal form state
  const [goalTitle, setGoalTitle] = useState("")
  const [goalTarget, setGoalTarget] = useState("")
  const [goalUnit, setGoalUnit] = useState("")
  const [goalDeadline, setGoalDeadline] = useState("")

  const handleWorkoutSubmit = () => {
    if (workoutType && workoutDuration && workoutCalories) {
      addWorkout({
        date: new Date().toISOString().split("T")[0],
        type: workoutType,
        duration: Number.parseInt(workoutDuration),
        caloriesBurned: Number.parseInt(workoutCalories),
        exercises: workoutExercises
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e),
      })

      // Reset form
      setWorkoutType("")
      setWorkoutDuration("")
      setWorkoutCalories("")
      setWorkoutExercises("")
      setIsOpen(false)
    }
  }

  const handleNutritionSubmit = () => {
    if (mealCalories && mealProtein && mealCarbs && mealFat) {
      addNutrition({
        date: new Date().toISOString().split("T")[0],
        meal: mealType,
        calories: Number.parseInt(mealCalories),
        protein: Number.parseInt(mealProtein),
        carbs: Number.parseInt(mealCarbs),
        fat: Number.parseInt(mealFat),
        foods: mealFoods
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f),
      })

      // Reset form
      setMealCalories("")
      setMealProtein("")
      setMealCarbs("")
      setMealFat("")
      setMealFoods("")
      setIsOpen(false)
    }
  }

  const handleGoalSubmit = () => {
    if (goalTitle && goalTarget && goalUnit && goalDeadline) {
      addGoal({
        title: goalTitle,
        target: Number.parseInt(goalTarget),
        current: 0,
        unit: goalUnit,
        deadline: goalDeadline,
        completed: false,
      })

      // Reset form
      setGoalTitle("")
      setGoalTarget("")
      setGoalUnit("")
      setGoalDeadline("")
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="glow-primary gap-2">
          <Plus className="w-4 h-4" />
          Quick Log
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Quick Log</DialogTitle>
          <DialogDescription>Log your workouts, meals, or set new goals to track your progress</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="workout" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workout" className="gap-2">
              <Activity className="w-4 h-4" />
              Workout
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="gap-2">
              <Apple className="w-4 h-4" />
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="goal" className="gap-2">
              <Target className="w-4 h-4" />
              Goal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workout">
            <Card>
              <CardHeader>
                <CardTitle>Log Workout</CardTitle>
                <CardDescription>Record your workout session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workout-type">Workout Type</Label>
                    <Select value={workoutType} onValueChange={setWorkoutType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strength">Strength Training</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="hiit">HIIT</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="cycling">Cycling</SelectItem>
                        <SelectItem value="swimming">Swimming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workout-duration">Duration (minutes)</Label>
                    <Input
                      id="workout-duration"
                      type="number"
                      value={workoutDuration}
                      onChange={(e) => setWorkoutDuration(e.target.value)}
                      placeholder="45"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workout-calories">Calories Burned</Label>
                  <Input
                    id="workout-calories"
                    type="number"
                    value={workoutCalories}
                    onChange={(e) => setWorkoutCalories(e.target.value)}
                    placeholder="300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workout-exercises">Exercises (comma separated)</Label>
                  <Input
                    id="workout-exercises"
                    value={workoutExercises}
                    onChange={(e) => setWorkoutExercises(e.target.value)}
                    placeholder="Push-ups, Squats, Planks"
                  />
                </div>
                <Button onClick={handleWorkoutSubmit} className="w-full">
                  Log Workout
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Log Meal</CardTitle>
                <CardDescription>Record your nutrition intake</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meal-type">Meal Type</Label>
                    <Select value={mealType} onValueChange={(value: any) => setMealType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meal-calories">Calories</Label>
                    <Input
                      id="meal-calories"
                      type="number"
                      value={mealCalories}
                      onChange={(e) => setMealCalories(e.target.value)}
                      placeholder="500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meal-protein">Protein (g)</Label>
                    <Input
                      id="meal-protein"
                      type="number"
                      value={mealProtein}
                      onChange={(e) => setMealProtein(e.target.value)}
                      placeholder="25"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meal-carbs">Carbs (g)</Label>
                    <Input
                      id="meal-carbs"
                      type="number"
                      value={mealCarbs}
                      onChange={(e) => setMealCarbs(e.target.value)}
                      placeholder="50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meal-fat">Fat (g)</Label>
                    <Input
                      id="meal-fat"
                      type="number"
                      value={mealFat}
                      onChange={(e) => setMealFat(e.target.value)}
                      placeholder="15"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meal-foods">Foods (comma separated)</Label>
                  <Input
                    id="meal-foods"
                    value={mealFoods}
                    onChange={(e) => setMealFoods(e.target.value)}
                    placeholder="Chicken breast, Rice, Broccoli"
                  />
                </div>
                <Button onClick={handleNutritionSubmit} className="w-full">
                  Log Meal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goal">
            <Card>
              <CardHeader>
                <CardTitle>Set New Goal</CardTitle>
                <CardDescription>Create a new fitness goal to track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input
                    id="goal-title"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    placeholder="Lose 5kg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-target">Target</Label>
                    <Input
                      id="goal-target"
                      type="number"
                      value={goalTarget}
                      onChange={(e) => setGoalTarget(e.target.value)}
                      placeholder="5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal-unit">Unit</Label>
                    <Select value={goalUnit} onValueChange={setGoalUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="lbs">Pounds</SelectItem>
                        <SelectItem value="workouts">Workouts</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="reps">Repetitions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-deadline">Deadline</Label>
                  <Input
                    id="goal-deadline"
                    type="date"
                    value={goalDeadline}
                    onChange={(e) => setGoalDeadline(e.target.value)}
                  />
                </div>
                <Button onClick={handleGoalSubmit} className="w-full">
                  Create Goal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

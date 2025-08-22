"use client"
import { useState } from "react"
import { ProtectedRoute } from "@/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Activity, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CalculatorsPage() {
  const [bmiData, setBmiData] = useState({ height: "", weight: "" })
  const [bmrData, setBmrData] = useState({ height: "", weight: "", age: "", gender: "", activity: "" })
  const [oneRepMaxData, setOneRepMaxData] = useState({ weight: "", reps: "" })

  const calculateBMI = () => {
    if (bmiData.height && bmiData.weight) {
      const heightM = Number.parseFloat(bmiData.height) / 100
      const weightKg = Number.parseFloat(bmiData.weight)
      return (weightKg / (heightM * heightM)).toFixed(1)
    }
    return null
  }

  const calculateBMR = () => {
    if (bmrData.height && bmrData.weight && bmrData.age && bmrData.gender) {
      const height = Number.parseFloat(bmrData.height)
      const weight = Number.parseFloat(bmrData.weight)
      const age = Number.parseFloat(bmrData.age)

      let bmr
      if (bmrData.gender === "male") {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      } else {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
      }

      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        extra: 1.9,
      }

      const multiplier = activityMultipliers[bmrData.activity as keyof typeof activityMultipliers] || 1.2
      return {
        bmr: Math.round(bmr),
        tdee: Math.round(bmr * multiplier),
      }
    }
    return null
  }

  const calculateOneRepMax = () => {
    if (oneRepMaxData.weight && oneRepMaxData.reps) {
      const weight = Number.parseFloat(oneRepMaxData.weight)
      const reps = Number.parseFloat(oneRepMaxData.reps)

      // Epley formula
      const oneRepMax = weight * (1 + reps / 30)
      return Math.round(oneRepMax)
    }
    return null
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", description: "Consider gaining weight" }
    if (bmi < 25) return { category: "Normal", color: "text-green-500", description: "Maintain your current weight" }
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500", description: "Consider losing weight" }
    return { category: "Obese", color: "text-red-500", description: "Consult a healthcare professional" }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🧮 Fitness Calculators
            </h1>
            <p className="text-muted-foreground mt-2">Calculate important fitness metrics to track your progress</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* BMI Calculator */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  BMI Calculator
                </CardTitle>
                <CardDescription>Calculate your Body Mass Index</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bmi-height">Height (cm)</Label>
                  <Input
                    id="bmi-height"
                    type="number"
                    value={bmiData.height}
                    onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                    placeholder="170"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmi-weight">Weight (kg)</Label>
                  <Input
                    id="bmi-weight"
                    type="number"
                    value={bmiData.weight}
                    onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                    placeholder="70"
                  />
                </div>

                {calculateBMI() && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{calculateBMI()}</div>
                      <div className="text-sm text-muted-foreground">BMI</div>
                    </div>
                    <div className="mt-3 text-center">
                      <div className={`font-medium ${getBMICategory(Number.parseFloat(calculateBMI()!)).color}`}>
                        {getBMICategory(Number.parseFloat(calculateBMI()!)).category}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {getBMICategory(Number.parseFloat(calculateBMI()!)).description}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* BMR Calculator */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  BMR Calculator
                </CardTitle>
                <CardDescription>Calculate your Basal Metabolic Rate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="bmr-height">Height (cm)</Label>
                    <Input
                      id="bmr-height"
                      type="number"
                      value={bmrData.height}
                      onChange={(e) => setBmrData({ ...bmrData, height: e.target.value })}
                      placeholder="170"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bmr-weight">Weight (kg)</Label>
                    <Input
                      id="bmr-weight"
                      type="number"
                      value={bmrData.weight}
                      onChange={(e) => setBmrData({ ...bmrData, weight: e.target.value })}
                      placeholder="70"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmr-age">Age</Label>
                  <Input
                    id="bmr-age"
                    type="number"
                    value={bmrData.age}
                    onChange={(e) => setBmrData({ ...bmrData, age: e.target.value })}
                    placeholder="25"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmr-gender">Gender</Label>
                  <Select value={bmrData.gender} onValueChange={(value) => setBmrData({ ...bmrData, gender: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmr-activity">Activity Level</Label>
                  <Select
                    value={bmrData.activity}
                    onValueChange={(value) => setBmrData({ ...bmrData, activity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light Exercise</SelectItem>
                      <SelectItem value="moderate">Moderate Exercise</SelectItem>
                      <SelectItem value="active">Very Active</SelectItem>
                      <SelectItem value="extra">Extra Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculateBMR() && (
                  <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">BMR:</span>
                      <span className="font-bold text-primary">{calculateBMR()!.bmr} cal/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">TDEE:</span>
                      <span className="font-bold text-secondary">{calculateBMR()!.tdee} cal/day</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* One Rep Max Calculator */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  1RM Calculator
                </CardTitle>
                <CardDescription>Calculate your One Rep Max</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orm-weight">Weight Lifted (kg)</Label>
                  <Input
                    id="orm-weight"
                    type="number"
                    value={oneRepMaxData.weight}
                    onChange={(e) => setOneRepMaxData({ ...oneRepMaxData, weight: e.target.value })}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orm-reps">Repetitions</Label>
                  <Input
                    id="orm-reps"
                    type="number"
                    value={oneRepMaxData.reps}
                    onChange={(e) => setOneRepMaxData({ ...oneRepMaxData, reps: e.target.value })}
                    placeholder="8"
                  />
                </div>

                {calculateOneRepMax() && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{calculateOneRepMax()} kg</div>
                      <div className="text-sm text-muted-foreground">Estimated 1RM</div>
                    </div>
                    <div className="mt-3 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>90%:</span>
                        <span>{Math.round(calculateOneRepMax()! * 0.9)} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>80%:</span>
                        <span>{Math.round(calculateOneRepMax()! * 0.8)} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>70%:</span>
                        <span>{Math.round(calculateOneRepMax()! * 0.7)} kg</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <h3 className="font-semibold mb-2">Important Notes:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• These calculators provide estimates and should not replace professional medical advice</li>
              <li>• BMI may not be accurate for athletes with high muscle mass</li>
              <li>• BMR calculations use the Mifflin-St Jeor equation</li>
              <li>• 1RM calculations use the Epley formula and are estimates</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/auth/auth-provider"
import { useRouter } from "next/navigation"
import { User, Weight, Ruler, Calendar, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ProfileSetupForm() {
  const { user, updateUser } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    sex: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update user profile with the new data
    updateUser({
      age: formData.age,
      weight: formData.weight,
      height: formData.height,
      sex: formData.sex,
    })

    setIsLoading(false)
    router.push("/dashboard")
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-2xl">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              {t("profile.setup.title") || "Complete Your Profile"}
            </h1>
            <p className="text-muted-foreground">
              {t("profile.setup.subtitle") || "Help us personalize your fitness journey with some basic information."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">
                  {t("profile.age") || "Age"}
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="age"
                    type="number"
                    placeholder={t("profile.age.placeholder") || "Enter your age"}
                    className="pl-10"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    required
                    min="13"
                    max="120"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">
                  {t("profile.weight") || "Weight (kg)"}
                </Label>
                <div className="relative">
                  <Weight className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="weight"
                    type="number"
                    placeholder={t("profile.weight.placeholder") || "Enter your weight"}
                    className="pl-10"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    required
                    min="20"
                    max="300"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">
                  {t("profile.height") || "Height (cm)"}
                </Label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="height"
                    type="number"
                    placeholder={t("profile.height.placeholder") || "Enter your height"}
                    className="pl-10"
                    value={formData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    required
                    min="100"
                    max="250"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sex">
                  {t("profile.sex") || "Sex"}
                </Label>
                <Select onValueChange={(value) => handleChange("sex", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder={t("profile.sex.placeholder") || "Select your sex"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t("profile.sex.male") || "Male"}</SelectItem>
                    <SelectItem value="female">{t("profile.sex.female") || "Female"}</SelectItem>
                    <SelectItem value="other">{t("profile.sex.other") || "Other"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full glow-primary" 
              disabled={isLoading || !formData.age || !formData.weight || !formData.height || !formData.sex}
            >
              {isLoading 
                ? (t("common.loading") || "Loading...") 
                : (t("profile.setup.complete") || "Complete Setup")
              }
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

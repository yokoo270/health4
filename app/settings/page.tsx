"use client"
import { useState } from "react"
import { useAuth } from "@/auth/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { ProtectedRoute } from "@/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bot, Bell, Shield, Globe, Dumbbell, Clock, Heart, Zap, Save, ArrowLeft, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { SidebarLayout } from "@/components/sidebar-layout"

export default function SettingsPage() {
  const { user, updateUser } = useAuth()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [hasChanges, setHasChanges] = useState(false)
  const [settings, setSettings] = useState({
    // AI Preferences
    aiPersonality: user?.aiPersonality || "friendly",
    preferredWorkoutTypes: user?.preferredWorkoutTypes || ["strength", "cardio"],
    workoutDuration: user?.workoutDuration || 45,
    equipmentAccess: user?.equipmentAccess || ["dumbbells", "bodyweight"],
    nutritionPreferences: user?.nutritionPreferences || ["balanced"],

    // Notifications
    notifications: {
      workoutReminders: user?.notifications?.workoutReminders ?? true,
      progressUpdates: user?.notifications?.progressUpdates ?? true,
      aiSuggestions: user?.notifications?.aiSuggestions ?? true,
      weeklyReports: user?.notifications?.weeklyReports ?? false,
    },

    // Privacy
    privacy: {
      shareProgress: user?.privacy?.shareProgress ?? false,
      publicProfile: user?.privacy?.publicProfile ?? false,
      dataCollection: user?.privacy?.dataCollection ?? true,
    },

    // App Settings
    language: language || "en",
    timezone: user?.timezone || "UTC",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleNestedSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const handleArrayToggle = (key: string, value: string) => {
    const currentArray = settings[key as keyof typeof settings] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]

    handleSettingChange(key, newArray)
  }

  const saveSettings = () => {
    updateUser(settings)
    // Sync language with global provider
    if (settings.language !== language) {
      setLanguage(settings.language as any)
    }
    setHasChanges(false)
  }

  const workoutTypes = [
    { id: "strength", label: "Strength Training", icon: Dumbbell },
    { id: "cardio", label: "Cardio", icon: Heart },
    { id: "hiit", label: "HIIT", icon: Zap },
    { id: "yoga", label: "Yoga", icon: Heart },
    { id: "pilates", label: "Pilates", icon: Heart },
    { id: "crossfit", label: "CrossFit", icon: Dumbbell },
  ]

  const equipmentOptions = [
    "bodyweight",
    "dumbbells",
    "barbell",
    "resistance_bands",
    "kettlebells",
    "pull_up_bar",
    "gym_access",
    "cardio_machines",
  ]

  const nutritionOptions = [
    "balanced",
    "high_protein",
    "low_carb",
    "vegetarian",
    "vegan",
    "keto",
    "mediterranean",
    "intermittent_fasting",
  ]

  return (
    <ProtectedRoute>
      <SidebarLayout 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings" }
        ]}
      >
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-muted-foreground mt-2">Customize your HealthMaxx experience</p>
            </div>
            {hasChanges && (
              <Button onClick={saveSettings} className="glow-primary gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            )}
          </div>

          <div className="space-y-8">
            {/* Theme Settings */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4" />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                    <Moon className="w-4 h-4" />
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Sun className="w-4 h-4" />
                      <span className="font-medium">Light Mode</span>
                    </div>
                    <div className="w-full h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded border border-slate-200 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded"></div>
                    </div>
                  </div>
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Moon className="w-4 h-4" />
                      <span className="font-medium">Dark Mode</span>
                    </div>
                    <div className="w-full h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded border border-slate-700 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Preferences */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Maxx AI Preferences
                </CardTitle>
                <CardDescription>Customize how your Maxx AI fitness coach interacts with you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>AI Personality</Label>
                  <Select
                    value={settings.aiPersonality}
                    onValueChange={(value) => handleSettingChange("aiPersonality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motivational">Motivational - Push you to your limits</SelectItem>
                      <SelectItem value="supportive">Supportive - Encouraging and understanding</SelectItem>
                      <SelectItem value="professional">Professional - Direct and informative</SelectItem>
                      <SelectItem value="friendly">Friendly - Casual and approachable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Preferred Workout Types</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {workoutTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          settings.preferredWorkoutTypes.includes(type.id)
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleArrayToggle("preferredWorkoutTypes", type.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <type.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{type.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Preferred Workout Duration (minutes)
                    </Label>
                    <Select
                      value={settings.workoutDuration.toString()}
                      onValueChange={(value) => handleSettingChange("workoutDuration", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Available Equipment</Label>
                  <div className="flex flex-wrap gap-2">
                    {equipmentOptions.map((equipment) => (
                      <Badge
                        key={equipment}
                        variant={settings.equipmentAccess.includes(equipment) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayToggle("equipmentAccess", equipment)}
                      >
                        {equipment.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Nutrition Preferences</Label>
                  <div className="flex flex-wrap gap-2">
                    {nutritionOptions.map((nutrition) => (
                      <Badge
                        key={nutrition}
                        variant={settings.nutritionPreferences.includes(nutrition) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayToggle("nutritionPreferences", nutrition)}
                      >
                        {nutrition.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Workout Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded about your scheduled workouts</p>
                  </div>
                  <Switch
                    checked={settings.notifications.workoutReminders}
                    onCheckedChange={(checked) =>
                      handleNestedSettingChange("notifications", "workoutReminders", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Progress Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about your fitness progress</p>
                  </div>
                  <Switch
                    checked={settings.notifications.progressUpdates}
                    onCheckedChange={(checked) =>
                      handleNestedSettingChange("notifications", "progressUpdates", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI Suggestions</Label>
                    <p className="text-sm text-muted-foreground">Get personalized suggestions from your AI coach</p>
                  </div>
                  <Switch
                    checked={settings.notifications.aiSuggestions}
                    onCheckedChange={(checked) => handleNestedSettingChange("notifications", "aiSuggestions", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summary of your activities</p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(checked) => handleNestedSettingChange("notifications", "weeklyReports", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Data
                </CardTitle>
                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Share Progress</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your fitness progress</p>
                  </div>
                  <Switch
                    checked={settings.privacy.shareProgress}
                    onCheckedChange={(checked) => handleNestedSettingChange("privacy", "shareProgress", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    checked={settings.privacy.publicProfile}
                    onCheckedChange={(checked) => handleNestedSettingChange("privacy", "publicProfile", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Collection</Label>
                    <p className="text-sm text-muted-foreground">Allow data collection to improve AI recommendations</p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataCollection}
                    onCheckedChange={(checked) => handleNestedSettingChange("privacy", "dataCollection", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* App Settings */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  App Settings
                </CardTitle>
                <CardDescription>General application preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                        <SelectItem value="Europe/Paris">Paris</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          {hasChanges && (
            <div className="mt-8 flex justify-end">
              <Button onClick={saveSettings} className="glow-primary gap-2">
                <Save className="w-4 h-4" />
                Save All Changes
              </Button>
            </div>
          )}
        </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

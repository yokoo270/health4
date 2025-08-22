"use client"
import { useState } from "react"
import { useAuth } from "@/auth/auth-provider"
import { ProtectedRoute } from "@/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, Target, Activity, Calendar, ArrowLeft, LayoutDashboard, MessageSquare, BarChart, Star, ShoppingCart, Settings, Camera } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const SidebarLayout = ({ children, breadcrumbs }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { label: "Foto de perfil con Engranaje", icon: <User className="w-5 h-5" />, options: [{ label: "Profile", href: "/profile", icon: <Camera className="w-4 h-4" /> }, { label: "Settings", href: "/settings", icon: <Settings className="w-4 h-4" /> }] },
    { label: "Inicio", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Tu camino", href: "/progress", icon: <Activity className="w-4 h-4" /> },
    { label: "Maxx AI", href: "/chat", icon: <MessageSquare className="w-4 h-4" /> },
    { label: "Tasklist", href: "/tasklist", icon: <Calendar className="w-4 h-4" /> },
    { label: "Progreso", href: "/analytics", icon: <BarChart className="w-4 h-4" /> },
    { label: "Ranking", href: "/ranking", icon: <Star className="w-4 h-4" /> },
    { label: "Tienda", href: "/store", icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  const Breadcrumb = ({ items }) => (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {item.href ? (
              <Link href={item.href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span className="inline-flex items-center text-sm font-medium text-gray-500">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <svg className="w-4 h-4 mx-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <div className="flex items-center justify-between mb-5 px-2">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Link href="/profile" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src={user?.imageUrl || "/placeholder-avatar.jpg"} className="w-10 h-10 rounded-full" alt="User Avatar" />
                  <span className="self-center text-xl font-semibold whitespace-nowrap text-white">{user?.name || "User"}</span>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-gray-700 text-white border-none">
                <div className="flex flex-col space-y-2">
                  <h4 className="text-sm font-semibold">Account Settings</h4>
                  <p className="text-sm text-gray-300">Manage your profile, preferences, and privacy settings.</p>
                  <div className="flex items-center pt-2">
                    <Link href="/profile" className="text-sm text-blue-400 hover:underline">
                      View Profile
                    </Link>
                    <Link href="/settings" className="text-sm text-blue-400 hover:underline ml-4">
                      Settings
                    </Link>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  item.options ? (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700 justify-start"
                        onClick={() => {
                          // Logic to toggle submenu if needed
                        }}
                      >
                        {item.icon}
                        <span className="ms-3">{item.label}</span>
                      </Button>
                      {/* Submenu for profile and settings */}
                      {item.options.map((option) => (
                        <Link
                          key={option.label}
                          href={option.href}
                          className="flex items-center p-2 pl-10 w-full transition duration-75 rounded-lg group text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {option.icon}
                          <span className="ml-3">{option.label}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link href={item.href} className="flex items-center p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700">
                      {item.icon}
                      <span className="ms-3">{item.label}</span>
                    </Link>
                  )
                ) : (
                  <div className="flex items-center p-2 text-base transition duration-75 rounded-lg group text-gray-400 hover:bg-gray-700 cursor-pointer">
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex-1 flex flex-col ml-64 transition-all duration-300 ease-in-out" style={{ marginLeft: sidebarOpen ? '16rem' : '0' }}>
        <header className="relative flex items-center h-16 px-4 border-b bg-card/50 backdrop-blur-sm">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 max-h-10 w-10 px-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-open h-6 w-6">
              <path d="M2 22h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-16a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"></path>
              <path d="M17 12h5"></path>
              <path d="M17 6v12"></path>
            </svg>
          </button>
          <Breadcrumb items={breadcrumbs} />
        </header>
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const { user, updateUser, getWeekStats } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    height: user?.height || "",
    weight: user?.weight || "",
    sex: user?.sex || "",
    fitnessLevel: user?.fitnessLevel || "",
    goals: user?.goals || "",
    bio: user?.bio || "",
  })

  const weekStats = getWeekStats()
  const totalWorkouts = user?.workoutHistory?.length || 0
  const totalHours = user?.workoutHistory?.reduce((sum, workout) => sum + workout.duration, 0) / 60 || 0
  const goalsProgress = user?.userGoals?.length ? Math.round((user.userGoals.filter(g => g.completed).length / user.userGoals.length) * 100) : 0

  const handleSave = () => {
    updateUser(formData)
    setIsEditing(false)
  }

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightM = Number.parseFloat(formData.height) / 100
      const weightKg = Number.parseFloat(formData.weight)
      return (weightKg / (heightM * heightM)).toFixed(1)
    }
    return "N/A"
  }

  const getBMICategory = (bmi: string) => {
    const bmiNum = Number.parseFloat(bmi)
    if (bmiNum < 18.5) return { category: "Underweight", color: "text-blue-500" }
    if (bmiNum < 25) return { category: "Normal", color: "text-green-500" }
    if (bmiNum < 30) return { category: "Overweight", color: "text-yellow-500" }
    return { category: "Obese", color: "text-red-500" }
  }

  return (
    <ProtectedRoute>
      <SidebarLayout
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile" }
        ]}
      >
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-screen bg-background p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                👤 Your Profile
              </h1>
              <p className="text-muted-foreground mt-2">Manage your personal information and fitness preferences</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Your basic profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sex">Sex</Label>
                      <Select
                        value={formData.sex}
                        onValueChange={(value) => setFormData({ ...formData, sex: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Physical Stats */}
              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Physical Stats
                  </CardTitle>
                  <CardDescription>Your body measurements and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* BMI Calculator */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">BMI:</span>
                      <span className="text-2xl font-bold">{calculateBMI()}</span>
                    </div>
                    {calculateBMI() !== "N/A" && (
                      <div className="mt-2">
                        <span className={`text-sm ${getBMICategory(calculateBMI()).color}`}>
                          {getBMICategory(calculateBMI()).category}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Fitness Preferences */}
              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Fitness Preferences
                  </CardTitle>
                  <CardDescription>Your fitness level and goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fitnessLevel">Fitness Level</Label>
                    <Select
                      value={formData.fitnessLevel}
                      onValueChange={(value) => setFormData({ ...formData, fitnessLevel: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your fitness level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goals">Primary Goals</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      disabled={!isEditing}
                      placeholder="What are your fitness goals?"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Activity Summary */}
              <Card className="glow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Activity Summary
                  </CardTitle>
                  <CardDescription>Your recent activity overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{totalWorkouts}</div>
                      <div className="text-sm text-muted-foreground">Total Workouts</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">{totalHours.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">Hours Trained</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">0</div>
                      <div className="text-sm text-muted-foreground">Weight Change (kg)</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{goalsProgress}%</div>
                      <div className="text-sm text-muted-foreground">Goal Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="glow-primary">
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="glow-primary">
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
"use client"
import { createContext, useContext, useEffect, useState } from "react"
import type React from "react"

export type SubscriptionPlan = "free" | "basic" | "premium" | "pro"

interface PlanLimits {
  aiMessagesPerDay: number
  workoutGenerationsPerMonth: number
  nutritionPlansPerMonth: number
  analyticsAccess: boolean
  prioritySupport: boolean
  customMealPlans: boolean
  apiAccess: boolean
  exportData: boolean
}

interface Subscription {
  plan: SubscriptionPlan
  status: "active" | "cancelled" | "expired"
  startDate: string
  endDate?: string
  limits: PlanLimits
}

interface WorkoutEntry {
  id: string
  date: string
  type: string
  duration: number // minutes
  caloriesBurned: number
  exercises: string[]
  notes?: string
}

interface NutritionEntry {
  id: string
  date: string
  meal: "breakfast" | "lunch" | "dinner" | "snack"
  calories: number
  protein: number
  carbs: number
  fat: number
  foods: string[]
}

interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  deadline: string
  completed: boolean
  createdAt: string
}

interface DailyStats {
  date: string
  workouts: number
  caloriesBurned: number
  caloriesConsumed: number
  waterIntake: number // ml
  sleep: number // hours
  weight?: number // kg
}

interface UsageStats {
  aiMessagesToday: number
  workoutGenerationsThisMonth: number
  nutritionPlansThisMonth: number
  lastResetDate: string
}

interface User {
  email: string
  name: string
  age?: string
  height?: string
  weight?: string
  sex?: string
  fitnessLevel?: string
  goals?: string
  bio?: string
  profileImage?: string
  // AI Preferences
  aiPersonality?: "motivational" | "supportive" | "professional" | "friendly"
  preferredWorkoutTypes?: string[]
  workoutDuration?: number
  equipmentAccess?: string[]
  nutritionPreferences?: string[]
  // App Settings
  notifications?: {
    workoutReminders: boolean
    progressUpdates: boolean
    aiSuggestions: boolean
    weeklyReports: boolean
  }
  privacy?: {
    shareProgress: boolean
    publicProfile: boolean
    dataCollection: boolean
  }
  language?: string
  timezone?: string
  workoutHistory?: WorkoutEntry[]
  nutritionHistory?: NutritionEntry[]
  userGoals?: Goal[]
  dailyStats?: DailyStats[]
  joinDate?: string
  currentStreak?: number
  longestStreak?: number
  gems?: number
  xp?: number
  subscription?: Subscription
  usageStats?: UsageStats
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  isLoading: boolean
  addWorkout: (workout: Omit<WorkoutEntry, "id">) => void
  addNutrition: (nutrition: Omit<NutritionEntry, "id">) => void
  addGoal: (goal: Omit<Goal, "id" | "createdAt">) => void
  updateGoal: (goalId: string, updates: Partial<Goal>) => void
  updateDailyStats: (date: string, stats: Partial<DailyStats>) => void
  getTodayStats: () => DailyStats | null
  getWeekStats: () => { workouts: number; calories: number; goalsAchieved: number }
  upgradePlan: (plan: SubscriptionPlan) => Promise<boolean>
  canUseFeature: (feature: keyof PlanLimits) => boolean
  getRemainingUsage: () => { aiMessages: number; workoutGenerations: number; nutritionPlans: number }
  incrementUsage: (type: "aiMessage" | "workoutGeneration" | "nutritionPlan") => void
  addXP: (amount: number) => void
  addGems: (amount: number) => void
}

const PLAN_CONFIGS: Record<SubscriptionPlan, PlanLimits> = {
  free: {
    aiMessagesPerDay: 5,
    workoutGenerationsPerMonth: 2,
    nutritionPlansPerMonth: 1,
    analyticsAccess: false,
    prioritySupport: false,
    customMealPlans: false,
    apiAccess: false,
    exportData: false,
  },
  basic: {
    aiMessagesPerDay: 50,
    workoutGenerationsPerMonth: 10,
    nutritionPlansPerMonth: 5,
    analyticsAccess: true,
    prioritySupport: false,
    customMealPlans: false,
    apiAccess: false,
    exportData: true,
  },
  premium: {
    aiMessagesPerDay: 200,
    workoutGenerationsPerMonth: 50,
    nutritionPlansPerMonth: 20,
    analyticsAccess: true,
    prioritySupport: true,
    customMealPlans: true,
    apiAccess: false,
    exportData: true,
  },
  pro: {
    aiMessagesPerDay: -1, // unlimited
    workoutGenerationsPerMonth: -1, // unlimited
    nutritionPlansPerMonth: -1, // unlimited
    analyticsAccess: true,
    prioritySupport: true,
    customMealPlans: true,
    apiAccess: true,
    exportData: true,
  },
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true"
      const userData = localStorage.getItem("user")

      if (isAuth && userData) {
        setUser(JSON.parse(userData))
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const createDefaultSubscription = (): Subscription => ({
    plan: "free",
    status: "active",
    startDate: new Date().toISOString(),
    limits: PLAN_CONFIGS.free,
  })

  const createDefaultUsageStats = (): UsageStats => ({
    aiMessagesToday: 0,
    workoutGenerationsThisMonth: 0,
    nutritionPlansThisMonth: 0,
    lastResetDate: new Date().toISOString(),
  })

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any email/password
      if (email && password) {
        const userData: User = {
          email,
          name: "Demo User",
          aiPersonality: "friendly",
          preferredWorkoutTypes: ["strength", "cardio"],
          workoutDuration: 45,
          equipmentAccess: ["dumbbells", "bodyweight"],
          nutritionPreferences: ["balanced"],
          notifications: {
            workoutReminders: true,
            progressUpdates: true,
            aiSuggestions: true,
            weeklyReports: false,
          },
          privacy: {
            shareProgress: false,
            publicProfile: false,
            dataCollection: true,
          },
          language: "en",
          timezone: "UTC",
          workoutHistory: [],
          nutritionHistory: [],
          userGoals: [],
          dailyStats: [],
          joinDate: new Date().toISOString(),
          currentStreak: 0,
          longestStreak: 0,
          subscription: createDefaultSubscription(),
          usageStats: createDefaultUsageStats(),
        }
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any valid form
      if (name && email && password) {
        const userData: User = {
          email,
          name,
          aiPersonality: "friendly",
          preferredWorkoutTypes: ["strength", "cardio"],
          workoutDuration: 45,
          equipmentAccess: ["dumbbells", "bodyweight"],
          nutritionPreferences: ["balanced"],
          notifications: {
            workoutReminders: true,
            progressUpdates: true,
            aiSuggestions: true,
            weeklyReports: false,
          },
          privacy: {
            shareProgress: false,
            publicProfile: false,
            dataCollection: true,
          },
          language: "en",
          timezone: "UTC",
          workoutHistory: [],
          nutritionHistory: [],
          userGoals: [],
          dailyStats: [],
          joinDate: new Date().toISOString(),
          currentStreak: 0,
          longestStreak: 0,
          subscription: createDefaultSubscription(),
          usageStats: createDefaultUsageStats(),
        }
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const upgradePlan = async (plan: SubscriptionPlan): Promise<boolean> => {
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (user) {
        const newSubscription: Subscription = {
          plan,
          status: "active",
          startDate: new Date().toISOString(),
          endDate: plan === "free" ? undefined : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          limits: PLAN_CONFIGS[plan],
        }

        const updatedUser = {
          ...user,
          subscription: newSubscription,
          usageStats: createDefaultUsageStats(), // Reset usage stats on plan change
        }

        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Plan upgrade error:", error)
      return false
    }
  }

  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    if (!user?.subscription) return false

    const limits = user.subscription.limits
    return (
      limits[feature] === true || limits[feature] === -1 || (typeof limits[feature] === "number" && limits[feature] > 0)
    )
  }

  const getRemainingUsage = () => {
    if (!user?.subscription || !user?.usageStats) {
      return { aiMessages: 0, workoutGenerations: 0, nutritionPlans: 0 }
    }

    const limits = user.subscription.limits
    const usage = user.usageStats

    return {
      aiMessages: limits.aiMessagesPerDay === -1 ? -1 : Math.max(0, limits.aiMessagesPerDay - usage.aiMessagesToday),
      workoutGenerations:
        limits.workoutGenerationsPerMonth === -1
          ? -1
          : Math.max(0, limits.workoutGenerationsPerMonth - usage.workoutGenerationsThisMonth),
      nutritionPlans:
        limits.nutritionPlansPerMonth === -1
          ? -1
          : Math.max(0, limits.nutritionPlansPerMonth - usage.nutritionPlansThisMonth),
    }
  }

  const incrementUsage = (type: "aiMessage" | "workoutGeneration" | "nutritionPlan") => {
    if (!user?.usageStats) return

    const today = new Date().toISOString().split("T")[0]
    const currentMonth = new Date().toISOString().substring(0, 7) // YYYY-MM

    // Reset daily/monthly counters if needed
    const updatedUsage = { ...user.usageStats }
    const lastResetDate = new Date(user.usageStats.lastResetDate)
    const now = new Date()

    // Reset daily counter
    if (lastResetDate.toISOString().split("T")[0] !== today) {
      updatedUsage.aiMessagesToday = 0
    }

    // Reset monthly counters
    if (lastResetDate.toISOString().substring(0, 7) !== currentMonth) {
      updatedUsage.workoutGenerationsThisMonth = 0
      updatedUsage.nutritionPlansThisMonth = 0
    }

    // Increment usage
    switch (type) {
      case "aiMessage":
        updatedUsage.aiMessagesToday += 1
        break
      case "workoutGeneration":
        updatedUsage.workoutGenerationsThisMonth += 1
        break
      case "nutritionPlan":
        updatedUsage.nutritionPlansThisMonth += 1
        break
    }

    updatedUsage.lastResetDate = now.toISOString()

    const updatedUser = { ...user, usageStats: updatedUsage }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const addXP = (amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        xp: (user.xp || 0) + amount
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const addGems = (amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        gems: (user.gems || 0) + amount
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const addWorkout = (workout: Omit<WorkoutEntry, "id">) => {
    if (user) {
      const newWorkout: WorkoutEntry = {
        ...workout,
        id: Date.now().toString(),
      }
      const updatedUser = {
        ...user,
        workoutHistory: [...(user.workoutHistory || []), newWorkout],
      }

      // Update daily stats
      const today = new Date().toISOString().split("T")[0]
      updateDailyStatsInternal(updatedUser, today, {
        workouts: (getTodayStatsInternal(updatedUser, today)?.workouts || 0) + 1,
        caloriesBurned: (getTodayStatsInternal(updatedUser, today)?.caloriesBurned || 0) + workout.caloriesBurned,
      })
    }
  }

  const addNutrition = (nutrition: Omit<NutritionEntry, "id">) => {
    if (user) {
      const newNutrition: NutritionEntry = {
        ...nutrition,
        id: Date.now().toString(),
      }
      const updatedUser = {
        ...user,
        nutritionHistory: [...(user.nutritionHistory || []), newNutrition],
      }

      // Update daily stats
      const today = new Date().toISOString().split("T")[0]
      updateDailyStatsInternal(updatedUser, today, {
        caloriesConsumed: (getTodayStatsInternal(updatedUser, today)?.caloriesConsumed || 0) + nutrition.calories,
      })
    }
  }

  const addGoal = (goal: Omit<Goal, "id" | "createdAt">) => {
    if (user) {
      const newGoal: Goal = {
        ...goal,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      const updatedUser = {
        ...user,
        userGoals: [...(user.userGoals || []), newGoal],
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    if (user) {
      const updatedUser = {
        ...user,
        userGoals: (user.userGoals || []).map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal)),
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const updateDailyStatsInternal = (userData: User, date: string, stats: Partial<DailyStats>) => {
    const existingStats = userData.dailyStats?.find((s) => s.date === date)
    const updatedStats: DailyStats = existingStats
      ? { ...existingStats, ...stats }
      : { date, workouts: 0, caloriesBurned: 0, caloriesConsumed: 0, waterIntake: 0, sleep: 0, ...stats }

    const updatedUser = {
      ...userData,
      dailyStats: [...(userData.dailyStats?.filter((s) => s.date !== date) || []), updatedStats],
    }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const updateDailyStats = (date: string, stats: Partial<DailyStats>) => {
    if (user) {
      updateDailyStatsInternal(user, date, stats)
    }
  }

  const getTodayStatsInternal = (userData: User, date: string): DailyStats | null => {
    return userData.dailyStats?.find((s) => s.date === date) || null
  }

  const getTodayStats = (): DailyStats | null => {
    if (!user) return null
    const today = new Date().toISOString().split("T")[0]
    return getTodayStatsInternal(user, today)
  }

  const getWeekStats = () => {
    if (!user) return { workouts: 0, calories: 0, goalsAchieved: 0 }

    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    const weekStats = (user.dailyStats || []).filter((stat) => {
      const statDate = new Date(stat.date)
      return statDate >= weekAgo && statDate <= today
    })

    const totalWorkouts = weekStats.reduce((sum, stat) => sum + stat.workouts, 0)
    const totalCalories = weekStats.reduce((sum, stat) => sum + stat.caloriesBurned, 0)

    const completedGoals = (user.userGoals || []).filter((goal) => goal.completed).length
    const totalGoals = (user.userGoals || []).length

    return {
      workouts: totalWorkouts,
      calories: totalCalories,
      goalsAchieved: totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 10) : 0,
    }
  }

  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        isLoading,
        addWorkout,
        addNutrition,
        addGoal,
        updateGoal,
        updateDailyStats,
        getTodayStats,
        getWeekStats,
        upgradePlan,
        canUseFeature,
        getRemainingUsage,
        incrementUsage,
        addXP,
        addGems,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

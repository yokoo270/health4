"use client"
import { createContext, useContext, useEffect, useState } from "react"
import type React from "react"

export type SubscriptionPlan = "free" | "basic" | "premium" | "pro"

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

interface Subscription {
  plan: SubscriptionPlan
  status: "active" | "cancelled" | "expired"
  startDate: string
  endDate?: string
  limits: PlanLimits
}

interface PlanLimits {
  aiMessagesPerDay: number
  workoutGenerationsPerMonth: number
  nutritionPlansPerMonth: number
  hasUnlimitedLives: boolean
  hasAdvancedAnalytics: boolean
  hasCustomization: boolean
}

interface UsageStats {
  aiMessagesToday: number
  workoutGenerationsThisMonth: number
  nutritionPlansThisMonth: number
  lastResetDate: string
}

interface Gamification {
  level: number
  experience: number
  experienceToNext: number
  lives: number
  maxLives: number
  currentStreak: number
  longestStreak: number
  gems: number
  freezeStreakItems: number
  decorations: string[]
  achievements: string[]
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
  subscription?: Subscription
  usageStats?: UsageStats
  gamification?: Gamification
}

const PLAN_CONFIGS: Record<SubscriptionPlan, PlanLimits> = {
  free: {
    aiMessagesPerDay: 10,
    workoutGenerationsPerMonth: 3,
    nutritionPlansPerMonth: 3,
    hasUnlimitedLives: false,
    hasAdvancedAnalytics: false,
    hasCustomization: false,
  },
  basic: {
    aiMessagesPerDay: 50,
    workoutGenerationsPerMonth: 10,
    nutritionPlansPerMonth: 5,
    hasUnlimitedLives: false,
    hasAdvancedAnalytics: true,
    hasCustomization: false,
  },
  basic: {
    aiMessagesPerDay: 50,
    workoutGenerationsPerMonth: 10,
    nutritionPlansPerMonth: 5,
    hasUnlimitedLives: false,
    hasAdvancedAnalytics: true,
    hasCustomization: false,
  },
  premium: {
    aiMessagesPerDay: -1, // unlimited
    workoutGenerationsPerMonth: -1, // unlimited
    nutritionPlansPerMonth: -1, // unlimited
    hasUnlimitedLives: true,
    hasAdvancedAnalytics: true,
    hasCustomization: true,
  },
  pro: {
    aiMessagesPerDay: -1, // unlimited
    workoutGenerationsPerMonth: -1, // unlimited
    nutritionPlansPerMonth: -1, // unlimited
    hasUnlimitedLives: true,
    hasAdvancedAnalytics: true,
    hasCustomization: true,
  },
  pro: {
    aiMessagesPerDay: -1, // unlimited
    workoutGenerationsPerMonth: -1, // unlimited
    nutritionPlansPerMonth: -1, // unlimited
    hasUnlimitedLives: true,
    hasAdvancedAnalytics: true,
    hasCustomization: true,
  },
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
  gainExperience: (amount: number) => void
  spendGems: (amount: number) => boolean
  gainGems: (amount: number) => void
  loseLife: () => void
  hasLives: () => boolean
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

  const createDefaultGamification = (): Gamification => ({
    level: 1,
    experience: 0,
    experienceToNext: 100,
    lives: 3,
    maxLives: 3,
    currentStreak: 0,
    longestStreak: 0,
    gems: 0,
    freezeStreakItems: 0,
    decorations: [],
    achievements: [],
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
          language: "es",
          timezone: "UTC",
          workoutHistory: [],
          nutritionHistory: [],
          userGoals: [],
          dailyStats: [],
          joinDate: new Date().toISOString(),
          subscription: createDefaultSubscription(),
          usageStats: createDefaultUsageStats(),
          gamification: createDefaultGamification(),
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
          language: "es",
          timezone: "UTC",
          workoutHistory: [],
          nutritionHistory: [],
          userGoals: [],
          dailyStats: [],
          joinDate: new Date().toISOString(),
          subscription: createDefaultSubscription(),
          usageStats: createDefaultUsageStats(),
          gamification: createDefaultGamification(),
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

  upgradePlan: async (plan: SubscriptionPlan): Promise<boolean> => {
    if (!user) return false
    
    try {
      const updatedUser = {
        ...user,
        subscription: {
          ...user.subscription!,
          plan,
          limits: PLAN_CONFIGS[plan],
        },
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return true
    } catch (error) {
      console.error("Plan upgrade error:", error)
      return false
    }
  }

  const canUseFeature = (feature: keyof PlanLimits): boolean => {
    if (!user?.subscription) return false
    return user.subscription.limits[feature] as boolean
  }

  const getRemainingUsage = () => {
    if (!user?.subscription || !user?.usageStats) {
      return { aiMessages: 0, workoutGenerations: 0, nutritionPlans: 0 }
    }

    const limits = user.subscription.limits
    const usage = user.usageStats

    return {
      aiMessages: limits.aiMessagesPerDay === -1 ? -1 : Math.max(0, limits.aiMessagesPerDay - usage.aiMessagesToday),
      workoutGenerations: limits.workoutGenerationsPerMonth === -1 ? -1 : Math.max(0, limits.workoutGenerationsPerMonth - usage.workoutGenerationsThisMonth),
      nutritionPlans: limits.nutritionPlansPerMonth === -1 ? -1 : Math.max(0, limits.nutritionPlansPerMonth - usage.nutritionPlansThisMonth),
    }
  }

  const incrementUsage = (type: "aiMessage" | "workoutGeneration" | "nutritionPlan") => {
    if (!user?.usageStats) return

    const updatedUser = {
      ...user,
      usageStats: {
        ...user.usageStats,
        ...(type === "aiMessage" && { aiMessagesToday: user.usageStats.aiMessagesToday + 1 }),
        ...(type === "workoutGeneration" && { workoutGenerationsThisMonth: user.usageStats.workoutGenerationsThisMonth + 1 }),
        ...(type === "nutritionPlan" && { nutritionPlansThisMonth: user.usageStats.nutritionPlansThisMonth + 1 }),
      },
    }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const gainExperience = (amount: number) => {
    if (!user?.gamification) return

    let newExp = user.gamification.experience + amount
    let newLevel = user.gamification.level
    let expToNext = user.gamification.experienceToNext

    // Level up logic
    while (newExp >= expToNext) {
      newExp -= expToNext
      newLevel++
      expToNext = Math.floor(expToNext * 1.5) // Increase XP requirement by 50% each level
    }

    const updatedUser = {
      ...user,
      gamification: {
        ...user.gamification,
        experience: newExp,
        level: newLevel,
        experienceToNext: expToNext,
      },
    }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const spendGems = (amount: number): boolean => {
    if (!user?.gamification || user.gamification.gems < amount) return false

    const updatedUser = {
      ...user,
      gamification: {
        ...user.gamification,
        gems: user.gamification.gems - amount,
      },
    }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    return true
  }

  const gainGems = (amount: number) => {
    if (!user?.gamification) return

    const updatedUser = {
      ...user,
      gamification: {
        ...user.gamification,
        gems: user.gamification.gems + amount,
      },
    }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const loseLife = () => {
    if (!user?.gamification || !user?.subscription) return

    // Premium users have unlimited lives
    if (user.subscription.limits.hasUnlimitedLives) return

    const updatedUser = {
      ...user,
      gamification: {
        ...user.gamification,
        lives: Math.max(0, user.gamification.lives - 1),
      },
    }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const hasLives = (): boolean => {
    if (!user?.gamification || !user?.subscription) return false
    
    // Premium users always have lives
    if (user.subscription.limits.hasUnlimitedLives) return true
    
    return user.gamification.lives > 0
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
        gainExperience,
        spendGems,
        gainGems,
        loseLife,
        hasLives,
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
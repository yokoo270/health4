"use client"

import { useState, useEffect } from 'react'

export type SubscriptionPlan = 'free' | 'basic' | 'premium'

export interface SubscriptionFeatures {
  lives: number | 'unlimited'
  maxAIMessages: number | 'unlimited'
  hasAds: boolean
  hasPhysicalHealth: boolean
  hasMentalHealth: boolean
  hasEmotionalHealth: boolean
  hasSocialHealth: boolean
  emotionalHealthRestricted: boolean
  socialHealthRestricted: boolean
  hasVoiceChat: boolean
  hasShopDiscounts: boolean
  hasExclusiveSkins: boolean
  streakFreezers: number
  gemMultiplier: number
  canClaimGemsWithoutAds: boolean
  maxDailyGems: number
  hasAdvancedAnalytics: boolean
  hasDataExport: boolean
}

const PLAN_FEATURES: Record<SubscriptionPlan, SubscriptionFeatures> = {
  free: {
    lives: 3,
    maxAIMessages: 10,
    hasAds: true,
    hasPhysicalHealth: true,
    hasMentalHealth: true,
    hasEmotionalHealth: false,
    hasSocialHealth: false,
    emotionalHealthRestricted: false,
    socialHealthRestricted: false,
    hasVoiceChat: false,
    hasShopDiscounts: false,
    hasExclusiveSkins: false,
    streakFreezers: 0,
    gemMultiplier: 1,
    canClaimGemsWithoutAds: false,
    maxDailyGems: 5,
    hasAdvancedAnalytics: false,
    hasDataExport: false,
  },
  basic: {
    lives: 'unlimited',
    maxAIMessages: 30,
    hasAds: false,
    hasPhysicalHealth: true,
    hasMentalHealth: true,
    hasEmotionalHealth: true,
    hasSocialHealth: true,
    emotionalHealthRestricted: true,
    socialHealthRestricted: true,
    hasVoiceChat: false,
    hasShopDiscounts: false,
    hasExclusiveSkins: false,
    streakFreezers: 1,
    gemMultiplier: 1,
    canClaimGemsWithoutAds: false,
    maxDailyGems: 10,
    hasAdvancedAnalytics: true,
    hasDataExport: false,
  },
  premium: {
    lives: 'unlimited',
    maxAIMessages: 'unlimited',
    hasAds: false,
    hasPhysicalHealth: true,
    hasMentalHealth: true,
    hasEmotionalHealth: true,
    hasSocialHealth: true,
    emotionalHealthRestricted: false,
    socialHealthRestricted: false,
    hasVoiceChat: true,
    hasShopDiscounts: true,
    hasExclusiveSkins: true,
    streakFreezers: 3,
    gemMultiplier: 2,
    canClaimGemsWithoutAds: true,
    maxDailyGems: 10,
    hasAdvancedAnalytics: true,
    hasDataExport: true,
  },
}

export function useSubscription() {
  const [plan, setPlan] = useState<SubscriptionPlan>('free')
  const [features, setFeatures] = useState<SubscriptionFeatures>(PLAN_FEATURES.free)
  const [isLoading, setIsLoading] = useState(true)
  const [activationDate, setActivationDate] = useState<Date | null>(null)

  useEffect(() => {
    // Load subscription data from localStorage
    const loadSubscriptionData = () => {
      try {
        const storedPlan = localStorage.getItem('userPlan') as SubscriptionPlan
        const storedActivationDate = localStorage.getItem('planActivationDate')
        
        if (storedPlan && PLAN_FEATURES[storedPlan]) {
          setPlan(storedPlan)
          setFeatures(PLAN_FEATURES[storedPlan])
        }
        
        if (storedActivationDate) {
          setActivationDate(new Date(storedActivationDate))
        }
      } catch (error) {
        console.error('Error loading subscription data:', error)
        // Fallback to free plan
        setPlan('free')
        setFeatures(PLAN_FEATURES.free)
      } finally {
        setIsLoading(false)
      }
    }

    loadSubscriptionData()
  }, [])

  const upgradePlan = (newPlan: SubscriptionPlan) => {
    if (PLAN_FEATURES[newPlan]) {
      setPlan(newPlan)
      setFeatures(PLAN_FEATURES[newPlan])
      localStorage.setItem('userPlan', newPlan)
      localStorage.setItem('planActivationDate', new Date().toISOString())
      setActivationDate(new Date())
    }
  }

  const canAccessFeature = (feature: keyof SubscriptionFeatures): boolean => {
    return Boolean(features[feature])
  }

  const getRemainingLives = (): number => {
    if (features.lives === 'unlimited') return Infinity
    
    // Get current lives from localStorage or default to plan limit
    const currentLives = parseInt(localStorage.getItem('currentLives') || String(features.lives))
    return Math.max(0, currentLives)
  }

  const useLive = (): boolean => {
    if (features.lives === 'unlimited') return true
    
    const currentLives = getRemainingLives()
    if (currentLives > 0) {
      localStorage.setItem('currentLives', String(currentLives - 1))
      return true
    }
    return false
  }

  const addLives = (amount: number): void => {
    if (features.lives === 'unlimited') return
    
    const currentLives = getRemainingLives()
    const maxLives = typeof features.lives === 'number' ? features.lives : 3
    const newLives = Math.min(currentLives + amount, maxLives + 10) // Allow some buffer for purchased lives
    localStorage.setItem('currentLives', String(newLives))
  }

  const getAIMessageCount = (): number => {
    const today = new Date().toDateString()
    const storedData = localStorage.getItem('aiMessageCount')
    
    if (storedData) {
      const parsed = JSON.parse(storedData)
      if (parsed.date === today) {
        return parsed.count
      }
    }
    
    return 0
  }

  const incrementAIMessageCount = (): boolean => {
    if (features.maxAIMessages === 'unlimited') return true
    
    const today = new Date().toDateString()
    const currentCount = getAIMessageCount()
    
    if (currentCount >= features.maxAIMessages) {
      return false
    }
    
    const newCount = currentCount + 1
    localStorage.setItem('aiMessageCount', JSON.stringify({
      date: today,
      count: newCount
    }))
    
    return true
  }

  const canSendAIMessage = (): boolean => {
    if (features.maxAIMessages === 'unlimited') return true
    return getAIMessageCount() < features.maxAIMessages
  }

  const getGemMultiplier = (): number => {
    return features.gemMultiplier
  }

  const getDailyGemsCollected = (): number => {
    const today = new Date().toDateString()
    const storedData = localStorage.getItem('dailyGems')
    
    if (storedData) {
      const parsed = JSON.parse(storedData)
      if (parsed.date === today) {
        return parsed.count
      }
    }
    
    return 0
  }

  const canClaimGems = (): boolean => {
    const dailyGems = getDailyGemsCollected()
    return dailyGems < features.maxDailyGems
  }

  const claimGems = (baseAmount: number, requiresAd: boolean = false): boolean => {
    if (!canClaimGems()) return false
    
    // If the plan doesn't allow claiming gems without ads and this requires an ad
    if (requiresAd && !features.canClaimGemsWithoutAds) {
      // In a real app, show an ad here
      console.log('Showing ad...')
    }
    
    const today = new Date().toDateString()
    const currentDailyGems = getDailyGemsCollected()
    const multipliedAmount = baseAmount * features.gemMultiplier
    
    // Update daily gems count
    localStorage.setItem('dailyGems', JSON.stringify({
      date: today,
      count: currentDailyGems + 1
    }))
    
    // Add gems to total
    const currentGems = parseInt(localStorage.getItem('totalGems') || '0')
    localStorage.setItem('totalGems', String(currentGems + multipliedAmount))
    
    return true
  }

  const isExpired = (): boolean => {
    if (plan === 'free' || !activationDate) return false
    
    // For demo purposes, subscriptions don't expire
    // In production, check against actual expiration date
    return false
  }

  return {
    plan,
    features,
    isLoading,
    activationDate,
    upgradePlan,
    canAccessFeature,
    getRemainingLives,
    useLive,
    addLives,
    getAIMessageCount,
    incrementAIMessageCount,
    canSendAIMessage,
    getGemMultiplier,
    getDailyGemsCollected,
    canClaimGems,
    claimGems,
    isExpired,
    planFeatures: PLAN_FEATURES,
  }
}

export default useSubscription

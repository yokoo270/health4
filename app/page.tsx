"use client"
import { useAuth } from "@/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { CTASection } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"
import { Navigation } from "@/components/navigation"
import { LegalDisclaimerModal } from "@/components/legal/legal-disclaimer-modal"
import { MedicalDisclaimerModal } from "@/components/legal/medical-disclaimer-modal"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
      <LegalDisclaimerModal />
    </div>
  )
}

"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, User, BarChart3, MessageCircle, Calculator, Settings } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/auth/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"
import { MedicalDisclaimerModal } from "@/components/legal/medical-disclaimer-modal"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-black">HealthMaxxing</span>
          </Link>

          {user ? (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>{t("nav.dashboard")}</span>
              </Link>
              <Link
                href="/chat"
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("nav.chat")}</span>
              </Link>
              <Link href="/analytics" className="text-foreground hover:text-primary transition-colors">
                {t("nav.analytics")}
              </Link>
              <Link
                href="/calculators"
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
              >
                <Calculator className="w-4 h-4" />
                <span>{t("nav.calculators")}</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{t("nav.profile")}</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>{t("nav.settings")}</span>
              </Link>
              <LanguageSelector />
              <Button variant="outline" onClick={handleLogout} className="bg-transparent">
                {t("nav.logout")}
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                {t("nav.features")}
              </a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
                {t("nav.pricing")}
              </a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
                {t("nav.reviews")}
              </a>
              <MedicalDisclaimerModal />
              <LanguageSelector />
              <Link href="/auth/login">
                <Button variant="outline" className="bg-transparent">
                  {t("nav.login")}
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="glow-primary">{t("hero.cta")}</Button>
              </Link>
            </div>
          )}

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>{t("nav.dashboard")}</span>
                </Link>
                <Link
                  href="/chat"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t("nav.chat")}</span>
                </Link>
                <Link
                  href="/analytics"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.analytics")}
                </Link>
                <Link
                  href="/calculators"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Calculator className="w-4 h-4" />
                  <span>{t("nav.calculators")}</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>{t("nav.profile")}</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>{t("nav.settings")}</span>
                </Link>
                <div className="py-2">
                  <LanguageSelector />
                </div>
                <div className="pt-4">
                  <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
                    {t("nav.logout")}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.features")}
                </a>
                <a
                  href="#pricing"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.pricing")}
                </a>
                <a
                  href="#testimonials"
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.reviews")}
                </a>
                <div className="py-2">
                  <LanguageSelector />
                </div>
                <div className="space-y-2 pt-4">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent">
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full glow-primary">{t("hero.cta")}</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
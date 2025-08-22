import type React from "react"
import Link from "next/link"
import { Zap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  footerText: string
  footerLink: string
  footerLinkText: string
}

export function AuthLayout({ children, title, subtitle, footerText, footerLink, footerLinkText }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-black">HealthMaxxing</span>
          </Link>

          <h1 className="text-3xl font-serif font-black mb-2">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">{children}</div>

        <div className="text-center mt-6">
          <span className="text-muted-foreground">{footerText} </span>
          <Link href={footerLink} className="text-primary hover:underline font-medium">
            {footerLinkText}
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"
import { useAuth } from "@/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share } from "lucide-react"
import Link from "next/link"

export function AnalyticsHeader() {
  const { user } = useAuth()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

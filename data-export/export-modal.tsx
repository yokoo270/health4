"use client"
import { useState } from "react"
import type React from "react"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Download, FileText, Database, Calendar, Target, Loader2 } from "lucide-react"

interface ExportModalProps {
  children: React.ReactNode
}

export function ExportModal({ children }: ExportModalProps) {
  const { user, canUseFeature } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedData, setSelectedData] = useState({
    profile: true,
    workouts: true,
    nutrition: true,
    goals: true,
    dailyStats: true,
    chatHistory: false,
  })

  const canExport = canUseFeature("exportData")

  const handleExport = async () => {
    if (!canExport) return

    setIsExporting(true)

    try {
      // Simulate export processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const exportData: any = {}

      if (selectedData.profile) {
        exportData.profile = {
          name: user?.name,
          email: user?.email,
          age: user?.age,
          height: user?.height,
          weight: user?.weight,
          fitnessLevel: user?.fitnessLevel,
          goals: user?.goals,
          joinDate: user?.joinDate,
        }
      }

      if (selectedData.workouts) {
        exportData.workouts = user?.workoutHistory || []
      }

      if (selectedData.nutrition) {
        exportData.nutrition = user?.nutritionHistory || []
      }

      if (selectedData.goals) {
        exportData.goals = user?.userGoals || []
      }

      if (selectedData.dailyStats) {
        exportData.dailyStats = user?.dailyStats || []
      }

      if (selectedData.chatHistory) {
        // In a real app, this would fetch chat history from the chat system
        exportData.chatHistory = "Chat history export would be implemented here"
      }

      // Create and download JSON file
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `healthmaxx-data-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setIsOpen(false)
    } catch (error) {
      console.error("Export error:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleDataToggle = (key: keyof typeof selectedData) => {
    setSelectedData((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!canExport) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Export Not Available</DialogTitle>
            <DialogDescription>Data export is only available for Basic, Premium, and Pro plans.</DialogDescription>
          </DialogHeader>
          <div className="text-center py-6">
            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Upgrade your plan to export your fitness data.</p>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Your Data
          </DialogTitle>
          <DialogDescription>
            Choose which data you'd like to export. Your data will be downloaded as a JSON file.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <Card className="cursor-pointer" onClick={() => handleDataToggle("profile")}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <CardTitle className="text-sm">Profile Information</CardTitle>
                </div>
                <Checkbox checked={selectedData.profile} readOnly />
              </div>
              <CardDescription className="text-xs">Personal details, preferences, and settings</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer" onClick={() => handleDataToggle("workouts")}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-secondary" />
                  <CardTitle className="text-sm">Workout History</CardTitle>
                </div>
                <Checkbox checked={selectedData.workouts} readOnly />
              </div>
              <CardDescription className="text-xs">All logged workouts and exercise data</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer" onClick={() => handleDataToggle("nutrition")}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <CardTitle className="text-sm">Nutrition Data</CardTitle>
                </div>
                <Checkbox checked={selectedData.nutrition} readOnly />
              </div>
              <CardDescription className="text-xs">Meal logs, calories, and nutrition tracking</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer" onClick={() => handleDataToggle("goals")}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <CardTitle className="text-sm">Goals & Progress</CardTitle>
                </div>
                <Checkbox checked={selectedData.goals} readOnly />
              </div>
              <CardDescription className="text-xs">Fitness goals and achievement tracking</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer" onClick={() => handleDataToggle("dailyStats")}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <CardTitle className="text-sm">Daily Statistics</CardTitle>
                </div>
                <Checkbox checked={selectedData.dailyStats} readOnly />
              </div>
              <CardDescription className="text-xs">Daily activity summaries and metrics</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer" onClick={() => handleDataToggle("chatHistory")}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" />
                  <CardTitle className="text-sm">Chat History</CardTitle>
                </div>
                <Checkbox checked={selectedData.chatHistory} readOnly />
              </div>
              <CardDescription className="text-xs">AI chat conversations and recommendations</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {Object.values(selectedData).filter(Boolean).length} of {Object.keys(selectedData).length} data types
            selected
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting || !Object.values(selectedData).some(Boolean)}
              className="gap-2"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export Data
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

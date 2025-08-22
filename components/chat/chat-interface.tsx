"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { useAuth } from "@/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ChatMessage } from "./chat-message"
import { ChatSuggestions } from "./chat-suggestions"
import { ChatHeader } from "./chat-header"
import { ChatHistory } from "./chat-history"
import { Send, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  type?: "text" | "routine" | "recommendation" | "diet"
  data?: any
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  archived: boolean
}

export function ChatInterface() {
  const { user } = useAuth()
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadChatHistory()
    if (!currentSession) {
      createNewChat()
    }
  }, [])

  const loadChatHistory = () => {
    try {
      const saved = localStorage.getItem(`healthmaxx-chats-${user?.email}`)
      if (saved) {
        const sessions = JSON.parse(saved).map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }))
        setChatSessions(sessions)

        // Load the most recent active session
        const activeSession = sessions.find((s: ChatSession) => !s.archived)
        if (activeSession) {
          setCurrentSession(activeSession)
        }
      }
    } catch (error) {
      console.error("Error loading chat history:", error)
    }
  }

  const saveChatHistory = (sessions: ChatSession[]) => {
    try {
      localStorage.setItem(`healthmaxx-chats-${user?.email}`, JSON.stringify(sessions))
      setChatSessions(sessions)
    } catch (error) {
      console.error("Error saving chat history:", error)
    }
  }

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [
        {
          id: "welcome",
          content: `Hello ${user?.name}! I'm Maxx AI, your personal fitness and health coach. I can create personalized workout routines, nutrition plans, and help you achieve your fitness goals. My personality is set to ${user?.aiPersonality || "friendly"} mode. What would you like to work on today?`,
          role: "assistant",
          timestamp: new Date(),
          type: "text",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      archived: false,
    }

    setCurrentSession(newSession)
    const updatedSessions = [newSession, ...chatSessions]
    saveChatHistory(updatedSessions)
  }

  const updateCurrentSession = (messages: Message[]) => {
    if (!currentSession) return

    const updatedSession = {
      ...currentSession,
      messages,
      updatedAt: new Date(),
      title: messages.length > 1 ? generateChatTitle(messages[1].content) : currentSession.title,
    }

    setCurrentSession(updatedSession)

    const updatedSessions = chatSessions.map((session) => (session.id === currentSession.id ? updatedSession : session))
    saveChatHistory(updatedSessions)
  }

  const generateChatTitle = (firstMessage: string): string => {
    const words = firstMessage.split(" ").slice(0, 4).join(" ")
    return words.length > 30 ? words.substring(0, 30) + "..." : words
  }

  const archiveChat = (sessionId: string) => {
    const updatedSessions = chatSessions.map((session) =>
      session.id === sessionId ? { ...session, archived: true } : session,
    )
    saveChatHistory(updatedSessions)

    if (currentSession?.id === sessionId) {
      const activeSession = updatedSessions.find((s) => !s.archived)
      setCurrentSession(activeSession || null)
    }
  }

  const deleteChat = (sessionId: string) => {
    const updatedSessions = chatSessions.filter((session) => session.id !== sessionId)
    saveChatHistory(updatedSessions)

    if (currentSession?.id === sessionId) {
      const activeSession = updatedSessions.find((s) => !s.archived)
      setCurrentSession(activeSession || null)
    }
  }

  const loadChatSession = (sessionId: string) => {
    const session = chatSessions.find((s) => s.id === sessionId)
    if (session) {
      setCurrentSession(session)
      setShowHistory(false)
    }
  }

  const restoreChat = (sessionId: string) => {
    const updatedSessions = chatSessions.map((session) =>
      session.id === sessionId ? { ...session, archived: false } : session,
    )
    saveChatHistory(updatedSessions)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession?.messages])

  const generateAIResponse = async (userMessage: string): Promise<void> => {
    try {
      const chatHistory =
        currentSession?.messages.slice(-10).map((msg) => ({
          role: msg.role,
          content: msg.content,
        })) || []

      const context = `User: ${user?.name}, Fitness Level: ${user?.fitnessLevel || "Not specified"}, Goals: ${user?.goals || "General fitness"}, AI Personality: ${user?.aiPersonality || "friendly"}, Preferred Workouts: ${user?.preferredWorkoutTypes?.join(", ") || "Mixed"}, Equipment: ${user?.equipmentAccess?.join(", ") || "Basic"}`

      console.log("[v0] Sending request to AI API with message:", userMessage)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: context,
          history: chatHistory,
          userProfile: user, // Pass complete user profile to AI
        }),
      })

      if (!response.ok) {
        console.error("[v0] API response not ok:", response.status, response.statusText)
        throw new Error(`API request failed: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No response body reader available")
      }

      const decoder = new TextDecoder()
      let fullResponse = ""

      // Create initial message for streaming
      const aiMessageId = Date.now().toString()
      const initialMessage: Message = {
        id: aiMessageId,
        content: "",
        role: "assistant",
        timestamp: new Date(),
        type: "text",
      }

      const updatedMessages = [...(currentSession?.messages || []), initialMessage]
      updateCurrentSession(updatedMessages)

      console.log("[v0] Starting to read streaming response")

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            console.log("[v0] Streaming completed, final response length:", fullResponse.length)
            break
          }

          const chunk = decoder.decode(value, { stream: true })
          console.log("[v0] Received chunk:", chunk.length, "characters")

          if (chunk && chunk.trim()) {
            fullResponse += chunk

            // Update the message with streaming content
            const streamingMessages = updatedMessages.map((msg) =>
              msg.id === aiMessageId ? { ...msg, content: fullResponse.trim() } : msg,
            )
            updateCurrentSession(streamingMessages)
          }
        }
      } finally {
        reader.releaseLock()
      }

      if (!fullResponse.trim()) {
        throw new Error("Empty response received from AI")
      }

      console.log("[v0] Final AI response:", fullResponse.substring(0, 100) + "...")

      const lowerResponse = fullResponse.toLowerCase()

      // Check if response suggests creating a routine
      if (
        lowerResponse.includes("routine") ||
        lowerResponse.includes("workout plan") ||
        lowerResponse.includes("exercise")
      ) {
        await generateStructuredRoutine(userMessage, aiMessageId)
      }

      // Check if response suggests creating a diet plan
      if (
        lowerResponse.includes("diet") ||
        lowerResponse.includes("meal plan") ||
        lowerResponse.includes("nutrition plan")
      ) {
        await generateStructuredDiet(userMessage, aiMessageId)
      }
    } catch (error) {
      console.error("[v0] Error generating AI response:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          "I apologize, but I'm having trouble connecting to my AI systems right now. Please check your API keys and try again in a moment.",
        role: "assistant",
        timestamp: new Date(),
        type: "text",
      }
      const errorMessages = [...(currentSession?.messages || []), errorMessage]
      updateCurrentSession(errorMessages)
    }
  }

  const generateStructuredRoutine = async (userMessage: string, previousMessageId: string) => {
    try {
      const routineResponse = await fetch("/api/generate-routine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal: userMessage,
          experience: user?.fitnessLevel || "Beginner",
          equipment: user?.equipmentAccess?.join(", ") || "Basic gym equipment",
          timeAvailable: user?.workoutDuration || 45,
          userProfile: user, // Pass complete user profile
          workoutType: user?.preferredWorkoutTypes?.[0] || "mixed",
        }),
      })

      if (routineResponse.ok) {
        const routine = await routineResponse.json()

        const routineMessage: Message = {
          id: Date.now().toString(),
          content: "Here's your personalized workout routine:",
          role: "assistant",
          timestamp: new Date(),
          type: "routine",
          data: routine,
        }

        const routineMessages = [...(currentSession?.messages || []), routineMessage]
        updateCurrentSession(routineMessages)
      }
    } catch (error) {
      console.error("Error generating routine:", error)
    }
  }

  const generateStructuredDiet = async (userMessage: string, previousMessageId: string) => {
    try {
      const dietResponse = await fetch("/api/generate-diet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal: user?.goals || "General health",
          dietaryPreferences: user?.nutritionPreferences || ["balanced"],
          allergies: null,
          calorieTarget: null, // Let AI calculate based on profile
          userProfile: user,
        }),
      })

      if (dietResponse.ok) {
        const diet = await dietResponse.json()

        const dietMessage: Message = {
          id: Date.now().toString(),
          content: "Here's your personalized nutrition plan:",
          role: "assistant",
          timestamp: new Date(),
          type: "diet",
          data: diet,
        }

        const dietMessages = [...(currentSession?.messages || []), dietMessage]
        updateCurrentSession(dietMessages)
      }
    } catch (error) {
      console.error("Error generating diet plan:", error)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
      type: "text",
    }

    const updatedMessages = [...(currentSession?.messages || []), userMessage]
    updateCurrentSession(updatedMessages)

    const messageContent = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      await generateAIResponse(messageContent)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {showHistory && (
        <div className="w-80 border-r border-border bg-card/50 backdrop-blur-lg">
          <ChatHistory
            sessions={chatSessions}
            currentSessionId={currentSession?.id}
            onSelectSession={loadChatSession}
            onArchiveSession={archiveChat}
            onDeleteSession={deleteChat}
            onRestoreSession={restoreChat}
            onClose={() => setShowHistory(false)}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <ChatHeader
          onToggleHistory={() => setShowHistory(!showHistory)}
          onNewChat={createNewChat}
          showHistory={showHistory}
          currentChatTitle={currentSession?.title}
        />

        <div className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
          <div className="flex-1 space-y-6 overflow-y-auto mb-6">
            {currentSession?.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="p-4 bg-card border-border/50 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">HealthMaxx AI is thinking...</span>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {currentSession?.messages.length === 1 && <ChatSuggestions onSuggestionClick={handleSuggestionClick} />}

          <div className="border-t border-border pt-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about fitness, nutrition, or workouts..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="glow-primary">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by HealthMaxx AI - Your intelligent fitness companion
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

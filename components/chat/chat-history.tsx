"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  X,
  Search,
  MessageSquare,
  Archive,
  Trash2,
  Clock,
  MoreVertical,
  Download,
  Upload,
  BarChart3,
  Undo2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow, format, isToday, isYesterday, isThisWeek } from "date-fns"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  type?: "text" | "routine" | "recommendation"
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

interface ChatHistoryProps {
  sessions: ChatSession[]
  currentSessionId?: string
  onSelectSession: (sessionId: string) => void
  onArchiveSession: (sessionId: string) => void
  onDeleteSession: (sessionId: string) => void
  onRestoreSession: (sessionId: string) => void
  onClose: () => void
}

export function ChatHistory({
  sessions,
  currentSessionId,
  onSelectSession,
  onArchiveSession,
  onDeleteSession,
  onRestoreSession,
  onClose,
}: ChatHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showArchived, setShowArchived] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.messages.some((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesArchived = showArchived ? session.archived : !session.archived
    return matchesSearch && matchesArchived
  })

  const groupSessionsByDate = (sessions: ChatSession[]) => {
    const groups: { [key: string]: ChatSession[] } = {}

    sessions.forEach((session) => {
      let groupKey: string

      if (isToday(session.updatedAt)) {
        groupKey = "Today"
      } else if (isYesterday(session.updatedAt)) {
        groupKey = "Yesterday"
      } else if (isThisWeek(session.updatedAt)) {
        groupKey = "This Week"
      } else {
        groupKey = format(session.updatedAt, "MMMM yyyy")
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(session)
    })

    return groups
  }

  const groupedSessions = groupSessionsByDate(filteredSessions)

  const getStats = () => {
    const totalChats = sessions.length
    const activeChats = sessions.filter((s) => !s.archived).length
    const archivedChats = sessions.filter((s) => s.archived).length
    const totalMessages = sessions.reduce((acc, session) => acc + session.messages.length, 0)
    const avgMessagesPerChat = totalChats > 0 ? Math.round(totalMessages / totalChats) : 0

    return { totalChats, activeChats, archivedChats, totalMessages, avgMessagesPerChat }
  }

  const exportChats = () => {
    const dataStr = JSON.stringify(sessions, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `healthmaxx-chats-${format(new Date(), "yyyy-MM-dd")}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const stats = getStats()

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Chat History</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setShowStats(!showStats)}>
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Panel */}
        {showStats && (
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-medium">Chat Statistics</h3>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-primary/5 rounded-lg">
                  <div className="font-semibold text-primary">{stats.totalChats}</div>
                  <div className="text-muted-foreground">Total Chats</div>
                </div>
                <div className="text-center p-2 bg-secondary/5 rounded-lg">
                  <div className="font-semibold text-secondary">{stats.totalMessages}</div>
                  <div className="text-muted-foreground">Messages</div>
                </div>
                <div className="text-center p-2 bg-accent/5 rounded-lg">
                  <div className="font-semibold text-accent-foreground">{stats.activeChats}</div>
                  <div className="text-muted-foreground">Active</div>
                </div>
                <div className="text-center p-2 bg-muted/5 rounded-lg">
                  <div className="font-semibold">{stats.avgMessagesPerChat}</div>
                  <div className="text-muted-foreground">Avg/Chat</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Toggle Archived */}
        <div className="flex space-x-2 mb-3">
          <Button
            variant={!showArchived ? "default" : "outline"}
            size="sm"
            onClick={() => setShowArchived(false)}
            className="flex-1"
          >
            Active ({stats.activeChats})
          </Button>
          <Button
            variant={showArchived ? "default" : "outline"}
            size="sm"
            onClick={() => setShowArchived(true)}
            className="flex-1"
          >
            <Archive className="w-3 h-3 mr-1" />
            Archived ({stats.archivedChats})
          </Button>
        </div>

        {/* Export/Import */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={exportChats} className="flex-1 bg-transparent">
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" disabled>
            <Upload className="w-3 h-3 mr-1" />
            Import
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.keys(groupedSessions).length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {searchQuery ? "No chats found" : showArchived ? "No archived chats" : "No active chats"}
            </p>
          </div>
        ) : (
          Object.entries(groupedSessions).map(([dateGroup, groupSessions]) => (
            <div key={dateGroup}>
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">{dateGroup}</h3>
                <Separator className="flex-1" />
                <Badge variant="outline" className="text-xs">
                  {groupSessions.length}
                </Badge>
              </div>

              <div className="space-y-2">
                {groupSessions.map((session) => (
                  <Card
                    key={session.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      currentSessionId === session.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => onSelectSession(session.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate mb-1">{session.title}</h4>
                          <p className="text-xs text-muted-foreground truncate mb-2">
                            {session.messages[session.messages.length - 1]?.content || "No messages"}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(session.updatedAt, { addSuffix: true })}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {session.messages.length - 1} msgs
                            </Badge>
                            {session.archived && (
                              <Badge variant="outline" className="text-xs">
                                <Archive className="w-2 h-2 mr-1" />
                                Archived
                              </Badge>
                            )}
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!session.archived ? (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onArchiveSession(session.id)
                                }}
                              >
                                <Archive className="w-3 h-3 mr-2" />
                                Archive
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onRestoreSession(session.id)
                                }}
                              >
                                <Undo2 className="w-3 h-3 mr-2" />
                                Restore
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                onDeleteSession(session.id)
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="w-3 h-3 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

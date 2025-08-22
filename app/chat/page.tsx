
import { ProtectedRoute } from "@/auth/protected-route"
import { ChatInterface } from "@/components/chat/chat-interface"
import { SidebarLayout } from "@/components/sidebar-layout"

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <SidebarLayout 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Maxx AI" }
        ]}
      >
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ChatInterface />
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

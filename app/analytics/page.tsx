
import { ProtectedRoute } from "@/auth/protected-route"
import { AnalyticsContent } from "@/components/analytics/analytics-content"
import { SidebarLayout } from "@/components/sidebar-layout"

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <SidebarLayout 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Progreso" }
        ]}
      >
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <AnalyticsContent />
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

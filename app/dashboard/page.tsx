
"use client"

import { ProtectedRoute } from "@/auth/protected-route"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { SidebarLayout } from "@/components/sidebar-layout"
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <SidebarLayout 
        breadcrumbs={[
          { label: "Dashboard" }
        ]}
      >
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DashboardContent />
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

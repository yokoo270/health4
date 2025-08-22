
import { ProtectedRoute } from "@/auth/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export default function RankingPage() {
  return (
    <ProtectedRoute>
      <SidebarLayout 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Ranking" }
        ]}
      >
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card className="glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Ranking
              </CardTitle>
              <CardDescription>
                Compite con otros usuarios y ve tu posición
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Esta sección estará disponible próximamente. Aquí podrás ver tu ranking y competir con otros usuarios.
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

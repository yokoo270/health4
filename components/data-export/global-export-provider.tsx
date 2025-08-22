
"use client"
import { createContext, useContext, useState, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, Activity, Brain, Heart, Users, Lock } from "lucide-react"
import { useAuth } from "@/auth/auth-provider"

interface ExportContextType {
  openExportModal: () => void
}

const ExportContext = createContext<ExportContextType | undefined>(undefined)

export function useExport() {
  const context = useContext(ExportContext)
  if (!context) {
    throw new Error("useExport must be used within ExportProvider")
  }
  return context
}

interface ExportProviderProps {
  children: ReactNode
}

export function ExportProvider({ children }: ExportProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

  const isPremium = user?.subscription?.plan === "premium" || user?.subscription?.plan === "pro"

  const exportOptions = [
    {
      id: "personal",
      title: "Datos Personales",
      description: "Información de perfil, configuraciones y preferencias",
      icon: FileText,
      format: ["JSON", "PDF"],
      premium: false
    },
    {
      id: "workouts",
      title: "Entrenamientos",
      description: "Historial completo de entrenamientos y rutinas",
      icon: Activity,
      format: ["JSON", "CSV", "PDF"],
      premium: false
    },
    {
      id: "nutrition",
      title: "Nutrición",
      description: "Datos nutricionales, comidas y seguimiento",
      icon: Heart,
      format: ["JSON", "CSV"],
      premium: true
    },
    {
      id: "analytics",
      title: "Análisis Completo",
      description: "Métricas, progreso y estadísticas detalladas",
      icon: Brain,
      format: ["JSON", "PDF", "Excel"],
      premium: true
    },
    {
      id: "social",
      title: "Datos Sociales",
      description: "Interacciones, ranking y comunidad",
      icon: Users,
      format: ["JSON"],
      premium: true
    }
  ]

  const handleExport = async (optionId: string, format: string) => {
    if (!isPremium && exportOptions.find(opt => opt.id === optionId)?.premium) {
      return
    }

    // Simulate export process
    const data = {
      user: user?.email,
      type: optionId,
      format,
      timestamp: new Date().toISOString(),
      data: `Exported ${optionId} data in ${format} format`
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `healthmaxxing-${optionId}-${format.toLowerCase()}.${format.toLowerCase()}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const openExportModal = () => setIsModalOpen(true)

  return (
    <ExportContext.Provider value={{ openExportModal }}>
      {children}
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar Datos
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 overflow-y-auto">
            {exportOptions.map((option) => (
              <div
                key={option.id}
                className={`p-4 border rounded-lg space-y-3 ${
                  option.premium && !isPremium 
                    ? "opacity-50 bg-muted/50" 
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <option.icon className="w-5 h-5 mt-1 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{option.title}</h3>
                      {option.premium && (
                        <Badge variant="secondary" className="text-xs">
                          <Lock className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {option.description}
                    </p>
                    
                    {(!option.premium || isPremium) ? (
                      <div className="flex gap-2">
                        {option.format.map((format) => (
                          <Button
                            key={format}
                            variant="outline"
                            size="sm"
                            onClick={() => handleExport(option.id, format)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            {format}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        <Lock className="w-3 h-3 mr-1" />
                        Requiere Premium
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {!isPremium && (
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-center">
                <strong>Actualiza a Premium</strong> para acceder a exportaciones avanzadas
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ExportContext.Provider>
  )
}

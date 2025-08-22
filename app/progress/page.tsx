
"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  BarChart3,
  Activity,
  Brain,
  Heart,
  Users,
  CheckCircle
} from "lucide-react"
import { UserStatsDisplay } from "@/components/gamification/user-stats"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function ProgressPage() {
  const [selectedCategory, setSelectedCategory] = useState("fisica")

  const physicalData = [
    { name: "Lun", cardio: 30, fuerza: 45, deportes: 20 },
    { name: "Mar", cardio: 40, fuerza: 50, deportes: 25 },
    { name: "Mié", cardio: 35, fuerza: 40, deportes: 30 },
    { name: "Jue", cardio: 50, fuerza: 55, deportes: 35 },
    { name: "Vie", cardio: 45, fuerza: 48, deportes: 28 },
    { name: "Sáb", cardio: 60, fuerza: 52, deportes: 40 },
    { name: "Dom", cardio: 25, fuerza: 30, deportes: 15 }
  ]

  const mentalData = [
    { name: "Lun", meditacion: 15, journaling: 10, respiracion: 8 },
    { name: "Mar", meditacion: 20, journaling: 15, respiracion: 10 },
    { name: "Mié", meditacion: 18, journaling: 12, respiracion: 12 },
    { name: "Jue", meditacion: 25, journaling: 18, respiracion: 15 },
    { name: "Vie", meditacion: 22, journaling: 20, respiracion: 10 },
    { name: "Sáb", meditacion: 30, journaling: 25, respiracion: 18 },
    { name: "Dom", meditacion: 28, journaling: 22, respiracion: 15 }
  ]

  const currentTasks = [
    {
      id: 1,
      title: "Entrenamiento de fuerza",
      category: "Salud Física",
      progress: 75,
      target: "3 sesiones/semana",
      completed: "2/3 esta semana",
      icon: Activity
    },
    {
      id: 2,
      title: "Meditación mindfulness",
      category: "Salud Mental",
      progress: 60,
      target: "15 min/día",
      completed: "4/7 días",
      icon: Brain
    },
    {
      id: 3,
      title: "Seguimiento nutricional",
      category: "Salud Física",
      progress: 85,
      target: "Registrar 3 comidas/día",
      completed: "6/7 días",
      icon: Heart
    }
  ]

  const categories = [
    { id: "fisica", name: "Salud Física", icon: Activity, color: "text-blue-500" },
    { id: "mental", name: "Salud Mental", icon: Brain, color: "text-purple-500" },
    { id: "emocional", name: "Salud Emocional", icon: Heart, color: "text-pink-500" },
    { id: "social", name: "Salud Social", icon: Users, color: "text-green-500" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progreso</h1>
          <p className="text-muted-foreground">
            Visualiza tu avance en todas las áreas de salud
          </p>
        </div>
      </div>

      <UserStatsDisplay />

      {/* Tareas Actuales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Tareas Activas
          </CardTitle>
          <CardDescription>
            Progreso de tus objetivos actuales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <task.icon className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{task.title}</h3>
                  <Badge variant="outline">{task.category}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso: {task.completed}</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{task.target}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Completar
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Gráficas por Categoría */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Análisis Detallado
          </CardTitle>
          <CardDescription>
            Progreso semanal por categoría
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                  <cat.icon className={`w-4 h-4 ${cat.color}`} />
                  <span className="hidden sm:inline">{cat.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="fisica" className="mt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={physicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cardio" fill="#3b82f6" name="Cardio (min)" />
                    <Bar dataKey="fuerza" fill="#10b981" name="Fuerza (min)" />
                    <Bar dataKey="deportes" fill="#f59e0b" name="Deportes (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="mental" className="mt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mentalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="meditacion" stroke="#8b5cf6" name="Meditación (min)" />
                    <Line type="monotone" dataKey="journaling" stroke="#ec4899" name="Journaling (min)" />
                    <Line type="monotone" dataKey="respiracion" stroke="#06b6d4" name="Respiración (min)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="emocional" className="mt-6">
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Comienza a registrar actividades emocionales</p>
                  <p className="text-sm">para ver tu progreso aquí</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-6">
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Comienza a registrar actividades sociales</p>
                  <p className="text-sm">para ver tu progreso aquí</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Estadísticas Semanales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">+15%</p>
                <p className="text-xs text-muted-foreground">vs semana anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">6/7</p>
                <p className="text-xs text-muted-foreground">días activos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">8/10</p>
                <p className="text-xs text-muted-foreground">objetivos alcanzados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">285</p>
                <p className="text-xs text-muted-foreground">min totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

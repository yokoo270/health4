"use client"

import { ProtectedRoute } from "@/auth/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { aiIntegrationService, AITask } from "@/lib/ai-integrations"
import { Brain, Dumbbell, Heart, Apple, Users, CheckCircle2, Clock } from "lucide-react"

export default function TasklistPage() {
  const [aiTasks, setAiTasks] = useState<AITask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAITasks();
  }, []);

  const loadAITasks = async () => {
    try {
      const tasks = await aiIntegrationService.getAITasks();
      setAiTasks(tasks);
    } catch (error) {
      console.error('Error loading AI tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskComplete = async (taskId: string) => {
    try {
      await aiIntegrationService.markTaskCompleted(taskId);
      await loadAITasks(); // Reload tasks
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'routine': return <Dumbbell className="w-4 h-4" />;
      case 'nutrition': return <Apple className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'mental': return <Brain className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'routine': return 'bg-blue-100 text-blue-800';
      case 'nutrition': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-purple-100 text-purple-800';
      case 'mental': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeTasks = aiTasks.filter(task => !task.completed);
  const completedTasks = aiTasks.filter(task => task.completed);

  return (
    <ProtectedRoute>
      <SidebarLayout 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Lista de tareas" }
        ]}
      >
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              🎯 Lista de Tareas Inteligente
            </h1>
            <p className="text-muted-foreground">
              Tareas personalizadas generadas por Maxx AI para optimizar tu progreso
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{activeTasks.length}</div>
                <div className="text-sm text-muted-foreground">Tareas Pendientes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
                <div className="text-sm text-muted-foreground">Completadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {aiTasks.filter(t => t.type === 'routine').length}
                </div>
                <div className="text-sm text-muted-foreground">Rutinas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {aiTasks.filter(t => t.type === 'nutrition').length}
                </div>
                <div className="text-sm text-muted-foreground">Nutrición</div>
              </CardContent>
            </Card>
          </div>

          {/* AI Integration Notice */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">🤖 Powered by Maxx AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Todas las tareas son generadas automáticamente por la IA basándose en tus objetivos, 
                    progreso y preferencias personales. Se actualizan dinámicamente para maximizar tu éxito.
                  </p>
                </div>
                <Button onClick={() => window.open('/chat', '_blank')}>
                  <Brain className="w-4 h-4 mr-2" />
                  Chat con IA
                </Button>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="text-center p-8">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-900 dark:text-white">Cargando tareas inteligentes...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {/* Active Tasks */}
              {activeTasks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Tareas Pendientes ({activeTasks.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeTasks.map((task) => (
                      <div 
                        key={task.id}
                        className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900"
                      >
                        <Checkbox 
                          checked={false}
                          onCheckedChange={() => handleTaskComplete(task.id)}
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                            <Badge className={getTaskColor(task.type)}>
                              <span className="flex items-center gap-1">
                                {getTaskIcon(task.type)}
                                {task.type}
                              </span>
                            </Badge>
                            {task.priority === 'high' && (
                              <Badge variant="destructive">Alta prioridad</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                          {task.dueDate && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Fecha límite: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Completed Tasks */}
              {completedTasks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Tareas Completadas ({completedTasks.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {completedTasks.slice(0, 5).map((task) => (
                      <div 
                        key={task.id}
                        className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/20 opacity-75"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium line-through text-gray-900 dark:text-white">{task.title}</h4>
                            <Badge className={getTaskColor(task.type)}>
                              <span className="flex items-center gap-1">
                                {getTaskIcon(task.type)}
                                {task.type}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-through">{task.description}</p>
                        </div>
                      </div>
                    ))}
                    {completedTasks.length > 5 && (
                      <p className="text-center text-sm text-muted-foreground">
                        ...y {completedTasks.length - 5} tareas más completadas
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Empty State */}
              {aiTasks.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">No hay tareas aún</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Ve a "Tu Camino" y usa la IA para crear rutinas y planes personalizados. 
                      Las tareas aparecerán aquí automáticamente.
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={() => window.location.href = '/your-path'}>
                        Ir a Tu Camino
                      </Button>
                      <Button variant="outline" onClick={() => window.open('/chat', '_blank')}>
                        Chat con IA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
"use client"

import { ProtectedRoute } from "@/auth/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Route,
  Dumbbell,
  Heart,
  Trophy,
  Apple,
  Brain,
  Clock,
  Smile,
  Users,
  Timer,
  Circle,
  Cigarette,
  BookOpen,
  Moon,
  Activity,
  Target,
  MessageCircle,
  Handshake,
  Zap,
  Shield,
  ChevronRight,
  PlayCircle,
  Info,
  Scan,
  Search,
  Play
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import FoodSearch from "@/components/food/food-search"
import FoodInfoCard from "@/components/food/food-info-card"
import { foodStorage } from "@/lib/food-api"
import StrengthTraining from "@/components/health/strength-training"
import NutritionSystem from "@/components/health/nutrition-system"
import MeditationRelaxation from "@/components/health/meditation-relaxation"
import CardioTraining from '@/components/health/cardio-training';
import MentalHealth from '@/components/health/mental-health';
import EmotionalHealth from '@/components/health/emotional-health';
import SocialHealth from '@/components/health/social-health';
import SportsTraining from '@/components/health/sports-training';

export default function YourPathPage() {
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodProduct | null>(null);
  const [nutritionView, setNutritionView] = useState<'search' | 'details'>('search');
  const [showStrengthTraining, setShowStrengthTraining] = useState(false);
  const [showNutritionSystem, setShowNutritionSystem] = useState(false);
  const [showMeditationRelaxation, setShowMeditationRelaxation] = useState(false);

  const handleFoodSelect = async (product: FoodProduct) => {
    setSelectedFood(product);
    setNutritionView('details');

    // Save to history
    try {
      await foodStorage.saveFoodToHistory(product);
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  const handleBackToSearch = () => {
    setSelectedFood(null);
    setNutritionView('search');
  };

  const handleAddToMeal = async (product: FoodProduct) => {
    try {
      await foodStorage.addFoodToMeal(product, 100, 'g', 'lunch');
      // Could show a toast notification here
      console.log('Food added to meal successfully');
    } catch (error) {
      console.error('Error adding food to meal:', error);
    }
  };

  const [activeComponent, setActiveComponent] = useState('strength-training'); // Default active component

  const componentMap = {
    'strength-training': StrengthTraining,
    'cardio-training': CardioTraining,
    'nutrition-system': NutritionSystem,
    'mental-health': MentalHealth,
    'emotional-health': EmotionalHealth,
    'social-health': SocialHealth,
    'meditation-relaxation': MeditationRelaxation,
    'sports-training': SportsTraining,
  };

  const RenderedComponent = componentMap[activeComponent as keyof typeof componentMap];

  return (
    <ProtectedRoute>
      <SidebarLayout 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tu camino" }
        ]}
      >
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-serif font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Tu Camino Personalizado
            </h1>
            <p className="text-muted-foreground">
              Explora tu ruta completa hacia el bienestar integral con planes personalizados para cada área de tu salud
            </p>
          </div>

          {/* Main Health Categories */}
          <Tabs defaultValue="fisica" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="fisica" className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                Física
              </TabsTrigger>
              <TabsTrigger value="mental" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Mental
              </TabsTrigger>
              <TabsTrigger value="emocional" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Emocional
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Social
              </TabsTrigger>
            </TabsList>

            {/* Salud Física */}
            <TabsContent value="fisica" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glow-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="w-5 h-5 text-primary" />
                      Entrenamiento de Fuerza
                    </CardTitle>
                    <CardDescription>
                      Desarrolla músculo, fuerza y resistencia con planes personalizados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Rutinas AI</Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setActiveComponent('strength-training')}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Empezar
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Rutinas personalizadas por IA<br/>
                      • Progresión automática<br/>
                      • Seguimiento de cargas
                    </div>
                  </CardContent>
                </Card>

                <Card className="glow-card border-secondary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-secondary" />
                      Ejercicios Cardiovasculares
                    </CardTitle>
                    <CardDescription>
                      Mejora tu resistencia y salud cardiovascular
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Cardio AI</Badge>
                      <Button size="sm" variant="outline" onClick={() => setActiveComponent('cardio-training')}>
                        <Info className="w-4 h-4 mr-2" />
                        Ver más
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Tipos de cardio personalizados<br/>
                      • Integración con Wear OS<br/>
                      • Mapas y rutas seguras
                    </div>
                  </CardContent>
                </Card>

                <Card className="glow-card border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-accent" />
                      Deportes
                    </CardTitle>
                    <CardDescription>
                      Encuentra y practica deportes que disfrutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Fútbol AI</Badge>
                      <Button size="sm" variant="outline" onClick={() => setActiveComponent('sports-training')}>
                        <Target className="w-4 h-4 mr-2" />
                        Explorar
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Recomendaciones personalizadas<br/>
                      • Grupos y comunidades<br/>
                      • Seguimiento de progreso
                    </div>
                  </CardContent>
                </Card>

                <Card className="glow-card border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Apple className="w-5 h-5 text-green-500" />
                      Nutrición
                    </CardTitle>
                    <CardDescription>
                      Alimentación inteligente para tus objetivos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Escáner AI</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowNutritionModal(true)}
                      >
                        <Scan className="w-4 h-4 mr-2" />
                        Abrir Escáner
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Escáner de código de barras<br/>
                      • Búsqueda de alimentos<br/>
                      • Análisis nutricional AI<br/>
                      • Registro de comidas
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => setActiveComponent('nutrition-system')}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Sistema Completo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Salud Mental */}
            <TabsContent value="mental" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glow-card border-purple-500/20 bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-500" />
                      Salud Mental
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Fortalece tu mente con técnicas científicas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Mental AI</Badge>
                      <Button size="sm" variant="outline" onClick={() => setActiveComponent('mental-health')}>
                        <Play className="w-4 h-4 mr-2" />
                        Comenzar
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      • Técnicas de mindfulness<br/>
                      • Entrenamiento cognitivo<br/>
                      • Manejo de estrés avanzado<br/>
                      • Evaluaciones de bienestar
                    </div>
                  </CardContent>
                </Card>

                {/* Meditación y Relajación */}
                <Card className="glow-card border-orange-500/20 bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-orange-500" />
                      Meditación y Relajación
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Encuentra tu equilibrio interior
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Mindfulness</Badge>
                      <Button size="sm" variant="outline" onClick={() => setActiveComponent('meditation-relaxation')}>
                        <Play className="w-4 h-4 mr-2" />
                        Comenzar
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      • Sesiones guiadas de meditación<br/>
                      • Ejercicios de respiración<br/>
                      • Relajación muscular progresiva
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Salud Emocional */}
            <TabsContent value="emocional" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Emotional Health */}
                <Card className="glow-card border-red-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Salud Emocional
                    </CardTitle>
                    <CardDescription>
                      Inteligencia emocional y bienestar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge style={{backgroundColor: 'rgb(239 68 68 / 0.1)', color: 'rgb(239 68 68)'}}>Emocional AI</Badge>
                      <Button size="sm" variant="outline" onClick={() => setActiveComponent('emotional-health')}>
                        <Play className="w-4 h-4 mr-2" />
                        Comenzar
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Reconocimiento emocional<br/>
                      • Técnicas de regulación<br/>
                      • Registro de estado de ánimo<br/>
                      • Respirómetro virtual
                    </div>
                  </CardContent>
                </Card>

                {/* Social Health */}
                <Card className="glow-card border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      Salud Social
                    </CardTitle>
                    <CardDescription>
                      Relaciones sanas y habilidades sociales
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge style={{backgroundColor: 'rgb(59 130 246 / 0.1)', color: 'rgb(59 130 246)'}}>Social AI</Badge>
                      <Button size="sm" variant="outline" onClick={() => setActiveComponent('social-health')}>
                        <Play className="w-4 h-4 mr-2" />
                        Comenzar
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Habilidades de comunicación<br/>
                      • Desarrollo del carisma<br/>
                      • Herramientas de relación<br/>
                      • Evaluación de relaciones
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Salud Social */}
            <TabsContent value="social" className="space-y-6">
              <div className="grid gap-6">
                {/* Habilidades Sociales Básicas */}
                <Card className="glow-card border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-cyan-500" />
                      Habilidades Sociales Básicas
                    </CardTitle>
                    <CardDescription>
                      Desarrolla comunicación, carisma y empatía
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Comunicación Asertiva</h4>
                        <div className="text-sm text-muted-foreground">
                          Hábitos para principiantes e intermedios
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Carisma Natural</h4>
                        <div className="text-sm text-muted-foreground">
                          Conexión genuina y naturalidad
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Empatía</h4>
                        <div className="text-sm text-muted-foreground">
                          Actividades y hábitos prácticos
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                      <div className="text-sm">
                        <strong>Tip:</strong> Usa el chat de IA para practicar conversaciones
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Relaciones y Conflictos */}
                  <Card className="glow-card border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Handshake className="w-5 h-5 text-yellow-500" />
                        Relaciones y Resolución de Conflictos
                      </CardTitle>
                      <CardDescription>
                        Construye relaciones sanas y resuelve conflictos
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        • Técnicas de escucha activa<br/>
                        • Método "Yo siento"<br/>
                        • Checklist de relaciones sanas<br/>
                        • Soluciones conjuntas
                      </div>
                      <Button size="sm" className="w-full">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Evaluar relaciones
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Relaciones Románticas */}
                  <Card className="glow-card border-rose-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-rose-500" />
                        Relaciones Románticas
                      </CardTitle>
                      <CardDescription>
                        Consejos para citas y relaciones de pareja
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        • Consejos para citas efectivas<br/>
                        • Red flags y green flags<br/>
                        • Comunicación en pareja<br/>
                        • Regla 5:1 de interacciones
                      </div>
                      <Button size="sm" className="w-full">
                        <Info className="w-4 h-4 mr-2" />
                        Ver guías
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Conexión y Comunidad */}
                <Card className="glow-card border-emerald-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-500" />
                      Conexión y Comunidad
                    </CardTitle>
                    <CardDescription>
                      Construye redes de apoyo y participa en comunidades
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center space-y-2">
                        <div className="font-semibold">Networking</div>
                        <div className="text-sm text-muted-foreground">
                          Construye relaciones profesionales
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="font-semibold">Participación Comunitaria</div>
                        <div className="text-sm text-muted-foreground">
                          Involúcrate en tu comunidad
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="font-semibold">Soporte Social</div>
                        <div className="text-sm text-muted-foreground">
                          Crea redes de apoyo mutuo
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" className="w-full" variant="outline">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        Próximamente
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

          </Tabs>

          {/* AI Integration Notice */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-black text-lg mb-1">
                    Control Total con Maxx AI
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Maxx AI puede crear planes personalizados, analizar tu progreso, ajustar rutinas en tiempo real, 
                    y coordinar todos los aspectos de tu salud de forma inteligente.
                  </p>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Dumbbell className="w-3 h-3" />
                      <span>Entrenamientos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      <span>Cardio Plans</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Brain className="w-3 h-3" />
                      <span>Salud Mental</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Social Skills</span>
                    </div>
                  </div>
                </div>
                <Link href="/chat">
                  <Button className="glow-primary">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hablar con Maxx AI
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Modal */}
          <Dialog open={showNutritionModal} onOpenChange={setShowNutritionModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-green-500" />
                  {nutritionView === 'search' ? 'Buscar Alimentos' : selectedFood?.product_name}
                </DialogTitle>
              </DialogHeader>

              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                {nutritionView === 'search' ? (
                  <FoodSearch
                    onProductSelect={handleFoodSelect}
                    placeholder="Buscar alimentos o escanear código de barras..."
                    showScanner={true}
                  />
                ) : (
                  selectedFood && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleBackToSearch}
                        >
                          ← Volver a búsqueda
                        </Button>
                      </div>
                      <FoodInfoCard
                        product={selectedFood}
                        onAddToMeal={handleAddToMeal}
                        showActions={true}
                      />
                    </div>
                  )
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Strength Training Modal */}
          <Dialog open={showStrengthTraining} onOpenChange={setShowStrengthTraining}>
            <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-primary" />
                  Entrenamiento de Fuerza
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                <StrengthTraining />
              </div>
            </DialogContent>
          </Dialog>

          {/* Nutrition System Modal */}
          <Dialog open={showNutritionSystem} onOpenChange={setShowNutritionSystem}>
            <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-green-500" />
                  Sistema de Nutrición
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                <NutritionSystem />
              </div>
            </DialogContent>
          </Dialog>

          {/* Meditation & Relaxation Modal */}
          <Dialog open={showMeditationRelaxation} onOpenChange={setShowMeditationRelaxation}>
            <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Circle className="w-5 h-5 text-purple-500" />
                  Meditación y Relajación
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                <MeditationRelaxation />
              </div>
            </DialogContent>
          </Dialog>

          {/* Component rendering based on activeComponent */}
          <Dialog open={!!activeComponent && !['strength-training', 'nutrition-system', 'meditation-relaxation'].includes(activeComponent)} onOpenChange={(isOpen) => { if (!isOpen) setActiveComponent('') }}>
            <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {activeComponent === 'cardio-training' && <Activity className="w-5 h-5 text-secondary" />}
                  {activeComponent === 'mental-health' && <Brain className="w-5 h-5 text-purple-500" />}
                  {activeComponent === 'emotional-health' && <Heart className="w-5 h-5 text-red-500" />}
                  {activeComponent === 'social-health' && <Users className="w-5 h-5 text-blue-500" />}
                  {activeComponent === 'sports-training' && <Trophy className="w-5 h-5 text-yellow-500" />}
                  {activeComponent === 'cardio-training' && 'Ejercicios Cardiovasculares'}
                  {activeComponent === 'mental-health' && 'Salud Mental'}
                  {activeComponent === 'emotional-health' && 'Salud Emocional'}
                  {activeComponent === 'social-health' && 'Salud Social'}
                  {activeComponent === 'sports-training' && 'Entrenamiento Deportivo'}
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                {RenderedComponent && <RenderedComponent />}
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}

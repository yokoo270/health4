"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { 
  Heart, 
  Brain, 
  Shield, 
  Target,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Star,
  Timer,
  Activity,
  BookOpen,
  Sparkles,
  Gauge,
  LineChart,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import { useSubscription } from '@/hooks/use-subscription'

interface Emotion {
  id: string
  name: string
  description: string
  category: 'basic' | 'complex'
  triggers: string[]
  physicalSigns: string[]
  managementTips: string[]
}

interface MoodEntry {
  date: string
  mood: number // 1-10 scale
  emotions: string[]
  triggers: string[]
  notes: string
}

interface EmotionalExercise {
  id: string
  name: string
  category: 'recognition' | 'regulation' | 'strengthening'
  duration: string
  description: string
  instructions: string[]
  benefits: string[]
  difficulty: 'easy' | 'moderate' | 'hard'
}

interface BreathingPattern {
  id: string
  name: string
  pattern: number[]
  description: string
  emotionalBenefit: string
}

const ComprehensiveEmotionalHealth = () => {
  const [activeSection, setActiveSection] = useState('recognition')
  const [currentMood, setCurrentMood] = useState(5)
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingCycle, setBreathingCycle] = useState(0)
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern | null>(null)
  const [dailyMoodNotes, setDailyMoodNotes] = useState('')
  
  const { features } = useSubscription()

  // Emotions database
  const emotions: Emotion[] = [
    {
      id: 'joy',
      name: 'Alegría',
      description: 'Sentimiento de felicidad y satisfacción',
      category: 'basic',
      triggers: ['Logros', 'Tiempo con seres queridos', 'Experiencias positivas'],
      physicalSigns: ['Sonrisa', 'Energía elevada', 'Relajación muscular'],
      managementTips: ['Saborea el momento', 'Comparte con otros', 'Guarda recuerdos']
    },
    {
      id: 'sadness',
      name: 'Tristeza',
      description: 'Sentimiento de pena o melancolía',
      category: 'basic',
      triggers: ['Pérdidas', 'Decepciones', 'Soledad'],
      physicalSigns: ['Llanto', 'Fatiga', 'Pesadez en el pecho'],
      managementTips: ['Permite sentir', 'Busca apoyo', 'Actividad física suave']
    },
    {
      id: 'anger',
      name: 'Ira',
      description: 'Sentimiento de irritación o enojo',
      category: 'basic',
      triggers: ['Injusticias', 'Frustraciones', 'Límites violados'],
      physicalSigns: ['Tensión muscular', 'Calor', 'Respiración acelerada'],
      managementTips: ['Respira profundo', 'Ejercicio físico', 'Pausa antes de actuar']
    },
    {
      id: 'fear',
      name: 'Miedo',
      description: 'Sentimiento de aprensión ante un peligro',
      category: 'basic',
      triggers: ['Amenazas', 'Incertidumbre', 'Cambios'],
      physicalSigns: ['Corazón acelerado', 'Sudoración', 'Tensión'],
      managementTips: ['Evalúa realidad', 'Respiración controlada', 'Busca información']
    },
    {
      id: 'anxiety',
      name: 'Ansiedad',
      description: 'Preocupación excesiva por el futuro',
      category: 'complex',
      triggers: ['Incertidumbre', 'Presión social', 'Responsabilidades'],
      physicalSigns: ['Tensión', 'Inquietud', 'Problemas de sueño'],
      managementTips: ['Mindfulness', 'Ejercicio regular', 'Técnicas de relajación']
    },
    {
      id: 'excitement',
      name: 'Emoción/Entusiasmo',
      description: 'Estado de alta energía y anticipación positiva',
      category: 'complex',
      triggers: ['Nuevas oportunidades', 'Logros', 'Aventuras'],
      physicalSigns: ['Energía alta', 'Dificultad para estar quieto', 'Habla rápida'],
      managementTips: ['Canaliza la energía', 'Planifica acciones', 'Mantén los pies en la tierra']
    }
  ]

  // Emotional exercises
  const emotionalExercises: EmotionalExercise[] = [
    {
      id: 'body-scan',
      name: 'Escaneo Corporal Emocional',
      category: 'recognition',
      duration: '10 min',
      description: 'Reconoce cómo las emociones se manifiestan en tu cuerpo',
      instructions: [
        'Siéntate cómodamente y cierra los ojos',
        'Respira profundamente 3 veces',
        'Escanea tu cuerpo desde la cabeza hasta los pies',
        'Observa tensiones, sensaciones o áreas de relajación',
        'Conecta estas sensaciones con tus emociones actuales',
        'Sin juzgar, simplemente observa y acepta'
      ],
      benefits: [
        'Mayor autoconciencia corporal',
        'Reconocimiento temprano de emociones',
        'Reducción de tensión física',
        'Mejor conexión mente-cuerpo'
      ],
      difficulty: 'easy'
    },
    {
      id: 'emotion-naming',
      name: 'Nombrar y Validar Emociones',
      category: 'recognition',
      duration: '5 min',
      description: 'Práctica para identificar y validar emociones específicas',
      instructions: [
        'Cuando sientas una emoción intensa, detente',
        'Pregúntate: "¿Qué estoy sintiendo exactamente?"',
        'Sé específico: no solo "mal", sino "frustrado" o "decepcionado"',
        'Valida la emoción: "Es normal sentir esto"',
        'Pregúntate qué necesita esta emoción',
        'Acepta sin juzgar'
      ],
      benefits: [
        'Vocabulario emocional ampliado',
        'Menor intensidad emocional',
        'Mayor autocompasión',
        'Mejor comunicación emocional'
      ],
      difficulty: 'easy'
    },
    {
      id: 'emotional-breathing',
      name: 'Respiración para Regulación Emocional',
      category: 'regulation',
      duration: '8 min',
      description: 'Técnicas específicas de respiración para diferentes estados emocionales',
      instructions: [
        'Identifica tu estado emocional actual',
        'Para ansiedad: Respiración 4-7-8',
        'Para ira: Respiración cuadrada (4-4-4-4)',
        'Para tristeza: Respiración energizante (rápida inhalación, lenta exhalación)',
        'Para agitación: Respiración lenta y profunda',
        'Mantén el patrón durante 5-8 minutos'
      ],
      benefits: [
        'Regulación inmediata del estado emocional',
        'Activación del sistema nervioso parasimpático',
        'Reducción del cortisol',
        'Mayor control emocional'
      ],
      difficulty: 'moderate'
    },
    {
      id: 'reframing-exercise',
      name: 'Reestructuración Cognitiva',
      category: 'regulation',
      duration: '15 min',
      description: 'Cambia patrones de pensamiento negativos por perspectivas más equilibradas',
      instructions: [
        'Identifica un pensamiento que te cause malestar',
        'Escribe el pensamiento tal como aparece',
        'Pregúntate: "¿Es este pensamiento factual o interpretación?"',
        'Busca evidencia a favor y en contra',
        'Genera 3 interpretaciones alternativas',
        'Elige la perspectiva más equilibrada y útil'
      ],
      benefits: [
        'Reducción de pensamientos catastróficos',
        'Mayor flexibilidad mental',
        'Mejor resolución de problemas',
        'Reducción de ansiedad y depresión'
      ],
      difficulty: 'hard'
    },
    {
      id: 'gratitude-practice',
      name: 'Práctica de Gratitud Profunda',
      category: 'strengthening',
      duration: '10 min',
      description: 'Desarrolla un estado emocional más positivo y resiliente',
      instructions: [
        'Reflexiona sobre 3 cosas específicas por las que estás agradecido',
        'Ve más allá de lo obvio - encuentra detalles únicos',
        'Siente físicamente la gratitud en tu cuerpo',
        'Visualiza cómo estas cosas positivas llegaron a tu vida',
        'Considera cómo puedes expresar esta gratitud',
        'Escribe una nota de agradecimiento (mental o física)'
      ],
      benefits: [
        'Aumento de emociones positivas',
        'Mejor perspectiva de vida',
        'Mayor resilencia ante adversidades',
        'Fortalecimiento de relaciones'
      ],
      difficulty: 'easy'
    },
    {
      id: 'emotional-strength-building',
      name: 'Construcción de Fortaleza Emocional',
      category: 'strengthening',
      duration: '20 min',
      description: 'Ejercicios para desarrollar resistencia emocional y resiliencia',
      instructions: [
        'Recuerda una situación difícil que superaste',
        'Identifica las fortalezas que usaste',
        'Visualiza enfrentando un desafío actual con esas mismas fortalezas',
        'Practica autoafirmaciones realistas y poderosas',
        'Imagina tu "yo futuro" dándote consejos',
        'Crea un plan de acción basado en tus fortalezas'
      ],
      benefits: [
        'Mayor confianza en tus capacidades',
        'Mejor manejo de adversidades',
        'Reducción de la victimización',
        'Desarrollo de mentalidad de crecimiento'
      ],
      difficulty: 'moderate'
    }
  ]

  // Breathing patterns for emotional regulation
  const breathingPatterns: BreathingPattern[] = [
    {
      id: 'anxiety-relief',
      name: 'Alivio de Ansiedad',
      pattern: [4, 7, 8], // inhale, hold, exhale
      description: 'Respiración 4-7-8 para calmar el sistema nervioso',
      emotionalBenefit: 'Reduce ansiedad y activa respuesta de relajación'
    },
    {
      id: 'anger-management',
      name: 'Control de Ira',
      pattern: [4, 4, 4, 4], // inhale, hold, exhale, hold
      description: 'Respiración cuadrada para equilibrar emociones intensas',
      emotionalBenefit: 'Proporciona control y estabilidad emocional'
    },
    {
      id: 'energy-boost',
      name: 'Boost de Energía',
      pattern: [2, 1, 4], // quick inhale, brief hold, slow exhale
      description: 'Respiración energizante para contrarrestar tristeza',
      emotionalBenefit: 'Aumenta energía y mejora el estado de ánimo'
    },
    {
      id: 'balance-restore',
      name: 'Restaurar Equilibrio',
      pattern: [6, 6], // equal inhale and exhale
      description: 'Respiración equilibrada para estabilidad emocional',
      emotionalBenefit: 'Promueve equilibrio y claridad mental'
    }
  ]

  // Mood tracking
  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊', '😄', '🤗', '😍', '🤩', '🥳']
  
  const saveMoodEntry = () => {
    const entry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      emotions: selectedEmotions,
      triggers: [],
      notes: dailyMoodNotes
    }
    
    setMoodHistory(prev => {
      const filtered = prev.filter(e => e.date !== entry.date)
      return [...filtered, entry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    })
    
    setDailyMoodNotes('')
  }

  // Breathing exercise logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (breathingActive && selectedPattern) {
      interval = setInterval(() => {
        setBreathingCycle(prev => (prev + 1) % selectedPattern.pattern.reduce((a, b) => a + b, 0))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [breathingActive, selectedPattern])

  const startBreathingExercise = (pattern: BreathingPattern) => {
    setSelectedPattern(pattern)
    setBreathingCycle(0)
    setBreathingActive(true)
  }

  const stopBreathingExercise = () => {
    setBreathingActive(false)
    setSelectedPattern(null)
    setBreathingCycle(0)
  }

  const getCurrentBreathingPhase = () => {
    if (!selectedPattern) return 'Preparado'
    
    const pattern = selectedPattern.pattern
    let currentPhase = 'Inhalar'
    let elapsed = breathingCycle
    
    if (pattern.length === 3) { // 4-7-8 pattern
      if (elapsed < pattern[0]) currentPhase = 'Inhalar'
      else if (elapsed < pattern[0] + pattern[1]) currentPhase = 'Mantener'
      else currentPhase = 'Exhalar'
    } else if (pattern.length === 4) { // Square breathing
      if (elapsed < pattern[0]) currentPhase = 'Inhalar'
      else if (elapsed < pattern[0] + pattern[1]) currentPhase = 'Mantener'
      else if (elapsed < pattern[0] + pattern[1] + pattern[2]) currentPhase = 'Exhalar'
      else currentPhase = 'Mantener'
    } else { // Equal breathing
      currentPhase = elapsed < pattern[0] ? 'Inhalar' : 'Exhalar'
    }
    
    return currentPhase
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          ❤️ Salud Emocional
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Desarrolla inteligencia emocional, fortaleza mental y bienestar emocional profundo
        </p>
      </div>

      {/* Subscription Gate for Premium Features */}
      {(features.emotionalHealthRestricted) && (
        <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ Tienes acceso limitado a Salud Emocional. Actualiza a Premium para acceso completo.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Main Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recognition" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Reconocimiento
          </TabsTrigger>
          <TabsTrigger value="regulation" className="flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            Regulación
          </TabsTrigger>
          <TabsTrigger value="strengthening" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Fortalecimiento
          </TabsTrigger>
        </TabsList>

        {/* Recognition Section */}
        <TabsContent value="recognition" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mood Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Registro de Estado de Ánimo
                </CardTitle>
                <CardDescription>
                  Registra y haz seguimiento de tu estado emocional diario
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">¿Cómo te sientes hoy?</span>
                    <span className="text-2xl">{moodEmojis[currentMood - 1]}</span>
                  </div>
                  <Slider
                    value={[currentMood]}
                    onValueChange={(value) => setCurrentMood(value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Muy mal</span>
                    <span>Neutral</span>
                    <span>Excelente</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Notas del día:</label>
                  <Textarea
                    placeholder="¿Qué influyó en tu estado de ánimo hoy?"
                    value={dailyMoodNotes}
                    onChange={(e) => setDailyMoodNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button onClick={saveMoodEntry} className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Guardar Estado de Hoy
                </Button>

                {/* Mood History */}
                {moodHistory.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Historial reciente:</h4>
                    <div className="space-y-1">
                      {moodHistory.slice(0, 7).map((entry, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                          <div className="flex items-center gap-2">
                            <span>{moodEmojis[entry.mood - 1]}</span>
                            <span className="text-muted-foreground">{entry.mood}/10</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Emotion Glossary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Glosario de Emociones
                </CardTitle>
                <CardDescription>
                  Aprende a identificar y entender diferentes emociones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {emotions.slice(0, 4).map((emotion) => (
                    <Card key={emotion.id} className="border-muted">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-sm">{emotion.name}</h4>
                            <Badge variant={emotion.category === 'basic' ? 'default' : 'secondary'}>
                              {emotion.category === 'basic' ? 'Básica' : 'Compleja'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{emotion.description}</p>
                          
                          {!features.emotionalHealthRestricted && (
                            <details className="text-xs">
                              <summary className="cursor-pointer font-medium">Ver más detalles</summary>
                              <div className="mt-2 space-y-1">
                                <div>
                                  <strong>Señales físicas:</strong> {emotion.physicalSigns.join(', ')}
                                </div>
                                <div>
                                  <strong>Tips de manejo:</strong> {emotion.managementTips.join(', ')}
                                </div>
                              </div>
                            </details>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Ver Glosario Completo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recognition Exercises */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Ejercicios de Reconocimiento Emocional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {emotionalExercises.filter(ex => ex.category === 'recognition').map((exercise) => (
                  <Card key={exercise.id} className="border-green-200">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <Badge variant={exercise.difficulty === 'easy' ? 'secondary' : exercise.difficulty === 'moderate' ? 'default' : 'destructive'}>
                          {exercise.difficulty === 'easy' ? 'Fácil' : exercise.difficulty === 'moderate' ? 'Moderado' : 'Difícil'}
                        </Badge>
                      </div>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="w-4 h-4" />
                        <span>{exercise.duration}</span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Beneficios:</h4>
                        <ul className="space-y-1">
                          {exercise.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full" disabled={features.emotionalHealthRestricted}>
                        <Play className="w-4 h-4 mr-2" />
                        {features.emotionalHealthRestricted ? 'Requiere Premium' : 'Comenzar Ejercicio'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regulation Section */}
        <TabsContent value="regulation" className="space-y-6">
          {/* Breathing Respirometer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Respirómetro Virtual
              </CardTitle>
              <CardDescription>
                Ejercicios de respiración guiados para regulación emocional inmediata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {breathingActive && selectedPattern ? (
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className={`w-32 h-32 mx-auto rounded-full border-4 transition-all duration-1000 ${
                      getCurrentBreathingPhase() === 'Inhalar' ? 'scale-110 border-blue-500 bg-blue-100 dark:bg-blue-900/30' :
                      getCurrentBreathingPhase() === 'Exhalar' ? 'scale-90 border-green-500 bg-green-100 dark:bg-green-900/30' :
                      'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30'
                    }`}>
                      <div className="flex items-center justify-center h-full">
                        <span className="text-2xl font-bold">{getCurrentBreathingPhase()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{selectedPattern.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPattern.emotionalBenefit}</p>
                  </div>
                  
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setBreathingActive(!breathingActive)}
                    >
                      {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" onClick={stopBreathingExercise}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {breathingPatterns.map((pattern) => (
                    <Card key={pattern.id} className="border-blue-200 hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-lg">{pattern.name}</CardTitle>
                        <CardDescription>{pattern.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {pattern.pattern.join('-')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Patrón de respiración
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground text-center">
                          {pattern.emotionalBenefit}
                        </div>

                        <Button
                          className="w-full"
                          onClick={() => startBreathingExercise(pattern)}
                          disabled={features.emotionalHealthRestricted}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {features.emotionalHealthRestricted ? 'Requiere Premium' : 'Comenzar'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Regulation Exercises */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-orange-500" />
                Técnicas de Regulación Emocional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {emotionalExercises.filter(ex => ex.category === 'regulation').map((exercise) => (
                  <Card key={exercise.id} className="border-orange-200">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <Badge variant={exercise.difficulty === 'easy' ? 'secondary' : exercise.difficulty === 'moderate' ? 'default' : 'destructive'}>
                          {exercise.difficulty === 'easy' ? 'Fácil' : exercise.difficulty === 'moderate' ? 'Moderado' : 'Difícil'}
                        </Badge>
                      </div>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="w-4 h-4" />
                        <span>{exercise.duration}</span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Instrucciones:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {exercise.instructions.slice(0, 3).map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                          {exercise.instructions.length > 3 && (
                            <li className="text-muted-foreground">... y {exercise.instructions.length - 3} pasos más</li>
                          )}
                        </ol>
                      </div>

                      <Button className="w-full" disabled={features.emotionalHealthRestricted}>
                        <Play className="w-4 h-4 mr-2" />
                        {features.emotionalHealthRestricted ? 'Requiere Premium' : 'Comenzar Ejercicio'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strengthening Section */}
        <TabsContent value="strengthening" className="space-y-6">
          {/* Emotional Strength Info */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                ¿Qué es el Fortalecimiento Emocional?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                El fortalecimiento emocional es la capacidad de mantener equilibrio y bienestar emocional ante las adversidades. 
                No significa reprimir emociones, sino desarrollar herramientas para manejarlas de manera saludable.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Neurociencia
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Fortalece la corteza prefrontal</li>
                    <li>• Mejora neuroplasticidad</li>
                    <li>• Reduce actividad de amígdala</li>
                    <li>• Aumenta GABA y serotonina</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Beneficios Medibles
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• 30% menos burnout</li>
                    <li>• Mejor toma de decisiones</li>
                    <li>• Mayor autocontrol</li>
                    <li>• Incremento en bienestar</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Factores que Debilitan
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Estrés crónico</li>
                    <li>• Relaciones tóxicas</li>
                    <li>• Falta de descanso</li>
                    <li>• Mala alimentación</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengthening Exercises */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                Ejercicios de Fortalecimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {emotionalExercises.filter(ex => ex.category === 'strengthening').map((exercise) => (
                  <Card key={exercise.id} className="border-pink-200">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <Badge variant={exercise.difficulty === 'easy' ? 'secondary' : exercise.difficulty === 'moderate' ? 'default' : 'destructive'}>
                          {exercise.difficulty === 'easy' ? 'Fácil' : exercise.difficulty === 'moderate' ? 'Moderado' : 'Difícil'}
                        </Badge>
                      </div>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="w-4 h-4" />
                        <span>{exercise.duration}</span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Instrucciones:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {exercise.instructions.slice(0, 3).map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                          {exercise.instructions.length > 3 && (
                            <li className="text-muted-foreground">... y {exercise.instructions.length - 3} pasos más</li>
                          )}
                        </ol>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Beneficios:</h4>
                        <ul className="space-y-1">
                          {exercise.benefits.slice(0, 2).map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full" disabled={features.emotionalHealthRestricted}>
                        <Play className="w-4 h-4 mr-2" />
                        {features.emotionalHealthRestricted ? 'Requiere Premium' : 'Comenzar Ejercicio'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emotional Diary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Diario Emocional Guiado
              </CardTitle>
              <CardDescription>
                Plantillas para reflexión emocional y crecimiento personal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-muted">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold text-sm mb-2">Emociones del Día</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Registra qué sentiste y por qué
                    </p>
                    <Button size="sm" variant="outline" disabled={features.emotionalHealthRestricted}>
                      Abrir Plantilla
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-muted">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold text-sm mb-2">Desafíos Superados</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Celebra tu fortaleza emocional
                    </p>
                    <Button size="sm" variant="outline" disabled={features.emotionalHealthRestricted}>
                      Abrir Plantilla
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-muted">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold text-sm mb-2">Gratitud Profunda</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Desarrolla perspectiva positiva
                    </p>
                    <Button size="sm" variant="outline" disabled={features.emotionalHealthRestricted}>
                      Abrir Plantilla
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Benefits for Other Health Areas */}
      <Card className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Beneficios para Otros Tipos de Salud
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Salud Mental
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Reduce ansiedad y depresión</li>
              <li>• Mejora concentración</li>
              <li>• Aumenta claridad mental</li>
              <li>• Fortalece memoria emocional</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Salud Física
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Reduce cortisol y estrés</li>
              <li>• Mejora sistema inmune</li>
              <li>• Disminuye tensión muscular</li>
              <li>• Regula presión arterial</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Salud Social
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Mejora comunicación</li>
              <li>• Aumenta empatía</li>
              <li>• Fortalece relaciones</li>
              <li>• Reduce conflictos</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComprehensiveEmotionalHealth

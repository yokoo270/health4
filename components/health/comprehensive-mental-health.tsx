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
  Brain, 
  Heart, 
  Shield, 
  Moon,
  BookOpen,
  Timer,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Circle,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Cigarette,
  Lock,
  Unlock,
  Calendar,
  Clock,
  Headphones,
  Mic,
  Star,
  Zap,
  Sparkles
} from 'lucide-react'

interface MeditationSession {
  id: string
  name: string
  type: 'mindfulness' | 'zen' | 'vipassana'
  duration: number // in minutes
  description: string
  benefits: string[]
  instructions: string[]
}

interface BreathingExercise {
  id: string
  name: string
  pattern: string
  description: string
  duration: number
  instructions: string[]
  benefits: string[]
}

interface YogaSession {
  id: string
  name: string
  objective: string
  duration: string
  exercises: YogaPose[]
  benefits: string[]
}

interface YogaPose {
  name: string
  duration: string
  instructions: string[]
  benefits: string[]
}

interface Addiction {
  id: string
  name: string
  description: string
  effects: string[]
  causes: string[]
  recoveryTips: string[]
  keyMessages: string[]
}

interface SleepTip {
  id: string
  name: string
  description: string
  impactLevel: number // 1-5
  category: 'hygiene' | 'environment' | 'habits' | 'avoid'
}

const ComprehensiveMentalHealth = () => {
  const [activeSection, setActiveSection] = useState('meditation')
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationSession | null>(null)
  const [selectedYoga, setSelectedYoga] = useState<YogaSession | null>(null)
  const [meditationTimer, setMeditationTimer] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [journalEntry, setJournalEntry] = useState('')
  const [journalPassword, setJournalPassword] = useState('')
  const [isJournalLocked, setIsJournalLocked] = useState(true)

  // Meditation sessions
  const meditationSessions: MeditationSession[] = [
    {
      id: 'mindfulness-basic',
      name: 'Mindfulness Básico',
      type: 'mindfulness',
      duration: 10,
      description: 'Atención plena al momento presente para reducir ansiedad y aumentar concentración',
      benefits: [
        'Reduce ansiedad y estrés',
        'Mejora concentración',
        'Aumenta autoconciencia',
        'Mejora regulación emocional'
      ],
      instructions: [
        'Siéntate cómodamente con la espalda recta',
        'Cierra los ojos suavemente',
        'Concéntrate en tu respiración natural',
        'Cuando tu mente divague, vuelve suavemente a la respiración',
        'No juzgues tus pensamientos, simplemente obsérvalos',
        'Mantén esta práctica durante el tiempo establecido'
      ]
    },
    {
      id: 'zen-sitting',
      name: 'Zazen (Zen Sentado)',
      type: 'zen',
      duration: 15,
      description: 'Práctica zen de silencio y atención en la experiencia presente',
      benefits: [
        'Claridad mental profunda',
        'Calma interior',
        'Mejora postura',
        'Desarrolla paciencia'
      ],
      instructions: [
        'Adopta la postura de loto o medio loto',
        'Mantén la columna recta como una montaña',
        'Coloca las manos en mudra cósmico',
        'Respira naturalmente por la nariz',
        'Simplemente siéntate, sin hacer nada más',
        'Cuando surjan pensamientos, déjalos pasar como nubes'
      ]
    },
    {
      id: 'vipassana-insight',
      name: 'Vipassana (Visión Clara)',
      type: 'vipassana',
      duration: 20,
      description: 'Observación de sensaciones corporales para autocomprensión profunda',
      benefits: [
        'Autocomprensión profunda',
        'Regulación emocional',
        'Aceptación del cambio',
        'Reducción del sufrimiento'
      ],
      instructions: [
        'Siéntate en posición cómoda y estable',
        'Comienza observando la respiración en las fosas nasales',
        'Escanea lentamente todo tu cuerpo',
        'Observa sensaciones sin reaccionar',
        'Acepta tanto sensaciones agradables como desagradables',
        'Mantén ecuanimidad ante todas las experiencias'
      ]
    }
  ]

  // Breathing exercises
  const breathingExercises: BreathingExercise[] = [
    {
      id: 'equal-breathing',
      name: 'Respiración Equitativa',
      pattern: '4-4',
      description: 'Inhala y exhala durante la misma duración para equilibrar el sistema nervioso',
      duration: 5,
      instructions: [
        'Inhala durante 4 cuentas',
        'Exhala durante 4 cuentas',
        'Mantén un ritmo constante',
        'Repite el ciclo'
      ],
      benefits: ['Equilibra sistema nervioso', 'Reduce ansiedad', 'Mejora concentración']
    },
    {
      id: 'box-breathing',
      name: 'Respiración del Cuadrilátero',
      pattern: '4-4-4-4',
      description: 'Técnica utilizada por militares y atletas para mantener la calma bajo presión',
      duration: 6,
      instructions: [
        'Inhala durante 4 cuentas',
        'Mantén el aire durante 4 cuentas',
        'Exhala durante 4 cuentas',
        'Mantén vacío durante 4 cuentas'
      ],
      benefits: ['Calma instantánea', 'Mejor control emocional', 'Reducción de estrés agudo']
    },
    {
      id: '4-7-8-breathing',
      name: 'Respiraci��n 4-7-8',
      pattern: '4-7-8',
      description: 'Potente técnica para inducir relajación y facilitar el sueño',
      duration: 4,
      instructions: [
        'Inhala por la nariz durante 4 cuentas',
        'Mantén la respiración durante 7 cuentas',
        'Exhala por la boca durante 8 cuentas',
        'Haz un sonido "whoosh" al exhalar'
      ],
      benefits: ['Induce sueño rápido', 'Calma profunda', 'Reduce ansiedad severa']
    }
  ]

  // Yoga sessions
  const yogaSessions: YogaSession[] = [
    {
      id: 'morning-energy',
      name: 'Energía Matutina',
      objective: 'Activar el cuerpo, mejorar la circulación y empezar el día con energía',
      duration: '20-25 min',
      exercises: [
        {
          name: 'Respiración profunda (Pranayama)',
          duration: '2 min',
          instructions: [
            'Siéntate cómodamente con la espalda recta',
            'Inhala profundamente por la nariz',
            'Exhala lentamente por la boca',
            'Siente cómo se oxigena todo tu cuerpo'
          ],
          benefits: ['Oxigena el cuerpo', 'Despierta la mente', 'Activa el sistema nervioso']
        },
        {
          name: 'Saludo al Sol (Surya Namaskar)',
          duration: '3 rondas',
          instructions: [
            'Comienza en posición de montaña',
            'Eleva los brazos hacia el cielo',
            'Inclínate hacia adelante',
            'Salta hacia atrás en plancha',
            'Baja a chaturanga',
            'Perro boca arriba',
            'Perro boca abajo',
            'Salta hacia adelante',
            'Vuelve a la posición inicial'
          ],
          benefits: ['Calienta músculos', 'Activa circulación', 'Energiza todo el cuerpo']
        },
        {
          name: 'Postura del Guerrero I',
          duration: '30s por lado',
          instructions: [
            'Da un paso largo hacia atrás',
            'Flexiona la rodilla delantera',
            'Eleva los brazos hacia el cielo',
            'Mantén la mirada al frente'
          ],
          benefits: ['Fortalece piernas', 'Mejora equilibrio', 'Aumenta resistencia']
        }
      ],
      benefits: ['Energía natural', 'Mejor circulación', 'Claridad mental', 'Fuerza y flexibilidad']
    },
    {
      id: 'stress-relief',
      name: 'Alivio del Estrés y Ansiedad',
      objective: 'Calmar la mente, mejorar la respiración y disminuir tensión mental',
      duration: '25 min',
      exercises: [
        {
          name: 'Respiración Alterna (Nadi Shodhana)',
          duration: '3 min',
          instructions: [
            'Bloquea la fosa nasal derecha con el pulgar',
            'Inhala por la fosa nasal izquierda',
            'Cambia y bloquea la fosa izquierda',
            'Exhala por la fosa derecha',
            'Repite alternando'
          ],
          benefits: ['Equilibra sistema nervioso', 'Reduce ansiedad', 'Mejora concentración']
        },
        {
          name: 'Postura del Niño (Balasana)',
          duration: '2 min',
          instructions: [
            'Arrodíllate en el suelo',
            'Siéntate sobre los talones',
            'Inclínate hacia adelante',
            'Extiende los brazos o déjalos a los lados'
          ],
          benefits: ['Sensación de seguridad', 'Calma la mente', 'Relaja la espalda']
        },
        {
          name: 'Piernas en la pared (Viparita Karani)',
          duration: '5 min',
          instructions: [
            'Acuéstate cerca de una pared',
            'Extiende las piernas hacia arriba en la pared',
            'Relaja los brazos a los lados',
            'Respira profundamente'
          ],
          benefits: ['Mejora retorno venoso', 'Calma sistema nervioso', 'Reduce fatiga']
        }
      ],
      benefits: ['Reducción de estrés', 'Calma mental', 'Mejor sueño', 'Equilibrio emocional']
    },
    {
      id: 'better-sleep',
      name: 'Yoga para Dormir Mejor',
      objective: 'Relajar el cuerpo y la mente antes de dormir',
      duration: '20 min',
      exercises: [
        {
          name: 'Respiración 4-7-8',
          duration: '2 min',
          instructions: [
            'Inhala por la nariz durante 4 cuentas',
            'Mantén durante 7 cuentas',
            'Exhala por la boca durante 8 cuentas',
            'Repite el ciclo'
          ],
          benefits: ['Induce relajación profunda', 'Prepara para el sueño']
        },
        {
          name: 'Mariposa tumbada (Supta Baddha Konasana)',
          duration: '2 min',
          instructions: [
            'Acuéstate boca arriba',
            'Junta las plantas de los pies',
            'Deja que las rodillas caigan hacia los lados',
            'Relaja completamente'
          ],
          benefits: ['Relaja caderas', 'Calma el sistema nervioso']
        },
        {
          name: 'Savasana con respiración lenta',
          duration: '5-7 min',
          instructions: [
            'Acuéstate boca arriba',
            'Separa ligeramente brazos y piernas',
            'Respira lenta y profundamente',
            'Relaja cada parte del cuerpo'
          ],
          benefits: ['Relajación total', 'Preparación para el sueño']
        }
      ],
      benefits: ['Mejor calidad del sueño', 'Relajación profunda', 'Reducción de insomnio']
    }
  ]

  // Addictions information
  const addictions: Addiction[] = [
    {
      id: 'pornography',
      name: 'Pornografía',
      description: 'Consumo compulsivo de contenido pornográfico que interfiere con la vida diaria',
      effects: [
        'Distorsión de expectativas sexuales',
        'Dificultades en relaciones íntimas',
        'Reducción de dopamina natural',
        'Problemas de concentración',
        'Ansiedad social'
      ],
      causes: [
        'Acceso fácil a internet',
        'Estrés y ansiedad',
        'Curiosidad natural mal dirigida',
        'Soledad y aislamiento',
        'Falta de educación sexual saludable'
      ],
      recoveryTips: [
        'Instala bloqueadores de contenido',
        'Busca actividades alternativas',
        'Ejercicio físico regular',
        'Terapia psicológica',
        'Grupos de apoyo',
        'Meditación y mindfulness'
      ],
      keyMessages: [
        'La recuperación es posible',
        'No estás solo en esto',
        'Buscar ayuda es una muestra de fortaleza',
        'Los recaídas son parte del proceso'
      ]
    },
    {
      id: 'social-media',
      name: 'Redes Sociales',
      description: 'Uso excesivo y compulsivo de plataformas sociales',
      effects: [
        'FOMO (miedo a perderse algo)',
        'Comparación social constante',
        'Reducción de atención',
        'Problemas de sueño',
        'Ansiedad y depresión'
      ],
      causes: [
        'Diseño adictivo de las apps',
        'Necesidad de validación social',
        'Aburrimiento',
        'Hábitos automáticos',
        'Escape de problemas reales'
      ],
      recoveryTips: [
        'Desactiva notificaciones',
        'Establece horarios específicos',
        'Usa apps de control de tiempo',
        'Encuentra hobbies offline',
        'Practica mindfulness',
        'Crea zonas libres de teléfono'
      ],
      keyMessages: [
        'La vida real es más importante que la virtual',
        'Tu valor no depende de likes',
        'Controla tu tiempo, no dejes que te controle',
        'Las redes son herramientas, no entretenimiento'
      ]
    },
    {
      id: 'video-games',
      name: 'Videojuegos',
      description: 'Juego excesivo que interfiere con responsabilidades y relaciones',
      effects: [
        'Aislamiento social',
        'Problemas académicos/laborales',
        'Trastornos del sueño',
        'Problemas de postura',
        'Irritabilidad cuando no se juega'
      ],
      causes: [
        'Escape de la realidad',
        'Sensación de logro virtual',
        'Conexión social online',
        'Aburrimiento',
        'Depresión subyacente'
      ],
      recoveryTips: [
        'Establece límites de tiempo estrictos',
        'Busca actividades físicas',
        'Desarrolla habilidades reales',
        'Socializa cara a cara',
        'Busca ayuda profesional si es necesario',
        'Encuentra otros hobbies creativos'
      ],
      keyMessages: [
        'Los logros reales son más satisfactorios',
        'El mundo virtual no reemplaza la vida real',
        'Puedes usar tu pasión por los juegos productivamente',
        'La moderación es clave'
      ]
    }
  ]

  // Sleep tips
  const sleepTips: SleepTip[] = [
    {
      id: 'consistent-schedule',
      name: 'Horario consistente',
      description: 'Acuéstate y levántate a la misma hora todos los días',
      impactLevel: 5,
      category: 'hygiene'
    },
    {
      id: 'avoid-screens',
      name: 'Evita pantallas antes de dormir',
      description: 'No uses dispositivos electrónicos 1-2 horas antes de acostarte',
      impactLevel: 4,
      category: 'avoid'
    },
    {
      id: 'dark-environment',
      name: 'Ambiente oscuro',
      description: 'Mantén tu habitación lo más oscura posible',
      impactLevel: 4,
      category: 'environment'
    },
    {
      id: 'cool-temperature',
      name: 'Temperatura fresca',
      description: 'Mantén la habitación entre 16-19°C',
      impactLevel: 3,
      category: 'environment'
    },
    {
      id: 'no-caffeine',
      name: 'Sin cafeína tarde',
      description: 'Evita cafeína 6 horas antes de dormir',
      impactLevel: 4,
      category: 'avoid'
    }
  ]

  // Relaxing sounds
  const relaxingSounds = [
    { id: 'birds', name: 'Sonido de pájaros cantando', category: 'nature' },
    { id: 'waves', name: 'Sonido de olas rompiendo', category: 'nature' },
    { id: 'rain', name: 'Sonido de lluvia', category: 'nature' },
    { id: 'river', name: 'Sonido de río fluyendo', category: 'nature' },
    { id: 'waterfall', name: 'Paisaje con cascada', category: 'nature' },
    { id: 'white-noise', name: 'Ruido blanco', category: 'ambient' },
    { id: 'pink-noise', name: 'Ruido rosa', category: 'ambient' }
  ]

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isTimerActive && meditationTimer > 0) {
      interval = setInterval(() => {
        setMeditationTimer(timer => timer - 1)
      }, 1000)
    } else if (meditationTimer === 0) {
      setIsTimerActive(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerActive, meditationTimer])

  const startMeditation = (duration: number) => {
    setMeditationTimer(duration * 60)
    setIsTimerActive(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          🧠 Salud Mental Integral
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fortalece tu mente con técnicas científicas de meditación, relajación y bienestar mental
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="meditation" className="flex items-center gap-2">
            <Circle className="w-4 h-4" />
            Meditación
          </TabsTrigger>
          <TabsTrigger value="breathing" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Respiración
          </TabsTrigger>
          <TabsTrigger value="yoga" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Yoga
          </TabsTrigger>
          <TabsTrigger value="addictions" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Adicciones
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            Sueño
          </TabsTrigger>
        </TabsList>

        {/* Meditation Section */}
        <TabsContent value="meditation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className="w-5 h-5 text-purple-600" />
                Meditación y Relajación
              </CardTitle>
              <CardDescription>
                Encuentra tu equilibrio interior con sesiones guiadas de meditación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Timer Display */}
              {isTimerActive && (
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-mono font-bold text-purple-700 dark:text-purple-300 mb-4">
                      {formatTime(meditationTimer)}
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsTimerActive(!isTimerActive)}
                      >
                        {isTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsTimerActive(false)
                          setMeditationTimer(0)
                        }}
                      >
                        Detener
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Meditation Sessions */}
              <div className="grid md:grid-cols-3 gap-4">
                {meditationSessions.map((session) => (
                  <Card key={session.id} className="border-purple-200 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{session.name}</CardTitle>
                        <Badge variant={session.type === 'mindfulness' ? 'default' : session.type === 'zen' ? 'secondary' : 'outline'}>
                          {session.type}
                        </Badge>
                      </div>
                      <CardDescription>{session.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="w-4 h-4" />
                        <span>{session.duration} minutos</span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Beneficios:</h4>
                        <ul className="space-y-1">
                          {session.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => startMeditation(session.duration)}
                          disabled={isTimerActive}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Empezar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMeditation(session)}
                        >
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Educational Content */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    ¿Qué es la Meditación?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    La meditación es una práctica milenaria que entrena la mente para enfocarse y redirigir pensamientos. 
                    Está científicamente comprobado que reduce el estrés, mejora la concentración y promueve el bienestar emocional.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Beneficios Científicos
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Reduce cortisol (estrés)</li>
                        <li>• Aumenta GABA (calma)</li>
                        <li>• Mejora neuroplasticidad</li>
                        <li>• Fortalece sistema inmune</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Salud Mental
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Reduce ansiedad</li>
                        <li>• Mejora estado de ánimo</li>
                        <li>• Aumenta autoconciencia</li>
                        <li>• Desarrolla compasión</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Rendimiento
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Mejora concentración</li>
                        <li>• Aumenta creatividad</li>
                        <li>• Mejor toma de decisiones</li>
                        <li>• Resistencia al estrés</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sound Library */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-blue-500" />
                    Biblioteca de Sonidos Relajantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {relaxingSounds.map((sound) => (
                      <Card key={sound.id} className="border-muted">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{sound.name}</span>
                            <Button size="sm" variant="ghost">
                              <Play className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Breathing Section */}
        <TabsContent value="breathing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Ejercicios de Respiración
              </CardTitle>
              <CardDescription>
                Técnicas de respiración para calmar la mente y equilibrar el sistema nervioso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {breathingExercises.map((exercise) => (
                  <Card key={exercise.id} className="border-red-200 hover:shadow-lg transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg">{exercise.name}</CardTitle>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {exercise.pattern}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Patrón de respiración
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Instrucciones:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {exercise.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Beneficios:</h4>
                        <ul className="space-y-1">
                          {exercise.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => startMeditation(exercise.duration)}
                      >
                        <Timer className="w-4 h-4 mr-2" />
                        Empezar ({exercise.duration} min)
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Yoga Section */}
        <TabsContent value="yoga" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                Sesiones de Yoga
              </CardTitle>
              <CardDescription>
                Secuencias de yoga diseñadas para diferentes momentos del día y objetivos específicos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {yogaSessions.map((session) => (
                  <Card key={session.id} className="border-pink-200 hover:shadow-lg transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg">{session.name}</CardTitle>
                      <CardDescription>{session.objective}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{session.duration}</span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Ejercicios incluidos:</h4>
                        <ul className="space-y-1 text-sm">
                          {session.exercises.slice(0, 3).map((exercise, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Star className="w-3 h-3 text-yellow-500" />
                              {exercise.name}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Beneficios:</h4>
                        <div className="flex flex-wrap gap-1">
                          {session.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => setSelectedYoga(session)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Ver Secuencia Completa
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addictions Section */}
        <TabsContent value="addictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Manejo de Adicciones
              </CardTitle>
              <CardDescription>
                Información y herramientas para superar adicciones comunes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                {addictions.map((addiction) => (
                  <Card key={addiction.id} className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Cigarette className="w-5 h-5 text-orange-500" />
                        {addiction.name}
                      </CardTitle>
                      <CardDescription>{addiction.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-red-600">Efectos Negativos</h4>
                          <ul className="space-y-1 text-sm">
                            {addiction.effects.map((effect, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <AlertCircle className="w-3 h-3 text-red-500" />
                                {effect}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-yellow-600">Principales Causas</h4>
                          <ul className="space-y-1 text-sm">
                            {addiction.causes.map((cause, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Target className="w-3 h-3 text-yellow-500" />
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-green-600">Tips de Recuperación</h4>
                          <ul className="space-y-1 text-sm">
                            {addiction.recoveryTips.map((tip, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-blue-600">Mensajes Clave</h4>
                          <ul className="space-y-1 text-sm">
                            {addiction.keyMessages.map((message, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Heart className="w-3 h-3 text-blue-500" />
                                {message}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Registro Diario de Progreso</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Lleva un registro de tus impulsos vs veces que resistes para ver tu progreso
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-500">0</div>
                              <div className="text-xs text-muted-foreground">Impulsos hoy</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-500">0</div>
                              <div className="text-xs text-muted-foreground">Resistencias hoy</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sleep Section */}
        <TabsContent value="sleep" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-blue-600" />
                Optimización del Sueño
              </CardTitle>
              <CardDescription>
                Mejora la calidad de tu sueño con técnicas científicamente comprobadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sleep Importance */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardHeader>
                  <CardTitle>¿Por qué es tan importante el sueño?</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Salud Mental
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Consolida memoria</li>
                      <li>• Procesa emociones</li>
                      <li>• Reduce estrés y ansiedad</li>
                      <li>• Mejora estado de ánimo</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Salud Física
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Repara tejidos</li>
                      <li>• Fortalece sistema inmune</li>
                      <li>• Regula hormonas</li>
                      <li>• Controla peso</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Rendimiento
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Mejora concentración</li>
                      <li>• Aumenta creatividad</li>
                      <li>• Mejor toma de decisiones</li>
                      <li>• Reduce errores</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Sleep Tips */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hábitos para Mejor Sueño</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {sleepTips.filter(tip => tip.category === 'hygiene' || tip.category === 'habits').map((tip) => (
                      <div key={tip.id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 inline ${i < tip.impactLevel ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{tip.name}</h4>
                          <p className="text-xs text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cosas a Evitar</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {sleepTips.filter(tip => tip.category === 'avoid').map((tip) => (
                      <div key={tip.id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <AlertCircle
                              key={i}
                              className={`w-3 h-3 inline ${i < tip.impactLevel ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{tip.name}</h4>
                          <p className="text-xs text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sleep Sounds */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="w-5 h-5" />
                    Sonidos para Dormir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      'Ambient Sleep Music',
                      'Calm Mind – Kevin MacLeod',
                      'Sleepy Fish – Music For Dreaming',
                      'Dreaming – Kevin MacLeod',
                      'Soft Piano Music',
                      'Weightless (versión libre)'
                    ].map((music, index) => (
                      <Card key={index} className="border-muted">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{music}</span>
                            <Button size="sm" variant="ghost">
                              <Play className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Journaling Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            Journaling Digital
          </CardTitle>
          <CardDescription>
            Espacio seguro para reflexión personal y crecimiento emocional
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isJournalLocked ? (
            <div className="text-center space-y-4">
              <Lock className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Tu diario está protegido</p>
              <div className="flex gap-2 justify-center">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={journalPassword}
                  onChange={(e) => setJournalPassword(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (journalPassword) {
                      setIsJournalLocked(false)
                    }
                  }}
                >
                  <Unlock className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Entrada de hoy</h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsJournalLocked(true)}
                >
                  <Lock className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                placeholder="Escribe tus pensamientos, emociones y reflexiones del día..."
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                rows={6}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{journalEntry.length} caracteres</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <Button>Guardar Entrada</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Meditation Detail Modal */}
      <Dialog open={!!selectedMeditation} onOpenChange={() => setSelectedMeditation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMeditation?.name}</DialogTitle>
          </DialogHeader>
          {selectedMeditation && (
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedMeditation.description}</p>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Instrucciones paso a paso:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {selectedMeditation.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Beneficios completos:</h4>
                <ul className="space-y-1">
                  {selectedMeditation.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  startMeditation(selectedMeditation.duration)
                  setSelectedMeditation(null)
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Empezar Meditación ({selectedMeditation.duration} min)
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Yoga Detail Modal */}
      <Dialog open={!!selectedYoga} onOpenChange={() => setSelectedYoga(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedYoga?.name}</DialogTitle>
          </DialogHeader>
          {selectedYoga && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-semibold">Objetivo:</h4>
                <p className="text-muted-foreground">{selectedYoga.objective}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Secuencia completa ({selectedYoga.duration}):</h4>
                {selectedYoga.exercises.map((exercise, index) => (
                  <Card key={index} className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        {exercise.name}
                        <Badge variant="outline">{exercise.duration}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-sm">Instrucciones:</h5>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {exercise.instructions.map((instruction, i) => (
                            <li key={i}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-semibold text-sm">Beneficios:</h5>
                        <ul className="space-y-1">
                          {exercise.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <Star className="w-3 h-3 text-yellow-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ComprehensiveMentalHealth

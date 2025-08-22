"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Dumbbell, 
  Activity, 
  Trophy, 
  Apple, 
  Target, 
  TrendingUp, 
  Heart, 
  Zap,
  Clock,
  Users,
  BookOpen,
  Play,
  Info,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Star,
  Timer
} from 'lucide-react'

// Types for workout routines
interface WorkoutRoutine {
  id: string
  name: string
  description: string
  type: 'strength' | 'cardio' | 'sport'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  frequency: string
  equipment: string[]
  exercises: Exercise[]
  benefits: string[]
  objectives: string[]
}

interface Exercise {
  name: string
  sets?: number | string
  reps?: string
  duration?: string
  rest?: string
  instructions: string[]
  variations: string[]
  muscles: string[]
}

interface Sport {
  id: string
  name: string
  category: 'team' | 'individual' | 'combat'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  equipment: string[]
  benefits: string[]
  techniques: Technique[]
  tactics: string[]
}

interface Technique {
  name: string
  position?: string
  description: string
  instructions: string[]
  tips: string[]
}

const ComprehensivePhysicalHealth = () => {
  const [activeSection, setActiveSection] = useState('strength')
  const [selectedRoutine, setSelectedRoutine] = useState<WorkoutRoutine | null>(null)
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null)

  // Strength Training Routines
  const strengthRoutines: WorkoutRoutine[] = [
    {
      id: 'ppl',
      name: 'Push-Pull-Leg (PPL)',
      description: 'Rutina dividida en tres tipos de movimientos para máximo desarrollo muscular',
      type: 'strength',
      level: 'intermediate',
      duration: '60-90 min',
      frequency: '6 días/semana (2 ciclos)',
      equipment: ['Barras', 'Mancuernas', 'Máquinas'],
      exercises: [
        {
          name: 'Press de Banca',
          sets: 4,
          reps: '6-8',
          rest: '3 min',
          instructions: [
            'Acuéstate en el banco con los pies firmemente en el suelo',
            'Agarra la barra con un agarre ligeramente más ancho que los hombros',
            'Baja la barra hasta tocar el pecho controladamente',
            'Empuja la barra hacia arriba explosivamente'
          ],
          variations: ['Inclinado', 'Declinado', 'Con mancuernas'],
          muscles: ['Pectorales', 'Tríceps', 'Deltoides anterior']
        },
        {
          name: 'Peso Muerto',
          sets: 4,
          reps: '5-6',
          rest: '4 min',
          instructions: [
            'Colócate frente a la barra con pies a ancho de cadera',
            'Agáchate manteniendo la espalda recta',
            'Agarra la barra con agarre mixto o doble',
            'Levanta la barra extendiendo cadera y rodillas simultáneamente'
          ],
          variations: ['Rumano', 'Sumo', 'Con mancuernas'],
          muscles: ['Glúteos', 'Isquiotibiales', 'Erectores espinales', 'Trapecios']
        },
        {
          name: 'Sentadilla',
          sets: 4,
          reps: '8-10',
          rest: '3 min',
          instructions: [
            'Coloca la barra sobre los trapecios superiores',
            'Pies ligeramente más anchos que los hombros',
            'Desciende flexionando caderas y rodillas',
            'Baja hasta que los muslos estén paralelos al suelo'
          ],
          variations: ['Frontal', 'Búlgara', 'Goblet'],
          muscles: ['Cuádriceps', 'Glúteos', 'Core', 'Pantorrillas']
        }
      ],
      benefits: [
        'Desarrollo muscular equilibrado',
        'Mayor frecuencia de entrenamiento por grupo muscular',
        'Flexibilidad en la programación',
        'Ideal para hipertrofia'
      ],
      objectives: ['Hipertrofia', 'Fuerza', 'Definición muscular']
    },
    {
      id: 'upper-lower',
      name: 'Upper-Lower',
      description: 'División entre tren superior e inferior para equilibrio y recuperación',
      type: 'strength',
      level: 'beginner',
      duration: '45-75 min',
      frequency: '4 días/semana',
      equipment: ['Barras', 'Mancuernas', 'Poleas'],
      exercises: [
        {
          name: 'Remo con Barra',
          sets: 4,
          reps: '8-10',
          rest: '3 min',
          instructions: [
            'Inclínate hacia adelante manteniendo la espalda recta',
            'Agarra la barra con agarre prono',
            'Tira de la barra hacia el abdomen',
            'Aprieta los omóplatos al final del movimiento'
          ],
          variations: ['Con mancuernas', 'En máquina', 'T-Bar'],
          muscles: ['Dorsal ancho', 'Romboides', 'Bíceps', 'Deltoides posterior']
        }
      ],
      benefits: [
        'Ideal para principiantes',
        'Buena recuperación',
        'Equilibrio entre volumen e intensidad'
      ],
      objectives: ['Fuerza general', 'Aprendizaje técnico', 'Acondicionamiento']
    },
    {
      id: 'full-body',
      name: 'Full-Body',
      description: 'Entrenamiento completo en cada sesión para máxima eficiencia',
      type: 'strength',
      level: 'beginner',
      duration: '45-60 min',
      frequency: '3 días/semana',
      equipment: ['Básico: barras y mancuernas'],
      exercises: [
        {
          name: 'Thruster',
          sets: 3,
          reps: '10-12',
          rest: '2 min',
          instructions: [
            'Sostén mancuernas a la altura de los hombros',
            'Realiza una sentadilla completa',
            'Al subir, empuja las mancuernas por encima de la cabeza',
            'Baja las mancuernas controladamente'
          ],
          variations: ['Con barra', 'Kettlebell', 'Una mano'],
          muscles: ['Cuerpo completo', 'Core', 'Estabilizadores']
        }
      ],
      benefits: [
        'Eficiencia temporal',
        'Quema calórica alta',
        'Funcionalidad',
        'Ideal para principiantes'
      ],
      objectives: ['Condición física general', 'Pérdida de peso', 'Funcionalidad']
    }
  ]

  // Sports data
  const sports: Sport[] = [
    {
      id: 'football',
      name: 'Fútbol',
      category: 'team',
      difficulty: 'beginner',
      equipment: ['Balón', 'Conos', 'Porterías'],
      benefits: [
        'Mejora la coordinación',
        'Desarrolla resistencia cardiovascular',
        'Fortalece músculos de piernas',
        'Fomenta el trabajo en equipo'
      ],
      techniques: [
        {
          name: 'Control de balón',
          description: 'Técnica fundamental para recibir y dominar el balón',
          instructions: [
            'Mantén la vista en el balón',
            'Utiliza la parte interna del pie',
            'Amortigua el impacto flexionando la rodilla',
            'Prepara el siguiente toque inmediatamente'
          ],
          tips: [
            'Practica con ambos pies',
            'Varía las superficies de contacto',
            'Trabaja bajo presión'
          ]
        },
        {
          name: 'Pase corto',
          description: 'Base del juego asociativo y construcción de jugadas',
          instructions: [
            'Planta el pie de apoyo firmemente',
            'Golpea con la parte interna del pie',
            'Sigue el movimiento hacia el objetivo',
            'Mantén la cabeza erguida'
          ],
          tips: [
            'Precision antes que potencia',
            'Comunícate con tu compañero',
            'Varía la intensidad según la distancia'
          ]
        },
        {
          name: 'Disparo a portería',
          position: 'Delantero',
          description: 'Técnica de finalización para convertir goles',
          instructions: [
            'Evalúa la posición del portero',
            'Planta el pie de apoyo cerca del balón',
            'Golpea con el empeine o interior según el ángulo',
            'Mantén el cuerpo sobre el balón'
          ],
          tips: [
            'La colocación supera a la potencia',
            'Practica desde diferentes ángulos',
            'Mantén la calma bajo presión'
          ]
        }
      ],
      tactics: [
        'Presión alta para recuperar el balón',
        'Juego de posición y triangulaciones',
        'Contraataques rápidos',
        'Defensa en bloque y marcaje'
      ]
    },
    {
      id: 'basketball',
      name: 'Baloncesto',
      category: 'team',
      difficulty: 'intermediate',
      equipment: ['Balón', 'Canasta', 'Conos'],
      benefits: [
        'Desarrolla agilidad y coordinación',
        'Mejora la toma de decisiones rápidas',
        'Fortalece salto y explosividad',
        'Fomenta la estrategia de equipo'
      ],
      techniques: [
        {
          name: 'Dribbling',
          description: 'Control del balón en movimiento',
          instructions: [
            'Mantén la cabeza erguida',
            'Usa las yemas de los dedos, no la palma',
            'Protege el balón con el cuerpo',
            'Varía la altura y velocidad del bote'
          ],
          tips: [
            'Practica con ambas manos',
            'Trabaja en espacios reducidos',
            'Combina cambios de ritmo'
          ]
        },
        {
          name: 'Tiro libre',
          description: 'Lanzamiento sin oposición desde la línea de tiros libres',
          instructions: [
            'Colócate perpendicular a la canasta',
            'Flexiona ligeramente las rodillas',
            'Alinea el codo con la canasta',
            'Suelta con un movimiento fluido de muñeca'
          ],
          tips: [
            'Desarrolla una rutina consistente',
            'Concéntrate en el arco de tiro',
            'Practica bajo presión mental'
          ]
        }
      ],
      tactics: [
        'Pick and roll para crear ventajas',
        'Defensa individual vs zona',
        'Transiciones rápidas',
        'Espaciado ofensivo'
      ]
    }
  ]

  // Cardio types
  const cardioTypes = [
    {
      name: 'HIIT (High Intensity Interval Training)',
      description: 'Intervalos de alta intensidad alternados con períodos de recuperación',
      benefits: ['Quema grasa eficiente', 'Mejora VO2 máx', 'Ahorro de tiempo'],
      example: '30s sprint + 60s caminata x 15 rondas'
    },
    {
      name: 'Cardio en Estado Estable',
      description: 'Ejercicio aeróbico a intensidad moderada y constante',
      benefits: ['Quema grasa sostenida', 'Mejora resistencia', 'Bajo impacto'],
      example: '45-60 min trote suave al 60-70% FCM'
    },
    {
      name: 'Fartlek',
      description: 'Entrenamiento sueco que combina diferentes intensidades',
      benefits: ['Mejora adaptabilidad', 'Divertido', 'Simula competición'],
      example: 'Correr variando intensidades según sensaciones'
    }
  ]

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          💪 Salud Física Integral
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Desarrolla tu potencial físico con entrenamientos científicos, deportes emocionantes y nutrición inteligente
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="strength" className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            Entrenamiento de Fuerza
          </TabsTrigger>
          <TabsTrigger value="cardio" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Cardiovascular
          </TabsTrigger>
          <TabsTrigger value="sports" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Deportes
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Apple className="w-4 h-4" />
            Nutrición
          </TabsTrigger>
        </TabsList>

        {/* Strength Training Section */}
        <TabsContent value="strength" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary" />
                Rutinas de Entrenamiento de Fuerza
              </CardTitle>
              <CardDescription>
                Rutinas científicamente diseñadas para desarrollo muscular, fuerza y resistencia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {strengthRoutines.map((routine) => (
                  <Card key={routine.id} className="border-primary/20 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{routine.name}</CardTitle>
                        <Badge variant={routine.level === 'beginner' ? 'secondary' : routine.level === 'intermediate' ? 'default' : 'destructive'}>
                          {routine.level === 'beginner' ? 'Principiante' : routine.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                        </Badge>
                      </div>
                      <CardDescription>{routine.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{routine.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          <span>{routine.frequency}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Objetivos:</h4>
                        <div className="flex flex-wrap gap-1">
                          {routine.objectives.map((obj, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {obj}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => setSelectedRoutine(routine)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Ver Rutina Completa
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Benefits and Scientific Info */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Beneficios Multidimensionales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold">💪 Salud Física</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Aumento de masa muscular y fuerza</li>
                        <li>• Mejora de densidad ósea</li>
                        <li>• Reducción de grasa corporal</li>
                        <li>• Mejor postura y estabilidad</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">🧠 Salud Mental</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Reducción de ansiedad y depresión</li>
                        <li>• Aumento de autoestima</li>
                        <li>• Mejora del sueño</li>
                        <li>• Mayor resistencia al estrés</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">❤️ Salud Emocional</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Desarrollo de constancia y disciplina</li>
                        <li>• Aumento de resiliencia</li>
                        <li>• Mejor autorregulación emocional</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">👥 Salud Social</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Entrenar acompañado refuerza vínculos</li>
                        <li>• Comunidad fitness y apoyo mutuo</li>
                        <li>• Confianza en interacciones sociales</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/5 border-secondary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      Mitos vs Realidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">MITO: "Full-Body no sirve para hipertrofia"</p>
                          <p className="text-xs text-muted-foreground">Falso. Estudios muestran que el full-body puede ser igual de efectivo para principiantes.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">REALIDAD: "La progresión es clave"</p>
                          <p className="text-xs text-muted-foreground">El aumento gradual de peso, repeticiones o volumen es fundamental para el crecimiento.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">MITO: "Más ejercicios = mejores resultados"</p>
                          <p className="text-xs text-muted-foreground">Falso. La calidad y consistencia superan la cantidad de ejercicios.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cardio Section */}
        <TabsContent value="cardio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" />
                Entrenamiento Cardiovascular
              </CardTitle>
              <CardDescription>
                Mejora tu resistencia, salud cardíaca y quema de grasa con entrenamientos cardiovasculares efectivos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cardio Types */}
              <div className="grid md:grid-cols-3 gap-4">
                {cardioTypes.map((type, index) => (
                  <Card key={index} className="border-secondary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Beneficios:</h4>
                        <ul className="text-sm space-y-1">
                          {type.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium">Ejemplo:</p>
                        <p className="text-xs text-muted-foreground">{type.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Scientific Benefits */}
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Beneficios Científicamente Comprobados
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Beneficios Físicos
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Fortalece el músculo cardíaco
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Reduce la presión arterial
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Mejora la sensibilidad a la insulina
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Aumenta la capacidad pulmonar
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Beneficios Mentales y Emocionales
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Libera endorfinas (bienestar natural)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Reduce cortisol (hormona del estrés)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Mejora la función cognitiva
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Aumenta la neuroplasticidad
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sports Section */}
        <TabsContent value="sports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Deportes y Actividades
              </CardTitle>
              <CardDescription>
                Encuentra el deporte perfecto para ti y desarrolla habilidades específicas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {sports.map((sport) => (
                  <Card key={sport.id} className="border-yellow-500/20 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{sport.name}</CardTitle>
                        <Badge variant={sport.category === 'team' ? 'default' : 'secondary'}>
                          {sport.category === 'team' ? 'Equipo' : sport.category === 'individual' ? 'Individual' : 'Combate'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Beneficios:</h4>
                        <ul className="space-y-1">
                          {sport.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <Star className="w-3 h-3 text-yellow-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Técnicas principales:</h4>
                        <div className="text-sm text-muted-foreground">
                          {sport.techniques.slice(0, 2).map(t => t.name).join(', ')}
                          {sport.techniques.length > 2 && '...'}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => setSelectedSport(sport)}
                      >
                        <Info className="w-4 h-4 mr-2" />
                        Ver Técnicas y Tácticas
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nutrition Section */}
        <TabsContent value="nutrition" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-green-500" />
                Sistema de Nutrición Inteligente
              </CardTitle>
              <CardDescription>
                Alimentación científica para optimizar tu rendimiento y salud
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Escáner de Alimentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Escanea códigos de barras para obtener información nutricional instantánea
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Muy saludable</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Decente</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Poco saludable</span>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Abrir Escáner
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Análisis con IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Fotografía tus platos y obtén análisis nutricional automático
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• Estimación de macronutrientes</li>
                      <li>• Sugerencias personalizadas</li>
                      <li>• Seguimiento de objetivos</li>
                    </ul>
                    <Button className="w-full" size="sm" variant="outline">
                      Analizar Plato
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Buscador de Recetas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Encuentra recetas saludables basadas en tus ingredientes disponibles
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• Filtros por objetivos</li>
                      <li>• Restricciones dietéticas</li>
                      <li>• Tiempo de preparación</li>
                    </ul>
                    <Button className="w-full" size="sm" variant="outline">
                      Buscar Recetas
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Nutrition Education */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle>Fundamentos de Nutrición Deportiva</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Macronutrientes Esenciales</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Proteínas (músculo y recuperación)</span>
                        <span className="font-medium">1.6-2.2g/kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Carbohidratos (energía)</span>
                        <span className="font-medium">3-7g/kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Grasas (hormonas y vitaminas)</span>
                        <span className="font-medium">0.8-1.5g/kg</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Hidratación y Timing</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Pre-entreno: carbohidratos 1-2h antes</li>
                      <li>• Post-entreno: proteína + carbos en 30 min</li>
                      <li>• Hidratación: 35ml/kg peso corporal</li>
                      <li>• Electrolitos en entrenamientos largos</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Routine Detail Modal */}
      <Dialog open={!!selectedRoutine} onOpenChange={() => setSelectedRoutine(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5" />
              {selectedRoutine?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedRoutine && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Información General</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Duración:</strong> {selectedRoutine.duration}</p>
                    <p><strong>Frecuencia:</strong> {selectedRoutine.frequency}</p>
                    <p><strong>Nivel:</strong> {selectedRoutine.level}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Equipamiento</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedRoutine.equipment.map((item, index) => (
                      <Badge key={index} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Ejercicios Principales</h4>
                {selectedRoutine.exercises.map((exercise, index) => (
                  <Card key={index} className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">{exercise.name}</CardTitle>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{exercise.sets} series</span>
                        <span>{exercise.reps} repeticiones</span>
                        <span>Descanso: {exercise.rest}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-sm">Músculos trabajados:</h5>
                        <div className="flex flex-wrap gap-1">
                          {exercise.muscles.map((muscle, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{muscle}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-semibold text-sm">Instrucciones:</h5>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {exercise.instructions.map((instruction, i) => (
                            <li key={i}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-semibold text-sm">Variaciones:</h5>
                        <div className="flex flex-wrap gap-1">
                          {exercise.variations.map((variation, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{variation}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Sport Detail Modal */}
      <Dialog open={!!selectedSport} onOpenChange={() => setSelectedSport(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              {selectedSport?.name} - Técnicas y Tácticas
            </DialogTitle>
          </DialogHeader>
          {selectedSport && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Beneficios del {selectedSport.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedSport.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Equipamiento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedSport.equipment.map((item, index) => (
                        <Badge key={index} variant="outline">{item}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Técnicas Fundamentales</h4>
                {selectedSport.techniques.map((technique, index) => (
                  <Card key={index} className="border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        {technique.name}
                        {technique.position && (
                          <Badge variant="secondary">{technique.position}</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{technique.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-sm">Instrucciones paso a paso:</h5>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {technique.instructions.map((instruction, i) => (
                            <li key={i}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-semibold text-sm">Consejos importantes:</h5>
                        <ul className="space-y-1">
                          {technique.tips.map((tip, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <Zap className="w-3 h-3 text-yellow-500" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
                <CardHeader>
                  <CardTitle className="text-lg">Tácticas y Estrategia</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedSport.tactics.map((tactic, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-orange-500" />
                        {tactic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ComprehensivePhysicalHealth

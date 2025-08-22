'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Activity, Target, Users, Trophy, Zap, Play } from 'lucide-react';

const footballPositions = [
  {
    id: 'goalkeeper',
    name: 'Portero',
    description: 'Última línea de defensa',
    skills: ['Reflejos', 'Agarre', 'Despejes', 'Distribución'],
    exercises: [
      { name: 'Reflejos con balón medicinal', description: 'Mejora tiempo de reacción', duration: '15 min' },
      { name: 'Trabajo de pies en escalera', description: 'Agilidad y coordinación', duration: '10 min' },
      { name: 'Práctica de salidas', description: 'Timing en balones aéreos', duration: '20 min' },
      { name: 'Lanzamientos de precisión', description: 'Distribución con manos y pies', duration: '15 min' }
    ]
  },
  {
    id: 'defender',
    name: 'Defensa',
    description: 'Protege la portería y inicia jugadas',
    skills: ['Anticipación', 'Entradas', 'Marcaje', 'Juego aéreo'],
    exercises: [
      { name: 'Ejercicios de anticipación', description: 'Lectura de juego y posicionamiento', duration: '20 min' },
      { name: 'Práctica de entradas', description: 'Técnica segura y efectiva', duration: '15 min' },
      { name: 'Salto y cabeceo', description: 'Dominio en balones aéreos', duration: '15 min' },
      { name: 'Pases largos precisos', description: 'Inicio de jugadas ofensivas', duration: '20 min' }
    ]
  },
  {
    id: 'midfielder',
    name: 'Centrocampista',
    description: 'Conecta defensa con ataque',
    skills: ['Visión de juego', 'Pases largos', 'Resistencia', 'Control'],
    exercises: [
      { name: 'Rondo de posesión', description: 'Mejora toque y visión', duration: '20 min' },
      { name: 'Pases bajo presión', description: 'Decisiones rápidas con balón', duration: '15 min' },
      { name: 'Carrera continua con balón', description: 'Resistencia específica', duration: '25 min' },
      { name: 'Cambios de ritmo', description: 'Aceleración y desaceleración', duration: '15 min' }
    ]
  },
  {
    id: 'forward',
    name: 'Delantero',
    description: 'Finaliza las jugadas ofensivas',
    skills: ['Definición', 'Desmarques', 'Velocidad', 'Primer toque'],
    exercises: [
      { name: 'Definición desde diferentes ángulos', description: 'Precisión en el remate', duration: '20 min' },
      { name: 'Desmarques en área', description: 'Movimientos sin balón', duration: '15 min' },
      { name: 'Sprints de 30m', description: 'Velocidad explosiva', duration: '12 min' },
      { name: 'Control y definición rápida', description: 'Primer toque efectivo', duration: '18 min' }
    ]
  }
];

const tacticalConcepts = [
  {
    id: 'high-press',
    name: 'Presión Alta',
    description: 'Recuperar el balón en campo rival',
    benefits: ['Control del juego', 'Oportunidades de gol', 'Desgaste rival'],
    instructions: [
      'Todos los jugadores presionan al portador',
      'Reducir espacios entre líneas',
      'Comunicación constante',
      'Mantener intensidad 15-20 minutos'
    ]
  },
  {
    id: 'block-defense',
    name: 'Defensa en Bloque',
    description: 'Defensa compacta y organizada',
    benefits: ['Solidez defensiva', 'Contraataques', 'Conservar energía'],
    instructions: [
      'Mantener líneas juntas (máximo 35m)',
      'Basculación según posición del balón',
      'Paciencia para recuperar',
      'Salida rápida en contraataque'
    ]
  },
  {
    id: 'counter-attack',
    name: 'Contraataque',
    description: 'Transición rápida de defensa a ataque',
    benefits: ['Sorprende al rival', 'Eficiencia ofensiva', 'Menos gasto físico'],
    instructions: [
      'Transición rápida tras recuperación',
      'Pases directos y precisos',
      'Aprovechar espacios libres',
      'Máximo 3-4 toques por jugador'
    ]
  }
];

const trainingRoutines = [
  {
    id: 'warm-up',
    name: 'Calentamiento Completo',
    duration: '20 minutos',
    category: 'Preparación',
    exercises: [
      'Trote suave - 5 min',
      'Movilidad articular - 5 min', 
      'Activación muscular - 5 min',
      'Toques con balón - 5 min'
    ],
    objective: 'Preparar el cuerpo para el entrenamiento'
  },
  {
    id: 'technical',
    name: 'Técnica Individual',
    duration: '30 minutos',
    category: 'Técnica',
    exercises: [
      'Control y pase - 10 min',
      'Conducción en conos - 8 min',
      'Definición a portería - 12 min'
    ],
    objective: 'Mejorar habilidades técnicas fundamentales'
  },
  {
    id: 'stretching',
    name: 'Estiramiento Final',
    duration: '15 minutos', 
    category: 'Recuperación',
    exercises: [
      'Estiramiento de isquiotibiales - 5 min',
      'Estiramiento de gemelos - 3 min',
      'Estiramiento de cuádriceps - 4 min',
      'Relajación general - 3 min'
    ],
    objective: 'Favorecer recuperación y prevenir lesiones'
  }
];

export default function SportsTraining() {
  const [selectedPosition, setSelectedPosition] = useState(footballPositions[0]);
  const [selectedConcept, setSelectedConcept] = useState(tacticalConcepts[0]);
  const [activeTab, setActiveTab] = useState('positions');

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Entrenamiento Deportivo - Fútbol
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Desarrolla habilidades técnicas, tácticas y físicas específicas del fútbol
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="positions" className="text-gray-700 dark:text-gray-300">Posiciones</TabsTrigger>
          <TabsTrigger value="tactics" className="text-gray-700 dark:text-gray-300">Táctica</TabsTrigger>
          <TabsTrigger value="training" className="text-gray-700 dark:text-gray-300">Entrenamiento</TabsTrigger>
          <TabsTrigger value="progress" className="text-gray-700 dark:text-gray-300">Progreso</TabsTrigger>
        </TabsList>

        {/* Entrenamiento por Posición */}
        <TabsContent value="positions" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {footballPositions.map((position) => (
              <Card key={position.id} className={`hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${selectedPosition.id === position.id ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{position.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {position.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Habilidades clave:</h4>
                    <div className="flex flex-wrap gap-2">
                      {position.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedPosition(position)}
                    className="w-full"
                    variant={selectedPosition.id === position.id ? 'default' : 'outline'}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Ver Ejercicios
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ejercicios de la posición seleccionada */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Ejercicios para {selectedPosition.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {selectedPosition.exercises.map((exercise, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{exercise.name}</h4>
                      <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                        {exercise.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{exercise.description}</p>
                    <Button size="sm" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Comenzar Ejercicio
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Estrategia y Táctica */}
        <TabsContent value="tactics" className="space-y-4">
          <div className="grid gap-4">
            {tacticalConcepts.map((concept) => (
              <Card key={concept.id} className={`hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${selectedConcept.id === concept.id ? 'ring-2 ring-green-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{concept.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {concept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Beneficios:</h4>
                    <div className="flex flex-wrap gap-2">
                      {concept.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedConcept(concept)}
                    className="w-full"
                    variant={selectedConcept.id === concept.id ? 'default' : 'outline'}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Ver Instrucciones
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Instrucciones del concepto seleccionado */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Cómo ejecutar: {selectedConcept.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {selectedConcept.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rutinas de Entrenamiento */}
        <TabsContent value="training" className="space-y-4">
          <div className="grid gap-4">
            {trainingRoutines.map((routine) => (
              <Card key={routine.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-900 dark:text-white">{routine.name}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        {routine.objective}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className="mb-2">{routine.category}</Badge>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{routine.duration}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Ejercicios:</h4>
                    <ul className="space-y-1">
                      {routine.exercises.map((exercise, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-500" />
                          {exercise}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Comenzar Rutina
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Progreso */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Habilidades Técnicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Control', 'Pase', 'Definición', 'Regate'].map((skill, index) => (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                        <span className="text-gray-700 dark:text-gray-300">{65 + index * 10}%</span>
                      </div>
                      <Progress value={65 + index * 10} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Condición Física</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Velocidad', 'Resistencia', 'Agilidad', 'Fuerza'].map((attribute, index) => (
                    <div key={attribute} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{attribute}</span>
                        <span className="text-gray-700 dark:text-gray-300">{70 + index * 8}%</span>
                      </div>
                      <Progress value={70 + index * 8} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Entrenamientos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">18</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Horas jugadas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Objetivos completados</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Integration */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700">
        <CardHeader>
          <CardTitle className="text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            🤖 Maxx AI - Tu Entrenador Personal de Fútbol
          </CardTitle>
          <CardDescription className="text-gray-700 dark:text-gray-300">
            La IA puede personalizar entrenamientos según tu posición, analizar tu progreso y crear planes tácticos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">🎯 Entrenamientos específicos:</h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>Rutinas personalizadas por posición</li>
                <li>Ejercicios adaptados a debilidades</li>
                <li>Progresión automática de intensidad</li>
                <li>Integración con preparación física</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">📊 Análisis táctico:</h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>Evaluación de desempeño por zona</li>
                <li>Sugerencias tácticas personalizadas</li>
                <li>Análisis de patrones de juego</li>
                <li>Planificación de entrenamientos</li>
              </ul>
            </div>
          </div>
          <Button className="w-full">
            <Trophy className="w-4 h-4 mr-2" />
            Chatear con Maxx AI sobre Fútbol
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
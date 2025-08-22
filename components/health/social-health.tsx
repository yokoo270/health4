"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Brain, Users, MessageCircle, Heart, Star, CheckCircle, PlayCircle, Target } from 'lucide-react';

const socialSkills = [
  {
    id: 'communication',
    name: 'Comunicación Asertiva',
    description: 'Aprende a expresarte con claridad y confianza',
    level: 'Principiante',
    exercises: [
      'Práctica de lenguaje corporal',
      'Ejercicios de expresión verbal',
      'Técnicas de escucha activa'
    ]
  },
  {
    id: 'charisma',
    name: 'Desarrollo del Carisma',
    description: 'Conecta genuinamente con las personas',
    level: 'Intermedio',
    exercises: [
      'Técnicas de rapport',
      'Storytelling efectivo',
      'Presencia y magnetismo personal'
    ]
  },
  {
    id: 'empathy',
    name: 'Inteligencia Emocional',
    description: 'Comprende y maneja las emociones sociales',
    level: 'Avanzado',
    exercises: [
      'Lectura de micro-expresiones',
      'Manejo de conflictos',
      'Construcción de empatía'
    ]
  }
];

const relationshipActivities = [
  {
    id: 'active-listening',
    name: 'Escucha Activa',
    description: 'Técnicas para escuchar mejor',
    difficulty: 'Fácil',
    duration: '10 min'
  },
  {
    id: 'emotion-validation',
    name: 'Validación Emocional',
    description: 'Aprende a validar emociones',
    difficulty: 'Medio',
    duration: '15 min'
  },
  {
    id: 'conflict-resolution',
    name: 'Resolución de Conflictos',
    description: 'Métodos para resolver desacuerdos',
    difficulty: 'Difícil',
    duration: '20 min'
  }
];

// Dating tips data
const datingTips = [
  {
    category: 'Preparación',
    title: 'Preparación Mental y Física',
    tips: [
      'Sé auténtico/a en todo momento',
      'Cuida tu higiene personal y vestimenta',
      'Practica conversación natural',
      'Mantén expectativas realistas'
    ]
  },
  {
    category: 'Conversación',
    title: 'Técnicas de Conversación Natural',
    tips: [
      'Haz preguntas abiertas',
      'Escucha activamente',
      'Comparte experiencias personales',
      'Mantén contacto visual apropiado'
    ]
  },
  {
    category: 'Red Flags',
    title: 'Señales de Alerta',
    tips: [
      'Control excesivo del comportamiento',
      'Manipulación emocional',
      'Celos extremos sin fundamento',
      'Falta de respeto a límites'
    ]
  },
  {
    category: 'Green Flags',
    title: 'Señales Positivas',
    tips: [
      'Apoyo mutuo en objetivos',
      'Comunicación abierta y honesta',
      'Respeto a la individualidad',
      'Confianza y transparencia'
    ]
  }
];

// Conflict resolution exercises
const conflictResolutionExercises = [
  {
    id: 'empathy-bridge',
    name: 'Puente de Empatía',
    description: 'Conecta con la perspectiva del otro',
    difficulty: 'Medio',
    duration: '15 min'
  },
  {
    id: 'active-listening',
    name: 'Escucha Activa Profunda',
    description: 'Practica escuchar sin interrumpir',
    difficulty: 'Fácil',
    duration: '10 min'
  },
  {
    id: 'validation-techniques',
    name: 'Técnicas de Validación',
    description: 'Aprende a validar sentimientos',
    difficulty: 'Medio',
    duration: '15 min'
  }
];


export default function SocialHealth() {
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('skills');

  const socialProgress = {
    communication: 65,
    charisma: 40,
    empathy: 80
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-900 dark:text-white">
          <Users className="w-8 h-8 text-blue-500" />
          Salud Social
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Desarrolla habilidades sociales sólidas, construye relaciones significativas y mejora tu inteligencia interpersonal
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="skills" className="text-gray-700 dark:text-gray-300">Habilidades</TabsTrigger>
          <TabsTrigger value="relationships" className="text-gray-700 dark:text-gray-300">Relaciones</TabsTrigger>
          <TabsTrigger value="dating" className="text-gray-700 dark:text-gray-300">Citas</TabsTrigger>
          <TabsTrigger value="progress" className="text-gray-700 dark:text-gray-300">Progreso</TabsTrigger>
        </TabsList>

        {/* Habilidades Sociales */}
        <TabsContent value="skills" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialSkills.map((skill) => (
              <Card key={skill.id} className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{skill.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {skill.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                    {skill.level}
                  </Badge>
                  <Button
                    onClick={() => setSelectedSkill(skill)}
                    className="w-full"
                    variant="outline"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Practicar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Relaciones */}
        <TabsContent value="relationships" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Actividades de Relación</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Ejercicios para mejorar tus relaciones interpersonales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {relationshipActivities.map((activity) => (
                  <div key={activity.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{activity.name}</h4>
                      <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                        {activity.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{activity.description}</p>
                    <Button
                      size="sm"
                      onClick={() => setSelectedActivity(activity)}
                      variant="outline"
                    >
                      Comenzar ({activity.duration})
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Checklist de Relaciones Sanas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {[
                    'Comunicación abierta y honesta',
                    'Respeto mutuo y límites',
                    'Apoyo en momentos difíciles',
                    'Tiempo de calidad juntos',
                    'Resolución constructiva de conflictos'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Citas y Romance */}
        <TabsContent value="dating" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {datingTips.map((section, i) => (
              <Card key={i} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{section.category}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{section.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {section.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
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
                <CardTitle className="text-gray-900 dark:text-white">Comunicación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Progreso</span>
                    <span className="text-gray-700 dark:text-gray-300">{socialProgress.communication}%</span>
                  </div>
                  <Progress value={socialProgress.communication} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Carisma</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Progreso</span>
                    <span className="text-gray-700 dark:text-gray-300">{socialProgress.charisma}%</span>
                  </div>
                  <Progress value={socialProgress.charisma} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Empatía</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Progreso</span>
                    <span className="text-gray-700 dark:text-gray-300">{socialProgress.empathy}%</span>
                  </div>
                  <Progress value={socialProgress.empathy} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Integration Panel */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            🤖 Maxx AI - Tu Coach Social Personal
          </CardTitle>
          <CardDescription className="text-gray-700 dark:text-gray-300">
            La IA puede crear planes personalizados, analizar tu progreso y sugerir mejoras específicas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">🎯 Capacidades de la IA:</h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>Análisis personalizado de habilidades sociales</li>
                <li>Planes de desarrollo social customizados</li>
                <li>Simulación de conversaciones y escenarios</li>
                <li>Seguimiento de progreso y ajustes en tiempo real</li>
                <li>Integración con tasklist y analytics</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">📊 Integraciones automáticas:</h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>Sincronización con tu calendario social</li>
                <li>Análisis de patrones de comunicación</li>
                <li>Métricas de calidad relacional</li>
                <li>Recordatorios de actividades sociales</li>
              </ul>
            </div>
          </div>
          <Button className="w-full mt-4">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chatear con Maxx AI sobre Habilidades Sociales
          </Button>
        </CardContent>
      </Card>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
          <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">{selectedSkill.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">{selectedSkill.description}</p>
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Ejercicios disponibles:</h4>
                <ul className="space-y-2">
                  {selectedSkill.exercises.map((exercise: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">{exercise}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
          <DialogContent className="bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">{selectedActivity.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">{selectedActivity.description}</p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                  {selectedActivity.difficulty}
                </Badge>
                <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                  {selectedActivity.duration}
                </Badge>
              </div>
              <Button className="w-full" onClick={() => { /* TODO: Implement activity start logic */ }}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Comenzar Actividad
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
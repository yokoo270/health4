"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dumbbell, Target, TrendingUp, CheckCircle, Clock, Brain, Heart, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const workoutPlans = [
  {
    id: 'beginner',
    name: 'Principiante Total',
    description: 'Ideal para empezar desde cero',
    duration: '4 semanas',
    frequency: '3 días/semana',
    exercises: [
      { name: 'Sentadillas asistidas', sets: 3, reps: '8-12', rest: '60s' },
      { name: 'Flexiones inclinadas', sets: 3, reps: '5-10', rest: '60s' },
      { name: 'Remo con banda', sets: 3, reps: '10-15', rest: '45s' },
      { name: 'Plancha', sets: 3, reps: '20-30s', rest: '45s' }
    ]
  },
  {
    id: 'intermediate',
    name: 'Intermedio',
    description: 'Para quienes ya tienen experiencia básica',
    duration: '6 semanas',
    frequency: '4 días/semana',
    exercises: [
      { name: 'Sentadillas con peso', sets: 4, reps: '8-12', rest: '90s' },
      { name: 'Press de banca', sets: 4, reps: '6-10', rest: '90s' },
      { name: 'Peso muerto', sets: 3, reps: '5-8', rest: '120s' },
      { name: 'Pull-ups asistidas', sets: 3, reps: '5-10', rest: '90s' }
    ]
  },
  {
    id: 'advanced',
    name: 'Avanzado',
    description: 'Para atletas experimentados',
    duration: '8 semanas',
    frequency: '5-6 días/semana',
    exercises: [
      { name: 'Sentadilla frontal', sets: 5, reps: '3-6', rest: '180s' },
      { name: 'Press militar', sets: 4, reps: '4-8', rest: '150s' },
      { name: 'Peso muerto rumano', sets: 4, reps: '6-8', rest: '120s' },
      { name: 'Muscle-ups', sets: 3, reps: '3-8', rest: '180s' }
    ]
  }
];

const muscleGroups = [
  { name: 'Pecho', progress: 75, exercises: 12 },
  { name: 'Espalda', progress: 65, exercises: 15 },
  { name: 'Piernas', progress: 80, exercises: 18 },
  { name: 'Hombros', progress: 55, exercises: 10 },
  { name: 'Brazos', progress: 70, exercises: 14 },
  { name: 'Core', progress: 85, exercises: 16 }
];

export default function StrengthTraining() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('plans');

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-900 dark:text-white">
          <Dumbbell className="w-8 h-8 text-primary" />
          Entrenamiento de Fuerza
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Desarrolla músculo, fuerza y resistencia con planes personalizados y seguimiento científico
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="plans" className="text-gray-700 dark:text-gray-300">Planes</TabsTrigger>
          <TabsTrigger value="exercises" className="text-gray-700 dark:text-gray-300">Ejercicios</TabsTrigger>
          <TabsTrigger value="progress" className="text-gray-700 dark:text-gray-300">Progreso</TabsTrigger>
          <TabsTrigger value="education" className="text-gray-700 dark:text-gray-300">Educación</TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workoutPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                      {plan.duration}
                    </Badge>
                    <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                      {plan.frequency}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => setSelectedPlan(plan)}
                    className="w-full"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Ver Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Exercises Tab */}
        <TabsContent value="exercises" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {muscleGroups.map((group, i) => (
              <Card key={i} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{group.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {group.exercises} ejercicios disponibles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">Progreso</span>
                      <span className="text-gray-700 dark:text-gray-300">{group.progress}%</span>
                    </div>
                    <Progress value={group.progress} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full">
                    Explorar Ejercicios
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Estadísticas Generales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">124</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Entrenamientos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">8.2kg</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Ganancia muscular</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Récords Personales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { exercise: 'Sentadilla', weight: '120kg', date: '15 Ene' },
                    { exercise: 'Press Banca', weight: '90kg', date: '12 Ene' },
                    { exercise: 'Peso Muerto', weight: '140kg', date: '10 Ene' }
                  ].map((record, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">{record.exercise}</span>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">{record.weight}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{record.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Principios Básicos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Sobrecarga progresiva es clave</li>
                  <li>• Descansa 48-72h entre entrenamientos del mismo músculo</li>
                  <li>• Técnica correcta > peso máximo</li>
                  <li>• Consistencia supera intensidad</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Nutrición para Fuerza</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Proteína: 1.6-2.2g por kg de peso</li>
                  <li>• Carbohidratos pre-entreno</li>
                  <li>• Hidratación constante</li>
                  <li>• Timing de nutrientes post-entreno</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Integration Panel */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border-primary/20 dark:border-primary/40">
        <CardHeader>
          <CardTitle className="text-primary dark:text-primary-foreground flex items-center gap-2">
            <Brain className="w-5 h-5" />
            🤖 Maxx AI - Tu Coach Personal
          </CardTitle>
          <CardDescription className="text-gray-700 dark:text-gray-300">
            La IA puede personalizar tus entrenamientos, ajustar cargas y optimizar tu progreso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-gray-700 dark:text-gray-300">Rutinas Personalizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-gray-700 dark:text-gray-300">Progresión Automática</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">Seguimiento Inteligente</span>
            </div>
          </div>
          <Button className="w-full">
            <Brain className="w-4 h-4 mr-2" />
            Chatear con Maxx AI sobre Entrenamiento
          </Button>
        </CardContent>
      </Card>

      {/* Plan Detail Modal */}
      {selectedPlan && (
        <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">{selectedPlan.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Duración</h4>
                  <p className="text-gray-600 dark:text-gray-300">{selectedPlan.duration}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Frecuencia</h4>
                  <p className="text-gray-600 dark:text-gray-300">{selectedPlan.frequency}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Ejercicios del Plan</h4>
                <div className="space-y-3">
                  {selectedPlan.exercises.map((exercise: any, i: number) => (
                    <div key={i} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">{exercise.name}</h5>
                          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {exercise.sets} series × {exercise.reps} repeticiones
                          </div>
                        </div>
                        <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                          <Clock className="w-3 h-3 mr-1" />
                          {exercise.rest}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                Comenzar Este Plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
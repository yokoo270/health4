
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Heart, Clock, Target, TrendingUp, MapPin, Trophy, Play, Info } from 'lucide-react';

const cardioTypes = [
  {
    id: 'running',
    name: 'Correr',
    description: 'Ejercicio cardiovascular básico y efectivo',
    calories: '400-600 kcal/hora',
    difficulty: 'Principiante',
    benefits: ['Mejora resistencia', 'Fortalece corazón', 'Quema calorías'],
    tips: ['Comienza gradualmente', 'Usa calzado adecuado', 'Mantén hidratación']
  },
  {
    id: 'cycling',
    name: 'Ciclismo',
    description: 'Bajo impacto, ideal para articulaciones',
    calories: '300-500 kcal/hora',
    difficulty: 'Principiante',
    benefits: ['Bajo impacto', 'Fortalece piernas', 'Ejercicio sostenible'],
    tips: ['Ajusta altura del asiento', 'Usa casco', 'Varía la intensidad']
  },
  {
    id: 'swimming',
    name: 'Natación',
    description: 'Ejercicio completo de cuerpo entero',
    calories: '350-500 kcal/hora',
    difficulty: 'Intermedio',
    benefits: ['Ejercicio completo', 'Bajo impacto', 'Mejora respiración'],
    tips: ['Aprende técnica correcta', 'Usa gafas', 'Calienta antes']
  },
  {
    id: 'hiit',
    name: 'HIIT',
    description: 'Intervalos de alta intensidad',
    calories: '500-800 kcal/hora',
    difficulty: 'Avanzado',
    benefits: ['Máxima quema', 'Efecto post-ejercicio', 'Tiempo eficiente'],
    tips: ['Descansa entre series', 'Mantén forma correcta', 'Progresa gradualmente']
  }
];

const workoutPlans = [
  {
    week: 1,
    title: 'Semana de Adaptación',
    sessions: [
      { day: 'Lunes', type: 'Caminata rápida', duration: '20 min', intensity: 'Baja' },
      { day: 'Miércoles', type: 'Trote suave', duration: '15 min', intensity: 'Moderada' },
      { day: 'Viernes', type: 'Caminata', duration: '25 min', intensity: 'Baja' }
    ]
  },
  {
    week: 2,
    title: 'Construcción de Base',
    sessions: [
      { day: 'Lunes', type: 'Trote', duration: '20 min', intensity: 'Moderada' },
      { day: 'Miércoles', type: 'Intervalos cortos', duration: '20 min', intensity: 'Alta' },
      { day: 'Viernes', type: 'Caminata rápida', duration: '30 min', intensity: 'Moderada' }
    ]
  }
];

export default function CardioTraining() {
  const [selectedType, setSelectedType] = useState(cardioTypes[0]);
  const [currentWeek, setCurrentWeek] = useState(1);

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ejercicios Cardiovasculares</h1>
        <p className="text-gray-600 dark:text-gray-300">Mejora tu resistencia y salud cardiovascular</p>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="types">Tipos de Cardio</TabsTrigger>
          <TabsTrigger value="plans">Planes</TabsTrigger>
          <TabsTrigger value="benefits">Beneficios</TabsTrigger>
        </TabsList>

        {/* Información General */}
        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Info className="w-5 h-5" />
                ¿Por qué es importante el cardio?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                El ejercicio cardiovascular fortalece el corazón, mejora la circulación y aumenta la capacidad pulmonar. 
                Es fundamental para la salud general y la longevidad.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Efectos Físicos:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Fortalece el corazón</li>
                    <li>• Mejora la circulación</li>
                    <li>• Aumenta capacidad pulmonar</li>
                    <li>• Quema calorías eficientemente</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Efectos Mentales:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Reduce estrés y ansiedad</li>
                    <li>• Mejora el estado de ánimo</li>
                    <li>• Aumenta la energía</li>
                    <li>• Mejora la calidad del sueño</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Cómo combinarlo con el gimnasio:</h4>
                <p className="text-sm">
                  Realiza cardio 3-4 veces por semana, idealmente en días alternos al entrenamiento de fuerza. 
                  Si entrenas fuerza y cardio el mismo día, haz primero el ejercicio que sea tu prioridad.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mitos y Verdades */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Mitos y Verdades sobre el Cardio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ MITO: "Más tiempo = mejores resultados"</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    La calidad e intensidad importan más que la duración. 20-30 minutos de ejercicio intenso pueden ser más efectivos que 60 minutos de baja intensidad.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ VERDAD: "El cardio mejora la salud mental"</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    El ejercicio cardiovascular libera endorfinas y reduce cortisol, mejorando significativamente el estado de ánimo y reduciendo el estrés.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tipos de Cardio */}
        <TabsContent value="types" className="space-y-6">
          <div className="grid gap-4">
            {cardioTypes.map((type) => (
              <Card key={type.id} className={selectedType.id === type.id ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-white">{type.name}</CardTitle>
                    <Badge variant={type.difficulty === 'Principiante' ? 'secondary' : type.difficulty === 'Intermedio' ? 'default' : 'destructive'}>
                      {type.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      {type.calories}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Beneficios:</h4>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {type.benefits.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Consejos:</h4>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {type.tips.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setSelectedType(type)}
                    className="w-full"
                    variant={selectedType.id === type.id ? 'default' : 'outline'}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Seleccionar este tipo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Planes de Entrenamiento */}
        <TabsContent value="plans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Plan de Entrenamiento Progresivo</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Programa diseñado para principiantes que quieren empezar gradualmente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {workoutPlans.map((plan) => (
                <div key={plan.week} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Semana {plan.week}: {plan.title}
                    </h3>
                    <Badge variant="outline">
                      {plan.sessions.length} sesiones
                    </Badge>
                  </div>
                  
                  <div className="grid gap-3">
                    {plan.sessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium text-gray-900 dark:text-white">{session.day}</span>
                          <span className="text-gray-600 dark:text-gray-400">{session.type}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            {session.duration}
                          </span>
                          <Badge size="sm" variant={session.intensity === 'Baja' ? 'secondary' : session.intensity === 'Moderada' ? 'default' : 'destructive'}>
                            {session.intensity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <Button className="w-full">
                <Target className="w-4 h-4 mr-2" />
                Comenzar Plan de Entrenamiento
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Beneficios Integrales */}
        <TabsContent value="benefits" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Heart className="w-5 h-5 text-red-500" />
                  Beneficios para la Salud Mental
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Reducción del Estrés:</h4>
                  <p className="text-sm">El cardio libera endorfinas que actúan como analgésicos naturales y mejoran el estado de ánimo.</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Mejor Sueño:</h4>
                  <p className="text-sm">El ejercicio regular mejora la calidad del sueño y ayuda a regular los ciclos circadianos.</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Autoestima:</h4>
                  <p className="text-sm">Los logros en el ejercicio aumentan la confianza y la percepción positiva de uno mismo.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Beneficios para la Longevidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Salud Cardiovascular:</h4>
                  <p className="text-sm">Reduce el riesgo de enfermedades cardíacas en hasta un 30-50%.</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Control de Peso:</h4>
                  <p className="text-sm">Ayuda a mantener un peso saludable y mejora el metabolismo.</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Función Cerebral:</h4>
                  <p className="text-sm">Mejora la memoria, concentración y reduce el riesgo de demencia.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Precauciones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">⚠️ Precauciones para Evitar Lesiones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Antes del Ejercicio:</h4>
                  <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Calienta 5-10 minutos</li>
                    <li>• Usa calzado adecuado</li>
                    <li>• Mantente hidratado</li>
                    <li>• No ejercites si estás enfermo</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Durante el Ejercicio:</h4>
                  <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Escucha a tu cuerpo</li>
                    <li>• Para si sientes dolor</li>
                    <li>• Mantén buena postura</li>
                    <li>• Respira adecuadamente</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

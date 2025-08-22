
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Volume2, Heart, Brain, Sparkles, Clock } from 'lucide-react';

const meditationStyles = [
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    description: 'Atención plena al momento presente',
    benefits: ['Reduce ansiedad', 'Aumenta concentración', 'Mejora el estado de ánimo'],
    sessions: [
      { id: 1, title: 'Respiración Consciente', duration: '5-20 min' },
      { id: 2, title: 'Escaneo Corporal', duration: '10-25 min' },
      { id: 3, title: 'Observación de Pensamientos', duration: '5-15 min' },
      { id: 4, title: 'Mindfulness Caminando', duration: '10-20 min' },
      { id: 5, title: 'Atención en los Sentidos', duration: '5-15 min' },
      { id: 6, title: 'Meditación del Presente', duration: '10-25 min' },
      { id: 7, title: 'Aceptación y Compasión', duration: '15-30 min' }
    ]
  },
  {
    id: 'zen',
    name: 'Zen',
    description: 'Enfoque en postura y respiración',
    benefits: ['Calma profunda', 'Claridad mental', 'Disciplina interior'],
    sessions: [
      { id: 1, title: 'Zazen Básico', duration: '10-30 min' },
      { id: 2, title: 'Respiración Zen', duration: '5-20 min' },
      { id: 3, title: 'Postura Perfecta', duration: '10-25 min' },
      { id: 4, title: 'Silencio Interior', duration: '15-30 min' },
      { id: 5, title: 'Contemplación Zen', duration: '10-20 min' },
      { id: 6, title: 'Vacío Mental', duration: '15-25 min' },
      { id: 7, title: 'Despertar Zen', duration: '20-40 min' }
    ]
  },
  {
    id: 'vipassana',
    name: 'Vipassana',
    description: 'Observación de respiración y sensaciones',
    benefits: ['Autocomprensión', 'Regulación emocional', 'Sabiduría interior'],
    sessions: [
      { id: 1, title: 'Observación de la Respiración', duration: '10-30 min' },
      { id: 2, title: 'Sensaciones Corporales', duration: '15-35 min' },
      { id: 3, title: 'Impermanencia', duration: '10-25 min' },
      { id: 4, title: 'Ecuanimidad', duration: '15-30 min' },
      { id: 5, title: 'Concentración Profunda', duration: '20-40 min' },
      { id: 6, title: 'Insight Meditation', duration: '25-45 min' },
      { id: 7, title: 'Liberación Mental', duration: '30-50 min' }
    ]
  }
];

const breathingExercises = [
  {
    id: 'equal',
    name: 'Respiración Equitativa',
    pattern: [4, 4, 4, 4],
    description: 'Inhala y exhala por el mismo tiempo',
    cycles: 8
  },
  {
    id: 'box',
    name: 'Respiración del Cuadrilátero',
    pattern: [4, 4, 4, 4],
    description: 'Inhala, mantén, exhala, mantén',
    cycles: 6
  },
  {
    id: 'relaxing',
    name: 'Respiración 4-7-8',
    pattern: [4, 7, 8],
    description: 'Técnica relajante para dormir',
    cycles: 4
  },
  {
    id: 'retention',
    name: 'Prueba de Contención',
    pattern: [4, 16, 8],
    description: 'Fortalece capacidad pulmonar',
    cycles: 3
  }
];

const yogaSessions = [
  {
    id: 'morning',
    title: 'Energía Matutina',
    duration: '20-25 min',
    objective: 'Activar el cuerpo y empezar con energía',
    exercises: [
      'Respiración profunda (Pranayama) - 2 min',
      'Saludo al Sol - 3 rondas',
      'Guerrero I - 30s por lado',
      'Perro boca abajo - 1 min',
      'Cobra - 30s x 2',
      'Postura del Niño - 1-2 min'
    ]
  },
  {
    id: 'digestion',
    title: 'Después de Comer',
    duration: '20-25 min',
    objective: 'Favorecer digestión y aliviar hinchazón',
    exercises: [
      'Respiración abdominal - 2 min',
      'Torsión sentada - 30s por lado',
      'Gato-Vaca - 1 min',
      'Niño con torsión - 1 min por lado',
      'Mariposa - 2 min',
      'Rodillas al pecho - 1-2 min'
    ]
  },
  {
    id: 'stress',
    title: 'Reducir Estrés',
    duration: '25 min',
    objective: 'Calmar mente y reducir ansiedad',
    exercises: [
      'Respiración alterna - 3 min',
      'Postura del Niño - 2 min',
      'Mariposa - 1 min',
      'Torsión suave - 30s por lado',
      'Piernas en pared - 5 min',
      'Savasana - 5 min'
    ]
  }
];

const relaxingSounds = [
  { id: 'birds', name: 'Pájaros cantando', icon: '🐦' },
  { id: 'waves', name: 'Olas del mar', icon: '🌊' },
  { id: 'rain', name: 'Lluvia suave', icon: '🌧️' },
  { id: 'river', name: 'Río fluyendo', icon: '🏞️' },
  { id: 'waterfall', name: 'Cascada', icon: '💧' },
  { id: 'white', name: 'Ruido blanco', icon: '📻' },
  { id: 'pink', name: 'Ruido rosa', icon: '🎵' }
];

export default function MeditationRelaxation() {
  const [selectedStyle, setSelectedStyle] = useState(meditationStyles[0]);
  const [selectedSession, setSelectedSession] = useState(selectedStyle.sessions[0]);
  const [duration, setDuration] = useState(5);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [selectedBreathing, setSelectedBreathing] = useState(breathingExercises[0]);
  const [breathingCycles, setBreathingCycles] = useState(selectedBreathing.cycles);
  const [selectedSound, setSelectedSound] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeLeft(duration * 60);
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meditación y Relajación</h1>
        <p className="text-gray-600 dark:text-gray-300">Encuentra tu equilibrio interior</p>
      </div>

      <Tabs defaultValue="meditation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="meditation">Meditación</TabsTrigger>
          <TabsTrigger value="breathing">Respiración</TabsTrigger>
          <TabsTrigger value="yoga">Yoga</TabsTrigger>
          <TabsTrigger value="sounds">Sonidos</TabsTrigger>
        </TabsList>

        {/* Meditación */}
        <TabsContent value="meditation" className="space-y-6">
          {/* Información Educativa */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">¿Qué es la Meditación?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                La meditación es una práctica ancestral que entrena la mente para enfocar la atención y 
                desarrollar conciencia del momento presente. No se trata de detener los pensamientos, 
                sino de observarlos sin juzgar.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Beneficios Científicos:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Reduce estrés y ansiedad</li>
                    <li>• Mejora concentración</li>
                    <li>• Fortalece sistema inmune</li>
                    <li>• Aumenta bienestar emocional</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Para la Vida Diaria:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Mayor claridad mental</li>
                    <li>• Mejor toma de decisiones</li>
                    <li>• Relaciones más saludables</li>
                    <li>• Resiliencia ante problemas</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Recordatorio:</h4>
                  <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    Los pensamientos no son enemigos. La meditación no busca una mente vacía, 
                    sino una mente consciente y presente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estilos de Meditación */}
          <div className="grid gap-4">
            {meditationStyles.map((style) => (
              <Card key={style.id} className={selectedStyle.id === style.id ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-white">{style.name}</CardTitle>
                    <Badge variant="outline">{style.sessions.length} sesiones</Badge>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{style.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Beneficios:</h4>
                    <div className="flex flex-wrap gap-2">
                      {style.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setSelectedStyle(style)}
                    className="w-full"
                    variant={selectedStyle.id === style.id ? 'default' : 'outline'}
                  >
                    Seleccionar {style.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timer de Meditación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Temporizador de Meditación</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Estilo: {selectedStyle.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-mono text-gray-900 dark:text-white">
                  {formatTime(timeLeft)}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Duración:</label>
                    <Select value={duration.toString()} onValueChange={(value) => {
                      setDuration(parseInt(value));
                      setTimeLeft(parseInt(value) * 60);
                    }}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 min</SelectItem>
                        <SelectItem value="5">5 min</SelectItem>
                        <SelectItem value="10">10 min</SelectItem>
                        <SelectItem value="12">12 min</SelectItem>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="20">20 min</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => setIsTimerActive(!isTimerActive)}
                      size="lg"
                    >
                      {isTimerActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                      {isTimerActive ? 'Pausar' : 'Iniciar'}
                    </Button>
                    <Button
                      onClick={resetTimer}
                      variant="outline"
                      size="lg"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reiniciar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ejercicios de Respiración */}
        <TabsContent value="breathing" className="space-y-6">
          <div className="grid gap-4">
            {breathingExercises.map((exercise) => (
              <Card key={exercise.id} className={selectedBreathing.id === exercise.id ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{exercise.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Patrón: {exercise.pattern.join('-')}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.cycles} ciclos
                    </span>
                  </div>
                  
                  <Button 
                    onClick={() => setSelectedBreathing(exercise)}
                    className="w-full"
                    variant={selectedBreathing.id === exercise.id ? 'default' : 'outline'}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Practicar {exercise.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sesiones de Yoga */}
        <TabsContent value="yoga" className="space-y-6">
          <div className="grid gap-4">
            {yogaSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{session.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {session.objective} • {session.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Ejercicios incluidos:</h4>
                    <ul className="space-y-1">
                      {session.exercises.map((exercise, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {exercise}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Comenzar {session.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Biblioteca de Sonidos */}
        <TabsContent value="sounds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Sonidos Relajantes</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Elige sonidos ambientales para acompañar tu práctica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {relaxingSounds.map((sound) => (
                  <Button
                    key={sound.id}
                    variant={selectedSound === sound.id ? 'default' : 'outline'}
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => setSelectedSound(selectedSound === sound.id ? null : sound.id)}
                  >
                    <span className="text-2xl">{sound.icon}</span>
                    <span className="text-xs">{sound.name}</span>
                  </Button>
                ))}
              </div>
              
              {selectedSound && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Reproduciendo: {relaxingSounds.find(s => s.id === selectedSound)?.name}
                  </span>
                  <Button size="sm" variant="ghost">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

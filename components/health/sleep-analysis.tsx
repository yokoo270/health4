'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Moon, 
  Sun, 
  Clock, 
  TrendingUp, 
  Heart,
  Brain,
  Shield,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Timer,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Activity
} from 'lucide-react';

interface SleepRecord {
  date: string;
  bedtime: string;
  wakeTime: string;
  sleepQuality: number;
  deepSleep: number;
  remSleep: number;
  lightSleep: number;
  sleepScore: number;
  notes?: string;
}

interface SleepSound {
  id: string;
  name: string;
  artist: string;
  duration: string;
  category: 'ambient' | 'nature' | 'classical';
  description: string;
}

interface SleepHabit {
  id: string;
  title: string;
  description: string;
  impact: number; // 1-5 scale
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  category: 'hygiene' | 'environment' | 'routine' | 'nutrition';
  timeframe: string;
}

const sleepSounds: SleepSound[] = [
  {
    id: 'ambient-sleep',
    name: 'Ambient Sleep Music',
    artist: 'YouTube Audio Library',
    duration: '8:00:00',
    category: 'ambient',
    description: 'Música ambiental suave diseñada para inducir relajación profunda'
  },
  {
    id: 'calm-mind',
    name: 'Calm Mind',
    artist: 'Kevin MacLeod',
    duration: '4:32',
    category: 'ambient',
    description: 'Melodías tranquilas que ayudan a calmar la mente antes de dormir'
  },
  {
    id: 'sleepy-fish',
    name: 'Sleepy Fish',
    artist: 'Music For Dreaming',
    duration: '6:15',
    category: 'ambient',
    description: 'Sonidos flotantes y etéreos perfectos para la transición al sueño'
  },
  {
    id: 'dreaming',
    name: 'Dreaming',
    artist: 'Kevin MacLeod',
    duration: '3:48',
    category: 'ambient',
    description: 'Composición suave que facilita el inicio del sueño reparador'
  },
  {
    id: 'soft-piano',
    name: 'Soft Piano Music',
    artist: 'AShamaluevMusic',
    duration: '5:24',
    category: 'classical',
    description: 'Piano suave y melódico que relaja profundamente'
  },
  {
    id: 'weightless',
    name: 'Weightless (Free Version)',
    artist: 'Independent Artists',
    duration: '8:00',
    category: 'ambient',
    description: 'Considerada una de las canciones más relajantes del mundo'
  },
  {
    id: 'rain',
    name: 'Lluvia Suave',
    artist: 'Nature Sounds',
    duration: '∞',
    category: 'nature',
    description: 'Sonido constante de lluvia suave sobre tejado'
  },
  {
    id: 'ocean',
    name: 'Olas del Océano',
    artist: 'Nature Sounds',
    duration: '∞',
    category: 'nature',
    description: 'Olas suaves rompiendo en la orilla'
  },
  {
    id: 'forest',
    name: 'Bosque Nocturno',
    artist: 'Nature Sounds',
    duration: '∞',
    category: 'nature',
    description: 'Sonidos del bosque en la noche con suaves brisas'
  }
];

const sleepHabits: SleepHabit[] = [
  {
    id: 'consistent-schedule',
    title: 'Horario consistente',
    description: 'Acostarse y levantarse a la misma hora todos los días',
    impact: 5,
    difficulty: 'Moderado',
    category: 'routine',
    timeframe: '2-3 semanas'
  },
  {
    id: 'no-screens',
    title: 'Sin pantallas 1 hora antes',
    description: 'Evitar teléfonos, tablets y TV antes de dormir',
    impact: 4,
    difficulty: 'Difícil',
    category: 'hygiene',
    timeframe: '1-2 semanas'
  },
  {
    id: 'cool-room',
    title: 'Habitación fresca (16-19°C)',
    description: 'Mantener temperatura óptima para el sueño',
    impact: 4,
    difficulty: 'Fácil',
    category: 'environment',
    timeframe: 'Inmediato'
  },
  {
    id: 'dark-room',
    title: 'Habitación oscura',
    description: 'Eliminar fuentes de luz con cortinas opacas',
    impact: 4,
    difficulty: 'Fácil',
    category: 'environment',
    timeframe: 'Inmediato'
  },
  {
    id: 'no-caffeine',
    title: 'Sin cafeína después de las 14:00',
    description: 'Evitar café, té y bebidas energéticas por la tarde',
    impact: 4,
    difficulty: 'Moderado',
    category: 'nutrition',
    timeframe: '3-5 días'
  },
  {
    id: 'bedtime-routine',
    title: 'Rutina relajante pre-sueño',
    description: 'Actividades calmantes 30-60 min antes de dormir',
    impact: 4,
    difficulty: 'Moderado',
    category: 'routine',
    timeframe: '1-2 semanas'
  },
  {
    id: 'comfortable-bed',
    title: 'Colchón y almohada cómodos',
    description: 'Invertir en un buen sistema de descanso',
    impact: 4,
    difficulty: 'Fácil',
    category: 'environment',
    timeframe: 'Inmediato'
  },
  {
    id: 'exercise',
    title: 'Ejercicio regular (no nocturno)',
    description: 'Actividad física regular pero no 3h antes de dormir',
    impact: 3,
    difficulty: 'Moderado',
    category: 'routine',
    timeframe: '2-4 semanas'
  },
  {
    id: 'no-alcohol',
    title: 'Limitar alcohol',
    description: 'Evitar alcohol 3-4 horas antes de dormir',
    impact: 3,
    difficulty: 'Moderado',
    category: 'nutrition',
    timeframe: '1 semana'
  },
  {
    id: 'quiet-environment',
    title: 'Ambiente silencioso',
    description: 'Reducir ruidos o usar tapones para oídos',
    impact: 3,
    difficulty: 'Fácil',
    category: 'environment',
    timeframe: 'Inmediato'
  }
];

const thingsToAvoid = [
  { item: 'Cafeína después de las 14:00', impact: 5, reason: 'Permanece en el sistema 6-8 horas' },
  { item: 'Pantallas 1-2h antes de dormir', impact: 4, reason: 'La luz azul suprime la melatonina' },
  { item: 'Comidas pesadas 3h antes', impact: 4, reason: 'La digestión interfiere con el sueño' },
  { item: 'Alcohol 3-4h antes', impact: 4, reason: 'Fragmenta el sueño y reduce REM' },
  { item: 'Ejercicio intenso 3h antes', impact: 3, reason: 'Eleva temperatura corporal y adrenalina' },
  { item: 'Siestas largas (>30 min)', impact: 3, reason: 'Reduce la presión del sueño nocturno' },
  { item: 'Fluidos excesivos 2h antes', impact: 2, reason: 'Interrupciones para ir al baño' },
  { item: 'Discusiones o estrés', impact: 3, reason: 'Activa el sistema nervioso simpático' }
];

const meditationsForSleep = [
  {
    name: 'Escaneo Corporal Progresivo',
    duration: '15 min',
    description: 'Relaja cada parte del cuerpo sistemáticamente'
  },
  {
    name: 'Respiración 4-7-8',
    duration: '10 min',
    description: 'Técnica respiratoria sedante para inducir sueño'
  },
  {
    name: 'Visualización de Lugar Seguro',
    duration: '12 min',
    description: 'Imagina un lugar tranquilo y relajante'
  },
  {
    name: 'Mindfulness para Dormir',
    duration: '20 min',
    description: 'Observación consciente sin juicio para calmar la mente'
  },
  {
    name: 'Relajación Muscular Progresiva',
    duration: '18 min',
    description: 'Tensión y relajación sistemática de grupos musculares'
  }
];

export default function SleepAnalysis() {
  const [selectedSound, setSelectedSound] = useState<SleepSound | null>(null);
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [soundTimer, setSoundTimer] = useState(30); // minutes
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
  const [checkedHabits, setCheckedHabits] = useState<string[]>([]);

  // Mock sleep data
  const mockSleepData = {
    lastNight: {
      bedtime: '23:30',
      wakeTime: '07:00',
      sleepQuality: 7.5,
      deepSleep: 25,
      remSleep: 20,
      lightSleep: 55,
      sleepScore: 78
    },
    weeklyAverage: {
      sleepScore: 75,
      deepSleep: 22,
      remSleep: 18,
      duration: 7.2
    }
  };

  useEffect(() => {
    // Load checked habits from localStorage
    const saved = localStorage.getItem('sleep-habits');
    if (saved) {
      setCheckedHabits(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Timer countdown effect
    let interval: NodeJS.Timeout;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            setPlayingSound(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const toggleHabit = (habitId: string) => {
    const newCheckedHabits = checkedHabits.includes(habitId)
      ? checkedHabits.filter(id => id !== habitId)
      : [...checkedHabits, habitId];
    
    setCheckedHabits(newCheckedHabits);
    localStorage.setItem('sleep-habits', JSON.stringify(newCheckedHabits));
  };

  const startSoundTimer = (soundId: string) => {
    setPlayingSound(soundId);
    setTimeRemaining(soundTimer * 60);
    setTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSleepScore = () => mockSleepData.lastNight.sleepScore;
  const getSleepScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Moon className="w-8 h-8 text-blue-500" />
          Análisis del Sueño
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Optimiza tu descanso con análisis inteligente, higiene del sueño y sonidos relajantes
        </p>
      </div>

      {/* Sleep Score Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getSleepScoreColor(getSleepScore())}`}>
                {getSleepScore()}
              </div>
              <div className="text-sm text-muted-foreground">Puntuación de Sueño</div>
              <div className="text-xs text-muted-foreground mt-1">Anoche</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {mockSleepData.lastNight.deepSleep}%
              </div>
              <div className="text-sm text-muted-foreground">Sueño Profundo</div>
              <div className="text-xs text-green-600">Óptimo: 20-25%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {mockSleepData.lastNight.remSleep}%
              </div>
              <div className="text-sm text-muted-foreground">Sueño REM</div>
              <div className="text-xs text-green-600">Óptimo: 20-25%</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockSleepData.weeklyAverage.duration}h
              </div>
              <div className="text-sm text-muted-foreground">Promedio Semanal</div>
              <div className="text-xs text-green-600">Óptimo: 7-9h</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="analysis">Análisis</TabsTrigger>
          <TabsTrigger value="hygiene">Higiene</TabsTrigger>
          <TabsTrigger value="sounds">Sonidos</TabsTrigger>
          <TabsTrigger value="meditation">Meditación</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
        </TabsList>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-4">
          {/* Sleep Phases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Fases del Sueño - Última Noche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Sueño Ligero</span>
                    <span className="text-sm">{mockSleepData.lastNight.lightSleep}%</span>
                  </div>
                  <Progress value={mockSleepData.lastNight.lightSleep} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Transición entre vigilia y sueño profundo
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Sueño Profundo</span>
                    <span className="text-sm">{mockSleepData.lastNight.deepSleep}%</span>
                  </div>
                  <Progress value={mockSleepData.lastNight.deepSleep} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Recuperación física y crecimiento
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Sueño REM</span>
                    <span className="text-sm">{mockSleepData.lastNight.remSleep}%</span>
                  </div>
                  <Progress value={mockSleepData.lastNight.remSleep} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Consolidación de memoria y sueños
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sleep Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Tendencias Semanales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">📈 Mejoras Observadas</h4>
                  <ul className="space-y-1 text-green-600">
                    <li>• Tiempo de sueño profundo +3% esta semana</li>
                    <li>• Consistencia de horarios mejorada</li>
                    <li>• Menos interrupciones nocturnas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">⚠️ Áreas de Mejora</h4>
                  <ul className="space-y-1 text-orange-600">
                    <li>• Hora de acostarse irregular</li>
                    <li>• Sueño REM ligeramente bajo</li>
                    <li>• Despertares tempranos frecuentes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">🤖 Recomendaciones Personalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-purple-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-purple-600" />
                  <div>
                    <p className="font-medium">Mantén horario consistente</p>
                    <p>Acuéstate a las 23:00 y levántate a las 07:00 todos los días</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-purple-600" />
                  <div>
                    <p className="font-medium">Mejora tu sueño REM</p>
                    <p>Evita alcohol y mantén habitación fresca (18°C)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 text-purple-600" />
                  <div>
                    <p className="font-medium">Rutina de relajación</p>
                    <p>Implementa 30 min de actividades calmantes antes de dormir</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hygiene Tab */}
        <TabsContent value="hygiene" className="space-y-4">
          {/* Sleep Habits Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Hábitos de Higiene del Sueño
              </CardTitle>
              <CardDescription>
                Marca los hábitos que ya estás aplicando
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sleepHabits.map((habit) => (
                  <div key={habit.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={checkedHabits.includes(habit.id)}
                      onChange={() => toggleHabit(habit.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{habit.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          Impacto: {habit.impact}/5
                        </Badge>
                        <Badge variant={
                          habit.difficulty === 'Fácil' ? 'default' :
                          habit.difficulty === 'Moderado' ? 'secondary' : 'destructive'
                        } className="text-xs">
                          {habit.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{habit.description}</p>
                      <div className="text-xs text-blue-600 mt-1">
                        Resultado en: {habit.timeframe}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-green-800">
                  <strong>Progreso:</strong> {checkedHabits.length}/{sleepHabits.length} hábitos implementados
                </div>
                <Progress value={(checkedHabits.length / sleepHabits.length) * 100} className="mt-2 h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Things to Avoid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Cosas a Evitar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {thingsToAvoid.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <div className="font-medium text-red-800">{item.item}</div>
                      <div className="text-sm text-red-600">{item.reason}</div>
                    </div>
                    <Badge variant="destructive" className="ml-2">
                      {item.impact}/5
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sounds Tab */}
        <TabsContent value="sounds" className="space-y-4">
          {/* Timer Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Temporizador de Sonidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Duración: {soundTimer} minutos</Label>
                  <Slider
                    value={[soundTimer]}
                    onValueChange={([value]) => setSoundTimer(value)}
                    max={120}
                    min={5}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5 min</span>
                    <span>120 min</span>
                  </div>
                </div>

                {timerActive && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {formatTime(timeRemaining)}
                      </div>
                      <div className="text-sm text-blue-700 mb-3">
                        Reproduciendo: {sleepSounds.find(s => s.id === playingSound)?.name}
                      </div>
                      <div className="flex justify-center gap-2">
                        <Button size="sm" onClick={() => setTimerActive(false)}>
                          <Pause className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          setTimerActive(false);
                          setPlayingSound(null);
                          setTimeRemaining(0);
                        }}>
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sound Categories */}
          <div className="space-y-4">
            {['ambient', 'nature', 'classical'].map(category => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    {category === 'ambient' && <Moon className="w-5 h-5 text-purple-500" />}
                    {category === 'nature' && <Zap className="w-5 h-5 text-green-500" />}
                    {category === 'classical' && <Heart className="w-5 h-5 text-blue-500" />}
                    {category === 'ambient' ? 'Música Ambiental' : 
                     category === 'nature' ? 'Sonidos de la Naturaleza' : 'Música Clásica'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {sleepSounds.filter(sound => sound.category === category).map((sound) => (
                      <div key={sound.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{sound.name}</div>
                          <div className="text-xs text-muted-foreground">{sound.artist} • {sound.duration}</div>
                          <div className="text-xs text-gray-600 mt-1">{sound.description}</div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => startSoundTimer(sound.id)}
                          disabled={timerActive}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Meditation Tab */}
        <TabsContent value="meditation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                Meditaciones para Dormir
              </CardTitle>
              <CardDescription>
                Técnicas guiadas específicas para conciliar el sueño
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {meditationsForSleep.map((meditation, index) => (
                  <Card key={index} className="border-l-4 border-purple-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{meditation.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {meditation.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{meditation.duration}</Badge>
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Comenzar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-sm text-blue-700">
                <strong>💡 Tip:</strong> Las meditaciones guiadas estarán disponibles en la próxima actualización. 
                Por ahora, puedes usar las técnicas de respiración de la sección de Meditación.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          {/* Why Sleep is Important */}
          <Card>
            <CardHeader>
              <CardTitle>🌙 ¿Por qué es tan importante el sueño?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                El sueño no es tiempo perdido, es cuando tu cuerpo y mente se reparan, consolidan memorias 
                y se preparan para el día siguiente. Durante el sueño ocurren procesos vitales que no 
                pueden realizarse durante la vigilia.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Salud Mental</div>
                    <div className="text-muted-foreground">Consolidación de memoria, regulación emocional, creatividad</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Salud Física</div>
                    <div className="text-muted-foreground">Reparación celular, crecimiento, sistema inmune</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Rendimiento</div>
                    <div className="text-muted-foreground">Concentración, toma de decisiones, productividad</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sleep Science */}
          <Card>
            <CardHeader>
              <CardTitle>🧬 Ciencia del Sueño</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Ciclos de Sueño</h4>
                <p className="text-muted-foreground mb-2">
                  Una noche típica incluye 4-6 ciclos de 90 minutos, cada uno con diferentes fases:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><strong>Fase 1:</strong> Transición ligera entre vigilia y sueño (5%)</li>
                  <li><strong>Fase 2:</strong> Sueño ligero, la mayor parte de la noche (45-55%)</li>
                  <li><strong>Fase 3:</strong> Sueño profundo, reparación física (15-25%)</li>
                  <li><strong>REM:</strong> Sueños vívidos, consolidación de memoria (20-25%)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Ritmo Circadiano</h4>
                <p className="text-muted-foreground">
                  Tu reloj biológico interno regula cuando sientes sueño y cuando despiertas. 
                  La luz solar, temperatura y horarios de comida influyen en este ritmo natural de 24 horas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sleep Disorders Warning */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800">⚠️ Cuándo Buscar Ayuda Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-yellow-700 space-y-2">
                <p>Consulta a un especialista en sueño si experimentas:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ronquidos fuertes con pausas respiratorias</li>
                  <li>Insomnio crónico (más de 3 semanas)</li>
                  <li>Somnolencia extrema durante el día</li>
                  <li>Movimientos anormales durante el sueño</li>
                  <li>Pesadillas frecuentes que interfieren con el descanso</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

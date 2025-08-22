"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { 
  Brain, 
  Heart, 
  Shield, 
  Target,
  Activity,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Zap,
  Users,
  Book,
  Timer,
  Play,
  Pause,
  Settings,
  MessageCircle
} from 'lucide-react';

interface MentalHealthExercise {
  id: string;
  name: string;
  category: 'mindfulness' | 'cognitive' | 'behavioral' | 'stress';
  duration: string;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  description: string;
  benefits: string[];
  instructions: string[];
  scientificBasis: string;
}

interface MentalHealthAssessment {
  date: string;
  stress: number;
  anxiety: number;
  mood: number;
  focus: number;
  sleep: number;
  notes: string;
}

const mentalHealthExercises: MentalHealthExercise[] = [
  // Mindfulness
  {
    id: 'breathing-4-7-8',
    name: 'Respiración 4-7-8',
    category: 'mindfulness',
    duration: '5-10 minutos',
    difficulty: 'Fácil',
    description: 'Técnica de respiración para activar el sistema nervioso parasimpático',
    benefits: ['Reduce ansiedad instantáneamente', 'Mejora calidad del sueño', 'Baja presión arterial'],
    instructions: [
      'Siéntate cómodamente con la espalda recta',
      'Exhala completamente por la boca',
      'Inhala por la nariz contando hasta 4',
      'Retén la respiración contando hasta 7',
      'Exhala por la boca contando hasta 8',
      'Repite el ciclo 4-8 veces'
    ],
    scientificBasis: 'Activación del nervio vago, reducción de cortisol en 3-5 minutos'
  },
  {
    id: 'body-scan',
    name: 'Escaneo Corporal',
    category: 'mindfulness',
    duration: '10-20 minutos',
    difficulty: 'Moderado',
    description: 'Meditación de consciencia corporal para reducir tensión',
    benefits: ['Reduce tensión muscular', 'Mejora consciencia corporal', 'Calma sistema nervioso'],
    instructions: [
      'Acuéstate en posición cómoda',
      'Cierra los ojos y respira naturalmente',
      'Enfoca atención en los dedos de los pies',
      'Mueve la atención lentamente por todo el cuerpo',
      'Nota tensiones sin intentar cambiarlas',
      'Termina con 3 respiraciones profundas'
    ],
    scientificBasis: 'Activación de corteza somatosensorial, reducción actividad amígdala'
  },
  {
    id: 'mindful-observation',
    name: 'Observación Consciente',
    category: 'mindfulness',
    duration: '5-15 minutos',
    difficulty: 'Fácil',
    description: 'Práctica de atención plena a través de observación detallada',
    benefits: ['Mejora concentración', 'Reduce rumia mental', 'Aumenta presente'],
    instructions: [
      'Elige un objeto natural (planta, piedra, fruta)',
      'Observa como si fuera la primera vez',
      'Nota colores, texturas, formas, sombras',
      'Si la mente divaga, vuelve gentilmente',
      'Observa sin juzgar ni analizar',
      'Termina agradeciendo la experiencia'
    ],
    scientificBasis: 'Fortalecimiento de corteza prefrontal, reducción de red neuronal por defecto'
  },

  // Cognitive
  {
    id: 'thought-challenging',
    name: 'Desafío de Pensamientos',
    category: 'cognitive',
    duration: '10-15 minutos',
    difficulty: 'Moderado',
    description: 'Técnica cognitiva para cuestionar pensamientos negativos automáticos',
    benefits: ['Reduce pensamientos catastrofistas', 'Mejora perspectiva', 'Aumenta flexibilidad mental'],
    instructions: [
      'Identifica un pensamiento negativo recurrente',
      'Escríbelo textualmente',
      'Pregúntate: ¿Es esto realmente cierto?',
      '¿Qué evidencia tengo a favor y en contra?',
      '¿Cómo vería esto un amigo?',
      'Reformula el pensamiento de manera más realista'
    ],
    scientificBasis: 'Reestructuración cognitiva basada en TCC, cambios en corteza prefrontal'
  },
  {
    id: 'gratitude-practice',
    name: 'Práctica de Gratitud Específica',
    category: 'cognitive',
    duration: '5-10 minutos',
    difficulty: 'Fácil',
    description: 'Ejercicio científicamente validado para mejorar bienestar',
    benefits: ['Aumenta dopamina', 'Mejora relaciones', 'Reduce depresión'],
    instructions: [
      'Piensa en 3 cosas específicas por las que estás agradecido',
      'Ve más allá de lo obvio, encuentra detalles únicos',
      'Escribe por qué cada una es importante para ti',
      'Imagina cómo sería tu vida sin estas cosas',
      'Siente físicamente la gratitud en tu cuerpo',
      'Considera cómo puedes expresar esta gratitud hoy'
    ],
    scientificBasis: 'Aumento de dopamina y serotonina, cambios en corteza orbitofrontal'
  },

  // Behavioral
  {
    id: 'progressive-muscle-relaxation',
    name: 'Relajación Muscular Progresiva',
    category: 'behavioral',
    duration: '15-20 minutos',
    difficulty: 'Fácil',
    description: 'Técnica para reducir tensión física y mental',
    benefits: ['Reduce tensión muscular', 'Mejora sueño', 'Baja presión arterial'],
    instructions: [
      'Acuéstate cómodamente',
      'Tensa los músculos de los pies por 5 segundos',
      'Relaja completamente y nota la diferencia',
      'Continúa con pantorrillas, muslos, abdomen',
      'Sigue con brazos, hombros, cuello y cara',
      'Termina relajando todo el cuerpo 5 minutos'
    ],
    scientificBasis: 'Activación parasimpática, reducción de tensión muscular'
  },
  {
    id: 'behavioral-activation',
    name: 'Activación Conductual',
    category: 'behavioral',
    duration: '20-30 minutos',
    difficulty: 'Moderado',
    description: 'Técnica para combatir depresión y apatía mediante acción',
    benefits: ['Mejora estado de ánimo', 'Aumenta motivación', 'Combate depresión'],
    instructions: [
      'Lista 3 actividades que antes disfrutabas',
      'Elige la más fácil de realizar hoy',
      'Planifica exactamente cuándo y dónde la harás',
      'Comprométete a hacerla sin esperar ganas',
      'Realiza la actividad incluso si no sientes motivación',
      'Observa cambios en tu estado de ánimo después'
    ],
    scientificBasis: 'Activación de circuitos de recompensa, aumento de dopamina'
  },

  // Stress Management
  {
    id: 'stress-inoculation',
    name: 'Inoculación de Estrés',
    category: 'stress',
    duration: '15-25 minutos',
    difficulty: 'Difícil',
    description: 'Técnica para desarrollar resistencia al estrés futuro',
    benefits: ['Mejora resistencia al estrés', 'Aumenta confianza', 'Reduce ansiedad anticipatoria'],
    instructions: [
      'Identifica una situación estresante futura',
      'Imagina vívidamente la situación',
      'Visualiza diferentes escenarios posibles',
      'Practica mentalmente estrategias de afrontamiento',
      'Imagínate manejando exitosamente la situación',
      'Refuerza tu confianza en tus capacidades'
    ],
    scientificBasis: 'Fortalecimiento de corteza prefrontal, reducción de respuesta de estrés'
  },
  {
    id: 'quick-coherence',
    name: 'Coherencia Rápida',
    category: 'stress',
    duration: '3-5 minutos',
    difficulty: 'Fácil',
    description: 'Técnica rápida para equilibrar sistema nervioso',
    benefits: ['Equilibrio inmediato', 'Mejora toma de decisiones', 'Reduce cortisol'],
    instructions: [
      'Enfoca atención en el área del corazón',
      'Respira lenta y profundamente (5 seg in, 5 seg out)',
      'Activa un sentimiento positivo (gratitud, aprecio)',
      'Mantén la combinación: respiración + emoción positiva',
      'Continúa hasta sentir mayor calma y claridad',
      'Usa esta técnica antes de situaciones desafiantes'
    ],
    scientificBasis: 'Coherencia cardíaca, sincronización sistema nervioso'
  }
];

export default function MentalHealth() {
  const [selectedExercise, setSelectedExercise] = useState<MentalHealthExercise | null>(null);
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessment, setAssessment] = useState<Partial<MentalHealthAssessment>>({});
  const [practiceLog, setPracticeLog] = useState<{[key: string]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState<'mindfulness' | 'cognitive' | 'behavioral' | 'stress'>('mindfulness');

  const startExercise = (exercise: MentalHealthExercise) => {
    setSelectedExercise(exercise);
    setIsExerciseActive(true);
    
    // Parse duration and set timer
    const minutes = parseInt(exercise.duration.split('-')[0]);
    setExerciseTimer(minutes * 60);
  };

  const completeExercise = () => {
    if (selectedExercise) {
      setPracticeLog(prev => ({
        ...prev,
        [selectedExercise.id]: (prev[selectedExercise.id] || 0) + 1
      }));
    }
    setIsExerciseActive(false);
    setSelectedExercise(null);
  };

  const saveAssessment = () => {
    const newAssessment: MentalHealthAssessment = {
      date: new Date().toISOString().split('T')[0],
      stress: assessment.stress || 5,
      anxiety: assessment.anxiety || 5,
      mood: assessment.mood || 5,
      focus: assessment.focus || 5,
      sleep: assessment.sleep || 5,
      notes: assessment.notes || ''
    };
    
    // Save to localStorage or send to backend
    const assessments = JSON.parse(localStorage.getItem('mentalHealthAssessments') || '[]');
    assessments.push(newAssessment);
    localStorage.setItem('mentalHealthAssessments', JSON.stringify(assessments));
    
    setShowAssessment(false);
    setAssessment({});
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isExerciseActive && exerciseTimer > 0) {
      interval = setInterval(() => {
        setExerciseTimer(prev => prev - 1);
      }, 1000);
    } else if (exerciseTimer === 0 && isExerciseActive) {
      setIsExerciseActive(false);
    }
    return () => clearInterval(interval);
  }, [isExerciseActive, exerciseTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mindfulness': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cognitive': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'behavioral': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'stress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Salud Mental
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Fortalece tu mente con técnicas científicamente validadas para el bienestar mental y emocional
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {mentalHealthExercises.filter(ex => (practiceLog[ex.id] || 0) >= 3).length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Técnicas Dominadas</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(practiceLog).reduce((acc, val) => acc + val, 0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Sesiones Completadas</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.max(...Object.values(practiceLog), 0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Racha Máxima</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <Button onClick={() => setShowAssessment(true)} className="w-full h-full">
              <Activity className="w-4 h-4 mr-2" />
              Evaluar Bienestar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {['mindfulness', 'cognitive', 'behavioral', 'stress'].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category as any)}
            className="mb-2"
          >
            {category === 'mindfulness' && 'Mindfulness'}
            {category === 'cognitive' && 'Cognitivo'}
            {category === 'behavioral' && 'Conductual'}
            {category === 'stress' && 'Estrés'}
          </Button>
        ))}
      </div>

      {/* Exercises Grid */}
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentalHealthExercises.filter(ex => ex.category === selectedCategory).map((exercise) => (
            <Card key={exercise.id} className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    {exercise.name}
                  </CardTitle>
                  <Badge className={getCategoryColor(exercise.category)}>
                    {exercise.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {exercise.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{exercise.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {practiceLog[exercise.id] || 0} veces
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Beneficios:</h4>
                  <ul className="text-sm space-y-1">
                    {exercise.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => startExercise(exercise)}
                    className="flex-1"
                    disabled={isExerciseActive}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Comenzar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <Book className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && !isExerciseActive && (
        <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                {selectedExercise.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <Badge className={getCategoryColor(selectedExercise.category)}>
                  {selectedExercise.category}
                </Badge>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{selectedExercise.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Duración</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedExercise.duration}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Dificultad</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedExercise.difficulty}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Instrucciones paso a paso:</h3>
                <ol className="space-y-2">
                  {selectedExercise.instructions.map((instruction, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm flex items-center justify-center font-medium">
                        {i + 1}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Base científica:</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  {selectedExercise.scientificBasis}
                </p>
              </div>

              <Button 
                onClick={() => startExercise(selectedExercise)}
                className="w-full"
                disabled={isExerciseActive}
              >
                <Play className="w-4 h-4 mr-2" />
                Comenzar Ejercicio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Exercise Active Modal */}
      {isExerciseActive && selectedExercise && (
        <Dialog open={isExerciseActive} onOpenChange={() => setIsExerciseActive(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedExercise.name}</DialogTitle>
            </DialogHeader>

            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🧠</div>
              
              {exerciseTimer > 0 && (
                <div className="text-3xl font-mono font-bold text-blue-600">
                  {formatTime(exerciseTimer)}
                </div>
              )}

              <div className="space-y-3">
                <h3 className="font-medium">Sigue estas instrucciones:</h3>
                <div className="text-sm space-y-2">
                  {selectedExercise.instructions.map((instruction, i) => (
                    <div key={i} className="p-2 bg-gray-50 dark:bg-gray-800 rounded border-l-4 border-blue-500">
                      {i + 1}. {instruction}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button onClick={completeExercise} className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completar
                </Button>
                <Button variant="outline" onClick={() => setIsExerciseActive(false)}>
                  Pausar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Assessment Modal */}
      <Dialog open={showAssessment} onOpenChange={setShowAssessment}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Evaluación de Bienestar Mental
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {['stress', 'anxiety', 'mood', 'focus', 'sleep'].map((metric) => (
              <div key={metric} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium capitalize">
                    {metric === 'stress' ? 'Nivel de Estrés (1=muy bajo, 10=muy alto)' :
                     metric === 'anxiety' ? 'Ansiedad (1=muy calmado, 10=muy ansioso)' :
                     metric === 'mood' ? 'Estado de Ánimo (1=muy triste, 10=muy feliz)' :
                     metric === 'focus' ? 'Capacidad de Concentración (1=muy disperso, 10=muy enfocado)' : 
                     'Calidad del Sueño (1=muy malo, 10=excelente)'}
                  </label>
                  <span className="text-sm text-gray-500">
                    {assessment[metric as keyof typeof assessment] || 5}/10
                  </span>
                </div>
                <Slider
                  value={[assessment[metric as keyof typeof assessment] || 5]}
                  onValueChange={([value]) => setAssessment(prev => ({...prev, [metric]: value}))}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}

            <div className="space-y-2">
              <label className="text-sm font-medium">Notas sobre tu estado mental hoy</label>
              <Textarea
                value={assessment.notes || ''}
                onChange={(e) => setAssessment(prev => ({...prev, notes: e.target.value}))}
                placeholder="¿Qué factores influyeron en tu bienestar mental hoy?"
                className="min-h-20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={saveAssessment} className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Guardar Evaluación
              </Button>
              <Button variant="outline" onClick={() => setShowAssessment(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

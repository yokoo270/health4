
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Heart, Brain, Smile, Frown, Meh, Angry, Surprised, Calendar, TrendingUp, Activity } from 'lucide-react';

const emotions = [
  { id: 'joy', name: 'Alegría', icon: '😄', color: 'text-yellow-500', description: 'Sentimiento de felicidad y satisfacción' },
  { id: 'sadness', name: 'Tristeza', icon: '😢', color: 'text-blue-500', description: 'Sentimiento de pena o melancolía' },
  { id: 'anger', name: 'Ira', icon: '😠', color: 'text-red-500', description: 'Sentimiento de enojo o frustración' },
  { id: 'fear', name: 'Miedo', icon: '😨', color: 'text-purple-500', description: 'Sentimiento de temor o ansiedad' },
  { id: 'surprise', name: 'Sorpresa', icon: '😲', color: 'text-orange-500', description: 'Reacción ante algo inesperado' },
  { id: 'disgust', name: 'Asco', icon: '🤢', color: 'text-green-500', description: 'Rechazo hacia algo desagradable' },
  { id: 'love', name: 'Amor', icon: '🥰', color: 'text-pink-500', description: 'Sentimiento de afecto y cariño profundo' },
  { id: 'anxiety', name: 'Ansiedad', icon: '😰', color: 'text-gray-500', description: 'Preocupación excesiva por el futuro' },
  { id: 'excitement', name: 'Emoción', icon: '🤩', color: 'text-cyan-500', description: 'Entusiasmo y energía positiva' },
  { id: 'peace', name: 'Paz', icon: '😌', color: 'text-green-400', description: 'Estado de tranquilidad y serenidad' }
];

const moodLevels = [
  { value: 1, emoji: '😢', label: 'Muy mal', color: 'bg-red-500' },
  { value: 2, emoji: '😞', label: 'Mal', color: 'bg-orange-500' },
  { value: 3, emoji: '😐', label: 'Regular', color: 'bg-yellow-500' },
  { value: 4, emoji: '🙂', label: 'Bien', color: 'bg-blue-500' },
  { value: 5, emoji: '😄', label: 'Muy bien', color: 'bg-green-500' }
];

const regulationTechniques = [
  {
    id: 'breathing',
    name: 'Respiración Profunda',
    description: 'Técnica rápida para calmar el sistema nervioso',
    steps: [
      'Siéntate cómodamente con la espalda recta',
      'Inhala lentamente por la nariz durante 4 segundos',
      'Mantén el aire en los pulmones por 4 segundos',
      'Exhala lentamente por la boca durante 6 segundos',
      'Repite el ciclo 5-10 veces'
    ],
    duration: '2-5 minutos',
    effectiveness: 'Alta para ansiedad y estrés'
  },
  {
    id: 'grounding',
    name: 'Técnica 5-4-3-2-1',
    description: 'Grounding para reconectar con el presente',
    steps: [
      'Identifica 5 cosas que puedas ver',
      'Identifica 4 cosas que puedas tocar',
      'Identifica 3 cosas que puedas escuchar',
      'Identifica 2 cosas que puedas oler',
      'Identifica 1 cosa que puedas saborear'
    ],
    duration: '3-5 minutos',
    effectiveness: 'Excelente para ataques de pánico'
  },
  {
    id: 'reframing',
    name: 'Reestructuración Cognitiva',
    description: 'Cambiar perspectiva sobre situaciones difíciles',
    steps: [
      'Identifica el pensamiento negativo automático',
      'Pregúntate: ¿Es este pensamiento realista?',
      'Busca evidencia a favor y en contra',
      'Reformula el pensamiento de manera más equilibrada',
      'Practica el nuevo pensamiento'
    ],
    duration: '5-10 minutos',
    effectiveness: 'Muy útil para depresión y ansiedad'
  }
];

const strengtheningFactors = [
  {
    category: 'Físicos',
    factors: [
      { name: 'Ejercicio regular', impact: 'Alto', description: 'Libera endorfinas y reduce estrés' },
      { name: 'Sueño adecuado', impact: 'Alto', description: '7-9 horas mejoran regulación emocional' },
      { name: 'Alimentación balanceada', impact: 'Medio', description: 'Nutrientes esenciales para el cerebro' }
    ]
  },
  {
    category: 'Mentales',
    factors: [
      { name: 'Meditación', impact: 'Alto', description: 'Fortalece la conciencia emocional' },
      { name: 'Gratitud diaria', impact: 'Medio', description: 'Cambia el enfoque hacia lo positivo' },
      { name: 'Aprendizaje continuo', impact: 'Medio', description: 'Mantiene la mente activa y resiliente' }
    ]
  },
  {
    category: 'Sociales',
    factors: [
      { name: 'Relaciones sanas', impact: 'Alto', description: 'Red de apoyo emocional' },
      { name: 'Comunicación abierta', impact: 'Alto', description: 'Expresar emociones de forma saludable' },
      { name: 'Actividades grupales', impact: 'Medio', description: 'Sentido de pertenencia y conexión' }
    ]
  }
];

export default function EmotionalHealth() {
  const [currentMood, setCurrentMood] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [selectedTechnique, setSelectedTechnique] = useState(regulationTechniques[0]);

  const handleMoodLog = () => {
    if (currentMood) {
      const newEntry = {
        date: new Date().toISOString().split('T')[0],
        mood: currentMood,
        emotion: selectedEmotion,
        note: journalEntry,
        timestamp: new Date()
      };
      
      setMoodHistory(prev => [...prev.slice(-29), newEntry]); // Keep last 30 entries
      setJournalEntry('');
      setCurrentMood(null);
      setSelectedEmotion(null);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Salud Emocional</h1>
        <p className="text-gray-600 dark:text-gray-300">Inteligencia emocional y bienestar</p>
      </div>

      <Tabs defaultValue="recognition" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recognition">Reconocimiento</TabsTrigger>
          <TabsTrigger value="regulation">Regulación</TabsTrigger>
          <TabsTrigger value="strengthening">Fortalecimiento</TabsTrigger>
          <TabsTrigger value="tracking">Seguimiento</TabsTrigger>
        </TabsList>

        {/* Reconocimiento Emocional */}
        <TabsContent value="recognition" className="space-y-6">
          {/* Información Educativa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Brain className="w-5 h-5" />
                ¿Qué es el Reconocimiento Emocional?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                El reconocimiento emocional es la capacidad de identificar, entender y nombrar nuestras emociones 
                en el momento que las experimentamos. Es el primer paso hacia la inteligencia emocional.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">¿Por qué es importante?</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Mejor toma de decisiones</li>
                    <li>• Relaciones más saludables</li>
                    <li>• Reducción del estrés</li>
                    <li>• Mayor autocontrol</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Beneficios para otros tipos de salud:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• <strong>Mental:</strong> Reduce ansiedad y depresión</li>
                    <li>• <strong>Física:</strong> Mejora sistema inmune</li>
                    <li>• <strong>Social:</strong> Comunicación más efectiva</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Glosario de Emociones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Glosario de Emociones</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Aprende a identificar y nombrar tus emociones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {emotions.map((emotion) => (
                  <div
                    key={emotion.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedEmotion === emotion.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => setSelectedEmotion(selectedEmotion === emotion.id ? null : emotion.id)}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-2xl">{emotion.icon}</div>
                      <div className={`font-medium text-sm ${emotion.color}`}>{emotion.name}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedEmotion && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {emotions.find(e => e.id === selectedEmotion)?.name}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {emotions.find(e => e.id === selectedEmotion)?.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Registro de Estado de Ánimo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">¿Cómo te sientes hoy?</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Registra tu estado de ánimo para hacer seguimiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-3">
                {moodLevels.map((mood) => (
                  <Button
                    key={mood.value}
                    variant={currentMood === mood.value ? 'default' : 'outline'}
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => setCurrentMood(mood.value)}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                ))}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Notas adicionales (opcional):
                </label>
                <Textarea
                  placeholder="¿Qué ha influido en tu estado de ánimo hoy?"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  rows={3}
                />
              </div>
              
              <Button
                onClick={handleMoodLog}
                disabled={!currentMood}
                className="w-full"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Registrar Estado de Ánimo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regulación Emocional */}
        <TabsContent value="regulation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Técnicas de Regulación Emocional</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Herramientas prácticas para manejar emociones intensas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {regulationTechniques.map((technique) => (
                  <Card key={technique.id} className={selectedTechnique.id === technique.id ? 'ring-2 ring-blue-500' : ''}>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900 dark:text-white">{technique.name}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">{technique.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>⏱️ {technique.duration}</span>
                        <span>✨ {technique.effectiveness}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Pasos:</h4>
                        <ol className="space-y-1">
                          {technique.steps.map((step, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <Button
                        onClick={() => setSelectedTechnique(technique)}
                        className="w-full"
                        variant={selectedTechnique.id === technique.id ? 'default' : 'outline'}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Practicar {technique.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Respirómetro Virtual */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Respirómetro Virtual</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Ejercicio guiado de respiración para regular emociones
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Activity className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Respiración 4-7-8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Inhala 4 seg → Mantén 7 seg → Exhala 8 seg
                </p>
              </div>
              
              <Button size="lg">
                <Heart className="w-5 h-5 mr-2" />
                Comenzar Respiración Guiada
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fortalecimiento Emocional */}
        <TabsContent value="strengthening" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Factores que Fortalecen la Salud Emocional</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Elementos clave para desarrollar resistencia emocional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strengtheningFactors.map((category) => (
                  <div key={category.category} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Factores {category.category}
                    </h3>
                    
                    <div className="grid gap-3">
                      {category.factors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="space-y-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{factor.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{factor.description}</p>
                          </div>
                          <Badge
                            variant={factor.impact === 'Alto' ? 'default' : factor.impact === 'Medio' ? 'secondary' : 'outline'}
                          >
                            {factor.impact}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Neurociencia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Brain className="w-5 h-5" />
                Neurociencia de las Emociones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Las emociones se procesan principalmente en el sistema límbico, especialmente en la amígdala. 
                El entrenamiento emocional puede modificar físicamente el cerebro gracias a la neuroplasticidad.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Cambios Neurológicos:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Fortalecimiento de la corteza prefrontal</li>
                    <li>• Regulación de la amígdala</li>
                    <li>• Mejor comunicación entre regiones</li>
                    <li>• Aumento de materia gris</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Beneficios Medibles:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 30% menos probabilidad de burnout</li>
                    <li>• Mejor toma de decisiones</li>
                    <li>• Mayor autocontrol</li>
                    <li>• Incremento en bienestar</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seguimiento */}
        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <TrendingUp className="w-5 h-5" />
                Evolución de tu Estado de Ánimo
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Historial de los últimos 30 días
              </CardDescription>
            </CardHeader>
            <CardContent>
              {moodHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    Aún no tienes registros. Comienza registrando tu estado de ánimo en la pestaña "Reconocimiento".
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2">
                    {moodHistory.slice(-7).map((entry, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl mb-1">
                          {moodLevels.find(m => m.value === entry.mood)?.emoji}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(entry.date).toLocaleDateString('es', { weekday: 'short' })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Promedio semanal:</h4>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(moodHistory.slice(-7).reduce((acc, entry) => acc + entry.mood, 0) / Math.min(moodHistory.length, 7)) * 20} 
                        className="flex-1" 
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {((moodHistory.slice(-7).reduce((acc, entry) => acc + entry.mood, 0) / Math.min(moodHistory.length, 7)) || 0).toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Diario Emocional */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Diario Emocional Guiado</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Reflexiona sobre tus emociones y patrones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    ¿Qué emociones has experimentado hoy?
                  </label>
                  <Textarea placeholder="Describe las emociones que has sentido..." rows={2} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    ¿Qué las causó?
                  </label>
                  <Textarea placeholder="Identifica los desencadenantes..." rows={2} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    ¿Cómo las manejaste?
                  </label>
                  <Textarea placeholder="Describe las estrategias que usaste..." rows={2} />
                </div>
              </div>
              
              <Button className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Guardar Entrada del Diario
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

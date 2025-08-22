"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Heart, Dumbbell, Apple, Target, Star, TrendingUp, Clock } from "lucide-react"

interface Recommendation {
  id: string;
  type: 'fitness' | 'nutrition' | 'mental' | 'social';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  impact: number;
  category: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'fitness',
    title: 'Entrenamiento de Fuerza Personalizado',
    description: 'Basado en tu nivel actual, te recomendamos una rutina Push-Pull-Leg 3 días por semana',
    priority: 'high',
    estimatedTime: '45-60 min',
    impact: 9,
    category: 'Fuerza'
  },
  {
    id: '2',
    type: 'nutrition',
    title: 'Optimización de Proteínas',
    description: 'Aumenta tu ingesta de proteína a 1.6g/kg para mejores resultados en masa muscular',
    priority: 'high',
    estimatedTime: '5 min/día',
    impact: 8,
    category: 'Nutrición'
  },
  {
    id: '3',
    type: 'mental',
    title: 'Meditación Matutina',
    description: 'Incorpora 10 minutos de meditación al despertar para reducir estrés',
    priority: 'medium',
    estimatedTime: '10 min',
    impact: 7,
    category: 'Bienestar Mental'
  },
  {
    id: '4',
    type: 'social',
    title: 'Actividad Social Semanal',
    description: 'Planifica al menos una actividad social por semana para mejorar conexiones',
    priority: 'medium',
    estimatedTime: '2-3 horas',
    impact: 6,
    category: 'Social'
  }
];

export default function PersonalizedRecommendations() {
  const [activeRecommendations, setActiveRecommendations] = useState(mockRecommendations);

  const getIcon = (type: string) => {
    switch (type) {
      case 'fitness': return <Dumbbell className="w-5 h-5 text-blue-500" />;
      case 'nutrition': return <Apple className="w-5 h-5 text-green-500" />;
      case 'mental': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'social': return <Heart className="w-5 h-5 text-red-500" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Brain className="w-5 h-5 text-purple-500" />
          Recomendaciones Personalizadas por IA
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Sugerencias inteligentes basadas en tu progreso y objetivos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeRecommendations.map((recommendation) => (
          <Card key={recommendation.id} className="border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getIcon(recommendation.type)}
                  <h3 className="font-semibold text-gray-900 dark:text-white">{recommendation.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(recommendation.priority)}>
                    {recommendation.priority}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{recommendation.impact}/10</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {recommendation.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {recommendation.estimatedTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {recommendation.category}
                  </span>
                </div>
                <Button size="sm" variant="outline">
                  Aplicar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip de IA:</strong> Estas recomendaciones se actualizan automáticamente basándose en tu progreso y nuevos datos de salud.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

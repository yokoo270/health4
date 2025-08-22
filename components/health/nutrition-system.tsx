
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, Scan, Search, Camera, Book, TrendingUp, Target, Info } from 'lucide-react';
import FoodSearch from '@/components/food/food-search';

const nutritionInfo = [
  {
    title: 'Importancia de una Dieta Equilibrada',
    content: 'Una alimentación balanceada proporciona todos los nutrientes necesarios para el funcionamiento óptimo del cuerpo, mejora la energía, fortalece el sistema inmune y previene enfermedades crónicas.'
  },
  {
    title: 'Impacto en el Rendimiento Deportivo',
    content: 'La nutrición adecuada mejora la resistencia, acelera la recuperación, optimiza la síntesis de proteínas y mantiene niveles estables de energía durante el ejercicio.'
  },
  {
    title: 'Impacto en la Salud Mental',
    content: 'Los nutrientes afectan directamente la producción de neurotransmisores. Una dieta rica en omega-3, vitaminas B y antioxidantes mejora el estado de ánimo y la función cognitiva.'
  }
];

const nutritionMyths = [
  {
    myth: 'Los carbohidratos engordan',
    truth: 'Los carbohidratos complejos son esenciales para la energía. El problema está en el exceso de carbohidratos refinados y azúcares.',
    category: 'Macronutrientes'
  },
  {
    myth: 'Comer grasa te hace gordo',
    truth: 'Las grasas saludables (omega-3, monoinsaturadas) son necesarias para absorber vitaminas y producir hormonas.',
    category: 'Grasas'
  },
  {
    myth: 'Hay que comer cada 3 horas',
    truth: 'La frecuencia de comidas depende del estilo de vida. Lo importante es el total calórico y la calidad nutricional.',
    category: 'Timing'
  },
  {
    myth: 'Los suplementos reemplazan una mala dieta',
    truth: 'Los suplementos complementan, no reemplazan. Una dieta variada siempre es la base de la buena nutrición.',
    category: 'Suplementos'
  }
];

const healthBenefits = [
  {
    category: 'Salud Física',
    benefits: [
      'Fortalece el sistema inmunológico',
      'Mejora la composición corporal',
      'Reduce riesgo de enfermedades cardiovasculares',
      'Optimiza la función digestiva'
    ]
  },
  {
    category: 'Salud Mental',
    benefits: [
      'Mejora el estado de ánimo',
      'Aumenta la concentración',
      'Reduce la ansiedad y depresión',
      'Mejora la calidad del sueño'
    ]
  },
  {
    category: 'Rendimiento',
    benefits: [
      'Aumenta los niveles de energía',
      'Mejora la recuperación post-ejercicio',
      'Optimiza el rendimiento cognitivo',
      'Aumenta la resistencia física'
    ]
  }
];

const sampleRecipes = [
  {
    id: 1,
    name: 'Ensalada de Quinoa y Vegetales',
    ingredients: ['Quinoa', 'Tomate', 'Pepino', 'Aguacate', 'Espinaca'],
    calories: 350,
    protein: 12,
    carbs: 45,
    fat: 14,
    time: '15 min'
  },
  {
    id: 2,
    name: 'Pollo con Verduras al Horno',
    ingredients: ['Pechuga de pollo', 'Brócoli', 'Zanahoria', 'Aceite de oliva'],
    calories: 420,
    protein: 35,
    carbs: 18,
    fat: 22,
    time: '30 min'
  },
  {
    id: 3,
    name: 'Smoothie Verde Energético',
    ingredients: ['Espinaca', 'Plátano', 'Manzana', 'Proteína en polvo', 'Agua de coco'],
    calories: 280,
    protein: 25,
    carbs: 35,
    fat: 8,
    time: '5 min'
  }
];

export default function NutritionSystem() {
  const [searchIngredients, setSearchIngredients] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(sampleRecipes);

  const handleIngredientSearch = () => {
    if (searchIngredients.trim()) {
      const filtered = sampleRecipes.filter(recipe =>
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchIngredients.toLowerCase())
        )
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(sampleRecipes);
    }
  };

  const getHealthColor = (value, type) => {
    if (type === 'calories') {
      return value < 300 ? 'text-green-600' : value < 500 ? 'text-yellow-600' : 'text-red-600';
    }
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sistema de Nutrición</h1>
        <p className="text-gray-600 dark:text-gray-300">Alimentación inteligente para tus objetivos</p>
      </div>

      <Tabs defaultValue="scanner" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scanner">Escáner</TabsTrigger>
          <TabsTrigger value="recipes">Recetas</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
          <TabsTrigger value="analysis">Análisis IA</TabsTrigger>
        </TabsList>

        {/* Escáner de Alimentos */}
        <TabsContent value="scanner" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Scan className="w-5 h-5" />
                  Escáner de Código de Barras
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Escanea productos para obtener información nutricional
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Scan className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Apunta la cámara al código de barras del producto
                  </p>
                  <Button className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Abrir Escáner
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Características:</h4>
                  <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Información nutricional completa</li>
                    <li>• Etiquetas de salud codificadas por colores</li>
                    <li>• Recomendaciones personalizadas</li>
                    <li>• Historial de productos escaneados</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Search className="w-5 h-5" />
                  Búsqueda de Alimentos
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Busca alimentos en nuestra base de datos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FoodSearch 
                  onProductSelect={() => {}}
                  placeholder="Buscar alimentos..."
                  showScanner={false}
                />
              </CardContent>
            </Card>
          </div>

          {/* Etiquetas de Salud */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Sistema de Etiquetas de Salud</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Clasificación nutricional simplificada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    🟢
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Verde - Muy Saludable</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">Alto en nutrientes, bajo en procesados</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                    🟡
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Amarillo - Decente</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">Consumo moderado recomendado</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    🔴
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-200">Rojo - Poco Saludable</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">Alto en azúcares/grasas trans</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Buscador de Recetas */}
        <TabsContent value="recipes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Buscador de Recetas por Ingredientes</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Encuentra recetas que contengan los ingredientes que tienes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe un ingrediente (ej: pollo, quinoa, aguacate)"
                  value={searchIngredients}
                  onChange={(e) => setSearchIngredients(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleIngredientSearch()}
                />
                <Button onClick={handleIngredientSearch}>
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
              
              <div className="grid gap-4">
                {filteredRecipes.map((recipe) => (
                  <Card key={recipe.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{recipe.name}</h3>
                        <Badge variant="outline">{recipe.time}</Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ingredientes:</h4>
                          <div className="flex flex-wrap gap-1">
                            {recipe.ingredients.map((ingredient, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Información Nutricional:</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className={getHealthColor(recipe.calories, 'calories')}>
                              🔥 {recipe.calories} kcal
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              🥩 {recipe.protein}g proteína
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              🍞 {recipe.carbs}g carbos
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              🥑 {recipe.fat}g grasa
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        <Book className="w-4 h-4 mr-2" />
                        Ver Receta Completa
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Información Educativa */}
        <TabsContent value="education" className="space-y-6">
          {/* Información Básica */}
          <div className="grid gap-6">
            {nutritionInfo.map((info, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{info.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Beneficios por Categoría */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Beneficios de una Buena Nutrición</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {healthBenefits.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{category.category}</h3>
                    <ul className="space-y-2">
                      {category.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mitos y Verdades */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Mitos y Verdades sobre Nutrición</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {nutritionMyths.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Badge variant="destructive" className="mt-1">MITO</Badge>
                      <div className="flex-1 space-y-2">
                        <p className="font-medium text-gray-900 dark:text-white">{item.myth}</p>
                        <div className="flex items-start gap-3">
                          <Badge variant="default" className="mt-1">VERDAD</Badge>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{item.truth}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Análisis IA de Fotos */}
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Camera className="w-5 h-5" />
                Análisis de Platos con IA
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Toma una foto de tu comida y obtén análisis nutricional
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <Camera className="w-12 h-12 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Fotografía tu Plato</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Nuestra IA analizará los alimentos y calculará los macronutrientes aproximados
                  </p>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button>
                    <Camera className="w-4 h-4 mr-2" />
                    Tomar Foto
                  </Button>
                  <Button variant="outline">
                    📱 Desde Galería
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">¿Cómo funciona?</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Toma una foto clara de tu plato</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">La IA identifica los alimentos</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Recibe análisis nutricional</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  💡 Funciones Inteligentes
                </h4>
                <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  <li>• Cálculo automático de porciones</li>
                  <li>• Comparación con tus objetivos nutricionales</li>
                  <li>• Sugerencias de mejora</li>
                  <li>• Registro automático en tu diario alimenticio</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

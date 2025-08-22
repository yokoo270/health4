'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Leaf, 
  Factory, 
  Star, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Plus,
  Save,
  Share
} from 'lucide-react';
import { FoodProduct, NutritionScore, foodAPI } from '@/lib/food-api';
import { useState, useMemo } from 'react';

interface FoodInfoCardProps {
  product: FoodProduct;
  onSave?: (product: FoodProduct) => void;
  onAddToMeal?: (product: FoodProduct) => void;
  showActions?: boolean;
}

export default function FoodInfoCard({ 
  product, 
  onSave, 
  onAddToMeal, 
  showActions = true 
}: FoodInfoCardProps) {
  const [isSaving, setIsSaving] = useState(false);

  const nutritionScore = useMemo(() => {
    return foodAPI.calculateNutritionScore(product);
  }, [product]);

  const formattedNutrients = useMemo(() => {
    return foodAPI.formatNutrients(product);
  }, [product]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= 60) return <Info className="w-4 h-4 text-yellow-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true);
      try {
        await onSave(product);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.product_name,
          text: `${product.product_name} - Información nutricional`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      // Could show a toast here
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              {product.image_front_url ? (
                <img
                  src={product.image_front_url}
                  alt={product.product_name}
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-lg border flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Sin imagen</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.product_name}</h1>
                {product.brands && (
                  <p className="text-lg text-gray-600">{product.brands}</p>
                )}
                {product.quantity && (
                  <Badge variant="outline" className="mt-2">
                    {product.quantity}
                  </Badge>
                )}
              </div>

              {/* Nutrition Grades */}
              <div className="flex flex-wrap gap-3">
                {product.nutrition_grade && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Nutri-Score:</span>
                    <Badge 
                      className="uppercase font-bold text-white"
                      style={{ backgroundColor: foodAPI.getNutritionGradeColor(product.nutrition_grade) }}
                    >
                      {product.nutrition_grade}
                    </Badge>
                  </div>
                )}
                
                {product.nova_group && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">NOVA:</span>
                    <Badge variant="outline">
                      Grupo {product.nova_group}
                    </Badge>
                  </div>
                )}

                {product.ecoscore_grade && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Eco-Score:</span>
                    <Badge 
                      className="uppercase font-bold text-white"
                      style={{ backgroundColor: foodAPI.getNutritionGradeColor(product.ecoscore_grade) }}
                    >
                      {product.ecoscore_grade}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {showActions && (
                <div className="flex flex-wrap gap-2">
                  {onAddToMeal && (
                    <Button onClick={() => onAddToMeal(product)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Añadir a comida
                    </Button>
                  )}
                  {onSave && (
                    <Button 
                      variant="outline" 
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleShare}>
                    <Share className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="nutrition">Nutrición</TabsTrigger>
          <TabsTrigger value="analysis">Análisis</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
        </TabsList>

        {/* Nutrition Tab */}
        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Nutricional</CardTitle>
              <p className="text-sm text-muted-foreground">
                Valores por {product.nutrition_data_per || '100g'}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(formattedNutrients).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-4">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Puntuación General
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getScoreIcon(nutritionScore.overall)}
                  <span className="text-2xl font-bold">
                    {nutritionScore.overall}/100
                  </span>
                </div>
                <Progress value={nutritionScore.overall} className="flex-1 ml-4" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                  <div className="font-medium">Salud</div>
                  <div className={`text-lg font-bold ${getScoreColor(nutritionScore.health)}`}>
                    {nutritionScore.health}/100
                  </div>
                </div>
                
                <div className="text-center">
                  <Leaf className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <div className="font-medium">Ambiente</div>
                  <div className={`text-lg font-bold ${getScoreColor(nutritionScore.environment)}`}>
                    {nutritionScore.environment}/100
                  </div>
                </div>
                
                <div className="text-center">
                  <Factory className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <div className="font-medium">Procesamiento</div>
                  <div className={`text-lg font-bold ${getScoreColor(nutritionScore.processing)}`}>
                    {nutritionScore.processing}/100
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Análisis Detallado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(nutritionScore.details).map(([key, detail]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">{key.replace('_', ' ')}</span>
                        <Badge className={getStatusColor(detail.status)}>
                          {detail.status === 'excellent' && 'Excelente'}
                          {detail.status === 'good' && 'Bueno'}
                          {detail.status === 'moderate' && 'Moderado'}
                          {detail.status === 'poor' && 'Pobre'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {detail.value} {key === 'calories' ? 'kcal' : 'g'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${getScoreColor(detail.score)}`}>
                        {detail.score}/100
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ingredients Tab */}
        <TabsContent value="ingredients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ingredientes</CardTitle>
            </CardHeader>
            <CardContent>
              {product.ingredients_text ? (
                <p className="text-gray-700 leading-relaxed">
                  {product.ingredients_text}
                </p>
              ) : (
                <p className="text-gray-500 italic">
                  Información de ingredientes no disponible
                </p>
              )}
            </CardContent>
          </Card>

          {/* Allergens */}
          {product.allergens && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Alérgenos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    {product.allergens}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Additives */}
          {product.additives_tags && product.additives_tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Aditivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.additives_tags.map((additive, index) => (
                    <Badge key={index} variant="outline">
                      {additive.replace('en:', '')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información del Producto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.categories && (
                <div>
                  <h4 className="font-medium mb-2">Categorías</h4>
                  <p className="text-gray-600">{product.categories}</p>
                </div>
              )}

              {product.labels && (
                <div>
                  <h4 className="font-medium mb-2">Etiquetas</h4>
                  <p className="text-gray-600">{product.labels}</p>
                </div>
              )}

              {product.origins && (
                <div>
                  <h4 className="font-medium mb-2">Origen</h4>
                  <p className="text-gray-600">{product.origins}</p>
                </div>
              )}

              {product.manufacturing_places && (
                <div>
                  <h4 className="font-medium mb-2">Lugar de fabricación</h4>
                  <p className="text-gray-600">{product.manufacturing_places}</p>
                </div>
              )}

              {product.packaging && (
                <div>
                  <h4 className="font-medium mb-2">Envase</h4>
                  <p className="text-gray-600">{product.packaging}</p>
                </div>
              )}

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Código de barras</h4>
                <Badge variant="outline" className="font-mono">
                  {product.code}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

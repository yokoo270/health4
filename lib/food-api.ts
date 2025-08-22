export interface NutrientLevels {
  fat: 'low' | 'moderate' | 'high';
  saturated_fat: 'low' | 'moderate' | 'high';
  sugars: 'low' | 'moderate' | 'high';
  salt: 'low' | 'moderate' | 'high';
}

export interface Nutriments {
  energy_kj: number;
  energy_kcal: number;
  fat: number;
  saturated_fat: number;
  carbohydrates: number;
  sugars: number;
  fiber: number;
  proteins: number;
  salt: number;
  sodium: number;
  'vitamin-a': number;
  'vitamin-c': number;
  calcium: number;
  iron: number;
}

export interface FoodProduct {
  id: string;
  code: string;
  product_name: string;
  product_name_es?: string;
  generic_name?: string;
  brands: string;
  categories: string;
  labels?: string;
  quantity?: string;
  serving_size?: string;
  packaging?: string;
  manufacturing_places?: string;
  origins?: string;
  image_url?: string;
  image_front_url?: string;
  image_nutrition_url?: string;
  nutrition_grade?: 'a' | 'b' | 'c' | 'd' | 'e';
  nova_group?: 1 | 2 | 3 | 4;
  ecoscore_grade?: 'a' | 'b' | 'c' | 'd' | 'e';
  nutrient_levels?: NutrientLevels;
  nutriments: Partial<Nutriments>;
  ingredients_text?: string;
  ingredients_text_es?: string;
  allergens?: string;
  traces?: string;
  additives_tags?: string[];
  nutrition_data_per?: string;
  serving_quantity?: number;
}

export interface OpenFoodFactsResponse {
  code: string;
  product?: FoodProduct;
  status: number;
  status_verbose: string;
}

export interface NutritionScore {
  overall: number;
  health: number;
  environment: number;
  processing: number;
  details: {
    calories: { value: number; score: number; status: 'excellent' | 'good' | 'moderate' | 'poor' };
    fat: { value: number; score: number; status: 'excellent' | 'good' | 'moderate' | 'poor' };
    saturated_fat: { value: number; score: number; status: 'excellent' | 'good' | 'moderate' | 'poor' };
    sugars: { value: number; score: number; status: 'excellent' | 'good' | 'moderate' | 'poor' };
    salt: { value: number; score: number; status: 'excellent' | 'good' | 'moderate' | 'poor' };
    fiber: { value: number; score: number; status: 'excellent' | 'good' | 'moderate' | 'poor' };
    proteins: { value: number; score: number; status: 'excellent' | 'good' | 'moderate' | 'poor' };
  };
}

export interface FoodItem {
  id: string;
  name: string;
  brand: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servingSize: string;
  barcode?: string;
}


class FoodAPI {
  private baseURL = 'https://world.openfoodfacts.org/api/v2';

  async searchByBarcode(barcode: string): Promise<FoodProduct | null> {
    // Input validation
    if (!barcode || typeof barcode !== 'string') {
      throw new Error('El código de barras debe ser una cadena válida');
    }
    
    // Sanitize barcode - only allow alphanumeric characters
    const sanitizedBarcode = barcode.replace(/[^a-zA-Z0-9]/g, '');
    if (!sanitizedBarcode || sanitizedBarcode.length < 8 || sanitizedBarcode.length > 20) {
      throw new Error('El código de barras debe tener entre 8 y 20 caracteres');
    }

    try {
      const response = await fetch(`${this.baseURL}/product/${sanitizedBarcode}?fields=code,product_name,product_name_es,generic_name,brands,categories,labels,quantity,serving_size,packaging,manufacturing_places,origins,image_url,image_front_url,image_nutrition_url,nutrition_grade,nova_group,ecoscore_grade,nutrient_levels,nutriments,ingredients_text,ingredients_text_es,allergens,traces,additives_tags,nutrition_data_per,serving_quantity`, {
        headers: {
          'User-Agent': 'HealthMaxx/1.0',
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OpenFoodFactsResponse = await response.json();

      if (data.status === 1 && data.product) {
        return {
          id: data.product.code,
          code: data.product.code,
          product_name: data.product.product_name_es || data.product.product_name || 'Producto sin nombre',
          product_name_es: data.product.product_name_es,
          generic_name: data.product.generic_name,
          brands: data.product.brands || '',
          categories: data.product.categories || '',
          labels: data.product.labels,
          quantity: data.product.quantity,
          serving_size: data.product.serving_size,
          packaging: data.product.packaging,
          manufacturing_places: data.product.manufacturing_places,
          origins: data.product.origins,
          image_url: data.product.image_url,
          image_front_url: data.product.image_front_url,
          image_nutrition_url: data.product.image_nutrition_url,
          nutrition_grade: data.product.nutrition_grade,
          nova_group: data.product.nova_group,
          ecoscore_grade: data.product.ecoscore_grade,
          nutrient_levels: data.product.nutrient_levels,
          nutriments: data.product.nutriments || {},
          ingredients_text: data.product.ingredients_text_es || data.product.ingredients_text,
          ingredients_text_es: data.product.ingredients_text_es,
          allergens: data.product.allergens,
          traces: data.product.traces,
          additives_tags: data.product.additives_tags,
          nutrition_data_per: data.product.nutrition_data_per || '100g',
          serving_quantity: data.product.serving_quantity
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching product data:', error);
      throw new Error('Error al buscar el producto. Verifica tu conexión a internet.');
    }
  }

  async searchByText(query: string, page: number = 1): Promise<{ products: FoodProduct[]; count: number; page: number; pageSize: number }> {
    // Input validation
    if (!query || typeof query !== 'string') {
      throw new Error('La consulta de búsqueda debe ser una cadena válida');
    }
    
    const sanitizedQuery = query.trim();
    if (sanitizedQuery.length < 2 || sanitizedQuery.length > 100) {
      throw new Error('La consulta debe tener entre 2 y 100 caracteres');
    }
    
    if (page < 1 || page > 100) {
      throw new Error('El número de página debe estar entre 1 y 100');
    }

    try {
      const pageSize = 20;
      const response = await fetch(`${this.baseURL}/search?search_terms=${encodeURIComponent(sanitizedQuery)}&page=${page}&page_size=${pageSize}&fields=code,product_name,product_name_es,brands,categories,image_front_url,nutrition_grade,nova_group,nutriments&sort_by=popularity`, {
        headers: {
          'User-Agent': 'HealthMaxx/1.0',
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const products: FoodProduct[] = data.products?.map((product: any) => ({
        id: product.code,
        code: product.code,
        product_name: product.product_name_es || product.product_name || 'Producto sin nombre',
        product_name_es: product.product_name_es,
        brands: product.brands || '',
        categories: product.categories || '',
        image_front_url: product.image_front_url,
        nutrition_grade: product.nutrition_grade,
        nova_group: product.nova_group,
        nutriments: product.nutriments || {}
      })) || [];

      return {
        products,
        count: data.count || 0,
        page: data.page || 1,
        pageSize: data.page_size || pageSize
      };
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Error al buscar productos. Verifica tu conexión a internet.');
    }
  }

  calculateNutritionScore(product: FoodProduct): NutritionScore {
    const nutriments = product.nutriments;

    // Valores de referencia para scoring (por 100g)
    const references = {
      calories: { excellent: 50, good: 150, moderate: 300, poor: 500 },
      fat: { excellent: 3, good: 10, moderate: 20, poor: 30 },
      saturated_fat: { excellent: 1, good: 5, moderate: 10, poor: 15 },
      sugars: { excellent: 5, good: 15, moderate: 25, poor: 35 },
      salt: { excellent: 0.3, good: 1, moderate: 2, poor: 3 },
      fiber: { excellent: 6, good: 3, moderate: 1.5, poor: 0 }, // Más fibra es mejor
      proteins: { excellent: 20, good: 10, moderate: 5, poor: 2 } // Más proteína es mejor
    };

    const calculateComponentScore = (
      value: number, 
      ref: { excellent: number; good: number; moderate: number; poor: number },
      higherIsBetter: boolean = false
    ) => {
      if (value === undefined || value === null) return { score: 0, status: 'moderate' as const };

      if (higherIsBetter) {
        if (value >= ref.excellent) return { score: 100, status: 'excellent' as const };
        if (value >= ref.good) return { score: 80, status: 'good' as const };
        if (value >= ref.moderate) return { score: 60, status: 'moderate' as const };
        return { score: 40, status: 'poor' as const };
      } else {
        if (value <= ref.excellent) return { score: 100, status: 'excellent' as const };
        if (value <= ref.good) return { score: 80, status: 'good' as const };
        if (value <= ref.moderate) return { score: 60, status: 'moderate' as const };
        return { score: 40, status: 'poor' as const };
      }
    };

    const calories = calculateComponentScore(nutriments.energy_kcal || 0, references.calories);
    const fat = calculateComponentScore(nutriments.fat || 0, references.fat);
    const saturated_fat = calculateComponentScore(nutriments.saturated_fat || 0, references.saturated_fat);
    const sugars = calculateComponentScore(nutriments.sugars || 0, references.sugars);
    const salt = calculateComponentScore(nutriments.salt || 0, references.salt);
    const fiber = calculateComponentScore(nutriments.fiber || 0, references.fiber, true);
    const proteins = calculateComponentScore(nutriments.proteins || 0, references.proteins, true);

    // Calcular puntuación de salud (promedio ponderado)
    const healthScore = Math.round(
      (calories.score * 0.2 + 
       fat.score * 0.15 + 
       saturated_fat.score * 0.15 + 
       sugars.score * 0.15 + 
       salt.score * 0.15 + 
       fiber.score * 0.1 + 
       proteins.score * 0.1)
    );

    // Calcular puntuación ambiental basada en eco-score
    let environmentScore = 50; // Valor por defecto
    if (product.ecoscore_grade) {
      const ecoScores = { a: 90, b: 75, c: 60, d: 45, e: 30 };
      environmentScore = ecoScores[product.ecoscore_grade] || 50;
    }

    // Calcular puntuación de procesamiento basada en NOVA
    let processingScore = 70; // Valor por defecto
    if (product.nova_group) {
      const novaScores = { 1: 95, 2: 80, 3: 60, 4: 30 };
      processingScore = novaScores[product.nova_group] || 70;
    }

    // Puntuación general
    const overallScore = Math.round((healthScore * 0.5 + environmentScore * 0.25 + processingScore * 0.25));

    return {
      overall: overallScore,
      health: healthScore,
      environment: environmentScore,
      processing: processingScore,
      details: {
        calories: { value: nutriments.energy_kcal || 0, ...calories },
        fat: { value: nutriments.fat || 0, ...fat },
        saturated_fat: { value: nutriments.saturated_fat || 0, ...saturated_fat },
        sugars: { value: nutriments.sugars || 0, ...sugars },
        salt: { value: nutriments.salt || 0, ...salt },
        fiber: { value: nutriments.fiber || 0, ...fiber },
        proteins: { value: nutriments.proteins || 0, ...proteins }
      }
    };
  }

  formatNutrients(product: FoodProduct): { [key: string]: string } {
    const nutriments = product.nutriments;
    const formatted: { [key: string]: string } = {};

    if (nutriments.energy_kcal !== undefined) {
      formatted['Calorías'] = `${nutriments.energy_kcal} kcal`;
    }
    if (nutriments.fat !== undefined) {
      formatted['Grasas'] = `${nutriments.fat} g`;
    }
    if (nutriments.saturated_fat !== undefined) {
      formatted['Grasas saturadas'] = `${nutriments.saturated_fat} g`;
    }
    if (nutriments.carbohydrates !== undefined) {
      formatted['Carbohidratos'] = `${nutriments.carbohydrates} g`;
    }
    if (nutriments.sugars !== undefined) {
      formatted['Azúcares'] = `${nutriments.sugars} g`;
    }
    if (nutriments.fiber !== undefined) {
      formatted['Fibra'] = `${nutriments.fiber} g`;
    }
    if (nutriments.proteins !== undefined) {
      formatted['Proteínas'] = `${nutriments.proteins} g`;
    }
    if (nutriments.salt !== undefined) {
      formatted['Sal'] = `${nutriments.salt} g`;
    }

    return formatted;
  }

  getNutritionGradeColor(grade?: string): string {
    const colors = {
      a: '#2ECC71',
      b: '#F39C12',
      c: '#E67E22',
      d: '#E74C3C',
      e: '#8E44AD'
    };
    return colors[grade as keyof typeof colors] || '#95A5A6';
  }

  getNutritionGradeText(grade?: string): string {
    const texts = {
      a: 'Excelente calidad nutricional',
      b: 'Buena calidad nutricional',
      c: 'Calidad nutricional moderada',
      d: 'Baja calidad nutricional',
      e: 'Muy baja calidad nutricional'
    };
    return texts[grade as keyof typeof texts] || 'Calidad nutricional no evaluada';
  }
}

export const foodAPI = new FoodAPI();

export const searchFood = async (query: string): Promise<FoodItem[]> => {
  // Simple mock implementation
  return [
    {
      id: `${query}_1`,
      name: `${query} - Genérico`,
      brand: 'Genérico',
      calories: 100,
      protein: 5,
      carbs: 15,
      fat: 2,
      fiber: 3,
      sugar: 8,
      sodium: 200,
      servingSize: '100g',
      barcode: undefined
    }
  ];
};

export const foodStorage = {
  saveFood: async (food: FoodItem) => {
    try {
      if (!food || !food.id) {
        throw new Error('Datos de alimento inválidos');
      }
      
      const saved = JSON.parse(localStorage.getItem('saved-foods') || '[]');
      
      // Check if already exists
      const exists = saved.find((item: FoodItem) => item.id === food.id);
      if (exists) {
        throw new Error('Este alimento ya está guardado');
      }
      
      // Limit to 100 saved foods
      if (saved.length >= 100) {
        saved.shift(); // Remove oldest
      }
      
      saved.push(food);
      localStorage.setItem('saved-foods', JSON.stringify(saved));
    } catch (error) {
      console.error('Error saving food:', error);
      throw error;
    }
  },
  
  getSavedFoods: (): FoodItem[] => {
    try {
      const saved = localStorage.getItem('saved-foods');
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error getting saved foods:', error);
      localStorage.removeItem('saved-foods'); // Clean corrupted data
      return [];
    }
  },
  
  removeFood: async (foodId: string) => {
    try {
      if (!foodId || typeof foodId !== 'string') {
        throw new Error('ID de alimento inválido');
      }
      
      const saved = JSON.parse(localStorage.getItem('saved-foods') || '[]');
      const filtered = saved.filter((food: FoodItem) => food.id !== foodId);
      localStorage.setItem('saved-foods', JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing food:', error);
      throw error;
    }
  },
  
  saveFoodToHistory: async (product: FoodProduct) => {
    try {
      if (!product || !product.id) {
        throw new Error('Producto inválido');
      }
      
      const history = JSON.parse(localStorage.getItem('food-history') || '[]');
      
      // Remove if already exists to avoid duplicates
      const filtered = history.filter((item: FoodProduct) => item.id !== product.id);
      
      filtered.unshift(product);
      localStorage.setItem('food-history', JSON.stringify(filtered.slice(0, 50))); // Keep last 50
    } catch (error) {
      console.error('Error saving to history:', error);
      throw error;
    }
  },
  
  addFoodToMeal: async (product: FoodProduct, quantity: number, unit: string, mealType: string) => {
    try {
      // Input validation
      if (!product || !product.id) {
        throw new Error('Producto inválido');
      }
      
      if (!quantity || quantity <= 0 || quantity > 10000) {
        throw new Error('Cantidad inválida');
      }
      
      if (!unit || typeof unit !== 'string' || unit.length > 10) {
        throw new Error('Unidad inválida');
      }
      
      const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
      if (!validMealTypes.includes(mealType)) {
        throw new Error('Tipo de comida inválido');
      }
      
      const today = new Date().toISOString().split('T')[0];
      const meals = JSON.parse(localStorage.getItem('meals') || '{}');
      
      if (!meals[today]) meals[today] = {};
      if (!meals[today][mealType]) meals[today][mealType] = [];
      
      // Limit meals per type per day
      if (meals[today][mealType].length >= 20) {
        throw new Error('Límite de alimentos por comida alcanzado');
      }
      
      meals[today][mealType].push({
        product,
        quantity,
        unit,
        timestamp: new Date().toISOString()
      });
      
      // Clean old data (keep only last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];
      
      Object.keys(meals).forEach(date => {
        if (date < cutoffDate) {
          delete meals[date];
        }
      });
      
      localStorage.setItem('meals', JSON.stringify(meals));
    } catch (error) {
      console.error('Error adding food to meal:', error);
      throw error;
    }
  }
};
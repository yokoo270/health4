import { FoodProduct } from './food-api';

export interface FoodEntry {
  id: string;
  product: FoodProduct;
  quantity: number;
  unit: 'g' | 'ml' | 'piece' | 'serving';
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  addedAt: string;
}

export interface FoodHistory {
  id: string;
  product: FoodProduct;
  lastUsed: string;
  useCount: number;
  favorite: boolean;
}

export interface MealPlan {
  id: string;
  date: string;
  entries: FoodEntry[];
  totalCalories: number;
  totalNutrients: {
    proteins: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
    sugar: number;
    salt: number;
  };
}

export interface NutritionGoals {
  dailyCalories: number;
  proteins: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  water: number; // in ml
}

class FoodStorage {
  private readonly STORAGE_KEYS = {
    FOOD_HISTORY: 'healthmaxxing_food_history',
    MEAL_PLANS: 'healthmaxxing_meal_plans',
    NUTRITION_GOALS: 'healthmaxxing_nutrition_goals',
    FAVORITE_FOODS: 'healthmaxxing_favorite_foods',
    FOOD_CACHE: 'healthmaxxing_food_cache'
  };

  // Food History Management
  async saveFoodToHistory(product: FoodProduct): Promise<void> {
    try {
      const history = await this.getFoodHistory();
      const existingIndex = history.findIndex(item => item.product.code === product.code);
      
      if (existingIndex >= 0) {
        // Update existing entry
        history[existingIndex].lastUsed = new Date().toISOString();
        history[existingIndex].useCount += 1;
      } else {
        // Add new entry
        const newEntry: FoodHistory = {
          id: this.generateId(),
          product,
          lastUsed: new Date().toISOString(),
          useCount: 1,
          favorite: false
        };
        history.unshift(newEntry);
      }
      
      // Keep only the last 100 items
      const trimmedHistory = history.slice(0, 100);
      localStorage.setItem(this.STORAGE_KEYS.FOOD_HISTORY, JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Error saving food to history:', error);
    }
  }

  async getFoodHistory(): Promise<FoodHistory[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.FOOD_HISTORY);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.error('Error getting food history:', error);
      return [];
    }
  }

  async toggleFavorite(productCode: string): Promise<void> {
    try {
      const history = await this.getFoodHistory();
      const index = history.findIndex(item => item.product.code === productCode);
      
      if (index >= 0) {
        history[index].favorite = !history[index].favorite;
        localStorage.setItem(this.STORAGE_KEYS.FOOD_HISTORY, JSON.stringify(history));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }

  async getFavorites(): Promise<FoodHistory[]> {
    try {
      const history = await this.getFoodHistory();
      return history.filter(item => item.favorite);
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  async clearHistory(): Promise<void> {
    try {
      localStorage.removeItem(this.STORAGE_KEYS.FOOD_HISTORY);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }

  // Meal Planning
  async addFoodToMeal(
    product: FoodProduct, 
    quantity: number, 
    unit: FoodEntry['unit'], 
    mealType: FoodEntry['mealType'],
    date?: string
  ): Promise<FoodEntry> {
    try {
      const entryDate = date || new Date().toISOString().split('T')[0];
      const calories = this.calculateCalories(product, quantity, unit);
      
      const entry: FoodEntry = {
        id: this.generateId(),
        product,
        quantity,
        unit,
        date: entryDate,
        mealType,
        calories,
        addedAt: new Date().toISOString()
      };

      // Get existing meal plan for the date
      let mealPlan = await this.getMealPlan(entryDate);
      
      if (!mealPlan) {
        mealPlan = {
          id: this.generateId(),
          date: entryDate,
          entries: [],
          totalCalories: 0,
          totalNutrients: {
            proteins: 0,
            carbohydrates: 0,
            fat: 0,
            fiber: 0,
            sugar: 0,
            salt: 0
          }
        };
      }

      // Add entry to meal plan
      mealPlan.entries.push(entry);
      
      // Recalculate totals
      this.updateMealPlanTotals(mealPlan);
      
      // Save meal plan
      await this.saveMealPlan(mealPlan);
      
      // Save to history
      await this.saveFoodToHistory(product);
      
      return entry;
    } catch (error) {
      console.error('Error adding food to meal:', error);
      throw error;
    }
  }

  async getMealPlan(date: string): Promise<MealPlan | null> {
    try {
      const mealPlans = await this.getAllMealPlans();
      return mealPlans.find(plan => plan.date === date) || null;
    } catch (error) {
      console.error('Error getting meal plan:', error);
      return null;
    }
  }

  async getAllMealPlans(): Promise<MealPlan[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.MEAL_PLANS);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.error('Error getting meal plans:', error);
      return [];
    }
  }

  async saveMealPlan(mealPlan: MealPlan): Promise<void> {
    try {
      const mealPlans = await this.getAllMealPlans();
      const existingIndex = mealPlans.findIndex(plan => plan.date === mealPlan.date);
      
      if (existingIndex >= 0) {
        mealPlans[existingIndex] = mealPlan;
      } else {
        mealPlans.push(mealPlan);
      }
      
      // Sort by date (newest first) and keep only last 90 days
      mealPlans.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const trimmedPlans = mealPlans.slice(0, 90);
      
      localStorage.setItem(this.STORAGE_KEYS.MEAL_PLANS, JSON.stringify(trimmedPlans));
    } catch (error) {
      console.error('Error saving meal plan:', error);
      throw error;
    }
  }

  async deleteFoodEntry(entryId: string, date: string): Promise<void> {
    try {
      const mealPlan = await this.getMealPlan(date);
      if (mealPlan) {
        mealPlan.entries = mealPlan.entries.filter(entry => entry.id !== entryId);
        this.updateMealPlanTotals(mealPlan);
        await this.saveMealPlan(mealPlan);
      }
    } catch (error) {
      console.error('Error deleting food entry:', error);
      throw error;
    }
  }

  // Nutrition Goals
  async saveNutritionGoals(goals: NutritionGoals): Promise<void> {
    try {
      localStorage.setItem(this.STORAGE_KEYS.NUTRITION_GOALS, JSON.stringify(goals));
    } catch (error) {
      console.error('Error saving nutrition goals:', error);
    }
  }

  async getNutritionGoals(): Promise<NutritionGoals | null> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.NUTRITION_GOALS);
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error getting nutrition goals:', error);
      return null;
    }
  }

  // Food Cache for offline usage
  async cacheFood(product: FoodProduct): Promise<void> {
    try {
      const cache = await this.getFoodCache();
      const existingIndex = cache.findIndex(item => item.code === product.code);
      
      if (existingIndex >= 0) {
        cache[existingIndex] = product;
      } else {
        cache.unshift(product);
      }
      
      // Keep only the last 50 items
      const trimmedCache = cache.slice(0, 50);
      localStorage.setItem(this.STORAGE_KEYS.FOOD_CACHE, JSON.stringify(trimmedCache));
    } catch (error) {
      console.error('Error caching food:', error);
    }
  }

  async getFoodCache(): Promise<FoodProduct[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.FOOD_CACHE);
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    } catch (error) {
      console.error('Error getting food cache:', error);
      return [];
    }
  }

  async searchCachedFood(query: string): Promise<FoodProduct[]> {
    try {
      const cache = await this.getFoodCache();
      const lowerQuery = query.toLowerCase();
      
      return cache.filter(product => 
        product.product_name.toLowerCase().includes(lowerQuery) ||
        (product.brands && product.brands.toLowerCase().includes(lowerQuery))
      );
    } catch (error) {
      console.error('Error searching cached food:', error);
      return [];
    }
  }

  // Analytics and Reports
  async getNutritionStats(startDate: string, endDate: string): Promise<{
    totalDays: number;
    averageCalories: number;
    averageNutrients: MealPlan['totalNutrients'];
    goalAchievement: {
      calories: number;
      proteins: number;
      carbohydrates: number;
      fat: number;
      fiber: number;
    };
  }> {
    try {
      const mealPlans = await this.getAllMealPlans();
      const filtered = mealPlans.filter(plan => 
        plan.date >= startDate && plan.date <= endDate
      );

      if (filtered.length === 0) {
        return {
          totalDays: 0,
          averageCalories: 0,
          averageNutrients: { proteins: 0, carbohydrates: 0, fat: 0, fiber: 0, sugar: 0, salt: 0 },
          goalAchievement: { calories: 0, proteins: 0, carbohydrates: 0, fat: 0, fiber: 0 }
        };
      }

      const totalCalories = filtered.reduce((sum, plan) => sum + plan.totalCalories, 0);
      const totalNutrients = filtered.reduce((sum, plan) => ({
        proteins: sum.proteins + plan.totalNutrients.proteins,
        carbohydrates: sum.carbohydrates + plan.totalNutrients.carbohydrates,
        fat: sum.fat + plan.totalNutrients.fat,
        fiber: sum.fiber + plan.totalNutrients.fiber,
        sugar: sum.sugar + plan.totalNutrients.sugar,
        salt: sum.salt + plan.totalNutrients.salt,
      }), { proteins: 0, carbohydrates: 0, fat: 0, fiber: 0, sugar: 0, salt: 0 });

      const averageCalories = totalCalories / filtered.length;
      const averageNutrients = {
        proteins: totalNutrients.proteins / filtered.length,
        carbohydrates: totalNutrients.carbohydrates / filtered.length,
        fat: totalNutrients.fat / filtered.length,
        fiber: totalNutrients.fiber / filtered.length,
        sugar: totalNutrients.sugar / filtered.length,
        salt: totalNutrients.salt / filtered.length,
      };

      const goals = await this.getNutritionGoals();
      let goalAchievement = { calories: 0, proteins: 0, carbohydrates: 0, fat: 0, fiber: 0 };

      if (goals) {
        goalAchievement = {
          calories: goals.dailyCalories > 0 ? (averageCalories / goals.dailyCalories) * 100 : 0,
          proteins: goals.proteins > 0 ? (averageNutrients.proteins / goals.proteins) * 100 : 0,
          carbohydrates: goals.carbohydrates > 0 ? (averageNutrients.carbohydrates / goals.carbohydrates) * 100 : 0,
          fat: goals.fat > 0 ? (averageNutrients.fat / goals.fat) * 100 : 0,
          fiber: goals.fiber > 0 ? (averageNutrients.fiber / goals.fiber) * 100 : 0,
        };
      }

      return {
        totalDays: filtered.length,
        averageCalories,
        averageNutrients,
        goalAchievement
      };
    } catch (error) {
      console.error('Error getting nutrition stats:', error);
      throw error;
    }
  }

  // Utility methods
  private calculateCalories(product: FoodProduct, quantity: number, unit: FoodEntry['unit']): number {
    const caloriesPer100g = product.nutriments.energy_kcal || 0;
    
    switch (unit) {
      case 'g':
        return (caloriesPer100g * quantity) / 100;
      case 'ml':
        // Assume 1ml = 1g for simplicity
        return (caloriesPer100g * quantity) / 100;
      case 'piece':
        // Use serving size if available, otherwise estimate 100g per piece
        const gramsPerPiece = product.serving_quantity || 100;
        return (caloriesPer100g * quantity * gramsPerPiece) / 100;
      case 'serving':
        const gramsPerServing = product.serving_quantity || 100;
        return (caloriesPer100g * quantity * gramsPerServing) / 100;
      default:
        return 0;
    }
  }

  private updateMealPlanTotals(mealPlan: MealPlan): void {
    mealPlan.totalCalories = mealPlan.entries.reduce((sum, entry) => sum + entry.calories, 0);
    
    mealPlan.totalNutrients = mealPlan.entries.reduce((totals, entry) => {
      const multiplier = this.getNutrientMultiplier(entry.quantity, entry.unit, entry.product);
      
      return {
        proteins: totals.proteins + ((entry.product.nutriments.proteins || 0) * multiplier),
        carbohydrates: totals.carbohydrates + ((entry.product.nutriments.carbohydrates || 0) * multiplier),
        fat: totals.fat + ((entry.product.nutriments.fat || 0) * multiplier),
        fiber: totals.fiber + ((entry.product.nutriments.fiber || 0) * multiplier),
        sugar: totals.sugar + ((entry.product.nutriments.sugars || 0) * multiplier),
        salt: totals.salt + ((entry.product.nutriments.salt || 0) * multiplier),
      };
    }, { proteins: 0, carbohydrates: 0, fat: 0, fiber: 0, sugar: 0, salt: 0 });
  }

  private getNutrientMultiplier(quantity: number, unit: FoodEntry['unit'], product: FoodProduct): number {
    switch (unit) {
      case 'g':
      case 'ml':
        return quantity / 100;
      case 'piece':
        const gramsPerPiece = product.serving_quantity || 100;
        return (quantity * gramsPerPiece) / 100;
      case 'serving':
        const gramsPerServing = product.serving_quantity || 100;
        return (quantity * gramsPerServing) / 100;
      default:
        return 0;
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Export/Import functionality
  async exportData(): Promise<string> {
    try {
      const data = {
        foodHistory: await this.getFoodHistory(),
        mealPlans: await this.getAllMealPlans(),
        nutritionGoals: await this.getNutritionGoals(),
        foodCache: await this.getFoodCache(),
        exportDate: new Date().toISOString()
      };
      
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.foodHistory) {
        localStorage.setItem(this.STORAGE_KEYS.FOOD_HISTORY, JSON.stringify(data.foodHistory));
      }
      
      if (data.mealPlans) {
        localStorage.setItem(this.STORAGE_KEYS.MEAL_PLANS, JSON.stringify(data.mealPlans));
      }
      
      if (data.nutritionGoals) {
        localStorage.setItem(this.STORAGE_KEYS.NUTRITION_GOALS, JSON.stringify(data.nutritionGoals));
      }
      
      if (data.foodCache) {
        localStorage.setItem(this.STORAGE_KEYS.FOOD_CACHE, JSON.stringify(data.foodCache));
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }

  async clearAllData(): Promise<void> {
    try {
      Object.values(this.STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }
}

export const foodStorage = new FoodStorage();

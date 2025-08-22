
export interface AIRoutine {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'social' | 'mental' | 'nutrition';
  description: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  userId: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number;
  restTime?: number;
  instructions: string;
  targetMuscles?: string[];
  equipment?: string[];
}

export interface AIDiet {
  id: string;
  name: string;
  description: string;
  targetCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: AIMeal[];
  createdAt: Date;
  userId: string;
}

export interface AIMeal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: AIMealFood[];
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface AIMealFood {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface AITask {
  id: string;
  title: string;
  description: string;
  type: 'routine' | 'social' | 'mental' | 'nutrition';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  relatedRoutineId?: string;
  relatedDietId?: string;
}

class AIIntegrationService {
  private baseUrl = '/api';

  // User context tracking for personalized recommendations
  private async getUserContext(): Promise<any> {
    try {
      const profile = JSON.parse(localStorage.getItem('user-profile') || '{}');
      const preferences = JSON.parse(localStorage.getItem('user-preferences') || '{}');
      const history = JSON.parse(localStorage.getItem('user-history') || '[]');
      const progress = JSON.parse(localStorage.getItem('user-progress') || '{}');
      const currentGoals = JSON.parse(localStorage.getItem('current-goals') || '[]');
      
      return {
        profile,
        preferences,
        history,
        progress,
        currentGoals,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting user context:', error);
      return {};
    }
  }

  async getPersonalizedRecommendations(section: string): Promise<any[]> {
    const userContext = await this.getUserContext();
    
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Basándote en el contexto del usuario: ${JSON.stringify(userContext)}, genera 3-5 recomendaciones personalizadas específicas para la sección "${section}". Incluye acciones concretas, no datos genéricos.`,
        context: 'personalized_recommendations',
        section,
        userContext
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get personalized recommendations');
    }

    const result = await response.json();
    return this.parseRecommendations(result.message, section);
  }

  private parseRecommendations(aiResponse: string, section: string): any[] {
    // Parse AI response into structured recommendations
    const recommendations = [];
    try {
      // Extract recommendations from AI response
      const lines = aiResponse.split('\n').filter(line => line.trim());
      let currentRec = {};
      
      lines.forEach(line => {
        if (line.includes('•') || line.includes('-') || line.includes('1.') || line.includes('2.')) {
          if (Object.keys(currentRec).length > 0) {
            recommendations.push(currentRec);
            currentRec = {};
          }
          currentRec = {
            id: Date.now() + Math.random(),
            title: line.replace(/[•\-\d\.]/g, '').trim(),
            section,
            priority: this.determinePriority(line),
            action: 'recommended',
            timestamp: new Date()
          };
        } else if (line.trim() && Object.keys(currentRec).length > 0) {
          currentRec.description = line.trim();
        }
      });
      
      if (Object.keys(currentRec).length > 0) {
        recommendations.push(currentRec);
      }
    } catch (error) {
      console.error('Error parsing recommendations:', error);
    }
    
    return recommendations.slice(0, 5); // Max 5 recommendations
  }

  private determinePriority(text: string): 'high' | 'medium' | 'low' {
    const urgentKeywords = ['importante', 'urgente', 'crítico', 'esencial'];
    const moderateKeywords = ['recomendado', 'sugerido', 'beneficioso'];
    
    const lowerText = text.toLowerCase();
    if (urgentKeywords.some(keyword => lowerText.includes(keyword))) return 'high';
    if (moderateKeywords.some(keyword => lowerText.includes(keyword))) return 'medium';
    return 'low';
  }

  async trackUserAction(action: string, data: any, section: string): Promise<void> {
    try {
      const history = JSON.parse(localStorage.getItem('user-history') || '[]');
      const newEntry = {
        id: Date.now(),
        action,
        data,
        section,
        timestamp: new Date().toISOString()
      };
      
      history.push(newEntry);
      // Keep only last 100 entries to avoid storage bloat
      if (history.length > 100) {
        history.splice(0, history.length - 100);
      }
      
      localStorage.setItem('user-history', JSON.stringify(history));
      
      // Update user context for better recommendations
      await this.updateUserContext(section, data);
    } catch (error) {
      console.error('Error tracking user action:', error);
    }
  }

  private async updateUserContext(section: string, data: any): Promise<void> {
    try {
      const progress = JSON.parse(localStorage.getItem('user-progress') || '{}');
      if (!progress[section]) progress[section] = {};
      
      progress[section].lastActivity = new Date().toISOString();
      progress[section].activityCount = (progress[section].activityCount || 0) + 1;
      progress[section].latestData = data;
      
      localStorage.setItem('user-progress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error updating user context:', error);
    }
  }

  async createPersonalizedRoutine(
    userProfile: any,
    preferences: any,
    goals: string[]
  ): Promise<AIRoutine> {
    const response = await fetch(`${this.baseUrl}/generate-routine`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userProfile,
        preferences,
        goals,
        context: 'personalized_routine'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create personalized routine');
    }

    const routine = await response.json();
    
    // Automatically add routine tasks to tasklist
    await this.addRoutineToTasklist(routine);
    
    // Update analytics with new routine
    await this.updateAnalytics('routine', routine);
    
    return routine;
  }

  async createPersonalizedDiet(
    userProfile: any,
    nutritionGoals: any,
    restrictions: string[]
  ): Promise<AIDiet> {
    const response = await fetch(`${this.baseUrl}/generate-diet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userProfile,
        nutritionGoals,
        restrictions,
        context: 'personalized_diet'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create personalized diet');
    }

    const diet = await response.json();
    
    // Automatically add diet to nutrition tracking
    await this.addDietToNutritionTracking(diet);
    
    // Update analytics with diet information
    await this.updateAnalytics('diet', diet);
    
    return diet;
  }

  async createSocialPlan(
    socialProfile: any,
    goals: string[]
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Crea un plan personalizado de desarrollo social basado en: ${JSON.stringify(socialProfile)}. Objetivos: ${goals.join(', ')}`,
        context: 'social_plan_creation'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create social plan');
    }

    const socialPlan = await response.json();
    
    // Add social tasks to tasklist
    await this.addSocialPlanToTasklist(socialPlan);
    
    return socialPlan;
  }

  private async addRoutineToTasklist(routine: AIRoutine): Promise<void> {
    const tasks: AITask[] = routine.exercises.map((exercise, index) => ({
      id: `routine-${routine.id}-${index}`,
      title: `${exercise.name} (${routine.name})`,
      description: exercise.instructions,
      type: 'routine',
      priority: 'medium',
      completed: false,
      createdAt: new Date(),
      relatedRoutineId: routine.id
    }));

    // Save tasks to localStorage or send to API
    const existingTasks = JSON.parse(localStorage.getItem('ai-tasks') || '[]');
    const updatedTasks = [...existingTasks, ...tasks];
    localStorage.setItem('ai-tasks', JSON.stringify(updatedTasks));
  }

  private async addDietToNutritionTracking(diet: AIDiet): Promise<void> {
    // Save diet to localStorage for nutrition tracking
    const existingDiets = JSON.parse(localStorage.getItem('ai-diets') || '[]');
    const updatedDiets = [...existingDiets, diet];
    localStorage.setItem('ai-diets', JSON.stringify(updatedDiets));

    // Create nutrition tasks
    const nutritionTasks: AITask[] = diet.meals.map((meal, index) => ({
      id: `diet-${diet.id}-meal-${index}`,
      title: `${meal.name} (${diet.name})`,
      description: `Comida planificada - ${meal.totalCalories} cal`,
      type: 'nutrition',
      priority: 'medium',
      completed: false,
      createdAt: new Date(),
      relatedDietId: diet.id
    }));

    const existingTasks = JSON.parse(localStorage.getItem('ai-tasks') || '[]');
    const updatedTasks = [...existingTasks, ...nutritionTasks];
    localStorage.setItem('ai-tasks', JSON.stringify(updatedTasks));
  }

  private async addSocialPlanToTasklist(socialPlan: any): Promise<void> {
    const socialTasks: AITask[] = [
      {
        id: `social-plan-${Date.now()}`,
        title: 'Práctica de habilidades sociales',
        description: 'Plan personalizado creado por IA',
        type: 'social',
        priority: 'medium',
        completed: false,
        createdAt: new Date()
      }
    ];

    const existingTasks = JSON.parse(localStorage.getItem('ai-tasks') || '[]');
    const updatedTasks = [...existingTasks, ...socialTasks];
    localStorage.setItem('ai-tasks', JSON.stringify(updatedTasks));
  }

  private async updateAnalytics(type: string, data: any): Promise<void> {
    const analyticsData = {
      type,
      data,
      timestamp: new Date(),
      source: 'ai_generated'
    };

    const existingAnalytics = JSON.parse(localStorage.getItem('ai-analytics') || '[]');
    const updatedAnalytics = [...existingAnalytics, analyticsData];
    localStorage.setItem('ai-analytics', JSON.stringify(updatedAnalytics));
  }

  async getAITasks(): Promise<AITask[]> {
    return JSON.parse(localStorage.getItem('ai-tasks') || '[]');
  }

  async getAIDiets(): Promise<AIDiet[]> {
    return JSON.parse(localStorage.getItem('ai-diets') || '[]');
  }

  async getAIRoutines(): Promise<AIRoutine[]> {
    return JSON.parse(localStorage.getItem('ai-routines') || '[]');
  }

  async markTaskCompleted(taskId: string): Promise<void> {
    const tasks = await this.getAITasks();
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    localStorage.setItem('ai-tasks', JSON.stringify(updatedTasks));
  }
}

export const aiIntegrationService = new AIIntegrationService();

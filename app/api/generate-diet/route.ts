import { generateObject } from "ai"
import { xai } from "@ai-sdk/xai"
import { z } from "zod"
import type { NextRequest } from "next/server"

const mealSchema = z.object({
  name: z.string(),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTime: z.string(),
})

const dietPlanSchema = z.object({
  title: z.string(),
  description: z.string(),
  totalCalories: z.number(),
  macros: z.object({
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
  }),
  meals: z.object({
    breakfast: mealSchema,
    lunch: mealSchema,
    dinner: mealSchema,
    snacks: z.array(mealSchema),
  }),
  tips: z.array(z.string()),
  shoppingList: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  try {
    const { goal, dietaryPreferences, allergies, calorieTarget, userProfile } = await request.json()

    const prompt = `Create a personalized daily diet plan based on:

    PRIMARY REQUIREMENTS:
    - Goal: ${goal}
    - Dietary Preferences: ${dietaryPreferences?.join(", ") || "Balanced"}
    - Allergies/Restrictions: ${allergies || "None"}
    - Target Calories: ${calorieTarget || "Calculated based on profile"}

    USER PROFILE:
    - Age: ${userProfile?.age || "Not specified"}
    - Height: ${userProfile?.height || "Not specified"}cm
    - Weight: ${userProfile?.weight || "Not specified"}kg
    - Fitness Level: ${userProfile?.fitnessLevel || "Not specified"}
    - Primary Goals: ${userProfile?.goals || "General fitness"}
    - Nutrition Preferences: ${userProfile?.nutritionPreferences?.join(", ") || "Balanced"}

    Generate a complete daily meal plan with:
    - Breakfast, lunch, dinner, and 2 snacks
    - Detailed nutritional information for each meal
    - Complete ingredient lists and cooking instructions
    - Shopping list for all ingredients
    - Practical tips for meal prep and adherence

    Ensure the plan aligns with their fitness goals and dietary preferences.`

    const result = await generateObject({
      model: xai("grok-4", {
        apiKey: process.env.XAI_API_KEY,
      }),
      prompt,
      schema: dietPlanSchema,
    })

    return Response.json(result.object)
  } catch (error) {
    console.error("Error generating diet plan:", error)
    return new Response("Failed to generate diet plan", { status: 500 })
  }
}
import { generateObject } from "ai"
import { xai } from "@ai-sdk/xai"
import { z } from "zod"
import type { NextRequest } from "next/server"

const routineSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  workoutType: z.string(),
  targetMuscles: z.array(z.string()),
  exercises: z.array(
    z.object({
      name: z.string(),
      sets: z.string(),
      reps: z.string(),
      rest: z.string(),
      instructions: z.string(),
      muscleGroups: z.array(z.string()),
      equipment: z.string(),
      difficulty: z.enum(["Easy", "Medium", "Hard"]),
      alternatives: z.array(z.string()),
    }),
  ),
  warmup: z.array(z.string()),
  cooldown: z.array(z.string()),
  tips: z.array(z.string()),
  progressionNotes: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  try {
    const { goal, experience, equipment, timeAvailable, userProfile, workoutType } = await request.json()

    const prompt = `Create a highly personalized workout routine based on:

    WORKOUT REQUIREMENTS:
    - Primary Goal: ${goal}
    - Experience Level: ${experience}
    - Available Equipment: ${equipment}
    - Time Available: ${timeAvailable} minutes
    - Workout Type: ${workoutType || "Mixed"}

    USER PROFILE:
    - Name: ${userProfile?.name || "User"}
    - Age: ${userProfile?.age || "Not specified"}
    - Height: ${userProfile?.height || "Not specified"}cm
    - Weight: ${userProfile?.weight || "Not specified"}kg
    - Fitness Level: ${userProfile?.fitnessLevel || experience}
    - Primary Goals: ${userProfile?.goals || goal}
    - Preferred Workout Types: ${userProfile?.preferredWorkoutTypes?.join(", ") || "Mixed"}
    - Available Equipment: ${userProfile?.equipmentAccess?.join(", ") || equipment}
    - Preferred Duration: ${userProfile?.workoutDuration || timeAvailable} minutes

    Generate a complete, personalized workout routine that:
    - Matches their specific fitness level and goals
    - Uses only their available equipment
    - Fits within their preferred time frame
    - Includes proper warm-up and cool-down
    - Provides exercise alternatives for different skill levels
    - Includes progression notes for future workouts
    - Considers their workout type preferences

    Make it challenging but achievable for their current fitness level.`

    const result = await generateObject({
      model: xai("grok-4", {
        apiKey: process.env.XAI_API_KEY,
      }),
      prompt,
      schema: routineSchema,
    })

    return Response.json(result.object)
  } catch (error) {
    console.error("Error generating routine:", error)
    return new Response("Failed to generate routine", { status: 500 })
  }
}
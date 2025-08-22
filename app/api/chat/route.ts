import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, context, history, userProfile } = await request.json()

    console.log("[HealthMaxx] API received request:", { message: message?.substring(0, 50), hasUserProfile: !!userProfile })

    if (!message || !message.trim()) {
      console.error("[HealthMaxx] Empty message received")
      return new Response("Message is required", { status: 400 })
    }

    // Check for medical/health questions - LEGAL RESTRICTION
    const medicalTerms = [
      'enfermedad', 'gripe', 'dolor', 'síntoma', 'medicina', 'medicamento', 'pastilla', 'tratamiento', 'diagnóstico', 'infección', 'virus', 'bacteria', 'alergia', 'sangre', 'presión', 'corazón', 'pulmón', 'hígado', 'riñón',
      'disease', 'flu', 'pain', 'symptom', 'medicine', 'medication', 'pill', 'treatment', 'diagnosis', 'infection', 'virus', 'bacteria', 'allergy', 'blood', 'pressure', 'heart', 'lung', 'liver', 'kidney', 'sick', 'illness',
      'maladie', 'grippe', 'douleur', 'symptôme', 'médicament', 'pilule', 'traitement', 'diagnostic', 'infection', 'allergie', 'sang', 'tension', 'cœur', 'poumon', 'foie', 'rein',
      'krankheit', 'grippe', 'schmerz', 'symptom', 'medizin', 'medikament', 'pille', 'behandlung', 'diagnose', 'infektion', 'allergie', 'blut', 'druck', 'herz', 'lunge', 'leber', 'niere'
    ]

    const lowerMessage = message.toLowerCase()
    const containsMedicalTerms = medicalTerms.some(term => lowerMessage.includes(term))

    if (containsMedicalTerms) {
      return new Response(JSON.stringify({
        content: "Lo siento, pero por razones legales no puedo proporcionar consejos médicos o responder preguntas sobre síntomas, enfermedades o tratamientos médicos. Te recomiendo consultar con un profesional de la salud para cualquier inquietud médica. Estoy aquí para ayudarte con fitness, nutrición y entrenamiento. / I'm sorry, but for legal reasons I cannot provide medical advice or answer questions about symptoms, illnesses, or medical treatments. I recommend consulting with a healthcare professional for any medical concerns. I'm here to help you with fitness, nutrition, and training."
      }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("[HealthMaxx] ANTHROPIC_API_KEY not found in environment variables")
      return new Response("AI service not configured", { status: 500 })
    }

    // Get AI personality from user profile
    const aiPersonality = userProfile?.aiPersonality || "friendly"

    // Adjust tone based on user's AI personality preference
    const personalityPrompts = {
      motivational: "You are an energetic, motivational fitness coach who pushes users to exceed their limits. Use enthusiastic language, challenges, and inspiring messages. Be direct and action-oriented.",
      supportive: "You are a caring, understanding fitness coach who provides gentle encouragement. Be empathetic, patient, and focus on positive reinforcement. Acknowledge struggles and provide emotional support.",
      professional: "You are a professional, clinical fitness expert who provides direct, informative advice. Use technical terminology when appropriate, be concise, and focus on evidence-based recommendations.",
      friendly: "You are a friendly, approachable fitness buddy who makes fitness fun and accessible. Use casual language, be conversational, and make complex concepts easy to understand."
    }

    const systemPrompt = `You are Maxx AI, an expert fitness and nutrition coach with advanced memory capabilities and deep personalization. You provide highly customized workout routines, nutrition advice, and fitness guidance based on comprehensive user data.

${personalityPrompts[aiPersonality as keyof typeof personalityPrompts]}

IMPORTANT LEGAL RESTRICTION: You MUST NEVER provide medical advice, diagnose conditions, or answer questions about illnesses, symptoms, diseases, medications, or medical treatments. If asked about these topics, politely decline and recommend consulting a healthcare professional.

CORE CAPABILITIES:
- Create detailed, personalized workout routines with exercises, sets, reps, and rest periods
- Generate comprehensive nutrition plans and meal recommendations
- Provide fitness and wellness advice tailored to individual needs (NOT medical advice)
- Track progress and suggest improvements based on user data
- Motivate and encourage users with personalized messaging
- Remember previous conversations and build upon them
- Adapt all recommendations based on user's complete profile and preferences
- When providing information from internet sources, ALWAYS cite your sources at the end of your response

IMPORTANT: When you search for or reference information from external sources, you MUST include citations at the end of your response in this format:
Sources:
- [Source name/website] (if applicable)
- [Additional sources] (if applicable)

USER CONTEXT: ${context || "No specific context provided"}

${
  userProfile
    ? `
DETAILED USER PROFILE:
Personal Info:
- Name: ${userProfile.name || "Not specified"}
- Age: ${userProfile.age || "Not specified"}
- Height: ${userProfile.height || "Not specified"}cm
- Weight: ${userProfile.weight || "Not specified"}kg
- Fitness Level: ${userProfile.fitnessLevel || "Not specified"}
- Primary Goals: ${userProfile.goals || "Not specified"}

AI Preferences:
- Personality Style: ${userProfile.aiPersonality || "friendly"} (adjust your tone accordingly)
- Preferred Workout Types: ${userProfile.preferredWorkoutTypes?.join(", ") || "Not specified"}
- Preferred Workout Duration: ${userProfile.workoutDuration || 45} minutes
- Available Equipment: ${userProfile.equipmentAccess?.join(", ") || "Basic equipment"}
- Nutrition Preferences: ${userProfile.nutritionPreferences?.join(", ") || "Balanced diet"}

IMPORTANT: Use this profile information to make ALL recommendations highly personalized. Reference their specific goals, equipment, preferences, and fitness level in your responses.
`
    : ""
}

${
  history && history.length > 0
    ? `
CONVERSATION HISTORY:
${history.map((msg: any) => `${msg.role}: ${msg.content}`).join("\n")}

Use this conversation history to provide contextual, continuous responses that build on previous discussions.
`
    : ""
}

RESPONSE GUIDELINES:
- Always personalize responses based on the user's complete profile
- Reference their specific goals, equipment, and preferences
- Adjust your personality to match their preferred AI style (${userProfile?.aiPersonality || "friendly"})
- When suggesting workouts, consider their preferred types and duration
- When discussing nutrition, respect their dietary preferences
- Be encouraging and motivational while staying true to their preferred interaction style
- Format workout routines clearly with exercise names, sets, reps, and special instructions
- Provide actionable, specific advice rather than generic recommendations
- NEVER provide medical advice or answer health-related medical questions
- Always cite sources when referencing external information
- ALWAYS provide a complete, helpful response - never send empty or whitespace-only responses`

    console.log("[HealthMaxx] Calling Anthropic API")

    const result = await generateText({
      model: anthropic('claude-3-haiku-20240307', {
        baseURL: 'https://api.laozhang.ai/v1',
        apiKey: 'sk-01LzrSP0mwqnzT5wCf5bDdDc0e34481a97A92098632e4990',
      }),
      system: systemPrompt,
      prompt: message,
      maxTokens: 1000,
      temperature: 0.7,
    });

    console.log("[HealthMaxx] Response generated successfully")
    return new Response(JSON.stringify({ content: result.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error("[HealthMaxx] Error generating AI response:", error)
    return new Response("Failed to generate response", { status: 500 })
  }
}
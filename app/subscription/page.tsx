"use client"
import { ProtectedRoute } from "@/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Crown, Check, Zap } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Gratuito",
    price: "Gratis",
    period: "",
    description: "Perfecto para empezar tu viaje de salud",
    features: [
      "❤️ 3 vidas (puedes conseguir más comprándolas)",
      "📱 Anuncios en forma de banner",
      "🤖 Máximo 10 mensajes con Maxx AI",
      "💪 Solo salud física y salud mental",
      "📊 Seguimiento básico de progreso",
      "🧮 Calculadoras básicas (BMI, BMR)"
    ],
    popular: false,
    paypalPlanId: null,
    isFree: true,
  },
  {
    name: "Básico",
    price: "��9.99",
    period: "/mes",
    description: "Desbloquea más funciones sin limitaciones de vidas",
    features: [
      "❤️ Vidas ilimitadas",
      "🚫 Sin anuncios",
      "🤖 Máximo 30 mensajes con Maxx AI",
      "💪 Salud física y mental completa",
      "❤️ Salud emocional (acceso restringido)",
      "👥 Salud social (acceso restringido)",
      "📊 Analytics y seguimiento avanzado",
      "📈 Gráficos de progreso detallados"
    ],
    popular: true,
    paypalPlanId: "P-basic-plan-id",
    isFree: false,
  },
  {
    name: "Premium",
    price: "€19.99",
    period: "/mes",
    description: "Experiencia completa sin limitaciones",
    features: [
      "✨ Todo lo del plan Básico",
      "🤖 Conversaciones ilimitadas con Maxx AI",
      "🔓 Acceso completo a todas las pestañas",
      "🛒 Descuentos exclusivos en la tienda",
      "🎨 Skins exclusivas para personalización",
      "🧊 3 congeladores de racha semanales",
      "💎 Duplicación de gemas obtenidas",
      "🎙️ Chat de voz con Maxx AI",
      "🚫 Sin anuncios para conseguir gemas (máx. 10/día)",
      "📊 Analytics premium y exportación de datos",
      "🏆 Funciones de gamificación avanzadas"
    ],
    popular: false,
    paypalPlanId: "P-premium-plan-id",
    isFree: false,
  },
]

export default function SubscriptionPage() {
  const handleGetStarted = (plan: typeof plans[0]) => {
    if (plan.isFree) {
      // Handle free plan activation
      localStorage.setItem('userPlan', 'free')
      localStorage.setItem('planActivationDate', new Date().toISOString())
      // Redirect to dashboard with success message
      window.location.href = '/dashboard?plan=activated&type=free'
    } else {
      localStorage.setItem('selectedPlan', JSON.stringify(plan))
      window.location.href = '/payment'
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              💎 Subscription Plans
            </h1>
            <p className="text-muted-foreground mt-2">Upgrade your HealthMaxxing experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-border/50 hover:shadow-lg transition-all duration-300 ${
                  plan.popular ? "border-primary shadow-lg scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    <Zap className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-serif font-black">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "glow-primary" : ""} ${plan.isFree ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
                    variant={plan.isFree ? "default" : plan.popular ? "default" : "outline"}
                    onClick={() => handleGetStarted(plan)}
                  >
                    {plan.isFree ? "Activar Gratis" : "Suscribirse"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">All plans include:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Secure PayPal payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>24/7 customer support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Regular feature updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

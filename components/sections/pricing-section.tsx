import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "Perfect for getting started with AI fitness",
    features: [
      "AI-powered workout routines",
      "Basic progress tracking", 
      "Fitness calculators (BMI, BMR, 1RM)",
      "Chat with Maxx AI coach",
      "Mobile responsive design"
    ],
    popular: false,
    paypalPlanId: "P-basic-plan-id", // You'll need to create this in PayPal
  },
  {
    name: "Premium",
    price: "$19",
    period: "/month",
    description: "Advanced features for serious fitness enthusiasts",
    features: [
      "Everything in Basic",
      "Advanced analytics dashboard",
      "Workout heatmap visualization",
      "Nutrition tracking and charts",
      "Performance metrics tracking",
      "Data export functionality",
      "Priority AI responses"
    ],
    popular: true,
    paypalPlanId: "P-premium-plan-id", // You'll need to create this in PayPal
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "Complete fitness ecosystem for professionals",
    features: [
      "Everything in Premium",
      "Unlimited AI workout generation",
      "Custom nutrition plan creation",
      "Advanced goal setting system",
      "Multi-language support",
      "API access for integrations",
      "White-label options"
    ],
    popular: false,
    paypalPlanId: "P-pro-plan-id", // You'll need to create this in PayPal
  },
]

export function PricingSection() {
  const handleGetStarted = (plan: typeof plans[0]) => {
    // Store selected plan in localStorage for the payment page
    localStorage.setItem('selectedPlan', JSON.stringify(plan))
    // Redirect to payment page
    window.location.href = '/payment'
  }

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-6">
            Choose Your <span className="text-accent">Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free, upgrade when you're ready. All plans include our core AI features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "glow-primary" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleGetStarted(plan)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
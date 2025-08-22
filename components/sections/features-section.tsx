
"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, BarChart3, Users, Zap, Target, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "IA Avanzada",
      description: "Obtén rutinas personalizadas y consejos nutricionales de nuestro coach de IA avanzado.",
      color: "text-primary",
      bgColor: "from-primary/10 to-primary/5",
    },
    {
      icon: BarChart3,
      title: "Análisis Avanzados",
      description: "Rastrea tu progreso con análisis detallados e insights inteligentes.",
      color: "text-secondary",
      bgColor: "from-secondary/10 to-secondary/5",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Únete a una comunidad de personas comprometidas con su salud.",
      color: "text-accent",
      bgColor: "from-accent/10 to-accent/5",
    },
    {
      icon: Zap,
      title: "Feedback Instantáneo",
      description: "Recibe retroalimentación inmediata sobre tu progreso y rendimiento.",
      color: "text-primary",
      bgColor: "from-primary/10 to-primary/5",
    },
    {
      icon: Target,
      title: "Objetivos Inteligentes",
      description: "Establece y alcanza objetivos personalizados con IA que se adapta a ti.",
      color: "text-secondary",
      bgColor: "from-secondary/10 to-secondary/5",
    },
    {
      icon: Shield,
      title: "Seguridad Total",
      description: "Tus datos están protegidos con los más altos estándares de seguridad.",
      color: "text-accent",
      bgColor: "from-accent/10 to-accent/5",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Características
          </Badge>
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-6">
            Características Poderosas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre las herramientas que transformarán tu viaje hacia una vida más saludable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mb-4`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

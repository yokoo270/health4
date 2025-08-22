"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, BarChart3, Users, Zap, Target, Shield } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Bot,
      titleKey: "features.ai.title",
      descriptionKey: "features.ai.description",
      color: "text-primary",
      bgColor: "from-primary/10 to-primary/5",
    },
    {
      icon: BarChart3,
      titleKey: "features.analytics.title",
      descriptionKey: "features.analytics.description",
      color: "text-secondary",
      bgColor: "from-secondary/10 to-secondary/5",
    },
    {
      icon: Users,
      titleKey: "features.community.title",
      descriptionKey: "features.community.description",
      color: "text-accent",
      bgColor: "from-accent/10 to-accent/5",
    },
    {
      icon: Zap,
      titleKey: "features.feedback.title",
      descriptionKey: "features.feedback.description",
      color: "text-primary",
      bgColor: "from-primary/10 to-primary/5",
    },
    {
      icon: Target,
      titleKey: "features.goals.title",
      descriptionKey: "features.goals.description",
      color: "text-secondary",
      bgColor: "from-secondary/10 to-secondary/5",
    },
    {
      icon: Shield,
      titleKey: "features.safety.title",
      descriptionKey: "features.safety.description",
      color: "text-accent",
      bgColor: "from-accent/10 to-accent/5",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {t("nav.features")}
          </Badge>
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-6">
            {t("features.section.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("features.section.subtitle")}
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
                <CardTitle className="text-xl">{t(feature.titleKey)}</CardTitle>
                <CardDescription className="text-base">{t(feature.descriptionKey)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

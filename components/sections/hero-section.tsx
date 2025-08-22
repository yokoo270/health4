
"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <Badge variant="secondary" className="mb-6 text-sm font-medium animate-pulse">
          El futuro del fitness está aquí
        </Badge>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black mb-8">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            HealthMaxxing
          </span>
          <br />
          <span className="text-foreground">Revolución con IA</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
          Transforma tu viaje de fitness con rutinas personalizadas, análisis avanzados y coaching inteligente impulsado por IA
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link href="/auth/register">
            <Button size="lg" className="glow-primary text-lg px-8 py-6 group">
              Comienza tu viaje
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent group">
            <Play className="mr-2 w-5 h-5" />
            Ver demo
          </Button>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl"></div>
          <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-serif font-black text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Usuarios activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-black text-secondary mb-2">50M+</div>
                <div className="text-muted-foreground">Entrenamientos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-black text-accent mb-2">98%</div>
                <div className="text-muted-foreground">Éxito en objetivos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

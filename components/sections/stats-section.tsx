
"use client"
import { Badge } from "@/components/ui/badge"

export function StatsSection() {
  const stats = [
    { number: "2M+", label: "Usuarios transformados" },
    { number: "99%", label: "Satisfacción del cliente" },
    { number: "24/7", label: "Soporte disponible" },
    { number: "150+", label: "Países atendidos" },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Estadísticas
          </Badge>
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-6">
            Resultados que Hablan
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-black text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

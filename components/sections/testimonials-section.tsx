
"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "María González",
      role: "Atleta",
      content: "HealthMaxxing ha transformado completamente mi rutina de entrenamiento. La IA entiende perfectamente mis necesidades.",
      rating: 5
    },
    {
      name: "Carlos Ruiz",
      role: "Ejecutivo",
      content: "Como persona ocupada, necesitaba algo eficiente. Esta plataforma me ha ayudado a mantener mi salud sin sacrificar tiempo.",
      rating: 5
    },
    {
      name: "Ana López",
      role: "Estudiante",
      content: "Los análisis detallados me han ayudado a entender mejor mi progreso y mantenerme motivada día a día.",
      rating: 5
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Testimonios
          </Badge>
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-6">
            Lo que Dicen Nuestros Usuarios
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content:
      "HealthMaxxing's AI coach completely transformed my workout routine. I've seen results I never thought possible!",
    rating: 5,
    avatar: "/woman-fitness-avatar.png",
  },
  {
    name: "Mike Chen",
    role: "Professional Athlete",
    content:
      "The real-time analytics and form corrections have taken my training to the next level. Incredible technology!",
    rating: 5,
    avatar: "/man-athlete-avatar.png",
  },
  {
    name: "Emma Davis",
    role: "Busy Professional",
    content:
      "Finally, a fitness app that adapts to my crazy schedule. The AI knows exactly what I need, when I need it.",
    rating: 5,
    avatar: "/professional-woman-avatar.png",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-6">
            Loved by <span className="text-secondary">Thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what our community says about their transformation journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

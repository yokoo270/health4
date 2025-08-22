import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-black mb-6">
          Ready to <span className="text-primary">Transform</span>?
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Join thousands of users who have already revolutionized their fitness journey with AI-powered coaching.
        </p>
        <Button size="lg" className="glow-primary text-lg px-8 py-6 group">
          Start Your Free Trial
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  )
}

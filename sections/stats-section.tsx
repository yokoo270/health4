import { Badge } from "@/components/ui/badge"

export function StatsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto text-center">
        <Badge variant="outline" className="mb-8">
          Trusted Worldwide
        </Badge>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl md:text-5xl font-serif font-black text-primary mb-2">10K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-serif font-black text-secondary mb-2">50M+</div>
            <div className="text-muted-foreground">Workouts</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-serif font-black text-accent mb-2">98%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-serif font-black text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

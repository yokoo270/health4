
"use client"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-black">HealthMaxxing</span>
            </div>
            <p className="text-muted-foreground">
              El futuro del fitness está aquí. Transforma tu cuerpo con inteligencia artificial.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Producto</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Características</li>
              <li>Precios</li>
              <li>API</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Compañía</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Acerca de</li>
              <li>Blog</li>
              <li>Carreras</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Ayuda</li>
              <li>Contacto</li>
              <li>Estado</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 HealthMaxxing. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}


"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export function LegalDisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedMedical, setAcceptedMedical] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem('healthmaxxing-legal-accepted')
    if (!hasAccepted) {
      setIsOpen(true)
    }
  }, [])

  const canProceed = acceptedPrivacy && acceptedTerms && acceptedMedical

  const handleAccept = () => {
    if (canProceed) {
      localStorage.setItem('healthmaxxing-legal-accepted', 'true')
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Aviso Legal Importante
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="medical" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="medical">Aviso Médico</TabsTrigger>
            <TabsTrigger value="privacy">Privacidad</TabsTrigger>
            <TabsTrigger value="terms">Términos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="medical" className="mt-4">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">📄 Aviso Médico</h3>
                <p>
                  Nuestra IA, Health Maxxing AI, ha sido diseñada con la intención de ayudarte a mejorar tu salud, nutrición y hábitos de vida. Queremos que comprendas que, aunque nuestro objetivo es brindarte información útil y práctica, no somos médicos, nutricionistas colegiados ni profesionales de la salud, y nunca podemos reemplazar la atención de un profesional calificado.
                </p>
                
                <h4 className="font-semibold">1. Propósito de la información</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Todo lo que te proporcionamos está pensado como información orientativa y educativa.</li>
                  <li>La información puede incluir consejos sobre alimentación, ejercicios físicos, descanso, hidratación y hábitos saludables.</li>
                  <li>Estos consejos se basan en conocimiento general y buenas prácticas, pero no sustituyen diagnósticos médicos, tratamientos específicos o la supervisión profesional.</li>
                </ul>
                
                <h4 className="font-semibold">2. Consulta profesional</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Antes de realizar cambios significativos en tu dieta, rutina de ejercicios, medicación o estilo de vida, siempre consulta con un médico o especialista.</li>
                  <li>Esto es especialmente importante si:
                    <ul className="list-disc pl-6 mt-2">
                      <li>Tienes alguna enfermedad crónica o condición médica (por ejemplo, diabetes, hipertensión, problemas cardíacos).</li>
                      <li>Estás embarazada o en periodo de lactancia.</li>
                      <li>Estás tomando medicación o suplementos que puedan interactuar con nuevos hábitos.</li>
                    </ul>
                  </li>
                </ul>
                
                <h4 className="font-semibold">3. Limitaciones de la IA</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nuestra IA analiza la información que nos das y genera recomendaciones basadas en patrones generales de salud.</li>
                  <li>No puede evaluar de manera personalizada todos los factores únicos de cada persona, como genética, historial clínico detallado o alergias.</li>
                  <li>La IA no puede diagnosticar enfermedades ni reemplazar el seguimiento médico profesional.</li>
                </ul>
                
                <h4 className="font-semibold">4. Responsabilidad</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Tú eres el responsable final de tus decisiones y acciones basadas en la información que recibes de la IA.</li>
                  <li>No nos hacemos responsables de consecuencias negativas derivadas del mal uso de nuestros consejos.</li>
                </ul>
                
                <h4 className="font-semibold">5. Emergencias médicas</h4>
                <p>
                  Si presentas síntomas graves, dolor intenso o una situación que pueda poner en riesgo tu vida o salud, contacta inmediatamente a un profesional de la salud o a los servicios de emergencia locales.
                </p>
                
                <div className="bg-primary/10 p-4 rounded-lg mt-4">
                  <p className="font-semibold">👉 En resumen:</p>
                  <p>Health Maxxing AI puede ayudarte a entender mejor cómo cuidar tu cuerpo y mente, pero tu salud debe ser siempre supervisada por un profesional calificado.</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-4">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">📄 Política de Privacidad</h3>
                <p>
                  En Health Maxxing AI nos tomamos muy en serio tu privacidad y seguridad de datos. Queremos explicarte de forma clara y detallada cómo recolectamos, usamos y protegemos tu información, así como tus derechos sobre ella.
                </p>
                
                <h4 className="font-semibold">1. Información que recopilamos</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Datos personales básicos: nombre, correo electrónico, edad, sexo, altura, peso y otra información que decidas proporcionarnos.</li>
                  <li>Información que ingresas en la IA: hábitos de vida, objetivos de salud, preferencias alimenticias, rutinas de ejercicios, etc.</li>
                  <li>Información técnica: dirección IP, tipo de dispositivo, sistema operativo, navegador y patrones de uso del servicio.</li>
                </ul>
                
                <h4 className="font-semibold">2. Cómo usamos tus datos</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Para personalizar tu experiencia, ajustando las recomendaciones a tus objetivos y perfil.</li>
                  <li>Para mejorar la IA, mediante análisis anónimo de uso que nos permite identificar errores, tendencias y áreas de mejora.</li>
                  <li>Para informarte sobre cambios importantes o actualizaciones del servicio, siempre evitando enviar publicidad no deseada.</li>
                </ul>
                
                <h4 className="font-semibold">3. Con quién compartimos tus datos</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>No vendemos tus datos a terceros bajo ninguna circunstancia.</li>
                  <li>Solo compartimos información con proveedores de servicios confiables, como servidores seguros, herramientas de análisis o pasarelas de pago.</li>
                  <li>Siempre se asegura que estos proveedores cumplan con estándares estrictos de seguridad y confidencialidad.</li>
                </ul>
                
                <h4 className="font-semibold">4. Seguridad de los datos</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Implementamos cifrado, firewalls y controles de acceso estrictos para proteger tu información.</li>
                  <li>Solo personal autorizado tiene acceso a tus datos, y siempre bajo estrictas medidas de confidencialidad.</li>
                  <li>Aunque hacemos todo lo posible, ningún sistema digital puede garantizar una seguridad del 100%, por lo que recomendamos mantener tus credenciales protegidas.</li>
                </ul>
                
                <h4 className="font-semibold">5. Tus derechos</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Puedes solicitar en cualquier momento acceso a tus datos, corrección de errores, eliminación de información o restricción de su uso.</li>
                  <li>Si decides dejar de usar el servicio, puedes eliminar tu cuenta fácilmente y solicitar que tus datos sean borrados de nuestros sistemas.</li>
                  <li>Tienes derecho a revocar el consentimiento para el uso de tus datos en cualquier momento, sin que esto afecte tu uso previo del servicio.</li>
                </ul>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="terms" className="mt-4">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">📄 Términos de Uso</h3>
                <p>Bienvenido a Health Maxxing AI. Al usar nuestra plataforma, aceptas las siguientes condiciones:</p>
                
                <h4 className="font-semibold">1. Uso responsable</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Debes usar la IA de forma legal, ética y respetuosa.</li>
                  <li>Está prohibido: hackear, distribuir virus, copiar contenido sin autorización, acosar a otros usuarios o utilizar la información para fines ilegales.</li>
                </ul>
                
                <h4 className="font-semibold">2. Contenido ofrecido</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>La IA proporciona recomendaciones generales sobre salud, nutrición y deporte.</li>
                  <li>La información tiene fines educativos e informativos; no reemplaza el diagnóstico ni tratamiento médico profesional.</li>
                </ul>
                
                <h4 className="font-semibold">3. Limitación de responsabilidad</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>No nos hacemos responsables de daños o perjuicios derivados de la aplicación incorrecta de nuestros consejos.</li>
                  <li>Tú eres responsable de tus decisiones y acciones, así como de cualquier resultado derivado de seguir nuestras recomendaciones.</li>
                </ul>
                
                <h4 className="font-semibold">4. Suscripciones y pagos</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Si eliges un plan de pago, se te cobrará según la tarifa indicada (mensual, trimestral o anual).</li>
                  <li>Puedes cancelar tu suscripción en cualquier momento; el cobro se detendrá en el siguiente ciclo.</li>
                  <li>No ofrecemos reembolsos retroactivos por pagos ya realizados, salvo excepciones que se evaluarán caso por caso.</li>
                </ul>
                
                <h4 className="font-semibold">5. Cambios en los términos</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Podemos actualizar estos términos para mejorar el servicio o ajustarnos a cambios legales.</li>
                  <li>Te notificaremos de cambios significativos, y tu uso continuado implica la aceptación de las nuevas condiciones.</li>
                </ul>
                
                <h4 className="font-semibold">6. Propiedad intelectual</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Todo el contenido, gráficos, textos y código de Health Maxxing AI son propiedad de la empresa.</li>
                  <li>No se permite copiar, reproducir o distribuir sin autorización expresa.</li>
                </ul>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="medical" 
              checked={acceptedMedical}
              onCheckedChange={setAcceptedMedical}
            />
            <label htmlFor="medical" className="text-sm">
              He leído y acepto el aviso médico
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="privacy" 
              checked={acceptedPrivacy}
              onCheckedChange={setAcceptedPrivacy}
            />
            <label htmlFor="privacy" className="text-sm">
              He leído y acepto la política de privacidad
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={acceptedTerms}
              onCheckedChange={setAcceptedTerms}
            />
            <label htmlFor="terms" className="text-sm">
              He leído y acepto los términos de uso
            </label>
          </div>
          
          <Button 
            onClick={handleAccept} 
            disabled={!canProceed}
            className="w-full"
          >
            Continuar a HealthMaxxing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

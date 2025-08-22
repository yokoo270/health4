"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield } from "lucide-react"

export function MedicalDisclaimerModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Shield className="w-4 h-4" />
          Declaración Médica
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Declaración de cualificación
          </DialogTitle>
          <DialogDescription className="text-lg font-semibold text-red-600">
            HealthMaxxing NO es un dispositivo médico
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <p className="text-muted-foreground">Última actualización: 20/08/25</p>
            
            <section>
              <h3 className="font-bold text-base mb-2">1) Resumen ejecutivo</h3>
              <p>
                HealthMaxxing es una aplicación/servicio digital orientado a bienestar general y deporte. Su finalidad prevista ("intended use") es apoyar hábitos saludables (p. ej., actividad física, sueño, hidratación, motivación, educación deportiva) en población general saludable. No está diseñado ni destinado a diagnosticar, prevenir, monitorizar o tratar enfermedades o condiciones médicas, ni a proporcionar decisiones clínicas, ni a sustituir el criterio de profesionales sanitarios.
              </p>
              <div className="mt-3 space-y-2">
                <p><strong>En consecuencia, y de acuerdo con:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>UE (MDR 2017/745)</strong> y la guía MDCG 2019-11 sobre software, los productos con finalidad no médica no son "dispositivo médico". Nuestra finalidad declarada y la funcionalidad implementada se limitan al bienestar y no encajan en los fines médicos del art. 2(1) MDR.</li>
                  <li><strong>EE. UU. (FDA):</strong> nos alineamos con la guía "General Wellness: Policy for Low Risk Devices", que describe productos de bienestar de bajo riesgo y finalidad de estilo de vida saludable sobre los que la FDA no ejerce requisitos de dispositivo.</li>
                  <li><strong>México (COFEPRIS):</strong> aun cuando existe la vía de "software como dispositivo médico" para funciones con finalidad médica, nuestra solución no persigue fines médicos, por lo que no requiere registro sanitario como dispositivo.</li>
                </ul>
              </div>
              <p className="mt-3 text-amber-600 font-semibold">
                <strong>Importante:</strong> esta declaración se basa en nuestra finalidad prevista y funciones efectivas. Si en el futuro se incorporaran funciones con finalidad médica, reevaluaremos la calificación y, si procede, seguiremos los procesos regulatorios aplicables.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">2) Finalidad prevista (Intended Use) – ámbito de bienestar general</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Objetivo:</strong> fomentar actividad física segura, hábitos de recuperación, educación deportiva y motivación.</li>
                <li><strong>Usuarios previstos:</strong> adultos sanos sin condiciones médicas que requieran supervisión clínica.</li>
                <li><strong>Entornos de uso:</strong> uso personal/recreativo en hogar/gimnasio/aire libre.</li>
                <li><strong>Tipo de contenido:</strong> recomendaciones generales y no personalizadas clínicamente; recordatorios, metas de pasos, minutos activos, descanso, hidratación, pautas de estiramiento no terapéuticas, educación en técnica deportiva no clínica.</li>
                <li><strong>Limitaciones explícitas:</strong> no apto para diagnóstico, predicción de riesgo de enfermedad, monitorización de estados patológicos, decisiones de tratamiento, ni manejo de emergencias.</li>
              </ul>
              <p className="mt-3">
                Esta finalidad no entra en las finalidades médicas del art. 2(1) MDR (diagnóstico, prevención, monitorización, predicción, pronóstico, tratamiento o alivio de una enfermedad/lesión/discapacidad), por lo que el software no se califica como dispositivo bajo MDR; lo respalda la guía MDCG 2019-11 para software.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">3) Funciones incluidas (aceptables para bienestar)</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Paneles de actividad física (pasos, tiempo activo, frecuencia de entrenamiento) y hábitos de recuperación no clínicos (sueño en términos de duración/regularidad sin interpretar trastornos).</li>
                <li>Coaching motivacional y educación sobre técnica deportiva/higiene postural genérica, sin protocolos terapéuticos.</li>
                <li>Recordatorios de hidratación/movimiento y metas de estilo de vida no relacionadas con una patología.</li>
                <li>Contenido educativo basado en guías de actividad física de salud pública (no clínico).</li>
                <li>Integraciones con wearables para datos de actividad no médicos (p. ej., pasos, calorías estimadas), sin transformar esos datos en opiniones clínicas ni detectores de enfermedad.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">7) Avisos legales que mostramos al usuario</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>No sustituye atención médica:</strong> "HealthMaxxing no proporciona consejos médicos. Si tienes una condición de salud o síntomas, consulta a un profesional sanitario."</li>
                <li><strong>Población objetivo:</strong> "Servicio diseñado para adultos sanos interesados en mejorar su bienestar y rendimiento deportivo recreativo."</li>
                <li><strong>Limitaciones:</strong> "No está destinado a diagnosticar, prevenir, monitorizar o tratar enfermedades ni a tomar decisiones clínicas."</li>
                <li><strong>Emergencias:</strong> "Ante una emergencia, llama a los servicios de urgencias locales de inmediato."</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">9) Descargo de responsabilidad</h3>
              <p>
                Este documento proporciona nuestra declaración de finalidad prevista y base regulatoria a fecha indicada. No constituye asesoramiento jurídico; las clasificaciones pueden variar por jurisdicción y por cambios funcionales. Para usos profesionales, clínicos o poblaciones médicas, se requerirá reevaluación y, en su caso, conformidad regulatoria.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

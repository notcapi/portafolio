"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const faqs = [
  {
    question: "¿Cuánto cuesta un MVP?",
    answer:
      "Depende del alcance, pero la mayoría de MVPs están en el rango de €3.000-€8.000. Incluye diseño, desarrollo, integraciones básicas y despliegue. Primera sesión gratis para estimar tu proyecto específico."
  },
  {
    question: "¿Necesito saber programar?",
    answer:
      "No. Solo necesitas claridad sobre el problema que quieres resolver. Yo traduzco tu visión en soluciones técnicas, eligiendo el stack más eficiente (código, no-code o híbrido)."
  },
  {
    question: "¿Qué pasa después del prototipo?",
    answer:
      "Tienes 3 opciones: (1) seguir iterando conmigo basado en feedback, (2) pasárselo a tu equipo técnico con documentación completa, o (3) buscar inversión/clientes con el prototipo validado."
  },
  {
    question: "¿Trabajas solo o con equipos?",
    answer:
      "Principalmente trabajo individual para MVPs rápidos. Para proyectos más grandes colaboro con diseñadores y especialistas según necesidad, pero mantengo un equipo lean para máxima velocidad."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Preguntas frecuentes</h2>
        <p className="mt-2 text-base text-muted-foreground">
          Resuelve tus dudas antes de agendar
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-border/40 bg-glass backdrop-blur-sm transition-all hover:border-border/60"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors"
                aria-expanded={isOpen}
              >
                <span className="pr-8 text-lg font-semibold">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-2">
                  <p className="text-base text-muted-foreground/90">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

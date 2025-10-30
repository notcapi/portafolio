"use client";

import { Calendar, Code, TestTube, Rocket } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Semana 1",
    subtitle: "Mapeo de alcance",
    description: "Definimos funcionalidades core, diseño de flujos y stack técnico ideal",
    icon: Calendar
  },
  {
    number: "2-3",
    title: "Semanas 2-3",
    subtitle: "Construcción del MVP",
    description: "Desarrollo iterativo con feedback diario. Ver progreso en tiempo real",
    icon: Code
  },
  {
    number: "4",
    title: "Semana 4",
    subtitle: "Tests y ajustes",
    description: "Pruebas con usuarios reales, ajustes basados en feedback directo",
    icon: TestTube
  },
  {
    number: "✓",
    title: "Resultado",
    subtitle: "MVP validado",
    description: "Prototipo funcional listo para presentar a inversores o clientes",
    icon: Rocket
  }
];

export default function WorkflowSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Cómo trabajamos juntos</h2>
        <p className="mt-2 text-base text-muted-foreground">
          De concepto a prototipo en 4 semanas. Proceso transparente, resultados medibles.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="relative rounded-2xl border border-border/40 bg-glass p-6 shadow-glass backdrop-blur-sm transition-all hover:border-border/60 hover:shadow-glass-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold text-muted-foreground">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{step.subtitle}</p>
              <p className="mt-2 text-sm text-muted-foreground/90">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

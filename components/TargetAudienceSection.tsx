"use client";

import { Briefcase, Lightbulb, Users } from "lucide-react";

const audiences = [
  {
    title: "Emprendedores",
    icon: Lightbulb,
    description: "Valida tu SaaS antes de invertir 6 meses",
    benefit: "MVP funcional para testear con usuarios reales y conseguir feedback temprano"
  },
  {
    title: "Empresas",
    icon: Briefcase,
    description: "Automatiza procesos que consumen 10+ horas/semana",
    benefit: "Integraciones entre herramientas que trabajan solas y reportan automáticamente"
  },
  {
    title: "Equipos técnicos",
    icon: Users,
    description: "Acelera tu MVP con IA como copiloto",
    benefit: "Scaffolding rápido, automatizaciones probadas y best practices desde día uno"
  }
];

export default function TargetAudienceSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Para quién es esto</h2>
        <p className="mt-2 text-base text-muted-foreground">
          Soluciones específicas para cada tipo de proyecto
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((audience) => {
          const Icon = audience.icon;
          return (
            <div
              key={audience.title}
              className="group relative rounded-2xl border border-border/40 bg-glass p-6 shadow-glass backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-glass-lg md:p-8"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold">{audience.title}</h3>
              <p className="mt-2 text-base font-medium text-primary">{audience.description}</p>
              <p className="mt-3 text-sm text-muted-foreground/90">{audience.benefit}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

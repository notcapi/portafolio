"use client";

import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const caseStudy = {
  title: "Caso destacado: RAG Customer Support",
  problem: {
    icon: AlertCircle,
    title: "El problema",
    description: "Equipo de atención al cliente respondía consultas repetitivas consultando manualmente múltiples documentos (políticas, horarios, procedimientos). Esto causaba inconsistencias en respuestas y pérdida de tiempo en búsqueda de información."
  },
  solution: {
    icon: CheckCircle,
    title: "La solución",
    description: "Sistema RAG con Relevance AI que indexa toda la documentación interna. El usuario copia el email del cliente, la IA busca en la base de conocimiento y genera una respuesta coherente lista para enviar. Incluye referencias a documentos consultados."
  },
  results: {
    icon: TrendingUp,
    title: "Resultados",
    metrics: [
      "Respuestas consistentes alineadas con políticas oficiales",
      "Reducción significativa en tiempo de búsqueda de información",
      "Cero alucinaciones gracias a prompts jerárquicos y extractos citados",
      "Sistema en producción con validación humana antes de envío"
    ]
  },
  timeline: {
    icon: Clock,
    title: "Timeline",
    description: "Sistema implementado y en producción manual (asistido por humano)"
  }
};

export default function CaseStudySection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{caseStudy.title}</h2>
        <p className="mt-2 text-base text-muted-foreground">
          De 200 consultas mensuales manuales a automatización inteligente
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Problema */}
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <caseStudy.problem.icon className="h-5 w-5 text-destructive" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold">{caseStudy.problem.title}</h3>
          </div>
          <p className="text-base text-muted-foreground">{caseStudy.problem.description}</p>
        </div>

        {/* Solución */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <caseStudy.solution.icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold">{caseStudy.solution.title}</h3>
          </div>
          <p className="text-base text-muted-foreground">{caseStudy.solution.description}</p>
        </div>
      </div>

      {/* Resultados */}
      <div className="rounded-2xl border border-border/40 bg-glass p-8 shadow-glass backdrop-blur-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <caseStudy.results.icon className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold">{caseStudy.results.title}</h3>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {caseStudy.results.metrics.map((metric, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
              <span className="text-base text-muted-foreground">{metric}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline */}
      <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-glass p-6 shadow-glass backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <caseStudy.timeline.icon className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold">{caseStudy.timeline.title}</h3>
            <p className="text-sm text-muted-foreground">{caseStudy.timeline.description}</p>
          </div>
        </div>
        <Button asChild variant="outline">
          <Link href="/projects">Ver más proyectos</Link>
        </Button>
      </div>
    </div>
  );
}

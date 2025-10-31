"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const skills = [
  "Cursor",
  "Claude Code",
  "Codex",
  "Next.js",
  "Supabase",
  "Tailwind CSS",
  "n8n",
  "Relevance AI",
  "Make",
  "Zapier",
  "OpenAI",
  "Anthropic",
  "RAG Systems",
  "VibeCode",
  "Prompt Design"
];

const timeline = [
  {
    title: "Construyendo un marketplace de entrenadores",
    org: "Proyecto personal",
    period: "2025 — Actualidad",
    description:
      "Mi propio MVP para conectar entrenadores con clientes. Gestión de horarios, pagos, comunicación. Pruebo en carne propia lo que recomiendo a otros: lanzar rápido, iterar con feedback real."
  },
  {
    title: "Automatizando un gimnasio desde dentro",
    org: "Centro deportivo",
    period: "2023 — 2025",
    description:
      "Cansado de responder las mismas preguntas 50 veces al día, creé un chatbot con IA que lee nuestra documentación. También automaticé correos repetitivos y procesos de datos. El equipo recuperó horas cada semana."
  },
  {
    title: "Aprendiendo en primera línea",
    org: "Centro deportivo",
    period: "2017 — Actualidad",
    description:
      "Empecé atendiendo clientes, gestionando cobros y resolviendo incidencias. Vi los problemas reales de un negocio operando cada día. Esa perspectiva me permite construir soluciones que realmente funcionan."
  },
  {
    title: "De usuario curioso a constructor",
    org: "Formación autodidacta",
    period: "2022 — Actualidad",
    description:
      "Cada proyecto es una oportunidad de aprender. Sigo de cerca los avances en IA (OpenAI, Anthropic, Claude) y pruebo nuevas herramientas constantemente. Lo que funciona, lo aplico. Lo que no, lo descarto."
  }
];

export default function AboutPage() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 text-center lg:sticky lg:top-24"
        >
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-primary/40 shadow-glow">
            <Image
              src="/avatar.svg"
              alt="Retrato de Borja Galván"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Borja Galván - Desarrollador IA Madrid</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              AI-assisted App Builder · No-Code/Low-Code Developer
            </p>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Convierto ideas en productos funcionales usando IA y automatización.
            Sin meses de desarrollo, sin equipos grandes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Cómo trabajo</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Durante años trabajando en un centro deportivo, vi cómo los procesos manuales consumían
              tiempo valioso. Empecé a automatizar tareas repetitivas, a responder consultas con IA,
              y a construir herramientas que resolvían problemas reales.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Hoy uso esas mismas técnicas para ayudar a otros: prototipos en semanas (no meses),
              automatizaciones que funcionan 24/7, y chatbots que entienden tu documentación.
              Todo sin necesidad de contratar un equipo completo de desarrollo.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Mi enfoque es simple: empezar rápido, validar con usuarios reales, iterar según
              feedback. Nada de proyectos eternos que nunca llegan a producción.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">En qué puedo ayudarte</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/60 p-6">
                <h3 className="font-semibold text-primary">Prototipos rápidos</h3>
                <p className="text-sm text-muted-foreground">
                  ¿Tienes una idea pero no sabes programar? Construyo MVPs funcionales en semanas
                  usando IA para acelerar el desarrollo. Valida tu concepto antes de invertir meses.
                </p>
              </div>
              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/60 p-6">
                <h3 className="font-semibold text-primary">Automatización de tareas</h3>
                <p className="text-sm text-muted-foreground">
                  ¿Pierdes horas en tareas repetitivas? Conecto tus herramientas (correo, CRM, bases
                  de datos) para que trabajen solas. Automatizaciones que te devuelven tiempo valioso.
                </p>
              </div>
              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/60 p-6">
                <h3 className="font-semibold text-primary">Chatbots inteligentes</h3>
                <p className="text-sm text-muted-foreground">
                  ¿Respondes las mismas preguntas una y otra vez? Creo asistentes con IA que leen
                  tu documentación y responden consultas 24/7 con información precisa y trazable.
                </p>
              </div>
              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/60 p-6">
                <h3 className="font-semibold text-primary">Optimización de procesos</h3>
                <p className="text-sm text-muted-foreground">
                  ¿Tus equipos hacen lo mismo de formas diferentes? Documento procesos, creo plantillas
                  y reduzco errores. Todo queda estandarizado y reproducible.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 text-center space-y-4 shadow-glow">
            <h2 className="text-2xl font-semibold">¿Listo para empezar?</h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Cuéntame tu proyecto y te diré cómo podemos hacerlo realidad.
              Sin compromiso, sin letra pequeña.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Agenda una llamada</Link>
            </Button>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Herramientas que uso</h2>
            <p className="text-sm text-muted-foreground">
              No me caso con ninguna tecnología. Elijo lo que mejor resuelve tu problema:
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-primary/40 bg-primary/5 text-primary"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Mi trayectoria</h2>
            <p className="text-sm text-muted-foreground">
              Construyo soluciones porque he visto los problemas desde dentro. No son teorías,
              son situaciones que viví y resolví.
            </p>
            <ol className="relative space-y-8 before:absolute before:left-3 before:top-2 before:h-full before:w-px before:bg-border/60">
              {timeline.map((item) => (
                <li key={item.title} className="relative pl-10">
                  <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-background text-xs font-semibold text-primary">
                    ●
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.org}</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
                      {item.period}
                    </span>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </motion.div>
      </div>
    </Section>
  );
}

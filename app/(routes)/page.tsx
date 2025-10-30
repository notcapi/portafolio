"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import WorkflowSection from "@/components/WorkflowSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import FAQSection, { faqs } from "@/components/FAQSection";
import CaseStudySection from "@/components/CaseStudySection";
import TrustBadges from "@/components/TrustBadges";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import {
  getPersonSchema,
  getWebSiteSchema,
  getFAQPageSchema,
  getProfessionalServiceSchema,
  renderStructuredData,
  combineSchemas
} from "@/lib/structured-data";

const featuredProjectIds = [
  "pricewise",
  "fitcoach-mvp",
  "rag-customer-support",
  "email-automation-n8n",
  "seowise"
] as const;

const featuredProjects = featuredProjectIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project));

export default function HomePage() {
  const schemas = combineSchemas(
    getPersonSchema(),
    getWebSiteSchema(),
    getFAQPageSchema(faqs),
    getProfessionalServiceSchema()
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderStructuredData(schemas)}
      />

      <section className="relative overflow-hidden pb-10 pt-24 sm:pt-28">
        <div className="absolute inset-0 hero-gradient opacity-60 blur-3xl" aria-hidden="true" />
        <div className="container relative flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Disponible para colaboraciones 2025
            </span>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Desarrollo MVPs en 2 Semanas con IA | Freelance Madrid
            </h1>
            <p className="text-xl font-medium text-muted-foreground">
              Convierto ideas en productos funcionales usando IA
            </p>
            <p className="text-sm text-muted-foreground/70">
              AI-assisted App Builder · No-Code/Low-Code Developer
            </p>
            <p className="max-w-xl text-lg text-muted-foreground/90">
              Tu idea funcionando en navegador en 2 semanas. Sin equipo completo, sin meses de espera.
              Uso IA, código y no-code para elegir siempre la ruta más rápida al mercado.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="#destacados">
                  Ver proyectos
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/contact">Agenda una llamada</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mx-auto w-full max-w-md rounded-3xl border border-border/40 bg-glass p-6 shadow-glass backdrop-blur-lg"
          >
            <dl className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="text-muted-foreground">Prototipos validados</dt>
                <dd className="mt-1 text-2xl font-semibold text-primary">18 de 25+</dd>
                <p className="mt-1 text-xs text-muted-foreground">con usuarios reales</p>
              </div>
              <div>
                <dt className="text-muted-foreground">Tiempo ahorrado</dt>
                <dd className="mt-1 text-2xl font-semibold text-primary">200+ h/mes</dd>
                <p className="mt-1 text-xs text-muted-foreground">en automatizaciones</p>
              </div>
              <div>
                <dt className="text-muted-foreground">Velocidad promedio</dt>
                <dd className="mt-1 text-lg font-semibold text-foreground">2-3 semanas</dd>
                <p className="mt-1 text-xs text-muted-foreground">de idea a MVP</p>
              </div>
              <div>
                <dt className="text-muted-foreground">Stack híbrido</dt>
                <dd className="mt-1 text-lg font-semibold text-foreground">IA · Web · No-code</dd>
                <p className="mt-1 text-xs text-muted-foreground">Remoto · Madrid</p>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      <Section>
        <TargetAudienceSection />
      </Section>

      <Section id="destacados" className="bg-background/60">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Proyectos destacados</h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              Ejemplos reales de MVPs con IA: chatbots RAG, automatización con n8n y Supabase,
              scrapers en Python, análisis SEO y plataformas Next.js. Desarrollados en 2-3 semanas
              combinando código y no-code.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/projects" className="gap-2">
              Ver todos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <Section>
        <CaseStudySection />
      </Section>

      <Section className="bg-background/60">
        <WorkflowSection />
      </Section>

      <Section>
        <FAQSection />
      </Section>

      <Section withPadding={false} className="pb-20 pt-10">
        <div className="space-y-8 rounded-3xl border border-border/40 bg-glass p-10 shadow-glass">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">¿Listo para validar tu idea en 3 semanas?</h3>
              <p className="mt-2 max-w-xl text-base text-muted-foreground">
                Siguiente paso: sesión gratuita de 30 min para mapear tu MVP.
                Agenda disponible hasta mayo 2025.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Agendar sesión</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Conocer trayectoria</Link>
              </Button>
            </div>
          </div>
          <TrustBadges />
        </div>
      </Section>
    </>
  );
}

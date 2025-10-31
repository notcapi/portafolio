"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import FilterPills from "@/components/FilterPills";
import { projects } from "@/data/projects";

const filters = ["All", "Web", "IA", "No-code"] as const;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <Section>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm">
          Showcase
        </span>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Proyectos de IA y Automatización</h1>
        <p className="text-base text-muted-foreground">
          Selección curada de productos, automatizaciones y herramientas generativas. Cada
          caso incluye stack, descripción en markdown y enlaces clave.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <FilterPills
          options={[...filters]}
          active={activeFilter}
          onChange={(value) => setActiveFilter(value as (typeof filters)[number])}
        />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}

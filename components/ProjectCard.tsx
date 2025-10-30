"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ImageLightbox from "@/components/ImageLightbox";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  elevation?: number;
  className?: string;
};

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn("group", className)}
      >
        <Card
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label={`Abrir detalles del proyecto ${project.title}`}
          className="flex h-full flex-col overflow-hidden border border-border/30 bg-background/70 transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="relative overflow-hidden">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.cover}
                  alt={`${project.title}: ${project.summary}`}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
              </div>
            </motion.div>
          </div>
          <CardContent className="flex flex-1 flex-col gap-3 px-6 py-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="border border-border/40">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.article>

      <ImageLightbox project={project} open={open} onOpenChange={setOpen} />
    </>
  );
}

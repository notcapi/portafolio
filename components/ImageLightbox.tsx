"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MDRenderer from "@/components/MDRenderer";
import type { Project } from "@/data/projects";

type ImageLightboxProps = {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ImageLightbox({ project, open, onOpenChange }: ImageLightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.summary}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className={`grid gap-4 ${project.images.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}>
            {project.images.map((image, index) => (
              <div
                key={image}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/40"
              >
                <Image
                  src={image}
                  alt={`Vista ${index + 1} de ${project.title}: ${project.summary}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <MDRenderer content={project.descriptionMD} />
          <div className="flex flex-wrap items-center gap-3">
            {project.links.demo && (
              <Button asChild>
                <a href={project.links.demo} target="_blank" rel="noreferrer">
                  Visitar web
                </a>
              </Button>
            )}
            {project.links.repo && (
              <Button asChild variant="outline">
                <a href={project.links.repo} target="_blank" rel="noreferrer">
                  Ver repositorio
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

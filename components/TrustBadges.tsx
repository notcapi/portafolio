"use client";

import { Clock, FileCheck, Shield } from "lucide-react";

const badges = [
  {
    icon: Clock,
    title: "Respuesta en 24h",
    description: "Respondo todas las consultas en menos de un día hábil"
  },
  {
    icon: FileCheck,
    title: "Primera sesión gratis",
    description: "30 min de descubrimiento sin compromiso para mapear tu proyecto"
  },
  {
    icon: Shield,
    title: "Sin compromiso",
    description: "No firmas nada hasta que veas el plan completo y te convenza"
  }
];

export default function TrustBadges() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.title}
            className="flex items-start gap-3 rounded-xl border border-border/40 bg-glass/50 p-4 backdrop-blur-sm"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{badge.title}</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

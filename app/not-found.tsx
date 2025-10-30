"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl rounded-3xl border border-border/40 bg-glass p-10 text-center shadow-glass"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
          404
        </div>
        <h1 className="mt-6 text-3xl font-semibold">Página no encontrada</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Puede que el enlace esté roto o que la página haya sido movida. Regresa al inicio
          para seguir explorando el portafolio.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al inicio
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/projects">Ver proyectos</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

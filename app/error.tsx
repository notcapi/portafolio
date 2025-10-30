"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Error boundary component
 * Catches errors in client components and shows a fallback UI
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
        </div>

        <h1 className="mb-2 text-2xl font-semibold">Algo salió mal</h1>

        <p className="mb-6 text-sm text-muted-foreground">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la página.
        </p>

        {/* Show error message in development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 rounded-lg border border-border/40 bg-muted/30 p-4 text-left">
            <summary className="cursor-pointer text-sm font-medium">
              Detalles del error (solo en desarrollo)
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-muted-foreground">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </details>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Reintentar
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" aria-hidden="true" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

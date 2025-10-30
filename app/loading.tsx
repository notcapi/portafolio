import { Loader2 } from "lucide-react";

/**
 * Global loading UI
 * Shown during page navigation and data fetching
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Cargando contenido"
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2
          className="h-12 w-12 animate-spin text-primary"
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    </div>
  );
}

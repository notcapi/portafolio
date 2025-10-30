"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Global error boundary
 * Catches errors in the root layout
 * Must be a minimal implementation as it replaces the entire root layout
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ maxWidth: "28rem", textAlign: "center" }}>
            <div
              style={{
                marginBottom: "1.5rem",
                display: "inline-flex",
                height: "4rem",
                width: "4rem",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "9999px",
                backgroundColor: "#fee",
              }}
            >
              <AlertTriangle
                size={32}
                style={{ color: "#b91c1c" }}
                aria-hidden="true"
              />
            </div>

            <h1
              style={{
                marginBottom: "0.5rem",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              Error crítico
            </h1>

            <p
              style={{
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
                color: "#666",
              }}
            >
              Lo sentimos, ha ocurrido un error crítico. Por favor, recarga la página.
            </p>

            {process.env.NODE_ENV === "development" && (
              <details
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#f9fafb",
                  textAlign: "left",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  Detalles del error (solo en desarrollo)
                </summary>
                <pre
                  style={{
                    marginTop: "0.5rem",
                    overflow: "auto",
                    fontSize: "0.75rem",
                    color: "#666",
                  }}
                >
                  {error.message}
                </pre>
                {error.digest && (
                  <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#666" }}>
                    Error ID: {error.digest}
                  </p>
                )}
              </details>
            )}

            <button
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "white",
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={16} aria-hidden="true" />
              Reintentar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

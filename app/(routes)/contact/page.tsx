"use client";

import { useState } from "react";
import { Github, Linkedin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const socials = [
  { href: "https://github.com/notcapi", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/borja-galv%C3%A1n-chivite-b83976251/", label: "LinkedIn", icon: Linkedin }
];

// Validation schema (matches API)
const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().email("Email inválido"),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(5000),
  website: z.string().max(0).optional(), // Honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el mensaje");
      }

      setStatus("success");
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error al enviar el mensaje. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <Section>
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Contacto
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">Agenda una Sesión Gratuita</h1>
        <p className="text-base text-muted-foreground">
          Cuéntame qué necesitas: un MVP acelerado, automatizar operaciones o integrar IA en
          tu stack actual. Respondo en menos de 24h.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-border/40 bg-glass p-8 shadow-glass space-y-6"
        >
          {/* ARIA live region for form status announcements */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {status === "submitting" && "Enviando mensaje..."}
            {status === "success" && "Mensaje enviado correctamente"}
            {status === "error" && `Error: ${errorMessage}`}
          </div>

          {/* Success/Error messages */}
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">¡Mensaje enviado!</p>
                  <p className="mt-1 text-green-600/80 dark:text-green-400/80">
                    Te responderé pronto. Gracias por contactarme.
                  </p>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Error al enviar</p>
                  <p className="mt-1 text-red-600/80 dark:text-red-400/80">
                    {errorMessage}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Honeypot field (hidden from users, visible to bots) */}
          <input
            type="text"
            {...register("website")}
            tabIndex={-1}
            autoComplete="off"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              opacity: 0,
            }}
            aria-hidden="true"
          />

          {/* Name field */}
          <div className="grid gap-2 text-left">
            <Label htmlFor="name">
              Nombre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Tu nombre"
              autoComplete="name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Company field (optional) */}
          <div className="grid gap-2 text-left">
            <Label htmlFor="company">
              Empresa <span className="text-xs text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="company"
              placeholder="Nombre de tu empresa"
              autoComplete="organization"
              aria-invalid={errors.company ? "true" : "false"}
              aria-describedby={errors.company ? "company-error" : undefined}
              {...register("company")}
            />
            {errors.company && (
              <p id="company-error" className="text-sm text-destructive" role="alert">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Message field */}
          <div className="grid gap-2 text-left">
            <Label htmlFor="message">
              Mensaje <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="¿Qué quieres construir?"
              rows={5}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message")}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-destructive" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar mensaje"
            )}
          </Button>
        </form>

        <aside className="flex flex-col gap-6 rounded-3xl border border-border/40 bg-background/60 p-8 shadow-glass">
          <div>
            <h2 className="text-2xl font-semibold">Redes y agenda</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefieres escribir por DM o agendar directo. Elige el canal que mejor te vaya.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/60 px-4 py-3 text-left text-sm text-muted-foreground transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-center gap-3">
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                  {social.label}
                </span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-left text-sm text-primary">
            <p className="font-medium">Tip</p>
            <p className="mt-2">
              Comparte contexto (objetivo, timeline y stack actual) para que la primera
              sesión sea directamente estratégica.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

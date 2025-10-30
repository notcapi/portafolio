import type { Metadata } from "next";
import { getContactPageSchema, renderStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contacto | Agenda Sesión Gratuita - Borja Galván",
  description:
    "¿Necesitas un MVP en 2 semanas? ¿Automatizar procesos con IA? Agenda una sesión gratuita. Respondo en menos de 24h. Freelance en Madrid.",
  keywords: [
    "contacto desarrollador ia",
    "agenda sesión mvp",
    "consultoría ia madrid",
    "automatización procesos",
    "freelance no-code",
    "desarrollo rápido",
  ],
  openGraph: {
    title: "Contacto | Agenda Sesión Gratuita - Borja Galván",
    description:
      "Cuéntame tu proyecto y te diré cómo hacerlo realidad. Primera sesión gratis, sin compromiso.",
    url: "https://borjagalvan.dev/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactSchema = getContactPageSchema();

  return (
    <>
      {/* Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderStructuredData(contactSchema)}
      />
      {children}
    </>
  );
}

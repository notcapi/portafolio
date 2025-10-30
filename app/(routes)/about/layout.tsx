import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mí | Borja Galván - Desarrollador IA Madrid",
  description:
    "AI-assisted App Builder especializado en MVPs rápidos y automatizaciones. Experiencia real automatizando procesos en gimnasios y empresas. Basado en Madrid.",
  keywords: [
    "desarrollador ia madrid",
    "freelance automatización",
    "no-code developer",
    "ai app builder",
    "experiencia rag",
    "automatización gimnasios",
    "desarrollador next.js madrid",
  ],
  openGraph: {
    title: "Sobre Mí | Borja Galván - Desarrollador IA Madrid",
    description:
      "Convierto ideas en productos funcionales usando IA. Experiencia automatizando procesos reales en empresas.",
    url: "https://borjagalvan.dev/about",
    type: "profile",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

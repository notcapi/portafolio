import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos de IA y Automatización | Borja Galván - Portfolio",
  description:
    "Portfolio de proyectos reales: MVPs con IA, automatizaciones con n8n, chatbots RAG y scrapers. Ejemplos de desarrollo rápido con Next.js, Python y no-code.",
  keywords: [
    "proyectos IA",
    "portfolio automatización",
    "mvp ejemplos",
    "chatbot rag",
    "desarrollo no-code",
    "proyectos next.js",
    "automatización n8n",
    "web scraping python",
  ],
  openGraph: {
    title: "Proyectos de IA y Automatización | Borja Galván",
    description:
      "Descubre proyectos reales: MVPs, automatizaciones y herramientas con IA. Desde chatbots RAG hasta scrapers de precios.",
    url: "https://borjagalvan.dev/projects",
    type: "website",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

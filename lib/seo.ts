import type { DefaultSeoProps } from "next-seo";

export const siteConfig = {
  name: "Desarrollo MVP en 2 Semanas con IA | Borja Galván - Madrid",
  description:
    "Convierto tu idea en MVP funcional en 2-3 semanas usando IA y no-code. Automatización de procesos, chatbots RAG y desarrollo rápido. Freelance especializado en Madrid, España. Primera sesión gratis.",
  url: "https://borjagalvan.dev",
  ogImage: "/og.png",
  locale: "es_ES"
};

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | Borja Galván",
  defaultTitle: siteConfig.name,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  additionalMetaTags: [
    { name: "theme-color", content: "#0f172a" },
    { name: "author", content: "Borja Galván" }
  ]
};

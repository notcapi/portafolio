import { siteConfig } from "./seo";

/**
 * JSON-LD Structured Data Utilities
 * Helps search engines understand the content and context of your website
 * Reference: https://schema.org/
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Person Schema - Represents the portfolio owner
 * Use on homepage and about page
 */
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Borja Galván",
    url: siteConfig.url,
    image: `${siteConfig.url}/avatar.svg`,
    jobTitle: "AI-assisted App Builder",
    description: siteConfig.description,
    sameAs: [
      "https://github.com/borjagalvan",
      "https://www.linkedin.com/in/borjagalvan",
      "https://x.com/borjagalvan",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Web Development",
      "No-Code Development",
      "Automation",
      "Prototyping",
      "Next.js",
      "React",
      "TypeScript",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Education Institution", // Update with actual education
    },
  };
}

/**
 * WebSite Schema - Represents the entire website
 * Use in root layout
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: "es-ES",
    author: {
      "@type": "Person",
      name: "Borja Galván",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * ProfilePage Schema - For the about page
 */
export function getProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01", // Update with actual date
    dateModified: new Date().toISOString().split("T")[0],
    mainEntity: getPersonSchema(),
  };
}

/**
 * CreativeWork Schema - For individual projects
 * Use on project detail views or cards
 */
export function getCreativeWorkSchema(project: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  technologies?: string[];
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    creator: {
      "@type": "Person",
      name: "Borja Galván",
      url: siteConfig.url,
    },
    ...(project.url && { url: project.url }),
    ...(project.image && { image: project.image }),
    ...(project.datePublished && { datePublished: project.datePublished }),
    ...(project.technologies && {
      keywords: project.technologies.join(", "),
    }),
  };
}

/**
 * ItemList Schema - For the projects listing page
 */
export function getProjectsListSchema(projects: Array<{
  name: string;
  url: string;
  description: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Proyectos de Borja Galván",
    description: "Portfolio de proyectos desarrollados con IA y tecnologías modernas",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        url: project.url,
        description: project.description,
      },
    })),
  };
}

/**
 * BreadcrumbList Schema - For navigation breadcrumbs
 * Helps search engines understand site structure
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * ContactPage Schema - For the contact page
 */
export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto - Borja Galván",
    description: "Ponte en contacto conmigo para proyectos de IA, automatizaciones y desarrollo web",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Borja Galván",
      email: "hello@ma6r.dev",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Professional Inquiries",
        availableLanguage: ["Spanish", "English"],
      },
    },
  };
}

/**
 * FAQPage Schema - For pages with frequently asked questions
 * Helps display rich results in search engines
 */
export function getFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * ProfessionalService Schema - For service-based businesses
 * Use on homepage or services page
 */
export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Borja Galván - Desarrollo MVP con IA",
    description: "Desarrollo de MVPs y automatizaciones con IA. Especializado en prototipado rápido, RAG, chatbots y no-code.",
    url: siteConfig.url,
    image: `${siteConfig.url}/og.png`,
    telephone: "+34-XXX-XXX-XXX", // Update with actual phone if available
    email: "hello@ma6r.dev",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressRegion: "Madrid",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.4168",
      longitude: "-3.7038",
    },
    priceRange: "€€€",
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    availableLanguage: ["Spanish", "English"],
    serviceType: [
      "Desarrollo de MVP",
      "Automatización con IA",
      "Desarrollo No-Code",
      "Chatbots RAG",
      "Prototipado Rápido",
    ],
    provider: {
      "@type": "Person",
      name: "Borja Galván",
      jobTitle: "AI-assisted App Builder",
    },
  };
}

/**
 * Utility function to inject JSON-LD into the page
 * Returns a script tag with proper structure
 */
export function renderStructuredData(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  return {
    __html: JSON.stringify(data, null, 0),
  };
}

/**
 * Helper to combine multiple schemas
 * Useful when a page needs multiple types of structured data
 */
export function combineSchemas(...schemas: Array<Record<string, unknown>>) {
  return schemas;
}

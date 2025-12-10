export type ProjectCategory = "Web" | "IA" | "No-code" | "Codegen";

export type ProjectLink = {
  demo?: string;
  repo?: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  descriptionMD: string;
  cover: string;
  images: string[];
  tags: string[];
  category: ProjectCategory;
  links: ProjectLink;
};

export const projects: Project[] = [
  {
    id: "sala-the-project",
    title: "Sala The Project",
    summary: "Plataforma de reservas a medida con sincronización en tiempo real con Google Calendar",
    descriptionMD: `### Sala The Project – Plataforma de Reservas
    
Aplicación web a medida para la gestión integral de reservas del Estudio Puente de Segovia. Centraliza la experiencia desde la visualización del espacio hasta la confirmación, con disponibilidad en tiempo real y notificaciones automatizadas.

**Funcionalidades Destacadas:**
- **Motor de Reservas Inteligente:** Precios dinámicos, bloqueo automático en Google Calendar y validación de estancias mínimas.
- **Gestión Automatizada:** Emails transaccionales con Resend y lógica serverless para validaciones complejas.
- **UX Inmersiva & i18n:** Galería interactiva, diseño de alto impacto y soporte multi-idioma (i18next).
- **Reto Técnico:** Sincronización bidireccional de calendarios manejando zonas horarias con precisión absoluta.

**Stack Tecnológico:**
- **Core:** React 19, TypeScript, Vite
- **Backend:** Vercel Serverless, Node.js
- **Integraciones:** Google Calendar API, Resend
- **Estilos:** Tailwind CSS v4
    
**Rol:** Desarrollo Web Integral (Full Stack & UI).`,
    cover: "/projects/sala-the-project-cover.png",
    images: ["/projects/sala-the-project-cover.png"],
    tags: ["React 19", "Google Calendar API", "Vercel Serverless", "Tailwind CSS", "Resend", "i18next"],
    category: "Web",
    links: {
      demo: "https://salatheproject.com"
    }
  },
  {
    id: "pricewise",
    title: "PriceWise",
    summary: "Scraping y comparador de precios con seguimiento automático y alertas",
    descriptionMD: `### PriceWise – Comparador Inteligente de Precios

Herramienta de scraping para encontrar mejores precios en la web con exportación de resultados y alertas de bajada.

**Casos de uso reales:**
- Seguimiento de productos específicos (ej: AirPods Max por color)
- Comparación automática de precios entre tiendas
- Monitorización quincenal o en días alternos
- Alertas cuando baja el precio de productos vigilados

**Características técnicas:**
- Motor de búsqueda: DuckDuckGo para evitar bloqueos
- Scraping respetuoso con rate limiting
- Normalización de datos por marca/peso
- Exportación múltiple: Excel, CSV, JSON
- Programación de búsquedas (cron)
- Histórico de precios y tendencias

**Rol:** Diseñador de herramienta de scraping + lógica de comparación.

**Estado:** Prototipo avanzado/POC operativo.`,
    cover: "/projects/pricewise-dashboard.svg",
    images: ["/projects/pricewise-dashboard.svg", "/projects/pricewise-insights.svg"],
    tags: ["Python", "Scraping", "DuckDuckGo", "Playwright", "Excel/CSV"],
    category: "IA",
    links: {}
  },
  {
    id: "fitcoach-mvp",
    title: "FitCoach",
    summary: "Marketplace que conecta entrenadores personales con clientes + suite de gestión integral",
    descriptionMD: `### FitCoach – Marketplace de Entrenadores Personales
    
Plataforma "all-in-one" que funciona como marketplace para conectar entrenadores con clientes y como suite de gestión para el día a día del coaching.

**Propuesta de Valor:**
- **Marketplace:** Directorio donde los clientes encuentran a su entrenador ideal.
- **Gestión:** Herramientas profesionales para que los entrenadores gestionen sus asesorías (pagos, rutinas, chats).
- **Captación:** Sistema integrado de waitlist y onboarding de nuevos usuarios.

**Funcionalidades Core:**
- Matching inteligente Entrenador-Cliente
- Gestión de suscripciones y pagos
- Planificación de entrenamientos y nutrición
- Chat en tiempo real y seguimiento de progreso
    
**Stack Técnico:**
- **Frontend:** Next.js 15 (App Router)
- **Backend:** Supabase (Auth, DB y Realtime)
- **Automatización:** n8n para flujos de email marketing
- **Analítica:** PostHog para seguimiento de conversión
    
**Rol:** Product Builder & Full-Stack Developer.
    
**Estado:** MVP en fase de desarrollo.`,
    cover: "/projects/fitcoach-main-update.png",
    images: ["/projects/fitcoach-main-update.png", "/projects/fitcoach-mvp-detail.svg"],
    tags: ["Next.js", "Supabase", "Tailwind", "n8n", "PostHog", "OpenAI"],
    category: "Web",
    links: {
      demo: "https://fitcoach.es"
    }
  },
  {
    id: "rag-customer-support",
    title: "RAG Customer Support",
    summary: "Sistema RAG que consulta documentación interna para generar respuestas coherentes",
    descriptionMD: `### RAG para Atención al Cliente

Sistema Retrieval-Augmented Generation que consulta documentación interna y genera respuestas alineadas con políticas empresariales.

**Cómo funciona:**
- Usuario copia el email del cliente
- Sistema busca en documentación interna (políticas, horarios, cuotas, procedimientos)
- IA genera respuesta coherente lista para copiar en Outlook
- No envía correos automáticamente (asistido por humano)

**Objetivo:**
Respuestas consistentes, rápidas y ajustadas a normativa interna sin riesgo de información incorrecta.

**Stack técnico:**
- Plataforma: Relevance AI
- Vector database para documentación
- LLM: GPT-4-turbo
- Prompts con instrucciones de cumplimiento
- Plantillas de respuesta corporativa

**Entradas:**
- Cuerpo del email del cliente
- Documentos internos indexados (políticas de bajas, horarios, cuotas, etc.)

**Salidas:**
- Respuesta redactada profesional
- Referencias a documentos consultados
- Lista para pegar en cliente de email

**Retos técnicos resueltos:**
- **Hallucinations:** Mitigación con prompts jerárquicos y extractos citados
- **Tono corporativo:** Plantillas y reglas estilísticas
- **Precisión:** Validación con documentación oficial

**Rol:** Diseñador de flujo RAG y prompt engineering.

**Estado:** En producción manual (humano verifica antes de enviar).`,
    cover: "/projects/rag-customer-support-cover.svg",
    images: ["/projects/rag-customer-support-cover.svg", "/projects/rag-customer-support-detail.svg"],
    tags: ["Relevance AI", "GPT-4-turbo", "RAG", "Vector DB", "Prompt Engineering"],
    category: "IA",
    links: {}
  },
  {
    id: "email-automation-n8n",
    title: "Email Automation n8n",
    summary: "Envío automático de emails desde Supabase con n8n y Outlook",
    descriptionMD: `### Automatización de Correos con n8n

Sistema de envío automático de emails cuando entra un nuevo registro en Supabase (waitlist/formularios).

**Flujo de trabajo:**
1. Nuevo registro entra en Supabase (waitlist, formulario de contacto, etc.)
2. n8n detecta el webhook/cron
3. Lee datos del registro
4. Renderiza plantilla HTML personalizada
5. Envía email vía Outlook corporativo o SMTP

**Stack técnico:**
- Automatización: n8n (self-hosted o cloud)
- Base de datos: Supabase (trigger source)
- Email: Outlook/SMTP corporativo
- Templates: HTML con CSS inline

**Detalles técnicos clave:**
- Uso de expresiones n8n: \`{{ $json.body.record.email }}\`
- Plantillas HTML coherentes con branding (FitCoach)
- Manejo de errores y retry logic
- Logs de envíos exitosos/fallidos

**Casos de uso:**
- Bienvenida a nuevos usuarios de waitlist
- Confirmación de formularios de contacto
- Notificaciones automáticas de cambios de estado
- Recordatorios programados

**Ventajas:**
- Reutilizable para múltiples formularios
- Fácil de modificar sin código
- Integración nativa con Supabase
- Escalable y confiable

**Rol:** Integrador de automatización low-code.

**Estado:** Operativo y reutilizable para otros proyectos.`,
    cover: "/projects/email-automation-cover.svg",
    images: ["/projects/email-automation-cover.svg", "/projects/email-automation-detail.svg"],
    tags: ["n8n", "Supabase", "Outlook", "SMTP", "Webhooks", "HTML Templates"],
    category: "No-code",
    links: {}
  },
  {
    id: "seowise",
    title: "SEOWise",
    summary: "Análisis SEO con scraping de SERP y sugerencias asistidas por IA",
    descriptionMD: `### SEOWise – Auditoría SEO Inteligente

Herramienta para auditar oportunidades SEO: keywords, competidores, análisis on-page y sugerencias de contenido asistidas por LLM.

**Funcionalidades:**
- **Análisis de keywords:** Volumen, dificultad, intención de búsqueda
- **Scraping de SERP:** ¿Qué rankea en top 10?
- **Análisis on-page:** Meta tags, headings, estructura de contenido
- **Análisis de competidores:** ¿Qué hace la competencia que tú no?
- **Sugerencias de contenido IA:** Ideas de artículos para cubrir gaps

**Objetivo:**
Detectar huecos de contenido y quick wins de posicionamiento con datos reales.

**Stack técnico:**
- Lenguaje: Python
- Scraping: BeautifulSoup/Scrapy para SERP y páginas
- Heurísticas on-page: Análisis de HTML, meta tags, headings
- IA: Prompts a LLM para generar ideas de contenido basadas en gaps detectados

**Proceso de trabajo:**
1. Ingresa URL o keywords objetivo
2. Scraping de Google SERP para esas keywords
3. Análisis de competidores en top 10
4. Detección de patrones (long-tail, FAQs, formatos)
5. Generación de reporte con oportunidades

**Resultados:**
- Lista de keywords de baja competencia (quick wins)
- Gaps de contenido frente a competencia
- Sugerencias de títulos y estructura de artículos
- Análisis técnico on-page de tu sitio

**Rol:** Creador de POC SEO técnico.

**Estado:** POC funcional orientado a flujos repetibles.`,
    cover: "/projects/seowise-cover.svg",
    images: ["/projects/seowise-cover.svg", "/projects/seowise-detail.svg"],
    tags: ["Python", "Web Scraping", "SERP Analysis", "LLM", "SEO", "BeautifulSoup"],
    category: "IA",
    links: {}
  }
];

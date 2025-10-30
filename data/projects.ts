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
    title: "FitCoach MVP",
    summary: "Plataforma completa de gestión para entrenadores y clientes con waitlist integrada",
    descriptionMD: `### FitCoach – Plataforma de Gestión Fitness

MVP completo para gestión integral de entrenadores y clientes + portal público para captación.

**Funcionalidades core:**
- Gestión de roles (entrenador/cliente/admin)
- Planificación de entrenamientos y nutrición
- Calendario inteligente de sesiones con disponibilidad compartida
- Comunicación básica entrenador-cliente
- Portal público con waitlist para captación de usuarios

**Stack técnico:**
- Frontend: Next.js 15 con App Router
- Base de datos: Supabase (auth + database)
- Estilos: Tailwind CSS
- Automatizaciones: n8n para emails
- Analytics: PostHog para funnels y eventos
- Deploy: Vercel con variables de entorno

**UX/UI:**
- Diseño minimalista y limpio
- Inspiración: OpenAI, Harbiz
- Responsive y accesible

**DevOps:**
- Rama separada para waitlist pública
- Resolución de errores de build en Vercel
- Variables de entorno por ambiente

**Rol:** Product builder · Full-stack funcional.

**Estado:** MVP funcional con desarrollo continuo.`,
    cover: "/projects/fitcoach-mvp.svg",
    images: ["/projects/fitcoach-mvp.svg", "/projects/fitcoach-mvp-detail.svg"],
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

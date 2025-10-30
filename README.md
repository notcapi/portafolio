# Portafolio — Borja Galván

Portafolio moderno y optimizado construido con **Next.js 15**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion** y **React Hook Form**. Diseñado con best practices de SEO, rendimiento y accesibilidad.

## ✨ Características

### 🎨 UI/UX
- **App Router de Next.js 15** con rendering híbrido
- **Dark Mode** por defecto con toggle persistente
- **Componentes reutilizables**: Navbar sticky, Footer, ProjectCard con lightbox, filtros animados
- **Animaciones suaves** con Framer Motion
- **Glassmorphism** y diseño minimalista

### 📝 Contenido
- Datos centralizados en [`data/projects.ts`](data/projects.ts)
- Soporte para **Markdown** en descripciones de proyectos
- Modales con galería de imágenes
- **Breadcrumbs** con JSON-LD para navegación

### 📧 Formulario de Contacto Funcional
- **Validación client-side** con React Hook Form + Zod
- **API route** con integración de Resend para envío de emails
- **Rate limiting** (3 emails/hora por IP)
- **Honeypot field** para protección anti-spam
- **Estados visuales** (loading, success, error) con animaciones
- **ARIA live regions** para accesibilidad

### 🚀 SEO & Rendimiento
- **Metadata API de Next.js 15** (OpenGraph, Twitter Cards)
- **Structured Data (JSON-LD)**: Person, WebSite, BreadcrumbList schemas
- **Sitemap automático** generado en build (postbuild hook)
- **Security Headers**: HSTS, CSP, X-Frame-Options, etc.
- **Bundle Analyzer** integrado
- **Optimización de fuentes** (solo weights 400 y 600)
- **Lazy loading** de imágenes
- **Error boundaries** (app/error.tsx, app/global-error.tsx)
- **Loading states** (app/loading.tsx)

### ♿ Accesibilidad
- **Navegación por teclado** completa
- **ARIA labels** en todos los elementos interactivos
- **Focus management** en modales
- **Screen reader friendly**
- **Mensajes de error accesibles**
- **Alt text descriptivo** en todas las imágenes

## Requisitos
- Node.js ≥ 18.18
- npm (o pnpm/yarn) para la gestión de dependencias

## 🛠️ Instalación y Configuración

### Instalación
```bash
npm install
```

### Variables de Entorno
Crea un archivo `.env.local` basado en `.env.example`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://borjagalvan.dev

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=

# Contact Form - REQUERIDO para el formulario de contacto
RESEND_API_KEY=re_123456789  # Obtén tu API key en https://resend.com
CONTACT_EMAIL_TO=tu@email.com

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true
```

### Scripts Disponibles
```bash
npm run dev      # Entorno local en http://localhost:3000
npm run build    # Build de producción (genera sitemap automáticamente)
npm start        # Sirve la build de producción
npm run lint     # Linting con eslint-config-next
npm run format   # Formatea con Prettier
npm run sitemap  # Genera sitemap.xml y robots.txt manualmente
npm run analyze  # Analiza el bundle size con bundle-analyzer
```

## Cómo editar el contenido
- **Hero, bio y textos**: editar los archivos dentro de `app/(routes)`. Ejemplo: [`app/(routes)/page.tsx`](app/(routes)/page.tsx) para el hero, [`app/(routes)/about/page.tsx`](app/(routes)/about/page.tsx) para la bio/timeline.
- **Proyectos**:
  1. Añade o actualiza entradas en [`data/projects.ts`](data/projects.ts). Cada proyecto permite `descriptionMD` en Markdown, `cover`, `images` adicionales y enlaces `demo`/`repo`.
  2. Coloca las imágenes correspondientes dentro de `public/projects/`. Se recomiendan dimensiones 1200×900px (o relación 4:3) para mantener consistencia.
- **Imágenes OG y avatar**: se encuentran en `public/og.png` y `public/avatar.svg`.
- **SEO / URLs**: ajusta `lib/seo.ts` con el `siteConfig` (nombre, url y redes). Recuerda actualizar la URL antes de desplegar.

## 🚢 Despliegue en Vercel

1. **Conecta el repositorio** con Vercel (fork o importa el repo)

2. **Configura las variables de entorno** en Vercel:
   ```
   NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
   RESEND_API_KEY=re_tu_api_key
   CONTACT_EMAIL_TO=tu@email.com
   NEXT_PUBLIC_ENABLE_CONTACT_FORM=true
   ```

3. **Deploy**: Vercel detecta automáticamente Next.js y ejecuta:
   - Build command: `npm run build` (incluye generación de sitemap)
   - Start command: `npm start`

4. **Post-deployment**:
   - El sitemap se genera automáticamente en cada build
   - No necesitas regenerarlo manualmente
   - Vercel gestiona las rutas automáticamente

### Configuración de Resend

1. Crea una cuenta en [Resend](https://resend.com)
2. Verifica tu dominio (o usa el dominio de prueba de Resend)
3. Genera una API Key
4. Añádela a las variables de entorno de Vercel

### Optimizaciones en Producción

El proyecto incluye:
- **Compresión automática** (gzip/brotli)
- **Security headers** configurados
- **Image optimization** con Next.js
- **Font optimization** (solo weights necesarios)
- **Bundle splitting** automático

## 📦 Estructura del Proyecto

```
portafolio/
├── app/
│   ├── (routes)/           # Páginas del sitio
│   │   ├── page.tsx       # Home
│   │   ├── about/         # Sobre mí
│   │   ├── projects/      # Lista de proyectos
│   │   └── contact/       # Formulario de contacto
│   ├── api/
│   │   └── contact/       # API route para emails
│   ├── layout.tsx         # Layout principal con SEO
│   ├── loading.tsx        # Loading UI global
│   ├── error.tsx          # Error boundary
│   └── global-error.tsx   # Global error boundary
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── ImageLightbox.tsx
│   ├── Breadcrumbs.tsx    # Con JSON-LD schema
│   └── ...
├── data/
│   └── projects.ts        # Datos de proyectos
├── lib/
│   ├── seo.ts            # Configuración SEO
│   ├── structured-data.ts # Schemas JSON-LD
│   └── utils.ts
└── public/
    ├── projects/          # Imágenes de proyectos
    ├── og.png            # OpenGraph image
    └── favicon.svg
```

## 🛡️ Security & Best Practices

### Security Headers Implementados
- `Strict-Transport-Security` - Enforce HTTPS
- `X-Frame-Options` - Prevenir clickjacking
- `X-Content-Type-Options` - Prevenir MIME sniffing
- `X-XSS-Protection` - Protección XSS
- `Referrer-Policy` - Control de información de referrer
- `Permissions-Policy` - Control de permisos de APIs

### Rate Limiting
- 3 emails por hora por dirección IP
- Almacenamiento en memoria (para producción considerar Redis)

### Validación
- Client-side: React Hook Form + Zod
- Server-side: Zod schemas
- Honeypot field para anti-spam

## 🎯 Métricas de Rendimiento

El proyecto está optimizado para:
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse Score**: >90 en todas las categorías
- **Bundle Size**: Optimizado con code splitting y tree shaking

Usa `npm run analyze` para ver el análisis detallado del bundle.

## 🔧 Tecnologías Principales

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript 5.6
- **Estilos**: Tailwind CSS 3.4 + shadcn/ui
- **Animaciones**: Framer Motion 11
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **SEO**: Next.js Metadata API + next-sitemap
- **Icons**: Lucide React

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Resend](https://resend.com/docs)
- [Structured Data (Schema.org)](https://schema.org)

## 📝 Licencia

Distribuido bajo licencia [MIT](LICENSE).

---

Hecho con ❤️ por [Borja Galván](https://borjagalvan.dev)

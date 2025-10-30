import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/seo";
import { getPersonSchema, getWebSiteSchema, combineSchemas, renderStructuredData } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"], // Only load needed weights
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: "%s | Borja Galván"
  },
  description: siteConfig.description,
  authors: [{ name: "Borja Galván" }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ],
    locale: siteConfig.locale,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f172a" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = combineSchemas(getPersonSchema(), getWebSiteSchema());

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={cn("min-h-screen bg-background antialiased", inter.variable)}>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderStructuredData(structuredData)}
          suppressHydrationWarning
        />

        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Saltar al contenido principal
          </a>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent blur-3xl" />
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import { getBreadcrumbSchema, renderStructuredData, type BreadcrumbItem } from "@/lib/structured-data";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs component with JSON-LD structured data
 * Improves SEO and provides navigation context
 *
 * Usage:
 * <Breadcrumbs items={[
 *   { name: "Inicio", url: "/" },
 *   { name: "Proyectos", url: "/projects" },
 *   { name: "Proyecto actual", url: "/projects/pricewise" }
 * ]} />
 */
export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Always include Home as first item if not already included
  const breadcrumbItems = items[0]?.url === "/" ? items : [{ name: "Inicio", url: "/" }, ...items];
  const schema = getBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderStructuredData(schema)}
      />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-2 text-sm ${className}`}
      >
        <ol className="flex items-center gap-2 flex-wrap">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isFirst = index === 0;

            return (
              <motion.li
                key={item.url}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2"
              >
                {!isLast ? (
                  <>
                    <Link
                      href={item.url as any}
                      className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-1 -mx-1"
                      aria-label={isFirst ? "Ir a inicio" : `Ir a ${item.name}`}
                    >
                      {isFirst && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                      <span>{item.name}</span>
                    </Link>
                    <ChevronRight
                      className="h-3.5 w-3.5 text-muted-foreground/50"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <span
                    className="font-medium text-foreground"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

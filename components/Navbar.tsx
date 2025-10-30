"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/projects", label: "Proyectos" },
  { href: "/about", label: "Sobre mí" },
  { href: "/contact", label: "Contacto" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all isolate",
        scrolled ? "backdrop-blur-md bg-background/75 border-b border-border/40" : ""
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 relative z-10">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 text-sm font-bold text-slate-900 shadow-glow">
            BG
          </span>
          <span className="hidden text-sm text-muted-foreground sm:block">
            Borja Galván
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/40 bg-background/60 p-1 shadow-glass md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href as any}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-primary/15 border border-primary/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/projects">Ver proyectos</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

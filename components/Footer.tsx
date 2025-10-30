import { Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  { href: "https://github.com/notcapi", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/borjagalvanchivite", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/notcapi", label: "X", icon: Twitter }
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/40">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            © {new Date().getFullYear()} Borja Galván. Todos los derechos reservados.
          </p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Construido con Next.js, Tailwind, shadcn/ui y un toque de IA.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FilterPillsProps = {
  options: string[];
  active: string;
  onChange: (value: string) => void;
};

export default function FilterPills({ options, active, onChange }: FilterPillsProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-full border border-border/40 bg-background/60 p-1 shadow-glass">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-primary/15"
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        );
      })}
    </div>
  );
}

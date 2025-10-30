"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  as?: React.ElementType;
  withPadding?: boolean;
  children: React.ReactNode;
};

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function Section({
  id,
  className,
  children,
  withPadding = true,
  as: Component = "section"
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(withPadding && "py-16 sm:py-20 lg:py-24", "scroll-mt-28", className)}
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={variants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </Component>
  );
}

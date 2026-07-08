// ============================================================================
// src/components/atoms/Card.tsx
// ============================================================================

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";

export type CardVariant = "surface" | "glass" | "outline" | "accent";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: CardVariant;
  readonly hoverLift?: boolean;
  readonly padding?: "none" | "sm" | "md" | "lg";
  readonly children: ReactNode;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  surface:
    "bg-clinical-surface shadow-ambient dark:bg-clinical-surface-dark dark:shadow-none dark:ring-1 dark:ring-primary-900/40",
  glass:
    "bg-white/60 backdrop-blur-xs shadow-glass ring-1 ring-white/50 dark:bg-clinical-surface-dark/50 dark:ring-primary-900/30",
  outline:
    "bg-transparent border border-primary-100 dark:border-primary-900/50",
  accent:
    "bg-gradient-to-br from-accent-light to-secondary-100 shadow-ambient-sm dark:from-primary-900/40 dark:to-primary-800/30",
};

const PADDING_CLASSES: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-7",
  lg: "p-6 sm:p-8 lg:p-10",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "surface",
    hoverLift = false,
    padding = "md",
    className = "",
    children,
    ...rest
  },
  ref
) {
  return (
    <motion.div
      ref={ref}
      whileHover={
        hoverLift
          ? {
              y: -6,
              boxShadow:
                "0 24px 60px -12px rgba(46, 139, 87, 0.22), 0 8px 20px -6px rgba(15, 23, 18, 0.10)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`rounded-3xl transition-shadow duration-300 ${VARIANT_CLASSES[variant]} ${PADDING_CLASSES[padding]} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

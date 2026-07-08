// ============================================================================
// src/components/atoms/Feedback.tsx
// Accordion, StatusBadge, ProgressBar, and Skeleton primitives.
// ============================================================================

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ---------------------------------------------------------------------------
// AccordionItem / AccordionGroup
// ---------------------------------------------------------------------------

export interface AccordionEntry {
  readonly id: string;
  readonly question: string;
  readonly answer: ReactNode;
}

export interface AccordionGroupProps {
  readonly items: readonly AccordionEntry[];
  readonly allowMultipleOpen?: boolean;
  readonly defaultOpenId?: string;
}

export function AccordionGroup({
  items,
  allowMultipleOpen = false,
  defaultOpenId,
}: AccordionGroupProps): JSX.Element {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(
    () => new Set(defaultOpenId ? [defaultOpenId] : [])
  );

  const toggleItem = (id: string): void => {
    setOpenIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }
      if (!allowMultipleOpen) {
        next.clear();
      }
      next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col divide-y divide-primary-100 dark:divide-primary-900/40">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;

        return (
          <div key={item.id} className="py-2">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-2 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <span className="font-sans text-base font-semibold text-text-primary dark:text-text-primary-dark">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="shrink-0 text-primary-600 dark:text-secondary-300"
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-2 pb-4 text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// StatusBadge
// ---------------------------------------------------------------------------

export type StatusBadgeTone = "success" | "info" | "warning" | "neutral";

export interface StatusBadgeProps {
  readonly tone?: StatusBadgeTone;
  readonly children: ReactNode;
  readonly icon?: ReactNode;
}

const TONE_CLASSES: Record<StatusBadgeTone, string> = {
  success: "bg-secondary-100 text-primary-800 dark:bg-primary-900/40 dark:text-secondary-300",
  info: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300",
};

export function StatusBadge({
  tone = "neutral",
  children,
  icon,
}: StatusBadgeProps): JSX.Element {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${TONE_CLASSES[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// ProgressBar
// ---------------------------------------------------------------------------

export interface ProgressBarProps {
  readonly value: number;
  readonly max?: number;
  readonly label?: string;
  readonly showValueLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValueLabel = false,
}: ProgressBarProps): JSX.Element {
  const generatedId = useId();
  const clampedPercentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="flex flex-col gap-1.5">
      {label || showValueLabel ? (
        <div className="flex items-center justify-between text-sm">
          {label ? (
            <span
              id={generatedId}
              className="font-medium text-text-primary dark:text-text-primary-dark"
            >
              {label}
            </span>
          ) : null}
          {showValueLabel ? (
            <span className="text-text-secondary dark:text-text-secondary-dark">
              {Math.round(clampedPercentage)}%
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-labelledby={label ? generatedId : undefined}
        aria-valuenow={Math.round(clampedPercentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2.5 w-full overflow-hidden rounded-full bg-primary-50 dark:bg-primary-900/40"
      >
        <div
          style={{ ["--progress-value" as string]: `${clampedPercentage}%` }}
          className="h-full animate-progress-fill rounded-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

export interface SkeletonProps {
  readonly className?: string;
  readonly rounded?: "full" | "2xl" | "3xl";
}

export function Skeleton({
  className = "h-4 w-full",
  rounded = "2xl",
}: SkeletonProps): JSX.Element {
  const roundedClass =
    rounded === "full"
      ? "rounded-full"
      : rounded === "2xl"
        ? "rounded-2xl"
        : "rounded-3xl";

  return (
    <div
      aria-hidden="true"
      className={`animate-shimmer bg-[length:1000px_100%] bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 dark:from-primary-900/30 dark:via-primary-800/40 dark:to-primary-900/30 ${roundedClass} ${className}`}
    />
  );
}

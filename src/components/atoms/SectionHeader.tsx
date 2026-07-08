// ============================================================================
// src/components/atoms/SectionHeader.tsx
// ============================================================================

import type { ReactNode } from "react";

export type SectionHeaderAlign = "left" | "center";

export interface SectionHeaderProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: SectionHeaderAlign;
  readonly titleAs?: "h1" | "h2" | "h3";
  readonly action?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  titleAs = "h2",
  action,
}: SectionHeaderProps): JSX.Element {
  const TitleTag = titleAs;
  const alignmentClasses =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div
      className={`flex flex-col gap-4 ${alignmentClasses} ${align === "center" ? "max-w-2xl" : "max-w-xl"}`}
    >
      {eyebrow ? (
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-700 dark:bg-primary-900/40 dark:text-secondary-300">
          {eyebrow}
        </span>
      ) : null}

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <TitleTag className="font-serif text-display-sm font-medium leading-tight text-text-primary dark:text-text-primary-dark sm:text-display-md">
          {title}
        </TitleTag>
        {action && align === "left" ? (
          <div className="shrink-0">{action}</div>
        ) : null}
      </div>

      {description ? (
        <p className="max-w-prose font-sans text-lg leading-relaxed text-text-secondary dark:text-text-secondary-dark">
          {description}
        </p>
      ) : null}

      {action && align === "center" ? <div>{action}</div> : null}
    </div>
  );
}

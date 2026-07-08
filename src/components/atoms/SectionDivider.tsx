// ============================================================================
// src/components/atoms/SectionDivider.tsx
// ============================================================================

export type SectionDividerTone = "ivory-to-secondary" | "secondary-to-ivory";

export interface SectionDividerProps {
  readonly tone?: SectionDividerTone;
}

const TONE_CLASSES: Record<SectionDividerTone, string> = {
  "ivory-to-secondary": "text-secondary-50/60 dark:text-primary-950/20",
  "secondary-to-ivory": "text-clinical-ivory dark:text-clinical-background-dark",
};

export function SectionDivider({
  tone = "ivory-to-secondary",
}: SectionDividerProps): JSX.Element {
  return (
    <div aria-hidden="true" className="relative -mb-1 h-16 w-full overflow-hidden sm:h-20">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={`h-full w-full ${TONE_CLASSES[tone]}`}
      >
        <path
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,90 1440,40 L1440,100 L0,100 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

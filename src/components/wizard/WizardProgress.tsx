// ============================================================================
// src/components/wizard/WizardProgress.tsx
// ============================================================================

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { WIZARD_STEP_TITLES } from "../../types/consultation.types";

export interface WizardProgressProps {
  readonly currentStepIndex: number;
}

export function WizardProgress({
  currentStepIndex,
}: WizardProgressProps): JSX.Element {
  const totalSteps = WIZARD_STEP_TITLES.length;
  const progressPercentage = (currentStepIndex / (totalSteps - 1)) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-text-primary dark:text-text-primary-dark">
          Step {currentStepIndex + 1} of {totalSteps}
        </span>
        <span className="text-text-secondary dark:text-text-secondary-dark">
          {WIZARD_STEP_TITLES[currentStepIndex]}
        </span>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary-50 dark:bg-primary-900/40">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={false}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        />
      </div>

      <ol className="hidden items-center justify-between gap-2 sm:flex">
        {WIZARD_STEP_TITLES.map((title, index) => {
          const isComplete = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <li key={title} className="flex flex-1 flex-col items-center gap-2">
              <span
                aria-current={isCurrent ? "step" : undefined}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-200 ${
                  isComplete
                    ? "bg-primary text-white"
                    : isCurrent
                      ? "border-2 border-primary text-primary-700 dark:text-secondary-300"
                      : "border-2 border-primary-100 text-text-secondary dark:border-primary-900/50 dark:text-text-secondary-dark"
                }`}
              >
                {isComplete ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : index + 1}
              </span>
              <span className="hidden text-center text-[11px] leading-tight text-text-secondary dark:text-text-secondary-dark lg:block">
                {title}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ============================================================================
// src/components/atoms/TagMultiSelect.tsx
// ============================================================================

import { Check } from "lucide-react";

export interface TagMultiSelectProps {
  readonly legend: string;
  readonly options: readonly string[];
  readonly selected: readonly string[];
  readonly onChange: (next: readonly string[]) => void;
}

export function TagMultiSelect({
  legend,
  options,
  selected,
  onChange,
}: TagMultiSelectProps): JSX.Element {
  const handleToggle = (option: string): void => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleToggle(option)}
              className={`inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-primary bg-primary-50 text-primary-800 dark:border-secondary-400 dark:bg-primary-900/40 dark:text-secondary-200"
                  : "border-primary-100 bg-transparent text-text-secondary hover:border-primary-300 dark:border-primary-900/50 dark:text-text-secondary-dark"
              }`}
            >
              {isSelected ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

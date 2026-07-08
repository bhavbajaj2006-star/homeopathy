// ============================================================================
// src/components/atoms/FormFields.tsx
// Fully controlled, accessible form primitives shared by the intake wizard
// and any marketing lead-capture surfaces.
// ============================================================================

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { Check } from "lucide-react";

// ---------------------------------------------------------------------------
// TextField
// ---------------------------------------------------------------------------

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  readonly label: string;
  readonly errorMessage?: string;
  readonly helperText?: string;
  readonly leadingIcon?: ReactNode;
  readonly required?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      errorMessage,
      helperText,
      leadingIcon,
      required = false,
      id,
      className = "",
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const describedById = errorMessage
      ? `${fieldId}-error`
      : helperText
        ? `${fieldId}-helper`
        : undefined;

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={fieldId}
          className="text-sm font-semibold text-text-primary dark:text-text-primary-dark"
        >
          {label}
          {required ? (
            <span className="ml-1 text-primary-600" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>

        <div className="relative">
          {leadingIcon ? (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark">
              {leadingIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={fieldId}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={describedById}
            aria-required={required}
            className={`w-full rounded-2xl border bg-clinical-surface px-4 py-3.5 text-base text-text-primary shadow-inner-soft outline-none transition-all duration-200 placeholder:text-text-secondary/60 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 dark:bg-clinical-surface-dark dark:text-text-primary-dark dark:placeholder:text-text-secondary-dark/50 dark:focus:ring-primary-900/40 ${
              errorMessage
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-primary-100 dark:border-primary-900/50"
            } ${leadingIcon ? "pl-11" : ""} ${className}`}
            {...rest}
          />
        </div>

        {errorMessage ? (
          <p id={`${fieldId}-error`} role="alert" className="text-sm text-red-600">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p
            id={`${fieldId}-helper`}
            className="text-sm text-text-secondary dark:text-text-secondary-dark"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

// ---------------------------------------------------------------------------
// TextAreaField
// ---------------------------------------------------------------------------

export interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label: string;
  readonly errorMessage?: string;
  readonly helperText?: string;
  readonly required?: boolean;
}

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(function TextAreaField(
  {
    label,
    errorMessage,
    helperText,
    required = false,
    id,
    className = "",
    rows = 4,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={fieldId}
        className="text-sm font-semibold text-text-primary dark:text-text-primary-dark"
      >
        {label}
        {required ? (
          <span className="ml-1 text-primary-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        aria-invalid={Boolean(errorMessage)}
        aria-required={required}
        className={`w-full resize-y rounded-2xl border bg-clinical-surface px-4 py-3.5 text-base text-text-primary shadow-inner-soft outline-none transition-all duration-200 placeholder:text-text-secondary/60 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 dark:bg-clinical-surface-dark dark:text-text-primary-dark dark:focus:ring-primary-900/40 ${
          errorMessage
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-primary-100 dark:border-primary-900/50"
        } ${className}`}
        {...rest}
      />
      {errorMessage ? (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  readonly label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, id, className = "", ...rest }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
      <label
        htmlFor={fieldId}
        className="group flex cursor-pointer items-center gap-3 select-none"
      >
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={fieldId}
            type="checkbox"
            className={`peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border-2 border-primary-200 bg-clinical-surface transition-colors duration-150 checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 dark:border-primary-800 dark:bg-clinical-surface-dark ${className}`}
            {...rest}
          />
          <Check
            className="pointer-events-none absolute h-3.5 w-3.5 scale-0 text-white transition-transform duration-150 peer-checked:scale-100"
            aria-hidden="true"
          />
        </span>
        <span className="text-sm text-text-primary dark:text-text-primary-dark">
          {label}
        </span>
      </label>
    );
  }
);

// ---------------------------------------------------------------------------
// SegmentedRadioGroup
// ---------------------------------------------------------------------------

export interface SegmentedRadioOption {
  readonly value: string;
  readonly label: string;
  readonly icon?: ReactNode;
}

export interface SegmentedRadioGroupProps {
  readonly name: string;
  readonly legend: string;
  readonly options: readonly SegmentedRadioOption[];
  readonly value: string | null;
  readonly onChange: (value: string) => void;
  readonly required?: boolean;
  readonly errorMessage?: string;
}

export function SegmentedRadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  required = false,
  errorMessage,
}: SegmentedRadioGroupProps): JSX.Element {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
        {legend}
        {required ? (
          <span className="ml-1 text-primary-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
      <div
        role="radiogroup"
        aria-label={legend}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              id={`${name}-${option.value}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-primary bg-primary text-white shadow-ambient-sm"
                  : "border-primary-100 bg-clinical-surface text-text-primary hover:border-primary-300 dark:border-primary-900/50 dark:bg-clinical-surface-dark dark:text-text-primary-dark"
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          );
        })}
      </div>
      {errorMessage ? (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      ) : null}
    </fieldset>
  );
}

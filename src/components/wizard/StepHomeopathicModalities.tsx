// ============================================================================
// src/components/wizard/StepHomeopathicModalities.tsx
// ============================================================================

import type { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { Flame, Snowflake, Shuffle } from "lucide-react";
import { TextAreaField } from "../atoms/FormFields";
import { TagMultiSelect } from "../atoms/TagMultiSelect";
import {
  FOOD_AVERSION_OPTIONS,
  FOOD_CRAVING_OPTIONS,
  PERSPIRATION_OPTIONS,
} from "../../data/wizardOptions";
import type {
  ConsultationFormData,
  DreamFrequency,
  MentalDisposition,
  ThermalPreference,
} from "../../types/consultation.types";

export interface StepHomeopathicModalitiesProps {
  readonly form: UseFormReturn<ConsultationFormData>;
}

const THERMAL_OPTIONS: readonly {
  value: ThermalPreference;
  label: string;
  icon: typeof Flame;
  description: string;
}[] = [
  { value: "Hot", label: "Hot", icon: Flame, description: "Tends to feel warm, dislikes heat" },
  { value: "Cold", label: "Cold", icon: Snowflake, description: "Tends to feel cold, seeks warmth" },
  { value: "Ambivalent", label: "Ambivalent", icon: Shuffle, description: "No strong thermal preference" },
];

const DREAM_FREQUENCY_OPTIONS: readonly { value: DreamFrequency; label: string }[] = [
  { value: "Rarely", label: "Rarely" },
  { value: "Occasionally", label: "Occasionally" },
  { value: "Frequently", label: "Frequently" },
  { value: "Vivid & Recurring", label: "Vivid & Recurring" },
];

const MENTAL_DISPOSITION_OPTIONS: readonly MentalDisposition[] = [
  "Anxious",
  "Irritable",
  "Reserved",
  "Sensitive to Criticism",
  "Weepy",
  "Calm & Composed",
];

export function StepHomeopathicModalities({
  form,
}: StepHomeopathicModalitiesProps): JSX.Element {
  const { register, watch, setValue } = form;

  const thermalPreference = watch("modalities.thermalPreference");
  const foodCravings = watch("modalities.foodCravings");
  const foodAversions = watch("modalities.foodAversions");
  const perspirationTraits = watch("modalities.perspirationTraits");
  const dreamFrequency = watch("modalities.dreamFrequency");
  const mentalDispositions = watch("modalities.mentalDispositions");

  const toggleMentalDisposition = (value: MentalDisposition): void => {
    if (mentalDispositions.includes(value)) {
      setValue(
        "modalities.mentalDispositions",
        mentalDispositions.filter((item) => item !== value),
        { shouldValidate: true }
      );
    } else {
      setValue("modalities.mentalDispositions", [...mentalDispositions, value], {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <p className="rounded-2xl bg-secondary-50 px-5 py-4 text-sm leading-relaxed text-primary-800 dark:bg-primary-900/20 dark:text-secondary-200">
        This section captures the classical "modalities" — subtle patterns in
        temperature, appetite, sleep, and temperament — that distinguish one
        remedy from another even when the diagnosis is the same.
      </p>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
          Thermal Preference
        </span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {THERMAL_OPTIONS.map((option) => {
            const OptionIcon = option.icon;
            const isSelected = thermalPreference === option.value;
            return (
              <motion.button
                key={option.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                aria-pressed={isSelected}
                onClick={() =>
                  setValue("modalities.thermalPreference", option.value, {
                    shouldValidate: true,
                  })
                }
                className={`flex flex-col items-center gap-3 rounded-3xl border-2 px-6 py-8 text-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  isSelected
                    ? "border-primary bg-gradient-to-b from-secondary-50 to-primary-50 shadow-ambient-sm dark:from-primary-900/40 dark:to-primary-950/30"
                    : "border-primary-100 bg-clinical-surface dark:border-primary-900/50 dark:bg-clinical-surface-dark"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-secondary-300"
                  }`}
                >
                  <OptionIcon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-serif text-lg font-medium text-text-primary dark:text-text-primary-dark">
                  {option.label}
                </span>
                <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
                  {option.description}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <TagMultiSelect
        legend="Strong Food Cravings"
        options={FOOD_CRAVING_OPTIONS}
        selected={foodCravings}
        onChange={(next) =>
          setValue("modalities.foodCravings", next, { shouldValidate: true })
        }
      />

      <TagMultiSelect
        legend="Strong Food Aversions"
        options={FOOD_AVERSION_OPTIONS}
        selected={foodAversions}
        onChange={(next) =>
          setValue("modalities.foodAversions", next, { shouldValidate: true })
        }
      />

      <TagMultiSelect
        legend="Perspiration Traits"
        options={PERSPIRATION_OPTIONS}
        selected={perspirationTraits}
        onChange={(next) =>
          setValue("modalities.perspirationTraits", next, { shouldValidate: true })
        }
      />

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
          Dream Frequency
        </span>
        <div className="flex flex-wrap gap-2">
          {DREAM_FREQUENCY_OPTIONS.map((option) => {
            const isSelected = dreamFrequency === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setValue("modalities.dreamFrequency", option.value, {
                    shouldValidate: true,
                  })
                }
                className={`rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  isSelected
                    ? "border-primary bg-primary text-white shadow-ambient-sm"
                    : "border-primary-100 bg-clinical-surface text-text-primary dark:border-primary-900/50 dark:bg-clinical-surface-dark dark:text-text-primary-dark"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
          Dominant Mental / Emotional States
        </span>
        <div className="flex flex-wrap gap-2">
          {MENTAL_DISPOSITION_OPTIONS.map((disposition) => {
            const isSelected = mentalDispositions.includes(disposition);
            return (
              <button
                key={disposition}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleMentalDisposition(disposition)}
                className={`rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  isSelected
                    ? "border-primary bg-primary-50 text-primary-800 dark:border-secondary-400 dark:bg-primary-900/40 dark:text-secondary-200"
                    : "border-primary-100 bg-clinical-surface text-text-primary dark:border-primary-900/50 dark:bg-clinical-surface-dark dark:text-text-primary-dark"
                }`}
              >
                {disposition}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextAreaField
          label="Internal fears"
          rows={3}
          placeholder="e.g. fear of illness, heights, being alone, failure"
          helperText="Optional, but often clinically significant."
          {...register("modalities.fears")}
        />
        <TextAreaField
          label="Memory & concentration notes"
          rows={3}
          placeholder="Any noticeable changes in memory, focus, or word recall"
          {...register("modalities.memoryNotes")}
        />
      </div>
    </div>
  );
}

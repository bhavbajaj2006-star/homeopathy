// ============================================================================
// src/components/wizard/StepLifestyle.tsx
// ============================================================================

import type { UseFormReturn } from "react-hook-form";
import { Droplets } from "lucide-react";
import { TextField, TextAreaField, SegmentedRadioGroup } from "../atoms/FormFields";
import type {
  AppetiteLevel,
  ConsultationFormData,
  SleepQuality,
} from "../../types/consultation.types";

export interface StepLifestyleProps {
  readonly form: UseFormReturn<ConsultationFormData>;
}

const SLEEP_QUALITY_OPTIONS: readonly { value: SleepQuality; label: string }[] = [
  { value: "Sound & Uninterrupted", label: "Sound & Uninterrupted" },
  { value: "Frequent Waking", label: "Frequent Waking" },
  { value: "Difficulty Falling Asleep", label: "Difficulty Falling Asleep" },
  { value: "Early Waking", label: "Early Waking" },
];

const APPETITE_OPTIONS: readonly { value: AppetiteLevel; label: string }[] = [
  { value: "Poor", label: "Poor" },
  { value: "Moderate", label: "Moderate" },
  { value: "Strong", label: "Strong" },
  { value: "Excessive", label: "Excessive" },
];

const MAX_GLASSES = 12;

export function StepLifestyle({ form }: StepLifestyleProps): JSX.Element {
  const { register, watch, setValue } = form;

  const sleepQuality = watch("lifestyle.sleepQuality");
  const appetite = watch("lifestyle.appetite");
  const waterIntakeLitres = watch("lifestyle.waterIntakeLitres");
  const approximateGlasses = Math.round((waterIntakeLitres * 1000) / 250);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          label="Typical sleep timing"
          placeholder="e.g. 11:30 PM – 6:30 AM"
          {...register("lifestyle.sleepTiming")}
        />
        <SegmentedRadioGroup
          name="lifestyle.sleepQuality"
          legend="Sleep Quality"
          options={SLEEP_QUALITY_OPTIONS}
          value={sleepQuality || null}
          onChange={(value) =>
            setValue("lifestyle.sleepQuality", value as SleepQuality, {
              shouldValidate: true,
            })
          }
        />
      </div>

      <SegmentedRadioGroup
        name="lifestyle.appetite"
        legend="Typical Appetite"
        options={APPETITE_OPTIONS}
        value={appetite || null}
        onChange={(value) =>
          setValue("lifestyle.appetite", value as AppetiteLevel, {
            shouldValidate: true,
          })
        }
      />

      <div className="flex flex-col gap-3">
        <label
          htmlFor="water-intake-slider"
          className="flex items-center gap-2 text-sm font-semibold text-text-primary dark:text-text-primary-dark"
        >
          <Droplets className="h-4 w-4 text-primary-600 dark:text-secondary-300" aria-hidden="true" />
          Daily Water Intake
        </label>
        <div className="rounded-2xl border border-primary-100 bg-clinical-surface p-6 dark:border-primary-900/50 dark:bg-clinical-surface-dark">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-semibold text-primary-700 dark:text-secondary-300">
              {waterIntakeLitres.toFixed(1)} L
            </span>
            <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
              ≈ {approximateGlasses} glasses (250ml)
            </span>
          </div>
          <input
            id="water-intake-slider"
            type="range"
            min={0.5}
            max={5}
            step={0.5}
            value={waterIntakeLitres}
            onChange={(event) =>
              setValue("lifestyle.waterIntakeLitres", Number(event.target.value), {
                shouldValidate: true,
              })
            }
            className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-primary-100 accent-primary-600 dark:bg-primary-900/50"
          />
          <div className="mt-3 flex gap-1" aria-hidden="true">
            {Array.from({ length: MAX_GLASSES }).map((_, index) => (
              <span
                key={index}
                className={`h-6 flex-1 rounded-sm transition-colors duration-200 ${
                  index < approximateGlasses
                    ? "bg-gradient-to-b from-secondary-300 to-primary-500"
                    : "bg-primary-50 dark:bg-primary-900/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <TextAreaField
        label="Current stressors"
        rows={3}
        placeholder="Work pressure, family circumstances, life events — anything weighing on you lately."
        {...register("lifestyle.stressors")}
      />

      <TextAreaField
        label="Occupational pattern"
        rows={3}
        placeholder="Desk-based, physically active, shift work, frequent travel, etc."
        {...register("lifestyle.occupationalPattern")}
      />
    </div>
  );
}

// ============================================================================
// src/components/wizard/StepChiefComplaint.tsx
// ============================================================================

import type { UseFormReturn } from "react-hook-form";
import { TextField, TextAreaField, SegmentedRadioGroup } from "../atoms/FormFields";
import type { ConsultationFormData } from "../../types/consultation.types";

export interface StepChiefComplaintProps {
  readonly form: UseFormReturn<ConsultationFormData>;
}

const DURATION_UNIT_OPTIONS = [
  { value: "Days", label: "Days" },
  { value: "Weeks", label: "Weeks" },
  { value: "Months", label: "Months" },
  { value: "Years", label: "Years" },
] as const;

function getPainDescriptor(intensity: number): string {
  if (intensity <= 2) return "Minimal — barely noticeable";
  if (intensity <= 4) return "Mild — noticeable but not limiting";
  if (intensity <= 6) return "Moderate — interferes with some activities";
  if (intensity <= 8) return "Severe — interferes with most activities";
  return "Extreme — unable to carry out daily activities";
}

export function StepChiefComplaint({ form }: StepChiefComplaintProps): JSX.Element {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = form;

  const painIntensity = watch("complaint.painIntensity");
  const durationUnit = watch("complaint.durationUnit");

  return (
    <div className="flex flex-col gap-6">
      <TextAreaField
        label="Describe your primary symptoms"
        required
        rows={5}
        placeholder="What are you experiencing? When did it start, and has it changed over time?"
        errorMessage={errors.complaint?.primarySymptoms?.message}
        {...register("complaint.primarySymptoms", {
          required: "Please describe your main complaint — this shapes the entire case.",
          minLength: { value: 10, message: "Please add a little more detail." },
        })}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_1.4fr]">
        <TextField
          label="Duration"
          required
          type="number"
          min={0}
          placeholder="e.g. 6"
          errorMessage={errors.complaint?.durationValue?.message}
          {...register("complaint.durationValue", {
            required: "How long has this been going on?",
          })}
        />
        <SegmentedRadioGroup
          name="complaint.durationUnit"
          legend="Unit"
          required
          options={DURATION_UNIT_OPTIONS}
          value={durationUnit || null}
          errorMessage={errors.complaint?.durationUnit?.message}
          onChange={(value) => {
            setValue(
              "complaint.durationUnit",
              value as ConsultationFormData["complaint"]["durationUnit"],
              { shouldValidate: true }
            );
            clearErrors("complaint.durationUnit");
          }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="pain-intensity-slider"
          className="text-sm font-semibold text-text-primary dark:text-text-primary-dark"
        >
          Pain / Discomfort Intensity
        </label>
        <div className="rounded-2xl border border-primary-100 bg-clinical-surface p-6 dark:border-primary-900/50 dark:bg-clinical-surface-dark">
          <div className="flex items-center justify-between">
            <span className="font-serif text-3xl font-semibold text-primary-700 dark:text-secondary-300">
              {painIntensity}
              <span className="text-base font-sans font-normal text-text-secondary dark:text-text-secondary-dark">
                {" "}
                / 10
              </span>
            </span>
            <span className="max-w-[10rem] text-right text-sm text-text-secondary dark:text-text-secondary-dark">
              {getPainDescriptor(painIntensity)}
            </span>
          </div>
          <input
            id="pain-intensity-slider"
            type="range"
            min={1}
            max={10}
            step={1}
            value={painIntensity}
            onChange={(event) =>
              setValue("complaint.painIntensity", Number(event.target.value), {
                shouldValidate: true,
              })
            }
            className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-secondary-200 via-amber-300 to-red-400 accent-primary-700"
            aria-valuemin={1}
            aria-valuemax={10}
            aria-valuenow={painIntensity}
          />
          <div className="mt-2 flex justify-between text-xs text-text-secondary dark:text-text-secondary-dark">
            <span>1 · Minimal</span>
            <span>10 · Extreme</span>
          </div>
        </div>
      </div>

      <TextAreaField
        label="Previous treatments tried for this complaint"
        rows={4}
        placeholder="Include any allopathic, homeopathic, or other treatments already tried, and how you responded."
        helperText="Optional, but helps avoid repeating what hasn't worked."
        {...register("complaint.priorTreatments")}
      />
    </div>
  );
}

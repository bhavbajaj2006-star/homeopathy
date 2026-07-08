// ============================================================================
// src/components/wizard/StepPersonalInfo.tsx
// ============================================================================

import type { UseFormReturn } from "react-hook-form";
import { TextField, SegmentedRadioGroup } from "../atoms/FormFields";
import type { ConsultationFormData, Gender } from "../../types/consultation.types";

const GENDER_OPTIONS: readonly { value: Gender; label: string }[] = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Non-binary", label: "Non-binary" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

export interface StepPersonalInfoProps {
  readonly form: UseFormReturn<ConsultationFormData>;
}

export function StepPersonalInfo({ form }: StepPersonalInfoProps): JSX.Element {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = form;

  const selectedGender = watch("personal.gender");

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          label="Full Name"
          required
          placeholder="As per your ID"
          errorMessage={errors.personal?.fullName?.message}
          {...register("personal.fullName", {
            required: "Please enter your full name.",
            minLength: { value: 2, message: "Name looks too short." },
          })}
        />
        <TextField
          label="Age"
          required
          type="number"
          min={0}
          max={120}
          placeholder="e.g. 34"
          errorMessage={errors.personal?.age?.message}
          {...register("personal.age", {
            required: "Please enter your age.",
            min: { value: 0, message: "Age cannot be negative." },
            max: { value: 120, message: "Please enter a valid age." },
          })}
        />
      </div>

      <SegmentedRadioGroup
        name="personal.gender"
        legend="Gender Identity"
        required
        options={GENDER_OPTIONS}
        value={selectedGender || null}
        errorMessage={errors.personal?.gender?.message}
        onChange={(value) => {
          setValue("personal.gender", value as Gender, { shouldValidate: true });
          clearErrors("personal.gender");
        }}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          label="Occupation"
          placeholder="e.g. Software Engineer"
          errorMessage={errors.personal?.occupation?.message}
          {...register("personal.occupation")}
        />
        <TextField
          label="Phone Number"
          required
          type="tel"
          placeholder="+91 9XXXXXXXXX"
          errorMessage={errors.personal?.phone?.message}
          {...register("personal.phone", {
            required: "A contact number is required to confirm your appointment.",
            pattern: {
              value: /^[+]?[\d\s-]{8,15}$/,
              message: "Please enter a valid phone number.",
            },
          })}
        />
      </div>

      <TextField
        label="Email Address"
        required
        type="email"
        placeholder="you@example.com"
        errorMessage={errors.personal?.email?.message}
        {...register("personal.email", {
          required: "We'll send your case summary here.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address.",
          },
        })}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          label="Height (cm)"
          type="number"
          min={0}
          placeholder="e.g. 165"
          helperText="Approximate is fine."
          {...register("personal.heightCm")}
        />
        <TextField
          label="Weight (kg)"
          type="number"
          min={0}
          placeholder="e.g. 62"
          helperText="Approximate is fine."
          {...register("personal.weightKg")}
        />
      </div>
    </div>
  );
}

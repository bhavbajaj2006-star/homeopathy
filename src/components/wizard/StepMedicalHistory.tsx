// ============================================================================
// src/components/wizard/StepMedicalHistory.tsx
// ============================================================================

import type { UseFormReturn } from "react-hook-form";
import { TextAreaField } from "../atoms/FormFields";
import { TagMultiSelect } from "../atoms/TagMultiSelect";
import {
  CHRONIC_CONDITION_OPTIONS,
  FAMILY_HISTORY_OPTIONS,
  PREDISPOSITION_OPTIONS,
} from "../../data/wizardOptions";
import type { ConsultationFormData } from "../../types/consultation.types";

export interface StepMedicalHistoryProps {
  readonly form: UseFormReturn<ConsultationFormData>;
}

export function StepMedicalHistory({ form }: StepMedicalHistoryProps): JSX.Element {
  const { register, watch, setValue } = form;

  const predispositions = watch("medicalHistory.predispositions");
  const chronicConditions = watch("medicalHistory.chronicConditions");
  const familyHistory = watch("medicalHistory.familyHistory");

  return (
    <div className="flex flex-col gap-8">
      <TagMultiSelect
        legend="Clinical Predispositions"
        options={PREDISPOSITION_OPTIONS}
        selected={predispositions}
        onChange={(next) =>
          setValue("medicalHistory.predispositions", next, { shouldValidate: true })
        }
      />

      <TagMultiSelect
        legend="Current Chronic Conditions"
        options={CHRONIC_CONDITION_OPTIONS}
        selected={chronicConditions}
        onChange={(next) =>
          setValue("medicalHistory.chronicConditions", next, { shouldValidate: true })
        }
      />

      <TagMultiSelect
        legend="Family Medical History"
        options={FAMILY_HISTORY_OPTIONS}
        selected={familyHistory}
        onChange={(next) =>
          setValue("medicalHistory.familyHistory", next, { shouldValidate: true })
        }
      />

      <TextAreaField
        label="Previous surgeries or hospitalizations"
        rows={3}
        placeholder="List any operations or hospital admissions, with approximate year."
        {...register("medicalHistory.previousOperations")}
      />

      <TextAreaField
        label="Anything else relevant to your medical history"
        rows={3}
        placeholder="Any other conditions, medications, or history not covered above."
        {...register("medicalHistory.otherNotes")}
      />
    </div>
  );
}

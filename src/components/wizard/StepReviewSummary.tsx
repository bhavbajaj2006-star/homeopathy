// ============================================================================
// src/components/wizard/StepReviewSummary.tsx
// ============================================================================

import type { UseFormReturn } from "react-hook-form";
import { FileCheck, User } from "lucide-react";
import type { ConsultationFormData } from "../../types/consultation.types";

export interface StepReviewSummaryProps {
  readonly form: UseFormReturn<ConsultationFormData>;
}

interface LedgerRow {
  readonly label: string;
  readonly value: string;
}

function LedgerSection({
  title,
  rows,
}: {
  readonly title: string;
  readonly rows: readonly LedgerRow[];
}): JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-serif text-base font-semibold text-primary-800 dark:text-secondary-300">
        {title}
      </h3>
      <dl className="flex flex-col divide-y divide-primary-50 dark:divide-primary-900/40">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-6 py-2.5"
          >
            <dt className="text-sm text-text-secondary dark:text-text-secondary-dark">
              {row.label}
            </dt>
            <dd className="max-w-[60%] text-right text-sm font-medium text-text-primary dark:text-text-primary-dark">
              {row.value || "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function StepReviewSummary({ form }: StepReviewSummaryProps): JSX.Element {
  const { watch } = form;
  const data = watch();

  const listOrDash = (items: readonly string[]): string =>
    items.length > 0 ? items.join(", ") : "None reported";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 rounded-2xl bg-secondary-50 px-5 py-4 dark:bg-primary-900/20">
        <FileCheck className="h-5 w-5 shrink-0 text-primary-700 dark:text-secondary-300" aria-hidden="true" />
        <p className="text-sm text-primary-800 dark:text-secondary-200">
          Please review your case details below. You can go back to any step
          to make changes before submitting.
        </p>
      </div>

      <div className="rounded-3xl border border-primary-100 bg-clinical-surface p-6 dark:border-primary-900/50 dark:bg-clinical-surface-dark sm:p-8">
        <div className="flex items-center gap-3 border-b border-dashed border-primary-100 pb-6 dark:border-primary-900/50">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-secondary-300">
            <User className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-serif text-lg font-medium text-text-primary dark:text-text-primary-dark">
              {data.personal.fullName || "Unnamed Patient"}
            </p>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
              Case Intake Summary · {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-8">
          <LedgerSection
            title="Personal Telemetry"
            rows={[
              { label: "Age", value: data.personal.age },
              { label: "Gender", value: data.personal.gender },
              { label: "Occupation", value: data.personal.occupation },
              { label: "Phone", value: data.personal.phone },
              { label: "Email", value: data.personal.email },
              {
                label: "Height / Weight",
                value:
                  data.personal.heightCm || data.personal.weightKg
                    ? `${data.personal.heightCm || "—"} cm / ${data.personal.weightKg || "—"} kg`
                    : "",
              },
            ]}
          />

          <LedgerSection
            title="Chief Complaint"
            rows={[
              { label: "Primary Symptoms", value: data.complaint.primarySymptoms },
              {
                label: "Duration",
                value:
                  data.complaint.durationValue && data.complaint.durationUnit
                    ? `${data.complaint.durationValue} ${data.complaint.durationUnit}`
                    : "",
              },
              { label: "Pain Intensity", value: `${data.complaint.painIntensity} / 10` },
              { label: "Prior Treatments", value: data.complaint.priorTreatments },
            ]}
          />

          <LedgerSection
            title="Medical History"
            rows={[
              { label: "Predispositions", value: listOrDash(data.medicalHistory.predispositions) },
              { label: "Chronic Conditions", value: listOrDash(data.medicalHistory.chronicConditions) },
              { label: "Family History", value: listOrDash(data.medicalHistory.familyHistory) },
              { label: "Previous Operations", value: data.medicalHistory.previousOperations },
            ]}
          />

          <LedgerSection
            title="Lifestyle"
            rows={[
              { label: "Sleep Timing", value: data.lifestyle.sleepTiming },
              { label: "Sleep Quality", value: data.lifestyle.sleepQuality },
              { label: "Appetite", value: data.lifestyle.appetite },
              { label: "Water Intake", value: `${data.lifestyle.waterIntakeLitres.toFixed(1)} L / day` },
              { label: "Stressors", value: data.lifestyle.stressors },
            ]}
          />

          <LedgerSection
            title="Classical Modalities"
            rows={[
              { label: "Thermal Preference", value: data.modalities.thermalPreference },
              { label: "Food Cravings", value: listOrDash(data.modalities.foodCravings) },
              { label: "Food Aversions", value: listOrDash(data.modalities.foodAversions) },
              { label: "Perspiration", value: listOrDash(data.modalities.perspirationTraits) },
              { label: "Dream Frequency", value: data.modalities.dreamFrequency },
              { label: "Mental States", value: listOrDash(data.modalities.mentalDispositions) },
            ]}
          />

          <LedgerSection
            title="Documents"
            rows={[
              {
                label: "Files Attached",
                value:
                  data.documents.files.length > 0
                    ? `${data.documents.files.length} file(s): ${data.documents.files
                        .map((doc) => doc.fileName)
                        .join(", ")}`
                    : "None attached",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// src/components/sections/ConsultationForm.tsx
// The architectural centerpiece: 7-step intake wizard with unified React
// Hook Form validation, Framer Motion stage transitions, and LocalStorage
// auto-save so a patient's progress survives an accidental reload.
// ============================================================================

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "../atoms/Button";
import { Card } from "../atoms/Card";
import { SectionHeader } from "../atoms/SectionHeader";
import { WizardProgress } from "../wizard/WizardProgress";
import { StepPersonalInfo } from "../wizard/StepPersonalInfo";
import { StepChiefComplaint } from "../wizard/StepChiefComplaint";
import { StepMedicalHistory } from "../wizard/StepMedicalHistory";
import { StepLifestyle } from "../wizard/StepLifestyle";
import { StepHomeopathicModalities } from "../wizard/StepHomeopathicModalities";
import { StepDocumentUpload } from "../wizard/StepDocumentUpload";
import { StepReviewSummary } from "../wizard/StepReviewSummary";
import { SuccessModal } from "../wizard/SuccessModal";
import {
  CONSULTATION_FORM_STORAGE_KEY,
  DEFAULT_CONSULTATION_FORM_DATA,
  WIZARD_STEP_TITLES,
  type ConsultationFormData,
} from "../../types/consultation.types";

type FieldPathGroup =
  | "personal"
  | "complaint"
  | "medicalHistory"
  | "lifestyle"
  | "modalities"
  | "documents";

const STEP_FIELD_GROUPS: readonly FieldPathGroup[] = [
  "personal",
  "complaint",
  "medicalHistory",
  "lifestyle",
  "modalities",
  "documents",
];

function loadDraftFromStorage(): ConsultationFormData {
  if (typeof window === "undefined") {
    return DEFAULT_CONSULTATION_FORM_DATA;
  }

  try {
    const rawDraft = window.localStorage.getItem(CONSULTATION_FORM_STORAGE_KEY);
    if (!rawDraft) {
      return DEFAULT_CONSULTATION_FORM_DATA;
    }
    const parsedDraft = JSON.parse(rawDraft) as Partial<ConsultationFormData>;
    return { ...DEFAULT_CONSULTATION_FORM_DATA, ...parsedDraft };
  } catch {
    return DEFAULT_CONSULTATION_FORM_DATA;
  }
}

const TOTAL_STEPS = WIZARD_STEP_TITLES.length;

export function ConsultationForm(): JSX.Element {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const form = useForm<ConsultationFormData>({
    defaultValues: loadDraftFromStorage(),
    mode: "onBlur",
  });

  const { handleSubmit, watch, trigger, reset, setError } = form;

  // Auto-save to LocalStorage on every change, debounced via effect batching.
  useEffect(() => {
    const subscription = watch((value) => {
      window.localStorage.setItem(
        CONSULTATION_FORM_STORAGE_KEY,
        JSON.stringify(value)
      );
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const goToStep = useCallback(
    (nextIndex: number, stepDirection: 1 | -1): void => {
      setDirection(stepDirection);
      setCurrentStepIndex(nextIndex);
      window.scrollTo({ top: document.getElementById("consultation-form")?.offsetTop ?? 0, behavior: "smooth" });
    },
    []
  );

  const handleNext = async (): Promise<void> => {
    const currentGroup = STEP_FIELD_GROUPS[currentStepIndex];
    const isStepValid = currentGroup ? await trigger(currentGroup) : true;

    if (!isStepValid) {
      return;
    }

    // These two fields are driven by custom SegmentedRadioGroup controls via
    // setValue rather than native register(), so RHF's register-based
    // trigger() above cannot validate them. Enforce "required" manually.
    if (currentStepIndex === 0 && !watch("personal.gender")) {
      setError("personal.gender", {
        type: "required",
        message: "Please select a gender identity.",
      });
      return;
    }

    if (currentStepIndex === 1 && !watch("complaint.durationUnit")) {
      setError("complaint.durationUnit", {
        type: "required",
        message: "Please select a duration unit.",
      });
      return;
    }

    if (currentStepIndex < TOTAL_STEPS - 1) {
      goToStep(currentStepIndex + 1, 1);
    }
  };

  const handleBack = (): void => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1, -1);
    }
  };

  const onSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    // Simulated network latency for a production-realistic submit experience.
    await new Promise((resolve) => window.setTimeout(resolve, 1400));
    setIsSubmitting(false);
    setIsSuccessModalOpen(true);
    window.localStorage.removeItem(CONSULTATION_FORM_STORAGE_KEY);
  };

  const handleCloseSuccessModal = (): void => {
    setIsSuccessModalOpen(false);
    reset(DEFAULT_CONSULTATION_FORM_DATA);
    setCurrentStepIndex(0);
  };

  const isFinalStep = currentStepIndex === TOTAL_STEPS - 1;

  const slideVariants = {
    enter: (dir: 1 | -1) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: dir * -40, opacity: 0 }),
  };

  const renderStep = (): JSX.Element => {
    switch (currentStepIndex) {
      case 0:
        return <StepPersonalInfo form={form} />;
      case 1:
        return <StepChiefComplaint form={form} />;
      case 2:
        return <StepMedicalHistory form={form} />;
      case 3:
        return <StepLifestyle form={form} />;
      case 4:
        return <StepHomeopathicModalities form={form} />;
      case 5:
        return <StepDocumentUpload form={form} />;
      case 6:
      default:
        return <StepReviewSummary form={form} />;
    }
  };

  const patientName = watch("personal.fullName");
  const patientEmail = watch("personal.email");

  return (
    <section
      id="consultation-form"
      className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
    >
      <SectionHeader
        eyebrow="Begin Your Case"
        title="Your Classical Case Intake"
        description="Seven short steps so your first consultation can begin with a complete picture, not a blank page. Your progress is saved automatically."
        align="left"
      />

      <Card variant="surface" padding="lg" className="mt-10">
        <WizardProgress currentStepIndex={currentStepIndex} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 flex flex-col gap-10"
          noValidate
        >
          <div className="relative min-h-[20rem] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentStepIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between border-t border-primary-100 pt-6 dark:border-primary-900/40">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              leadingIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
            >
              Back
            </Button>

            {isFinalStep ? (
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                trailingIcon={!isSubmitting ? <Send className="h-4 w-4" aria-hidden="true" /> : undefined}
              >
                {isSubmitting ? "Submitting Case" : "Submit Consultation"}
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Continue
              </Button>
            )}
          </div>
        </form>
      </Card>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        patientName={patientName}
        patientEmail={patientEmail}
        onClose={handleCloseSuccessModal}
      />
    </section>
  );
}

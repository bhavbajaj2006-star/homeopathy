// ============================================================================
// src/components/wizard/SuccessModal.tsx
// ============================================================================

import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck2, CheckCircle2, Mail, X } from "lucide-react";
import { Button } from "../atoms/Button";
import { doctorConfig } from "../../config/doctorConfig";

export interface SuccessModalProps {
  readonly isOpen: boolean;
  readonly patientName: string;
  readonly patientEmail: string;
  readonly onClose: () => void;
}

export function SuccessModal({
  isOpen,
  patientName,
  patientEmail,
  onClose,
}: SuccessModalProps): JSX.Element {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-950/50 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative w-full max-w-md rounded-4xl bg-clinical-surface p-8 shadow-ambient-lg dark:bg-clinical-surface-dark"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close confirmation"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:text-text-secondary-dark dark:hover:bg-primary-900/40"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 text-primary-700 dark:bg-primary-900/40 dark:text-secondary-300"
            >
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </motion.span>

            <h2
              id="success-modal-title"
              className="mt-6 text-center font-serif text-2xl font-medium text-text-primary dark:text-text-primary-dark"
            >
              Thank you, {patientName.split(" ")[0] || "there"}
            </h2>
            <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
              Your case intake has been received. Our patient care
              coordinator will confirm your appointment slot and payment
              details within 24 hours.
            </p>

            <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-secondary-50 p-4 dark:bg-primary-900/20">
              <div className="flex items-start gap-3 text-sm text-primary-800 dark:text-secondary-200">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>A copy of your case summary will be sent to {patientEmail}.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-primary-800 dark:text-secondary-200">
                <CalendarCheck2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  Questions before then? Reach us at{" "}
                  {doctorConfig.clinic.contact.primaryPhone}.
                </span>
              </div>
            </div>

            <Button fullWidth variant="primary" className="mt-8" onClick={onClose}>
              Done
            </Button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

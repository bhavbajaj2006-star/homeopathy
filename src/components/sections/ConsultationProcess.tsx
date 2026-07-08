// ============================================================================
// src/components/sections/ConsultationProcess.tsx
// ============================================================================

import { motion } from "framer-motion";
import {
  CalendarClock,
  ClipboardList,
  FlaskConical,
  PackageCheck,
  Video,
} from "lucide-react";
import { SectionHeader } from "../atoms/SectionHeader";

interface ProcessStage {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: typeof CalendarClock;
}

const PROCESS_STAGES: readonly ProcessStage[] = [
  {
    id: "book",
    title: "Book Your Slot",
    description:
      "Choose a video or in-clinic appointment at a time that works for you, and complete the case intake form beforehand.",
    icon: CalendarClock,
  },
  {
    id: "intake",
    title: "Case Intake Review",
    description:
      "Your submitted case history is reviewed ahead of the appointment so consultation time is spent on discussion, not paperwork.",
    icon: ClipboardList,
  },
  {
    id: "consult",
    title: "Live Consultation",
    description:
      "A focused session — video or in-person — to clarify your case, ask follow-up questions, and finalize the remedy plan.",
    icon: Video,
  },
  {
    id: "remedy",
    title: "Remedy Preparation",
    description:
      "Your individualized remedy is prepared and dispensed, with clear dosage instructions specific to your case.",
    icon: FlaskConical,
  },
  {
    id: "dispatch",
    title: "Dispatch & Follow-Up",
    description:
      "Remedies are shipped or handed over, and you get seven days of chat support to report back on early response.",
    icon: PackageCheck,
  },
];

export function ConsultationProcess(): JSX.Element {
  return (
    <section
      id="consultation-process"
      className="mx-auto max-w-8xl px-5 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
    >
      <SectionHeader
        eyebrow="Our Process"
        title="From booking to remedy, in five clear stages"
        description="A transparent path so you know exactly what happens after you submit your case."
        align="left"
      />

      {/* Desktop: horizontal timeline */}
      <div className="mt-16 hidden lg:block">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 h-0.5 bg-primary-100 dark:bg-primary-900/40"
          />
          <div className="relative grid grid-cols-5 gap-6">
            {PROCESS_STAGES.map((stage, index) => {
              const StageIcon = stage.icon;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start gap-4"
                >
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-ambient-sm">
                    <StageIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif text-lg font-medium text-text-primary dark:text-text-primary-dark">
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                    {stage.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="mt-12 flex flex-col lg:hidden">
        {PROCESS_STAGES.map((stage, index) => {
          const StageIcon = stage.icon;
          const isLast = index === PROCESS_STAGES.length - 1;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative flex gap-5 pb-10"
            >
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-14 h-full w-0.5 bg-primary-100 dark:bg-primary-900/40"
                />
              ) : null}
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-ambient-sm">
                <StageIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-medium text-text-primary dark:text-text-primary-dark">
                  {stage.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// src/components/sections/Testimonials.tsx
// ============================================================================

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "../atoms/SectionHeader";
import { Card } from "../atoms/Card";

interface Testimonial {
  readonly id: string;
  readonly patientInitials: string;
  readonly patientFirstName: string;
  readonly condition: string;
  readonly treatmentDurationMonths: number;
  readonly quote: string;
  readonly isVerified: boolean;
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "t1",
    patientInitials: "R.K.",
    patientFirstName: "Ritika",
    condition: "PCOS",
    treatmentDurationMonths: 8,
    quote:
      "My cycles had been unpredictable for years. After eight months of consistent treatment and a few remedy adjustments along the way, they've become far more regular, and my energy levels have genuinely improved.",
    isVerified: true,
  },
  {
    id: "t2",
    patientInitials: "A.M.",
    patientFirstName: "Arjun",
    condition: "Migraine",
    treatmentDurationMonths: 5,
    quote:
      "I used to get debilitating migraines two or three times a week. Dr. Krishnan spent real time understanding my triggers before prescribing anything. Five months in, I'm down to maybe one mild episode a month.",
    isVerified: true,
  },
  {
    id: "t3",
    patientInitials: "S.P.",
    patientFirstName: "Sunita",
    condition: "Eczema",
    treatmentDurationMonths: 11,
    quote:
      "My son's eczema flare-ups had disrupted his sleep for over a year. The case-taking process felt thorough rather than rushed, and the flare frequency has dropped noticeably since we started.",
    isVerified: true,
  },
  {
    id: "t4",
    patientInitials: "V.N.",
    patientFirstName: "Vikram",
    condition: "Anxiety",
    treatmentDurationMonths: 6,
    quote:
      "I was skeptical going in, but the first session alone felt more thorough than any consultation I'd had before. Six months later, the constant background anxiety I'd normalized has genuinely eased.",
    isVerified: true,
  },
  {
    id: "t5",
    patientInitials: "N.D.",
    patientFirstName: "Nandini",
    condition: "IBS",
    treatmentDurationMonths: 4,
    quote:
      "The follow-up chat support made a real difference — I could report changes in real time instead of waiting weeks for the next appointment. My bloating and irregularity have both improved considerably.",
    isVerified: true,
  },
];

export function Testimonials(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const goToNext = (): void => {
    setActiveIndex((previous) => (previous + 1) % TESTIMONIALS.length);
  };

  const goToPrevious = (): void => {
    setActiveIndex(
      (previous) => (previous - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>): void => {
    setDragStartX(event.clientX);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>): void => {
    if (dragStartX === null) {
      return;
    }
    const deltaX = event.clientX - dragStartX;
    const SWIPE_THRESHOLD = 60;

    if (deltaX > SWIPE_THRESHOLD) {
      goToPrevious();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      goToNext();
    }
    setDragStartX(null);
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      className="bg-secondary-50/40 py-14 dark:bg-primary-950/10 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Patient Stories"
          title="Verified accounts from real cases"
          description="Shared with patient consent. Details are anonymized to protect patient privacy."
          align="center"
        />

        <div className="relative mt-14">
          <div
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <AnimatePresence mode="wait">
              {activeTestimonial ? (
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card variant="surface" padding="lg" className="text-center">
                    <Quote
                      className="mx-auto h-8 w-8 text-secondary-300 dark:text-primary-700"
                      aria-hidden="true"
                    />
                    <p className="mt-6 font-serif text-xl leading-relaxed text-text-primary dark:text-text-primary-dark sm:text-2xl">
                      "{activeTestimonial.quote}"
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-200 to-secondary-300 font-serif text-sm font-semibold text-primary-800">
                        {activeTestimonial.patientInitials}
                      </div>
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                        {activeTestimonial.patientFirstName}
                        {activeTestimonial.isVerified ? (
                          <BadgeCheck
                            className="h-4 w-4 text-primary-600 dark:text-secondary-300"
                            aria-label="Verified patient"
                          />
                        ) : null}
                      </p>
                      <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                        Treated for {activeTestimonial.condition} ·{" "}
                        {activeTestimonial.treatmentDurationMonths} months of care
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-clinical-surface text-primary-700 shadow-ambient-sm hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-clinical-surface-dark dark:text-secondary-300 sm:-translate-x-6"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-clinical-surface text-primary-700 shadow-ambient-sm hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-clinical-surface-dark dark:text-secondary-300 sm:translate-x-6"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
              aria-current={index === activeIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-primary-100 dark:bg-primary-900/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

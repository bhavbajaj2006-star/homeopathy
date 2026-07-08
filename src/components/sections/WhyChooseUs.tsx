// ============================================================================
// src/components/sections/WhyChooseUs.tsx
// ============================================================================

import { motion } from "framer-motion";
import {
  Clock,
  FileHeart,
  MessagesSquare,
  ShieldCheck,
  Sprout,
  UserRoundCheck,
} from "lucide-react";
import { SectionHeader } from "../atoms/SectionHeader";
import { Card } from "../atoms/Card";
import { doctorConfig } from "../../config/doctorConfig";

interface ValuePillar {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: typeof ShieldCheck;
}

const VALUE_PILLARS: readonly ValuePillar[] = [
  {
    id: "constitutional-case-taking",
    title: "Full Constitutional Case-Taking",
    description:
      "First consultations run up to ninety minutes. Nothing is prescribed from a symptom checklist — every remedy follows a complete case history.",
    icon: FileHeart,
  },
  {
    id: "registered-physician",
    title: "Registered, Verifiable Credentials",
    description: `Practicing under ${doctorConfig.doctor.registrations[0]?.council ?? "the relevant medical council"}, registration ${doctorConfig.doctor.registrations[0]?.registrationNumber ?? ""}, with credentials available on request.`,
    icon: ShieldCheck,
  },
  {
    id: "continuity-of-care",
    title: "Continuity Between Visits",
    description:
      "Every patient gets seven days of follow-up chat support after their first consultation, so early questions don't wait for the next appointment.",
    icon: MessagesSquare,
  },
  {
    id: "flexible-scheduling",
    title: "Evening & Saturday Availability",
    description:
      "OPD hours extend into the evening on weekdays and Saturday mornings are kept video-first, for people balancing work and treatment.",
    icon: Clock,
  },
  {
    id: "individualized-not-generic",
    title: "Individualized, Not Protocol-Based",
    description:
      "Two patients with the same diagnosis rarely receive the same remedy here — treatment follows the person's full symptom picture.",
    icon: UserRoundCheck,
  },
  {
    id: "classical-methodology",
    title: "Classical Homeopathic Methodology",
    description:
      "Case analysis draws on repertory and materia medica in the classical tradition, not diluted or protocol-driven prescribing.",
    icon: Sprout,
  },
];

export function WhyChooseUs(): JSX.Element {
  return (
    <section
      id="why-choose-us"
      className="mx-auto max-w-8xl px-5 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
    >
      <SectionHeader
        eyebrow="Why Prakriti"
        title="Care built around the whole case, not just the diagnosis"
        description="Every part of the practice — from appointment length to follow-up access — is structured around giving each case the attention classical homeopathy requires."
        align="left"
      />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VALUE_PILLARS.map((pillar, index) => {
          const PillarIcon = pillar.icon;
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card variant="surface" hoverLift padding="lg" className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-secondary-300">
                  <PillarIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-medium text-text-primary dark:text-text-primary-dark">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                  {pillar.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

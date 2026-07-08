// ============================================================================
// src/components/sections/AboutDoctor.tsx
// ============================================================================

import { motion } from "framer-motion";
import { Award, GraduationCap, Languages, Stethoscope } from "lucide-react";
import { SectionHeader } from "../atoms/SectionHeader";
import { Card } from "../atoms/Card";
import { StatusBadge } from "../atoms/Feedback";
import { doctorConfig } from "../../config/doctorConfig";

export function AboutDoctor(): JSX.Element {
  const { doctor } = doctorConfig;

  return (
    <section
      id="about-doctor"
      className="bg-secondary-50/40 py-14 dark:bg-primary-950/10 sm:py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <Card variant="glass" padding="lg" className="overflow-hidden">
            <div className="flex flex-col items-center gap-4 text-center">
              <div
                aria-hidden="true"
                className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary-200 to-secondary-300 font-serif text-3xl font-semibold text-primary-800 shadow-ambient"
              >
                {doctor.displayName
                  .split(" ")
                  .filter((part) => part !== "Dr.")
                  .map((part) => part.charAt(0))
                  .join("")}
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium text-text-primary dark:text-text-primary-dark">
                  {doctor.displayName}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary-700 dark:text-secondary-300">
                  {doctor.credentialsSuffix}
                </p>
              </div>
              <StatusBadge tone="success" icon={<Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />}>
                {doctor.registrations[0]?.council ?? "Registered Practitioner"}
              </StatusBadge>
            </div>

            <dl className="mt-8 flex flex-col gap-5 border-t border-primary-100 pt-6 dark:border-primary-900/40">
              <div className="flex items-start gap-3">
                <Languages className="mt-0.5 h-5 w-5 shrink-0 text-primary-600 dark:text-secondary-300" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                    Languages
                  </dt>
                  <dd className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    {doctor.languagesSpoken.join(", ")}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-primary-600 dark:text-secondary-300" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                    Registration
                  </dt>
                  <dd className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    {doctor.registrations[0]?.registrationNumber}, valid till{" "}
                    {new Date(doctor.registrations[0]?.validTill ?? "").toLocaleDateString(
                      "en-IN",
                      { year: "numeric", month: "long" }
                    )}
                  </dd>
                </div>
              </div>
            </dl>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          <SectionHeader
            eyebrow="About the Doctor"
            title="Sixteen years of case-by-case classical practice"
            description={doctor.bio}
            align="left"
          />

          <div>
            <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-text-primary dark:text-text-primary-dark">
              <GraduationCap className="h-5 w-5 text-primary-600 dark:text-secondary-300" aria-hidden="true" />
              Academic Timeline
            </h3>
            <ol className="mt-5 flex flex-col gap-5 border-l-2 border-primary-100 pl-6 dark:border-primary-900/40">
              {doctor.qualifications.map((qualification) => (
                <li key={qualification.degree} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-clinical-ivory dark:bg-clinical-background-dark"
                  />
                  <p className="text-sm font-semibold text-primary-700 dark:text-secondary-300">
                    {qualification.year}
                  </p>
                  <p className="mt-0.5 font-serif text-lg font-medium text-text-primary dark:text-text-primary-dark">
                    {qualification.degree} — {qualification.fullForm}
                  </p>
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                    {qualification.institution}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-2">
            {doctor.specializations.map((specialization) => (
              <StatusBadge key={specialization} tone="info">
                {specialization}
              </StatusBadge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

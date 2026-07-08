// ============================================================================
// src/components/legal/LegalPageLayout.tsx
// Shared layout for Privacy Policy, Terms of Service, and Cancellation Policy.
// ============================================================================

import type { ReactNode } from "react";
import { doctorConfig } from "../../config/doctorConfig";

export interface LegalSection {
  readonly heading: string;
  readonly content: ReactNode;
}

export interface LegalPageLayoutProps {
  readonly title: string;
  readonly lastUpdated: string;
  readonly intro: string;
  readonly sections: readonly LegalSection[];
}

export function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageLayoutProps): JSX.Element {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
      <header className="border-b border-primary-100 pb-8 dark:border-primary-900/40">
        <h1 className="font-serif text-display-sm font-medium text-text-primary dark:text-text-primary-dark">
          {title}
        </h1>
        <p className="mt-3 text-sm text-text-secondary dark:text-text-secondary-dark">
          Last updated: {lastUpdated} · {doctorConfig.clinic.legalName}
        </p>
        <p className="mt-5 text-base leading-relaxed text-text-secondary dark:text-text-secondary-dark">
          {intro}
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-10">
        {sections.map((section, index) => (
          <section key={section.heading} aria-labelledby={`legal-section-${index}`}>
            <h2
              id={`legal-section-${index}`}
              className="font-serif text-xl font-medium text-text-primary dark:text-text-primary-dark"
            >
              {index + 1}. {section.heading}
            </h2>
            <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
              {section.content}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 rounded-2xl bg-secondary-50 px-6 py-5 text-sm text-primary-800 dark:bg-primary-900/20 dark:text-secondary-200">
        Questions about this policy? Contact us at{" "}
        <a href={`mailto:${doctorConfig.clinic.contact.supportEmail}`} className="font-semibold underline underline-offset-2">
          {doctorConfig.clinic.contact.supportEmail}
        </a>
        .
      </footer>
    </article>
  );
}

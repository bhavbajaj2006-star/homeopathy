// ============================================================================
// src/components/sections/NotFound.tsx
// ============================================================================

import { Compass, Home, PhoneCall } from "lucide-react";
import { Button } from "../atoms/Button";
import { doctorConfig } from "../../config/doctorConfig";

export function NotFound(): JSX.Element {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-secondary-300">
          <Compass className="h-9 w-9" aria-hidden="true" />
        </span>

        <p className="mt-8 font-serif text-6xl font-semibold text-primary-700 dark:text-secondary-300">
          404
        </p>
        <h1 className="mt-4 font-serif text-2xl font-medium text-text-primary dark:text-text-primary-dark">
          This page seems to have wandered off
        </h1>
        <p className="mt-3 text-base leading-relaxed text-text-secondary dark:text-text-secondary-dark">
          The page you're looking for doesn't exist or may have moved. Let's
          get you back to somewhere useful.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="primary"
            leadingIcon={<Home className="h-4 w-4" aria-hidden="true" />}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Return Home
          </Button>
          <Button
            variant="outline"
            leadingIcon={<PhoneCall className="h-4 w-4" aria-hidden="true" />}
            onClick={() => {
              window.location.href = `tel:${doctorConfig.clinic.contact.primaryPhone.replace(/\s+/g, "")}`;
            }}
          >
            Call the Clinic
          </Button>
        </div>
      </div>
    </section>
  );
}

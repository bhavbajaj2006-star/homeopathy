// ============================================================================
// src/components/sections/DiseaseDirectory.tsx
// ============================================================================

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SearchX } from "lucide-react";
import { SectionHeader } from "../atoms/SectionHeader";
import { Card } from "../atoms/Card";
import {
  DISEASE_CATEGORIES,
  diseaseDirectory,
  type DiseaseCategory,
} from "../../data/diseaseDirectory";

type CategoryFilter = DiseaseCategory | "All Conditions";

export function DiseaseDirectory(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("All Conditions");

  const filteredEntries = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return diseaseDirectory.filter((entry) => {
      const matchesCategory =
        activeCategory === "All Conditions" || entry.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        entry.name.toLowerCase().includes(normalizedQuery) ||
        entry.summary.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  const categoryPills: readonly CategoryFilter[] = [
    "All Conditions",
    ...DISEASE_CATEGORIES,
  ];

  return (
    <section
      id="disease-directory"
      className="mx-auto max-w-8xl px-5 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
    >
      <SectionHeader
        eyebrow="Conditions We Treat"
        title="Search our clinical focus areas"
        description={`${diseaseDirectory.length} conditions regularly seen in practice, spanning chronic, hormonal, and constitutional cases. This directory is informational — it isn't a diagnosis.`}
        align="left"
      />

      <div className="mt-10 flex flex-col gap-6">
        <div className="relative max-w-xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark"
            aria-hidden="true"
          />
          <label htmlFor="disease-search" className="sr-only">
            Search conditions
          </label>
          <input
            id="disease-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search a condition, e.g. migraine, eczema, PCOS"
            className="w-full rounded-full border border-primary-100 bg-clinical-surface py-3.5 pl-12 pr-5 text-base text-text-primary shadow-inner-soft outline-none transition-all duration-200 placeholder:text-text-secondary/60 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 dark:border-primary-900/50 dark:bg-clinical-surface-dark dark:text-text-primary-dark dark:focus:ring-primary-900/40"
          />
        </div>

        <div
          role="group"
          aria-label="Filter conditions by category"
          className="flex flex-wrap gap-2"
        >
          {categoryPills.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-primary bg-primary text-white shadow-ambient-sm"
                    : "border-primary-100 bg-transparent text-text-secondary hover:border-primary-300 hover:text-primary-700 dark:border-primary-900/50 dark:text-text-secondary-dark dark:hover:text-secondary-300"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 min-h-[16rem]">
        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((entry) => {
                const EntryIcon = entry.icon;
                return (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Card variant="surface" hoverLift padding="md" className="h-full">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary-100 text-primary-700 dark:bg-primary-900/40 dark:text-secondary-300">
                          <EntryIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-secondary-400">
                            {entry.category}
                          </p>
                          <h3 className="mt-1 font-serif text-lg font-medium leading-snug text-text-primary dark:text-text-primary-dark">
                            {entry.name}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                        {entry.summary}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-primary-200 py-16 text-center dark:border-primary-900/50">
            <SearchX className="h-8 w-8 text-text-secondary dark:text-text-secondary-dark" aria-hidden="true" />
            <p className="font-serif text-lg text-text-primary dark:text-text-primary-dark">
              No conditions match "{searchQuery}"
            </p>
            <p className="max-w-sm text-sm text-text-secondary dark:text-text-secondary-dark">
              Try a different term, or book a consultation to discuss your case directly — many presentations aren't listed by name here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

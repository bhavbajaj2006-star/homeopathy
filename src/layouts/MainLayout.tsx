// ============================================================================
// src/layouts/MainLayout.tsx
// Global page shell. Wraps every route with the ThemeProvider, the shared
// document chrome (skip link, scroll-restoration anchor), and reserved
// slots for Navbar/Footer which are introduced in Phase 2.
// ============================================================================

import type { ReactNode } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { doctorConfig } from "../config/doctorConfig";

interface MainLayoutProps {
  readonly children: ReactNode;
  /**
   * Optional navigation slot. Populated by <Navbar /> in Phase 2. Kept
   * optional here so MainLayout is fully functional and testable in
   * isolation during Phase 1.
   */
  readonly navSlot?: ReactNode;
  /**
   * Optional footer slot. Populated by <Footer /> in Phase 2.
   */
  readonly footerSlot?: ReactNode;
}

export function MainLayout({
  children,
  navSlot,
  footerSlot,
}: MainLayoutProps): JSX.Element {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-clinical-ivory text-text-primary antialiased transition-colors duration-300 dark:bg-clinical-background-dark dark:text-text-primary-dark">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-ambient-lg"
        >
          Skip to main content
        </a>

        {navSlot ? (
          <header className="relative z-40">{navSlot}</header>
        ) : null}

        <main id="main-content" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>

        {footerSlot ? (
          <footer className="relative z-10">{footerSlot}</footer>
        ) : (
          <footer
            aria-hidden="true"
            className="border-t border-primary-100/60 px-6 py-8 text-center text-sm text-text-secondary dark:border-primary-900/40 dark:text-text-secondary-dark"
          >
            {doctorConfig.clinic.brandName} — footer arrives in Phase 2
          </footer>
        )}
      </div>
    </ThemeProvider>
  );
}

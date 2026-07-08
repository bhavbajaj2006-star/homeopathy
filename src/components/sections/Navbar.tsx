// ============================================================================
// src/components/sections/Navbar.tsx
// ============================================================================

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "../atoms/Button";
import { useTheme } from "../../context/ThemeContext";
import { doctorConfig } from "../../config/doctorConfig";

/** Wordmark glyph: a single dilution ring around a drop, echoing the hero's
 * potency dial so the brand mark and the hero signature read as one idea. */
function BrandMark(): JSX.Element {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" fill="#16241D" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="#DABA6E" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="1.4 5" />
      <path
        d="M20 11c4.2 4.6 6.4 8 6.4 10.9a6.4 6.4 0 1 1-12.8 0C13.6 19 15.8 15.6 20 11Z"
        fill="url(#navDropGradient)"
      />
      <defs>
        <linearGradient id="navDropGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DABA6E" />
          <stop offset="100%" stopColor="#976F2F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface NavLink {
  readonly label: string;
  readonly href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: "Why Prakriti", href: "#why-choose-us" },
  { label: "About the Doctor", href: "#about-doctor" },
  { label: "Conditions We Treat", href: "#disease-directory" },
  { label: "Our Process", href: "#consultation-process" },
  { label: "FAQs", href: "#faq" },
];

export function Navbar(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (href: string): void => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent"
      >
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-[width] duration-150 ease-linear"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        aria-label="Primary"
        className={`fixed left-0 right-0 top-0.5 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-ink-800/85 shadow-ambient-sm backdrop-blur-md"
            : "bg-ink-800/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-3.5 lg:px-10">
          <a
            href="#top"
            className="flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <BrandMark />
            <span className="font-serif text-lg font-semibold text-ink-50">
              {doctorConfig.clinic.brandName}
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavigate(link.href)}
                  className="text-sm font-medium text-ink-100/75 transition-colors duration-200 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "light" ? "Switch to dark mode" : "Switch to light mode"
              }
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-100/75 transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Sun className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            <Button
              size="sm"
              variant="gold"
              onClick={() => handleNavigate("#consultation-form")}
            >
              Book a Consultation
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink-800 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="flex h-full flex-col px-6 py-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5 font-serif text-lg font-semibold text-ink-50">
                  <BrandMark />
                  {doctorConfig.clinic.brandName}
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <ul className="mt-12 flex flex-1 flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => handleNavigate(link.href)}
                      className="w-full rounded-2xl px-4 py-4 text-left font-serif text-2xl font-medium text-ink-50 transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 pb-4">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-white/10 px-5 py-3 text-sm font-medium text-ink-50"
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Sun className="h-4 w-4" aria-hidden="true" />
                  )}
                  {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                </button>
                <Button
                  fullWidth
                  variant="gold"
                  onClick={() => handleNavigate("#consultation-form")}
                >
                  Book a Consultation
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

// ============================================================================
// src/components/sections/MobileStickyCTA.tsx
// Fixed bottom action bar shown only on small screens, so the primary
// conversion action is always one thumb-reach away.
// ============================================================================

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import { Button } from "../atoms/Button";
import { doctorConfig } from "../../config/doctorConfig";

export function MobileStickyCTA(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsVisible(window.scrollY > 320);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookClick = (): void => {
    if (location.pathname !== "/") {
      navigate("/#consultation-form");
      return;
    }
    document
      .querySelector("#consultation-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-primary-100 bg-clinical-surface/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-ambient-lg backdrop-blur-md transition-transform duration-300 dark:border-primary-900/50 dark:bg-clinical-surface-dark/90 lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <a
          href={`tel:${doctorConfig.clinic.contact.primaryPhone.replace(/\s+/g, "")}`}
          aria-label="Call the clinic"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary-100 text-primary-700 transition-colors duration-200 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:border-primary-900/50 dark:text-secondary-300"
        >
          <PhoneCall className="h-5 w-5" aria-hidden="true" />
        </a>
        <Button variant="primary" fullWidth onClick={handleBookClick}>
          Book Your Consultation
        </Button>
      </div>
    </div>
  );
}

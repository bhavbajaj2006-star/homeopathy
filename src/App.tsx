// ============================================================================
// src/App.tsx
// ============================================================================

import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { WhyChooseUs } from "./components/sections/WhyChooseUs";
import { AboutDoctor } from "./components/sections/AboutDoctor";
import { DiseaseDirectory } from "./components/sections/DiseaseDirectory";
import { ConsultationProcess } from "./components/sections/ConsultationProcess";
import { ConsultationForm } from "./components/sections/ConsultationForm";
import { Testimonials } from "./components/sections/Testimonials";
import { FAQ } from "./components/sections/FAQ";
import { Footer } from "./components/sections/Footer";
import { NotFound } from "./components/sections/NotFound";
import { MobileStickyCTA } from "./components/sections/MobileStickyCTA";
import { SectionDivider } from "./components/atoms/SectionDivider";
import { PrivacyPolicy } from "./components/legal/PrivacyPolicy";
import { TermsOfService } from "./components/legal/TermsOfService";
import { CancellationPolicy } from "./components/legal/CancellationPolicy";

function ScrollManager(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timeoutId = window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
      return () => window.clearTimeout(timeoutId);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}

function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <SectionDivider tone="ivory-to-secondary" />
      <AboutDoctor />
      <SectionDivider tone="secondary-to-ivory" />
      <DiseaseDirectory />
      <ConsultationProcess />
      <Testimonials />
      <ConsultationForm />
      <FAQ />
    </>
  );
}

export function App(): JSX.Element {
  return (
    <MainLayout navSlot={<Navbar />} footerSlot={<Footer />}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MobileStickyCTA />
    </MainLayout>
  );
}

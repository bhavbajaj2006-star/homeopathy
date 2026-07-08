// ============================================================================
// src/components/legal/TermsOfService.tsx
// ============================================================================

import { LegalPageLayout, type LegalSection } from "./LegalPageLayout";
import { doctorConfig } from "../../config/doctorConfig";

const SECTIONS: readonly LegalSection[] = [
  {
    heading: "Acceptance of Terms",
    content: (
      <p>
        By booking a consultation or using this website, you agree to these
        Terms of Service. If you do not agree, please do not use our
        services.
      </p>
    ),
  },
  {
    heading: "Nature of Services",
    content: (
      <p>
        {doctorConfig.clinic.brandName} provides classical homeopathic
        consultation services delivered by {doctorConfig.doctor.displayName},{" "}
        {doctorConfig.doctor.credentialsSuffix}. These services are intended
        to complement, not replace, conventional medical care. We do not
        provide emergency medical services.
      </p>
    ),
  },
  {
    heading: "Patient Responsibilities",
    content: (
      <p>
        You agree to provide accurate and complete information during case
        intake, including current medications and diagnosed conditions. You
        remain responsible for informing your other treating physicians of
        any homeopathic treatment you undertake, and for seeking emergency
        care when needed rather than relying on remedy-based treatment alone.
      </p>
    ),
  },
  {
    heading: "No Guarantee of Outcome",
    content: (
      <p>
        While our approach is individualized and evidence-informed,
        homeopathic treatment outcomes vary by patient and condition. We do
        not guarantee specific results, cure, or symptom resolution within
        any particular timeframe.
      </p>
    ),
  },
  {
    heading: "Payment Terms",
    content: (
      <p>
        Consultation fees are payable at the time of booking or immediately
        following your appointment, as specified for each consultation type.
        Prices are listed in Indian Rupees (INR) and are subject to change
        with notice on this website.
      </p>
    ),
  },
  {
    heading: "Intellectual Property",
    content: (
      <p>
        All content on this website — including text, graphics, and the
        disease directory — is the property of{" "}
        {doctorConfig.clinic.legalName} and may not be reproduced without
        permission.
      </p>
    ),
  },
  {
    heading: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, {doctorConfig.clinic.legalName}{" "}
        shall not be liable for indirect or consequential damages arising
        from use of this website or our consultation services, except where
        such liability cannot be excluded under applicable law.
      </p>
    ),
  },
  {
    heading: "Governing Law",
    content: (
      <p>
        These Terms are governed by the laws of India, and any disputes
        shall be subject to the exclusive jurisdiction of the courts in{" "}
        {doctorConfig.clinic.address.city}, {doctorConfig.clinic.address.state}.
      </p>
    ),
  },
];

export function TermsOfService(): JSX.Element {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="July 1, 2026"
      intro="These Terms of Service govern your use of this website and our teleconsultation services. Please read them carefully before booking an appointment."
      sections={SECTIONS}
    />
  );
}

// ============================================================================
// src/components/legal/PrivacyPolicy.tsx
// ============================================================================

import { LegalPageLayout, type LegalSection } from "./LegalPageLayout";
import { doctorConfig } from "../../config/doctorConfig";

const SECTIONS: readonly LegalSection[] = [
  {
    heading: "Information We Collect",
    content: (
      <>
        <p>
          When you book a consultation or complete the case intake form, we
          collect personal details (name, age, gender, contact information),
          medical history, lifestyle information, and any documents you
          choose to upload, such as prior prescriptions or lab reports.
        </p>
        <p>
          We also collect basic technical information — browser type, device
          type, and general usage patterns — to maintain and improve this
          website.
        </p>
      </>
    ),
  },
  {
    heading: "How We Use Your Information",
    content: (
      <p>
        Your case information is used solely to provide clinical care:
        preparing for your consultation, maintaining your case file, and
        following up on your treatment. We do not use your medical
        information for marketing purposes, and we do not sell personal data
        to any third party.
      </p>
    ),
  },
  {
    heading: "Who Can Access Your Data",
    content: (
      <p>
        Access to your case file is limited to {doctorConfig.doctor.displayName}{" "}
        and authorized clinic staff directly involved in your care. Uploaded
        documents and consultation notes are stored on access-controlled
        systems and are not shared with insurers, employers, or other third
        parties without your explicit written consent, except where required
        by law.
      </p>
    ),
  },
  {
    heading: "Data Retention",
    content: (
      <p>
        Clinical records are retained in accordance with applicable medical
        record-keeping regulations in India, generally for a minimum of
        three years from your last consultation. You may request a copy or
        deletion of your data, subject to our legal obligation to retain
        certain clinical records.
      </p>
    ),
  },
  {
    heading: "Cookies & Website Analytics",
    content: (
      <p>
        This website may use minimal, privacy-respecting analytics to
        understand aggregate visitor behavior (e.g. which pages are visited
        most). No personally identifiable browsing data is sold or shared
        with advertisers.
      </p>
    ),
  },
  {
    heading: "Your Rights",
    content: (
      <p>
        You may request access to, correction of, or deletion of your
        personal data at any time by contacting our support email below.
        We will respond to verified requests within 30 days.
      </p>
    ),
  },
  {
    heading: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect
        changes in our practices or legal requirements. The "Last updated"
        date at the top of this page will reflect the most recent revision.
      </p>
    ),
  },
];

export function PrivacyPolicy(): JSX.Element {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="July 1, 2026"
      intro={`This Privacy Policy explains how ${doctorConfig.clinic.legalName} collects, uses, and protects your personal and medical information when you use our website or consultation services.`}
      sections={SECTIONS}
    />
  );
}

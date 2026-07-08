// ============================================================================
// src/components/legal/CancellationPolicy.tsx
// ============================================================================

import { LegalPageLayout, type LegalSection } from "./LegalPageLayout";
import { doctorConfig } from "../../config/doctorConfig";

const SECTIONS: readonly LegalSection[] = [
  {
    heading: "Rescheduling Appointments",
    content: (
      <p>
        Appointments may be rescheduled at no charge if you notify us at
        least 12 hours before your scheduled consultation time. Requests can
        be made via phone, WhatsApp, or email using the contact details
        below.
      </p>
    ),
  },
  {
    heading: "Cancellation Within 12 Hours",
    content: (
      <p>
        Cancellations made less than 12 hours before the scheduled
        appointment time may be subject to a cancellation fee of 25% of the
        consultation fee, to account for reserved clinician time.
      </p>
    ),
  },
  {
    heading: "Missed Appointments (No-Shows)",
    content: (
      <p>
        If you do not attend your scheduled video or in-clinic appointment
        without prior notice, the full consultation fee is forfeited. We
        understand emergencies happen — please contact us as soon as
        possible if you're unable to attend, and we'll do our best to
        accommodate.
      </p>
    ),
  },
  {
    heading: "Technical Issues During Video Consultations",
    content: (
      <p>
        If a video consultation is disrupted due to a technical issue on our
        end, we will offer a free rescheduled slot or a prorated refund for
        any lost consultation time. Please allow a brief grace period for
        reconnection before considering the session a failure.
      </p>
    ),
  },
  {
    heading: "Refunds",
    content: (
      <p>
        Eligible refunds are processed to the original payment method within
        7–10 business days. Remedy costs already dispensed or shipped are
        non-refundable once the order has been prepared.
      </p>
    ),
  },
  {
    heading: "How to Request a Change",
    content: (
      <p>
        To reschedule or cancel, contact our patient care coordinator at{" "}
        {doctorConfig.clinic.contact.whatsappNumber} or the clinic reception
        at {doctorConfig.clinic.contact.primaryPhone} during clinic hours.
      </p>
    ),
  },
];

export function CancellationPolicy(): JSX.Element {
  return (
    <LegalPageLayout
      title="Telehealth Cancellation Policy"
      lastUpdated="July 1, 2026"
      intro="This policy outlines how appointment changes, cancellations, and refunds are handled for both video and in-clinic consultations."
      sections={SECTIONS}
    />
  );
}

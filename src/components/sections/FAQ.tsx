// ============================================================================
// src/components/sections/FAQ.tsx
// ============================================================================

import { SectionHeader } from "../atoms/SectionHeader";
import { AccordionGroup, type AccordionEntry } from "../atoms/Feedback";
import { doctorConfig } from "../../config/doctorConfig";

const FAQ_ENTRIES: readonly AccordionEntry[] = [
  {
    id: "faq-1",
    question: "Is it safe to take homeopathic remedies alongside my allopathic medication?",
    answer:
      "In most cases, yes — homeopathic remedies are generally taken alongside existing prescriptions rather than in place of them, especially for conditions like hypertension, diabetes, or thyroid disorders. Dr. Krishnan reviews your current medications during case-taking and will flag any specific timing considerations. You should never stop a prescribed medication without your treating physician's guidance.",
  },
  {
    id: "faq-2",
    question: "How long does it take to see results?",
    answer:
      "This varies significantly by condition and how long you've had it. Acute complaints can respond within days, while chronic conditions — such as autoimmune disorders or long-standing skin conditions — typically take a few months of consistent treatment before a clear pattern of improvement emerges. Your remedy plan will be reviewed and adjusted at follow-up visits based on your response.",
  },
  {
    id: "faq-3",
    question: "Will my remedies interact with common painkillers or antibiotics?",
    answer:
      "Classical homeopathic remedies are prepared at high dilutions and are not generally expected to have pharmacological interactions with conventional drugs. That said, certain strong-tasting substances (coffee, mint, camphor) can antidote a remedy's action, and this is covered in your dosage instructions rather than being a drug interaction concern.",
  },
  {
    id: "faq-4",
    question: "How are remedies shipped, and how long does delivery take?",
    answer:
      "Remedies are dispensed from the clinic in labeled vials or pellets and shipped via courier to addresses across India, typically arriving within 3–5 business days. Bengaluru-based patients can also opt for same-day clinic pickup.",
  },
  {
    id: "faq-5",
    question: "What happens during the first consultation?",
    answer:
      "The first visit is a detailed, unhurried case-taking session covering your physical symptoms, medical history, lifestyle, and emotional/mental state. This typically runs up to ninety minutes. Based on this full picture, an individualized remedy is selected — not from a standard protocol for your diagnosis.",
  },
  {
    id: "faq-6",
    question: "Do you treat children, and is the approach different?",
    answer:
      "Yes, pediatric constitutional care is one of our focus areas. Case-taking for children involves the parent or guardian closely, and remedy selection accounts for a child's specific temperament and developmental stage, using gentle, age-appropriate dosing.",
  },
  {
    id: "faq-7",
    question: "Can I get a homeopathic consultation for a condition already being treated by a specialist?",
    answer:
      "Yes. Many patients use homeopathic care alongside specialist treatment for autoimmune, hormonal, or chronic conditions. We recommend keeping your specialist informed of any additional treatment you're pursuing, and we're happy to coordinate where useful.",
  },
  {
    id: "faq-8",
    question: "What if I don't respond to the first remedy prescribed?",
    answer:
      "This isn't unusual in complex or long-standing cases. Follow-up consultations exist specifically to review your response and adjust the remedy, potency, or approach as needed. Homeopathic prescribing is iterative by nature.",
  },
  {
    id: "faq-9",
    question: "Are video consultations as effective as in-clinic visits?",
    answer:
      "For most conditions, yes — case-taking relies primarily on detailed history and observation, both of which translate well to video. Certain physical examinations (for example, detailed skin or joint assessment) may be better suited to an in-clinic visit, which we'll flag if relevant to your case.",
  },
  {
    id: "faq-10",
    question: "How is my personal and medical information kept private?",
    answer:
      "Case notes, uploaded documents, and consultation records are stored securely and are not shared with third parties without your consent, in line with our Privacy Policy. Only your treating physician and authorized clinic staff have access to your case file.",
  },
  {
    id: "faq-11",
    question: "What is your cancellation and rescheduling policy?",
    answer:
      "Appointments can be rescheduled or cancelled free of charge up to 12 hours before the scheduled time. Cancellations within 12 hours may be subject to a partial fee, as outlined in our full Telehealth Cancellation Policy.",
  },
  {
    id: "faq-12",
    question: "Do you prescribe remedies for pregnancy or breastfeeding?",
    answer:
      "Yes, with additional caution in remedy and potency selection. Please mention pregnancy or breastfeeding status clearly during case intake so this is factored into every recommendation from the outset.",
  },
  {
    id: "faq-13",
    question: "Is there a dietary restriction while on homeopathic treatment?",
    answer:
      "Generally minimal — the most commonly advised restriction is avoiding strong mint, camphor-based products, and coffee within 30 minutes of taking a remedy, as these can reduce its effect. Any condition-specific dietary guidance will be discussed separately.",
  },
  {
    id: "faq-14",
    question: "Can homeopathy help with a condition that has no clear diagnosis yet?",
    answer:
      "Often, yes. Classical case-taking works from your symptom pattern rather than requiring a confirmed diagnosis first. That said, we may still recommend relevant investigations or specialist referral where a formal diagnosis would meaningfully change the treatment approach.",
  },
  {
    id: "faq-15",
    question: "How do I reach the clinic if I have an urgent question between appointments?",
    answer: `You can reach our patient care coordinator at ${doctorConfig.clinic.contact.whatsappNumber} or the clinic reception at ${doctorConfig.clinic.contact.primaryPhone} during clinic hours. For medical emergencies, please contact your local emergency services immediately rather than the clinic.`,
  },
];

export function FAQ(): JSX.Element {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
      <SectionHeader
        eyebrow="Frequently Asked"
        title="Questions patients ask before their first visit"
        align="center"
      />

      <div className="mt-12">
        <AccordionGroup items={FAQ_ENTRIES} allowMultipleOpen={false} />
      </div>
    </section>
  );
}

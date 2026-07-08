// ============================================================================
// src/config/doctorConfig.ts
// SINGLE SOURCE OF TRUTH.
// Every component in this application must read clinic/doctor data from
// this file. Nothing here is hardcoded elsewhere. The object is deeply
// frozen at runtime so accidental mutation throws in development.
// ============================================================================

import type { DoctorConfig } from "../types/doctor.types";

/**
 * Recursively freezes an object graph. Used so that any accidental mutation
 * of clinic data anywhere in the component tree fails loudly in dev instead
 * of silently corrupting the single source of truth.
 */
function deepFreeze<T>(target: T): Readonly<T> {
  Object.getOwnPropertyNames(target).forEach((key) => {
    const value = (target as Record<string, unknown>)[key];
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });
  return Object.freeze(target);
}

const rawDoctorConfig: DoctorConfig = {
  doctor: {
    fullName: "Dr. Ananya Krishnan",
    displayName: "Dr. Ananya Krishnan",
    credentialsSuffix: "BHMS, MD (Homeopathy)",
    tagline: "Personalized Homeopathic Care for Long-Term Wellness",
    bio: "Dr. Ananya Krishnan is a classical homeopathic physician with a practice built on detailed case-taking and individualized remedy selection rather than protocol-based prescribing. Over the past sixteen years she has focused on chronic and constitutional conditions — autoimmune disorders, hormonal imbalances, dermatological conditions, and stress-related illness — treating the person's full symptom picture rather than isolated diagnoses. Her consultations are unhurried by design: a first appointment typically runs ninety minutes so that the case history is complete before any remedy is considered.",
    yearsOfExperience: 16,
    totalConsultations: 24800,
    successRatePercentage: 91,
    profileImageUrl: "/assets/images/dr-ananya-krishnan.jpg",
    qualifications: [
      {
        degree: "BHMS",
        fullForm: "Bachelor of Homeopathic Medicine and Surgery",
        institution: "Government Homeopathic Medical College, Bengaluru",
        year: 2007,
      },
      {
        degree: "MD (Hom.)",
        fullForm: "Doctor of Medicine in Homeopathy, Repertory & Materia Medica",
        institution: "National Institute of Homeopathy, Kolkata",
        year: 2011,
      },
      {
        degree: "PGDHHM",
        fullForm: "Post Graduate Diploma in Hospital & Health Management",
        institution: "Indian Institute of Health Management Research, Jaipur",
        year: 2013,
      },
    ],
    registrations: [
      {
        council: "Central Council of Homeopathy (CCH)",
        registrationNumber: "CCH-KA-2007-14832",
        validTill: "2028-03-31",
      },
      {
        council: "Karnataka Board of Homeopathic Systems of Medicine",
        registrationNumber: "KBHSM-11209",
        validTill: "2027-12-31",
      },
    ],
    specializations: [
      "Autoimmune & Chronic Inflammatory Conditions",
      "PCOS & Hormonal Health",
      "Dermatology (Eczema, Psoriasis, Alopecia)",
      "Anxiety & Stress-Related Disorders",
      "Pediatric Constitutional Care",
      "Migraine & Chronic Pain",
    ],
    languagesSpoken: ["English", "Hindi", "Kannada", "Tamil"],
  },

  clinic: {
    legalName: "Krishnan Wellness & Homeopathy Clinic LLP",
    brandName: "Prakriti Homeopathy",
    establishedYear: 2010,
    gstNumber: "29AACCK4321P1ZQ",
    address: {
      line1: "4th Floor, Prakriti Wellness House",
      line2: "100 Feet Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      country: "India",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.6408!3d12.9719",
      landmark: "Above Third Wave Coffee, opposite Indiranagar Metro Station",
    },
    schedule: [
      {
        day: "Monday",
        isOpen: true,
        blocks: [
          { opens: "10:00", closes: "13:30", label: "Morning OPD" },
          { opens: "16:30", closes: "19:30", label: "Evening OPD" },
        ],
      },
      {
        day: "Tuesday",
        isOpen: true,
        blocks: [
          { opens: "10:00", closes: "13:30", label: "Morning OPD" },
          { opens: "16:30", closes: "19:30", label: "Evening OPD" },
        ],
      },
      {
        day: "Wednesday",
        isOpen: true,
        blocks: [
          { opens: "10:00", closes: "13:30", label: "Morning OPD" },
          { opens: "16:30", closes: "19:30", label: "Evening OPD" },
        ],
      },
      {
        day: "Thursday",
        isOpen: true,
        blocks: [
          { opens: "10:00", closes: "13:30", label: "Morning OPD" },
          { opens: "16:30", closes: "19:30", label: "Evening OPD" },
        ],
      },
      {
        day: "Friday",
        isOpen: true,
        blocks: [
          { opens: "10:00", closes: "13:30", label: "Morning OPD" },
          { opens: "16:30", closes: "19:30", label: "Evening OPD" },
        ],
      },
      {
        day: "Saturday",
        isOpen: true,
        blocks: [
          { opens: "10:00", closes: "14:00", label: "Saturday OPD (Video-first)" },
        ],
      },
      {
        day: "Sunday",
        isOpen: false,
        blocks: [],
      },
    ],
    contact: {
      primaryPhone: "+91 80 4123 5678",
      whatsappNumber: "+91 98450 12345",
      email: "care@prakritihomeopathy.in",
      supportEmail: "support@prakritihomeopathy.in",
    },
    emergencyContacts: [
      {
        label: "Clinic Reception (Urgent Rescheduling)",
        phone: "+91 80 4123 5678",
        availability: "Mon–Sat, 9:00 AM – 8:00 PM IST",
      },
      {
        label: "Patient Care Coordinator",
        phone: "+91 98450 12345",
        availability: "Mon–Sat, 9:00 AM – 8:00 PM IST",
      },
    ],
  },

  pricing: [
    {
      id: "first-visit-video",
      name: "First Consultation — Video",
      modality: "video",
      durationMinutes: 90,
      priceInr: 2500,
      description:
        "A complete constitutional case-taking session covering physical, emotional, and lifestyle history, ending with an individualized remedy plan.",
      isMostPopular: true,
      includes: [
        "90-minute detailed case history",
        "Individualized remedy prescription",
        "Digital case summary (PDF)",
        "7-day follow-up chat support",
      ],
    },
    {
      id: "follow-up-video",
      name: "Follow-Up Consultation — Video",
      modality: "video",
      durationMinutes: 30,
      priceInr: 1200,
      description:
        "Progress review and remedy adjustment for existing patients continuing an ongoing treatment plan.",
      isMostPopular: false,
      includes: [
        "30-minute progress review",
        "Remedy plan adjustment if required",
        "Updated digital case notes",
      ],
    },
    {
      id: "first-visit-clinic",
      name: "First Consultation — In-Clinic",
      modality: "in-clinic",
      durationMinutes: 90,
      priceInr: 3000,
      description:
        "The full first-visit case-taking experience conducted in person at the Indiranagar clinic.",
      isMostPopular: false,
      includes: [
        "90-minute in-person case history",
        "Individualized remedy prescription",
        "On-site remedy dispensing",
        "Physical case file",
      ],
    },
    {
      id: "chat-review",
      name: "Quick Chat Review",
      modality: "chat",
      durationMinutes: 15,
      priceInr: 500,
      description:
        "A short asynchronous chat check-in for minor queries on an existing, active remedy plan.",
      isMostPopular: false,
      includes: [
        "Asynchronous chat within 24 hours",
        "Minor dosage guidance",
        "Not for new complaints",
      ],
    },
  ],

  social: [
    {
      platform: "instagram",
      handle: "@prakritihomeopathy",
      url: "https://instagram.com/prakritihomeopathy",
    },
    {
      platform: "facebook",
      handle: "Prakriti Homeopathy",
      url: "https://facebook.com/prakritihomeopathy",
    },
    {
      platform: "linkedin",
      handle: "Dr. Ananya Krishnan",
      url: "https://linkedin.com/in/dr-ananya-krishnan",
    },
    {
      platform: "youtube",
      handle: "Prakriti Homeopathy",
      url: "https://youtube.com/@prakritihomeopathy",
    },
    {
      platform: "whatsapp",
      handle: "+91 98450 12345",
      url: "https://wa.me/919845012345",
    },
  ],

  meta: {
    siteTitle: "Prakriti Homeopathy — Dr. Ananya Krishnan, BHMS, MD (Hom.)",
    siteDescription:
      "Classical homeopathic consultations with Dr. Ananya Krishnan. Personalized, evidence-informed constitutional care for chronic and long-term conditions, available by video or in-clinic in Bengaluru.",
    themeColorLight: "#F8FCFA",
    themeColorDark: "#0F1712",
  },
};

export const doctorConfig: Readonly<DoctorConfig> = deepFreeze(rawDoctorConfig);

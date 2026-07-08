// ============================================================================
// src/types/doctor.types.ts
// Strict, exhaustive type definitions for the single source of truth
// clinic/doctor configuration object. No `any` is used anywhere in this file.
// ============================================================================

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface ClinicHoursBlock {
  readonly opens: string; // 24hr "HH:mm" format, e.g. "10:00"
  readonly closes: string; // 24hr "HH:mm" format, e.g. "19:00"
  readonly label: string; // human readable, e.g. "Morning & Evening OPD"
}

export interface DayScheduleEntry {
  readonly day: WeekDay;
  readonly isOpen: boolean;
  readonly blocks: readonly ClinicHoursBlock[];
}

export interface Qualification {
  readonly degree: string;
  readonly fullForm: string;
  readonly institution: string;
  readonly year: number;
}

export interface RegistrationDetail {
  readonly council: string;
  readonly registrationNumber: string;
  readonly validTill: string; // ISO date string
}

export type ConsultationModality = "video" | "audio" | "chat" | "in-clinic";

export interface PricingTier {
  readonly id: string;
  readonly name: string;
  readonly modality: ConsultationModality;
  readonly durationMinutes: number;
  readonly priceInr: number;
  readonly description: string;
  readonly isMostPopular: boolean;
  readonly includes: readonly string[];
}

export interface SocialVector {
  readonly platform:
    | "instagram"
    | "facebook"
    | "linkedin"
    | "youtube"
    | "whatsapp"
    | "twitter";
  readonly handle: string;
  readonly url: string;
}

export interface EmergencyContact {
  readonly label: string;
  readonly phone: string;
  readonly availability: string;
}

export interface ClinicAddress {
  readonly line1: string;
  readonly line2: string;
  readonly city: string;
  readonly state: string;
  readonly pincode: string;
  readonly country: string;
  readonly mapEmbedUrl: string;
  readonly landmark: string;
}

export interface DoctorConfig {
  readonly doctor: {
    readonly fullName: string;
    readonly displayName: string;
    readonly credentialsSuffix: string;
    readonly tagline: string;
    readonly bio: string;
    readonly yearsOfExperience: number;
    readonly totalConsultations: number;
    readonly successRatePercentage: number;
    readonly profileImageUrl: string;
    readonly qualifications: readonly Qualification[];
    readonly registrations: readonly RegistrationDetail[];
    readonly specializations: readonly string[];
    readonly languagesSpoken: readonly string[];
  };
  readonly clinic: {
    readonly legalName: string;
    readonly brandName: string;
    readonly establishedYear: number;
    readonly gstNumber: string;
    readonly address: ClinicAddress;
    readonly schedule: readonly DayScheduleEntry[];
    readonly contact: {
      readonly primaryPhone: string;
      readonly whatsappNumber: string;
      readonly email: string;
      readonly supportEmail: string;
    };
    readonly emergencyContacts: readonly EmergencyContact[];
  };
  readonly pricing: readonly PricingTier[];
  readonly social: readonly SocialVector[];
  readonly meta: {
    readonly siteTitle: string;
    readonly siteDescription: string;
    readonly themeColorLight: string;
    readonly themeColorDark: string;
  };
}

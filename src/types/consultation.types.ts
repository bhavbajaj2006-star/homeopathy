// ============================================================================
// src/types/consultation.types.ts
// Data model for the 7-step classical homeopathic intake wizard.
// ============================================================================

export type Gender = "Female" | "Male" | "Non-binary" | "Prefer not to say";

export interface PersonalTelemetry {
  fullName: string;
  age: string;
  gender: Gender | "";
  occupation: string;
  email: string;
  phone: string;
  heightCm: string;
  weightKg: string;
}

export interface ChiefComplaintProfile {
  primarySymptoms: string;
  durationValue: string;
  durationUnit: "Days" | "Weeks" | "Months" | "Years" | "";
  painIntensity: number;
  priorTreatments: string;
}

export interface DeepMedicalHistory {
  predispositions: readonly string[];
  previousOperations: string;
  chronicConditions: readonly string[];
  familyHistory: readonly string[];
  otherNotes: string;
}

export type SleepQuality = "Sound & Uninterrupted" | "Frequent Waking" | "Difficulty Falling Asleep" | "Early Waking";
export type AppetiteLevel = "Poor" | "Moderate" | "Strong" | "Excessive";

export interface DailyRoutineLifestyle {
  sleepTiming: string;
  sleepQuality: SleepQuality | "";
  appetite: AppetiteLevel | "";
  waterIntakeLitres: number;
  stressors: string;
  occupationalPattern: string;
}

export type ThermalPreference = "Hot" | "Cold" | "Ambivalent";
export type DreamFrequency = "Rarely" | "Occasionally" | "Frequently" | "Vivid & Recurring";
export type MentalDisposition = "Anxious" | "Irritable" | "Reserved" | "Sensitive to Criticism" | "Weepy" | "Calm & Composed";

export interface ClassicalModalities {
  thermalPreference: ThermalPreference | "";
  foodCravings: readonly string[];
  foodAversions: readonly string[];
  perspirationTraits: readonly string[];
  dreamFrequency: DreamFrequency | "";
  mentalDispositions: readonly MentalDisposition[];
  fears: string;
  memoryNotes: string;
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  fileSizeKb: number;
  extension: string;
  uploadProgress: number;
}

export interface ClinicalDocuments {
  files: readonly UploadedDocument[];
}

export interface ConsultationFormData {
  personal: PersonalTelemetry;
  complaint: ChiefComplaintProfile;
  medicalHistory: DeepMedicalHistory;
  lifestyle: DailyRoutineLifestyle;
  modalities: ClassicalModalities;
  documents: ClinicalDocuments;
}

export const CONSULTATION_FORM_STORAGE_KEY = "prakriti-consultation-draft-v1";

export const DEFAULT_CONSULTATION_FORM_DATA: ConsultationFormData = {
  personal: {
    fullName: "",
    age: "",
    gender: "",
    occupation: "",
    email: "",
    phone: "",
    heightCm: "",
    weightKg: "",
  },
  complaint: {
    primarySymptoms: "",
    durationValue: "",
    durationUnit: "",
    painIntensity: 5,
    priorTreatments: "",
  },
  medicalHistory: {
    predispositions: [],
    previousOperations: "",
    chronicConditions: [],
    familyHistory: [],
    otherNotes: "",
  },
  lifestyle: {
    sleepTiming: "",
    sleepQuality: "",
    appetite: "",
    waterIntakeLitres: 2,
    stressors: "",
    occupationalPattern: "",
  },
  modalities: {
    thermalPreference: "",
    foodCravings: [],
    foodAversions: [],
    perspirationTraits: [],
    dreamFrequency: "",
    mentalDispositions: [],
    fears: "",
    memoryNotes: "",
  },
  documents: {
    files: [],
  },
};

export const WIZARD_STEP_TITLES: readonly string[] = [
  "Personal Telemetry",
  "Chief Complaint",
  "Medical History",
  "Lifestyle",
  "Homeopathic Modalities",
  "Documents",
  "Review & Submit",
];

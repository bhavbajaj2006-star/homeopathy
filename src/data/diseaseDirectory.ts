// ============================================================================
// src/data/diseaseDirectory.ts
// Mock database powering the DiseaseDirectory search/filter panel.
// ============================================================================

import type { ComponentType, SVGProps } from "react";
import {
  Activity,
  AlertCircle,
  Baby,
  Bone,
  Brain,
  Droplet,
  Ear,
  Eye,
  Flame,
  Flower2,
  Heart,
  HeartPulse,
  Moon,
  Repeat,
  Scale,
  Shell,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Thermometer,
  Wind,
  Zap,
} from "lucide-react";

export type DiseaseCategory =
  | "Skin & Hair"
  | "Hormonal & Reproductive"
  | "Digestive"
  | "Respiratory"
  | "Mental & Emotional"
  | "Musculoskeletal & Pain"
  | "Autoimmune & Allergy"
  | "Pediatric"
  | "General & Chronic";

export interface DiseaseEntry {
  readonly id: string;
  readonly name: string;
  readonly category: DiseaseCategory;
  readonly summary: string;
  readonly icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const DISEASE_CATEGORIES: readonly DiseaseCategory[] = [
  "Skin & Hair",
  "Hormonal & Reproductive",
  "Digestive",
  "Respiratory",
  "Mental & Emotional",
  "Musculoskeletal & Pain",
  "Autoimmune & Allergy",
  "Pediatric",
  "General & Chronic",
];

export const diseaseDirectory: readonly DiseaseEntry[] = [
  {
    id: "pcos",
    name: "PCOS (Polycystic Ovary Syndrome)",
    category: "Hormonal & Reproductive",
    summary:
      "A constitutional approach addressing irregular cycles, insulin resistance, and hormonal imbalance rather than cycle regulation alone.",
    icon: Flower2,
  },
  {
    id: "migraine",
    name: "Migraine",
    category: "Musculoskeletal & Pain",
    summary:
      "Case-specific remedies selected on trigger pattern, aura type, and accompanying symptoms to reduce frequency and intensity over time.",
    icon: Zap,
  },
  {
    id: "ibs",
    name: "IBS (Irritable Bowel Syndrome)",
    category: "Digestive",
    summary:
      "Treatment aimed at the gut-stress connection, addressing bloating, irregular bowel habits, and food sensitivity patterns.",
    icon: Activity,
  },
  {
    id: "psoriasis",
    name: "Psoriasis",
    category: "Skin & Hair",
    summary:
      "Long-term constitutional management of plaque flare-ups, focusing on the immune and stress triggers behind recurring episodes.",
    icon: Shell,
  },
  {
    id: "eczema",
    name: "Eczema (Atopic Dermatitis)",
    category: "Skin & Hair",
    summary:
      "Individualized care for chronic itching and flare cycles, considering allergic tendency and skin barrier sensitivity.",
    icon: Droplet,
  },
  {
    id: "anxiety",
    name: "Anxiety Disorders",
    category: "Mental & Emotional",
    summary:
      "Remedies matched to the specific character of worry, physical anxiety symptoms, and underlying temperament.",
    icon: Brain,
  },
  {
    id: "alopecia",
    name: "Alopecia (Hair Loss)",
    category: "Skin & Hair",
    summary:
      "Addresses patterned and diffuse hair thinning by treating underlying stress, thyroid, or nutritional contributors.",
    icon: Sparkles,
  },
  {
    id: "autoimmune-thyroid",
    name: "Autoimmune Thyroiditis (Hashimoto's)",
    category: "Autoimmune & Allergy",
    summary:
      "Supports thyroid function and symptom load alongside conventional monitoring, using a whole-person treatment plan.",
    icon: ShieldAlert,
  },
  {
    id: "rheumatoid-arthritis",
    name: "Rheumatoid Arthritis",
    category: "Autoimmune & Allergy",
    summary:
      "Manages joint pain, morning stiffness, and inflammatory flare patterns through constitutional and modality-specific remedies.",
    icon: Bone,
  },
  {
    id: "allergic-rhinitis",
    name: "Allergic Rhinitis",
    category: "Respiratory",
    summary:
      "Targets recurring sneezing, nasal congestion, and seasonal sensitivity by addressing the underlying allergic tendency.",
    icon: Wind,
  },
  {
    id: "asthma",
    name: "Bronchial Asthma",
    category: "Respiratory",
    summary:
      "Long-term supportive care for breathlessness and wheeze patterns, used alongside prescribed inhaler therapy where required.",
    icon: HeartPulse,
  },
  {
    id: "sinusitis",
    name: "Chronic Sinusitis",
    category: "Respiratory",
    summary:
      "Addresses recurring sinus pressure, post-nasal drip, and headache linked to chronic sinus inflammation.",
    icon: Thermometer,
  },
  {
    id: "gerd",
    name: "GERD (Acid Reflux)",
    category: "Digestive",
    summary:
      "Considers dietary pattern, stress load, and digestive constitution to reduce reflux frequency and severity.",
    icon: Flame,
  },
  {
    id: "constipation",
    name: "Chronic Constipation",
    category: "Digestive",
    summary:
      "Individualized remedy selection based on stool pattern, associated bloating, and lifestyle contributors.",
    icon: Repeat,
  },
  {
    id: "menopause",
    name: "Menopausal Syndrome",
    category: "Hormonal & Reproductive",
    summary:
      "Eases hot flashes, mood shifts, and sleep disruption during the menopausal transition with constitutional remedies.",
    icon: Thermometer,
  },
  {
    id: "infertility",
    name: "Unexplained Infertility",
    category: "Hormonal & Reproductive",
    summary:
      "Supports underlying hormonal and constitutional factors as part of a broader fertility care plan.",
    icon: Baby,
  },
  {
    id: "hypothyroidism",
    name: "Hypothyroidism",
    category: "Hormonal & Reproductive",
    summary:
      "Whole-person management of fatigue, weight changes, and metabolic symptoms alongside thyroid monitoring.",
    icon: Scale,
  },
  {
    id: "depression",
    name: "Low Mood & Depressive States",
    category: "Mental & Emotional",
    summary:
      "Gentle, individualized support for persistent low mood, low energy, and disrupted motivation.",
    icon: Moon,
  },
  {
    id: "insomnia",
    name: "Insomnia",
    category: "Mental & Emotional",
    summary:
      "Remedies chosen by the specific sleep disturbance pattern — difficulty falling asleep, frequent waking, or early rising.",
    icon: Moon,
  },
  {
    id: "ocd",
    name: "OCD (Obsessive-Compulsive Tendencies)",
    category: "Mental & Emotional",
    summary:
      "Supportive constitutional treatment for repetitive thought patterns and compulsive behaviors, alongside therapy.",
    icon: Repeat,
  },
  {
    id: "osteoarthritis",
    name: "Osteoarthritis",
    category: "Musculoskeletal & Pain",
    summary:
      "Addresses joint stiffness, pain on movement, and mobility limitation with remedies matched to affected joints.",
    icon: Bone,
  },
  {
    id: "cervical-spondylosis",
    name: "Cervical Spondylosis",
    category: "Musculoskeletal & Pain",
    summary:
      "Manages neck stiffness, radiating pain, and posture-related discomfort through individualized case analysis.",
    icon: Bone,
  },
  {
    id: "fibromyalgia",
    name: "Fibromyalgia",
    category: "Musculoskeletal & Pain",
    summary:
      "Whole-body approach to widespread pain, fatigue, and tenderness points common in fibromyalgia presentations.",
    icon: HeartPulse,
  },
  {
    id: "urticaria",
    name: "Chronic Urticaria (Hives)",
    category: "Autoimmune & Allergy",
    summary:
      "Investigates recurring hive patterns and triggers to reduce flare frequency over a sustained treatment course.",
    icon: AlertCircle,
  },
  {
    id: "food-allergy",
    name: "Food Sensitivities & Allergies",
    category: "Autoimmune & Allergy",
    summary:
      "Constitutional remedies aimed at reducing reactive sensitivity alongside dietary guidance.",
    icon: Shell,
  },
  {
    id: "recurrent-tonsillitis",
    name: "Recurrent Tonsillitis (Children)",
    category: "Pediatric",
    summary:
      "Reduces frequency of throat infections in children through immune-supportive constitutional care.",
    icon: Ear,
  },
  {
    id: "bedwetting",
    name: "Nocturnal Enuresis (Bedwetting)",
    category: "Pediatric",
    summary:
      "Gentle, non-punitive remedy selection addressing the physical and emotional pattern behind bedwetting in children.",
    icon: Droplet,
  },
  {
    id: "adhd-support",
    name: "Attention & Focus Difficulties",
    category: "Pediatric",
    summary:
      "Supportive constitutional care for attention, restlessness, and behavioral patterns in children, alongside specialist input.",
    icon: Brain,
  },
  {
    id: "chronic-fatigue",
    name: "Chronic Fatigue Syndrome",
    category: "General & Chronic",
    summary:
      "Addresses persistent low energy and post-exertional fatigue through a detailed constitutional case history.",
    icon: Activity,
  },
  {
    id: "recurrent-uti",
    name: "Recurrent UTI",
    category: "General & Chronic",
    summary:
      "Aims to reduce recurrence frequency by treating the underlying susceptibility pattern, not just acute episodes.",
    icon: Droplet,
  },
  {
    id: "hypertension-support",
    name: "Hypertension (Adjunct Support)",
    category: "General & Chronic",
    summary:
      "Constitutional support for stress-linked blood pressure patterns, used alongside prescribed antihypertensive care.",
    icon: Heart,
  },
  {
    id: "vertigo",
    name: "Vertigo",
    category: "General & Chronic",
    summary:
      "Remedy selection based on the specific character of dizziness, triggers, and accompanying nausea or hearing symptoms.",
    icon: Stethoscope,
  },
  {
    id: "eye-strain",
    name: "Chronic Eye Strain & Dryness",
    category: "General & Chronic",
    summary:
      "Supportive care for screen-related eye fatigue, dryness, and associated tension headaches.",
    icon: Eye,
  },
];

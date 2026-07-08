// ============================================================================
// src/components/sections/Hero.tsx
// ============================================================================

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock3, PlayCircle, ShieldCheck } from "lucide-react";
import { Button } from "../atoms/Button";
import { doctorConfig } from "../../config/doctorConfig";
import type { DayScheduleEntry } from "../../types/doctor.types";

// ----------------------------------------------------------------------------
// Next-available-slot engine
// Reads the real weekly schedule from doctorConfig (single source of truth)
// and computes the next open booking window in India Standard Time. This is
// the hero's small piece of working software, not decorative copy.
// ----------------------------------------------------------------------------

const DAY_ORDER = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function getIstNow(): Date {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
  }).formatToParts(new Date());

  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return new Date(
    `${lookup.year}-${lookup.month}-${lookup.day}T${lookup.hour}:${lookup.minute}:00+05:30`
  );
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatClockTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelveHour}:${minutes.toString().padStart(2, "0")} ${period}`;
}

interface NextSlot {
  readonly label: string;
  readonly isLive: boolean;
}

function findNextAvailableSlot(schedule: readonly DayScheduleEntry[]): NextSlot {
  const nowIst = getIstNow();
  const nowMinutes = nowIst.getHours() * 60 + nowIst.getMinutes();
  const todayIndex = nowIst.getDay();

  for (let offset = 0; offset < 8; offset += 1) {
    const dayIndex = (todayIndex + offset) % 7;
    const dayName = DAY_ORDER[dayIndex];
    const day = schedule.find((entry) => entry.day === dayName);
    if (!day || !day.isOpen) {
      continue;
    }

    for (const block of day.blocks) {
      const opens = toMinutes(block.opens);
      const closes = toMinutes(block.closes);

      if (offset === 0) {
        if (nowMinutes < opens) {
          return { label: `Today · ${formatClockTime(block.opens)}`, isLive: true };
        }
        if (nowMinutes < closes) {
          return { label: `Open now · till ${formatClockTime(block.closes)}`, isLive: true };
        }
        continue;
      }

      const dayLabel = offset === 1 ? "Tomorrow" : dayName.slice(0, 3);
      return { label: `${dayLabel} · ${formatClockTime(block.opens)}`, isLive: false };
    }
  }

  return { label: "By appointment", isLive: false };
}

function AnimatedCounter({
  targetValue,
  suffix = "",
  durationMs = 1600,
}: {
  readonly targetValue: number;
  readonly suffix?: string;
  readonly durationMs?: number;
}): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState<number>(0);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    const startTimestamp = performance.now();

    const step = (timestamp: number): void => {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * targetValue));

      if (progress < 1) {
        frameIdRef.current = window.requestAnimationFrame(step);
      }
    };

    frameIdRef.current = window.requestAnimationFrame(step);
    return () => {
      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [isInView, targetValue, durationMs]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// ----------------------------------------------------------------------------
// The Potency Dial — the hero's signature graphic.
// Homeopathic remedies are named for their potency (6C, 30C, 200C, 1M), each
// step reached by diluting and vigorously shaking ("succussion") the last.
// The dial renders that real scale as concentric rings, with a marker
// orbiting the case-taking ring — a visual built from the subject itself
// rather than a generic decorative blob.
// ----------------------------------------------------------------------------

function PotencyDial({ reducedMotion }: { readonly reducedMotion: boolean }): JSX.Element {
  const center = 220;
  const rings = [
    { r: 200, label: "1M" },
    { r: 156, label: "200C" },
    { r: 112, label: "30C" },
    { r: 70, label: "6C" },
  ];

  return (
    <svg
      viewBox="0 0 440 440"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a homeopathic potency dial, showing dilution rings labeled 6C, 30C, 200C, and 1M"
    >
      <defs>
        <radialGradient id="dialGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#C9A15A" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C9A15A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dialBottle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DABA6E" />
          <stop offset="100%" stopColor="#976F2F" />
        </linearGradient>
      </defs>

      <circle cx={center} cy={center} r="210" fill="url(#dialGlow)" />

      {/* Rotating dashed rings — static labels sit in a separate, non-rotating layer */}
      <g
        className={reducedMotion ? "" : "motion-safe:animate-spin-slow"}
        style={{ transformOrigin: `${center}px ${center}px` }}
      >
        {rings.map((ring) => (
          <circle
            key={ring.label}
            cx={center}
            cy={center}
            r={ring.r}
            fill="none"
            stroke="#DABA6E"
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="1.5 9"
          />
        ))}
      </g>

      {/* Slow counter-rotating marker orbiting the 30C ring */}
      <g
        className={reducedMotion ? "" : "motion-safe:animate-spin-slower"}
        style={{ transformOrigin: `${center}px ${center}px` }}
      >
        <circle cx={center} cy={center - 112} r="4.5" fill="#F3E6C7" />
        <circle cx={center} cy={center - 112} r="9" fill="none" stroke="#F3E6C7" strokeOpacity="0.5" strokeWidth="1" />
      </g>

      {/* Static ring labels, upright */}
      {rings.map((ring) => (
        <text
          key={`label-${ring.label}`}
          x={center}
          y={center - ring.r - 8}
          textAnchor="middle"
          className="font-mono"
          fontSize="11"
          letterSpacing="0.08em"
          fill="#F3E6C7"
          fillOpacity="0.55"
        >
          {ring.label}
        </text>
      ))}

      {/* Center: remedy bottle glyph */}
      <g className={reducedMotion ? "" : "motion-safe:animate-gentle-float"}>
        <rect x={center - 26} y={center - 8} width="52" height="66" rx="8" fill="url(#dialBottle)" />
        <rect x={center - 14} y={center - 30} width="28" height="24" rx="5" fill="#785624" />
        <rect x={center - 18} y={center - 38} width="36" height="10" rx="5" fill="#573E19" />
        <line x1={center - 14} y1={center + 14} x2={center + 14} y2={center + 14} stroke="#16241D" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
        <line x1={center - 14} y1={center + 26} x2={center + 10} y2={center + 26} stroke="#16241D" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
        <line x1={center - 14} y1={center + 38} x2={center + 14} y2={center + 38} stroke="#16241D" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Hero(): JSX.Element {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [nextSlot] = useState<NextSlot>(() => findNextAvailableSlot(doctorConfig.clinic.schedule));

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent): void => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const handleScrollToForm = (): void => {
    document.querySelector("#consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToProcess = (): void => {
    document.querySelector("#consultation-process")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink-800 pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      {/* Lab-notebook dot grid + soft botanical glow, in ink tones */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(218,186,110,0.14)_1px,transparent_1px)] bg-[length:26px_26px] opacity-60 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black_10%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(58,88,71,0.55),transparent_45%),radial-gradient(circle_at_88%_8%,rgba(201,161,90,0.14),transparent_40%),radial-gradient(circle_at_50%_105%,rgba(58,88,71,0.4),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-5 sm:gap-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 sm:gap-7"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/25 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-200 backdrop-blur-xs sm:px-4 sm:py-2 sm:text-[11px]">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-300" />
            </span>
            Classical Homeopathy · {doctorConfig.clinic.address.city}
          </span>

          <h1 className="font-serif text-display-xs font-medium leading-[1.14] text-ink-50 sm:text-display-md sm:leading-[1.08] lg:text-display-lg">
            Personalized{" "}
            <span className="italic font-normal text-gold-300">Homeopathic Care</span>{" "}
            for Long-Term Wellness
          </h1>

          <p className="max-w-lg font-sans text-base leading-relaxed text-ink-100/80 sm:text-lg">
            {doctorConfig.doctor.bio}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              variant="gold"
              fullWidth
              onClick={handleScrollToForm}
              trailingIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
              className="sm:w-auto"
            >
              Book Your Consultation
            </Button>
            <Button
              size="lg"
              variant="ghost-inverse"
              fullWidth
              onClick={handleScrollToProcess}
              leadingIcon={<PlayCircle className="h-5 w-5" aria-hidden="true" />}
              className="sm:w-auto"
            >
              See How It Works
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-ink-100/70 ring-1 ring-inset ring-white/10">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
              CCH Registered · {doctorConfig.doctor.registrations[0]?.registrationNumber}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ring-1 ring-inset ${
                nextSlot.isLive
                  ? "bg-gold-400/10 text-gold-200 ring-gold-400/25"
                  : "bg-white/[0.05] text-ink-100/70 ring-white/10"
              }`}
            >
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              Next slot: {nextSlot.label}
            </span>
          </div>

          <dl className="mt-2 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:mt-3 sm:gap-6 sm:pt-7">
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-ink-100/60 sm:text-sm">Years in Practice</dt>
              <dd className="text-xl font-semibold text-gold-200 sm:text-3xl">
                <AnimatedCounter targetValue={doctorConfig.doctor.yearsOfExperience} suffix="+" />
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-ink-100/60 sm:text-sm">Consultations</dt>
              <dd className="text-xl font-semibold text-gold-200 sm:text-3xl">
                <AnimatedCounter targetValue={doctorConfig.doctor.totalConsultations} suffix="+" />
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-ink-100/60 sm:text-sm">Success Rate</dt>
              <dd className="text-xl font-semibold text-gold-200 sm:text-3xl">
                <AnimatedCounter targetValue={doctorConfig.doctor.successRatePercentage} suffix="%" />
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-[15rem] xs:max-w-[17rem] sm:max-w-sm lg:max-w-md"
        >
          <PotencyDial reducedMotion={reducedMotion} />
        </motion.div>
      </div>
    </section>
  );
}

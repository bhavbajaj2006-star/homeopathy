// ============================================================================
// src/components/sections/Footer.tsx
// ============================================================================

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router-dom";
import { doctorConfig } from "../../config/doctorConfig";

const SOCIAL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  whatsapp: Phone,
  twitter: Mail,
};

const SITEMAP_COLUMNS: readonly {
  readonly title: string;
  readonly links: readonly { readonly label: string; readonly href: string }[];
}[] = [
  {
    title: "Explore",
    links: [
      { label: "Why Prakriti", href: "#why-choose-us" },
      { label: "About the Doctor", href: "#about-doctor" },
      { label: "Conditions We Treat", href: "#disease-directory" },
      { label: "Our Process", href: "#consultation-process" },
    ],
  },
  {
    title: "Consultations",
    links: [
      { label: "Book an Appointment", href: "#consultation-form" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQs", href: "#faq" },
      { label: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
    ],
  },
];

export function Footer(): JSX.Element {
  const { clinic, doctor } = doctorConfig;
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-primary-950 text-primary-50 dark:bg-black">
      <div className="mx-auto max-w-8xl px-5 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr]">
          <div className="flex flex-col gap-5">
            <span className="font-serif text-2xl font-semibold text-white">
              {clinic.brandName}
            </span>
            <p className="max-w-sm text-sm leading-relaxed text-primary-200">
              {doctor.displayName}, {doctor.credentialsSuffix}. Classical
              homeopathic consultations by video and in-clinic in{" "}
              {clinic.address.city}.
            </p>
            <div className="flex items-center gap-3">
              {doctorConfig.social.map((social) => {
                const SocialIcon = SOCIAL_ICONS[social.platform] ?? Mail;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${clinic.brandName} on ${social.platform}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900 text-primary-100 transition-colors duration-200 hover:bg-primary-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300"
                  >
                    <SocialIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {SITEMAP_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-300">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => {
                  // Hash-only links (e.g. "#why-choose-us") point to sections
                  // that only exist on the homepage, so route through "/"
                  // first. Real routes (e.g. "/privacy-policy") pass through.
                  const resolvedHref = link.href.startsWith("#")
                    ? `/${link.href}`
                    : link.href;

                  return (
                    <li key={link.href}>
                      <Link
                        to={resolvedHref}
                        className="text-sm text-primary-100 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-300">
              Visit or Contact
            </h3>
            <div className="flex items-start gap-3 text-sm text-primary-100">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary-300" aria-hidden="true" />
              <span>
                {clinic.address.line1}, {clinic.address.line2},{" "}
                {clinic.address.city} {clinic.address.pincode}
              </span>
            </div>
            <a
              href={`tel:${clinic.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 text-sm text-primary-100 hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 text-secondary-300" aria-hidden="true" />
              {clinic.contact.primaryPhone}
            </a>
            <a
              href={`mailto:${clinic.contact.email}`}
              className="flex items-center gap-3 text-sm text-primary-100 hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-secondary-300" aria-hidden="true" />
              {clinic.contact.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-primary-800 pt-8 text-xs text-primary-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {clinic.legalName}. All rights reserved.
          </p>
          <p>
            Homeopathic consultations do not replace emergency medical care.
            In a medical emergency, contact your local emergency services
            immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

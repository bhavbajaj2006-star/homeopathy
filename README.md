# Prakriti Homeopathy — Luxury Teleconsultation Frontend

A production-grade, pure-frontend React application for a premium classical
homeopathy teleconsultation practice. Built for **Dr. Ananya Krishnan /
Prakriti Homeopathy** (Bengaluru) as the reference client — swap the
contents of `src/config/doctorConfig.ts` to re-brand for any clinic.

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (functional components, hooks only) |
| Language | TypeScript (strict mode, zero `any`) |
| Build tool | Vite |
| Styling | Tailwind CSS (custom design tokens in `tailwind.config.js`) |
| Motion | Framer Motion |
| Forms | React Hook Form |
| Icons | lucide-react |
| Persistence | Browser LocalStorage (no backend in this build) |

---

## 2. Getting Started

```bash
npm install
npm run dev       # start Vite dev server
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

### Required `package.json` dependencies

This is already included as `package.json` in the project root — just run
`npm install` and `npm run dev`.

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "react-hook-form": "^7.53.0",
    "framer-motion": "^11.11.0",
    "lucide-react": "^0.446.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.45",
    "tailwindcss": "^3.4.11",
    "typescript": "^5.5.4",
    "vite": "^5.4.6"
  }
}
```

---

## 3. Project Structure

```
src/
├── types/            # Strict TypeScript interfaces (doctor, consultation)
├── config/           # doctorConfig.ts — single source of truth, deep-frozen
├── data/             # Static datasets: disease directory, wizard options
├── context/          # ThemeContext (light/dark)
├── layouts/           # MainLayout shell
├── components/
│   ├── atoms/         # Button, Card, SectionHeader, form fields, feedback
│   ├── sections/      # Navbar, Hero, WhyChooseUs, AboutDoctor,
│   │                  # DiseaseDirectory, ConsultationForm,
│   │                  # ConsultationProcess, Testimonials, FAQ, Footer,
│   │                  # NotFound
│   ├── wizard/         # 7-step intake wizard components
│   └── legal/          # Privacy Policy, Terms, Cancellation Policy
```

---

## 4. Single Source of Truth: `doctorConfig.ts`

Every doctor/clinic detail displayed anywhere in the app — name,
registration number, pricing, hours, contact info — is read from
`src/config/doctorConfig.ts`. The object is deep-frozen at runtime, so any
accidental mutation throws immediately in development. **To rebrand this
template for a different clinic, this is the only file that needs a full
rewrite**; every component reads from it rather than hardcoding copy.

---

## 5. Backend Integration Points (Future Work)

This build is intentionally frontend-only, using LocalStorage for the
intake wizard's autosave/draft behavior. To connect a real backend:

| Feature | Current (frontend-only) | Suggested integration |
|---|---|---|
| Consultation submission | `ConsultationForm.tsx` → `onSubmit` simulates latency, clears LocalStorage | `POST /api/consultations` — replace the simulated `setTimeout` with a real fetch/mutation call |
| Document uploads | Simulated client-side progress in `StepDocumentUpload.tsx` | `POST /api/consultations/:id/documents` (multipart) — replace `simulateUploadProgress` with real `XMLHttpRequest`/`fetch` upload progress events |
| Pricing & availability | Static array in `doctorConfig.ts` | `GET /api/pricing`, `GET /api/availability` — fetch and cache with React Query or SWR |
| Disease directory | Static array in `data/diseaseDirectory.ts` | `GET /api/conditions?search=&category=` if the list needs to be CMS-editable |
| Testimonials | Static array in `Testimonials.tsx` | `GET /api/testimonials?verified=true` |
| Auth / patient portal | Not implemented | Recommend a session-cookie or JWT-based auth layer if a return-patient portal is added later |

REST is recommended over GraphQL for this scope unless the client already
runs a GraphQL gateway — the data shapes here are simple and don't benefit
from GraphQL's query flexibility.

---

## 6. Deployment (Vercel)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo in the Vercel dashboard — framework preset **Vite** is
   auto-detected.
3. Build command: `npm run build`. Output directory: `dist`.
4. Add environment variables (once a backend exists) under
   **Project Settings → Environment Variables** — never commit API keys.
5. Enable **Vercel Edge Network** caching for static assets (default) and
   consider Edge Middleware only if you later add geolocation-based
   routing (e.g. different pricing for different states).

---

## 7. Accessibility Notes

- All interactive elements have visible `focus-visible` states.
- Form fields use associated `<label>`s and `aria-describedby` for
  errors/helper text.
- The mobile navigation and modals trap scroll and use
  `role="dialog"` / `aria-modal`.
- Color contrast for text follows WCAG AA against both light and dark
  surface tokens.

---

## 8. Performance & Optimization Guidelines

- Framer Motion animations are `transform`/`opacity` based — avoid
  animating layout-triggering properties (`width`, `height`) outside of
  the intentional cases already in this codebase (e.g. accordion panels).
- Lazy-load below-the-fold sections (`Testimonials`, `FAQ`,
  `ConsultationProcess`) with `React.lazy` + `Suspense` if initial bundle
  size becomes a concern as the app grows.
- Images referenced in `doctorConfig.ts` (e.g. `profileImageUrl`) should
  be served as optimized WebP/AVIF via Vercel's Image Optimization once a
  real image is added.
- Run `npm run build -- --report` (with `rollup-plugin-visualizer`
  installed) periodically to check bundle size as new sections are added.

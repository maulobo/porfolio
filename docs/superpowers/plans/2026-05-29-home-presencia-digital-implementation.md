# Home Presencia Digital Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the home so visitors immediately understand that SC Studio builds complete digital presence for businesses through web, software, content, motion, SEO, and GEO.

**Architecture:** Keep the existing React/Vite home structure and update focused components instead of rebuilding the app. Add one small content module so hero, services, proof, process, CTA, and future chatbot labels share the same language. Preserve the current 3D hero scene and scroll-driven feel, but make the first viewport and service system explicit.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Router, lucide-react, @react-three/fiber.

---

## File Structure

- Create `src/pages/Home/homeContent.ts`
  - Owns homepage copy, service pillars, process steps, proof labels, and chatbot-ready prompts.
- Modify `src/pages/Home/Home.tsx`
  - Adds the selected projects section back into the home flow after the service system.
- Modify `src/pages/Home/components/Hero.tsx`
  - Adds clear offer copy and CTAs over the current 3D scene.
- Modify `src/pages/Home/components/Narrative.tsx`
  - Replaces the current generic phrase with the strategic "piezas sueltas" message.
- Modify `src/pages/Home/components/Services.tsx`
  - Replaces the process-style service list with the four pillars: Web, Software, Content, Growth.
- Modify `src/pages/Home/components/SelectedWorks.tsx`
  - Labels project examples by capability so visitors connect work to what SC Studio does.
- Modify `src/pages/Home/components/ProjectReveal.tsx`
  - Updates scroll words so the reveal reinforces the service system instead of abstract portfolio language.
- Modify `src/pages/Home/components/HomeFooter.tsx`
  - Updates CTA copy and adds chatbot-compatible intent prompts without implementing the chatbot.

## Task 1: Add Shared Home Content

**Files:**
- Create: `src/pages/Home/homeContent.ts`

- [ ] **Step 1: Create the content module**

Use `apply_patch` to add this file:

```ts
export const homeHero = {
  eyebrow: "SC Studio / Creative Tech",
  headline: "Construimos presencia digital completa para negocios que quieren crecer online.",
  description:
    "Diseño, software, contenido y posicionamiento trabajando como una sola experiencia.",
  primaryCta: "Hablemos",
  secondaryCta: "Ver proyectos",
  location: "Desde Argentina",
};

export const homeNarrative =
  "Tu negocio no necesita piezas sueltas. Necesita una experiencia digital que se vea bien, funcione bien y sea fácil de encontrar.";

export const servicePillars = [
  {
    num: "01",
    key: "web",
    title: "Web",
    label: "Websites / Landing pages / Ecommerce",
    desc: "Experiencias rápidas, visuales y pensadas para convertir.",
    prompt: "Necesito una web o landing",
  },
  {
    num: "02",
    key: "software",
    title: "Software",
    label: "Backoffices / Automatizaciones / Plataformas",
    desc: "Herramientas digitales para operar, vender y escalar mejor.",
    prompt: "Necesito software o automatización",
  },
  {
    num: "03",
    key: "content",
    title: "Contenido",
    label: "Video / Motion / Animaciones",
    desc: "Contenido que explica, muestra y hace que la marca se mueva.",
    prompt: "Busco video, motion o contenido",
  },
  {
    num: "04",
    key: "growth",
    title: "Growth",
    label: "SEO / GEO / Descubrimiento por IA",
    desc: "Estructura y contenido para que te encuentren donde importa.",
    prompt: "Quiero mejorar mi posicionamiento",
  },
] as const;

export const revealWords = [
  { text: "WEB", sub: "Landing pages, ecommerce y sitios que convierten" },
  { text: "SOFTWARE", sub: "Herramientas para operar y escalar" },
  { text: "CONTENIDO", sub: "Video, motion y piezas para vender mejor" },
  { text: "GROWTH", sub: "SEO, GEO y estructura para ser encontrado" },
] as const;

export const proofIntro = {
  eyebrow: "Prueba real",
  title: "Proyectos que conectan diseño, tecnología y negocio.",
  description:
    "Cada caso muestra una parte del sistema: ecommerce, visualización 3D, backoffice, websites y experiencias digitales.",
};

export const projectCapabilityById: Record<string, string> = {
  "01": "Ecommerce + plataforma web",
  "02": "Web institucional + branding",
  "03": "Real estate + visualización 3D",
  "04": "Website premium",
  "05": "UX/UI + producto digital",
  "06": "Web + backoffice",
  "07": "UX/UI + diseño web",
  "08": "Backoffice + gestión interna",
};

export const processSteps = [
  {
    title: "Diagnóstico",
    desc: "Entendemos el negocio, el usuario y qué tiene que mejorar primero.",
  },
  {
    title: "Estrategia",
    desc: "Ordenamos prioridades, mensaje, estructura y canales digitales.",
  },
  {
    title: "Producción",
    desc: "Diseñamos, desarrollamos y producimos las piezas necesarias.",
  },
  {
    title: "Lanzamiento",
    desc: "Publicamos, medimos y dejamos la experiencia lista para operar.",
  },
  {
    title: "Optimización",
    desc: "Iteramos contenido, performance y posicionamiento para crecer.",
  },
] as const;

export const finalCta = {
  eyebrow: "Contacto",
  headline: "Hablemos de tu presencia digital.",
  description:
    "Contanos qué querés mejorar y te ayudamos a ordenar el próximo paso.",
  email: "hola@scland.com",
};
```

- [ ] **Step 2: Run build to catch TypeScript errors**

Run:

```bash
npm run build
```

Expected: build completes successfully. The new file is not imported yet, so it should not change runtime behavior.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/pages/Home/homeContent.ts
git commit -m "feat: add home content model"
```

## Task 2: Make The Hero Clear

**Files:**
- Modify: `src/pages/Home/components/Hero.tsx`
- Depends on: `src/pages/Home/homeContent.ts`

- [ ] **Step 1: Replace hero content**

Update `Hero.tsx` to this implementation:

```tsx
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeHero } from "../homeContent";
import Scene from "./Scene";

const Hero = () => {
  return (
    <section className="min-h-screen w-full relative flex items-center overflow-hidden bg-white text-brand-dark">
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/10 via-white/35 to-white/70 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full px-5 pb-28 pt-28 md:px-12 md:pb-16"
      >
        <div className="max-w-6xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.35rem] text-brand-dark/60">
            {homeHero.eyebrow}
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-normal text-brand-dark md:text-7xl lg:text-8xl">
            {homeHero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-dark/70 md:text-2xl">
            {homeHero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:hola@scland.com"
              className="clickable group inline-flex w-fit items-center gap-3 rounded-md bg-brand-dark px-6 py-4 font-mono text-xs uppercase tracking-[0.22rem] text-white transition-colors hover:bg-brand-pink"
            >
              {homeHero.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/work"
              className="clickable inline-flex w-fit items-center gap-3 rounded-md border border-brand-dark/20 bg-white/40 px-6 py-4 font-mono text-xs uppercase tracking-[0.22rem] text-brand-dark backdrop-blur-md transition-colors hover:border-brand-dark/60"
            >
              {homeHero.secondaryCta}
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute bottom-8 left-0 z-10 flex w-full items-end justify-between px-5 font-mono text-xs uppercase tracking-[0.24rem] text-brand-dark/55 md:px-12"
      >
        <span className="inline-flex items-center gap-2">
          <ArrowDown className="h-4 w-4" />
          Desliza
        </span>
        <span>{homeHero.location}</span>
      </motion.div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Run build**

Run:

```bash
npm run build
```

Expected: build passes. The hero should now contain the main offer, two CTAs, and the existing 3D scene.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/pages/Home/components/Hero.tsx
git commit -m "feat: clarify home hero offer"
```

## Task 3: Update Narrative And Reveal Language

**Files:**
- Modify: `src/pages/Home/components/Narrative.tsx`
- Modify: `src/pages/Home/components/ProjectReveal.tsx`
- Depends on: `src/pages/Home/homeContent.ts`

- [ ] **Step 1: Update `Narrative.tsx` imports and paragraph source**

Replace the local `paragraph` constant with the shared content:

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { homeNarrative } from "../homeContent";

const Word = ({ children, range, progress }: any) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative mr-3 mt-3 inline-block">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};
```

Then change:

```ts
const words = paragraph.split(" ");
```

to:

```ts
const words = homeNarrative.split(" ");
```

- [ ] **Step 2: Update `ProjectReveal.tsx` word source**

Remove the local `words` array and import shared reveal copy:

```tsx
import { revealWords } from "../homeContent";
```

Change the map from:

```tsx
{words.map((word, i) => (
```

to:

```tsx
{revealWords.map((word, i) => (
```

Change the total prop from:

```tsx
total={words.length}
```

to:

```tsx
total={revealWords.length}
```

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: build passes. The long scroll sections should now reinforce the four-pillar offer.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/pages/Home/components/Narrative.tsx src/pages/Home/components/ProjectReveal.tsx
git commit -m "feat: align home narrative with services"
```

## Task 4: Replace Services With Four Pillars And Process

**Files:**
- Modify: `src/pages/Home/components/Services.tsx`
- Depends on: `src/pages/Home/homeContent.ts`

- [ ] **Step 1: Replace `Services.tsx`**

Update the component to:

```tsx
import { servicePillars, processSteps } from "../homeContent";

const Services = () => {
  return (
    <section className="relative z-10 w-full bg-brand-dark py-24 text-brand-light md:py-32">
      <div className="px-5 md:px-12">
        <div className="mb-16 max-w-4xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35rem] text-brand-pink">
            Sistema digital
          </p>
          <h2 className="text-4xl font-light leading-tight md:text-6xl">
            Todo lo que tu negocio necesita para verse, funcionar y crecer online.
          </h2>
        </div>
      </div>

      <div className="w-full border-y border-brand-light/10">
        {servicePillars.map((item) => (
          <article
            key={item.key}
            className="group border-b border-brand-light/10 px-5 py-10 transition-colors duration-500 last:border-b-0 hover:bg-brand-light/[0.04] md:px-12 md:py-14"
          >
            <div className="grid gap-6 md:grid-cols-[0.4fr_1.3fr_1fr] md:items-start">
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm tracking-widest text-brand-pink">
                  {item.num}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.22rem] text-brand-light/35">
                  {item.label}
                </span>
              </div>
              <h3 className="text-5xl font-light leading-none transition-transform duration-500 group-hover:translate-x-2 md:text-7xl">
                {item.title}
              </h3>
              <div>
                <p className="max-w-md text-lg leading-relaxed text-brand-light/65 transition-colors duration-500 group-hover:text-brand-light">
                  {item.desc}
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.22rem] text-brand-light/35">
                  {item.prompt}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-24 px-5 md:px-12">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.35rem] text-brand-pink">
          Proceso
        </p>
        <div className="grid gap-4 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-md border border-brand-light/10 bg-brand-light/[0.03] p-5"
            >
              <span className="font-mono text-xs text-brand-pink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-5 text-xl font-medium text-brand-light">
                {step.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-brand-light/55">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
```

- [ ] **Step 2: Run build**

Run:

```bash
npm run build
```

Expected: build passes. The page should now explain Web, Software, Contenido, and Growth as the main service system.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/pages/Home/components/Services.tsx
git commit -m "feat: show home service pillars"
```

## Task 5: Add Project Proof Back Into The Home

**Files:**
- Modify: `src/pages/Home/Home.tsx`
- Modify: `src/pages/Home/components/SelectedWorks.tsx`
- Depends on: `src/pages/Home/homeContent.ts`

- [ ] **Step 1: Add selected works to home flow**

Update `Home.tsx`:

```tsx
import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import Hero from "./components/Hero";
import HomeFooter from "./components/HomeFooter";
import Narrative from "./components/Narrative";
import ProjectReveal from "./components/ProjectReveal";
import SelectedWorks from "./components/SelectedWorks";
import Services from "./components/Services";

const Home = () => {
  return (
    <TransitionAnimate>
      <main className="bg-brand-dark min-h-screen">
        <Hero />
        <Narrative />
        <ProjectReveal />
        <Services />
        <SelectedWorks />
        <HomeFooter />
      </main>
    </TransitionAnimate>
  );
};

export default Home;
```

- [ ] **Step 2: Update `SelectedWorks.tsx` intro and capability labels**

Import proof content:

```tsx
import { projectCapabilityById, proofIntro } from "../homeContent";
```

Change the project category paragraph inside `ProjectCard` from:

```tsx
<p className="text-brand-light/50 text-sm md:text-base mt-2">
  {project.category.join(" / ")}
</p>
```

to:

```tsx
<p className="mt-2 text-sm text-brand-pink md:text-base">
  {projectCapabilityById[project.id] ?? project.category.join(" / ")}
</p>
<p className="mt-2 text-sm text-brand-light/45">
  {project.category.join(" / ")}
</p>
```

Replace the selected works section heading block:

```tsx
<div className="px-12 mb-8 md:mb-12 relative z-10">
  <div className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
    <h2 className="text-sm font-mono tracking-widest uppercase text-brand-pink">
      Proyectos Destacados
    </h2>
  </div>
</div>
```

with:

```tsx
<div className="relative z-10 mb-8 px-5 md:mb-12 md:px-12">
  <p className="mb-4 font-mono text-xs uppercase tracking-[0.35rem] text-brand-pink">
    {proofIntro.eyebrow}
  </p>
  <h2 className="max-w-4xl text-4xl font-light leading-tight text-brand-light md:text-6xl">
    {proofIntro.title}
  </h2>
  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-light/55">
    {proofIntro.description}
  </p>
</div>
```

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: build passes. Projects should appear before the footer and explain what capabilities each one proves.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/pages/Home/Home.tsx src/pages/Home/components/SelectedWorks.tsx
git commit -m "feat: add project proof to home"
```

## Task 6: Update Final CTA For Contact And Chatbot Readiness

**Files:**
- Modify: `src/pages/Home/components/HomeFooter.tsx`
- Depends on: `src/pages/Home/homeContent.ts`

- [ ] **Step 1: Import CTA and service prompts**

Add:

```tsx
import { finalCta, servicePillars } from "../homeContent";
```

- [ ] **Step 2: Replace static CTA text**

Change the mail link from:

```tsx
href="mailto:hola@scland.com"
```

to:

```tsx
href={`mailto:${finalCta.email}`}
```

Replace the large "HABLE / MOS" heading with:

```tsx
<div className="mx-auto max-w-6xl text-center">
  <p className="mb-5 font-mono text-xs uppercase tracking-[0.35rem] text-brand-pink">
    {finalCta.eyebrow}
  </p>
  <h2 className="text-5xl font-bold uppercase leading-[0.9] tracking-normal text-white transition-all duration-500 md:text-[9vw]">
    {finalCta.headline}
  </h2>
  <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">
    {finalCta.description}
  </p>
</div>
```

- [ ] **Step 3: Add chatbot-ready prompt chips below the CTA**

Inside the footer, after the CTA motion block and before `<FooterCustom typeFooter={FooterType.FOTERHOME}/>` add:

```tsx
<div className="relative z-10 mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-3">
  {servicePillars.map((pillar) => (
    <span
      key={pillar.key}
      className="rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18rem] text-white/55"
    >
      {pillar.prompt}
    </span>
  ))}
</div>
```

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: build passes. Footer should still provide direct email contact and show future chatbot conversation starters as static chips.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/pages/Home/components/HomeFooter.tsx
git commit -m "feat: update home contact CTA"
```

## Task 7: Final Verification

**Files:**
- Verify only; no planned code edits.

- [ ] **Step 1: Run lint**

Run:

```bash
npm run lint
```

Expected: command completes without errors. If lint reports an existing unrelated warning, record it in the final notes and only fix issues caused by this home work.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: Vite build completes successfully.

- [ ] **Step 3: Start local dev server**

Run:

```bash
npm run dev
```

Expected: Vite starts and prints a local URL, normally `http://localhost:5173/`.

- [ ] **Step 4: Browser QA desktop**

Open `http://localhost:5173/` in the in-app browser.

Verify:

- The first viewport visibly says "Construimos presencia digital completa".
- The supporting line mentions "Diseño, software, contenido y posicionamiento".
- "Hablemos" and "Ver proyectos" are visible and clickable.
- The 3D scene renders behind the text.
- The service section shows Web, Software, Contenido, and Growth.
- The project section appears before the footer.

- [ ] **Step 5: Browser QA mobile**

In the in-app browser, inspect a mobile viewport around 390px wide.

Verify:

- Hero text fits without overlapping CTAs.
- CTA buttons wrap cleanly.
- Service rows are readable.
- Horizontal project cards remain usable.
- Footer chips wrap without overflowing.

- [ ] **Step 6: Commit any verification fixes**

If QA required changes, run:

```bash
git add src/pages/Home/Home.tsx src/pages/Home/components/Hero.tsx src/pages/Home/components/Narrative.tsx src/pages/Home/components/ProjectReveal.tsx src/pages/Home/components/Services.tsx src/pages/Home/components/SelectedWorks.tsx src/pages/Home/components/HomeFooter.tsx src/pages/Home/homeContent.ts
git commit -m "fix: polish home responsive layout"
```

Expected: only commit if actual code changes were made.

## Self-Review Notes

- Spec coverage: Hero clarity, narrative clarity, four-pillar service system, project proof, process, final CTA, visual direction, and future chatbot readiness are each covered by tasks.
- Placeholder scan: No deferred implementation markers or vague instructions are included.
- Type consistency: Shared content exports are imported by name and use stable `key`, `num`, `title`, `label`, `desc`, and `prompt` properties across tasks.

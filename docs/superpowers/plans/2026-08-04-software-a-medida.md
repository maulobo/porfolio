# Software a Medida Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible Services navigation menu and a complete `/servicios/software` commercial page that presents custom software through approved copy, real interface evidence, and a clear path to the existing CRM demo.

**Architecture:** Keep the public site shell and CRM demo boundary already established in `App.tsx`. Extract navigation data and menu behavior into focused navbar modules, keep software-page copy in a typed content module, and compose the page from small semantic section components under `src/pages/Software`. Use Framer Motion only for the approved hero choreography and short section reveals, with a reduced-motion fallback.

**Tech Stack:** React 19, TypeScript 5.9, React Router 8, Framer Motion 12, Tailwind CSS 4, Lucide React, Vitest, React Testing Library, jsdom, Vite 7.

## Global Constraints

- The approved design authority is `docs/superpowers/specs/2026-08-04-software-a-medida-design.md`.
- The public route is exactly `/servicios/software`; the demo route remains `/software/panel-crm/*` and remains outside the public site chrome.
- Treat `public/software/1.png`, `2.png`, and `3.png` as a software example, never as an official ITM case or as evidence of unconfirmed results.
- Preserve the current brand tokens: `#111111`, `#f3f0e8`, `#ffffff`, `#ff2bf9`, and `#d7ff4f`.
- Preserve professional Rioplatense voseo and the approved copy; do not add agency clichés, invented services, timelines, prices, metrics, or business outcomes.
- The page must work without horizontal overflow at 320 px and must respect `prefers-reduced-motion: reduce`.
- All interactive controls must expose visible focus, accurate accessible names, keyboard operation, and correct expanded/collapsed state.
- Write a failing behavioral test and verify its expected failure before every production-code behavior change.

---

## File Structure

### Create

- `src/test/setup.ts` — shared jsdom and jest-dom setup.
- `vitest.config.ts` — test runner configuration.
- `src/components/common/navbar/navigation.ts` — public navigation and Services destinations.
- `src/components/common/navbar/ServicesMenu.tsx` — accessible desktop Services dropdown.
- `src/components/common/navbar/MobileNavigation.tsx` — accessible mobile panel and Services accordion.
- `src/components/common/navbar/Navbar.test.tsx` — desktop/mobile menu behavior and routing tests.
- `src/components/common/scrollToTop/ScrollToTop.test.tsx` — Home hash destination behavior.
- `src/pages/Software/softwareContent.ts` — typed approved copy and structured page data.
- `src/pages/Software/Software.tsx` — page composition, metadata, and public footer.
- `src/pages/Software/Software.test.tsx` — page semantics, copy, images, demo link, metadata, and FAQ behavior.
- `src/pages/Software/components/SoftwareHero.tsx` — hero copy, CTAs, and stacked screenshots.
- `src/pages/Software/components/SoftwareInfoSection.tsx` — reusable label/title/body/chip section.
- `src/pages/Software/components/SoftwareShowcase.tsx` — three-image example gallery and demo CTA.
- `src/pages/Software/components/SoftwareProcess.tsx` — six-step process.
- `src/pages/Software/components/SoftwareFaq.tsx` — accessible FAQ accordion.
- `src/pages/Software/components/SoftwareClosing.tsx` — final contact CTA.
- `src/pages/Software/components/index.ts` — local component exports.
- `src/pages/Software/software.css` — signature screen stack, connector, reduced motion, and overflow safeguards.
- `src/App.test.tsx` — public software route and CRM route-boundary tests.

### Modify

- `package.json` and `package-lock.json` — add the test toolchain and `test` script.
- `src/components/common/navbar/Navbar.tsx` — integrate extracted menus and keep the navbar visible while open.
- `src/pages/Home/components/homeSections/CapabilitiesSection.tsx` — add stable service anchors.
- `src/pages/Home/components/homeSections/EntryPointsSection.tsx` — route software entry to the new page and other entries to Home anchors.
- `src/components/common/scrollToTop/ScrollToTop.tsx` — scroll to a named Home service after route navigation.
- `src/App.tsx` — register the public software route and export `AnimatedRoutes` for route-level testing.
- `src/components/common/transitionAnimate/TransitionAnimate.tsx` — label the new route as `Software`.
- `public/sitemap.xml` — add the canonical software URL.

---

### Task 1: Establish the React test harness

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

**Interfaces:**
- Produces: `npm test -- --run` as the repository-wide non-watch test command.
- Produces: jsdom matchers such as `toBeInTheDocument()` and automatic test cleanup.

- [ ] **Step 1: Install the exact test dependencies**

Run:

```bash
npm install --save-dev vitest@^3.2.4 jsdom@^26.1.0 @testing-library/react@^16.3.0 @testing-library/user-event@^14.6.1 @testing-library/jest-dom@^6.6.3
```

Expected: `package.json` and `package-lock.json` contain the five packages and npm exits with code 0.

- [ ] **Step 2: Add the test script**

Add to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "test": "vitest"
}
```

- [ ] **Step 3: Add Vitest configuration**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

- [ ] **Step 4: Run the empty suite**

Run: `npm test -- --run --passWithNoTests`
Expected: PASS with zero test files and no configuration errors.

- [ ] **Step 5: Commit the harness**

```bash
git add package.json package-lock.json vitest.config.ts src/test/setup.ts
git commit -m "test: add React test harness"
```

---

### Task 2: Build the accessible Services navigation

**Files:**
- Create: `src/components/common/navbar/navigation.ts`
- Create: `src/components/common/navbar/ServicesMenu.tsx`
- Create: `src/components/common/navbar/MobileNavigation.tsx`
- Create: `src/components/common/navbar/Navbar.test.tsx`
- Create: `src/components/common/scrollToTop/ScrollToTop.test.tsx`
- Modify: `src/components/common/navbar/Navbar.tsx`
- Modify: `src/components/common/scrollToTop/ScrollToTop.tsx`
- Modify: `src/pages/Home/components/homeSections/CapabilitiesSection.tsx`
- Modify: `src/pages/Home/components/homeSections/EntryPointsSection.tsx`

**Interfaces:**
- Produces: `serviceLinks: readonly ServiceLink[]` where `ServiceLink` is `{ name: string; path: string; description: string }`.
- Produces: `ServicesMenu({ pathname, onOpenChange })` and `MobileNavigation({ pathname, onOpenChange })`.
- Consumes: React Router `Link` and `useLocation()`.

- [ ] **Step 1: Write failing desktop-menu tests**

Create `src/components/common/navbar/Navbar.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";

const renderNavbar = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>,
  );

describe("Navbar services menu", () => {
  it("opens Services, exposes four destinations, closes outside, and closes with Escape", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const trigger = screen.getByRole("button", { name: /servicios/i });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /software a medida/i })).toHaveAttribute(
      "href",
      "/servicios/software",
    );
    expect(screen.getAllByRole("link")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textContent: expect.stringMatching(/sitios web/i) }),
        expect.objectContaining({ textContent: expect.stringMatching(/visibilidad/i) }),
        expect.objectContaining({ textContent: expect.stringMatching(/video y motion/i) }),
      ]),
    );

    await user.click(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("marks Services active on the software route", () => {
    renderNavbar("/servicios/software");
    expect(screen.getByRole("button", { name: /servicios/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
```

- [ ] **Step 2: Run the navbar test and verify RED**

Run: `npm test -- --run src/components/common/navbar/Navbar.test.tsx`
Expected: FAIL because no Services button or software destination exists.

- [ ] **Step 3: Add navigation data**

Create `navigation.ts`:

```ts
export type ServiceLink = {
  name: string;
  path: string;
  description: string;
};

export const serviceLinks: readonly ServiceLink[] = [
  {
    name: "Sitios web y landings",
    path: "/#servicios-web",
    description: "Sitios con identidad, estructura y ejecución cuidada.",
  },
  {
    name: "Software a medida",
    path: "/servicios/software",
    description: "Plataformas, paneles, integraciones y automatizaciones.",
  },
  {
    name: "Visibilidad en buscadores e IA",
    path: "/#servicios-visibilidad",
    description: "SEO técnico, contenidos y respuestas generativas.",
  },
  {
    name: "Video y motion",
    path: "/#servicios-audiovisual",
    description: "Piezas para explicar productos, servicios e ideas.",
  },
] as const;

export const primaryLinks = [
  { name: "Inicio", path: "/" },
  { name: "Proyectos", path: "/work" },
  { name: "Studio", path: "/studio" },
] as const;
```

- [ ] **Step 4: Implement the minimal desktop menu**

In `ServicesMenu.tsx`, implement a controlled disclosure with `useState`, a trigger button, a menu region, a document `pointerdown` listener for outside clicks, and an `Escape` key handler that closes and focuses the trigger. Map `serviceLinks` to React Router `Link` elements. Give the active software link `aria-current="page"`.

In `Navbar.tsx`, render `Inicio`, `ServicesMenu`, `Proyectos`, and `Studio`; pass `menuOpen` into the existing hidden-state expression:

```tsx
animate={hidden && !menuOpen ? "hidden" : "visible"}
```

The Services trigger must use:

```tsx
aria-expanded={open}
aria-controls="services-menu"
aria-current={pathname.startsWith("/servicios/") ? "page" : undefined}
```

- [ ] **Step 5: Run the desktop test and verify GREEN**

Run: `npm test -- --run src/components/common/navbar/Navbar.test.tsx`
Expected: PASS for open, destinations, active state, Escape, and focus restoration.

- [ ] **Step 6: Write failing mobile-menu tests**

Append to `Navbar.test.tsx`:

```tsx
it("opens the mobile navigation, expands Services, and restores body scroll", async () => {
  const user = userEvent.setup();
  renderNavbar();
  const menuButton = screen.getByRole("button", { name: /abrir menú/i });

  await user.click(menuButton);
  expect(document.body).toHaveStyle({ overflow: "hidden" });
  await user.click(screen.getByRole("button", { name: /^servicios$/i }));
  expect(screen.getByRole("link", { name: /software a medida/i })).toBeVisible();

  await user.click(screen.getByRole("button", { name: /cerrar menú/i }));
  expect(document.body.style.overflow).toBe("");
});
```

- [ ] **Step 7: Run the mobile test and verify RED**

Run: `npm test -- --run src/components/common/navbar/Navbar.test.tsx`
Expected: FAIL because the mobile menu controls do not exist.

- [ ] **Step 8: Write the failing Home hash-navigation test**

Create `src/components/common/scrollToTop/ScrollToTop.test.tsx`:

```tsx
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  it("scrolls a Home service anchor into view after navigation", async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as unknown as typeof window.matchMedia;
    const target = document.createElement("section");
    target.id = "servicios-web";
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    render(
      <MemoryRouter initialEntries={["/#servicios-web"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(target.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      }),
    );
    target.remove();
  });
});
```

- [ ] **Step 9: Run the hash-navigation test and verify RED**

Run: `npm test -- --run src/components/common/scrollToTop/ScrollToTop.test.tsx`
Expected: FAIL because the current component ignores `location.hash` and scrolls to the top.

- [ ] **Step 10: Implement mobile navigation and Home destinations**

Create `MobileNavigation.tsx` with:

- a button named `Abrir menú` / `Cerrar menú`;
- a full-width mobile panel hidden at `md` and above;
- a Services disclosure with accurate `aria-expanded`;
- the four `serviceLinks`;
- cleanup that restores the previous `document.body.style.overflow`;
- an `Escape` handler and focus restoration to the menu trigger;
- focus cycling between the first and last focusable elements on `Tab` and `Shift+Tab`.

In `CapabilitiesSection.tsx`, add the exact IDs to the matching capability articles:

```ts
"Sitios web y landings" -> "servicios-web"
"Software a medida" -> "servicios-software"
"Visibilidad en buscadores e IA" -> "servicios-visibilidad"
"Video, motion y piezas digitales" -> "servicios-audiovisual"
```

In `EntryPointsSection.tsx`, replace the email-only card destination with a `path` per card and set Software to `/servicios/software`; use the same Home anchors for the other three cards.

In `ScrollToTop.tsx`, read both `pathname` and `hash`. When `hash` is present, schedule one animation frame, find `document.getElementById(hash.slice(1))`, and call:

```ts
target.scrollIntoView({
  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth",
  block: "start",
});
```

When no hash is present, retain the existing immediate top reset and Lenis reset. Cancel the animation frame and timeout during cleanup.

- [ ] **Step 11: Run navigation tests and full regression suite**

Run:

```bash
npm test -- --run src/components/common/navbar/Navbar.test.tsx
npm test -- --run src/components/common/scrollToTop/ScrollToTop.test.tsx
npm test -- --run
```

Expected: all tests PASS with no state-update warnings.

- [ ] **Step 12: Commit navigation**

```bash
git add src/components/common/navbar src/components/common/scrollToTop src/pages/Home/components/homeSections/CapabilitiesSection.tsx src/pages/Home/components/homeSections/EntryPointsSection.tsx
git commit -m "feat: add accessible services navigation"
```

---

### Task 3: Create the approved software content model and page semantics

**Files:**
- Create: `src/pages/Software/softwareContent.ts`
- Create: `src/pages/Software/Software.tsx`
- Create: `src/pages/Software/Software.test.tsx`
- Create: `src/pages/Software/components/SoftwareInfoSection.tsx`
- Create: `src/pages/Software/components/SoftwareProcess.tsx`
- Create: `src/pages/Software/components/SoftwareClosing.tsx`
- Create: `src/pages/Software/components/index.ts`

**Interfaces:**
- Produces: `softwareContent` with `useCases`, `capabilities`, `layers`, `process`, and `faq` readonly collections.
- Produces: default component `Software` suitable for an `AnimatedRoutes` route element.
- Consumes: `FooterCustom` with `FooterType.FOOTERWORK` and `TransitionAnimate`.

- [ ] **Step 1: Write the failing page-semantics test**

Create `Software.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import Software from "./Software";

vi.mock("../../components/common/transitionAnimate/TransitionAnimate", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("../../components/common/footerCustom/FooterCustom", () => ({
  FooterType: { FOOTERWORK: "FOOTERWORK" },
  default: () => <footer>SmartCloud Studio</footer>,
}));

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/servicios/software"]}>
      <Software />
    </MemoryRouter>,
  );

describe("Software page", () => {
  it("presents the approved positioning and complete service structure", () => {
    renderPage();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "La operación necesita su propio sistema.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /cuando las herramientas existentes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /un sistema definido alrededor del problema/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /decisiones claras en cada etapa/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /la interfaz es solo una parte/i })).toBeInTheDocument();
    expect(screen.getByText("Paneles de gestión")).toBeInTheDocument();
    expect(screen.getByText("Publicación")).toBeInTheDocument();
  });

  it("sets descriptive page metadata", () => {
    renderPage();
    expect(document.title).toBe("Software a medida | SmartCloud Studio");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      expect.stringContaining("plataformas, paneles, automatizaciones e integraciones"),
    );
  });
});
```

- [ ] **Step 2: Run the page test and verify RED**

Run: `npm test -- --run src/pages/Software/Software.test.tsx`
Expected: FAIL because `Software.tsx` does not exist.

- [ ] **Step 3: Add the typed content model**

Create `softwareContent.ts` using these exact values:

```ts
export const softwareContent = {
  useCases: [
    "Información fragmentada",
    "Tareas repetitivas",
    "Poca trazabilidad",
    "Procesos propios",
  ],
  capabilities: [
    "Paneles de gestión",
    "Plataformas internas",
    "Dashboards",
    "Integraciones",
    "Automatizaciones",
    "Aplicaciones web",
  ],
  layers: ["UX/UI", "Backend", "Datos", "Integraciones", "Infraestructura", "Continuidad"],
  process: [
    { name: "Diagnóstico", detail: "Objetivos, usuarios, procesos y restricciones." },
    { name: "Definición", detail: "Alcance, arquitectura, experiencia y plan." },
    { name: "Producción", detail: "Diseño, desarrollo e integraciones." },
    { name: "Pruebas", detail: "Flujos, estados y escenarios de uso." },
    { name: "Publicación", detail: "Puesta en marcha y acompañamiento." },
    { name: "Evolución", detail: "Documentación y mejoras siguientes." },
  ],
  faq: [
    {
      question: "¿Qué tipo de software desarrollan?",
      answer: "Paneles de gestión, plataformas internas, aplicaciones web, automatizaciones e integraciones definidas según el proceso que se necesita resolver.",
    },
    {
      question: "¿Cómo se define el alcance?",
      answer: "Primero relevamos objetivos, usuarios, información disponible, restricciones y prioridades. Con ese contexto proponemos una primera versión, entregables y etapas.",
    },
    {
      question: "¿Pueden integrarse con sistemas existentes?",
      answer: "Sí, cuando los sistemas ofrecen mecanismos de integración compatibles. La viabilidad se evalúa durante el diagnóstico técnico.",
    },
    {
      question: "¿Qué ocurre después de publicar?",
      answer: "Documentamos lo construido, acompañamos la puesta en marcha y definimos con el cliente las mejoras o el soporte siguiente.",
    },
  ],
} as const;
```

- [ ] **Step 4: Implement semantic information, process, and closing components**

`SoftwareInfoSection` accepts:

```ts
type SoftwareInfoSectionProps = {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly string[];
  dark?: boolean;
};
```

Render a semantic `section`, an `h2`, one paragraph, and a list of items. `SoftwareProcess` maps all six process entries to an ordered list. `SoftwareClosing` renders:

```tsx
<h2>Conversemos sobre el sistema que necesitás construir.</h2>
<p>
  No necesitás llegar con todo definido. Empezamos por entender el contexto,
  ordenar prioridades y proponer un punto de partida.
</p>
<a href="https://wa.me/5492995831639" target="_blank" rel="noopener noreferrer">
  Contanos tu proyecto
</a>
```

- [ ] **Step 5: Compose the initial page and metadata**

`Software.tsx` must:

- set and restore `document.title` and the description meta tag in `useEffect`;
- wrap content in `TransitionAnimate`;
- render a temporary semantic hero containing the approved H1 and body;
- render the Use Cases, Capabilities, Process, Layers, Closing, and `FooterCustom` sections;
- import `software.css`, which will be completed in Task 5.

- [ ] **Step 6: Run page tests and verify GREEN**

Run: `npm test -- --run src/pages/Software/Software.test.tsx`
Expected: PASS for page headings, content model, and metadata.

- [ ] **Step 7: Commit the page semantics**

```bash
git add src/pages/Software
git commit -m "feat: add software service content"
```

---

### Task 4: Add hero evidence, software showcase, and accessible FAQ

**Files:**
- Create: `src/pages/Software/components/SoftwareHero.tsx`
- Create: `src/pages/Software/components/SoftwareShowcase.tsx`
- Create: `src/pages/Software/components/SoftwareFaq.tsx`
- Modify: `src/pages/Software/components/index.ts`
- Modify: `src/pages/Software/Software.tsx`
- Modify: `src/pages/Software/Software.test.tsx`

**Interfaces:**
- Produces: `SoftwareHero`, `SoftwareShowcase`, and `SoftwareFaq` with no external state.
- Consumes: `softwareContent.faq` and the three `/software/*.png` public assets.

- [ ] **Step 1: Write failing evidence and FAQ tests**

Append to `Software.test.tsx`:

```tsx
import userEvent from "@testing-library/user-event";

it("labels all screenshots as a software example and opens the demo separately", () => {
  renderPage();
  expect(screen.getByRole("img", { name: "Resumen operativo" })).toHaveAttribute(
    "src",
    "/software/1.png",
  );
  expect(screen.getByRole("img", { name: "Seguimiento comercial" })).toHaveAttribute(
    "src",
    "/software/2.png",
  );
  expect(screen.getByRole("img", { name: "Gestión de equipos" })).toHaveAttribute(
    "src",
    "/software/3.png",
  );
  expect(screen.getByText("Ejemplo de software")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Abrir demostración" })).toMatchObject({
    target: "_blank",
    rel: expect.stringContaining("noopener"),
  });
});

it("opens one FAQ answer and reports its expanded state", async () => {
  const user = userEvent.setup();
  renderPage();
  const question = screen.getByRole("button", {
    name: "¿Cómo se define el alcance?",
  });
  expect(question).toHaveAttribute("aria-expanded", "false");
  await user.click(question);
  expect(question).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText(/primero relevamos objetivos/i)).toBeVisible();
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- --run src/pages/Software/Software.test.tsx`
Expected: FAIL because screenshots, demo action, and FAQ controls are absent.

- [ ] **Step 3: Implement the approved hero**

Create `SoftwareHero.tsx` with:

- eyebrow `Software a medida · Diseño con identidad`;
- H1 `La operación necesita su propio sistema.`;
- approved body copy;
- primary WhatsApp CTA `Iniciar un proyecto`;
- secondary demo CTA `Ver demostración` pointing to `/software/panel-crm`, `_blank`, and `noopener noreferrer`;
- two decorative-but-informative hero images using `1.png` and `2.png` with explicit `width`, `height`, and `fetchPriority="high"`;
- Framer Motion variants grouped under one `motion.section`, using `useReducedMotion()` to remove movement.

- [ ] **Step 4: Implement the complete software showcase**

Create `SoftwareShowcase.tsx` with the approved label, heading, body, all three figures, captions, explicit image dimensions, and `loading="lazy"`. Add `Abrir demostración` with the same safe target and relation as the hero CTA.

- [ ] **Step 5: Implement the accessible FAQ**

Create `SoftwareFaq.tsx` with one `openIndex: number | null` state. Each question is a button with:

```tsx
aria-expanded={openIndex === index}
aria-controls={`software-faq-panel-${index}`}
id={`software-faq-trigger-${index}`}
```

Each answer uses:

```tsx
id={`software-faq-panel-${index}`}
role="region"
aria-labelledby={`software-faq-trigger-${index}`}
hidden={openIndex !== index}
```

Clicking the open item again closes it. Do not animate height when reduced motion is requested.

- [ ] **Step 6: Replace temporary page elements with final components**

Update `Software.tsx` in this order:

1. `SoftwareHero`
2. Use Cases
3. Capabilities
4. `SoftwareShowcase`
5. `SoftwareProcess`
6. Layers
7. `SoftwareFaq`
8. `SoftwareClosing`
9. `FooterCustom`

- [ ] **Step 7: Run page tests and full suite**

Run:

```bash
npm test -- --run src/pages/Software/Software.test.tsx
npm test -- --run
```

Expected: all tests PASS; no act warnings or duplicate accessible names.

- [ ] **Step 8: Commit evidence and interactions**

```bash
git add src/pages/Software
git add public/software/1.png public/software/2.png public/software/3.png
git commit -m "feat: add software showcase and faq"
```

---

### Task 5: Register routes, metadata surfaces, and public indexing

**Files:**
- Create: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/common/transitionAnimate/TransitionAnimate.tsx`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Produces: exported `AnimatedRoutes` for MemoryRouter tests.
- Consumes: default export `Software` from `src/pages/Software/Software.tsx`.

- [ ] **Step 1: Write failing route tests**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { AnimatedRoutes } from "./App";

vi.mock("./components/common/transitionAnimate/TransitionAnimate", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("public routes", () => {
  it("renders the software service page at its public route", () => {
    render(
      <MemoryRouter initialEntries={["/servicios/software"]}>
        <AnimatedRoutes />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "La operación necesita su propio sistema.",
      }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the route test and verify RED**

Run: `npm test -- --run src/App.test.tsx`
Expected: FAIL because `AnimatedRoutes` is not exported and the software route is missing.

- [ ] **Step 3: Register and label the public route**

In `App.tsx`:

```tsx
import Software from "./pages/Software/Software";

export function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/work" element={<Work />} />
        <Route path="/servicios/software" element={<Software />} />
      </Routes>
    </AnimatePresence>
  );
}
```

Add inside public animated routes:

```tsx
<Route path="/servicios/software" element={<Software />} />
```

Do not move `/software/panel-crm/*`; it stays in the outer `Routes` before the catch-all SiteLayout.

In `TransitionAnimate.tsx`, add:

```ts
"/servicios/software": "Software",
```

- [ ] **Step 4: Update the sitemap**

Add before `</urlset>`:

```xml
  <url>
    <loc>https://www.scstudio.com/servicios/software</loc>
    <lastmod>2026-08-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
```

- [ ] **Step 5: Run route and regression tests**

Run:

```bash
npm test -- --run src/App.test.tsx
npm test -- --run
```

Expected: all tests PASS and the CRM route boundary remains unchanged in `App.tsx`.

- [ ] **Step 6: Commit routes and sitemap**

```bash
git add src/App.tsx src/App.test.tsx src/components/common/transitionAnimate/TransitionAnimate.tsx public/sitemap.xml
git commit -m "feat: route software service page"
```

---

### Task 6: Apply the approved visual system and verify the complete experience

**Files:**
- Create: `src/pages/Software/software.css`
- Modify: `src/pages/Software/components/SoftwareHero.tsx` — responsive hero geometry and motion classes.
- Modify: `src/pages/Software/components/SoftwareInfoSection.tsx` — desktop split grid and mobile stack classes.
- Modify: `src/pages/Software/components/SoftwareShowcase.tsx` — responsive three-card gallery classes.
- Modify: `src/pages/Software/components/SoftwareProcess.tsx` — responsive six-step grid classes.
- Modify: `src/pages/Software/components/SoftwareFaq.tsx` — focus, expanded, and reduced-motion classes.
- Modify: `src/pages/Software/components/SoftwareClosing.tsx` — responsive CTA layout classes.
- Modify: `src/components/common/navbar/Navbar.tsx`
- Modify: `src/components/common/navbar/ServicesMenu.tsx`
- Modify: `src/components/common/navbar/MobileNavigation.tsx`

**Interfaces:**
- Consumes: the final semantic components from Tasks 2–5.
- Produces: the approved neobrutalist layout, signature screen stack, connector, focus states, and responsive behavior.

- [ ] **Step 1: Implement the visual tokens and signature element**

In `software.css`, define page-scoped custom properties and classes:

```css
.software-page {
  --software-ink: #111111;
  --software-paper: #f3f0e8;
  --software-white: #ffffff;
  --software-pink: #ff2bf9;
  --software-lime: #d7ff4f;
  overflow: clip;
  background: var(--software-paper);
  color: var(--software-ink);
}

.software-screen-stack {
  position: relative;
  isolation: isolate;
  min-height: clamp(15rem, 37vw, 34rem);
}

.software-screen-stack__image {
  position: absolute;
  width: min(76vw, 62rem);
  border: 2px solid var(--software-ink);
  box-shadow: 10px 10px 0 var(--software-pink);
}

.software-system-trace {
  width: 2px;
  background: var(--software-pink);
}

@media (prefers-reduced-motion: reduce) {
  .software-page *,
  .software-page *::before,
  .software-page *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Add media queries that:

- prevent any image edge from exceeding the viewport at 320 px;
- reduce the two-image overlap on screens below 640 px;
- stack split sections and gallery cards vertically;
- keep touch targets at least 44 px high;
- show the desktop menu only from `md` upward and mobile navigation below `md`.

- [ ] **Step 2: Apply the approved Tailwind layout**

Use the approved palette, 2 px black borders, displaced shadows, concise mono labels, and large Inter headlines. Preserve one bold composition in the hero; keep later blocks restrained. Use `min-h-screen` only on the hero, not every section.

The desktop information sections use `lg:grid-cols-[0.34fr_0.66fr]`; the showcase uses `lg:grid-cols-3`; the process uses `md:grid-cols-2 xl:grid-cols-3`. Mobile is a single column.

- [ ] **Step 3: Run automated verification**

Run:

```bash
npm test -- --run
npm run build
npm run lint
```

Expected:

- all tests PASS;
- production build exits 0;
- lint introduces no new errors. If existing unrelated lint errors remain, record their exact files and confirm none are in files changed by this plan.

- [ ] **Step 4: Run the site and inspect desktop**

Run: `npm run dev -- --host 127.0.0.1`
Open `/servicios/software` at 1440 × 900 and verify:

- hero title and both CTAs appear before the fold;
- screenshots overlap without obscuring the headline;
- Services dropdown stays above page content and closes with Escape/outside click;
- all three gallery screenshots remain sharp and legible;
- no section repeats the same visual emphasis;
- the demo opens at `/software/panel-crm` without public navbar, cursor, chatbot, or footer.

- [ ] **Step 5: Inspect mobile and keyboard behavior**

At 390 × 844 and 320 × 568, verify:

- no horizontal overflow;
- mobile menu and Services accordion are fully visible;
- body scroll locks only while the menu is open;
- Tab order follows visual order and focus is always visible;
- FAQ buttons expose their state and answers;
- CTAs have comfortable touch targets;
- screenshots preserve useful content instead of becoming illegible thumbnails.

Enable reduced motion and confirm the hero appears fully composed without entrance movement.

- [ ] **Step 6: Re-run final checks after visual fixes**

Run:

```bash
npm test -- --run
npm run build
npm run lint
git diff --check
git status --short
```

Expected: tests and build PASS, no whitespace errors, and only intended source files plus the user-provided source documents/images remain untracked or modified.

- [ ] **Step 7: Commit final visuals**

```bash
git add src/pages/Software src/components/common/navbar
git commit -m "feat: finish software service experience"
```

# Software SaaS Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose `/servicios/software` as a product-led SaaS page with one complete hero screenshot, two complete feature screenshots, and no eyebrows.

**Architecture:** Keep the existing route, metadata, navbar, footer, FAQ state, and content-data separation. Simplify the current hero and information components, turn `SoftwareShowcase` into two alternating product stories, and rewrite the page-specific CSS around intrinsic image ratios instead of fixed-height crops.

**Tech Stack:** React 19, TypeScript, Vite 7, Vitest, Testing Library, Framer Motion, CSS, existing Tailwind utility classes.

## Global Constraints

- Do not change `/servicios/software`, `/software/panel-crm`, the Services navbar, or the WhatsApp contact target.
- Do not use eyebrows in the hero, information sections, showcase, process, FAQ, layers, or closing section.
- Show `public/software/1.png`, `2.png`, and `3.png` at their complete intrinsic aspect ratios.
- Do not use `object-fit: cover`, fixed image heights, `object-position`, screenshot overlap, or screenshot rotation.
- Keep the existing SmartCloud palette: `#111111`, `#f3f0e8`, `#ffffff`, `#ff2bf9`, and `#d7ff4f`.
- Reserve hard shadows for the main product stage and calls to action.
- Keep the six process stages as a real ordered sequence.
- Preserve keyboard focus, accessible FAQ state, safe external links, and reduced-motion behavior.
- Do not attribute the demo interface or results to ITM or another client.

## File Structure

- `src/pages/Software/Software.tsx`: page composition and stable metadata lifecycle.
- `src/pages/Software/softwareContent.ts`: page copy, lists, process data, FAQ data, and the two product-story records.
- `src/pages/Software/components/SoftwareHero.tsx`: hero copy, actions, and the sole eager-loaded screenshot.
- `src/pages/Software/components/SoftwareInfoSection.tsx`: eyebrow-free informational section.
- `src/pages/Software/components/SoftwareShowcase.tsx`: two alternating product stories and the single demo action.
- `src/pages/Software/components/SoftwareProcess.tsx`: eyebrow-free ordered process.
- `src/pages/Software/components/SoftwareFaq.tsx`: existing accessible accordion with one title.
- `src/pages/Software/software.css`: complete page layout, responsive image treatment, focus, and reduced motion.
- `src/pages/Software/Software.test.tsx`: semantic, asset, link, content, and interaction contracts.

---

### Task 1: Lock and implement the product-led semantic contract

**Files:**
- Modify: `src/pages/Software/Software.test.tsx`

**Interfaces:**
- Consumes: existing `Software` default export and the current `/servicios/software` render helper.
- Produces: failing tests that define the one-plus-two screenshot structure and forbid eyebrows.

- [ ] **Step 1: Replace the old screenshot-gallery assertions with the new contract**

Update the existing screenshot test so it requires one hero image and two story images:

```tsx
it("presents three complete product screens as one hero and two stories", () => {
  renderPage();

  const hero = screen
    .getByRole("heading", { level: 1, name: "La operación necesita su propio sistema." })
    .closest("section");

  expect(hero).not.toBeNull();
  const heroScreens = within(hero as HTMLElement).getAllByRole("img");
  expect(heroScreens).toHaveLength(1);
  expect(heroScreens[0]).toHaveAttribute("src", "/software/1.png");
  expect(heroScreens[0]).toHaveAttribute("width", "2996");
  expect(heroScreens[0]).toHaveAttribute("height", "1540");
  expect(heroScreens[0]).toHaveAttribute("fetchpriority", "high");

  const productScreens = screen.getAllByRole("img").filter((image) =>
    image.getAttribute("src")?.startsWith("/software/"),
  );
  expect(productScreens.map((image) => image.getAttribute("src"))).toEqual([
    "/software/1.png",
    "/software/2.png",
    "/software/3.png",
  ]);
  expect(productScreens.every((image) => image.getAttribute("alt")?.trim())).toBe(true);
});
```

- [ ] **Step 2: Add a test that forbids decorative labels**

```tsx
it("uses titles and spacing instead of eyebrows", () => {
  const { container } = renderPage();

  expect(container.querySelector(".software-label")).toBeNull();
  expect(container.querySelector(".software-hero__eyebrow")).toBeNull();
  expect(screen.queryByText("Software a medida · Diseño con identidad")).toBeNull();
  expect(screen.queryByText("Cuándo puede ser útil")).toBeNull();
  expect(screen.queryByText("Qué construimos")).toBeNull();
  expect(screen.queryByText("Cómo trabajamos")).toBeNull();
  expect(screen.queryByText("Lo visible y lo técnico")).toBeNull();
  expect(screen.getAllByText("Preguntas frecuentes")).toHaveLength(1);
});
```

- [ ] **Step 3: Add a test for the two product-story sections and single demo action**

```tsx
it("connects each secondary screen to a concrete product capability", () => {
  renderPage();

  const commercialStory = screen
    .getByRole("heading", { name: "Seguimiento que reúne la información importante." })
    .closest("article");
  const operationsStory = screen
    .getByRole("heading", { name: "La operación visible en un mismo lugar." })
    .closest("article");

  expect(commercialStory).not.toBeNull();
  expect(within(commercialStory as HTMLElement).getByRole("img")).toHaveAttribute(
    "src",
    "/software/2.png",
  );
  expect(operationsStory).not.toBeNull();
  expect(within(operationsStory as HTMLElement).getByRole("img")).toHaveAttribute(
    "src",
    "/software/3.png",
  );

  const demoLinks = screen.getAllByRole("link", { name: /demostración/i });
  expect(demoLinks).toHaveLength(2);
  expect(demoLinks.every((link) => link.getAttribute("href") === "/software/panel-crm")).toBe(true);
});
```

The two links are the hero action “Ver demostración” and the single showcase action “Abrir demostración”.

- [ ] **Step 4: Update the expected heading sequence**

Keep all existing headings, but replace the old single showcase sequence with:

```tsx
{ level: "H2", text: "Una interfaz para ver, decidir y actuar." },
{ level: "H3", text: "Seguimiento que reúne la información importante." },
{ level: "H3", text: "La operación visible en un mismo lugar." },
```

- [ ] **Step 5: Run the focused tests and confirm the red state**

Run: `npm test -- src/pages/Software/Software.test.tsx --run`

Expected: FAIL because the hero still has two images, labels still render, and the product-story headings do not exist.

- [ ] **Step 6: Keep the verified red state and continue directly to implementation**

Do not commit while the focused test is red. Continue with the component work below so the task completes a full RED → GREEN cycle.

#### React recomposition

**Files:**
- Modify: `src/pages/Software/softwareContent.ts`
- Modify: `src/pages/Software/Software.tsx`
- Modify: `src/pages/Software/components/SoftwareHero.tsx`
- Modify: `src/pages/Software/components/SoftwareInfoSection.tsx`
- Modify: `src/pages/Software/components/SoftwareShowcase.tsx`
- Modify: `src/pages/Software/components/SoftwareProcess.tsx`
- Modify: `src/pages/Software/components/SoftwareFaq.tsx`
- Test: `src/pages/Software/Software.test.tsx`

**Interfaces:**
- Consumes: the test contract from Task 1 and the existing `softwareContent` / `softwarePageCopy` exports.
- Produces: `softwareContent.productStories`, eyebrow-free component props, one hero screenshot, and two accessible product-story articles.

- [ ] **Step 1: Remove eyebrow fields and add typed product-story content**

Change `softwarePageCopy.hero`, `useCases`, `capabilities`, `process`, and `layers` so they contain only the properties each component renders. Add this immutable data under `softwareContent`:

```tsx
productStories: [
  {
    title: "Seguimiento que reúne la información importante.",
    body: "Una vista comercial puede ordenar oportunidades, responsables y próximos pasos sin repartir el contexto entre distintas herramientas.",
    image: {
      src: "/software/2.png",
      alt: "Vista de seguimiento comercial con oportunidades, responsables y estados",
      width: 2998,
      height: 1548,
    },
  },
  {
    title: "La operación visible en un mismo lugar.",
    body: "Equipos, disponibilidad y estados de trabajo pueden convivir en una interfaz diseñada alrededor de la forma real de operar.",
    image: {
      src: "/software/3.png",
      alt: "Vista de gestión operativa con equipos, disponibilidad y estados de trabajo",
      width: 3006,
      height: 1390,
    },
  },
],
```

- [ ] **Step 2: Simplify `SoftwareInfoSection` and `SoftwareProcess` props**

Use these interfaces and remove every label paragraph:

```tsx
type SoftwareInfoSectionProps = {
  title: string;
  body: string;
  items: readonly string[];
  dark?: boolean;
};

type SoftwareProcessProps = {
  title: string;
  body: string;
  steps: readonly { name: string; detail: string }[];
};
```

The rendered section begins with its `h2`. Keep the list semantics and `dark` modifier.

- [ ] **Step 3: Replace the hero stack with one product stage**

Delete the eyebrow, second screenshot, stack classes, and system trace. Render this image after the content block:

```tsx
<motion.div className="software-product-stage" variants={variants} transition={transition}>
  <img
    className="software-product-stage__image"
    src="/software/1.png"
    alt="Panel operativo con indicadores, actividad reciente y accesos de gestión"
    width={2996}
    height={1540}
    fetchPriority="high"
  />
</motion.div>
```

Keep both existing hero actions and their safe-link attributes.

- [ ] **Step 4: Turn `SoftwareShowcase` into a product narrative**

Replace the three-column gallery with this structure:

```tsx
const SoftwareShowcase = () => (
  <section className="software-showcase">
    <div className="software-showcase__intro">
      <h2>Una interfaz para ver, decidir y actuar.</h2>
      <p className="software-section-copy">
        Mostramos una plataforma operativa de demostración. Cada pantalla responde a una tarea y mantiene la información necesaria dentro del mismo sistema.
      </p>
    </div>

    <div className="software-showcase__stories">
      {softwareContent.productStories.map((story, index) => (
        <article
          className={`software-product-story${index % 2 ? " software-product-story--reverse" : ""}`}
          key={story.image.src}
        >
          <div className="software-product-story__copy">
            <h3>{story.title}</h3>
            <p>{story.body}</p>
          </div>
          <figure className="software-product-story__media">
            <img {...story.image} loading="lazy" />
          </figure>
        </article>
      ))}
    </div>

    <a className="software-showcase__demo-link" href="/software/panel-crm" target="_blank" rel="noopener noreferrer">
      Abrir demostración
    </a>
  </section>
);
```

- [ ] **Step 5: Remove the duplicate FAQ label**

In `SoftwareFaq.tsx`, delete the `.software-label` paragraph and leave exactly one `h2` with “Preguntas frecuentes”. Preserve all button IDs, `aria-expanded`, `aria-controls`, panel roles, and one-open-at-a-time state.

- [ ] **Step 6: Update `Software.tsx` calls for the narrower props**

Keep the existing section order. Spread the eyebrow-free copy objects into `SoftwareInfoSection` and `SoftwareProcess` exactly as before; TypeScript should reject any stale `eyebrow` dependency.

- [ ] **Step 7: Run focused tests and confirm green**

Run: `npm test -- src/pages/Software/Software.test.tsx --run`

Expected: all Software page tests PASS, including screenshot order, no-eyebrow contract, heading hierarchy, FAQ interaction, metadata restoration, links, and process semantics.

- [ ] **Step 8: Commit the semantic recomposition**

```bash
git add src/pages/Software/Software.test.tsx src/pages/Software/Software.tsx src/pages/Software/softwareContent.ts src/pages/Software/components/SoftwareHero.tsx src/pages/Software/components/SoftwareInfoSection.tsx src/pages/Software/components/SoftwareShowcase.tsx src/pages/Software/components/SoftwareProcess.tsx src/pages/Software/components/SoftwareFaq.tsx
git commit -m "feat: recompose software page around product screens"
```

---

### Task 2: Build the SaaS layout in SmartCloud’s visual language

**Files:**
- Modify: `src/pages/Software/software.css`
- Test: `src/pages/Software/Software.test.tsx`

**Interfaces:**
- Consumes: the class names emitted by Task 2.
- Produces: intrinsic-ratio product stages, alternating desktop stories, stacked mobile stories, lighter lists, and an eyebrow-free responsive layout.

- [ ] **Step 1: Delete obsolete visual rules**

Remove selectors for:

```css
.software-label
.software-hero__eyebrow
.software-screen-stack
.software-screen-stack__image
.software-screen-stack__image--primary
.software-screen-stack__image--secondary
.software-system-trace
.software-showcase__gallery
.software-showcase__figure
```

Also remove every `object-fit: cover`, `object-position`, and fixed `height` applied to product screenshots.

- [ ] **Step 2: Rebuild the hero as message plus full-width stage**

Use a single-column hero with a maximum content width and a wider stage:

```css
.software-hero {
  display: grid;
  min-height: 100svh;
  align-content: center;
  gap: clamp(3rem, 6vw, 5.5rem);
  padding: clamp(8rem, 10vw, 10rem) clamp(1.25rem, 5vw, 5rem) clamp(4rem, 7vw, 7rem);
  border-bottom: 2px solid var(--software-ink);
  background: var(--software-paper);
}

.software-hero__content,
.software-product-stage {
  width: min(100%, 90rem);
  margin-inline: auto;
}

.software-hero__content {
  max-width: 72rem;
  margin-left: max(0px, calc((100% - 90rem) / 2));
}

.software-product-stage {
  position: relative;
  border: 2px solid var(--software-ink);
  background: #e7ebf0;
  box-shadow: 12px 12px 0 var(--software-pink), 22px 22px 0 var(--software-lime);
}

.software-product-stage__image {
  display: block;
  width: 100%;
  height: auto;
}
```

Keep the title left-aligned and constrain it to a readable line length. Do not center all copy or add a gradient.

- [ ] **Step 3: Make information lists lighter**

Keep `.software-chip-list` as a semantic list but remove card-like borders and pseudo-element squares. Use two columns on desktop, one column on narrow mobile, with typographic separators:

```css
.software-chip-list li {
  min-height: 0;
  border: 0;
  border-top: 1px solid currentColor;
  padding: 1rem 0;
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  font-weight: 600;
}

.software-chip-list li::before {
  content: none;
}
```

- [ ] **Step 4: Style the alternating product stories**

```css
.software-showcase__stories {
  display: grid;
  gap: clamp(4.5rem, 9vw, 9rem);
  margin-top: clamp(4rem, 7vw, 7rem);
}

.software-product-story {
  display: grid;
  grid-template-columns: minmax(15rem, 0.35fr) minmax(0, 0.65fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 6rem);
}

.software-product-story--reverse .software-product-story__copy {
  grid-column: 2;
}

.software-product-story--reverse .software-product-story__media {
  grid-column: 1;
  grid-row: 1;
}

.software-product-story__media {
  overflow: hidden;
  margin: 0;
  border: 2px solid var(--software-ink);
  background: #e7ebf0;
}

.software-product-story__media img {
  display: block;
  width: 100%;
  height: auto;
}
```

Use one restrained lime or pink plane behind each story media; do not add shadows to the text containers.

- [ ] **Step 5: Convert the process cards into a real sequence**

Remove boxed-card styling from the six `li` elements. Retain the counter, use top dividers, and lay out three columns on wide desktop, two on tablet, one on mobile. The numeric marker remains because order is meaningful.

- [ ] **Step 6: Add responsive rules without cropping**

At `max-width: 959px`, stack `.software-product-story` into one column and reset every explicit grid row/column. At `max-width: 639px`, reduce stage shadows and page padding while keeping every screenshot at `width: 100%; height: auto`. Ensure CTA buttons remain at least `3.25rem` high.

- [ ] **Step 7: Preserve focus and reduced motion**

Keep the existing `:focus-visible` outline. In the reduced-motion media query, retain zero-duration transitions and ensure no hover transform is necessary to expose content.

- [ ] **Step 8: Run the focused tests and lint**

Run: `npm test -- src/pages/Software/Software.test.tsx --run`

Expected: PASS.

Run: `npm run lint`

Expected: exit code 0 with no new warnings from the modified files.

- [ ] **Step 9: Commit the visual system**

```bash
git add src/pages/Software/software.css
git commit -m "style: present software screens without cropping"
```

---

### Task 3: Browser QA and final verification

**Files:**
- Modify if required by observed defects: `src/pages/Software/software.css`
- Modify if required by observed semantic defects: `src/pages/Software/components/*.tsx`
- Test if required by a regression: `src/pages/Software/Software.test.tsx`

**Interfaces:**
- Consumes: the completed product-led page from Tasks 1–2.
- Produces: verified desktop/mobile layouts and a clean repository test/build result.

- [ ] **Step 1: Start the worktree development server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a reachable local URL for this worktree.

- [ ] **Step 2: Verify desktop at 1440 × 900**

Open `/servicios/software` and confirm:

- no eyebrow text appears;
- `1.png` is the sole hero screenshot and is fully visible;
- `2.png` and `3.png` are fully visible in separate alternating blocks;
- no screenshot text or navigation is clipped;
- the page reads as SmartCloud because the paper/ink/pink/lime system remains;
- only product stages and CTA controls use hard shadows;
- the navbar dropdown still reaches Software a medida.

- [ ] **Step 3: Verify tablet and mobile**

Check 768 × 1024 and 390 × 844. Confirm stories stack with copy before media, screenshots remain complete, no horizontal page overflow appears, buttons remain easy to tap, headings do not collide, and FAQ panels open without layout breakage.

- [ ] **Step 4: Verify keyboard and reduced motion**

Tab through navbar, hero actions, demo action, FAQ buttons, closing CTA, and footer links. Confirm visible focus. Test `prefers-reduced-motion: reduce`; hero and content must render immediately in their final positions.

- [ ] **Step 5: Fix only defects observed in Steps 2–4**

For each defect, add a regression assertion when the behavior is representable in Testing Library, run it red, apply the smallest CSS/JSX correction, and rerun it green. Do not add unrelated redesign work.

- [ ] **Step 6: Run the complete verification suite**

Run: `npm test -- --run`

Expected: all tests PASS.

Run: `npm run lint`

Expected: exit code 0.

Run: `npm run build`

Expected: exit code 0. Existing Browserslist-age or bundle-size notices may remain, but no new error may be introduced.

- [ ] **Step 7: Commit browser-QA corrections if any**

```bash
git add src/pages/Software src/pages/Software/Software.test.tsx
git commit -m "fix: polish responsive software showcase"
```

Skip this commit when browser QA required no file changes.

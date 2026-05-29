# Home — Secciones de Prueba Social — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar tres secciones nuevas al home (TrustBar, TechStack, Testimonials) con estética neobrutalist sin cards, reordenando el home según el diseño aprobado.

**Architecture:** Tres componentes independientes en `src/pages/Home/components/`. Los datos viven en `homeContent.ts`. `Home.tsx` solo importa y reordena. Sin cambios a las secciones existentes.

**Tech Stack:** React 19, TypeScript, Tailwind v4, framer-motion (ya instalado), simple-icons (nuevo)

---

## File Map

| Acción | Archivo | Responsabilidad |
|--------|---------|-----------------|
| Modify | `src/index.css` | Agregar `@keyframes` para marquee |
| Modify | `src/pages/Home/homeContent.ts` | Agregar exports: `clients`, `testimonials`, `techStack` |
| Create | `src/pages/Home/components/TrustBar.tsx` | Banda de logos de clientes con marquee |
| Create | `src/pages/Home/components/TechStack.tsx` | Dos filas de marquee con íconos de herramientas |
| Create | `src/pages/Home/components/Testimonials.tsx` | Filas full-width con quotes alternadas |
| Modify | `src/pages/Home/Home.tsx` | Importar y reordenar secciones |

---

## Task 1: Instalar simple-icons + agregar keyframes CSS + datos en homeContent.ts

**Files:**
- Run: `npm install simple-icons`
- Modify: `src/index.css`
- Modify: `src/pages/Home/homeContent.ts`

- [ ] **Step 1: Instalar simple-icons**

```bash
npm install simple-icons
```

Verificar que aparece en `package.json` bajo `dependencies`.

- [ ] **Step 2: Agregar keyframes en index.css**

Agregar al final de `src/index.css`:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
```

- [ ] **Step 3: Agregar datos en homeContent.ts**

Agregar al final de `src/pages/Home/homeContent.ts`:

```typescript
export const clients = [
  { name: "SSI", logo: "/images/clients/ssi.png" },
  { name: "Servicios Confluencia", logo: "/images/clients/confluencia.png" },
  { name: "TGB", logo: "/images/clients/tgb.png" },
  { name: "ITM", logo: "/images/clients/itm.png" },
  { name: "Rolcka", logo: "/images/clients/rolcka.png" },
  { name: "Juárez Beltrán", logo: "/images/clients/juarez-beltran.png" },
  { name: "Helpwin", logo: "/images/clients/helpwin.png" },
  { name: "Aflora", logo: "/images/clients/aflora.png" },
  { name: "Minimal", logo: "/images/clients/minimal.png" },
  { name: "Telefé", logo: "/images/clients/telefe.png" },
  { name: "YPF", logo: "/images/clients/ypf.png" },
] as const;

export const testimonials = [
  {
    quote: "Entregaron en tiempo, el resultado superó lo que esperábamos.",
    name: "Ana Gómez",
    company: "SSI",
    role: "Directora",
  },
  {
    quote: "Por fin alguien que entiende el negocio antes de ponerse a diseñar.",
    name: "Martín Torres",
    company: "Aflora",
    role: "Fundador",
  },
  {
    quote: "La web nueva duplicó las consultas en el primer mes.",
    name: "Lucía Fernández",
    company: "Helpwin",
    role: "Marketing",
  },
  {
    quote: "Trabajar con SmartCloud fue directo, sin burocracia y con resultados.",
    name: "Carlos Ruiz",
    company: "TGB",
    role: "CEO",
  },
] as const;

export const techStackRow1 = [
  { name: "Blender", slug: "blender" },
  { name: "React", slug: "react" },
  { name: "Supabase", slug: "supabase" },
  { name: "n8n", slug: "n8n" },
  { name: "Adobe", slug: "adobe" },
  { name: "Figma", slug: "figma" },
] as const;

export const techStackRow2 = [
  { name: "Vercel", slug: "vercel" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "Trello", slug: "trello" },
  { name: "Asana", slug: "asana" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "JavaScript", slug: "javascript" },
] as const;
```

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/pages/Home/homeContent.ts package.json package-lock.json
git commit -m "feat: add marquee keyframes and social proof data"
```

---

## Task 2: Crear TrustBar.tsx

**Files:**
- Create: `src/pages/Home/components/TrustBar.tsx`

El componente muestra logos de clientes en un marquee continuo. Si el logo no carga (archivo no disponible aún), muestra el nombre como texto.

- [ ] **Step 1: Crear TrustBar.tsx**

Crear `src/pages/Home/components/TrustBar.tsx`:

```tsx
import { useState } from "react";
import { clients } from "../homeContent";

type Client = { name: string; logo: string };

const TrustItem = ({ name, logo }: Client) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="group flex shrink-0 items-center px-6">
      {!imgFailed ? (
        <img
          src={logo}
          alt={name}
          onError={() => setImgFailed(true)}
          className="h-5 max-w-[80px] object-contain opacity-40 transition-opacity duration-300 group-hover:opacity-90"
          style={{ filter: "grayscale(1) brightness(10)" }}
        />
      ) : (
        <span className="font-mono text-[11px] uppercase tracking-[0.18rem] text-white/40 transition-colors duration-300 group-hover:text-white/80">
          {name}
        </span>
      )}
    </div>
  );
};

const TrustBar = () => {
  const items = [...clients, ...clients] as Client[];

  return (
    <section className="overflow-hidden border-b border-white/10 bg-[#111111] py-4">
      <div className="flex items-center">
        <div className="shrink-0 border-r border-white/10 px-5 md:px-12">
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22rem] text-white/35 pr-6">
            Confían en nosotros
          </span>
        </div>

        <div className="flex-1 overflow-hidden">
          <div
            className="flex w-max"
            style={{ animation: "marquee 40s linear infinite" }}
          >
            {items.map((client, i) => (
              <TrustItem key={i} name={client.name} logo={client.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
```

- [ ] **Step 2: Verificar en el browser**

Arrancar el dev server (`npm run dev`) y confirmar:
- La banda aparece con los nombres de empresas en mono uppercase
- El texto scrollea de derecha a izquierda de forma continua
- Al hacer hover sobre un nombre, se aclara

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/components/TrustBar.tsx
git commit -m "feat: add TrustBar marquee component"
```

---

## Task 3: Crear TechStack.tsx

**Files:**
- Create: `src/pages/Home/components/TechStack.tsx`

Dos filas de marquee en direcciones opuestas con íconos SVG de simple-icons.

- [ ] **Step 1: Crear TechStack.tsx**

Crear `src/pages/Home/components/TechStack.tsx`:

```tsx
import * as simpleIcons from "simple-icons";
import { techStackRow1, techStackRow2 } from "../homeContent";

type Tool = { name: string; slug: string };

const getIcon = (slug: string) => {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons;
  return simpleIcons[key] as { path: string; title: string } | undefined;
};

const ToolItem = ({ name, slug }: Tool) => {
  const icon = getIcon(slug);

  return (
    <div className="group flex shrink-0 items-center gap-2 px-5">
      {icon && (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 fill-current opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      )}
      <span className="font-mono text-[11px] uppercase tracking-[0.18rem] opacity-60 transition-opacity duration-300 group-hover:opacity-100">
        {name}
      </span>
      <span className="ml-3 font-mono text-[11px] text-black/25">×</span>
    </div>
  );
};

const MarqueeRow = ({
  items,
  direction,
  duration,
}: {
  items: readonly Tool[];
  direction: "forward" | "reverse";
  duration: number;
}) => {
  const doubled = [...items, ...items];
  const animName = direction === "forward" ? "marquee" : "marquee-reverse";

  return (
    <div className="overflow-hidden border-b border-black/10 py-3 last:border-b-0">
      <div
        className="flex w-max"
        style={{ animation: `${animName} ${duration}s linear infinite` }}
      >
        {doubled.map((tool, i) => (
          <ToolItem key={i} name={tool.name} slug={tool.slug} />
        ))}
      </div>
    </div>
  );
};

const TechStack = () => {
  return (
    <section className="border-y-2 border-black bg-white py-8 text-black">
      <div className="mb-6 px-5 md:px-12">
        <h2 className="text-xl font-black uppercase tracking-[0.12rem]">
          Herramientas que usamos
        </h2>
      </div>

      <MarqueeRow items={techStackRow1} direction="forward" duration={50} />
      <MarqueeRow items={techStackRow2} direction="reverse" duration={50} />
    </section>
  );
};

export default TechStack;
```

- [ ] **Step 2: Verificar íconos en el browser**

Confirmar:
- Las dos filas se mueven en direcciones opuestas
- Los íconos SVG se renderizan correctamente
- Si un slug no matchea (ej. `n8n`), solo muestra el texto sin SVG — esto es el comportamiento esperado del fallback

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/components/TechStack.tsx
git commit -m "feat: add TechStack dual marquee component"
```

---

## Task 4: Crear Testimonials.tsx

**Files:**
- Create: `src/pages/Home/components/Testimonials.tsx`

Filas full-width apiladas con fondos alternados. Sin cards, separadas por `border-b-2 border-black`. Número índice como decoración de fondo.

- [ ] **Step 1: Crear Testimonials.tsx**

Crear `src/pages/Home/components/Testimonials.tsx`:

```tsx
import { motion } from "framer-motion";
import { testimonials } from "../homeContent";

const rowStyles = [
  { bg: "bg-[#f3f0e8]", text: "text-black", muted: "text-black/50", border: "border-black" },
  { bg: "bg-[#111111]", text: "text-white", muted: "text-white/45", border: "border-white/20" },
  { bg: "bg-[#d7ff4f]", text: "text-black", muted: "text-black/50", border: "border-black" },
  { bg: "bg-white", text: "text-black", muted: "text-black/50", border: "border-black" },
];

const Testimonials = () => {
  return (
    <section className="border-y-2 border-black">
      <div className="border-b-2 border-black bg-[#f3f0e8] px-5 pb-8 pt-14 md:px-12">
        <h2 className="text-4xl font-black uppercase tracking-[0.08rem] md:text-5xl">
          Lo que dicen los clientes
        </h2>
      </div>

      {testimonials.map((t, index) => {
        const style = rowStyles[index % rowStyles.length];

        return (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden border-b-2 ${style.border} ${style.bg} ${style.text} px-5 py-12 md:px-12 md:py-16`}
          >
            <span
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[18vw] font-black leading-none opacity-[0.06]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
              <blockquote>
                <p className="text-3xl font-black leading-tight md:text-5xl lg:text-[3.2rem]">
                  "{t.quote}"
                </p>
              </blockquote>

              <div className="md:text-right">
                <p className="font-semibold">{t.name}</p>
                <p className={`font-mono text-[11px] uppercase tracking-[0.18rem] ${style.muted}`}>
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
};

export default Testimonials;
```

- [ ] **Step 2: Verificar en el browser**

Confirmar:
- Las filas alternan crema / negro / lima / blanco correctamente
- El número de fondo se ve en opacity baja como decoración
- La animación de entrada al hacer scroll funciona (fade + slide up)
- En mobile el layout es columna única, en desktop 2/3 + 1/3

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/components/Testimonials.tsx
git commit -m "feat: add Testimonials stacked rows component"
```

---

## Task 5: Actualizar Home.tsx — nuevo orden

**Files:**
- Modify: `src/pages/Home/Home.tsx`

Importar los tres componentes nuevos y reordenar las secciones según el diseño aprobado.

- [ ] **Step 1: Agregar imports al inicio de Home.tsx**

En `src/pages/Home/Home.tsx`, agregar los tres imports nuevos junto a los existentes:

```tsx
import TrustBar from "./components/TrustBar";
import TechStack from "./components/TechStack";
import Testimonials from "./components/Testimonials";
```

- [ ] **Step 2: Reordenar el JSX en Home.tsx**

El `<main>` debe quedar en este orden:

```tsx
<main className="min-h-screen overflow-hidden bg-[#f3f0e8] text-[#111111]">
  {/* 1. Hero — sin cambios */}
  <section className="relative min-h-screen overflow-hidden bg-[#111111] text-white">
    {/* ...contenido existente sin tocar... */}
  </section>

  {/* 2. TrustBar — nuevo */}
  <TrustBar />

  {/* 3. Capabilities — sin cambios */}
  <section className="bg-[#f3f0e8] px-5 py-24 md:px-12 md:py-32">
    {/* ...contenido existente sin tocar... */}
  </section>

  {/* 4. TechStack — nuevo */}
  <TechStack />

  {/* 5. Workflow — sin cambios */}
  <section className="bg-[#111111] px-5 py-24 text-white md:px-12 md:py-32">
    {/* ...contenido existente sin tocar... */}
  </section>

  {/* 6. Testimonials — nuevo */}
  <Testimonials />

  {/* 7. Entry Cards — sin cambios */}
  <section className="bg-white px-5 py-24 md:px-12 md:py-32">
    {/* ...contenido existente sin tocar... */}
  </section>

  {/* 8. CTA — sin cambios */}
  <section className="bg-[#f3f0e8] px-5 py-20 text-black md:px-12 md:py-28">
    {/* ...contenido existente sin tocar... */}
  </section>
</main>
```

- [ ] **Step 3: Verificar orden completo en el browser**

Scrollear el home completo y confirmar:
1. Hero → TrustBar (negro, seamless) → Capabilities → TechStack (blanco con bordes) → Workflow → Testimonials → Entry Cards → CTA
2. No hay errores de TypeScript (`npm run build` sin errores)
3. Los márgenes y colores de fondo no se rompen entre secciones

- [ ] **Step 4: Build check**

```bash
npm run build
```

Esperado: sin errores. Si hay un error de tipo por `simple-icons`, verificar que el slug de `getIcon()` en TechStack.tsx está capitalizando correctamente (ej. `"nodedotjs"` → clave `siNodedotjs`).

- [ ] **Step 5: Commit final**

```bash
git add src/pages/Home/Home.tsx
git commit -m "feat: integrate TrustBar, TechStack, Testimonials into home"
```

---

## Notas de implementación

**Logos de clientes:** No están disponibles aún. El TrustBar cae back a texto automáticamente vía `onError` de `<img>`. Cuando el usuario provea los PNGs, colocarlos en `/public/images/clients/` con los nombres exactos definidos en `homeContent.ts` y los logos aparecen sin cambiar código.

**simple-icons slugs que pueden fallar:** `n8n` puede no existir como `siN8n` — la función `getIcon` retorna `undefined` sin romper, y el componente muestra solo el texto. Verificar en browser.

**Tailwind v4:** Las animaciones usan `style={{ animation: "..." }}` porque los `@keyframes` están en `index.css` como CSS estándar, no en el theme de Tailwind.

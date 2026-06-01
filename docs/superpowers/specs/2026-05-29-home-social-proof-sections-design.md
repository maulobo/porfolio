# Home — Nuevas secciones de prueba social

**Fecha:** 2026-05-29
**Branch:** codex-home-presencia-digital

## Objetivo

Agregar tres secciones nuevas al home con estética neobrutalist (sin cards). Las secciones refuerzan la prueba social y la credibilidad técnica de SmartCloud.

## Nuevo orden del home

1. Hero (existente)
2. **TrustBar** — empresas que confían ← nuevo
3. Capabilities (existente)
4. **TechStack** — herramientas que usamos ← nuevo
5. Workflow (existente)
6. **Testimonials** — lo que dicen los clientes ← nuevo
7. Entry Cards (existente)
8. CTA (existente)

---

## Sección 1: TrustBar (`TrustBar.tsx`)

**Propósito:** Prueba social inmediata después del hero. Muestra logos de clientes en un marquee continuo.

**Visual:**
- Fondo negro `#111111` — continuidad visual con el hero oscuro
- Banda compacta (no una sección grande), ~80–100px de alto
- Label fijo a la izquierda: "Confían en nosotros" en mono uppercase pequeño, color `white/40`
- Marquee continuo a la derecha con logos de clientes
- Logos: PNGs con `filter: grayscale(1) brightness(10)` para uniformidad blanca sobre negro
- Hover en cada logo: vuelve a color original
- Sin pausa al hacer hover en el marquee
- Velocidad: rápida (30–40s para un loop completo)

**Clientes a mostrar:**
SSI, Servicios Confluencia, TGB, ITM, Rolcka, Juárez Beltrán, Helpwin, Aflora, Minimal, Telefé, YPF

**Archivos de logos:** `/public/images/clients/` (a proveer por el usuario)

**Fallback:** Si un logo no carga, mostrar el nombre en mono uppercase.

---

## Sección 2: TechStack (`TechStack.tsx`)

**Propósito:** Mostrar el stack de herramientas. Refuerza capacidad técnica antes del workflow.

**Visual:**
- Fondo blanco `#ffffff`
- Borde superior e inferior: `border-y-2 border-black`
- Título a la izquierda: "Herramientas que usamos" bold ~2xl
- Dos filas de marquee en direcciones opuestas:
  - Fila 1 → derecha: Blender, React, Supabase, n8n, Adobe, Figma
  - Fila 2 ← izquierda: Vercel, Anthropic, Trello, Asana, Node, JavaScript
- Cada tool: ícono SVG de `simple-icons` + nombre en mono uppercase
- Iconos a 24px, color negro sobre blanco (o con filtro según fondo)
- Claude Code representado por el ícono de Anthropic
- Separador entre tools: `×` en color `black/30`
- Velocidad: más lenta que TrustBar (~60s loop) para que se lean bien

**Dependencia nueva:** `simple-icons` o `@icons-pack/react-simple-icons`

---

## Sección 3: Testimonials (`Testimonials.tsx`)

**Propósito:** Cierre emocional antes del entry. Quotes de clientes en formato editorial bold.

**Visual:**
- Fondo base: crema `#f3f0e8`
- Filas apiladas full-width, sin cards
- Separador entre filas: `border-b-2 border-black`
- Fondos alternados por fila: crema → negro → lima `#d7ff4f` → crema
- Número índice gigante (`01`, `02`...) posicionado absolute, opacity ~10%, como decoración de fondo
- Layout de cada fila: grid `2/3` quote + `1/3` autor (alineado abajo a la derecha)
- Quote: 40–56px, font-black, leading-tight
- Autor: nombre + empresa + rol en mono uppercase pequeño

**Testimonios placeholder (reemplazar con reales):**
```
01 — "Entregaron en tiempo, el resultado superó lo que esperábamos."
     Ana Gómez · Directora · SSI

02 — "Por fin alguien que entiende el negocio antes de ponerse a diseñar."
     Martín Torres · Fundador · Aflora

03 — "La web nueva duplicó las consultas en el primer mes."
     Lucía Fernández · Marketing · Helpwin

04 — "Trabajar con SmartCloud fue directo, sin burocracia y con resultados."
     Carlos Ruiz · CEO · TGB
```

---

## Arquitectura de archivos

```
src/pages/Home/
├── Home.tsx                    ← reordenar secciones, importar nuevas
├── homeContent.ts              ← agregar datos: clients, testimonials, techStack
└── components/
    ├── TrustBar.tsx            ← nuevo
    ├── TechStack.tsx           ← nuevo
    ├── Testimonials.tsx        ← nuevo
    ├── Hero.tsx                (existente, sin cambios)
    ├── ...                     (resto existente, sin cambios)

public/images/clients/          ← logos PNG a proveer (pendiente)
```

## Dependencias

- `simple-icons` o `@icons-pack/react-simple-icons` — para logos de tech stack
- `framer-motion` — ya instalado, para animación de entrada de filas de testimonios

## Datos en homeContent.ts

Agregar tres exports nuevos:
- `clients: { name: string, logo?: string }[]`
- `testimonials: { quote: string, name: string, company: string, role: string }[]`
- `techStack: { name: string, icon: string }[]` — `icon` es el slug de simple-icons

## Notas

- Los logos de clientes (PNGs) los provee el usuario — diseñar el componente para funcionar con o sin ellos (fallback a texto)
- Los testimonios placeholder se reemplazan cuando el usuario provea los reales
- No modificar ninguna sección existente del home

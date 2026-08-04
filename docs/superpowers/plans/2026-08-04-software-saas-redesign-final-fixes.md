# Software SaaS Redesign Final Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cerrar los cuatro hallazgos finales de navegación accesible y desplazamiento entre rutas sin ampliar el rediseño aprobado.

**Architecture:** `ScrollToTop` observará el DOM durante una ventana acotada para resolver hashes cuyo destino aparece después de `AnimatePresence mode="wait"`. Los menús desktop y mobile conservarán su estructura actual y sumarán únicamente los contratos de teclado, breakpoint y Escape requeridos.

**Tech Stack:** React 19, React Router 8, Framer Motion 12, Vitest 3, Testing Library, Tailwind CSS 4.

## Global Constraints

- Trabajar con TDD estricto: prueba enfocada, RED observado, corrección mínima y GREEN observado para cada hallazgo.
- Conservar rutas, copy, demo, estética y warnings preexistentes de Framer Motion.
- Verificar al final suite completa, lint, build, `git diff --check` y `/servicios/software` a 320 px.
- Registrar evidencia y concerns en `.superpowers/sdd/2026-08-04-software-saas-redesign/final-fix-report.md`.

---

### Task 1: Espera acotada del destino hash

**Files:**
- Modify: `src/components/common/scrollToTop/ScrollToTop.tsx`
- Test: `src/components/common/scrollToTop/ScrollToTop.test.tsx`

**Interfaces:**
- Consumes: `useLocation()` y el DOM que monta `AnimatePresence mode="wait"`.
- Produces: desplazamiento a `#servicios-*` aunque el destino aparezca al finalizar la salida de la ruta anterior.

- [x] Agregar una prueba que navegue desde `/servicios/software` a `/#servicios-web` atravesando una transición `AnimatePresence mode="wait"` y espere `scrollIntoView`.
- [x] Ejecutar solo esa prueba y conservar el RED causado por el único `requestAnimationFrame` actual.
- [x] Reemplazar la consulta única por una consulta inmediata más `MutationObserver`, con timeout acotado y cleanup completo.
- [x] Ejecutar el test enfocado y conservar el GREEN.

### Task 2: Cierre mobile al activar `md`

**Files:**
- Modify: `src/components/common/navbar/MobileNavigation.tsx`
- Test: `src/components/common/navbar/Navbar.test.tsx`

**Interfaces:**
- Consumes: `window.matchMedia("(min-width: 768px)")`.
- Produces: panel cerrado y cleanup de `body.overflow` y Lenis al cruzar a desktop.

- [x] Agregar una prueba con un `MediaQueryList` controlable que abra el panel, active el breakpoint y verifique panel cerrado, overflow restaurado y Lenis reiniciado.
- [x] Ejecutar solo esa prueba y conservar el RED por falta del listener.
- [x] Suscribir el breakpoint mientras el panel está abierto y llamar al cierre existente cuando `matches` sea verdadero.
- [x] Ejecutar el test enfocado y conservar el GREEN.

### Task 3: `ArrowDown` en Servicios desktop

**Files:**
- Modify: `src/components/common/navbar/ServicesMenu.tsx`
- Test: `src/components/common/navbar/Navbar.test.tsx`

**Interfaces:**
- Consumes: `KeyboardEvent` del trigger desktop.
- Produces: menú abierto, comportamiento por defecto prevenido y primer enlace enfocado.

- [x] Extender la prueba desktop para enfocar el trigger y pulsar `ArrowDown`, verificando `aria-expanded` y foco en “Sitios web y landings”.
- [x] Ejecutar el test enfocado y conservar el RED por ausencia de `onKeyDown`.
- [x] Agregar el handler mínimo que abra y enfoque el primer enlace en el siguiente frame.
- [x] Ejecutar el test enfocado y conservar el GREEN.

### Task 4: Escape escalonado en mobile

**Files:**
- Modify: `src/components/common/navbar/MobileNavigation.tsx`
- Test: `src/components/common/navbar/Navbar.test.tsx`

**Interfaces:**
- Consumes: estado visible del acordeón Servicios y evento `Escape` global del panel.
- Produces: primer Escape cierra el acordeón; segundo Escape cierra el panel y devuelve foco.

- [x] Agregar una prueba que abra panel y acordeón, pulse Escape dos veces y verifique ambos estados/foco en secuencia.
- [x] Ejecutar el test enfocado y conservar el RED porque el primer Escape cierra todo.
- [x] Ramificar el handler para colapsar primero el acordeón visible.
- [x] Ejecutar el test enfocado y conservar el GREEN.

### Task 5: Verificación, QA e informe

**Files:**
- Create: `.superpowers/sdd/2026-08-04-software-saas-redesign/final-fix-report.md`
- Create: `.superpowers/sdd/2026-08-04-software-saas-redesign/qa-evidence/mobile-320-*.png`

**Interfaces:**
- Consumes: rama completa y servidor local verificado.
- Produces: evidencia reproducible de calidad y un commit final coherente.

- [x] Ejecutar `npm test -- --run`, `npm run lint`, `npm run build` y `git diff --check`.
- [x] Levantar la aplicación y revisar a 320 px ancho: overflow horizontal y las tres capturas completas.
- [x] Guardar capturas de hero y ambos bloques de producto.
- [x] Completar el informe por hallazgo con RED/GREEN, archivos, QA, self-review y concerns.
- [x] Revisar el diff y confirmar las verificaciones finales antes de crear el commit coherente.

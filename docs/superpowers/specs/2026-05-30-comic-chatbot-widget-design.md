# Comic Chatbot Widget — Design Spec

**Fecha:** 2026-05-30
**Branch:** codex-home-presencia-digital

## Objetivo

Widget de chatbot flotante con estética de historieta/comic (onda Batman) que aparece en todas las páginas. Flujo de conversación hardcodeado como árbol de nodos. El contenido del árbol se define después — la prioridad ahora es el diseño visual y la arquitectura del sistema.

---

## Comportamiento general

- Flota en la esquina inferior derecha de todas las páginas
- Dos estados: **cerrado** (botón) y **abierto** (panel de chat)
- El usuario nunca escribe texto libre — siempre elige entre opciones de botón
- El flujo avanza por nodos hasta llegar a un CTA final (contacto)

---

## Estado cerrado — botón flotante

- Posición: `fixed bottom-6 right-6` (o `bottom-8 right-8` en desktop)
- Forma: cuadrado, `border-2 border-black shadow-[4px_4px_0_#111]`
- Fondo: `#d7ff4f` (lima)
- Ícono: speech bubble de Lucide (`MessageSquare`)
- Animación idle: pulso suave (scale 1 → 1.05 → 1, loop)
- Hover: shadow crece a `[6px_6px_0_#111]`, sube `-translate-y-0.5`
- Al clickear: se abre el panel con animación de entrada

---

## Estado abierto — panel de chat

### Dimensiones y posición
- `fixed bottom-24 right-6` (sobre el botón)
- Ancho: `w-[360px]` en desktop, `w-[calc(100vw-2rem)]` en mobile
- Alto: `max-h-[520px]` con scroll interno

### Estructura visual
```
┌─────────────────────────────────┐
│  HEADER (negro + lima)          │
│  "SMARTCLOUD" · [X]             │
├─────────────────────────────────┤
│                                 │
│  ÁREA DE MENSAJES               │
│  (fondo crema + halftone dots)  │
│  [speech bubbles del bot]       │
│  [burbuja del usuario]          │
│                                 │
├─────────────────────────────────┤
│  OPCIONES                       │
│  [Botón A] [Botón B]           │
│  [Botón C]                     │
└─────────────────────────────────┘
```

### Header
- Fondo `#111111`, texto `#d7ff4f`
- Título: "SMARTCLOUD" en `font-mono uppercase tracking-widest text-sm`
- Botón cerrar: `×` alineado a la derecha, hover rosa `#ff2bf9`

### Animación de entrada (BOOM!)
- Al abrir el widget, antes de mostrar el chat:
- Una palabra de acción ("¡BOOM!" o "¡HOLA!") aparece centrada sobre el panel
- Animación framer-motion: `scale 0.3 → 1.3 → 1`, `opacity 0 → 1 → 0`
- Duración total: 700ms
- Tipografía: `font-black text-6xl text-[#d7ff4f]` sobre overlay oscuro
- Después desaparece y el chat se muestra

### Área de mensajes
- Fondo: `#f3f0e8` (crema)
- Patrón halftone: CSS `radial-gradient` de puntos negros con `opacity-[0.06]`
- Scroll automático al último mensaje
- Mensajes animados con framer-motion (fade + slide up al aparecer)

### Speech bubbles — bot
- Fondo blanco, `border-2 border-black`
- Sombra: `shadow-[3px_3px_0_#111]`
- Cola triangular a la izquierda (CSS `::before` o SVG inline)
- Tipografía: `font-black text-base leading-snug` — agresiva, comic
- Alineado a la izquierda con avatar/ícono del bot (opcional: emoji o ícono)

### Burbuja de respuesta — usuario
- Fondo `#111111`, texto blanco
- `border-2 border-black`
- Sin cola, alineada a la derecha
- Aparece cuando el usuario elige una opción

### Botones de opciones
- Apilados verticalmente debajo del último mensaje del bot
- `border-2 border-black shadow-[3px_3px_0_#111]`
- Colores alternados por posición: lima → blanco → rosa → crema
- Hover: `-translate-y-0.5 shadow-[5px_5px_0_#111]`
- Tipografía: `font-semibold text-sm uppercase tracking-wide`
- Al clickear: desaparecen y aparece la respuesta del usuario + siguiente mensaje del bot

---

## Arquitectura de archivos

```
src/components/chatbot/
├── ChatbotWidget.tsx       ← componente raíz, maneja estado abierto/cerrado
├── ChatbotPanel.tsx        ← panel de chat con header, mensajes y opciones
├── ChatbotBubble.tsx       ← speech bubble (bot y usuario)
├── ChatbotOptions.tsx      ← botones de opciones
├── BoomAnimation.tsx       ← animación de entrada BOOM!
└── chatbotFlow.ts          ← árbol de nodos hardcodeado
```

`ChatbotWidget.tsx` se importa en `App.tsx` una sola vez, fuera del router, para que aparezca en todas las páginas.

---

## Estructura del árbol de nodos (`chatbotFlow.ts`)

```typescript
type ChatNode = {
  id: string;
  message: string;
  options: {
    label: string;
    nextId: string;
  }[];
};

// Nodo terminal (sin opciones → muestra CTA de contacto)
type ChatNodeTerminal = {
  id: string;
  message: string;
  options: [];
  cta: { label: string; href: string };
};
```

### Árbol placeholder (contenido a reemplazar)

```
START
  "¡Hola! ¿En qué puedo ayudarte hoy?"
  → "Quiero una web"         → WEB
  → "Necesito software"      → SOFTWARE
  → "Busco contenido/video"  → CONTENIDO
  → "Solo estoy viendo"      → CASUAL

WEB
  "Genial. ¿Tenés algo armado o arrancamos de cero?"
  → "Tengo algo pero hay que mejorarlo"  → WEB_MEJORA
  → "Arrancamos de cero"                 → WEB_NUEVO

WEB_NUEVO / WEB_MEJORA / SOFTWARE / CONTENIDO / CASUAL
  → Todos terminan en un nodo CTA:
  "Contanos qué necesitás y te respondemos en menos de 24hs."
  CTA: "Escribinos" → mailto:hola@scland.com
```

---

## Estado del componente

```typescript
// En ChatbotWidget.tsx
const [isOpen, setIsOpen] = useState(false);
const [showBoom, setShowBoom] = useState(false);

// En ChatbotPanel.tsx
const [currentNodeId, setCurrentNodeId] = useState("start");
const [history, setHistory] = useState<HistoryItem[]>([]);
// HistoryItem: { type: "bot" | "user"; text: string }
```

Al elegir una opción:
1. Se agrega `{ type: "user", text: label }` al history
2. Se avanza a `nextId`
3. Se agrega `{ type: "bot", text: nextNode.message }` al history
4. Se muestran las nuevas opciones

---

## Integración

`App.tsx` importa `ChatbotWidget` y lo renderiza fuera de `<Routes>`:

```tsx
// App.tsx
<>
  <Routes>...</Routes>
  <ChatbotWidget />
</>
```

---

## Paleta y tokens

| Elemento | Color |
|---|---|
| Botón flotante | `#d7ff4f` (lima) |
| Header panel | `#111111` bg / `#d7ff4f` texto |
| Burbuja bot | blanco / borde negro |
| Burbuja usuario | `#111111` bg / blanco texto |
| Opción A | `#d7ff4f` |
| Opción B | `white` |
| Opción C | `#ff2bf9` |
| Opción D | `#f3f0e8` |
| BOOM! | `#d7ff4f` texto |
| Halftone bg | `#111111` dots @ 6% opacity sobre crema |

---

## Notas

- No hay input de texto libre — solo opciones de botón
- El contenido del árbol (`chatbotFlow.ts`) es un archivo separado, fácil de editar sin tocar los componentes
- La animación BOOM! solo se ejecuta la primera vez que se abre por sesión (usar `useRef` para tracking)
- Mobile: el panel ocupa casi todo el ancho de pantalla

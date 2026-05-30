# Comic Chatbot Widget — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un widget de chatbot flotante con estética comic book (onda Batman) que aparece en todas las páginas, con flujo de conversación hardcodeado como árbol de nodos.

**Architecture:** Seis componentes independientes en `src/components/chatbot/` más un archivo de datos. `ChatbotWidget` (raíz) maneja el estado abierto/cerrado y monta `ChatbotPanel`. El panel navega el árbol de nodos de `chatbotFlow.ts`. `App.tsx` monta el widget fuera de `<Routes>` para que aparezca en todas las páginas.

**Tech Stack:** React 19, TypeScript, Tailwind v4, framer-motion (ya instalado), lucide-react (ya instalado)

---

## File Map

| Acción | Archivo | Responsabilidad |
|--------|---------|-----------------|
| Modify | `src/index.css` | Agregar `@keyframes chatPulse` para botón flotante |
| Create | `src/components/chatbot/chatbotFlow.ts` | Árbol de nodos hardcodeado (tipos + datos) |
| Create | `src/components/chatbot/BoomAnimation.tsx` | Animación de entrada ¡BOOM! |
| Create | `src/components/chatbot/ChatbotBubble.tsx` | Speech bubble (bot y usuario) |
| Create | `src/components/chatbot/ChatbotOptions.tsx` | Botones de opciones de respuesta |
| Create | `src/components/chatbot/ChatbotPanel.tsx` | Panel completo (header + mensajes + opciones) |
| Create | `src/components/chatbot/ChatbotWidget.tsx` | Componente raíz: botón flotante + panel |
| Modify | `src/App.tsx` | Importar y montar `ChatbotWidget` fuera de `<Routes>` |

---

## Task 1: Keyframe CSS + datos del árbol de conversación

**Files:**
- Modify: `src/index.css`
- Create: `src/components/chatbot/chatbotFlow.ts`

- [ ] **Step 1: Agregar `@keyframes chatPulse` en index.css**

Al final de `src/index.css` agregar:

```css
@keyframes chatPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}
```

- [ ] **Step 2: Crear `src/components/chatbot/chatbotFlow.ts`**

Crear el directorio y el archivo:

```typescript
export type ChatOption = {
  label: string;
  nextId: string;
};

export type ChatNode = {
  id: string;
  message: string;
  options: ChatOption[];
  cta?: { label: string; href: string };
};

export const chatbotFlow: Record<string, ChatNode> = {
  start: {
    id: "start",
    message: "¡Hola! Soy el bot de SmartCloud. ¿En qué te puedo ayudar?",
    options: [
      { label: "Quiero una web", nextId: "web" },
      { label: "Necesito software", nextId: "software" },
      { label: "Busco contenido o video", nextId: "contenido" },
      { label: "Solo estoy viendo", nextId: "casual" },
    ],
  },
  web: {
    id: "web",
    message: "¡Genial! ¿Tenés algo armado o arrancamos de cero?",
    options: [
      { label: "Tengo algo pero hay que mejorarlo", nextId: "cta" },
      { label: "Arrancamos de cero", nextId: "cta" },
    ],
  },
  software: {
    id: "software",
    message: "Perfecto. ¿Qué tipo de herramienta necesitás?",
    options: [
      { label: "Backoffice o panel interno", nextId: "cta" },
      { label: "Automatizaciones", nextId: "cta" },
      { label: "MVP o producto nuevo", nextId: "cta" },
    ],
  },
  contenido: {
    id: "contenido",
    message: "Buenísimo. ¿Para qué lo necesitás?",
    options: [
      { label: "Redes sociales", nextId: "cta" },
      { label: "Ads o campañas", nextId: "cta" },
      { label: "Presentaciones o lanzamientos", nextId: "cta" },
    ],
  },
  casual: {
    id: "casual",
    message: "Genial, tomá tu tiempo. Si necesitás algo, acá estamos.",
    options: [
      { label: "En realidad sí tengo algo", nextId: "start" },
      { label: "Gracias, nos vemos", nextId: "bye" },
    ],
  },
  bye: {
    id: "bye",
    message: "¡Hasta luego! Si en algún momento querés avanzar, escribinos.",
    options: [],
    cta: { label: "Escribinos igual", href: "mailto:hola@scland.com" },
  },
  cta: {
    id: "cta",
    message: "Contanos qué necesitás y te respondemos en menos de 24hs.",
    options: [],
    cta: { label: "Escribinos →", href: "mailto:hola@scland.com" },
  },
};
```

- [ ] **Step 3: Verificar TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep chatbotFlow
```

Esperado: sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/components/chatbot/chatbotFlow.ts
git commit -m "feat: add chatbot flow data and pulse keyframe"
```

---

## Task 2: BoomAnimation.tsx

**Files:**
- Create: `src/components/chatbot/BoomAnimation.tsx`

- [ ] **Step 1: Crear `BoomAnimation.tsx`**

```tsx
import { useEffect } from "react";
import { motion } from "framer-motion";

const BoomAnimation = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 750);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#111111]/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.75, times: [0, 0.1, 0.75, 1], ease: "easeInOut" }}
    >
      <motion.span
        className="select-none font-black text-[#d7ff4f]"
        style={{ fontSize: "3.5rem", lineHeight: 1, letterSpacing: "-0.02em" }}
        initial={{ scale: 0.3, rotate: -8 }}
        animate={{ scale: [0.3, 1.4, 1.1], rotate: [-8, 4, -2] }}
        transition={{ duration: 0.5, times: [0, 0.6, 1], ease: "easeOut" }}
      >
        ¡BOOM!
      </motion.span>
    </motion.div>
  );
};

export default BoomAnimation;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chatbot/BoomAnimation.tsx
git commit -m "feat: add BoomAnimation entry component"
```

---

## Task 3: ChatbotBubble.tsx

**Files:**
- Create: `src/components/chatbot/ChatbotBubble.tsx`

Speech bubble con cola triangular para mensajes del bot (izquierda) y respuestas del usuario (derecha).

- [ ] **Step 1: Crear `ChatbotBubble.tsx`**

```tsx
type BubbleProps = {
  text: string;
  type: "bot" | "user";
};

const ChatbotBubble = ({ text, type }: BubbleProps) => {
  if (type === "bot") {
    return (
      <div className="mb-3 flex items-start">
        <div className="relative max-w-[88%] border-2 border-black bg-white p-3 shadow-[3px_3px_0_#111111]">
          {/* Cola triangular izquierda — borde negro */}
          <span
            style={{
              position: "absolute",
              left: "-9px",
              top: "10px",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: "9px solid #111111",
            }}
          />
          {/* Cola triangular izquierda — relleno blanco */}
          <span
            style={{
              position: "absolute",
              left: "-6px",
              top: "10px",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: "9px solid white",
            }}
          />
          <p className="font-black text-sm leading-snug text-black">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-3 flex justify-end">
      <div className="max-w-[88%] border-2 border-black bg-[#111111] p-3 shadow-[3px_3px_0_#d7ff4f]">
        <p className="font-semibold text-sm leading-snug text-white">{text}</p>
      </div>
    </div>
  );
};

export default ChatbotBubble;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chatbot/ChatbotBubble.tsx
git commit -m "feat: add ChatbotBubble speech bubble component"
```

---

## Task 4: ChatbotOptions.tsx

**Files:**
- Create: `src/components/chatbot/ChatbotOptions.tsx`

Botones de opciones de respuesta con colores alternados y estilo brutalista.

- [ ] **Step 1: Crear `ChatbotOptions.tsx`**

```tsx
import type { ChatOption } from "./chatbotFlow";

const optionColors = [
  "bg-[#d7ff4f] text-black hover:bg-[#c8f040]",
  "bg-white text-black hover:bg-[#f3f0e8]",
  "bg-[#ff2bf9] text-black hover:bg-[#e020e0]",
  "bg-[#f3f0e8] text-black hover:bg-white",
];

const ChatbotOptions = ({
  options,
  onSelect,
}: {
  options: ChatOption[];
  onSelect: (option: ChatOption) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 px-3 pb-3 pt-1">
      {options.map((opt, i) => (
        <button
          key={opt.nextId + opt.label}
          onClick={() => onSelect(opt)}
          className={`border-2 border-black px-4 py-2.5 text-left text-xs font-black uppercase tracking-[0.1rem] shadow-[3px_3px_0_#111111] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111111] ${optionColors[i % optionColors.length]}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default ChatbotOptions;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chatbot/ChatbotOptions.tsx
git commit -m "feat: add ChatbotOptions button component"
```

---

## Task 5: ChatbotPanel.tsx

**Files:**
- Create: `src/components/chatbot/ChatbotPanel.tsx`

Panel completo: header negro/lima, área de mensajes con halftone, opciones o CTA.

- [ ] **Step 1: Crear `ChatbotPanel.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotFlow, type ChatOption } from "./chatbotFlow";
import ChatbotBubble from "./ChatbotBubble";
import ChatbotOptions from "./ChatbotOptions";
import BoomAnimation from "./BoomAnimation";

type HistoryItem = { type: "bot" | "user"; text: string };

const ChatbotPanel = ({
  onClose,
  showBoom,
  onBoomComplete,
}: {
  onClose: () => void;
  showBoom: boolean;
  onBoomComplete: () => void;
}) => {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "bot", text: chatbotFlow.start.message },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentNode = chatbotFlow[currentNodeId];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSelect = (option: ChatOption) => {
    const nextNode = chatbotFlow[option.nextId];
    setHistory((prev) => [
      ...prev,
      { type: "user", text: option.label },
      { type: "bot", text: nextNode.message },
    ]);
    setCurrentNodeId(option.nextId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col overflow-hidden border-2 border-black shadow-[8px_8px_0_#111111]"
      style={{ width: "360px", maxWidth: "calc(100vw - 2rem)", maxHeight: "520px" }}
    >
      {showBoom && <BoomAnimation onComplete={onBoomComplete} />}

      {/* Header */}
      <div className="flex shrink-0 items-center justify-between bg-[#111111] px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-[0.22rem] text-[#d7ff4f]">
          SmartCloud
        </span>
        <button
          onClick={onClose}
          className="font-mono text-xl leading-none text-white/50 transition-colors hover:text-[#ff2bf9]"
          aria-label="Cerrar chat"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-3 pt-4"
        style={{
          background: "#f3f0e8",
          backgroundImage: "radial-gradient(circle, #11111115 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        <AnimatePresence initial={false}>
          {history.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatbotBubble text={item.text} type={item.type} />
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="h-2" />
      </div>

      {/* Options or CTA */}
      <div className="shrink-0 border-t-2 border-black bg-[#f3f0e8] pt-2">
        {currentNode.options.length > 0 ? (
          <ChatbotOptions options={currentNode.options} onSelect={handleSelect} />
        ) : currentNode.cta ? (
          <div className="px-3 pb-3">
            <a
              href={currentNode.cta.href}
              className="block border-2 border-black bg-[#d7ff4f] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12rem] shadow-[3px_3px_0_#111111] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111111]"
            >
              {currentNode.cta.label}
            </a>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default ChatbotPanel;
```

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -20
```

Esperado: sin errores de TypeScript.

- [ ] **Step 3: Commit**

```bash
git add src/components/chatbot/ChatbotPanel.tsx
git commit -m "feat: add ChatbotPanel with halftone bg and conversation flow"
```

---

## Task 6: ChatbotWidget.tsx

**Files:**
- Create: `src/components/chatbot/ChatbotWidget.tsx`

Componente raíz: botón flotante + animación de apertura + monta el panel.

- [ ] **Step 1: Crear `ChatbotWidget.tsx`**

```tsx
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import ChatbotPanel from "./ChatbotPanel";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBoom, setShowBoom] = useState(false);
  const hasOpenedRef = useRef(false);

  const handleOpen = () => {
    if (!hasOpenedRef.current) {
      setShowBoom(true);
      hasOpenedRef.current = true;
    }
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);
  const handleBoomComplete = () => setShowBoom(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <ChatbotPanel
            onClose={handleClose}
            showBoom={showBoom}
            onBoomComplete={handleBoomComplete}
          />
        )}
      </AnimatePresence>

      <button
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        className="flex h-14 w-14 items-center justify-center border-2 border-black bg-[#d7ff4f] shadow-[4px_4px_0_#111111] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111111]"
        style={
          isOpen
            ? undefined
            : { animation: "chatPulse 2.8s ease-in-out infinite" }
        }
      >
        {isOpen ? (
          <X className="h-6 w-6 text-black" />
        ) : (
          <MessageSquare className="h-6 w-6 text-black" />
        )}
      </button>
    </div>
  );
};

export default ChatbotWidget;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chatbot/ChatbotWidget.tsx
git commit -m "feat: add ChatbotWidget floating button root component"
```

---

## Task 7: Montar en App.tsx

**Files:**
- Modify: `src/App.tsx`

Importar `ChatbotWidget` y agregarlo dentro de `<Router>` pero fuera de `<AnimatedRoutes>`, para que aparezca en todas las páginas.

- [ ] **Step 1: Agregar import en App.tsx**

En `src/App.tsx`, agregar el import junto a los demás:

```tsx
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
```

- [ ] **Step 2: Montar el widget en la función App**

La función `App` debe quedar así:

```tsx
function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll />
      <MaskCursor />
      <Navbar />
      <AnimatedRoutes />
      <ChatbotWidget />
      <Analytics />
    </Router>
  );
}
```

- [ ] **Step 3: Build final**

```bash
npm run build 2>&1 | tail -15
```

Esperado: `✓ built in X.XXs` sin errores. Solo el warning de chunk size (pre-existente, no es nuevo).

- [ ] **Step 4: Verificar en browser**

```bash
npm run dev
```

Abrir `http://localhost:5173` y confirmar:
- El botón lima aparece en esquina inferior derecha con animación de pulso
- Al clickear: aparece `¡BOOM!` animado y luego el panel de chat
- El panel muestra header negro/lima, fondo crema con halftone, primera pregunta del bot con speech bubble
- Los botones de opciones tienen colores alternados (lima → blanco → rosa)
- Al elegir una opción: aparece burbuja de usuario (negra) + nueva burbuja del bot
- El flujo termina en un botón CTA "Escribinos →" que abre el email
- En mobile el panel ocupa casi todo el ancho de pantalla
- Navegar a `/studio` o `/work` — el chatbot sigue apareciendo

- [ ] **Step 5: Commit final**

```bash
git add src/App.tsx
git commit -m "feat: mount ChatbotWidget globally in App.tsx"
```

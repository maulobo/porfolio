import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useSnakeGame, type Direction } from "./useSnakeGame";
import "./nokiaSnake.css";

type NokiaSnakeModalProps = {
  onClose: () => void;
};

type SmoothScrollController = {
  isStopped?: boolean;
  start: () => void;
  stop: () => void;
};

const focusableSelector = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Teclas que scrollean la página y hay que neutralizar mientras el modal vive. */
const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Spacebar"]);

const KEY_DIRECTIONS: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
  // Convención del teclado del 1100: el 2 sube y el 8 baja.
  "2": "up",
  "8": "down",
  "4": "left",
  "6": "right",
};

/** Por debajo de este ancho el pad se bloquea y sólo juega el teclado numérico. */
const COMPACT_QUERY = "(max-width: 499px)";

const DIRECTION_LABELS: Record<Direction, string> = {
  up: "arriba",
  down: "abajo",
  left: "izquierda",
  right: "derecha",
};

const keypad = [
  { number: "1", letters: "∞" },
  { number: "2", letters: "abc", direction: "up" as const },
  { number: "3", letters: "def" },
  { number: "4", letters: "ghi", direction: "left" as const },
  { number: "5", letters: "jkl", action: true },
  { number: "6", letters: "mno", direction: "right" as const },
  { number: "7", letters: "pqrs" },
  { number: "8", letters: "tuv", direction: "down" as const },
  { number: "9", letters: "wxyz" },
  { number: "*", letters: "+" },
  { number: "0", letters: "⎵" },
  { number: "#", letters: "↵" },
];

/** Sigue el ancho de la ventana para decidir con qué controles se juega. */
const useIsCompact = () => {
  const [compact, setCompact] = useState(() => window.matchMedia(COMPACT_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(COMPACT_QUERY);
    const handleChange = () => setCompact(query.matches);

    handleChange();
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return compact;
};

const NokiaSnakeModal = ({ onClose }: NokiaSnakeModalProps) => {
  const { canvasRef, cols, rows, cell, status, score, highScore, toggle, turn } = useSnakeGame();
  const isCompact = useIsCompact();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeOriginRef = useRef<{ x: number; y: number } | null>(null);

  // Bloqueo de scroll + Lenis, igual que el panel de navegación móvil.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const smoothScroll = (window as Window & { lenis?: SmoothScrollController }).lenis;
    const smoothScrollWasStopped = smoothScroll?.isStopped ?? false;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";
    if (!smoothScrollWasStopped) smoothScroll?.stop();
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (!smoothScrollWasStopped) smoothScroll?.start();
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusable = Array.from(
          overlayRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
        );
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      if (SCROLL_KEYS.has(event.key)) {
        event.preventDefault();
      }

      if (event.key === " " || event.key === "Spacebar" || event.key === "Enter" || event.key === "5") {
        // Enter sobre un botón ya dispara su click: no lo dupliquemos.
        if (event.key === "Enter" && document.activeElement instanceof HTMLButtonElement) return;
        toggle();
        return;
      }

      const direction = KEY_DIRECTIONS[event.key];
      if (direction) turn(direction);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, toggle, turn]);

  const handleScreenPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    swipeOriginRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleScreenPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const origin = swipeOriginRef.current;
    swipeOriginRef.current = null;
    if (!origin) return;

    const deltaX = event.clientX - origin.x;
    const deltaY = event.clientY - origin.y;

    // Menos de 24px de recorrido se trata como toque: arranca o pausa.
    if (Math.abs(deltaX) < 24 && Math.abs(deltaY) < 24) {
      toggle();
      return;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      turn(deltaX > 0 ? "right" : "left");
    } else {
      turn(deltaY > 0 ? "down" : "up");
    }
  };

  // Cada modo explica sólo los controles que realmente funcionan ahí.
  const moveHint = isCompact ? "Movete con 2 4 6 8" : "Movete con las flechas";
  const actionHint = isCompact ? "Tocá 5" : "Espacio";
  const exitHint = isCompact ? "C para salir" : "Escape o C para salir";

  const message =
    status === "idle"
      ? { title: "Snake", copy: `${actionHint} para empezar ${moveHint} ${exitHint}` }
      : status === "paused"
        ? { title: "Pausa", copy: `${actionHint} para seguir ${exitHint}.` }
        : status === "over"
          ? {
              title: "Game over",
              copy: `${score} ${score === 1 ? "punto" : "puntos"}. ${actionHint} para volver a jugar. ${exitHint}.`,
            }
          : null;

  return (
    <div
      ref={overlayRef}
      className="nokia-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Snake en un Nokia 1100"
      onPointerDown={(event) => {
        if (event.target === overlayRef.current) onClose();
      }}
    >
      <div className="nokia">
        <div className="nokia__speaker mb-4" aria-hidden="true" />
        
        <div className="nokia__screen-frame">
          <div
            className="nokia__screen"
            onPointerDown={handleScreenPointerDown}
            onPointerUp={handleScreenPointerUp}
          >
            <div className="nokia__status">
              <span>Pts {String(score).padStart(3, "0")}</span>
              <span>Máx {String(highScore).padStart(3, "0")}</span>
            </div>

            <canvas
              ref={canvasRef}
              className="nokia__canvas"
              width={cols * cell}
              height={rows * cell}
              role="img"
              aria-label={`Snake. Puntaje ${score}. Récord ${highScore}.`}
            />

            {message && (
              <div className="nokia__message">
                <h2>{message.title}</h2>
                <p>{message.copy}</p>
              </div>
            )}
          </div>
        </div>

        <div className="nokia__nav">
          <button
            ref={closeRef}
            type="button"
            className="nokia__soft"
            onClick={onClose}
            aria-label="Cerrar el juego"
          >
            C
          </button>

          <div className={`nokia__dpad${isCompact ? " nokia__dpad--locked" : ""}`}>
            <button
              type="button"
              className="nokia__dpad-key"
              style={{ gridArea: "up" }}
              onClick={() => turn("up")}
              disabled={isCompact}
              aria-label={isCompact ? "Arriba (usá la tecla 2)" : "Arriba"}
            >
              ▲
            </button>
            <button
              type="button"
              className="nokia__dpad-key"
              style={{ gridArea: "left" }}
              onClick={() => turn("left")}
              disabled={isCompact}
              aria-label={isCompact ? "Izquierda (usá la tecla 4)" : "Izquierda"}
            >
              ◀
            </button>
            <button
              type="button"
              className="nokia__dpad-key"
              style={{ gridArea: "center" }}
              onClick={toggle}
              aria-label={status === "playing" ? "Pausar" : "Jugar"}
            >
              ●
            </button>
            <button
              type="button"
              className="nokia__dpad-key"
              style={{ gridArea: "right" }}
              onClick={() => turn("right")}
              disabled={isCompact}
              aria-label={isCompact ? "Derecha (usá la tecla 6)" : "Derecha"}
            >
              ▶
            </button>
            <button
              type="button"
              className="nokia__dpad-key"
              style={{ gridArea: "down" }}
              onClick={() => turn("down")}
              disabled={isCompact}
              aria-label={isCompact ? "Abajo (usá la tecla 8)" : "Abajo"}
            >
              ▼
            </button>
          </div>

          <button
            type="button"
            className="nokia__soft"
            onClick={toggle}
            aria-label={status === "playing" ? "Pausar" : "Jugar"}
          >
            {status === "playing" ? "II" : "▶"}
          </button>
        </div>

        <div className="nokia__keypad">
          {keypad.map((key) => (
            <button
              key={key.number}
              type="button"
              className={`nokia__key${key.direction || key.action ? " nokia__key--active" : ""}`}
              onClick={() => {
                if (key.direction) turn(key.direction);
                else if (key.action) toggle();
              }}
              aria-label={
                key.direction
                  ? `Tecla ${key.number}: mover ${DIRECTION_LABELS[key.direction]}`
                  : key.action
                    ? `Tecla ${key.number}: jugar o pausar`
                    : `Tecla ${key.number}`
              }
            >
              <span className="nokia__key-number">{key.number}</span>
              <span className="nokia__key-letters">{key.letters}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NokiaSnakeModal;

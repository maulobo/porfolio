import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import MenuRow from "./MenuRow";
import {
  overlayVariants,
  panelVariants,
  rowVariants,
  shadowVariants,
  wrapperVariants,
} from "./menuMotion";
import { primaryLinks, serviceLinks } from "./navigation";

type MobileNavigationProps = {
  pathname: string;
  onOpenChange: (open: boolean) => void;
};

type SmoothScrollController = {
  isStopped?: boolean;
  start: () => void;
  stop: () => void;
};

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileNavigation({ pathname, onOpenChange }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Memoizado: el effect lo usa y sin esto quedaría capturado en una closure vieja.
  const close = useCallback(
    (restoreFocus = false) => {
      setOpen(false);
      onOpenChange(false);
      if (restoreFocus) {
        triggerRef.current?.focus();
      }
    },
    [onOpenChange],
  );

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onOpenChange(next);
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const smoothScroll = (window as Window & { lenis?: SmoothScrollController }).lenis;
    const smoothScrollWasStopped = smoothScroll?.isStopped ?? false;
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    document.body.style.overflow = "hidden";
    if (!smoothScrollWasStopped) smoothScroll?.stop();

    const handleDesktopChange = () => {
      if (desktopQuery.matches) close();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
        return;
      }

      if (event.key !== "Tab") return;

      const panelFocusableElements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      );
      const focusableElements = triggerRef.current
        ? [triggerRef.current, ...panelFocusableElements]
        : panelFocusableElements;
      const first = focusableElements[0];
      const last = focusableElements.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleDesktopChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (!smoothScrollWasStopped) smoothScroll?.start();
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={toggle}
        className="relative z-[115] min-h-11 border-2 border-brand-pink bg-brand-dark px-3 py-2 text-xs font-medium uppercase tracking-widest text-brand-light transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink"
      >
        {open ? "Cerrar menú" : "Abrir menú"}
      </button>

      <AnimatePresence>
        {open && (
          /* Separa el menú del fondo del sitio; tocarlo también cierra. */
          <motion.div
            key="overlay"
            aria-hidden="true"
            onClick={() => close()}
            variants={reduceMotion ? undefined : overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[105] bg-[#0a0c12]/80 backdrop-blur-md"
          />
        )}

        {open && (
          <motion.div
            key="panel"
            ref={panelRef}
            id="mobile-navigation"
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-[110] overflow-y-auto overscroll-contain px-4 pb-12 pt-3"
          >
            <div className="relative">
              {/* Sombra sólida como capa propia: así puede animarse por separado. */}
              <motion.span
                aria-hidden="true"
                variants={reduceMotion ? undefined : shadowVariants}
                className="pointer-events-none absolute inset-0 bg-[#ff2bf9]"
              />

              <motion.nav
                aria-label="Navegación móvil"
                variants={reduceMotion ? undefined : panelVariants}
                style={{ originY: 0 }}
                className="relative border-[3px] border-[#111111] bg-[#f3f0e8] text-[#111111]"
              >
                {/* Cabecera tipo "ficha": el detalle que hace distinto a este menú. */}
                <motion.div
                  variants={reduceMotion ? undefined : rowVariants}
                  className="flex items-center justify-between gap-4 border-b-[3px] border-[#111111] bg-[#111111] px-4 py-2.5"
                >
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.22rem] text-[#f3f0e8]">
                    Menú
                  </span>
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.22rem] text-[#d7ff4f]">
                    Scland
                  </span>
                </motion.div>

                <div className="flex flex-col">
                  {primaryLinks.slice(0, 1).map((link) => (
                    <MenuRow
                      key={link.path}
                      to={link.path}
                      name={link.name}
                      active={pathname === link.path}
                      animate={!reduceMotion}
                      onSelect={() => close()}
                    />
                  ))}
                </div>

                {/* Mismo bloque de servicios que el desplegable de escritorio. */}
                <motion.div
                  variants={reduceMotion ? undefined : rowVariants}
                  className="flex items-center justify-between gap-4 border-y-[3px] border-[#111111] bg-[#111111] px-4 py-2"
                >
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.22rem] text-[#f3f0e8]">
                    Servicios
                  </span>
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.22rem] text-[#d7ff4f]">
                    {String(serviceLinks.length).padStart(2, "0")} áreas
                  </span>
                </motion.div>

                {/* Sólo el nombre: en mobile el alto es el recurso escaso y el
                    menú tiene que entrar entero en pantalla. */}
                <div className="flex flex-col">
                  {serviceLinks.map((service) => (
                    <MenuRow
                      key={service.path}
                      to={service.path}
                      name={service.name}
                      active={pathname === service.path}
                      animate={!reduceMotion}
                      onSelect={() => close()}
                    />
                  ))}
                </div>

                <div className="flex flex-col border-t-[3px] border-[#111111]">
                  {primaryLinks.slice(1).map((link) => (
                    <MenuRow
                      key={link.path}
                      to={link.path}
                      name={link.name}
                      active={pathname === link.path}
                      animate={!reduceMotion}
                      onSelect={() => close()}
                    />
                  ))}
                </div>

                <motion.p
                  variants={reduceMotion ? undefined : rowVariants}
                  className="border-t-[3px] border-[#111111] bg-[#f3f0e8] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18rem] text-black/55"
                >
                  Se combinan según el proyecto
                </motion.p>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

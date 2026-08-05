import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import MenuRow from "./MenuRow";
import { panelVariants, rowVariants, shadowVariants, wrapperVariants } from "./menuMotion";
import { serviceLinks } from "./navigation";

type ServicesMenuProps = {
  pathname: string;
  onOpenChange: (open: boolean) => void;
};

const linkSelector = "a[href]";

export default function ServicesMenu({ pathname, onOpenChange }: ServicesMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const isServicesRoute = pathname.startsWith("/servicios/");

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

  const focusLinkAt = (index: number) => {
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>(linkSelector) ?? []);
    if (links.length === 0) return;
    const wrapped = (index + links.length) % links.length;
    links[wrapped]?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    setOpen(true);
    onOpenChange(true);
    window.requestAnimationFrame(() => {
      focusLinkAt(event.key === "ArrowUp" ? -1 : 0);
    });
  };

  /** Navegación con flechas dentro del panel; Tab lo cierra y sigue el flujo normal. */
  const handlePanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>(linkSelector) ?? []);
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusLinkAt(current + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusLinkAt(current - 1);
        break;
      case "Home":
        event.preventDefault();
        focusLinkAt(0);
        break;
      case "End":
        event.preventDefault();
        focusLinkAt(links.length - 1);
        break;
      case "Tab":
        close();
        break;
      default:
        break;
    }
  };

  // El menú es contextual a la ruta: si la navegación cambia, deja de tener sentido.
  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        aria-label="Servicios (menú)"
        aria-expanded={open}
        aria-controls="services-menu"
        aria-current={isServicesRoute ? "page" : undefined}
        className={clsx(
          "relative min-h-11 py-2 text-sm uppercase tracking-widest font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink",
          isServicesRoute || open ? "text-brand-pink" : "text-brand-light/70 hover:text-brand-light",
        )}
      >
        Servicios
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ x: "-50%" }}
            className="absolute left-1/2 top-full z-[110] w-[min(31rem,calc(100vw-2.5rem))] pt-4"
          >
            {/* Sombra sólida como capa propia: así puede animarse por separado. */}
            <motion.span
              aria-hidden="true"
              variants={reduceMotion ? undefined : shadowVariants}
              className="pointer-events-none absolute inset-x-0 bottom-0 top-4 bg-[#ff2bf9]"
            />

            <motion.div
              ref={panelRef}
              id="services-menu"
              role="region"
              aria-label="Servicios"
              onKeyDown={handlePanelKeyDown}
              variants={reduceMotion ? undefined : panelVariants}
              style={{ originY: 0 }}
              className="software-services-menu relative border-[3px] border-[#111111] bg-[#f3f0e8] text-[#111111]"
            >
              {/* Cabecera tipo "ficha": el detalle que hace distinto a este menú. */}
              <motion.div
                variants={reduceMotion ? undefined : rowVariants}
                className="flex items-center justify-between gap-4 border-b-[3px] border-[#111111] bg-[#111111] px-4 py-2.5"
              >
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.22rem] text-[#f3f0e8]">
                  Servicios
                </span>
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.22rem] text-[#d7ff4f]">
                  {String(serviceLinks.length).padStart(2, "0")} áreas
                </span>
              </motion.div>

              <div className="flex flex-col">
                {serviceLinks.map((service) => (
                  <MenuRow
                    key={service.path}
                    to={service.path}
                    name={service.name}
             
                    status={service.status}
                    active={pathname === service.path}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

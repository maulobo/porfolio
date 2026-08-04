import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import clsx from "clsx";
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = (restoreFocus = false) => {
    setOpen(false);
    setServicesOpen(false);
    onOpenChange(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onOpenChange(next);
    if (!next) setServicesOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const smoothScroll = (window as Window & { lenis?: SmoothScrollController }).lenis;
    const smoothScrollWasStopped = smoothScroll?.isStopped ?? false;
    document.body.style.overflow = "hidden";
    if (!smoothScrollWasStopped) smoothScroll?.stop();

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
    return () => {
      document.body.style.overflow = previousOverflow;
      if (!smoothScrollWasStopped) smoothScroll?.start();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={toggle}
        className="min-h-11 border-2 border-brand-light/35 px-3 py-2 text-xs font-medium uppercase tracking-widest text-brand-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink"
      >
        {open ? "Cerrar menú" : "Abrir menú"}
      </button>

      {open && (
        <div
          ref={panelRef}
          id="mobile-navigation"
          className="software-mobile-navigation fixed inset-x-0 top-[4.5rem] bottom-0 z-[110] overflow-y-auto border-t-2 border-brand-light/20 bg-brand-dark px-6 py-8 shadow-2xl"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
            {primaryLinks.slice(0, 1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => close()}
                aria-current={pathname === link.path ? "page" : undefined}
                className="min-h-11 border-b border-brand-light/15 py-4 text-xl font-medium text-brand-light focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-pink"
              >
                {link.name}
              </Link>
            ))}

            <div className="border-b border-brand-light/15 py-4">
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="mobile-services-menu"
                onClick={() => setServicesOpen((current) => !current)}
                className={clsx(
                  "min-h-11 w-full text-left text-xl font-medium text-brand-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink",
                  pathname.startsWith("/servicios/") && "text-brand-pink",
                )}
              >
                Servicios
              </button>

              {servicesOpen && (
                <div id="mobile-services-menu" className="mt-3 flex flex-col border-l border-brand-pink pl-4">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      onClick={() => close()}
                      aria-current={pathname === service.path ? "page" : undefined}
                      className="min-h-11 py-3 text-sm text-brand-light/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
                    >
                      <span className="block font-medium text-brand-light">{service.name}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-brand-light/55">
                        {service.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {primaryLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => close()}
                aria-current={pathname === link.path ? "page" : undefined}
                className="min-h-11 border-b border-brand-light/15 py-4 text-xl font-medium text-brand-light focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-pink"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

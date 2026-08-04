import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router";
import clsx from "clsx";
import { serviceLinks } from "./navigation";

type ServicesMenuProps = {
  pathname: string;
  onOpenChange: (open: boolean) => void;
};

export default function ServicesMenu({ pathname, onOpenChange }: ServicesMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = (restoreFocus = false) => {
    setOpen(false);
    onOpenChange(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onOpenChange(next);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown") return;

    event.preventDefault();
    setOpen(true);
    onOpenChange(true);
    window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus();
    });
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
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
  }, [open]);

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
        aria-current={pathname.startsWith("/servicios/") ? "page" : undefined}
        className={clsx(
          "relative min-h-11 py-2 text-sm uppercase tracking-widest font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink",
          pathname.startsWith("/servicios/")
            ? "text-brand-pink"
            : "text-brand-light/70 hover:text-brand-light",
        )}
      >
        Servicios
      </button>

      {open && (
        <div
          id="services-menu"
          role="region"
          aria-label="Servicios"
          className="software-services-menu absolute left-1/2 top-full z-[110] mt-3 w-[24rem] -translate-x-1/2 border-2 border-brand-light/30 bg-brand-dark p-3 shadow-[8px_8px_0_#ff2bf9]"
        >
          {serviceLinks.map((service) => (
            <Link
              key={service.path}
              to={service.path}
              aria-current={pathname === service.path ? "page" : undefined}
              onClick={() => close()}
              className="block min-h-11 px-4 py-3 transition-colors hover:bg-brand-light/10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-pink"
            >
              <span className="block text-sm font-medium text-brand-light">{service.name}</span>
              <span className="mt-1 block text-xs leading-relaxed text-brand-light/60">
                {service.description}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

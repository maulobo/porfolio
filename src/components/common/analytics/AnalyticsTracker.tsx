import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { initAnalytics, pageName, track, trackPageView } from "../../../lib/analytics";

const SCROLL_MARKS = [25, 50, 75, 100] as const;

/** Lo que tarda la transición de página en sacar la vista anterior. */
const TRANSITION_MS = 1200;

const CONTACT_CHANNELS: Array<[RegExp, string]> = [
  [/^https:\/\/(wa\.me|api\.whatsapp\.com)\//, "whatsapp"],
  [/^mailto:/, "email"],
  [/^tel:/, "telefono"],
];

/** Nombre de la sección: atributo explícito o, si no, su primer título. */
const sectionName = (section: Element, index: number) => {
  const explicit = section.getAttribute("data-analytics-section");
  if (explicit) return explicit;

  const heading = section.querySelector("h1, h2")?.textContent?.replace(/\s+/g, " ").trim();
  return heading ? heading.slice(0, 80) : `Sección ${index + 1}`;
};

/**
 * Mide navegación sin tocar cada página: páginas vistas, profundidad de
 * scroll, secciones que el usuario llega a ver y clicks a canales de contacto.
 */
const AnalyticsTracker = () => {
  const { pathname } = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    initAnalytics();

    // Un solo listener para todos los WhatsApp/mail del sitio (hero, footer, chatbot…).
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const channel = CONTACT_CHANNELS.find(([pattern]) => pattern.test(href))?.[1];
      if (!channel) return;

      track("Contact Clicked", {
        channel,
        label: link.textContent?.replace(/\s+/g, " ").trim().slice(0, 80),
        page: pageName(window.location.pathname),
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const navigated = previousPath.current !== null && previousPath.current !== pathname;
    // StrictMode monta dos veces en dev: la misma ruta no cuenta doble.
    if (previousPath.current !== pathname) trackPageView(pathname, previousPath.current);
    previousPath.current = pathname;
    const page = pageName(pathname);

    // Profundidad de scroll: cada marca se registra una vez por visita a la página.
    const reached = new Set<number>();
    let frame = 0;

    const measure = () => {
      frame = 0;
      const { scrollHeight } = document.documentElement;
      const viewport = window.innerHeight;
      // Pantallas que no scrollean (/links) no tienen profundidad que medir.
      if (scrollHeight <= viewport + 50) return;

      const percent = ((window.scrollY + viewport) / scrollHeight) * 100;
      SCROLL_MARKS.forEach((mark) => {
        if (percent >= mark - 2 && !reached.has(mark)) {
          reached.add(mark);
          track("Scroll Depth Reached", { depth: mark, page });
        }
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    // Secciones vistas: cuentan cuando cruzan la mitad de la pantalla, así una
    // sección más alta que el viewport también se registra.
    const seen = new Set<string>();
    // Al navegar dentro del sitio, la página anterior sigue montada mientras
    // anima su salida: sus secciones no son de esta página.
    const exiting = navigated ? Array.from(document.querySelectorAll("section")) : [];
    const observed = new WeakSet<Element>(exiting);
    const isCurrent = (section: Element) => !exiting.includes(section as HTMLElement);
    const sections = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const all = Array.from(document.querySelectorAll("section")).filter(isCurrent);
          const index = all.indexOf(entry.target as HTMLElement);
          const name = sectionName(entry.target, index);
          if (seen.has(name)) return;

          seen.add(name);
          track("Section Viewed", { section: name, section_index: index + 1, page });
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    const observeSections = () => {
      document.querySelectorAll("section").forEach((section) => {
        if (observed.has(section)) return;
        observed.add(section);
        sections.observe(section);
      });
    };

    // Las páginas del sitio cargan lazy: las secciones nuevas se observan al montarse.
    const added = new MutationObserver(observeSections);
    observeSections();
    added.observe(document.body, { childList: true, subtree: true });

    // El scroll se mide recién cuando la transición sacó la vista anterior.
    const start = window.setTimeout(() => {
      measure();
      window.addEventListener("scroll", onScroll, { passive: true });
    }, TRANSITION_MS);

    return () => {
      window.clearTimeout(start);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      added.disconnect();
      sections.disconnect();
    };
  }, [pathname]);

  return null;
};

export default AnalyticsTracker;

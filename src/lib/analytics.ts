import type { Mixpanel } from "mixpanel-browser";

/**
 * Tracking de producto con Mixpanel. Vercel Analytics ya cubre visitas, país,
 * dispositivo y bounce: acá sólo van las interacciones (clicks, scroll,
 * secciones vistas, conversiones).
 *
 * El SDK se descarga recién después del primer render para no sumar peso a
 * /links, que llega desde el QR casi siempre en celular. Los eventos que se
 * disparan antes de que cargue quedan en cola.
 */

const TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN as string | undefined;

type Props = Record<string, string | number | boolean | undefined>;

let client: Mixpanel | null = null;
let loading: Promise<Mixpanel | null> | null = null;
const queue: Array<[string, Props]> = [];

const load = () => {
  if (!TOKEN || typeof window === "undefined") return Promise.resolve(null);

  loading ??= import("mixpanel-browser/src/loaders/loader-module-core")
    .then((module) => {
      // El .d.ts del loader re-exporta los tipos sin el default: se tipa a mano.
      const mixpanel = module.default as unknown as Mixpanel;
      mixpanel.init(TOKEN, {
        // Las páginas vistas se mandan a mano en cada cambio de ruta (SPA).
        track_pageview: false,
        autocapture: false,
        persistence: "localStorage",
        debug: import.meta.env.DEV,
      });
      client = mixpanel;
      queue.splice(0).forEach(([event, props]) => mixpanel.track(event, props));
      return mixpanel;
    })
    .catch(() => null);

  return loading;
};

export const initAnalytics = () => {
  void load();
};

export const track = (event: string, props: Props = {}) => {
  if (!TOKEN) return;

  const payload = { path: window.location.pathname, ...props };

  if (client) {
    client.track(event, payload);
    return;
  }

  queue.push([event, payload]);
  void load();
};

/** Nombre legible de cada ruta, para no leer paths crudos en los reportes. */
const PAGE_NAMES: Record<string, string> = {
  "/": "Inicio",
  "/links": "Links (QR)",
  "/servicios": "Servicios (resumen)",
  "/work": "Proyectos",
  "/studio": "Studio",
  "/servicios/software": "Software a medida",
  "/servicios/web": "Sitios web",
  "/servicios/visibilidad": "Visibilidad",
  "/servicios/audiovisual": "Audiovisual",
};

export const pageName = (path: string) =>
  PAGE_NAMES[path] ?? (path.startsWith("/software/panel-crm") ? "Panel CRM demo" : path);

export const trackPageView = (path: string, previousPath: string | null) => {
  track("Page Viewed", {
    path,
    page: pageName(path),
    from_path: previousPath ?? undefined,
    from_page: previousPath ? pageName(previousPath) : undefined,
  });
};

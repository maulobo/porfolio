# Mixpanel

Vercel Analytics ya mide visitas, país, dispositivo, referrer y bounce. Mixpanel
mide **qué hace la gente**: clicks, recorrido entre páginas, scroll y secciones.

## Configuración

1. Crear el proyecto en mixpanel.com (plan Free: 1M eventos/mes).
2. *Project Settings → Access Keys → Project Token*.
3. Agregar el token en `.env` (local) y en Vercel (*Settings → Environment Variables*):

   ```
   VITE_MIXPANEL_TOKEN=xxxxxxxxxxxxxxxx
   ```

   Sin token el tracking queda apagado y el SDK ni siquiera entra al build.
4. Si el proyecto se creó con residencia de datos en la UE, avisar: hay que
   sumar `api_host: "https://api-eu.mixpanel.com"` en `src/lib/analytics.ts`.
5. **QR**: que apunte a `https://<dominio>/links?utm_source=qr&utm_medium=offline`.
   Mixpanel guarda los UTM solo y así se separa el QR del link de la bio de
   Instagram (`?utm_source=instagram&utm_medium=bio`).

## Eventos

Todos llevan `path` (ruta donde ocurrió).

| Evento | Cuándo | Propiedades |
| --- | --- | --- |
| `Page Viewed` | Cada cambio de ruta | `page`, `from_path`, `from_page` |
| `Links Button Clicked` | Click en un botón de `/links` | `button`, `position` (1–4), `destination` |
| `Service Card Clicked` | Click en una tarjeta de `/servicios` | `service`, `position`, `destination` |
| `Scroll Depth Reached` | 25 / 50 / 75 / 100 % de la página | `depth`, `page` |
| `Section Viewed` | Una sección cruza el centro de la pantalla | `section` (su título), `section_index`, `page` |
| `Contact Clicked` | Cualquier link a WhatsApp / mail / teléfono | `channel`, `label`, `page` |
| `Chatbot Opened` | Se abre el chatbot | — |
| `Contact Form Submitted` | El formulario del footer se envía bien | `form` |

Botones de `/links`: 1 WhatsApp · 2 Ver servicios · 3 Ver trabajos · 4 Ver web completa.

## Board "QR / Links"

*Boards → New Board*, y agregar estos reportes (*Add → Insights / Funnels*):

1. **Visitantes únicos de /links** — Insights · `Page Viewed` · filtro `path = /links`
   · medida *Unique users* · línea por día.
2. **Clicks por botón** — Insights · `Links Button Clicked` · *Total events* ·
   breakdown `button` · gráfico de barras.
3. **CTR por botón** — Insights · fórmula: A = `Links Button Clicked` (unique,
   breakdown `button`), B = `Page Viewed` path=/links (unique) → `A / B`.
4. **Funnel QR → contacto** — Funnels · `Page Viewed` (path=/links) →
   `Links Button Clicked` → `Contact Clicked`. Ventana 30 min.
5. **Funnel QR → servicio** — Funnels · `Page Viewed` (path=/links) →
   `Links Button Clicked` (button = Ver servicios) → `Service Card Clicked`
   (breakdown `service`).
6. **QR vs bio** — Insights · `Page Viewed` path=/links · breakdown `utm_source`.

## Board "Sitio web"

1. **Páginas más vistas** — Insights · `Page Viewed` · unique users · breakdown `page`.
2. **Recorrido** — *Flows* · evento inicial `Page Viewed`, breakdown `page`:
   muestra desde dónde llegan y a dónde van.
3. **Hasta dónde scrollean** — Insights · `Scroll Depth Reached` · unique users ·
   breakdown `depth` · filtro por `page` (uno por página clave: Inicio, Software).
4. **Secciones vistas** — Insights · `Section Viewed` · unique users · breakdown
   `section` · filtro `page = Inicio`. Ordenado por `section_index` muestra
   dónde abandona la gente.
5. **Contactos por canal y página** — Insights · `Contact Clicked` · breakdown
   `channel` y `page`.
6. **Interés por servicio** — Insights · `Page Viewed` · filtro `path` contiene
   `/servicios/` · breakdown `page`.
7. **Conversión del sitio** — Funnels · `Page Viewed` → `Contact Clicked` o
   `Contact Form Submitted`. Breakdown por `page` del primer paso para ver qué
   página de entrada convierte más.
8. **Chatbot** — Insights · `Chatbot Opened` vs `Contact Clicked` (label del bot).

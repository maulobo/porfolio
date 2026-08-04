# Página de Software a Medida — Diseño

**Fecha:** 2026-08-04
**Estado:** Aprobado en la sesión de diseño
**Alcance:** Nueva página comercial de software, navegación de Servicios y conexión con la demo existente

## 1. Objetivo

Crear una página dedicada a software a medida que posicione esta capacidad como una oferta central de SmartCloud Studio. La página debe explicar qué construye el estudio, qué necesidades resuelve, cómo trabaja y qué puede hacer la persona a continuación.

El trabajo incluye:

- agregar `Servicios` al navbar como desplegable;
- crear la ruta pública `/servicios/software`;
- presentar las tres capturas de `public/software` como ejemplo de software, no como caso oficial de cliente;
- conectar la página con la demostración existente en `/software/panel-crm`;
- sostener las reglas de marca, tono y UX writing definidas en los documentos fuente.

No se crearán en este alcance páginas completas para los otros servicios. Mientras esas páginas no existan, sus entradas del desplegable llevarán a los bloques correspondientes de la home.

## 2. Fuentes y principios rectores

La página aplica las directivas de:

- `docs/superpowers/Estrategia de posicionamiento y reescritura para SmartCloud Studio.pdf`;
- `docs/superpowers/IDENTIDAD DE LA MARCA- DEL ESTUDIO.docx`;
- `docs/superpowers/Prompt maestro de comunicación y UX Writing — SmartCloud Studio.pdf`.

Principios obligatorios:

- El software ocupa una posición prioritaria.
- El diseño se presenta como parte integrada del software y la experiencia.
- La voz es profesional, clara, directa y cercana, con voseo rioplatense cuidado.
- Cada bloque comunica una idea principal.
- Los servicios se describen por su utilidad y no por una lista de tecnologías.
- No se prometen métricas, crecimiento, eficiencia ni resultados no comprobados.
- La inteligencia artificial aparece como herramienta cuando aporta valor, nunca como identidad principal.
- La tecnología funciona como respaldo técnico y no como argumento promocional vacío.
- El ejemplo visual no se presenta como un caso oficial de ITM ni atribuye resultados al cliente que aparece en las capturas.

## 3. Dirección creativa aprobada

### Concepto

**Evidencia en primer plano.** El visitante debe entender desde la primera pantalla que SmartCloud construye software real. El hero presenta una propuesta clara y las capturas emergen como el objeto principal de la composición.

### Tesis del hero

**Etiqueta:** Software a medida · Diseño con identidad
**H1:** La operación necesita su propio sistema.
**Bajada:** Desarrollamos plataformas, paneles e integraciones alrededor de procesos reales. La experiencia visible y la lógica que la sostiene forman parte del mismo proyecto.
**CTA primario:** Iniciar un proyecto
**CTA secundario:** Ver demostración

El CTA primario dirige al canal de contacto que ya utiliza el sitio. El CTA secundario abre `/software/panel-crm` en una pestaña nueva para separar con claridad la demo del sitio comercial.

### Sistema visual

La página continúa la identidad neobrutalista ya presente en Home y Proyectos:

- fondo oscuro principal: `#111111`;
- fondo editorial: `#f3f0e8`;
- blanco: `#ffffff`;
- rosa de marca: `#ff2bf9`;
- lima de contraste: `#d7ff4f`;
- bordes negros definidos y sombras desplazadas;
- tipografía Inter para títulos y cuerpo;
- rol monoespaciado del sistema actual para etiquetas, estados y acciones.

La decisión visual distintiva será una pila de ventanas de software: las capturas se superponen con profundidad corta y sombras de color, como interfaces activas sobre una mesa de trabajo. Una línea de sistema rosa conecta el hero con el comienzo de la narrativa, reforzando la idea de continuidad sin convertirse en decoración repetitiva.

## 4. Navegación

### Estructura principal

El navbar público queda compuesto por:

1. Inicio
2. Servicios
3. Proyectos
4. Studio

`Servicios` es un control de menú, no una ruta vacía.

### Entradas del desplegable

| Entrada | Destino durante este alcance |
| --- | --- |
| Sitios web y landings | `/#servicios-web` |
| Software a medida | `/servicios/software` |
| Visibilidad en buscadores e IA | `/#servicios-visibilidad` |
| Video y motion | `/#servicios-audiovisual` |

La home incorporará los identificadores necesarios en las tarjetas o bloques correspondientes. Los enlaces temporales no se mostrarán como “próximamente” ni desembocarán en páginas vacías.

### Comportamiento desktop

- Abre y cierra mediante click.
- También abre con `Enter`, `Space` y `ArrowDown` cuando el control tiene foco.
- `Escape` cierra el menú y devuelve el foco al control.
- Un click fuera del menú lo cierra.
- Seleccionar un enlace cierra el menú.
- Mientras el menú está abierto, el navbar no se oculta por scroll.
- `aria-expanded`, `aria-controls` y el nombre accesible reflejan el estado real.
- El estado activo se aplica a Servicios y Software cuando la ubicación es `/servicios/software`.

### Comportamiento mobile

- El navbar se convierte en un botón de menú compacto.
- Dentro del panel mobile, `Servicios` funciona como acordeón.
- Las cuatro entradas mantienen los mismos destinos.
- El panel bloquea el scroll del documento mientras está abierto y lo restablece al cerrar o navegar.
- El foco permanece dentro del panel hasta cerrarlo.
- `Escape` cierra primero el acordeón, si corresponde, y luego el panel.

## 5. Arquitectura de la página

### 5.1 Hero y evidencia inicial

Presenta el posicionamiento, las dos acciones y una composición con `public/software/1.png` y `public/software/2.png`. Las imágenes tienen texto alternativo descriptivo y no repiten el contenido del copy.

### 5.2 Cuándo puede ser útil

**Título:** Cuando las herramientas existentes ya no acompañan el trabajo.
**Cuerpo:** La necesidad puede aparecer como información dispersa, tareas manuales, falta de seguimiento o sistemas que no reflejan la forma real de operar.

Indicadores:

- Información fragmentada
- Tareas repetitivas
- Poca trazabilidad
- Procesos propios

El texto describe situaciones sin descalificar la operación del cliente.

### 5.3 Qué construimos

**Título:** Un sistema definido alrededor del problema.
**Cuerpo:** El alcance se decide según el contexto: desde una herramienta puntual hasta una plataforma que conecta distintas áreas de la operación.

Capacidades:

- Paneles de gestión
- Plataformas internas
- Dashboards
- Integraciones
- Automatizaciones
- Aplicaciones web

### 5.4 Ejemplo de software

**Etiqueta:** Ejemplo de software
**Título:** Una interfaz para ver, decidir y actuar.
**Cuerpo:** Mostramos una plataforma operativa de demostración. Las pantallas permiten recorrer información comercial, equipos y estados de trabajo.

La galería usa:

- `public/software/1.png`: Resumen operativo
- `public/software/2.png`: Seguimiento comercial
- `public/software/3.png`: Gestión de equipos

La sección incluye una acción explícita: **Abrir demostración**. No usa las palabras “caso”, “cliente” o “resultado” y no afirma que ITM haya contratado o aprobado la publicación.

### 5.5 Cómo trabajamos

**Título:** Decisiones claras en cada etapa.
**Cuerpo:** El proceso se adapta al alcance, pero mantiene responsables, entregables e instancias de revisión.

Etapas:

1. **Diagnóstico:** Objetivos, usuarios, procesos y restricciones.
2. **Definición:** Alcance, arquitectura, experiencia y plan.
3. **Producción:** Diseño, desarrollo e integraciones.
4. **Pruebas:** Flujos, estados y escenarios de uso.
5. **Publicación:** Puesta en marcha y acompañamiento.
6. **Evolución:** Documentación y mejoras siguientes.

### 5.6 Lo visible y lo técnico

**Título:** La interfaz es solo una parte del sistema.
**Cuerpo:** Trabajamos la experiencia, la lógica, los datos y las integraciones como una misma solución. La tecnología aparece como respaldo, no como argumento vacío.

Capas:

- UX/UI
- Backend
- Datos
- Integraciones
- Infraestructura
- Continuidad

### 5.7 Preguntas frecuentes

La sección utiliza un acordeón accesible y responde preguntas reales sin inventar plazos o precios:

1. **¿Qué tipo de software desarrollan?** Paneles de gestión, plataformas internas, aplicaciones web, automatizaciones e integraciones definidas según el proceso que se necesita resolver.
2. **¿Cómo se define el alcance?** Primero relevamos objetivos, usuarios, información disponible, restricciones y prioridades. Con ese contexto proponemos una primera versión, entregables y etapas.
3. **¿Pueden integrarse con sistemas existentes?** Sí, cuando los sistemas ofrecen mecanismos de integración compatibles. La viabilidad se evalúa durante el diagnóstico técnico.
4. **¿Qué ocurre después de publicar?** Documentamos lo construido, acompañamos la puesta en marcha y definimos con el cliente las mejoras o el soporte siguiente.

### 5.8 Cierre

**Título:** Conversemos sobre el sistema que necesitás construir.
**Cuerpo:** No necesitás llegar con todo definido. Empezamos por entender el contexto, ordenar prioridades y proponer un punto de partida.
**CTA:** Contanos tu proyecto

La página termina con el footer público existente, adaptando únicamente el tipo visual que mejor garantice contraste con el cierre.

## 6. Componentes y límites

La implementación se divide en unidades enfocadas:

- `Navbar`: estado global de navegación pública, apertura/cierre y rutas.
- `ServicesMenu`: contenido y comportamiento accesible del desplegable desktop.
- `MobileNavigation`: panel mobile y acordeón de Servicios.
- `Software`: composición de la página y metadata.
- `softwareContent`: copy, capacidades, etapas y preguntas frecuentes como datos tipados.
- `SoftwareHero`: propuesta, CTAs y composición inicial de capturas.
- `SoftwareUseCases`: situaciones que originan la necesidad.
- `SoftwareCapabilities`: alcance y tipos de solución.
- `SoftwareShowcase`: galería del ejemplo y enlace a la demo.
- `SoftwareProcess`: seis etapas de trabajo.
- `SoftwareLayers`: relación entre experiencia y estructura técnica.
- `SoftwareFaq`: acordeón de preguntas frecuentes.
- `SoftwareClosing`: CTA final.

El contenido se mantiene separado de la presentación para poder revisar copy y consistencia sin recorrer JSX extenso. La demo CRM conserva su layout y su carga diferida actual; no se modifica como parte de esta página.

## 7. Movimiento

El hero contiene el único momento coreografiado principal:

1. aparece la etiqueta y luego el titular;
2. entra la bajada y las acciones;
3. las dos capturas suben desde fuera del encuadre y forman la pila de ventanas;
4. al comenzar el scroll, una línea visual conduce hacia la primera sección.

El resto de los bloques usa revelados breves de opacidad y desplazamiento. No habrá parallax constante, animaciones por cada palabra, scroll secuestrado ni efectos que dificulten leer las capturas.

Con `prefers-reduced-motion: reduce`:

- el contenido aparece en su posición final;
- no se aplican desplazamientos dependientes del scroll;
- los menús conservan transiciones instantáneas o mínimas;
- ninguna función depende de una animación para comprender el estado.

## 8. Responsive

### Desktop y tablet horizontal

- Hero con título amplio y pila de capturas superpuestas.
- Secciones informativas en una matriz de etiqueta lateral y contenido principal.
- Galería del ejemplo en tres columnas.
- Proceso en tres columnas por dos filas.

### Mobile y tablet vertical

- Hero en una sola columna.
- Las capturas mantienen superposición leve, con ancho limitado al viewport y sin recortar información esencial.
- Las secciones laterales se convierten en bloques verticales.
- Galería y proceso pasan a una columna.
- CTAs ocupan el ancho disponible cuando mejora la zona táctil.
- No existe desplazamiento horizontal en 320 px de ancho.

## 9. Carga, errores y estados

- Las imágenes del hero se cargan de forma prioritaria para evitar un primer pantallazo vacío.
- Las capturas del showcase usan carga diferida y dimensiones explícitas para evitar saltos de layout.
- Si una captura no carga, su figura conserva el título descriptivo y un fondo neutro; la navegación y el CTA de demo siguen disponibles.
- Si JavaScript no ejecuta animaciones, todo el contenido permanece visible mediante estilos base.
- La ruta pública desconocida conserva el comportamiento actual del sitio; este alcance no agrega una página 404 global.
- Los enlaces externos o de demostración incluyen `rel="noopener noreferrer"`.

## 10. Metadata y semántica

- `document.title`: `Software a medida | SmartCloud Studio`
- descripción: `Desarrollamos plataformas, paneles, automatizaciones e integraciones definidas alrededor de procesos reales, con experiencia, lógica y ejecución responsable.`
- un único `h1` en el hero;
- orden de encabezados secuencial;
- landmarks `header`, `nav`, `main`, `section` y `footer` donde corresponda;
- preguntas frecuentes implementadas con botones y regiones identificadas, sin depender del color o la posición.

También se agregará `/servicios/software` a `public/sitemap.xml`.

## 11. Criterios de aceptación

### Navegación

- Servicios aparece en el navbar desktop y mobile.
- El menú funciona con mouse, teclado y tecnología asistiva.
- Software navega a `/servicios/software`.
- Los otros servicios llegan al bloque correcto de la home.
- El navbar no se oculta mientras algún menú está abierto.

### Página

- La ruta renderiza dentro del sitio público, con navbar, transición, chatbot y footer.
- Las tres capturas aparecen como ejemplo, sin presentarse como caso oficial.
- El enlace de demostración abre `/software/panel-crm` fuera del layout comercial.
- Todos los textos respetan el sistema verbal aprobado.
- La página funciona a partir de 320 px sin overflow horizontal.

### Calidad

- Las pruebas automatizadas cubren rutas, menú desktop, menú mobile, Escape, click exterior, estado activo y acordeón FAQ.
- El proyecto compila sin errores.
- El lint no introduce errores nuevos.
- Se revisan visualmente desktop y mobile.
- Se verifica navegación con teclado y movimiento reducido.

## 12. Fuera de alcance

- Convertir el ejemplo en un caso oficial de ITM.
- Publicar métricas o resultados del sistema mostrado.
- Rediseñar o ampliar la demo CRM.
- Crear páginas completas para web, visibilidad o audiovisual.
- Cambiar la identidad global de Home, Studio o Proyectos.
- Incorporar un CMS o una fuente de contenido remota.

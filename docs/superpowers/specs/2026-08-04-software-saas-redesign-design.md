# Rediseño SaaS de Software a Medida

**Fecha:** 2026-08-04  
**Estado:** Aprobado durante la revisión visual  
**Alcance:** Replanteo visual y compositivo de `/servicios/software`

## 1. Motivo del rediseño

La primera versión comunica correctamente el servicio y mantiene la identidad cromática de SmartCloud, pero presenta tres problemas visuales:

- las capturas se recortan mediante `object-fit: cover` y dejan de mostrar el software como un producto completo;
- la superposición del hero y la galería de miniaturas compiten con la información contenida en las interfaces;
- los eyebrows y las etiquetas repetidas producen una apariencia de plantilla y agregan jerarquía decorativa sin aportar significado.

El rediseño debe conservar el contenido comercial, la ruta, la navegación y la accesibilidad ya implementados, pero presentar el servicio con una narrativa visual propia de un SaaS contemporáneo.

## 2. Dirección aprobada

### Concepto

**El producto demuestra la capacidad.** La página se organiza alrededor de capturas completas y legibles. Cada pantalla aparece como evidencia de lo que SmartCloud puede diseñar y construir, no como una miniatura decorativa ni como un caso oficial de cliente.

La referencia estructural proviene de páginas SaaS que explican una idea y muestran inmediatamente la interfaz relacionada. La identidad visual sigue siendo la de SmartCloud: fondo editorial claro, negro, rosa y lima; bordes definidos; tipografía directa; y acentos neobrutalistas usados con moderación.

### Principios

- No se usan eyebrows en ninguna sección.
- Ninguna captura se recorta con `object-fit: cover`.
- El producto tiene más peso visual que las tarjetas o los adornos.
- Los títulos, el espacio y la alternancia de bloques construyen la jerarquía.
- Rosa y lima señalan acciones o enmarcan el producto; no rellenan cada componente.
- Las sombras duras se reservan para el escenario principal y los CTA.
- La página evita métricas, testimonios o resultados que no estén respaldados.

## 3. Sistema visual

### Color

- **Tinta:** `#111111`
- **Papel:** `#f3f0e8`
- **Blanco:** `#ffffff`
- **Rosa SmartCloud:** `#ff2bf9`
- **Lima de contraste:** `#d7ff4f`
- **Gris de interfaz:** derivado neutro para marcos y superficies secundarias

No se agregan gradientes de estética “tech” ni una paleta SaaS ajena a la marca.

### Tipografía

Se mantiene la familia tipográfica existente para no romper la identidad general del sitio. La diferencia de jerarquía se obtiene con escala, peso, ancho de línea y espacio, no con etiquetas en mayúsculas. El monoespaciado queda limitado a controles o información verdaderamente funcional.

### Elemento distintivo

La página se recuerda por un **escenario de producto de ancho completo**: una captura completa dentro de un marco sobrio, apoyada sobre dos planos de color rosa y lima apenas desplazados. Los planos sugieren la identidad neobrutalista sin tapar ni inclinar la interfaz.

## 4. Composición de la página

### 4.1 Hero

El hero conserva el mensaje principal y los dos CTA, pero elimina el eyebrow y la pila de capturas.

La composición tendrá dos niveles:

1. bloque de mensaje con título, bajada y acciones;
2. captura `1.png` completa, inmediatamente debajo, dentro del escenario de producto.

En desktop el contenido usa un ancho editorial amplio y la captura ocupa casi todo el contenedor. En mobile se mantiene la proporción original y se permite desplazamiento horizontal únicamente si fuera imprescindible para conservar legibilidad; la opción preferida es reducirla completa dentro del viewport.

### 4.2 Situaciones y capacidades

Los bloques “Cuándo puede ser útil” y “Qué construimos” dejan de usar una etiqueta lateral y una cuadrícula de chips. Cada uno presenta:

- un título claro;
- un párrafo breve;
- una lista tipográfica simple de situaciones o capacidades.

La alternancia de fondo claro y oscuro se conserva para sostener el ritmo de la página. Los elementos de lista no simulan botones ni tarjetas interactivas.

### 4.3 Recorrido del producto

La antigua galería de tres columnas se reemplaza por dos bloques de producto alternados:

- `2.png`, completa, acompaña el mensaje sobre seguimiento comercial e información centralizada;
- `3.png`, completa, acompaña el mensaje sobre operación, equipos y estados de trabajo.

En desktop cada bloque combina texto y captura en proporción aproximada 35/65, alternando izquierda y derecha. En mobile el texto precede siempre a la captura. Las imágenes usan `width: 100%`, `height: auto` y `object-fit: contain` cuando corresponda.

El enlace “Abrir demostración” aparece al final del recorrido y no se repite en cada pantalla.

### 4.4 Proceso

Las seis etapas siguen siendo una secuencia real, por lo que conservan numeración. Se presentan como un recorrido vertical u horizontal según el viewport, con divisores y espacio, sin seis tarjetas pesadas.

### 4.5 Capas técnicas

“La interfaz es solo una parte del sistema” se convierte en una composición editorial de texto y lista. Las capas se leen como partes relacionadas de una solución, no como chips independientes.

### 4.6 Preguntas frecuentes y cierre

FAQ mantiene el acordeón accesible, pero elimina la repetición “Preguntas frecuentes” como eyebrow y título. El bloque comienza directamente con el título.

El cierre conserva el rosa de marca y un CTA visible. Se reduce la cantidad de bordes y sombras para que el final sea enérgico sin competir con el escenario de producto.

## 5. Imágenes

Las tres capturas conservan su relación de aspecto original:

| Archivo | Dimensiones | Uso |
| --- | ---: | --- |
| `public/software/1.png` | 2996 × 1540 | Escenario principal del hero |
| `public/software/2.png` | 2998 × 1548 | Bloque de seguimiento comercial |
| `public/software/3.png` | 3006 × 1390 | Bloque de operación y equipos |

Reglas obligatorias:

- no usar alturas fijas que corten el contenido;
- no usar `object-fit: cover`;
- no desplazar el encuadre mediante `object-position`;
- no superponer una captura sobre otra;
- mantener bordes, texto y controles visibles dentro de la imagen;
- permitir abrir la demo desde una acción clara, sin convertir las capturas en enlaces ambiguos.

## 6. Movimiento

El movimiento se concentra en una entrada breve del hero y el escenario principal. Los bloques siguientes usan revelados discretos, si ya forman parte del sistema actual. No hay parallax, inclinación de capturas ni animaciones que dificulten leer el software.

Con `prefers-reduced-motion: reduce`, todos los elementos aparecen en su posición final y ninguna transición es necesaria para comprender la página.

## 7. Responsive y accesibilidad

- Las capturas se muestran completas en desktop, tablet y mobile.
- El texto mantiene longitudes legibles y no se superpone con las imágenes.
- Los CTA conservan un área interactiva mínima de 44 × 44 px.
- El orden visual coincide con el orden del documento.
- Los títulos mantienen una jerarquía semántica consistente.
- Los textos alternativos describen la función visible de cada pantalla sin atribuirla a un cliente real.
- El contraste y los estados de foco continúan cumpliendo las pautas existentes.

## 8. Límites del cambio

El rediseño no modifica:

- la ruta `/servicios/software`;
- el desplegable de Servicios del navbar;
- la demo `/software/panel-crm`;
- el canal de contacto;
- la metadata esencial;
- el contenido estratégico aprobado, salvo ajustes breves necesarios para vincular cada captura con una capacidad.

## 9. Criterios de aceptación

El rediseño se considera correcto cuando:

1. no existe ningún eyebrow visual o semántico en la página;
2. las tres capturas se ven completas y sin recortes en los viewports verificados;
3. el hero contiene una sola captura protagonista;
4. las otras dos capturas aparecen individualmente dentro del recorrido del producto;
5. la página conserva los colores y el carácter de SmartCloud sin parecer una plantilla SaaS genérica;
6. proceso, capacidades y capas usan una presentación más ligera que la cuadrícula de tarjetas anterior;
7. navegación, CTA, FAQ, foco de teclado y reducción de movimiento siguen funcionando;
8. pruebas, lint y build finalizan correctamente.

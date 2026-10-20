# SmartCloud Studio — Actualización de `/servicios/web`

> Documento de implementación y copy para adaptar la sección de desarrollo web al diseño actual de SmartCloud Studio.
>
> Ruta objetivo: `https://www.smartcloudstudio.com/servicios/web`
>
> Referencia de tono y coherencia de marca: `https://www.smartcloudstudio.com/servicios/software`

## Objetivo

Actualizar el contenido de la ruta `/servicios/web` para comunicar cómo trabaja SmartCloud Studio al crear sitios web personalizados: escucha al cliente, investigación, definición de objetivos, diseño UX/UI, desarrollo, revisión y mejora.

La página debe sentirse parte del sitio actual, no como un rediseño independiente. El mensaje tiene que ser claro, humano, profesional y concreto; sin frases genéricas, promesas vacías ni exceso de información.

## Instrucciones de diseño e implementación

### Respetar el diseño existente

- Revisar el código y los componentes que ya se utilizan en `/servicios/web`, junto con `/servicios/software` y el layout global del sitio, antes de modificar nada.
- **Mantener el lenguaje visual actual**: tipografía, jerarquías, anchos, espaciados, botones, colores, transiciones, navegación y footer.
- **Reutilizar los componentes y estilos existentes** siempre que sea posible. No introducir otro design system ni rehacer innecesariamente la arquitectura.
- Adaptar el copy a los componentes existentes. Si alguna sección actual no aporta, simplificarla en lugar de agregar bloques por agregar.
- Mantener un diseño editorial, con respiración visual y textos fáciles de escanear. Evitar tarjetas y recuadros en exceso.
- Conservar la experiencia mobile-first y verificar el resultado en dispositivos móviles y desktop.

### Fondo GridScan continuo en toda la ruta

**`GridScan` debe ser el único fondo visual de la página, visible de manera continua a medida que se hace scroll, del primer bloque al último.**

- Reutilizar el componente `GridScan` existente y su configuración visual ya aprobada en el sitio; no recrearlo ni inventar un efecto distinto.
- Montar una sola instancia de `GridScan` como capa de fondo común para toda la ruta, detrás del contenido. El componente no debe reiniciarse o repetirse en cada sección.
- No sustituir ese fondo por colores sólidos, gradientes, imágenes de fondo o nuevos patrones en secciones intermedias. Se pueden usar overlays muy sutiles únicamente si ya forman parte del diseño y son necesarios para legibilidad, sin ocultar la continuidad de `GridScan`.
- Asegurar que el contenido, header, CTAs y footer se mantengan correctamente por encima del fondo y que el fondo no intercepte clics, scroll ni foco de teclado.
- Evitar problemas de `z-index`, alturas fijas, recortes por `overflow`, saltos durante la navegación o remounts innecesarios.
- Conservar la fluidez en mobile; evaluar el rendimiento de la animación y respetar `prefers-reduced-motion` sin perder una apariencia coherente.
- Si `GridScan` ya está gestionado globalmente por el layout, **no duplicarlo**: extender su cobertura visual a toda esta ruta.

### Reglas editoriales

- En el sitio visible, usar **título y párrafo sencillo** por bloque. Mantener el texto justo y necesario.
- **No usar números en el copy visible**: ni pasos numerados, ni indicadores `01 / 02 / 03 / 04`, ni porcentajes de relleno.
- **No usar highlights**: eliminar palabras subrayadas, marcadas, con color de acento dentro del párrafo, negritas internas decorativas o efectos de texto resaltado. La jerarquía debe surgir de títulos y párrafos.
- Evitar expresiones como «soluciones innovadoras», «llevamos tu negocio al siguiente nivel» o «diseños únicos» si no explican nada concreto.
- No bombardear con información técnica, frameworks, siglas o argumentos de venta repetidos.
- Utilizar español natural, cercano y profesional, con voseo cuando corresponda.
- Los títulos y párrafos que siguen son el **copy final sugerido para la interfaz**. Los títulos técnicos de este documento son solo instrucciones, no deben mostrarse como contenido de la web.

---

# Copy final visible

## Hero

**Eyebrow:** Desarrollo web a medida

### Tu web empieza mucho antes del diseño.

Nos involucramos en tu negocio para entender qué hacés, a quién querés llegar y qué necesitás resolver. Con esa información creamos un sitio que comunica tu identidad y facilita lo que tus clientes vienen a hacer.

**CTA principal:** Hablemos de tu proyecto

**CTA secundario:** Ver nuestro trabajo

## Nuestra manera de trabajar

### Para comunicar bien tu negocio, primero tenemos que entenderlo.

Escuchamos tus ideas, conocemos tus desafíos e investigamos tu sector y a tus usuarios. Así podemos decidir qué contenido es importante, cómo organizarlo y qué necesita realmente tu sitio.

## Qué desarrollamos

### Cada negocio necesita una web diferente.

No partimos de una fórmula única. Creamos desde sitios institucionales y landing pages hasta catálogos, tiendas online y experiencias interactivas. La estructura y las funcionalidades dependen de los objetivos de cada proyecto.

> Si el componente existente de servicios necesita tarjetas, mantener la misma línea visual y utilizar estos textos breves:
>
> **Sitios institucionales:** Presentamos tu empresa de forma clara, con una identidad que te represente.
>
> **Landing pages:** Diseñamos recorridos enfocados en una campaña, lanzamiento u objetivo concreto.
>
> **Catálogos y tiendas online:** Organizamos productos y compras para que encontrar y elegir sea sencillo.
>
> **Experiencias interactivas:** Usamos el diseño y el movimiento para contar historias sin dificultar la navegación.
>
> Estos textos son opcionales según la estructura actual; no agregar una cuadrícula nueva si la ruta ya resuelve este contenido de otra manera.

## Proceso de trabajo

### De una idea a una web que funciona.

Investigamos, definimos prioridades, organizamos contenidos, diseñamos y desarrollamos. Durante el proceso revisamos cada decisión con vos, probamos cómo funciona el sitio y preparamos su publicación.

> Si el componente actual separa el proceso en elementos, usar títulos simples, sin números y con una frase breve por elemento:
>
> **Conocemos tu proyecto.** Escuchamos tus objetivos y entendemos qué necesitás resolver.
>
> **Definimos el camino.** Organizamos contenidos y recorridos en función de tus usuarios.
>
> **Diseñamos y desarrollamos.** Convertimos la idea en una experiencia clara, visual y funcional.
>
> **Revisamos y publicamos.** Probamos el sitio y ajustamos los detalles antes de lanzarlo.

## Experiencia de usuario — reemplazo del bloque de UX actual

### Una buena web se entiende en segundos.

Hoy muchas personas no leen todo: recorren la pantalla, buscan respuestas rápidas y se van si algo resulta confuso. Por eso diseñamos sitios fáciles de entender y recorrer, donde encontrar información o completar una acción no requiera esfuerzo. La estética importa, pero la experiencia de quien está del otro lado, todavía más.

> Este bloque **reemplaza** el título «El diseño se ve. El trabajo detrás se siente.» No conservar el título anterior ni acompañarlo de otro encabezado. Evitar estadísticas de retención no verificadas o frases que culpen al usuario por no leer.

## Cierre y contacto

### Construyamos una web que tenga sentido para tu negocio.

No necesitás tener todo resuelto para empezar. Contanos qué hacés, qué te preocupa o qué querés mejorar. Te ayudamos a encontrar el punto de partida.

**CTA principal:** Contanos tu proyecto

---

## Criterios de adaptación del contenido a la ruta actual

- Priorizar **reemplazar el texto** dentro de los componentes y bloques que ya existen.
- Usar el hero actual con la nueva frase principal y el párrafo introductorio.
- Integrar «Nuestra manera de trabajar» y «Proceso de trabajo» respetando el ritmo y la cantidad de secciones del sitio; si se superponen visual o conceptualmente, consolidarlas.
- El apartado «Qué desarrollamos» puede resolverse con el componente existente para servicios; las descripciones de tarjetas son alternativas, no un requisito de sumar una sección extra.
- Reemplazar por completo el bloque UX anterior con el nuevo título y párrafo.
- Preservar el CTA final, las formas de contacto y los enlaces internos funcionales existentes. No inventar destinos o enlaces.
- Evitar que el mismo mensaje se repita en hero, proceso y cierre.

## Revisión final antes de dar por terminado el cambio

- [ ] `/servicios/web` mantiene la identidad visual y los componentes del sitio actual.
- [ ] `GridScan` permanece como **un mismo fondo continuo durante todo el scroll**, sin duplicaciones ni cortes visuales.
- [ ] No hay números de pasos, cifras decorativas ni highlights en el copy visible.
- [ ] Todos los bloques tienen títulos y párrafos simples, cortos y fáciles de entender.
- [ ] El bloque UX habla de atención breve, lectura rápida, claridad y facilidad de uso.
- [ ] No se agregaron elementos visuales, secciones o tecnologías que no aporten al objetivo.
- [ ] Los botones conservan navegación funcional y propósito claro.
- [ ] Se verificó legibilidad, contraste, interacción y rendimiento en mobile y desktop.
- [ ] Se mantienen SEO básico, semántica de encabezados y accesibilidad existentes.

## Resultado esperado

Una página de desarrollo web que se lea rápido, refleje el proceso real de SmartCloud Studio y muestre que cada sitio nace de entender el negocio y a sus usuarios. Visualmente debe parecer una evolución natural de la ruta existente, siempre con `GridScan` como fondo continuo.

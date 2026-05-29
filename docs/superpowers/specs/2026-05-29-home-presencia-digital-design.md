# Home Presencia Digital Completa Design

## Goal

Redesign the home so visitors quickly understand what SC Studio does while keeping a premium, visual, Awwwards-inspired experience.

The main message is:

> Construimos presencia digital completa para negocios que quieren crecer online.

The page should make the offer clear in the first screen: SC Studio combines web, software, content, motion, SEO, and GEO into one connected digital presence.

## Audience

The primary audience is businesses that need a serious digital presence. They may need a website, landing page, ecommerce, internal software, video content, SEO/GEO, or a mix of those services.

The home should feel premium enough for ambitious brands, but clear enough for a business owner or marketing lead to understand the offer in seconds.

## Positioning

SC Studio should be positioned as a creative-tech studio with premium execution:

- Clear and commercial in the message.
- Editorial and memorable in the visual experience.
- Human and direct in the copy.
- Integrated in the offer: no loose list of unrelated services.

Core idea:

> No hacemos piezas sueltas. Construimos presencia digital completa.

## Information Architecture

### Hero

Purpose: explain the offer immediately and create a strong first impression.

Content:

- Headline: "Construimos presencia digital completa para negocios que quieren crecer online."
- Supporting copy: "Diseño, software, contenido y posicionamiento trabajando como una sola experiencia."
- Primary CTA: "Hablemos"
- Secondary CTA: "Ver proyectos"
- Keep or evolve the current 3D scene as the main visual layer.

The hero should not be only atmospheric. It must include visible, readable copy above or integrated with the visual scene.

### Narrative Section

Purpose: convert the current poetic scroll phrase into a clearer strategic statement.

Proposed copy:

> Tu negocio no necesita piezas sueltas. Necesita una experiencia digital que se vea bien, funcione bien y sea fácil de encontrar.

This section can keep the existing word-by-word scroll reveal, but the content should explain the studio's value.

### Service System

Purpose: group the offer into four understandable pillars instead of showing a long service list.

Pillars:

1. Web
   - Websites, landing pages, ecommerce, UX/UI.
   - Message: "Experiencias rápidas, visuales y pensadas para convertir."

2. Software
   - Platforms, backoffices, automations, custom tools.
   - Message: "Herramientas digitales para operar, vender y escalar mejor."

3. Content
   - Video editing, motion, animations, visual pieces for launches and social channels.
   - Message: "Contenido que explica, muestra y hace que la marca se mueva."

4. Growth
   - SEO, GEO, structure for search engines and AI discovery.
   - Message: "Estructura y contenido para que te encuentren donde importa."

### Projects / Proof

Purpose: show that the studio has real execution across the pillars.

The home should include a projects section or adapt the current project reveal so that each project maps to an actual capability:

- Ecommerce / web platform.
- Real estate / 3D visualization.
- Institutional website / branding.
- Backoffice / internal software.
- UX/UI / product design.

Project labels should help visitors connect the work to what they might need.

### Process

Purpose: make the broad offer feel manageable.

Recommended steps:

1. Diagnosis
2. Strategy
3. Production
4. Launch
5. Optimization

This can replace or evolve the current "Nuestro Enfoque" section if needed. It should reassure users that SC Studio can take a project from idea to launch without making the page feel like a corporate brochure.

### Final CTA

Purpose: close with a clear action.

Copy:

> Hablemos de tu presencia digital.

CTA:

- Mail/contact link.
- Optional supporting line: "Contanos que queres mejorar y te ayudamos a ordenar el proximo paso."

## Future Chatbot Consideration

The home should be designed knowing that a chatbot will be added later.

Implications:

- CTAs should not depend only on the chatbot. The page must work without it.
- The hero and final CTA can leave room for a future floating assistant entry point.
- The copy should anticipate chatbot routing by using the same four pillars: Web, Software, Content, Growth.
- The service cards/pillars should use clean labels that a chatbot can reuse as conversation starters.

Potential future chatbot prompts:

- "Necesito una web o landing"
- "Quiero mejorar mi posicionamiento"
- "Necesito software o automatizacion"
- "Busco video, motion o contenido"

## Visual Direction

The visual system should stay close to the current brand:

- Dark editorial base.
- Pink neon accent used with restraint.
- High-impact scroll and motion moments.
- Large typography, but readable and useful.
- 3D/interactive scene in the hero.
- Premium but not cryptic.

Avoid:

- A long disconnected service list.
- Generic agency copy.
- Visual effects that hide the message.
- A purely atmospheric hero with no clear offer.

## Components To Update

Likely affected components:

- `src/pages/Home/components/Hero.tsx`
- `src/pages/Home/components/Narrative.tsx`
- `src/pages/Home/components/Services.tsx`
- `src/pages/Home/components/ProjectReveal.tsx`
- `src/pages/Home/components/SelectedWorks.tsx`
- `src/pages/Home/components/HomeFooter.tsx`
- `src/pages/Home/Home.tsx`

The implementation should reuse the existing component structure where possible, but it is acceptable to rename or add focused home components if that keeps the page clearer.

## Testing And Verification

Before completion:

- Run the project build.
- Open the home locally in desktop and mobile viewports.
- Verify that the first viewport clearly explains what SC Studio does.
- Verify that CTA labels are visible and usable.
- Verify that motion does not obscure text or make the service offer hard to understand.
- Verify that the page still works without the future chatbot.

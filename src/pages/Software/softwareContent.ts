export const softwareContent = {
  useCases: [
    "Información fragmentada",
    "Tareas repetitivas",
    "Poca trazabilidad",
    "Procesos propios",
  ],
  capabilities: [
    "Paneles de gestión",
    "Plataformas internas",
    "Dashboards",
    "Integraciones",
    "Automatizaciones",
    "Aplicaciones web",
  ],
  layers: ["UX/UI", "Backend", "Datos", "Integraciones", "Infraestructura", "Continuidad"],
  process: [
    { name: "Diagnóstico", detail: "Objetivos, usuarios, procesos y restricciones." },
    { name: "Definición", detail: "Alcance, arquitectura, experiencia y plan." },
    { name: "Producción", detail: "Diseño, desarrollo e integraciones." },
    { name: "Pruebas", detail: "Flujos, estados y escenarios de uso." },
    { name: "Publicación", detail: "Puesta en marcha y acompañamiento." },
    { name: "Evolución", detail: "Documentación y mejoras siguientes." },
  ],
  productStories: [
    {
      title: "Seguimiento que reúne la información importante.",
      body: "Una vista comercial puede ordenar oportunidades, responsables y próximos pasos sin repartir el contexto entre distintas herramientas.",
      image: {
        src: "/software/2.png",
        alt: "Vista de seguimiento comercial con oportunidades, responsables y estados",
        width: 2998,
        height: 1548,
      },
    },
    {
      title: "La operación visible en un mismo lugar.",
      body: "Equipos, disponibilidad y estados de trabajo pueden convivir en una interfaz diseñada alrededor de la forma real de operar.",
      image: {
        src: "/software/3.png",
        alt: "Vista de gestión operativa con equipos, disponibilidad y estados de trabajo",
        width: 3006,
        height: 1390,
      },
    },
  ],
  faq: [
    {
      question: "¿Qué tipo de software desarrollan?",
      answer: "Paneles de gestión, plataformas internas, aplicaciones web, automatizaciones e integraciones definidas según el proceso que se necesita resolver.",
    },
    {
      question: "¿Cómo se define el alcance?",
      answer: "Primero relevamos objetivos, usuarios, información disponible, restricciones y prioridades. Con ese contexto proponemos una primera versión, entregables y etapas.",
    },
    {
      question: "¿Pueden integrarse con sistemas existentes?",
      answer: "Sí, cuando los sistemas ofrecen mecanismos de integración compatibles. La viabilidad se evalúa durante el diagnóstico técnico.",
    },
    {
      question: "¿Qué ocurre después de publicar?",
      answer: "Documentamos lo construido, acompañamos la puesta en marcha y definimos con el cliente las mejoras o el soporte siguiente.",
    },
  ],
} as const;

export const softwarePageCopy = {
  hero: {
    title: "La operación necesita su propio sistema.",
    body: "Desarrollamos plataformas, paneles e integraciones alrededor de procesos reales. La experiencia visible y la lógica que la sostiene forman parte del mismo proyecto.",
  },
  useCases: {
    title: "Cuando las herramientas existentes ya no acompañan el trabajo.",
    body: "La necesidad puede aparecer como información dispersa, tareas manuales, falta de seguimiento o sistemas que no reflejan la forma real de operar.",
  },
  capabilities: {
    title: "Un sistema definido alrededor del problema.",
    body: "El alcance se decide según el contexto: desde una herramienta puntual hasta una plataforma que conecta distintas áreas de la operación.",
  },
  process: {
    title: "Decisiones claras en cada etapa.",
    body: "El proceso se adapta al alcance, pero mantiene responsables, entregables e instancias de revisión.",
  },
  layers: {
    title: "La interfaz es solo una parte del sistema.",
    body: "Trabajamos la experiencia, la lógica, los datos y las integraciones como una misma solución. La tecnología aparece como respaldo, no como argumento vacío.",
  },
  closing: {
    title: "Conversemos sobre el sistema que necesitás construir.",
    body: "No necesitás llegar con todo definido. Empezamos por entender el contexto, ordenar prioridades y proponer un punto de partida.",
    cta: "Contanos tu proyecto",
  },
  metadata: {
    title: "Software a medida | SmartCloud Studio",
    description: "Desarrollamos plataformas, paneles, automatizaciones e integraciones definidas alrededor de procesos reales, con experiencia, lógica y ejecución responsable.",
  },
} as const;

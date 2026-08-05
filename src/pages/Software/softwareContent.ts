const WHATSAPP_URL = "https://wa.me/5492995831639";
const DEMO_URL = "/software/panel-crm";
const EMAIL = "contacto@smartcloudstudio.com";

export const softwarePageCopy = {
  metadata: {
    title: "Software a medida | SmartCloud Studio",
    description:
      "Desarrollamos plataformas, paneles de gestión e integraciones que responden a la operación de cada organización, con experiencia de usuario, lógica de negocio, datos e infraestructura en una misma solución.",
  },

  hero: {
    eyebrow: "Software a medida",
    title: "Software a medida para procesos reales.",
    body: "Desarrollamos plataformas, paneles de gestión e integraciones que responden a la operación de cada organización. Integramos experiencia de usuario, lógica de negocio, datos e infraestructura en una misma solución.",
    actions: [
      { label: "Evaluar un proyecto", href: WHATSAPP_URL, variant: "primary" },
      { label: "Ver demostración", href: DEMO_URL, variant: "secondary" },
    ],
    image: {
      src: "/software/1.png",
      alt: "Panel operativo con indicadores, actividad reciente y accesos de gestión",
      width: 2996,
      height: 1540,
      caption:
        "Panel operativo con indicadores, actividad reciente y accesos de gestión",
    },
  },

  problem: {
    title: "Cuando las herramientas existentes dejan de acompañar la operación.",
    body: "El punto de partida suele ser concreto: información distribuida en distintos sistemas, tareas que dependen de procesos manuales, dificultades para realizar un seguimiento o herramientas que ya no representan la forma actual de trabajar.",
    items: [
      {
        title: "Información dispersa",
        body: "Datos distribuidos entre planillas, correos y plataformas sin conexión.",
      },
      {
        title: "Tareas repetitivas",
        body: "Procesos manuales que consumen tiempo y aumentan la posibilidad de errores.",
      },
      {
        title: "Falta de trazabilidad",
        body: "Dificultades para conocer estados, responsables, movimientos y próximos pasos.",
      },
      {
        title: "Procesos específicos",
        body: "Operaciones que requieren reglas, permisos y recorridos propios.",
      },
    ],
  },

  solution: {
    title: "Una solución definida según el contexto.",
    body: "El alcance se establece a partir de los procesos, los usuarios, las restricciones y los objetivos de cada proyecto. Puede comenzar con una herramienta puntual o extenderse hacia una plataforma que conecte distintas áreas de la organización.",
    items: [
      {
        title: "Paneles de gestión",
        body: "Interfaces para administrar información, usuarios, estados y operaciones desde un mismo entorno.",
      },
      {
        title: "Plataformas internas",
        body: "Sistemas diseñados para acompañar procesos propios de una empresa o institución.",
      },
      {
        title: "Dashboards",
        body: "Indicadores y visualizaciones para realizar seguimiento y facilitar la toma de decisiones.",
      },
      {
        title: "Integraciones",
        body: "Conexión entre sistemas, servicios externos, bases de datos y herramientas existentes.",
      },
      {
        title: "Automatizaciones",
        body: "Flujos que reducen tareas manuales y mantienen la información actualizada.",
      },
      {
        title: "Aplicaciones web",
        body: "Productos digitales accesibles desde distintos dispositivos, con funcionalidades definidas para cada tipo de usuario.",
      },
    ],
  },

  showcase: {
    title: "Una interfaz para comprender y gestionar la operación.",
    body: [
      "Nuestra plataforma de demostración muestra cómo organizamos información, acciones y estados dentro de un mismo sistema.",
      "Cada pantalla se diseña alrededor de una tarea concreta, para que las personas puedan encontrar lo que necesitan, comprender la situación y actuar con claridad.",
    ],
    stories: [
      {
        title: "Seguimiento comercial en un mismo lugar.",
        body: "Una vista comercial puede reunir oportunidades, responsables, estados y próximos pasos, evitando que el contexto quede distribuido entre diferentes herramientas.",
        image: {
          src: "/software/2.png",
          alt: "Vista de seguimiento comercial con oportunidades, responsables y estados",
          width: 2998,
          height: 1548,
          caption:
            "Vista de seguimiento comercial con oportunidades, responsables y estados.",
        },
      },
      {
        title: "Información operativa disponible para cada equipo.",
        body: "La disponibilidad de recursos, los estados de trabajo y las tareas pendientes pueden integrarse en una interfaz adaptada a la dinámica real de la organización.",
        image: {
          src: "/software/3.png",
          alt: "Vista de gestión operativa con equipos, disponibilidad y estados de trabajo",
          width: 3006,
          height: 1390,
          caption:
            "Vista de gestión operativa con equipos, disponibilidad y estados de trabajo.",
        },
      },
    ],
    cta: { label: "Explorar la demostración", href: DEMO_URL },
  },

  process: {
    title: "Un proceso claro para decisiones complejas.",
    body: "Cada desarrollo requiere definiciones técnicas, funcionales y operativas. Organizamos el trabajo en etapas para mantener prioridades claras, validar decisiones y reducir incertidumbre durante el proyecto.",
    steps: [
      {
        name: "Diagnóstico",
        detail:
          "Relevamos objetivos, usuarios, procesos actuales, restricciones y oportunidades de mejora.",
      },
      {
        name: "Definición",
        detail:
          "Establecemos el alcance, la arquitectura, los recorridos principales y el plan de trabajo.",
      },
      {
        name: "Producción",
        detail:
          "Diseñamos las interfaces, desarrollamos las funcionalidades e implementamos las integraciones necesarias.",
      },
      {
        name: "Pruebas",
        detail:
          "Validamos flujos, permisos, estados, reglas de negocio y escenarios de uso antes de la publicación.",
      },
      {
        name: "Puesta en marcha",
        detail:
          "Configuramos el entorno, realizamos el despliegue y acompañamos las primeras instancias de uso.",
      },
      {
        name: "Evolución",
        detail:
          "Documentamos la solución, registramos oportunidades de mejora y definimos las siguientes etapas cuando el proyecto lo requiere.",
      },
    ],
  },

  layers: {
    title: "La interfaz es una parte del sistema.",
    body: [
      "Una solución de software también depende de la lógica que procesa la información, la estructura de los datos, las integraciones y la infraestructura que permite mantenerla disponible.",
      "Trabajamos estas capas de forma coordinada para construir sistemas consistentes, seguros y preparados para el uso cotidiano.",
    ],
    items: [
      {
        title: "UX/UI",
        body: "Interfaces claras y recorridos adaptados a cada tipo de usuario.",
      },
      {
        title: "Backend",
        body: "Reglas de negocio, permisos, procesos y servicios que sostienen la operación.",
      },
      {
        title: "Datos",
        body: "Estructuras organizadas para registrar, consultar y relacionar información.",
      },
      {
        title: "Integraciones",
        body: "Conexiones con sistemas existentes, APIs y servicios externos.",
      },
      {
        title: "Infraestructura",
        body: "Entornos, despliegues y configuraciones necesarios para operar de forma estable.",
      },
      {
        title: "Continuidad",
        body: "Documentación, seguimiento y evolución posterior a la publicación.",
      },
    ],
  },

  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Qué tipo de software desarrollan?",
        answer:
          "Desarrollamos aplicaciones web, plataformas internas, paneles de gestión, dashboards, automatizaciones e integraciones. El tipo de solución se define según los procesos, los usuarios y los objetivos de cada organización.",
      },
      {
        question: "¿Cómo se define el alcance?",
        answer:
          "Comenzamos con una etapa de diagnóstico para comprender el contexto, identificar prioridades y establecer qué necesita resolver la primera versión. A partir de ese análisis definimos funcionalidades, etapas, entregables y criterios de validación.",
      },
      {
        question: "¿Pueden integrarse con sistemas existentes?",
        answer:
          "Sí. Podemos conectar la nueva solución con APIs, bases de datos, servicios externos y herramientas que la organización ya utiliza. La viabilidad y el alcance de cada integración se evalúan durante la etapa inicial.",
      },
      {
        question: "¿Es necesario reemplazar todas las herramientas actuales?",
        answer:
          "No necesariamente. En algunos proyectos desarrollamos un sistema central; en otros, incorporamos una herramienta puntual o conectamos plataformas existentes. La decisión depende de la operación y del valor que aporte cada alternativa.",
      },
      {
        question: "¿Qué ocurre después de la publicación?",
        answer:
          "Acompañamos la puesta en marcha, documentamos los componentes principales y definimos las necesidades de soporte, mantenimiento o evolución. La modalidad posterior depende del alcance y de la criticidad del sistema.",
      },
      {
        question: "¿Pueden trabajar sobre un software ya desarrollado?",
        answer:
          "Sí. Primero analizamos la arquitectura, el estado del código, la infraestructura y la documentación disponible. Con esa información determinamos si conviene continuar, corregir componentes específicos o planificar una migración progresiva.",
      },
    ],
  },

  closing: {
    title: "Conversemos sobre el sistema que necesitás construir.",
    body: "No es necesario llegar con todas las funcionalidades definidas. Empezamos por comprender el contexto, ordenar prioridades y establecer un punto de partida viable.",
    cta: { label: "Contanos tu proyecto", href: WHATSAPP_URL },
  },

  contact: {
    title: "Hablemos de tu proyecto.",
    body: "Contanos qué necesitás resolver. Revisamos la información y definimos los próximos pasos para evaluar el desarrollo.",
    cta: { label: "Escribinos", href: WHATSAPP_URL },
    channels: [
      { label: "WhatsApp", value: "+54 9 2995 83-1639", href: WHATSAPP_URL },
      { label: "Correo electrónico", value: EMAIL, href: `mailto:${EMAIL}` },
    ],
  },
} as const;

export type ChatOption = {
  label: string;
  nextId: string;
};

export type ChatNode = {
  id: string;
  message: string;
  detail?: string;
  options: ChatOption[];
  cta?: { label: string; href: string };
};

export const chatbotFlow: Record<string, ChatNode> = {
  // ============================================================
  // START
  // ============================================================
  start: {
    id: "start",
    message: "Hola, soy el asistente de SmartCloud Studio.",
    detail:
      "Trabajamos en cuatro áreas: web, software, posicionamiento (SEO/GEO) y contenido audiovisual. Te voy a hacer unas preguntas rápidas para entender qué necesitás y después te derivamos con toda la info ordenada.",
    options: [
      { label: "Quiero una web o landing", nextId: "web_tipo" },
      { label: "Necesito software o herramientas", nextId: "software_tipo" },
      { label: "Quiero que me encuentren (SEO / GEO)", nextId: "seo_estado" },
      { label: "Necesito video o contenido", nextId: "contenido_tipo" },
      { label: "No sé por dónde empezar / Quiero todo", nextId: "todo_negocio" },
    ],
  },

  // ============================================================
  // RAMA WEB
  // ============================================================
  web_tipo: {
    id: "web_tipo",
    message: "¿Qué tipo de sitio necesitás?",
    detail:
      "Hacemos desde landing pages de una sola página hasta sitios institucionales completos con múltiples secciones y ecommerce con pasarela de pagos.",
    options: [
      { label: "Landing para vender un producto o servicio", nextId: "web_contenido" },
      { label: "Sitio institucional para mi empresa", nextId: "web_contenido" },
      { label: "Ecommerce / tienda online", nextId: "web_contenido" },
      { label: "Rediseño de una web que ya tengo", nextId: "web_contenido" },
    ],
  },
  web_contenido: {
    id: "web_contenido",
    message: "¿Tenés contenido listo o lo armamos nosotros?",
    detail:
      "Podemos trabajar con tu material existente o armar textos, fotos y branding desde cero. También integramos con CMS para que puedas editar todo vos después.",
    options: [
      { label: "Tengo todo el contenido listo", nextId: "web_urgencia" },
      { label: "Necesito ayuda con textos e imágenes", nextId: "web_urgencia" },
      { label: "Necesito branding desde cero", nextId: "web_urgencia" },
    ],
  },
  web_urgencia: {
    id: "web_urgencia",
    message: "¿Tenés un plazo o fecha de lanzamiento?",
    detail:
      "Una landing simple la tenemos en 2-3 semanas. Un sitio institucional completo entre 4 y 8 semanas. El ecommerce depende de la cantidad de productos.",
    options: [
      { label: "Urgente: menos de 1 mes", nextId: "web_presupuesto" },
      { label: "Normal: 1 a 2 meses", nextId: "web_presupuesto" },
      { label: "Flexible: más de 2 meses", nextId: "web_presupuesto" },
      { label: "Todavía no tengo fecha", nextId: "web_presupuesto" },
    ],
  },
  web_presupuesto: {
    id: "web_presupuesto",
    message: "¡Perfecto! Ya tenemos una idea clara de tu proyecto.",
    detail:
      "Resumen de lo que elegiste: necesitás una web, ya definimos el tipo de sitio, el estado del contenido y el plazo. Ahora hablemos para cotizar y empezar.",
    options: [
      { label: "Hablemos por WhatsApp", nextId: "cta_whatsapp_web" },
      { label: "Hablemos por mail", nextId: "cta_mail_web" },
    ],
  },
  cta_whatsapp_web: {
    id: "cta_whatsapp_web",
    message: "Genial. Te dejo el link para escribirnos.",
    detail:
      "Al tocar el botón se abre WhatsApp con un mensaje pre-armado que incluye todo lo que elegiste en esta conversación. Así no tenés que repetir nada.",
    options: [],
    cta: {
      label: "Ir a WhatsApp →",
      href: "https://wa.me/5492995831639",
    },
  },
  cta_mail_web: {
    id: "cta_mail_web",
    message: "Perfecto. Te dejo el mail para contactarnos.",
    detail:
      "Al tocar el botón se abre tu mail con un asunto y cuerpo pre-armado que incluye todo lo que elegiste en esta conversación. Respondemos en menos de 24hs.",
    options: [],
    cta: {
      label: "Enviar mail →",
      href: "mailto:contacto@smartcloudstudio.com",
    },
  },

  // ============================================================
  // RAMA SOFTWARE
  // ============================================================
  software_tipo: {
    id: "software_tipo",
    message: "¿Qué tipo de herramienta necesitás?",
    detail:
      "Desarrollamos backoffices personalizados, automatizaciones con n8n/Zapier, MVPs de productos digitales e integraciones con sistemas existentes.",
    options: [
      { label: "Backoffice / panel interno", nextId: "software_tecnologia" },
      { label: "Automatizaciones (n8n, Zapier, etc.)", nextId: "software_tecnologia" },
      { label: "MVP de un producto nuevo", nextId: "software_tecnologia" },
      { label: "Integración con otros sistemas", nextId: "software_tecnologia" },
    ],
  },
  software_tecnologia: {
    id: "software_tecnologia",
    message: "¿Tenés preferencia de tecnología?",
    detail:
      "Trabajamos con React, Node.js, Supabase, PostgreSQL, y herramientas low-code cuando el proyecto lo permite. Si tenés una preferencia, la respetamos. Si no, te recomendamos la mejor opción.",
    options: [
      { label: "Me da igual, lo resolvemos juntos", nextId: "software_usuario" },
      { label: "Quiero algo específico (React, Supabase, etc.)", nextId: "software_usuario" },
      { label: "No sé qué necesito, asesorame", nextId: "software_usuario" },
    ],
  },
  software_usuario: {
    id: "software_usuario",
    message: "¿Es para uso interno de tu equipo o para clientes externos?",
    detail:
      "Esto define la arquitectura, seguridad y escalabilidad del sistema. Los tools internos priorizan velocidad de desarrollo. Los productos para clientes necesitan más robustez y testing.",
    options: [
      { label: "Uso interno de mi equipo", nextId: "software_escala" },
      { label: "Para que usen mis clientes", nextId: "software_escala" },
      { label: "Ambos", nextId: "software_escala" },
    ],
  },
  software_escala: {
    id: "software_escala",
    message: "¿Querés que avancemos con una propuesta?",
    detail:
      "Ya tenemos claro el tipo de software, la tecnología, los usuarios y el alcance. Ahora hablemos para armar un plan con tiempos y costos.",
    options: [
      { label: "Hablemos por WhatsApp", nextId: "cta_whatsapp_soft" },
      { label: "Hablemos por mail", nextId: "cta_mail_soft" },
    ],
  },
  cta_whatsapp_soft: {
    id: "cta_whatsapp_soft",
    message: "Perfecto. Escribinos por WhatsApp.",
    detail:
      "El mensaje va pre-armado con todo lo que elegiste: tipo de software, tecnología, usuarios y alcance. Así ya sabemos qué necesitás.",
    options: [],
    cta: {
      label: "Ir a WhatsApp →",
      href: "https://wa.me/5492995831639",
    },
  },
  cta_mail_soft: {
    id: "cta_mail_soft",
    message: "Te dejo el mail para que nos contactes.",
    detail:
      "El mail va pre-armado con todo el resumen de tu conversación. Respondemos en menos de 24hs con una propuesta.",
    options: [],
    cta: {
      label: "Enviar mail →",
      href: "mailto:contacto@smartcloudstudio.com",
    },
  },

  // ============================================================
  // RAMA SEO / GEO
  // ============================================================
  seo_estado: {
    id: "seo_estado",
    message: "¿Tenés una web ya o empezamos desde cero?",
    detail:
      "El SEO funciona sobre una base técnica sólida. Si ya tenés web, hacemos un audit primero. Si no, integramos SEO desde el diseño para no retroceder después.",
    options: [
      { label: "Ya tengo web, quiero mejorar posicionamiento", nextId: "seo_urgencia" },
      { label: "Necesito web + posicionamiento", nextId: "seo_urgencia" },
      { label: "Solo quiero contenido para posicionar", nextId: "seo_urgencia" },
    ],
  },
  seo_urgencia: {
    id: "seo_urgencia",
    message: "¿Qué tan urgente es el crecimiento?",
    detail:
      "SEO tradicional tarda 3-6 meses en dar resultados. GEO (optimización para respuestas de IA) puede dar tracción más rápido. Contenido de calidad acelera ambos.",
    options: [
      { label: "Necesito resultados en 3 meses", nextId: "seo_alcance" },
      { label: "Mediano plazo: 3 a 6 meses", nextId: "seo_alcance" },
      { label: "Largo plazo, quiero ordenar todo", nextId: "seo_alcance" },
      { label: "No tengo apuro, quiero entender", nextId: "seo_alcance" },
    ],
  },
  seo_alcance: {
    id: "seo_alcance",
    message: "¿Tu negocio es local, nacional o global?",
    detail:
      "El SEO local depende de Google Business, reseñas y contenido geolocalizado. El nacional necesita autoridad de dominio. El global requiere estrategia multi-idioma y dominios regionales.",
    options: [
      { label: "Local (ciudad o región)", nextId: "seo_presupuesto" },
      { label: "Nacional", nextId: "seo_presupuesto" },
      { label: "Global / varios países", nextId: "seo_presupuesto" },
    ],
  },
  seo_presupuesto: {
    id: "seo_presupuesto",
    message: "¡Listo! Ya tenemos claro el alcance.",
    detail:
      "Definimos: estado actual de tu web, urgencia del crecimiento y alcance geográfico. Ahora hablemos para armar un plan de SEO/GEO concreto.",
    options: [
      { label: "Hablemos por WhatsApp", nextId: "cta_whatsapp_seo" },
      { label: "Hablemos por mail", nextId: "cta_mail_seo" },
    ],
  },
  cta_whatsapp_seo: {
    id: "cta_whatsapp_seo",
    message: "Escribinos por WhatsApp.",
    detail:
      "El mensaje incluye todo: estado de la web, urgencia, alcance y tipo de servicio. Así empezamos la conversación con contexto.",
    options: [],
    cta: {
      label: "Ir a WhatsApp →",
      href: "https://wa.me/5492995831639",
    },
  },
  cta_mail_seo: {
    id: "cta_mail_seo",
    message: "Te dejo el mail.",
    detail:
      "El mail va con todo el resumen de tu conversación. Te respondemos en menos de 24hs con una propuesta.",
    options: [],
    cta: {
      label: "Enviar mail →",
      href: "mailto:contacto@smartcloudstudio.com",
    },
  },

  // ============================================================
  // RAMA VIDEO / CONTENIDO
  // ============================================================
  contenido_tipo: {
    id: "contenido_tipo",
    message: "¿Qué tipo de contenido necesitás?",
    detail:
      "Hacemos videos para redes, promocionales, motion graphics, piezas para ads y contenido completo (redes + web). También animaciones y piezas para presentaciones.",
    options: [
      { label: "Videos para redes sociales", nextId: "contenido_material" },
      { label: "Video promocional / institucional", nextId: "contenido_material" },
      { label: "Motion graphics / animaciones", nextId: "contenido_material" },
      { label: "Piezas para ads / campañas", nextId: "contenido_material" },
      { label: "Contenido completo (redes + web)", nextId: "contenido_material" },
    ],
  },
  contenido_material: {
    id: "contenido_material",
    message: "¿Tenés material de base o lo armamos?",
    detail:
      "Podemos trabajar con tu material existente, filmar nosotros, o crear todo desde cero con stock de calidad y motion graphics. También hacemos guiones y dirección.",
    options: [
      { label: "Sí, tengo material listo", nextId: "contenido_cantidad" },
      { label: "Necesito guion y dirección", nextId: "contenido_cantidad" },
      { label: "Necesito todo desde cero", nextId: "contenido_cantidad" },
    ],
  },
  contenido_cantidad: {
    id: "contenido_cantidad",
    message: "¿Cuántos videos o piezas necesitás?",
    detail:
      "La cantidad define si es un proyecto puntual o un contrato mensual. Para redes, solemos trabajar en packs de 4, 8 o 12 piezas por mes.",
    options: [
      { label: "1 a 3 piezas puntuales", nextId: "contenido_plazo" },
      { label: "4 a 10 piezas", nextId: "contenido_plazo" },
      { label: "Más de 10 / contrato mensual", nextId: "contenido_plazo" },
      { label: "Todavía no sé, quiero asesoramiento", nextId: "contenido_plazo" },
    ],
  },
  contenido_plazo: {
    id: "contenido_plazo",
    message: "¡Buenísimo! ¿Querés que te escribamos?",
    detail:
      "Ya definimos: tipo de contenido, material de base, cantidad de piezas. Ahora hablemos para armar un plan con tiempos y costos.",
    options: [
      { label: "Hablemos por WhatsApp", nextId: "cta_whatsapp_video" },
      { label: "Hablemos por mail", nextId: "cta_mail_video" },
    ],
  },
  cta_whatsapp_video: {
    id: "cta_whatsapp_video",
    message: "Escribinos por WhatsApp.",
    detail:
      "El mensaje incluye el resumen completo de tu conversación: tipo de contenido, material y cantidad de piezas.",
    options: [],
    cta: {
      label: "Ir a WhatsApp →",
      href: "https://wa.me/5492995831639",
    },
  },
  cta_mail_video: {
    id: "cta_mail_video",
    message: "Te dejo el mail.",
    detail:
      "El mail va con todo el resumen de tu conversación. Te respondemos rápido con una propuesta.",
    options: [],
    cta: {
      label: "Enviar mail →",
      href: "mailto:contacto@smartcloudstudio.com",
    },
  },

  // ============================================================
  // RAMA NO SE / TODO
  // ============================================================
  todo_negocio: {
    id: "todo_negocio",
    message: "Contame un poco. ¿A qué te dedicás?",
    detail:
      "Entender tu negocio nos ayuda a recomendarte por dónde empezar. No hace falta que tengas todo definido.",
    options: [
      { label: "Soy profesional / freelancer", nextId: "todo_dolor" },
      { label: "Tengo una empresa o startup", nextId: "todo_dolor" },
      { label: "Tengo una marca / ecommerce", nextId: "todo_dolor" },
      { label: "Soy agencia o estudio", nextId: "todo_dolor" },
    ],
  },
  todo_dolor: {
    id: "todo_dolor",
    message: "¿Cuál es tu principal dolor hoy?",
    detail:
      "Identificar el dolor principal nos dice qué mover primero. A veces la web es urgente, a veces el posicionamiento, a veces las automatizaciones internas.",
    options: [
      { label: "No tengo web o está desactualizada", nextId: "todo_contacto" },
      { label: "Pierdo tiempo en tareas manuales", nextId: "todo_contacto" },
      { label: "No me encuentran en Google", nextId: "todo_contacto" },
      { label: "No tengo contenido para vender", nextId: "todo_contacto" },
      { label: "Todo lo anterior", nextId: "todo_contacto" },
    ],
  },
  todo_contacto: {
    id: "todo_contacto",
    message: "Perfecto, ya tenemos una idea general.",
    detail:
      "Ya sabemos a qué te dedicás y cuál es tu principal dolor. Ahora coordinamos una llamada breve (15-20 min) para entender en detalle y armar un plan.",
    options: [
      { label: "Coordinar por WhatsApp", nextId: "cta_whatsapp_todo" },
      { label: "Coordinar por mail", nextId: "cta_mail_todo" },
    ],
  },
  cta_whatsapp_todo: {
    id: "cta_whatsapp_todo",
    message: "Genial. Escribinos por WhatsApp.",
    detail:
      "El mensaje incluye tu tipo de negocio y el dolor principal que identificamos. Así empezamos la llamada con contexto.",
    options: [],
    cta: {
      label: "Ir a WhatsApp →",
      href: "https://wa.me/5492995831639",
    },
  },
  cta_mail_todo: {
    id: "cta_mail_todo",
    message: "Te dejo el mail.",
    detail:
      "El mail va con todo el resumen de tu conversación. Coordinamos una llamada breve para armar el plan.",
    options: [],
    cta: {
      label: "Enviar mail →",
      href: "mailto:contacto@smartcloudstudio.com",
    },
  },
};

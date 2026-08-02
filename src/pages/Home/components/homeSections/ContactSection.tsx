import { Megaphone } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="bg-[#f3f0e8] px-5 py-20 text-black md:px-12 md:py-28">
      <div className="border-2 border-black bg-white p-6 shadow-[12px_12px_0_#111111] md:p-10">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <h2 className="max-w-5xl text-5xl font-black leading-[0.92] md:text-7xl">
              Conversemos sobre lo que necesitás construir
            </h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-black/66">
              Puede ser un nuevo sitio, una herramienta interna, una estrategia de visibilidad, contenido
              audiovisual o un proyecto que combine varias áreas. Empezamos por entender el contexto y ordenar
              prioridades.
            </p>
            <a
              href="mailto:contacto@smartcloudstudio.com"
              className="clickable mt-8 inline-flex items-center gap-3 border-2 border-black bg-[#d7ff4f] px-6 py-4 font-semibold text-black shadow-[6px_6px_0_#111111] transition hover:-translate-y-1"
            >
              Contanos tu proyecto
              <Megaphone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import { ArrowRight, Clapperboard } from "lucide-react";
import { Link } from "react-router";

const StudioClosing = () => {
  return (
    <section className="bg-white px-5 py-20 text-black md:px-12 md:py-28">
      <div className="relative overflow-hidden border-2 border-black bg-[#d7ff4f] p-6 shadow-[14px_14px_0_#111111] md:p-10">
        <div className="absolute right-4 top-2 hidden text-[12rem] font-black leading-none opacity-10 md:block">
          SC
        </div>
        <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_0.85fr] md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-sm font-black uppercase">
              <Clapperboard className="h-4 w-4" />
              SC Studio
            </p>
            <h2 className="mt-7 max-w-4xl text-4xl font-black uppercase leading-[0.9] md:text-6xl">
              Construir bien también es saber acompañar.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-black/68 md:text-xl">
              Elegimos involucrarnos, mantener una comunicación abierta y estar presentes cuando el proyecto
              necesita una respuesta.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-black/68 md:text-xl">
              Ese compromiso se refleja en el resultado, pero también en la forma de llegar hasta él.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/work"
                className="clickable group inline-flex w-fit items-center gap-3 border-2 border-black bg-black px-6 py-4 font-semibold text-white shadow-[6px_6px_0_#ff2bf9] transition hover:-translate-y-1"
              >
                Explorar proyectos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="mailto:contacto@smartcloudstudio.com"
                className="clickable inline-flex w-fit items-center gap-3 border-2 border-black bg-white px-6 py-4 font-semibold text-black shadow-[6px_6px_0_#111111] transition hover:-translate-y-1"
              >
                Hablemos de tu proyecto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioClosing;

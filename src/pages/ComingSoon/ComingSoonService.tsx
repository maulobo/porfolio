import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router";
import { AlertTriangle, Gamepad2 } from "lucide-react";
import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";
import type { ServiceLink } from "../../components/common/navbar/navigation";
import "./comingSoon.css";

/** El juego sólo pesa para quien decide jugar: se descarga al abrir el modal. */
const NokiaSnakeModal = lazy(() => import("./NokiaSnake/NokiaSnakeModal"));

type ComingSoonServiceProps = {
  service: ServiceLink;
};

/**
 * Repeticiones por mitad del track. Cada mitad tiene que ser al menos tan ancha
 * como la cinta (150vw) para que el loop de -50% no deje huecos.
 */
const TAPE_UNITS = 12;

const TapeContent = () => (
  <>
    {Array.from({ length: TAPE_UNITS * 2 }, (_, index) => (
      <span
        key={index}
        className="flex shrink-0 items-center gap-3 px-5 py-6 font-mono text-sm font-black uppercase tracking-[0.22rem] text-[#111111] md:text-base"
      >
        <AlertTriangle className="h-5 w-5 shrink-0" strokeWidth={2.5} />
        En construcción
      </span>
    ))}
  </>
);

const ComingSoonService = ({ service }: ComingSoonServiceProps) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${service.name} — En construcción | Scland`;

    return () => {
      document.title = previousTitle;
    };
  }, [service.name]);

  return (
    <TransitionAnimate>
      <main className="coming-soon relative min-h-screen overflow-hidden bg-[#111111]">
        {/* Mismo enrejado que StudioScrollComic: papel cuadriculado de taller. */}
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:42px_42px]" />

    

        {/* Vallas de obra cruzadas, como el frente de un edificio en construcción. */}
        <div
          className="coming-soon__tape top-[10%] md:top-[16%] -translate-x-1/2 -rotate-6"
          aria-hidden="true"
        >
          <div className="coming-soon__track">
            <TapeContent />
          </div>
        </div>

        <div
          className="coming-soon__tape bottom-[4%] md:bottom-[14%] -translate-x-1/2 rotate-[4deg]"
          aria-hidden="true"
        >
          <div className="coming-soon__track coming-soon__track--reverse">
            <TapeContent />
          </div>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-32">
          <article className="relative w-full max-w-2xl border-[4px] border-[#111111] bg-[#f3f0e8] p-6 text-[#111111] shadow-[8px_8px_0_#ff2bf9] md:shadow-[14px_14px_0_#ff2bf9] md:p-10">
            <p className="inline-block border-2 border-[#111111] bg-[#ffe500] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.22rem] md:text-xs">
              Sección en obra
            </p>

            <h1 className="mt-6 text-3xl font-semibold leading-[0.95] tracking-tight md:text-5xl">
              Próximamente vas a poder ver esta sección.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-black/62 md:text-lg">
              Estamos terminando de construir <strong className="font-semibold text-[#111111]">{service.name}</strong>.
              Mientras tanto, podés jugar a algo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#111111] bg-[#d7ff4f] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.14rem] shadow-[6px_6px_0_#111111] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink"
              >
                <Gamepad2 className="h-4 w-4" strokeWidth={2.5} />
                Jugar mientras tanto
              </button>

              <Link
                to="/"
                className="inline-flex min-h-12 items-center justify-center border-2 border-[#111111] bg-white px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.14rem] text-[#111111] transition duration-200 hover:bg-[#ffe500] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink"
              >
                Volver al inicio
              </Link>
            </div>
          </article>
        </div>

        {playing && (
          <Suspense fallback={null}>
            <NokiaSnakeModal onClose={() => setPlaying(false)} />
          </Suspense>
        )}
      </main>
    </TransitionAnimate>
  );
};

export default ComingSoonService;

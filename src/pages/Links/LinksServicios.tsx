import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { track } from "../../lib/analytics";
import { servicesSummary } from "./servicesSummary";
import GridScan from "./GridScan";
import "./links.css";

/**
 * Resumen de servicios al que deriva /links: una pantalla con los cuatro
 * servicios y su "Ver más" a cada página. Igual que /links, corre fuera del
 * sitio completo para cargar rápido desde el celular.
 */
const LinksServicios = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Servicios | SmartCloud Studio";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="links relative min-h-dvh w-full overflow-hidden bg-[#111111] text-white">
      {/*
        Fijo y con alto lvh: en el celular el contenido scrollea por encima y la
        barra del navegador no redimensiona el canvas a cada rato.
      */}
      <div className="fixed inset-x-0 top-0 h-lvh" aria-hidden="true">
        <GridScan
          linesColor="#4d4757"
          scanColor="#a855f7"
          cells={8}
          depth={1.8}
          scanDuration={2.4}
          scanDelay={1.6}
          clickEffect="ping"
          lineThickness={1}
          lineStyle="solid"
          depthFade={0.6}
          shading={0.7}
          reflection={0.35}
          points
          scanDirection="forward"
          scanWidth={1}
          trail={0.5}
          glow={0.6}
          parallax={1}
          autoScan
          interactive
          intro
          lightMode={false}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col justify-center px-5 py-5 md:px-10 md:py-10 lg:py-8">
        <div className="flex items-end justify-between gap-4 md:gap-6">
          <div>
            <span
              style={{ animationDelay: "0.1s" }}
              className="links__enter links__enter--sticker inline-block -rotate-4 border-2 border-[#111111] bg-[#ffe500] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.22rem] text-[#111111] shadow-[4px_4px_0_#ff2bf9]"
            >
              SmartCloud Studio
            </span>

            <h1
              style={{ animationDelay: "0.2s" }}
              className="links__enter mt-2.5 text-[2.1rem] font-semibold leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Lo que{" "}
              <span className="relative inline-block">
                <span className="absolute inset-x-[-0.12em] inset-y-[0.08em] -rotate-2 bg-[#ff2bf9]" aria-hidden="true" />
                <span className="relative text-[#111111]">hacemos.</span>
              </span>
            </h1>
          </div>

          <Link
            to="/links"
            aria-label="Volver a links"
            className="links__ghost group flex shrink-0 items-center gap-2 border-2 border-white/30 p-2.5 font-mono text-[11px] font-black uppercase tracking-[0.16rem] transition duration-200 hover:border-[#ff2bf9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff2bf9] sm:px-4"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
            <span className="hidden sm:inline">Volver</span>
          </Link>
        </div>

        <ul
          style={{ animationDelay: "0.3s" }}
          className="links__enter mt-5 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-5 lg:mt-10 lg:grid-cols-4"
        >
          {servicesSummary.map((service, index) => (
            <li key={service.path} className="flex">
              <Link
                to={service.path}
                onClick={() =>
                  track("Service Card Clicked", { service: service.title, position: index + 1, destination: service.path })
                }
                style={{ boxShadow: `5px 5px 0 ${service.accent}` }}
                className="group flex w-full flex-col border-[3px] border-[#111111] bg-[#f3f0e8] px-4 py-2.5 transition md:p-5 duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff2bf9]"
              >
                {/* Celular: título corto, una línea de copy y "Ver más" al costado. */}
                <div className="flex items-center justify-between gap-3 md:hidden">
                  <h2 className="text-lg font-semibold leading-tight tracking-tight">{service.shortTitle}</h2>
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-[0.14rem]">
                    {/* En 320px el texto empuja el título a dos líneas: queda sólo la flecha. */}
                    <span className="hidden min-[360px]:inline">Ver más</span>
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </div>
                <p className="mt-1 text-[13px] font-normal leading-snug text-black/65 md:hidden">{service.shortDescription}</p>

                <h2 className="hidden text-xl font-semibold leading-tight tracking-tight md:block">{service.title}</h2>
                <p className="mt-2 hidden text-sm font-normal leading-relaxed text-black/65 md:block">{service.description}</p>

                <ul className="mt-4 hidden flex-wrap gap-1.5 md:flex">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-[#111111]/25 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08rem] text-black/75"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <span className="hidden min-h-6 flex-1 md:block" aria-hidden="true" />
                <span className="hidden items-center justify-between gap-3 border-t-2 border-[#111111] pt-4 font-mono text-xs font-black uppercase tracking-[0.16rem] md:flex">
                  Ver más
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default LinksServicios;

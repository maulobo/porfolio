import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, LayoutGrid, Sparkle } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import { track } from "../../lib/analytics";
import "./links.css";

const WHATSAPP_URL =
  "https://wa.me/5492995831639?text=Hola%20SmartCloud%2C%20necesito%20un%20desarrollo.";

const services = ["Software a medida", "Web y e-commerce", "Visibilidad en IA", "Video y motion"];

/** Cada botón se mide por separado en Mixpanel ("Links Button Clicked"). */
const trackButton = (button: string, position: number, destination: string) => () =>
  track("Links Button Clicked", { button, position, destination });

/** Repeticiones por mitad del track: cada mitad tiene que cubrir el ancho de la cinta. */
const TAPE_UNITS = 3;

const Tape = ({ items, className }: { items: string[]; className: string }) => (
  <>
    {Array.from({ length: TAPE_UNITS * 2 }, (_, round) =>
      items.map((item) => (
        <span
          key={`${round}-${item}`}
          className={`flex shrink-0 items-center gap-4 px-4 py-2.5 font-mono text-[11px] font-black uppercase tracking-[0.2rem] md:text-xs ${className}`}
        >
          <Sparkle className="h-3.5 w-3.5 shrink-0 fill-current" strokeWidth={0} />
          {item}
        </span>
      )),
    )}
  </>
);

/** Sello circular con el nombre del estudio, girando sobre el CTA principal. */
const Seal = () => (
  <svg viewBox="0 0 100 100" className="links__seal h-full w-full" aria-hidden="true">
    <defs>
      <path id="links-seal-path" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
    </defs>
    <circle cx="50" cy="50" r="49" fill="#ff2bf9" stroke="#111111" strokeWidth="2.5" />
    <text className="fill-[#111111] font-mono text-[10.5px] font-black uppercase" letterSpacing="2.6">
      <textPath href="#links-seal-path">SmartCloud ✦ Studio ✦ Hablemos ✦</textPath>
    </text>
  </svg>
);

/**
 * Landing de links (bio de redes): una sola pantalla, sin navbar ni chatbot.
 * El CTA principal deriva a WhatsApp; el resto lleva al sitio.
 */
const Links = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Links | SmartCloud Studio";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="links relative h-dvh w-full overflow-hidden bg-[#111111] text-white">
      {/* Halos de color con gradientes: un blur de este tamaño traba la GPU del celular. */}
      <div className="links__glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="links__tape top-[3%] -translate-x-1/2 -rotate-3 bg-[#ff2bf9]" aria-hidden="true">
        <div className="links__track">
          <Tape items={services} className="text-[#111111]" />
        </div>
      </div>

      <div className="links__tape bottom-[3%] -translate-x-1/2 rotate-2 bg-[#d7ff4f]" aria-hidden="true">
        <div className="links__track links__track--reverse">
          <Tape items={["Disponibles para nuevos proyectos", "Respondemos en el día"]} className="text-[#111111]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-center px-5 py-[4.5rem]">
        <span
          style={{ animationDelay: "0.1s" }}
          className="links__enter links__enter--sticker w-fit -rotate-4 border-2 border-[#111111] bg-[#ffe500] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.22rem] text-[#111111] shadow-[4px_4px_0_#ff2bf9]"
        >
          SmartCloud Studio
        </span>

        <h1
          style={{ animationDelay: "0.2s" }}
          className="links__enter mt-5 text-[2.6rem] font-semibold leading-[0.92] tracking-tight sm:text-5xl"
        >
          Tu idea,{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-[-0.12em] inset-y-[0.08em] -rotate-2 bg-[#ff2bf9]" aria-hidden="true" />
            <span className="relative text-[#111111]">funcionando.</span>
          </span>
        </h1>

        <p
          style={{ animationDelay: "0.3s" }}
          className="links__enter mt-4 max-w-sm text-sm leading-relaxed text-white/65 sm:text-base"
        >
          Software a medida, webs y contenido con dirección propia.
        </p>

        <div
          style={{ animationDelay: "0.4s" }}
          className="links__enter mt-7 flex flex-col gap-4"
        >
          <div className="relative">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackButton("WhatsApp", 1, "whatsapp")}
              className="group relative flex min-h-[4.5rem] items-center gap-3.5 border-[3px] border-[#111111] bg-[#25D366] py-4 pl-4 pr-14 text-[#111111] shadow-[6px_6px_0_#ff2bf9] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_9px_0_#ff2bf9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff2bf9]"
            >
              {/* Logo oficial de WhatsApp (simple-icons): se reconoce sin leer. */}
              <svg viewBox="0 0 24 24" className="h-9 w-9 shrink-0 fill-current" aria-hidden="true">
                <path d={siWhatsapp.path} />
              </svg>
              <span className="flex flex-col">
                <span className="text-lg font-semibold leading-tight">Comunicate por WhatsApp</span>
                <span className="mt-0.5 font-mono text-[10px] font-black uppercase tracking-[0.18rem] text-black/65">
                  ¿Necesitás un desarrollo?
                </span>
              </span>
            </a>
            <div className="pointer-events-none absolute -right-5 -top-9 h-20 w-20">
              <Seal />
            </div>
          </div>

          <Link
            to="/servicios"
            onClick={trackButton("Ver servicios", 2, "/servicios")}
            className="group flex min-h-14 items-center justify-between gap-3 border-[3px] border-[#111111] bg-[#ff2bf9] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16rem] text-[#111111] shadow-[6px_6px_0_#d7ff4f] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#d7ff4f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d7ff4f]"
          >
            <span className="flex items-center gap-2.5">
              <LayoutGrid className="h-4 w-4 shrink-0" strokeWidth={2.5} />
              Ver nuestros servicios
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>

          <Link
            to="/work"
            onClick={trackButton("Ver trabajos", 3, "/work")}
            className="group flex min-h-14 items-center justify-between gap-3 border-[3px] border-[#111111] bg-[#f3f0e8] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16rem] text-[#111111] shadow-[6px_6px_0_rgba(255,255,255,0.18)] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#ffe500] hover:shadow-[8px_8px_0_rgba(255,255,255,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff2bf9]"
          >
            Ver trabajos
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>

          <Link
            to="/"
            onClick={trackButton("Ver web completa", 4, "/")}
            className="links__ghost group flex min-h-14 items-center justify-between gap-3 border-2 border-white/30 px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16rem] text-white transition duration-200 hover:border-[#ff2bf9] hover:text-[#ff2bf9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff2bf9]"
          >
            Ver web completa
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Links;

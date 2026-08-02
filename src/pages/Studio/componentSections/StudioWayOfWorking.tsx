import { Compass, MessageSquare, ShieldCheck, Zap } from "lucide-react";

const principles = [
  {
    icon: Compass,
    title: "Criterio antes que herramientas",
    copy: "Elegimos tecnologías, recursos visuales y metodologías según lo que necesita cada solución. Las herramientas acompañan el proyecto; no lo definen.",
    color: "bg-[#d7ff4f]",
  },
  {
    icon: MessageSquare,
    title: "Comunicación directa",
    copy: "Las personas que participan de las decisiones también participan del trabajo. Esto nos permite conservar el contexto, responder con claridad y avanzar sin intermediarios innecesarios.",
    color: "bg-white",
  },
  {
    icon: Zap,
    title: "Capacidad de respuesta",
    copy: "Los proyectos cambian y los imprevistos existen. Cuando aparece una urgencia, evaluamos el problema, ordenamos prioridades y proponemos una solución concreta.",
    color: "bg-[#ff2bf9]",
  },
  {
    icon: ShieldCheck,
    title: "Responsabilidad sobre la entrega",
    copy: "Cuidamos tanto lo visible como aquello que sucede detrás: rendimiento, pruebas, infraestructura, despliegues y continuidad. Nos hacemos responsables de lo que construimos.",
    color: "bg-[#f3f0e8]",
  },
];

const StudioWayOfWorking = () => {
  return (
    <section className="bg-[#111111] px-5 py-20 text-white md:px-12 md:py-28">
      <div className="mb-12 flex flex-col justify-between gap-5 border-b-4 border-white pb-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28rem] text-white/50">
            Nuestra forma de trabajar
          </p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black uppercase leading-[0.9] md:text-6xl">
            El resultado importa. El proceso también.
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-white/62">
          La calidad de un proyecto no depende solamente de lo que se entrega. También depende de la
          claridad, la comunicación y la capacidad de respuesta durante su desarrollo.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {principles.map((principle) => {
          const Icon = principle.icon;

          return (
            <article
              key={principle.title}
              className={`${principle.color} flex min-h-80 flex-col border-2 border-black p-6 text-black shadow-[10px_10px_0_#ffffff]`}
            >
              <Icon className="h-9 w-9" />
              <h3 className="mt-10 text-2xl font-black leading-tight md:text-3xl">
                {principle.title}
              </h3>
              <p className="mt-5 leading-relaxed text-black/68">{principle.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default StudioWayOfWorking;

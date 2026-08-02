import { BarChart3, Bot, Gauge, Sparkles } from "lucide-react";

const workflow = [
  {
    icon: Bot,
    title: "Diagnóstico",
    copy: "Relevamos el punto de partida, los objetivos, las restricciones y las oportunidades del proyecto.",
  },
  {
    icon: Sparkles,
    title: "Dirección",
    copy: "Definimos prioridades, alcance, narrativa, arquitectura y plan de trabajo.",
  },
  {
    icon: Gauge,
    title: "Producción",
    copy: "Diseñamos, desarrollamos, integramos y publicamos con instancias de revisión en cada etapa.",
  },
  {
    icon: BarChart3,
    title: "Evolución",
    copy: "Medimos resultados, documentamos lo construido y definimos las mejoras siguientes.",
  },
];

const cardColors = [
  "bg-[#d7ff4f] text-black",
  "bg-white text-black",
  "bg-[#ff2bf9] text-black",
  "bg-[#f3f0e8] text-black",
];

const WorkflowSection = () => {
  return (
    <section className="bg-[#111111] px-5 py-24 text-white md:px-12 md:py-32">
      <div className="mb-14 flex flex-col justify-between gap-6 border-b-4 border-white pb-10 md:flex-row md:items-end">
        <div>
          <h2 className="max-w-4xl text-4xl flex flex-col font-semibold leading-tight md:text-6xl">
            <span>De una necesidad o dolor</span><span>a una solución concreta.</span> 
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-white/58">
          Trabajamos con etapas claras, responsables definidos y entregables con seguimiento. Así, cada decisión
          tiene contexto y cada avance puede revisarse, la participación del cliente es más efectiva y el resultado final es más consistente.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {workflow.map((step, index) => {
          return (
            <article
              key={step.title}
              className={`relative min-h-62 overflow-hidden border-2 border-black p-6 shadow-[10px_10px_0_#ffffff] ${cardColors[index]}`}
            >
              <h3 className="mt-8 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 leading-relaxed text-black/68">{step.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default WorkflowSection;

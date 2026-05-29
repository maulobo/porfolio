import { servicePillars, processSteps } from "../homeContent";

const Services = () => {
  return (
    <section className="relative z-10 w-full bg-brand-dark py-24 text-brand-light md:py-32">
      <div className="px-5 md:px-12">
        <div className="mb-16 max-w-4xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35rem] text-brand-pink">
            Sistema digital
          </p>
          <h2 className="text-4xl font-light leading-tight md:text-6xl">
            Todo lo que tu negocio necesita para verse, funcionar y crecer online.
          </h2>
        </div>
      </div>

      <div className="w-full border-y border-brand-light/10">
        {servicePillars.map((item) => (
          <article
            key={item.key}
            className="group border-b border-brand-light/10 px-5 py-10 transition-colors duration-500 last:border-b-0 hover:bg-brand-light/[0.04] md:px-12 md:py-14"
          >
            <div className="grid gap-6 md:grid-cols-[0.4fr_1.3fr_1fr] md:items-start">
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm tracking-widest text-brand-pink">
                  {item.num}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.22rem] text-brand-light/35">
                  {item.label}
                </span>
              </div>
              <h3 className="text-5xl font-light leading-none transition-transform duration-500 group-hover:translate-x-2 md:text-7xl">
                {item.title}
              </h3>
              <div>
                <p className="max-w-md text-lg leading-relaxed text-brand-light/65 transition-colors duration-500 group-hover:text-brand-light">
                  {item.desc}
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.22rem] text-brand-light/35">
                  {item.prompt}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-24 px-5 md:px-12">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.35rem] text-brand-pink">
          Proceso
        </p>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-md border border-brand-light/10 bg-brand-light/[0.03] p-5"
            >
              <span className="font-mono text-xs text-brand-pink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-5 text-xl font-medium text-brand-light">
                {step.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-brand-light/55">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Services;

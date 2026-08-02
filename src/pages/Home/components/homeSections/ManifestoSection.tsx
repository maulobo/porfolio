import { motion } from "framer-motion";

const statements = [
  {
    num: "01",
    copy: "Creamos soluciones con identidad, construidas desde las necesidades reales de cada negocio. Usamos tecnología e inteligencia artificial cuando aportan valor, siempre acompañadas por criterio, creatividad y atención al detalle.",
    color: "bg-white",
  },
  {
    num: "02",
    copy: "Trabajamos con procesos claros, comunicación directa y compromiso real. Respondemos ante los cambios, resolvemos los problemas y acompañamos cada proyecto con la responsabilidad de quienes se hacen cargo del resultado.",
    color: "bg-[#f3f0e8]",
  },
];

const ManifestoSection = () => {
  return (
    <section className="bg-[#d7ff4f] px-5 py-24 text-black md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 border-b-4 border-black pb-10 md:mb-16 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-black uppercase leading-[0.88] tracking-tight md:text-8xl"
          >
            Manifiesto
          </motion.h2>
        
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {statements.map((statement, index) => (
            <motion.article
              key={statement.num}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col border-2 border-black p-6 shadow-[10px_10px_0_#111111] transition hover:-translate-y-1 hover:shadow-[14px_14px_0_#111111] md:p-10 ${statement.color}`}
            >
            
              <p className="mt-8 text-xl font-medium leading-relaxed md:text-2xl">
                {statement.copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;

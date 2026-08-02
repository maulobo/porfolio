import { motion } from "framer-motion";

const aspects = ["mensaje", "experiencia", "sistema", "entrega"];

const StudioFiles = () => {
  return (
    <section className="bg-[#f3f0e8] px-5 py-20 text-black md:px-12 md:py-28">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="border-2 border-black bg-white p-6 shadow-[12px_12px_0_#111111] md:p-10">
          <p className="inline-block border-2 border-black bg-[#d7ff4f] px-3 py-1 text-sm font-black uppercase">
            Studio Files
          </p>
          <h2 className="mt-8 max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-normal md:text-7xl">
            Cuatro aspectos. Un mismo sistema.
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-black/68">
            Una experiencia digital no se define solamente por cómo se ve ni únicamente por cómo funciona.
            El mensaje, la interacción, la tecnología y la ejecución deben avanzar en una misma dirección.
          </p>
        </div>

        <div className="grid gap-4">
          {aspects.map((aspect, index) => (
            <motion.div
              key={aspect}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="border-2 border-black bg-[#111111] px-5 py-5 text-white shadow-[8px_8px_0_#ff2bf9]"
            >
              <span className="text-3xl font-black uppercase md:text-5xl">{aspect}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioFiles;

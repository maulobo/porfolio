import { motion } from "framer-motion";

const paragraphs = [
  "Partimos de las necesidades reales de cada negocio para construir soluciones con identidad, lógica y propósito.",
  "No aplicamos una fórmula cerrada. Analizamos el contexto, definimos prioridades y tomamos decisiones pensadas para cada caso.",
  "La tecnología y la inteligencia artificial forman parte de nuestras herramientas cuando mejoran el resultado. El criterio, la creatividad y la responsabilidad continúan siendo humanos.",
];

const StudioDirection = () => {
  return (
    <section className="bg-white px-5 py-20 text-black md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-4xl font-black uppercase leading-[0.9] md:text-6xl"
          >
            Cada proyecto necesita una dirección propia.
          </motion.h2>

          <div className="grid gap-4">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-2 border-black bg-[#f3f0e8] p-6 text-lg leading-relaxed text-black/72 shadow-[8px_8px_0_#111111] md:p-8 md:text-xl"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioDirection;

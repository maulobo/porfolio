import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const team = [
  {
    name: "Valeria",
    role: "Frontend, UX/UI y QA",
    photo: "/team/ana.jpg",
    accent: "bg-[#d7ff4f]",
  },
  {
    name: "Mauro",
    role: "Full Stack, Backend y DevOps",
    photo: "/team/mau.jpeg",
    accent: "bg-[#ff2bf9]",
  },
  {
    name: "Martín",
    role: "Producción audiovisual y 3D",
    photo: "/team/martiin.jpeg",
    accent: "bg-[#f3f0e8]",
  },
];

const Team = () => {
  return (
    <section className="bg-white px-5 py-24 text-black md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 border-b-4 border-black pb-10 md:mb-16 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex max-w-3xl flex-col text-4xl font-semibold leading-tight md:text-6xl"
          >
            <span>Un equipo presente</span>
            <span>en cada etapa.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-md text-lg leading-relaxed text-black/62"
          >
            Somos tres perfiles que integran desarrollo, experiencia de usuario y producción visual.
            Trabajamos de forma directa, con responsabilidades claras y sin capas innecesarias entre el
            cliente y quienes construyen el proyecto.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col border-2 border-black bg-white shadow-[10px_10px_0_#111111] transition hover:-translate-y-1 hover:shadow-[14px_14px_0_#111111]"
            >
              <div className="relative aspect-square overflow-hidden border-b-2 border-black">
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="text-3xl font-black leading-none md:text-4xl">{member.name}</h3>
                <span
                  className={`mt-4 inline-block w-fit border-2 border-black px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16rem] ${member.accent}`}
                >
                  {member.role}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-start">
          <Link
            to="/studio"
            className="clickable group inline-flex items-center gap-3 border-2 border-black bg-[#d7ff4f] px-6 py-4 font-semibold text-black shadow-[6px_6px_0_#111111] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_#111111]"
          >
            Conocer el estudio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Team;

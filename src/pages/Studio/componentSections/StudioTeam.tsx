import { motion } from "framer-motion";

const team = [
  {
    name: "Valeria",
    role: "Frontend Development, UX/UI y QA",
    photo: "/team/ana.jpg",
    copy: "Trabaja sobre la experiencia, la interfaz y la calidad de cada producto. Convierte conceptos y recorridos en sitios claros, consistentes y preparados para funcionar correctamente en distintos dispositivos.",
    accent: "bg-[#d7ff4f]",
  },
  {
    name: "Mauro",
    role: "Full Stack Development, Backend y DevOps",
    photo: "/team/mau.jpeg",
    copy: "Define la arquitectura y desarrolla las soluciones que sostienen cada proyecto. Trabaja sobre plataformas, paneles de gestión, integraciones, automatizaciones, infraestructura y despliegues.",
    accent: "bg-[#ff2bf9]",
  },
  {
    name: "Martín",
    role: "Producción audiovisual y diseño 3D",
    photo: "/team/martiin.jpeg",
    copy: "Construye la dimensión visual y narrativa de los proyectos. Desarrolla video, motion y piezas 3D desde la idea inicial hasta la postproducción, cuidando la coherencia y el detalle de cada entrega.",
    accent: "bg-[#f3f0e8]",
  },
];

const StudioTeam = () => {
  return (
    <section id="equipo" className="scroll-mt-24 bg-[#f3f0e8] px-5 py-20 text-black md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 border-b-4 border-black pb-8 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28rem] text-black/50">
              El equipo
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.9] md:text-6xl">
              Tres perfiles. 
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-black/62">
            Desarrollo, experiencia de usuario y producción visual trabajan de forma integrada. Cada
            integrante aporta una especialidad, pero las decisiones se construyen en conjunto.
          </p>
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
              <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-black">
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="text-4xl font-black leading-none md:text-5xl">{member.name}</h3>
                <span
                  className={`mt-4 inline-block w-fit border-2 border-black px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16rem] ${member.accent}`}
                >
                  {member.role}
                </span>
                <p className="mt-6 leading-relaxed text-black/62">{member.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioTeam;

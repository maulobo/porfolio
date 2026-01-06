import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../../../utils/projects";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Tomamos solo los primeros 4 proyectos para el home
const selectedProjects = projects.slice(0, 4);

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  return (
    <div className="group relative w-[80vw] md:w-[60vh] h-[50vh] flex-shrink-0 mx-4 md:mx-8">
      <Link to={project.link} className="block w-full h-full">
        <div className="w-full h-full overflow-hidden rounded-md relative bg-brand-gray">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-full text-brand-light">
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start">
          <h3 className="text-2xl md:text-3xl font-medium text-brand-light group-hover:text-brand-pink transition-colors">
            {project.title}
          </h3>
          <p className="text-brand-light/50 text-sm md:text-base mt-2">
            {project.category.join(" / ")}
          </p>
        </div>
      </Link>
    </div>
  );
};

const SelectedWorks = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-brand-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-12 mb-8 md:mb-12 relative z-10">
          <div className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
            <h2 className="text-sm font-mono tracking-widest uppercase text-brand-pink">
              Proyectos Destacados
            </h2>
          </div>
        </div>
        <motion.div style={{ x }} className="flex gap-0 pl-12 pr-12">
          {selectedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <div className="w-[40vw] flex flex-col justify-center items-center flex-shrink-0 mx-8">
            <Link
              to="/work"
              className="text-4xl md:text-6xl font-light text-brand-light hover:text-brand-pink transition-colors flex items-center gap-4 group"
            >
              Ver Todos{" "}
              <span className="group-hover:translate-x-4 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SelectedWorks;

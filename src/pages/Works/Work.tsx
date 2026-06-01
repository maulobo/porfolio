import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { projects, categories, Project } from "../../utils/projects";
import {
  LayoutGrid,
  List,
  ChevronDown,
  Check,
  ArrowUpRight,
} from "lucide-react";
import clsx from "clsx";
import FooterCustom, { FooterType } from "../../components/common/footerCustom/FooterCustom";
import TransitionAnimate from "../../components/common/transitionAnimate/TransitionAnimate";

const cardHoverColors = [
  "hover:bg-[#d7ff4f]",
  "hover:bg-white",
  "hover:bg-[#ff2bf9]",
  "hover:bg-white",
  "hover:bg-[#d7ff4f]",
  "hover:bg-[#ff2bf9]",
  "hover:bg-white",
  "hover:bg-[#d7ff4f]",
];

const ProjectCard: React.FC<{
  project: Project;
  viewMode: "grid" | "list";
  index: number;
}> = ({ project, viewMode, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["center end", "end start"],
  });
  const yRange = index % 2 === 0 ? [0, 20] : [0, -20];

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 100,
  });
  const y = useTransform(smoothProgress, [0, 1], yRange);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && project.hoverImages && project.hoverImages.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex(
          (prev) => (prev + 1) % project.hoverImages!.length
        );
      }, 800);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, project.hoverImages]);

  const isList = viewMode === "list";
  const accent = cardHoverColors[index % cardHoverColors.length];

  return (
    <motion.div
      ref={cardRef}
      style={{ y: !isList && isDesktop ? y : 0 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "group border-2 border-black bg-white shadow-[8px_8px_0_#111111] transition-all duration-200",
        isList ? "flex flex-col md:flex-row" : "",
        accent,
        "hover:-translate-y-1 hover:shadow-[12px_12px_0_#111111]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div
        className={clsx(
          "relative overflow-hidden border-b-2 border-black bg-[#111111] md:border-b-0",
          isList ? "md:border-r-2 md:w-[55%]" : "",
          isList ? "aspect-4/3 md:aspect-auto md:min-h-[320px]" : "aspect-4/3"
        )}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <AnimatePresence>
          {isHovered &&
            project.hoverImages &&
            project.hoverImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
              >
                <div className="relative flex h-[55%] w-[55%] items-center justify-center border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111111]">
                  <img
                    src={project.hoverImages[currentImageIndex]}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
      </div>

      {/* Content */}
      <div
        className={clsx(
          "flex flex-col justify-between p-5 md:p-7",
          isList ? "md:w-[45%]" : ""
        )}
      >
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.category.map((cat) => (
              <span
                key={cat}
                className="border-2 border-black px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16rem] text-black/70"
              >
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight text-black transition-colors duration-200 group-hover:text-black md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-black/60">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clickable inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-mono text-xs uppercase tracking-[0.18rem] text-black shadow-[3px_3px_0_#111111] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d7ff4f] hover:shadow-[5px_5px_0_#111111]"
            >
              Visitar sitio
              <ArrowUpRight size={14} />
            </a>
          )}
          <a
            href={project.link}
            className="clickable inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18rem] text-black/50 underline decoration-black/20 underline-offset-4 transition-colors duration-200 hover:text-black"
          >
            Ver proyecto
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory));

  return (
    <TransitionAnimate>
      <div className="min-h-screen bg-[#f3f0e8] px-5 pb-20 pt-8 font-sans text-black md:px-12">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="mb-12 flex flex-col gap-8 border-b-2 border-black pb-8 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3,
                }}
                className="text-6xl font-semibold leading-[0.92] tracking-tight md:text-8xl lg:text-[7rem]"
              >
                Proyectos
              </motion.h1>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
              {/* Filter */}
              <div className="relative z-20">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="clickable flex items-center gap-3 border-2 border-black bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.22rem] text-black shadow-[4px_4px_0_#111111] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111111]"
                >
                  <span>{activeCategory}</span>
                  <ChevronDown
                    size={16}
                    className={clsx(
                      "transition-transform duration-300",
                      isFilterOpen ? "rotate-180" : ""
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-72 overflow-hidden border-2 border-black bg-[#f3f0e8] shadow-[8px_8px_0_#111111]"
                    >
                      <div className="max-h-[60vh] overflow-y-auto py-1">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setActiveCategory(cat);
                              setIsFilterOpen(false);
                            }}
                            className={clsx(
                              "flex w-full items-center justify-between px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.16rem] transition-colors",
                              activeCategory === cat
                                ? "bg-[#d7ff4f] text-black"
                                : "text-black/70 hover:bg-white hover:text-black"
                            )}
                          >
                            <span>{cat}</span>
                            {activeCategory === cat && (
                              <Check size={14} className="text-black" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 border-2 border-black bg-white shadow-[4px_4px_0_#111111]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={clsx(
                    "p-3 transition-colors",
                    viewMode === "grid"
                      ? "bg-[#d7ff4f] text-black"
                      : "text-black/40 hover:text-black"
                  )}
                  aria-label="Vista de grilla"
                >
                  <LayoutGrid size={18} />
                </button>
                <div className="h-6 w-px bg-black/15" />
                <button
                  onClick={() => setViewMode("list")}
                  className={clsx(
                    "p-3 transition-colors",
                    viewMode === "list"
                      ? "bg-[#d7ff4f] text-black"
                      : "text-black/40 hover:text-black"
                  )}
                  aria-label="Vista de lista"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <motion.div
            layout
            className={clsx(
              "grid gap-6 md:gap-8",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            )}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <FooterCustom typeFooter={FooterType.FOOTERWORK} />
        </div>
      </div>
    </TransitionAnimate>
  );
};

export default Work;

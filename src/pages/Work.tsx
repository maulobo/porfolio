import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories, Project } from "../utils/projects";
import { LayoutGrid, List } from "lucide-react";
import clsx from "clsx";

const ProjectCard: React.FC<{
  project: Project;
  viewMode: "grid" | "list";
}> = ({ project, viewMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={clsx(
          "relative overflow-hidden bg-brand-gray mb-6",
          viewMode === "grid" ? "aspect-[4/3]" : "aspect-[21/9]"
        )}
      >
        {/* Main Static Image */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay Box with Carousel */}
        <AnimatePresence>
          {isHovered &&
            project.hoverImages &&
            project.hoverImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              >
                <div className="w-[45%] h-[45%] bg-brand-dark p-2 shadow-2xl relative flex items-center justify-center border border-brand-gray">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={project.hoverImages[currentImageIndex]}
                      alt=""
                      className="max-w-full max-h-full object-contain"
                    />
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* Darken background on hover */}
        <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/40 transition-colors duration-300 pointer-events-none" />
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-medium mb-2 group-hover:text-brand-pink transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-brand-light/60 text-lg">{project.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-mono text-brand-violet">
            0{project.id}
          </span>
          <div className="flex flex-wrap justify-end gap-2 max-w-[200px]">
            {project.category.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs border border-brand-gray px-2 py-1 rounded-md text-brand-light/50"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory));

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans pt-20 px-4 md:px-12 pb-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-brand-gray pb-8">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-8 md:mb-0 text-white">
            All Work
          </h1>

          <div className="flex flex-col items-end gap-6">
            {/* Filter Categories */}
            <div className="flex flex-wrap justify-end gap-4 text-sm font-medium ">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                    "px-4 py-2 rounded-full transition-all duration-300 border  ",
                    activeCategory === cat
                      ? "bg-brand-pink text-white border-brand-pink"
                      : "bg-brand-gray/20 text-brand-light/70 border-brand-gray hover:border-brand-pink hover:text-brand-pink hover:bg-brand-gray/40"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-brand-gray p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={clsx(
                  "p-2 rounded-md transition-all",
                  viewMode === "grid"
                    ? "bg-brand-dark shadow-sm text-brand-pink"
                    : "text-brand-light/40 hover:text-brand-light"
                )}
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={clsx(
                  "p-2 rounded-md transition-all",
                  viewMode === "list"
                    ? "bg-brand-dark shadow-sm text-brand-pink"
                    : "text-brand-light/40 hover:text-brand-light"
                )}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        <motion.div
          layout
          className={clsx(
            "grid gap-x-8 gap-y-16",
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Call to Action */}
        <div className="mt-32 border-t border-brand-gray pt-16">
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-white">
            Let's work together
          </h2>
          <p className="text-xl text-brand-light/60 max-w-2xl mb-8">
            Sound like your kind of studio? Tell us about your project and let’s
            work together to make it memorable.
          </p>
          <button className="text-lg border-b border-brand-pink pb-1 hover:text-brand-pink transition-colors duration-300">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Work;

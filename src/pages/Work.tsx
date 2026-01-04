import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { projects, categories, Project } from "../utils/projects";
import { LayoutGrid, List } from "lucide-react";
import clsx from "clsx";
import FooterCustom from "../components/common/footerCustom/FooterCustom";

const ProjectCard: React.FC<{
  project: Project;
  viewMode: "grid" | "list";
  index: number;
}> = ({ project, viewMode, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["center end", "end start"]
  });
  const yRange = index % 2 === 0 ? [0, 50] : [0, -50]; 

  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 });
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

  return (
    <motion.div
      ref={cardRef} 
      style={{ y: viewMode === 'grid' ? y : 0 }}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="group rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={clsx(
          "relative overflow-hidden bg-brand-gray mb-6 rounded-md",
          viewMode === "grid" ? "aspect-4/3" : "aspect-21/9"
        )}
      >
        
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 rounded-md w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none rounded-md"
              >
                <div className="w-[55%] h-[55%] bg-brand-dark rounded-md p-4 shadow-2xl relative flex items-center justify-center border border-brand-gray">
                  <img
                    src={project.hoverImages[currentImageIndex]}
                    alt=""
                    className="max-w-full max-h-full object-contain "
                  />
                </div>
              </motion.div>
            )}
        </AnimatePresence>


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
          <div className="flex flex-wrap justify-end gap-2 max-w-50">
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
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans pt-8 px-4 md:px-12 pb-20">
      <div className="max-w-400 mx-auto">
       
        <div className="flex flex-col justify-between items-end mb-16 border-b border-brand-gray pb-8">
          <div className="flex flex-row items-end gap-12">
            <div className="flex flex-row justify-end gap-4 text-sm font-medium ">
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
            <div className="flex items-center gap-2  ">
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
          <div className="self-start overflow-hidden mt-10">
            <motion.h1 
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className=" text-6xl md:text-9xl font-light tracking-tighter mb-8 md:mb-0 text-white"
            >
            All Work
            </motion.h1>
          </div>
          
        </div>

     
        <motion.div
          layout
          className={clsx(
            "grid gap-x-8 gap-y-16",
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
        <FooterCustom />
      </div>
    </div>
  );
};

export default Work;

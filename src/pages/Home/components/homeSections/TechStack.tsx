import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as simpleIcons from "simple-icons";
import {
  Boxes,
  Braces,
  Camera,
  ChevronDown,
  Cloud,
  Film,
  Image,
  Images,
  Layers,
  Mic,
  Move3d,
  PenTool,
  Plane,
  Sparkles,
  Terminal,
  Video,
  Wand2,
  type LucideIcon,
} from "lucide-react";

type Tool = {
  name: string;
  /** slug de simple-icons; si no existe, se usa `icon` */
  slug?: string;
  icon?: LucideIcon;
};

type StackGroup = {
  title: string;
  subgroups: { label?: string; tools: Tool[] }[];
};

const stackGroups: StackGroup[] = [
  {
    title: "Diseño y experiencia",
    subgroups: [
      {
        tools: [
          { name: "Figma", slug: "figma" },
          { name: "Blender", slug: "blender" },
          { name: "Adobe Illustrator", icon: PenTool },
          { name: "Adobe Photoshop", icon: Images },
        ],
      },
    ],
  },
  {
    title: "Desarrollo",
    subgroups: [
      {
        tools: [
          { name: "React", slug: "react" },
          { name: "React Native", slug: "react" },
          { name: "Next.js", slug: "nextdotjs" },
          { name: "Node.js", slug: "nodedotjs" },
          { name: "NestJS", slug: "nestjs" },
          { name: "JavaScript", slug: "javascript" },
          { name: "Three.js", slug: "threedotjs" },
          { name: "React Three Fiber", icon: Boxes },
          { name: "Supabase", slug: "supabase" },
          { name: "MongoDB", slug: "mongodb" },
          { name: "Vercel", slug: "vercel" },
          { name: "AWS", icon: Cloud },
        ],
      },
    ],
  },
  {
    title: "Automatización e inteligencia artificial",
    subgroups: [
      {
        tools: [
          { name: "n8n", slug: "n8n" },
          { name: "Anthropic", slug: "anthropic" },
        ],
      },
      {
        label: "IA de desarrollo",
        tools: [
          { name: "Claude Code", slug: "claude" },
          { name: "OpenCode", icon: Terminal },
          { name: "Codex", icon: Braces },
        ],
      },
    ],
  },
  {
    title: "Producción audiovisual",
    subgroups: [
      {
        label: "Equipos",
        tools: [
          { name: "Sony FX30 Cinema Line", slug: "sony" },
          { name: "Sony A7 III 4K", slug: "sony" },
          { name: "DJI Mini 3", slug: "dji" },
          { name: "Estabilizador DJI RS 3 Pro", slug: "dji" },
          { name: "Sistema de audio DJI", icon: Mic },
        ],
      },
      {
        label: "Software",
        tools: [
          { name: "Blender 3D", slug: "blender" },
          { name: "Adobe Lightroom", icon: Image },
          { name: "Adobe Premiere Pro", icon: Film },
          { name: "Adobe After Effects", icon: Layers },
        ],
      },
      {
        label: "IA",
        tools: [
          { name: "Kling", icon: Video },
          { name: "NanoBanana Pro", icon: Sparkles },
          { name: "Seedance 2.0", icon: Move3d },
          { name: "Veo 3", icon: Wand2 },
        ],
      },
    ],
  },
];

const fallbackIcons: Record<string, LucideIcon> = {
  sony: Camera,
  dji: Plane,
};

const getBrandIcon = (slug: string) => {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons;
  return simpleIcons[key] as { path: string } | undefined;
};

const accentColors = ["hover:bg-[#d7ff4f]", "hover:bg-white", "hover:bg-[#ff2bf9]", "hover:bg-white"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const ToolCard = ({ tool, accent }: { tool: Tool; accent: string }) => {
  const brand = tool.slug ? getBrandIcon(tool.slug) : undefined;
  const Icon = tool.icon ?? (tool.slug ? fallbackIcons[tool.slug] : undefined);

  return (
    <motion.div
      variants={item}
      className={`group relative flex flex-col items-center justify-center gap-4 border-2 border-black bg-white p-6 shadow-[6px_6px_0_#111111] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_#111111] ${accent}`}
    >
      {brand ? (
        <svg
          viewBox="0 0 24 24"
          className="h-9 w-9 shrink-0 fill-current text-black/70 transition-colors duration-200 group-hover:text-black"
          aria-hidden="true"
        >
          <path d={brand.path} />
        </svg>
      ) : Icon ? (
        <Icon
          className="h-9 w-9 shrink-0 text-black/70 transition-colors duration-200 group-hover:text-black"
          aria-hidden="true"
        />
      ) : (
        <div className="h-9 w-9 rounded-full bg-black/10" />
      )}
      <span className="text-center text-sm font-semibold leading-tight tracking-tight text-black/90 md:text-base">
        {tool.name}
      </span>
    </motion.div>
  );
};

const TechStack = () => {
  const [openGroups, setOpenGroups] = useState<number[]>([0]);

  const toggleGroup = (index: number) => {
    setOpenGroups((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  };

  return (
    <section className="bg-[#f3f0e8] px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
           
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 max-w-2xl text-4xl font-semibold leading-tight md:text-6xl"
            >
              La herramienta correcta para cada proyecto
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md text-lg leading-relaxed text-black/60"
          >
            Primero definimos el problema, el alcance y la experiencia;
            después elegimos la tecnología adecuada para resolverlo con solidez.
          </motion.p>
        </div>

        <div className="flex flex-col gap-4">
          {stackGroups.map((group, groupIndex) => {
            const isOpen = openGroups.includes(groupIndex);
            const toolCount = group.subgroups.reduce(
              (total, subgroup) => total + subgroup.tools.length,
              0
            );

            return (
              <div
                key={group.title}
                className="border-2 border-black bg-white shadow-[6px_6px_0_#111111]"
              >
                <button
                  type="button"
                  onClick={() => toggleGroup(groupIndex)}
                  aria-expanded={isOpen}
                  aria-controls={`stack-panel-${groupIndex}`}
                  className={`clickable flex w-full items-center gap-4 p-5 text-left transition-colors md:p-6 ${
                    isOpen ? "bg-[#d7ff4f]" : "bg-white hover:bg-[#f3f0e8]"
                  }`}
                >
                  
                  <h3 className="flex-1 text-lg font-semibold leading-tight md:text-2xl">
                    {group.title}
                  </h3>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.22rem] text-black/45 sm:block">
                    {toolCount}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-black bg-white">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`stack-panel-${groupIndex}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-6 border-t-2 border-black p-5 md:p-6">
                        {group.subgroups.map((subgroup, subgroupIndex) => (
                          <div key={subgroup.label ?? subgroupIndex}>
                            {subgroup.label && (
                              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22rem] text-black/40">
                                {subgroup.label}
                              </p>
                            )}
                            <motion.div
                              variants={container}
                              initial="hidden"
                              animate="show"
                              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                            >
                              {subgroup.tools.map((tool, toolIndex) => (
                                <ToolCard
                                  key={`${tool.name}-${toolIndex}`}
                                  tool={tool}
                                  accent={accentColors[(groupIndex + toolIndex) % accentColors.length]}
                                />
                              ))}
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

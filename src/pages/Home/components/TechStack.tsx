import * as simpleIcons from "simple-icons";
import { techStackRow1, techStackRow2 } from "../homeContent";

type Tool = { name: string; slug: string };

const getIcon = (slug: string) => {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons;
  return simpleIcons[key] as { path: string; title: string } | undefined;
};

const ToolItem = ({ name, slug }: Tool) => {
  const icon = getIcon(slug);

  return (
    <div className="group flex shrink-0 items-center gap-2 px-5">
      {icon && (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 fill-current opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      )}
      <span className="font-mono text-[11px] uppercase tracking-[0.18rem] opacity-60 transition-opacity duration-300 group-hover:opacity-100">
        {name}
      </span>
      <span className="ml-3 font-mono text-[11px] text-black/25">×</span>
    </div>
  );
};

const MarqueeRow = ({
  items,
  direction,
  duration,
}: {
  items: readonly Tool[];
  direction: "forward" | "reverse";
  duration: number;
}) => {
  const doubled = [...items, ...items];
  const animName = direction === "forward" ? "marquee" : "marquee-reverse";

  return (
    <div className="overflow-hidden border-b border-black/10 py-3 last:border-b-0">
      <div
        className="flex w-max"
        style={{ animation: `${animName} ${duration}s linear infinite` }}
      >
        {doubled.map((tool, i) => (
          <ToolItem key={i} name={tool.name} slug={tool.slug} />
        ))}
      </div>
    </div>
  );
};

const TechStack = () => {
  return (
    <section className="border-y-2 border-black bg-white py-8 text-black">
      <div className="mb-6 px-5 md:px-12">
        <h2 className="text-xl font-black uppercase tracking-[0.12rem]">
          Herramientas que usamos
        </h2>
      </div>

      <MarqueeRow items={techStackRow1} direction="forward" duration={50} />
      <MarqueeRow items={techStackRow2} direction="reverse" duration={50} />
    </section>
  );
};

export default TechStack;

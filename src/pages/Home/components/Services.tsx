import { useRef } from "react";
import {
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const serviceList = [
  {
    num: "01",
    title: "Descubrimiento",
    desc: "Entendiendo el núcleo de tu visión.",
  },
  {
    num: "02",
    title: "Estrategia",
    desc: "Planificando la experiencia digital.",
  },
  { num: "03", title: "Diseño", desc: "Creando excelencia visual." },
  {
    num: "04",
    title: "Desarrollo",
    desc: "Construyendo con precisión absoluta.",
  },
];

const ServiceItem = ({
  item,
  index,
}: {
  item: (typeof serviceList)[0];
  index: number;
}) => {
  return (
    <div className="group border-t border-brand-light/10 py-12 md:py-16 hover:bg-brand-light/5 transition-colors duration-500 px-4 md:px-12 cursor-default">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <span className="text-brand-pink font-mono text-sm tracking-widest">
          {item.num}
        </span>
        <h3 className="text-4xl md:text-7xl font-light text-brand-light group-hover:translate-x-4 transition-transform duration-500">
          {item.title}
        </h3>
        <p className="md:max-w-xs text-brand-light/50 text-lg group-hover:text-brand-light transition-colors duration-500">
          {item.desc}
        </p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="bg-brand-dark py-24 relative z-10 w-full">
      <div className="px-4 md:px-12 mb-16">
        <h2 className="text-sm font-mono tracking-widest uppercase text-brand-pink mb-4">
          Nuestro Enfoque
        </h2>
      </div>
      <div className="w-full">
        {serviceList.map((item, i) => (
          <ServiceItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Services;

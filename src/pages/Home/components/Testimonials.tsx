import { motion } from "framer-motion";
import { testimonials } from "../homeContent";

const rowStyles = [
  { bg: "bg-[#f3f0e8]", text: "text-black", muted: "text-black/50", border: "border-black" },
  { bg: "bg-[#111111]", text: "text-white", muted: "text-white/45", border: "border-white/20" },
  { bg: "bg-[#d7ff4f]", text: "text-black", muted: "text-black/50", border: "border-black" },
  { bg: "bg-white", text: "text-black", muted: "text-black/50", border: "border-black" },
];

const Testimonials = () => {
  return (
    <section className="border-y-2 border-black">
      <div className="border-b-2 border-black bg-[#f3f0e8] px-5 pb-8 pt-14 md:px-12">
        <h2 className="text-4xl font-black uppercase tracking-[0.08rem] md:text-5xl">
          Lo que dicen los clientes
        </h2>
      </div>

      {testimonials.map((t, index) => {
        const style = rowStyles[index % rowStyles.length];

        return (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden border-b-2 ${style.border} ${style.bg} ${style.text} px-5 py-12 md:px-12 md:py-16`}
          >
            <span
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[18vw] font-black leading-none opacity-[0.06]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
              <blockquote>
                <p className="text-3xl font-black leading-tight md:text-5xl lg:text-[3.2rem]">
                  "{t.quote}"
                </p>
              </blockquote>

              <div className="md:text-right">
                <p className="font-semibold">{t.name}</p>
                <p className={`font-mono text-[11px] uppercase tracking-[0.18rem] ${style.muted}`}>
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
};

export default Testimonials;

import { Link } from "react-router";
import { motion } from "framer-motion";
import clsx from "clsx";
import { rowVariants } from "./menuMotion";
import type { ServiceLink } from "./navigation";

type MenuRowProps = {
  to: string;
  name: string;
  description?: string;
  /** Numeral de la columna izquierda. Sin él la fila no reserva esa columna. */
  code?: string;
  status?: ServiceLink["status"];
  active: boolean;
  animate?: boolean;
  onSelect: () => void;
};

/**
 * Fila del menú. La comparten el desplegable de escritorio y el panel móvil
 * para que los dos sean exactamente la misma pieza.
 */
export default function MenuRow({
  to,
  name,
  description,
  code,
  status,
  active,
  animate = true,
  onSelect,
}: MenuRowProps) {
  return (
    <motion.div
      variants={animate ? rowVariants : undefined}
      className="border-b-2 border-[#111111]/12 last:border-b-0"
    >
      <Link
        to={to}
        aria-current={active ? "page" : undefined}
        onClick={onSelect}
        className={clsx(
          "group grid min-h-11 items-start gap-x-3 px-4 py-3.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brand-pink",
          code
            ? "grid-cols-[2.25rem_minmax(0,1fr)_auto]"
            : "grid-cols-[minmax(0,1fr)_auto]",
          active ? "bg-[#d7ff4f]" : "hover:bg-white",
        )}
      >
        {/* Decorativo: no debe ensuciar el nombre accesible del enlace. */}
        {code && (
          <span
            aria-hidden="true"
            className="mt-[3px] font-mono text-[10px] font-black uppercase tracking-[0.14rem] text-[#ff2bf9]"
          >
            {code}
          </span>
        )}

        <span className="min-w-0">
          <span className="block text-base font-semibold leading-tight md:text-lg">{name}</span>

          {description && (
            <span className="mt-1 block text-[13px] leading-relaxed text-black/62">
              {description}
            </span>
          )}

          {status && (
            <span
              className={clsx(
                "mt-2.5 inline-block border-2 border-[#111111] px-2 py-[2px] font-mono text-[9px] font-black uppercase tracking-[0.16rem]",
                status === "live" ? "bg-white" : "bg-[#ffe500]",
              )}
            >
              {status === "live" ? "Disponible" : "En construcción"}
            </span>
          )}
        </span>

        <span
          aria-hidden="true"
          className="mt-[1px] font-mono text-base font-black leading-none transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}

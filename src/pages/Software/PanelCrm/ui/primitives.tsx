import type { CSSProperties, ReactNode, SelectHTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { initials } from "../lib/format";
import type { DeadlineColor } from "../lib/format";
import type { Health } from "../data/types";

/* ── Layout bento ───────────────────────────────────────────────────────── */

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-12 gap-[var(--crm-gap)]", className)}>{children}</div>
  );
}

const SPAN_CLASS: Record<number, string> = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  12: "md:col-span-12",
};

/**
 * Celda del layout bento. `span` son columnas de 12 a partir de `md`;
 * en móvil todas ocupan el ancho completo.
 */
export function BentoCard({
  children,
  span = 12,
  accent = false,
  padded = true,
  className,
  style,
}: {
  children: ReactNode;
  span?: 3 | 4 | 5 | 6 | 7 | 8 | 12;
  accent?: boolean;
  padded?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section
      className={cn(
        "col-span-12 flex flex-col rounded-[var(--crm-radius)] border transition-colors",
        SPAN_CLASS[span],
        padded && "p-4 sm:p-5",
        className,
      )}
      style={{
        background: accent
          ? "linear-gradient(160deg, color-mix(in srgb, var(--crm-danger) 12%, var(--crm-surface)), var(--crm-surface) 60%)"
          : "var(--crm-surface)",
        borderColor: accent ? "color-mix(in srgb, var(--crm-danger) 45%, transparent)" : "var(--crm-border)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/* ── KPI ────────────────────────────────────────────────────────────────── */

export function Kpi({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "danger" | "success" | "warning";
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--crm-text-dim)]">
        {label}
      </span>
      <span
        className="text-2xl font-bold tracking-tight sm:text-[1.7rem]"
        style={tone ? { color: `var(--crm-${tone})` } : undefined}
      >
        {value}
      </span>
      {hint && <span className="text-xs text-[var(--crm-text-dim)]">{hint}</span>}
    </div>
  );
}

/* ── Chips ──────────────────────────────────────────────────────────────── */

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

export function Chip({
  children,
  tone = "neutral",
  className,
  title,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  title?: string;
}) {
  const color = `var(--crm-${tone === "neutral" ? "neutral" : tone})`;
  return (
    <span
      title={title}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap",
        className,
      )}
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

/** Tono por valor de estado. Un solo mapa para todos los dominios del panel. */
const STATUS_TONE: Record<string, Tone> = {
  // contratos
  cotizacion: "info", activo: "success", suspendido: "warning",
  en_cierre: "info", finalizado: "neutral",
  // clientes
  active: "success", prospect: "info", archived: "neutral",
  // programación
  planned: "neutral", closed: "neutral",
  // equipos
  operativo: "success", disponible: "info", en_service: "warning", fuera_servicio: "danger",
  // mantenimiento
  programado: "info", en_curso: "warning", realizado: "success", vencido: "danger",
  preventivo: "info", correctivo: "warning", predictivo: "neutral",
  // certificaciones: "observada" es plata trabada, va en rojo a propósito
  borrador: "neutral", presentada: "info", aprobada: "success",
  observada: "danger", facturada: "neutral",
  // cotizaciones / facturas
  draft: "neutral", sent: "info", accepted: "success", rejected: "danger", expired: "warning",
  issued: "info", paid: "success", overdue: "danger", cancelled: "neutral",
  // HSE
  incidente: "warning", casi_incidente: "info", observacion: "neutral", derrame: "danger",
  leve: "neutral", moderado: "warning", grave: "danger", critico: "danger",
  abierto: "danger", en_investigacion: "warning", cerrado: "success",
  conforme: "success", observaciones: "warning", no_conforme: "danger",
  // residuos
  emitido: "neutral", en_transito: "info", recibido: "info", tratado: "warning",
  // prioridades
  low: "neutral", medium: "info", high: "warning", urgent: "danger",
};

export function StatusChip({ value, label }: { value: string; label: string }) {
  return <Chip tone={STATUS_TONE[value] ?? "neutral"}>{label}</Chip>;
}

/* ── Semáforo ───────────────────────────────────────────────────────────── */

const DOT_VAR: Record<DeadlineColor | Health, string> = {
  green: "var(--crm-success)",
  yellow: "var(--crm-warning)",
  red: "var(--crm-danger)",
  grey: "var(--crm-neutral)",
};

export function ColorDot({ color, title }: { color: DeadlineColor | Health; title?: string }) {
  return (
    <span
      title={title}
      aria-label={title}
      className="inline-block size-2.5 shrink-0 rounded-full"
      style={{
        background: DOT_VAR[color],
        boxShadow: `0 0 0 3px color-mix(in srgb, ${DOT_VAR[color]} 20%, transparent)`,
      }}
    />
  );
}

/* ── Cabeceras y vacíos ─────────────────────────────────────────────────── */

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-[var(--crm-text-dim)]">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--crm-text-dim)]">
      {children}
    </h2>
  );
}

export function EmptyState({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-10 text-center text-sm text-[var(--crm-text-dim)]">
      <p>{title}</p>
      {action}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t", className)} style={{ borderColor: "var(--crm-border)" }} />;
}

/* ── Avatares ───────────────────────────────────────────────────────────── */

export function Avatar({ name, size = 30 }: { name: string; size?: number }) {
  return (
    <span
      title={name}
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.38),
        background: "color-mix(in srgb, var(--crm-accent) 22%, var(--crm-surface-3))",
        color: "var(--crm-text)",
      }}
    >
      {initials(name)}
    </span>
  );
}

export function AvatarGroup({ names, size = 26 }: { names: string[]; size?: number }) {
  const shown = names.slice(0, 4);
  const rest = names.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((name, i) => (
        <span
          key={name + i}
          className="rounded-full"
          style={{ marginLeft: i === 0 ? 0 : -8, boxShadow: "0 0 0 2px var(--crm-surface)" }}
        >
          <Avatar name={name} size={size} />
        </span>
      ))}
      {rest > 0 && (
        <span
          className="inline-flex items-center justify-center rounded-full text-[0.65rem] font-semibold"
          style={{
            width: size, height: size, marginLeft: -8,
            background: "var(--crm-surface-3)", color: "var(--crm-text-dim)",
            boxShadow: "0 0 0 2px var(--crm-surface)",
          }}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}

/* ── Progreso ───────────────────────────────────────────────────────────── */

export function Progress({
  value,
  tone = "accent",
  height = 6,
}: {
  value: number;
  tone?: "accent" | "success" | "warning" | "danger";
  height?: number;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="w-full overflow-hidden rounded-full"
      style={{ height, background: "var(--crm-surface-3)" }}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${pct}%`, background: `var(--crm-${tone})` }}
      />
    </div>
  );
}

/* ── Controles ──────────────────────────────────────────────────────────── */

const controlBase =
  "rounded-[var(--crm-radius-sm)] border bg-[var(--crm-surface-2)] px-3 py-2 text-sm outline-none transition-colors focus-visible:border-[var(--crm-accent)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--crm-accent)_35%,transparent)]";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--crm-text-dim)]">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(controlBase, "cursor-pointer appearance-none pr-8", className)}
      style={{
        borderColor: "var(--crm-border)",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round'><path d='m6 9 6 6 6-6'/></svg>\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 8px center",
      }}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlBase, className)} style={{ borderColor: "var(--crm-border)" }} />;
}

export function Button({
  variant = "solid",
  className,
  children,
  style,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline" | "ghost" }) {
  const styles: Record<string, CSSProperties> = {
    solid: { background: "var(--crm-accent)", color: "var(--crm-accent-text)", borderColor: "transparent" },
    outline: { background: "transparent", color: "var(--crm-text)", borderColor: "var(--crm-border-strong)" },
    ghost: { background: "transparent", color: "var(--crm-text-dim)", borderColor: "transparent" },
  };
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-[var(--crm-radius-sm)] border px-3 py-2 text-sm font-semibold transition-opacity",
        "hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--crm-accent)]",
        className,
      )}
      style={{ ...styles[variant], ...style }}
    >
      {children}
    </button>
  );
}

/* ── Aviso de contexto ──────────────────────────────────────────────────── */

export function Note({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div
      className="mb-4 flex items-start gap-2.5 rounded-[var(--crm-radius-sm)] border p-3 text-sm"
      style={{
        borderColor: "color-mix(in srgb, var(--crm-info) 35%, transparent)",
        background: "color-mix(in srgb, var(--crm-info) 8%, transparent)",
      }}
    >
      {icon && <span className="mt-0.5 shrink-0 text-[var(--crm-info)]">{icon}</span>}
      <div className="text-[var(--crm-text-dim)]">{children}</div>
    </div>
  );
}

import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/cn";
import { EmptyState } from "./primitives";

export interface Column<T> {
  /** Identificador único de la columna. */
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  /** Devolver un valor ordenable habilita el click en el encabezado. */
  sortValue?: (row: T) => string | number;
  /** Oculta la columna en pantallas chicas para que la tabla no se apriete. */
  hideBelow?: "sm" | "md" | "lg";
  align?: "left" | "right";
}

const HIDE_CLASS = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
} as const;

export function DataTable<T extends { id: string }>({
  columns,
  data,
  emptyMessage = "Sin resultados.",
  onRowClick,
}: {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}) {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);

  const rows = useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return data;
    const factor = sort.dir === "asc" ? 1 : -1;
    // Copiamos antes de ordenar para no mutar el array que llega por props.
    return [...data].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * factor;
      return String(av).localeCompare(String(bv), "es") * factor;
    });
  }, [data, sort, columns]);

  if (!data.length) return <EmptyState title={emptyMessage} />;

  const toggleSort = (key: string) =>
    setSort((prev) =>
      prev?.key === key ? (prev.dir === "asc" ? { key, dir: "desc" } : null) : { key, dir: "asc" },
    );

  return (
    <div className="crm-scroll -mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => {
              const sortable = !!col.sortValue;
              const isSorted = sort?.key === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={isSorted ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                  className={cn(
                    "border-b px-3 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[var(--crm-text-dim)]",
                    col.align === "right" ? "text-right" : "text-left",
                    col.hideBelow && HIDE_CLASS[col.hideBelow],
                  )}
                  style={{ borderColor: "var(--crm-border)" }}
                >
                  {sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className={cn(
                        "inline-flex items-center gap-1 uppercase tracking-[0.08em] transition-colors hover:text-[var(--crm-text)]",
                        col.align === "right" && "flex-row-reverse",
                      )}
                    >
                      {col.header}
                      {isSorted ? (
                        sort.dir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />
                      ) : (
                        <ChevronsUpDown size={13} className="opacity-40" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              role={onRowClick ? "button" : undefined}
              onKeyDown={
                onRowClick
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onRowClick(row);
                      }
                    }
                  : undefined
              }
              className={cn(
                "border-b last:border-b-0",
                onRowClick &&
                  "cursor-pointer transition-colors hover:bg-[var(--crm-surface-2)] focus-visible:bg-[var(--crm-surface-2)] focus-visible:outline-none",
              )}
              style={{ borderColor: "var(--crm-border)" }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-3 py-3 align-middle",
                    col.align === "right" && "text-right",
                    col.hideBelow && HIDE_CLASS[col.hideBelow],
                  )}
                >
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

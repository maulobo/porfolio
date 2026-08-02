import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { PRIORITY_LABEL } from "../data/labels";
import { workOrderColumns, workOrders } from "../data/mock";
import { contractName, getContract, getEquipment, getPerson } from "../data/selectors";
import type { WorkOrder, WorkOrderPriority } from "../data/types";
import { daysTo, deadlineColor, fmtDate, relativeDays } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  Avatar,
  BentoCard,
  BentoGrid,
  ColorDot,
  Field,
  Kpi,
  PageHeader,
  Select,
  StatusChip,
} from "../ui/primitives";
import { DataTable, type Column } from "../ui/DataTable";

const columnName = (columnId: string) =>
  workOrderColumns.find((c) => c.id === columnId)?.name ?? "—";

/** Vista transversal: todas las órdenes de todos los contratos en una sola lista. */
export default function WorkOrders() {
  const navigate = useNavigate();
  const [contract, setContract] = useState<"all" | string>("all");
  const [priority, setPriority] = useState<"all" | WorkOrderPriority>("all");
  const [onlyOpen, setOnlyOpen] = useState<"open" | "all">("open");

  const rows = useMemo(() => {
    return workOrders
      .filter((w) => {
        if (contract !== "all" && w.contract_id !== contract) return false;
        if (priority !== "all" && w.priority !== priority) return false;
        if (onlyOpen === "open" && /cerrad/i.test(columnName(w.column_id))) return false;
        return true;
      })
      .sort((a, b) => (a.due_date ?? "9999").localeCompare(b.due_date ?? "9999"));
  }, [contract, priority, onlyOpen]);

  const open = workOrders.filter((w) => !/cerrad/i.test(columnName(w.column_id)));
  const overdue = open.filter((w) => (daysTo(w.due_date) ?? 999) < 0);
  const dueThisWeek = open.filter((w) => {
    const d = daysTo(w.due_date);
    return d !== null && d >= 0 && d <= 7;
  });

  const columns: Column<WorkOrder>[] = [
    {
      key: "code",
      header: "Orden",
      sortValue: (w) => w.code,
      cell: (w) => (
        <div className="flex items-start gap-2.5">
          <ColorDot color={deadlineColor(w.due_date)} />
          <div className="min-w-0">
            <p className="font-mono text-[0.68rem] font-bold" style={{ color: "var(--crm-accent)" }}>
              {w.code}
            </p>
            <p className="truncate text-sm font-semibold">{w.title}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contract",
      header: "Contrato",
      sortValue: (w) => contractName(w.contract_id),
      cell: (w) => (
        <div className="min-w-0">
          <p className="truncate text-sm">{contractName(w.contract_id)}</p>
          <p className="truncate text-xs text-[var(--crm-text-dim)]">
            {getContract(w.contract_id)?.field}
          </p>
        </div>
      ),
      hideBelow: "sm",
    },
    {
      key: "equipment",
      header: "Equipo",
      sortValue: (w) => getEquipment(w.equipment_id)?.internal_code ?? "",
      cell: (w) => {
        const eq = getEquipment(w.equipment_id);
        return eq ? <span className="font-mono text-xs">{eq.internal_code}</span> : "—";
      },
      hideBelow: "lg",
    },
    {
      key: "assignee",
      header: "Responsable",
      sortValue: (w) => getPerson(w.assignee_id)?.full_name ?? "",
      cell: (w) => {
        const p = getPerson(w.assignee_id);
        return p ? (
          <div className="flex items-center gap-2">
            <Avatar name={p.full_name} size={24} />
            <span className="truncate text-xs">{p.full_name}</span>
          </div>
        ) : (
          <span className="text-xs text-[var(--crm-text-faint)]">Sin asignar</span>
        );
      },
      hideBelow: "lg",
    },
    {
      key: "state",
      header: "Estado",
      sortValue: (w) => columnName(w.column_id),
      cell: (w) => <StatusChip value="presentada" label={columnName(w.column_id)} />,
      hideBelow: "md",
    },
    {
      key: "priority",
      header: "Prioridad",
      sortValue: (w) => w.priority,
      cell: (w) => <StatusChip value={w.priority} label={PRIORITY_LABEL[w.priority]} />,
    },
    {
      key: "due",
      header: "Vence",
      align: "right",
      sortValue: (w) => w.due_date ?? "9999",
      cell: (w) => {
        const d = daysTo(w.due_date);
        if (!w.due_date) return <span className="text-xs text-[var(--crm-text-faint)]">—</span>;
        return (
          <div>
            <p className="text-sm">{fmtDate(w.due_date)}</p>
            <p
              className="text-xs"
              style={{ color: (d ?? 0) < 0 ? "var(--crm-danger)" : "var(--crm-text-dim)" }}
            >
              {relativeDays(d)}
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader
        title="Órdenes de trabajo"
        subtitle="Todas las órdenes abiertas, ordenadas por vencimiento"
      />

      <BentoGrid>
        <BentoCard span={4}>
          <Kpi label="Órdenes abiertas" value={open.length} hint={`${workOrders.length} en total`} />
        </BentoCard>
        <BentoCard span={4} accent={overdue.length > 0}>
          <Kpi
            label="Vencidas"
            value={overdue.length}
            tone={overdue.length ? "danger" : undefined}
            hint={overdue.length ? "pasaron su fecha objetivo" : "ninguna atrasada"}
          />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi label="Vencen esta semana" value={dueThisWeek.length} hint="próximos 7 días" />
        </BentoCard>

        <BentoCard span={12}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Field label="Contrato">
              <Select
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                className="sm:w-64"
              >
                <option value="all">Todos</option>
                {Array.from(new Set(workOrders.map((w) => w.contract_id))).map((id) => (
                  <option key={id} value={id}>
                    {contractName(id)}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Prioridad">
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value as typeof priority)}
                className="sm:w-40"
              >
                <option value="all">Todas</option>
                {(Object.keys(PRIORITY_LABEL) as WorkOrderPriority[]).map((p) => (
                  <option key={p} value={p}>
                    {PRIORITY_LABEL[p]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Mostrar">
              <Select
                value={onlyOpen}
                onChange={(e) => setOnlyOpen(e.target.value as typeof onlyOpen)}
                className="sm:w-44"
              >
                <option value="open">Sólo abiertas</option>
                <option value="all">Todas</option>
              </Select>
            </Field>
          </div>

          <DataTable
            columns={columns}
            data={rows}
            emptyMessage="No hay órdenes con esos filtros."
            onRowClick={(w) => navigate(crmPath(`contratos/${w.contract_id}/ordenes`))}
          />
        </BentoCard>
      </BentoGrid>
    </>
  );
}

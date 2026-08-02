import { useMemo, useState } from "react";
import { CheckCircle2, Plus, Receipt } from "lucide-react";
import { invoices as allInvoices } from "../data/mock";
import { INVOICE_STATUS_LABEL } from "../data/labels";
import { clientName, contractName } from "../data/selectors";
import type { Invoice, InvoiceStatus } from "../data/types";
import { daysTo, fmtDate, fmtMoney } from "../lib/format";
import {
  BentoCard,
  BentoGrid,
  Button,
  Field,
  Kpi,
  PageHeader,
  Select,
  StatusChip,
} from "../ui/primitives";
import { DataTable, type Column } from "../ui/DataTable";

/**
 * Tabla de facturas. Se usa suelta en Facturación y embebida en la tab de un
 * contrato (`contractId`), donde se oculta la columna de cliente.
 */
export function InvoicesTable({ contractId }: { contractId?: string }) {
  const [status, setStatus] = useState<"all" | InvoiceStatus>("all");
  /** «Marcar cobrada» es una demo: sólo vive en este estado local. */
  const [paidLocal, setPaidLocal] = useState<Set<string>>(new Set());

  const scoped = useMemo(
    () => allInvoices.filter((i) => !contractId || i.contract_id === contractId),
    [contractId],
  );

  const effective = useMemo(
    () =>
      scoped.map((i) =>
        paidLocal.has(i.id) ? { ...i, status: "paid" as const, payment_method: "Transferencia" } : i,
      ),
    [scoped, paidLocal],
  );

  const rows = useMemo(
    () => effective.filter((i) => status === "all" || i.status === status),
    [effective, status],
  );

  const columns = useMemo<Column<Invoice>[]>(() => {
    const cols: Column<Invoice>[] = [
      {
        key: "number",
        header: "Comprobante",
        sortValue: (i) => i.invoice_number,
        cell: (i) => (
          <span className="inline-flex items-center gap-2">
            <Receipt size={15} className="shrink-0 opacity-50" />
            <span className="font-mono text-xs">{i.invoice_number}</span>
          </span>
        ),
      },
    ];

    if (!contractId) {
      cols.push({
        key: "client",
        header: "Cliente",
        sortValue: (i) => clientName(i.client_id),
        cell: (i) => (
          <div className="min-w-0">
            <p className="truncate text-sm">{clientName(i.client_id)}</p>
            {i.contract_id && (
              <p className="truncate text-xs text-[var(--crm-text-dim)]">
                {contractName(i.contract_id)}
              </p>
            )}
          </div>
        ),
        hideBelow: "sm",
      });
    }

    cols.push(
      {
        key: "issue",
        header: "Emisión",
        sortValue: (i) => i.issue_date,
        cell: (i) => fmtDate(i.issue_date),
        hideBelow: "lg",
      },
      {
        key: "due",
        header: "Vencimiento",
        sortValue: (i) => i.due_date,
        cell: (i) => {
          const d = daysTo(i.due_date);
          const late = i.status === "overdue";
          return (
            <div>
              <p className="text-sm">{fmtDate(i.due_date)}</p>
              {late && d !== null && (
                <p className="text-xs font-semibold" style={{ color: "var(--crm-danger)" }}>
                  {Math.abs(d)} días de atraso
                </p>
              )}
            </div>
          );
        },
        hideBelow: "md",
      },
      {
        key: "amount",
        header: "Monto",
        align: "right",
        sortValue: (i) => i.total_amount,
        cell: (i) => <span className="font-semibold">{fmtMoney(i.total_amount, i.currency)}</span>,
      },
      {
        key: "status",
        header: "Estado",
        sortValue: (i) => i.status,
        cell: (i) => <StatusChip value={i.status} label={INVOICE_STATUS_LABEL[i.status]} />,
      },
      {
        key: "actions",
        header: "",
        align: "right",
        cell: (i) =>
          i.status === "issued" || i.status === "overdue" ? (
            <Button
              variant="ghost"
              className="px-2 py-1 text-xs"
              style={{ color: "var(--crm-accent)" }}
              onClick={(e) => {
                e.stopPropagation();
                setPaidLocal((prev) => new Set(prev).add(i.id));
              }}
            >
              <CheckCircle2 size={14} />
              Marcar cobrada
            </Button>
          ) : null,
      },
    );

    return cols;
  }, [contractId]);

  return (
    <>
      <div className="mb-4">
        <Field label="Estado">
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="sm:w-48"
          >
            <option value="all">Todos</option>
            {(Object.keys(INVOICE_STATUS_LABEL) as InvoiceStatus[]).map((s) => (
              <option key={s} value={s}>
                {INVOICE_STATUS_LABEL[s]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <DataTable columns={columns} data={rows} emptyMessage="Sin comprobantes para mostrar." />
    </>
  );
}

export default function Invoices() {
  const pending = allInvoices
    .filter((i) => i.status === "issued")
    .reduce((a, i) => a + i.total_amount, 0);
  const overdueList = allInvoices.filter((i) => i.status === "overdue");
  const overdue = overdueList.reduce((a, i) => a + i.total_amount, 0);
  const paid = allInvoices.filter((i) => i.status === "paid").reduce((a, i) => a + i.total_amount, 0);

  /** Atraso promedio ponderado de lo vencido, para dimensionar la cobranza. */
  const avgDelay = overdueList.length
    ? Math.round(
        overdueList.reduce((a, i) => a + Math.abs(daysTo(i.due_date) ?? 0), 0) / overdueList.length,
      )
    : 0;

  return (
    <>
      <PageHeader
        title="Facturación"
        subtitle="Cobranzas de contratos y abonos"
        actions={
          <Button disabled title="En la demo el alta está deshabilitada: no hay backend detrás.">
            <Plus size={16} />
            Nuevo comprobante
          </Button>
        }
      />

      <BentoGrid>
        <BentoCard span={4}>
          <Kpi label="Pendiente de cobro" value={fmtMoney(pending)} hint="comprobantes emitidos" />
        </BentoCard>
        <BentoCard span={4} accent={overdue > 0}>
          <Kpi
            label="Vencido"
            value={fmtMoney(overdue)}
            tone={overdue > 0 ? "danger" : undefined}
            hint={avgDelay ? `${avgDelay} días de atraso promedio` : "sin atrasos"}
          />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi label="Cobrado" value={fmtMoney(paid)} hint="acumulado del período" />
        </BentoCard>

        <BentoCard span={12}>
          <InvoicesTable />
        </BentoCard>
      </BentoGrid>
    </>
  );
}

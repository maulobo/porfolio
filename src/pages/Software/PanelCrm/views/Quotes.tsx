import { useMemo, useState } from "react";
import { FileText, Plus } from "lucide-react";
import { quotes } from "../data/mock";
import { QUOTE_STATUS_LABEL } from "../data/labels";
import { clientName } from "../data/selectors";
import type { Quote, QuoteStatus } from "../data/types";
import { fmtDate, fmtMoney } from "../lib/format";
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

export function QuotesTable({ contractId }: { contractId?: string }) {
  const [status, setStatus] = useState<"all" | QuoteStatus>("all");

  const rows = useMemo(
    () =>
      quotes.filter(
        (q) =>
          (!contractId || q.contract_id === contractId) && (status === "all" || q.status === status),
      ),
    [contractId, status],
  );

  const columns = useMemo<Column<Quote>[]>(() => {
    const cols: Column<Quote>[] = [
      {
        key: "title",
        header: "Cotización",
        sortValue: (q) => q.title,
        cell: (q) => (
          <div className="flex items-center gap-2">
            <FileText size={15} className="shrink-0 opacity-50" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{q.title}</p>
              {q.tender_number && (
                <p className="truncate font-mono text-xs text-[var(--crm-text-dim)]">
                  {q.tender_number}
                </p>
              )}
            </div>
          </div>
        ),
      },
    ];

    if (!contractId) {
      cols.push({
        key: "client",
        header: "Cliente",
        sortValue: (q) => clientName(q.client_id),
        cell: (q) => clientName(q.client_id),
        hideBelow: "sm",
      });
    }

    cols.push(
      {
        key: "amount",
        header: "Monto",
        align: "right",
        sortValue: (q) => q.total_amount,
        cell: (q) => <span className="font-semibold">{fmtMoney(q.total_amount, q.currency)}</span>,
      },
      {
        key: "sent",
        header: "Enviada",
        sortValue: (q) => q.sent_at ?? "",
        cell: (q) => fmtDate(q.sent_at),
        hideBelow: "md",
      },
      {
        key: "valid",
        header: "Válida hasta",
        sortValue: (q) => q.valid_until ?? "",
        cell: (q) => fmtDate(q.valid_until),
        hideBelow: "lg",
      },
      {
        key: "status",
        header: "Estado",
        sortValue: (q) => q.status,
        cell: (q) => <StatusChip value={q.status} label={QUOTE_STATUS_LABEL[q.status]} />,
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
            className="sm:w-52"
          >
            <option value="all">Todos</option>
            {(Object.keys(QUOTE_STATUS_LABEL) as QuoteStatus[]).map((s) => (
              <option key={s} value={s}>
                {QUOTE_STATUS_LABEL[s]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <DataTable columns={columns} data={rows} emptyMessage="Sin cotizaciones para mostrar." />
    </>
  );
}

export default function Quotes() {
  const sent = quotes.filter((q) => q.status === "sent");
  const accepted = quotes.filter((q) => q.status === "accepted");
  const rejected = quotes.filter((q) => q.status === "rejected");
  const pipeline = sent.reduce((a, q) => a + q.total_amount, 0);
  const resolved = accepted.length + rejected.length;

  return (
    <>
      <PageHeader
        title="Cotizaciones"
        subtitle="Pipeline comercial y licitaciones · una cotización adjudicada genera el contrato"
        actions={
          <Button disabled title="En la demo el alta está deshabilitada: no hay backend detrás.">
            <Plus size={16} />
            Nueva cotización
          </Button>
        }
      />

      <BentoGrid>
        <BentoCard span={4}>
          <Kpi
            label="En pipeline"
            value={fmtMoney(pipeline)}
            hint={`${sent.length} enviadas sin resolver`}
          />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi label="Adjudicadas" value={accepted.length} hint="convertidas en contrato" />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi
            label="Tasa de adjudicación"
            value={resolved ? `${Math.round((accepted.length / resolved) * 100)}%` : "—"}
            hint="sobre cotizaciones resueltas"
          />
        </BentoCard>

        <BentoCard span={12}>
          <QuotesTable />
        </BentoCard>
      </BentoGrid>
    </>
  );
}

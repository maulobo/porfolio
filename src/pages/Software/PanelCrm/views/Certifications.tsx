import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";
import { certifications } from "../data/mock";
import { CERTIFICATION_STATUS_LABEL } from "../data/labels";
import { contractName, getContract } from "../data/selectors";
import type { Certification, CertificationStatus } from "../data/types";
import { fmtDate, fmtMoney } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  BentoCard,
  BentoGrid,
  Field,
  Kpi,
  Note,
  PageHeader,
  Select,
  StatusChip,
} from "../ui/primitives";
import { DataTable, type Column } from "../ui/DataTable";

/**
 * El ciclo de certificación es donde se traba la plata del rubro: el trabajo
 * está hecho, pero hasta que el cliente no aprueba el certificado no se puede
 * emitir la factura, y hasta que no vence la factura no entra el dinero.
 */
export function CertificationsTable({ contractId }: { contractId?: string }) {
  const [status, setStatus] = useState<"all" | CertificationStatus>("all");

  const rows = useMemo(
    () =>
      certifications
        .filter(
          (c) =>
            (!contractId || c.contract_id === contractId) &&
            (status === "all" || c.status === status),
        )
        .sort((a, b) => b.period.localeCompare(a.period)),
    [contractId, status],
  );

  const columns = useMemo<Column<Certification>[]>(() => {
    const cols: Column<Certification>[] = [
      {
        key: "period",
        header: "Período",
        sortValue: (c) => c.period,
        cell: (c) => <span className="font-mono text-sm font-semibold">{c.period}</span>,
      },
    ];

    if (!contractId) {
      cols.push({
        key: "contract",
        header: "Contrato",
        sortValue: (c) => contractName(c.contract_id),
        cell: (c) => (
          <div className="min-w-0">
            <p className="truncate text-sm">{contractName(c.contract_id)}</p>
            <p className="truncate text-xs text-[var(--crm-text-dim)]">
              {getContract(c.contract_id)?.field}
            </p>
          </div>
        ),
        hideBelow: "sm",
      });
    }

    cols.push(
      {
        key: "units",
        header: "Medición",
        align: "right",
        sortValue: (c) => c.units,
        cell: (c) => (
          <span className="text-sm">
            {c.units.toLocaleString("es-AR")}{" "}
            <span className="text-xs text-[var(--crm-text-dim)]">{c.unit_label}</span>
          </span>
        ),
        hideBelow: "md",
      },
      {
        key: "amount",
        header: "Monto",
        align: "right",
        sortValue: (c) => c.amount,
        cell: (c) => <span className="font-semibold">{fmtMoney(c.amount, c.currency)}</span>,
      },
      {
        key: "submitted",
        header: "Presentada",
        sortValue: (c) => c.submitted_at ?? "",
        cell: (c) => fmtDate(c.submitted_at),
        hideBelow: "lg",
      },
      {
        key: "approved",
        header: "Aprobada",
        sortValue: (c) => c.approved_at ?? "",
        cell: (c) => fmtDate(c.approved_at),
        hideBelow: "lg",
      },
      {
        key: "status",
        header: "Estado",
        sortValue: (c) => c.status,
        cell: (c) => (
          <div className="flex flex-col items-start gap-1">
            <StatusChip value={c.status} label={CERTIFICATION_STATUS_LABEL[c.status]} />
            {c.observation && (
              <span className="max-w-[220px] text-xs" style={{ color: "var(--crm-danger)" }}>
                {c.observation}
              </span>
            )}
          </div>
        ),
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
            {(Object.keys(CERTIFICATION_STATUS_LABEL) as CertificationStatus[]).map((s) => (
              <option key={s} value={s}>
                {CERTIFICATION_STATUS_LABEL[s]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <DataTable columns={columns} data={rows} emptyMessage="Sin certificaciones para mostrar." />
    </>
  );
}

export default function Certifications() {
  const draft = certifications.filter((c) => c.status === "borrador");
  const submitted = certifications.filter((c) => c.status === "presentada");
  const approved = certifications.filter((c) => c.status === "aprobada");
  const observed = certifications.filter((c) => c.status === "observada");

  const sum = (list: Certification[]) => list.reduce((a, c) => a + c.amount, 0);

  return (
    <>
      <PageHeader
        title="Certificaciones"
        subtitle="Del parte diario a la factura: estado de cada período liquidado"
      />

      {observed.length > 0 && (
        <Note icon={<AlertTriangle size={16} />}>
          <strong>{fmtMoney(sum(observed))}</strong> están trabados por certificaciones observadas.
          Suele resolverse adjuntando remitos o partes firmados, pero mientras tanto no se puede
          facturar.
        </Note>
      )}

      <BentoGrid>
        <BentoCard span={3}>
          <Kpi label="En borrador" value={fmtMoney(sum(draft))} hint={`${draft.length} períodos sin presentar`} />
        </BentoCard>
        <BentoCard span={3}>
          <Kpi
            label="Presentadas"
            value={fmtMoney(sum(submitted))}
            hint={`${submitted.length} esperando aprobación`}
          />
        </BentoCard>
        <BentoCard span={3}>
          <Kpi
            label="Aprobadas sin facturar"
            value={fmtMoney(sum(approved))}
            hint={`${approved.length} listas para facturar`}
            tone={approved.length ? "success" : undefined}
          />
        </BentoCard>
        <BentoCard span={3} accent={observed.length > 0}>
          <Kpi
            label="Observadas"
            value={fmtMoney(sum(observed))}
            tone={observed.length ? "danger" : undefined}
            hint={`${observed.length} devueltas por el cliente`}
          />
        </BentoCard>

        {/* Embudo del ciclo */}
        <BentoCard span={12}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {[
              { label: "Borrador", list: draft, tone: "var(--crm-neutral)" },
              { label: "Presentada", list: submitted, tone: "var(--crm-info)" },
              { label: "Aprobada", list: approved, tone: "var(--crm-success)" },
              { label: "Observada", list: observed, tone: "var(--crm-danger)" },
            ].map((step) => (
              <div
                key={step.label}
                className="flex-1 rounded-[var(--crm-radius-sm)] border p-3"
                style={{
                  borderColor: `color-mix(in srgb, ${step.tone} 35%, transparent)`,
                  background: `color-mix(in srgb, ${step.tone} 7%, transparent)`,
                }}
              >
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: step.tone }}>
                  {step.label}
                </p>
                <p className="mt-1 text-lg font-bold">{fmtMoney(sum(step.list))}</p>
                <p className="text-xs text-[var(--crm-text-dim)]">
                  {step.list.length} {step.list.length === 1 ? "certificación" : "certificaciones"}
                </p>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard span={12}>
          <CertificationsTable />
        </BentoCard>

        {observed.length > 0 && (
          <BentoCard span={12}>
            <h2 className="mb-3 text-base font-bold">Observaciones a resolver</h2>
            <ul className="flex flex-col gap-3">
              {observed.map((c) => (
                <li key={c.id} className="flex items-start gap-2.5">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--crm-danger)" }} />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={crmPath(`contratos/${c.contract_id}/certificaciones`)}
                      className="text-sm font-semibold transition-colors hover:text-[var(--crm-accent)]"
                    >
                      {contractName(c.contract_id)} · {c.period}
                    </Link>
                    <p className="mt-0.5 text-xs text-[var(--crm-text-dim)]">{c.observation}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold">{fmtMoney(c.amount, c.currency)}</span>
                </li>
              ))}
            </ul>
          </BentoCard>
        )}
      </BentoGrid>
    </>
  );
}

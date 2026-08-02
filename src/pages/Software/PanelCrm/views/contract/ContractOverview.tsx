import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import { CERTIFICATION_STATUS_LABEL, SCHEDULE_STATUS_LABEL, SERVICE_LINE_LABEL } from "../../data/labels";
import {
  activeScheduleOfContract,
  certificationsOfContract,
  clientName,
  closedColumnOfContract,
  equipmentOfContract,
  getContract,
  getPerson,
  incidentsOfContract,
  workOrderProgress,
} from "../../data/selectors";
import { daysTo, deadlineColor, fmtDate, fmtMoney, relativeDays } from "../../lib/format";
import { crmPath } from "../../lib/routes";
import {
  Avatar,
  BentoCard,
  BentoGrid,
  ColorDot,
  Divider,
  EmptyState,
  Kpi,
  Progress,
  SectionTitle,
  StatusChip,
} from "../../ui/primitives";

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="shrink-0 text-[var(--crm-text-dim)]">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

export default function ContractOverview() {
  const { contractId = "" } = useParams();
  const contract = getContract(contractId);
  if (!contract) return null;

  const progress = workOrderProgress(contractId);
  const closedCol = closedColumnOfContract(contractId);
  const schedule = activeScheduleOfContract(contractId);
  const assigned = equipmentOfContract(contractId);
  const certs = certificationsOfContract(contractId);
  const openIncidents = incidentsOfContract(contractId).filter((i) => i.status !== "cerrado");
  const dDays = daysTo(contract.end_date);

  const certified = certs.reduce((a, c) => a + c.amount, 0);
  const consumed = contract.contract_amount
    ? Math.round((certified / contract.contract_amount) * 100)
    : 0;

  return (
    <BentoGrid>
      <BentoCard span={7}>
        <SectionTitle>Alcance</SectionTitle>
        <p className="mb-4 mt-2 text-sm">{contract.description}</p>
        <Divider className="my-3" />
        <div className="flex flex-col gap-2.5">
          <Row label="Cliente" value={clientName(contract.client_id)} />
          <Row label="Yacimiento" value={contract.field} />
          <Row label="Línea de servicio" value={SERVICE_LINE_LABEL[contract.service_line]} />
          <Row label="Inicio" value={fmtDate(contract.start_date)} />
          <Row
            label="Vencimiento"
            value={
              <span className="inline-flex items-center gap-2">
                <ColorDot color={deadlineColor(contract.end_date)} />
                <span>
                  {fmtDate(contract.end_date)}
                  {dDays !== null && ` · ${relativeDays(dDays)}`}
                </span>
              </span>
            }
          />
        </div>
      </BentoCard>

      <BentoCard span={5}>
        <Kpi
          label="Monto adjudicado"
          value={fmtMoney(contract.contract_amount, contract.currency)}
          hint="contrato marco"
        />
        <Divider className="my-4" />
        <SectionTitle>Consumo del contrato</SectionTitle>
        <div className="mt-2 flex items-center gap-3">
          <Progress value={consumed} height={8} tone={consumed > 90 ? "warning" : "accent"} />
          <span className="shrink-0 text-sm font-semibold">{consumed}%</span>
        </div>
        <p className="mt-1.5 text-xs text-[var(--crm-text-dim)]">
          {fmtMoney(certified)} certificados sobre el total adjudicado
        </p>

        <Divider className="my-4" />

        <SectionTitle>Avance de órdenes</SectionTitle>
        <div className="mt-2 flex items-center gap-3">
          <Progress value={progress.pct} height={8} />
          <span className="shrink-0 text-sm font-semibold">{progress.pct}%</span>
        </div>
        <p className="mt-1.5 text-xs text-[var(--crm-text-dim)]">
          {progress.done} de {progress.total} órdenes en «{closedCol?.name ?? "Cerrada"}»
        </p>
      </BentoCard>

      <BentoCard span={6}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <SectionTitle>Equipos afectados</SectionTitle>
          <Link
            to={crmPath(`contratos/${contractId}/equipos`)}
            className="text-xs font-semibold"
            style={{ color: "var(--crm-accent)" }}
          >
            Ver todos
          </Link>
        </div>
        {assigned.length ? (
          <ul className="flex flex-col gap-2">
            {assigned.map((e) => (
              <li key={e.id}>
                <Link
                  to={crmPath(`flota/${e.id}`)}
                  className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-75"
                >
                  <span className="font-mono text-xs font-bold">{e.internal_code}</span>
                  <span className="min-w-0 flex-1 truncate text-[var(--crm-text-dim)]">{e.name}</span>
                  <span className="shrink-0 text-xs text-[var(--crm-text-faint)]">
                    {fmtMoney(e.rate_amount, e.currency)}/{e.rate_unit}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Sin equipos afectados a este contrato." />
        )}
      </BentoCard>

      <BentoCard span={6}>
        <SectionTitle>Equipo responsable</SectionTitle>
        <div className="mt-3 flex flex-col gap-3">
          {contract.members.map((m) => {
            const person = getPerson(m.person_id);
            return (
              <div key={m.person_id} className="flex items-center gap-3">
                <Avatar name={person?.full_name ?? m.person_id} size={32} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {person?.full_name ?? m.person_id}
                  </p>
                  <p className="truncate text-xs text-[var(--crm-text-dim)]">
                    {m.role_in_contract}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </BentoCard>

      <BentoCard span={6}>
        <SectionTitle>Programación en curso</SectionTitle>
        {schedule ? (
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <ColorDot color={deadlineColor(schedule.end_date)} />
              <span className="text-sm font-bold">{schedule.name}</span>
              <StatusChip value={schedule.status} label={SCHEDULE_STATUS_LABEL[schedule.status]} />
            </div>
            <p className="text-sm text-[var(--crm-text-dim)]">{schedule.goal}</p>
            <p className="text-sm">
              {fmtDate(schedule.start_date)} → {fmtDate(schedule.end_date)}
            </p>
          </div>
        ) : (
          <EmptyState title="Sin programación activa." />
        )}
      </BentoCard>

      <BentoCard span={6} accent={openIncidents.length > 0}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <SectionTitle>HSE del contrato</SectionTitle>
          <Link
            to={crmPath(`contratos/${contractId}/hse`)}
            className="text-xs font-semibold"
            style={{ color: "var(--crm-accent)" }}
          >
            Ver detalle
          </Link>
        </div>
        {openIncidents.length ? (
          <ul className="flex flex-col gap-2">
            {openIncidents.map((i) => (
              <li key={i.id} className="flex items-start gap-2 text-sm">
                <ColorDot color={i.severity === "grave" || i.severity === "critico" ? "red" : "yellow"} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{i.title}</span>
                  <span className="block text-xs text-[var(--crm-text-dim)]">
                    {fmtDate(i.occurred_at)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--crm-text-dim)]">Sin casos abiertos en este contrato.</p>
        )}
      </BentoCard>

      <BentoCard span={12}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <SectionTitle>Últimas certificaciones</SectionTitle>
          <Link
            to={crmPath(`contratos/${contractId}/certificaciones`)}
            className="text-xs font-semibold"
            style={{ color: "var(--crm-accent)" }}
          >
            Ver todas
          </Link>
        </div>
        {certs.length ? (
          <ul className="flex flex-col">
            {certs.slice(0, 4).map((c) => (
              <li
                key={c.id}
                className="flex flex-wrap items-center gap-2 border-b py-2.5 first:pt-0 last:border-b-0"
                style={{ borderColor: "var(--crm-border)" }}
              >
                <span className="font-mono text-sm font-semibold">{c.period}</span>
                <span className="min-w-0 flex-1 text-xs text-[var(--crm-text-dim)]">
                  {c.units.toLocaleString("es-AR")} {c.unit_label}
                </span>
                <span className="text-sm font-semibold">{fmtMoney(c.amount, c.currency)}</span>
                <StatusChip value={c.status} label={CERTIFICATION_STATUS_LABEL[c.status]} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Sin certificaciones emitidas." />
        )}
      </BentoCard>
    </BentoGrid>
  );
}

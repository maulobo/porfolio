import { useMemo, useState } from "react";
import { Link } from "react-router";
import { MapPin, Plus } from "lucide-react";
import { contracts } from "../data/mock";
import { CONTRACT_STATUS_LABEL, SERVICE_LINE_LABEL } from "../data/labels";
import {
  activeScheduleOfContract,
  clientName,
  equipmentOfContract,
  getPerson,
} from "../data/selectors";
import type { ContractStatus, ServiceLine } from "../data/types";
import { daysTo, fmtDate, fmtMoney } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  AvatarGroup,
  BentoCard,
  BentoGrid,
  Button,
  Chip,
  ColorDot,
  EmptyState,
  Field,
  Kpi,
  PageHeader,
  Select,
  StatusChip,
} from "../ui/primitives";

export default function Contracts() {
  const [status, setStatus] = useState<"all" | ContractStatus>("all");
  const [line, setLine] = useState<"all" | ServiceLine>("all");

  const filtered = useMemo(
    () =>
      contracts.filter(
        (c) =>
          (status === "all" || c.status === status) && (line === "all" || c.service_line === line),
      ),
    [status, line],
  );

  const active = contracts.filter((c) => c.status === "activo");
  const backlog = active.reduce((a, c) => a + c.contract_amount, 0);
  const endingSoon = active.filter((c) => (daysTo(c.end_date) ?? 999) <= 90);

  return (
    <>
      <PageHeader
        title="Contratos"
        subtitle="Servicios adjudicados por yacimiento y línea de negocio"
        actions={
          <Button disabled title="En la demo el alta está deshabilitada: no hay backend detrás.">
            <Plus size={16} />
            Nuevo contrato
          </Button>
        }
      />

      <BentoGrid>
        <BentoCard span={4}>
          <Kpi label="Contratos activos" value={active.length} hint={`${contracts.length} en total`} />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi label="Monto adjudicado" value={fmtMoney(backlog)} hint="contratos vigentes" />
        </BentoCard>
        <BentoCard span={4} accent={endingSoon.length > 0}>
          <Kpi
            label="Vencen en 90 días"
            value={endingSoon.length}
            tone={endingSoon.length ? "warning" : undefined}
            hint={endingSoon.length ? "iniciar renovación" : "sin vencimientos próximos"}
          />
        </BentoCard>
      </BentoGrid>

      <div className="my-5 flex flex-col gap-3 sm:flex-row">
        <Field label="Estado">
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="sm:w-48"
          >
            <option value="all">Todos</option>
            {(Object.keys(CONTRACT_STATUS_LABEL) as ContractStatus[]).map((s) => (
              <option key={s} value={s}>
                {CONTRACT_STATUS_LABEL[s]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Línea de servicio">
          <Select
            value={line}
            onChange={(e) => setLine(e.target.value as typeof line)}
            className="sm:w-60"
          >
            <option value="all">Todas</option>
            {(Object.keys(SERVICE_LINE_LABEL) as ServiceLine[]).map((s) => (
              <option key={s} value={s}>
                {SERVICE_LINE_LABEL[s]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <BentoGrid>
        {filtered.map((c) => {
          const schedule = activeScheduleOfContract(c.id);
          const d = daysTo(c.end_date);
          const assigned = equipmentOfContract(c.id);
          const memberNames = c.members.map(
            (m) => getPerson(m.person_id)?.full_name ?? m.person_id,
          );

          return (
            <BentoCard
              key={c.id}
              span={6}
              padded={false}
              className="hover:border-[var(--crm-border-strong)]"
            >
              <Link to={crmPath(`contratos/${c.id}`)} className="flex h-full flex-col gap-2 p-5">
                <span className="flex items-center gap-2">
                  <ColorDot color={c.health} title={`Salud del contrato: ${c.health}`} />
                  <span className="min-w-0 flex-1 truncate text-base font-bold">{c.name}</span>
                  <StatusChip value={c.status} label={CONTRACT_STATUS_LABEL[c.status]} />
                </span>

                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--crm-text-dim)]">
                  <span className="font-mono">{c.code}</span>
                  <span>·</span>
                  <span>{clientName(c.client_id)}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={11} />
                    {c.field}
                  </span>
                </span>

                <span className="flex">
                  <Chip>{SERVICE_LINE_LABEL[c.service_line]}</Chip>
                </span>

                <span className="flex-1 text-sm text-[var(--crm-text-dim)]">{c.description}</span>

                {schedule && (
                  <span className="text-xs text-[var(--crm-text-dim)]">
                    <span className="font-semibold text-[var(--crm-text)]">En curso: </span>
                    {schedule.name}
                  </span>
                )}

                <span className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="text-xs"
                    style={{ color: d !== null && d <= 60 ? "var(--crm-warning)" : "var(--crm-text-dim)" }}
                  >
                    {c.end_date ? `Vence ${fmtDate(c.end_date)}` : "Sin fecha de fin"}
                    {assigned.length > 0 && ` · ${assigned.length} equipos`}
                  </span>
                  <AvatarGroup names={memberNames} />
                </span>

                <span className="text-sm font-bold">
                  {fmtMoney(c.contract_amount, c.currency)}
                </span>
              </Link>
            </BentoCard>
          );
        })}

        {!filtered.length && (
          <BentoCard span={12}>
            <EmptyState title="No hay contratos con esos filtros." />
          </BentoCard>
        )}
      </BentoGrid>
    </>
  );
}

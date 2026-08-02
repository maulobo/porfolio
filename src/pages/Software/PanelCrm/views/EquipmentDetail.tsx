import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import { FileCheck2, Wrench } from "lucide-react";
import {
  CERTIFICATE_KIND_LABEL,
  EQUIPMENT_CATEGORY_LABEL,
  EQUIPMENT_STATUS_LABEL,
  MAINTENANCE_KIND_LABEL,
  MAINTENANCE_STATUS_LABEL,
} from "../data/labels";
import {
  certificatesOfSubject,
  contractName,
  getEquipment,
  maintenanceLogsOfEquipment,
  maintenanceTasksOfEquipment,
  meterToService,
  personName,
  serviceUrgency,
} from "../data/selectors";
import { daysTo, deadlineColor, fmtDate, fmtMoney, relativeDays } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  BentoCard,
  BentoGrid,
  Chip,
  ColorDot,
  Divider,
  EmptyState,
  Kpi,
  PageHeader,
  Progress,
  SectionTitle,
  StatusChip,
} from "../ui/primitives";

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="shrink-0 text-[var(--crm-text-dim)]">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

export default function EquipmentDetail() {
  const { equipmentId = "" } = useParams();
  const eq = getEquipment(equipmentId);

  if (!eq) {
    return (
      <>
        <PageHeader title="Equipo no encontrado" />
        <BentoCard span={12}>
          <EmptyState
            title="Ese equipo no existe en los datos de muestra."
            action={
              <Link to={crmPath("flota")} className="font-semibold" style={{ color: "var(--crm-accent)" }}>
                Volver a Flota
              </Link>
            }
          />
        </BentoCard>
      </>
    );
  }

  const unit = eq.meter_type === "horometro" ? "h" : "km";
  const remaining = meterToService(eq);
  const certs = certificatesOfSubject("equipo", eq.id);
  const tasks = maintenanceTasksOfEquipment(eq.id);
  const logs = maintenanceLogsOfEquipment(eq.id);

  /** Avance dentro del intervalo de service, tomando el último realizado como origen. */
  const lastServiceMeter = logs[0]?.meter_at_service ?? 0;
  const interval = Math.max(1, eq.next_service_meter - lastServiceMeter);
  const servicePct = Math.min(100, Math.round(((eq.meter_value - lastServiceMeter) / interval) * 100));

  const totalMaintenanceCost = logs.reduce((a, l) => a + l.cost, 0);
  const totalDowntime = logs.reduce((a, l) => a + l.downtime_hours, 0);

  return (
    <>
      <div className="mb-4">
        <Link
          to={crmPath("flota")}
          className="text-xs font-semibold text-[var(--crm-text-dim)] transition-colors hover:text-[var(--crm-text)]"
        >
          ← Flota y equipos
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2.5">
          <ColorDot color={serviceUrgency(eq)} title="Proximidad del próximo service" />
          <span className="font-mono text-sm font-bold" style={{ color: "var(--crm-accent)" }}>
            {eq.internal_code}
          </span>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{eq.name}</h1>
          <StatusChip value={eq.status} label={EQUIPMENT_STATUS_LABEL[eq.status]} />
        </div>
        <p className="mt-1 text-sm text-[var(--crm-text-dim)]">
          {EQUIPMENT_CATEGORY_LABEL[eq.category]} · {eq.brand} {eq.model} · {eq.year}
        </p>
      </div>

      <BentoGrid>
        <BentoCard span={7}>
          <SectionTitle>Ficha del equipo</SectionTitle>
          <div className="mt-3 flex flex-col gap-2.5">
            <Row label="Dominio" value={eq.plate ? <span className="font-mono">{eq.plate}</span> : "Sin patente"} />
            <Row label="Ubicación" value={eq.location} />
            <Row
              label="Contrato"
              value={
                eq.contract_id ? (
                  <Link
                    to={crmPath(`contratos/${eq.contract_id}`)}
                    className="underline"
                    style={{ color: "var(--crm-accent)" }}
                  >
                    {contractName(eq.contract_id)}
                  </Link>
                ) : (
                  "Sin afectar"
                )
              }
            />
            <Row
              label="Tarifa"
              value={`${fmtMoney(eq.rate_amount, eq.currency)} / ${eq.rate_unit}`}
            />
            <Row
              label={eq.meter_type === "horometro" ? "Horómetro" : "Odómetro"}
              value={`${eq.meter_value.toLocaleString("es-AR")} ${unit}`}
            />
          </div>

          <Divider className="my-4" />

          <SectionTitle>Próximo service</SectionTitle>
          <div className="mt-2 flex items-center gap-3">
            <Progress
              value={servicePct}
              height={8}
              tone={remaining <= 0 ? "danger" : remaining <= 100 ? "warning" : "accent"}
            />
            <span className="shrink-0 text-sm font-semibold">{servicePct}%</span>
          </div>
          <p
            className="mt-1.5 text-xs"
            style={{ color: remaining <= 0 ? "var(--crm-danger)" : "var(--crm-text-dim)" }}
          >
            Programado a las {eq.next_service_meter.toLocaleString("es-AR")} {unit} ·{" "}
            {remaining <= 0
              ? `pasado por ${Math.abs(remaining).toLocaleString("es-AR")} ${unit}`
              : `faltan ${remaining.toLocaleString("es-AR")} ${unit}`}
          </p>
        </BentoCard>

        <BentoCard span={5}>
          <Kpi
            label="Costo de mantenimiento"
            value={fmtMoney(totalMaintenanceCost)}
            hint={`${logs.length} intervenciones registradas`}
          />
          <Divider className="my-4" />
          <Kpi
            label="Horas fuera de servicio"
            value={`${totalDowntime.toLocaleString("es-AR")} h`}
            hint="acumuladas por mantenimiento"
            tone={totalDowntime > 200 ? "danger" : undefined}
          />
        </BentoCard>

        <BentoCard span={6}>
          <SectionTitle>Habilitaciones</SectionTitle>
          {certs.length ? (
            <ul className="mt-3 flex flex-col gap-2.5">
              {certs.map((c) => {
                const d = daysTo(c.expires_at);
                return (
                  <li key={c.id} className="flex items-center gap-2.5">
                    <ColorDot color={deadlineColor(c.expires_at)} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {CERTIFICATE_KIND_LABEL[c.kind]}
                      </p>
                      <p className="truncate text-xs text-[var(--crm-text-dim)]">
                        {c.issuer} · Nº {c.number}
                      </p>
                    </div>
                    <span
                      className="shrink-0 text-xs font-medium"
                      style={{ color: (d ?? 0) <= 3 ? "var(--crm-danger)" : "var(--crm-text-dim)" }}
                    >
                      {(d ?? 0) < 0 ? "vencida" : relativeDays(d)}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyState title="Sin habilitaciones cargadas." />
          )}
        </BentoCard>

        <BentoCard span={6}>
          <SectionTitle>Mantenimiento programado</SectionTitle>
          {tasks.length ? (
            <ul className="mt-3 flex flex-col gap-3">
              {tasks.map((t) => (
                <li key={t.id}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Wrench size={15} className="shrink-0 text-[var(--crm-text-dim)]" />
                    <span className="min-w-0 flex-1 text-sm font-semibold">{t.title}</span>
                    <Chip>{MAINTENANCE_KIND_LABEL[t.kind]}</Chip>
                    <StatusChip value={t.status} label={MAINTENANCE_STATUS_LABEL[t.status]} />
                  </div>
                  <p className="mt-1 text-xs text-[var(--crm-text-dim)]">{t.scope}</p>
                  <p className="mt-1 text-xs text-[var(--crm-text-faint)]">
                    {t.due_date && `Fecha objetivo ${fmtDate(t.due_date)} · `}
                    Costo estimado {fmtMoney(t.estimated_cost, t.currency)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Sin mantenimiento programado." />
          )}
        </BentoCard>

        <BentoCard span={12}>
          <SectionTitle>Historial de intervenciones</SectionTitle>
          {logs.length ? (
            <ul className="mt-3 flex flex-col gap-3.5">
              {logs.map((l) => (
                <li key={l.id} className="flex items-start gap-2.5">
                  <FileCheck2 size={16} className="mt-0.5 shrink-0 text-[var(--crm-text-faint)]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{l.notes}</p>
                    <p className="mt-0.5 text-xs text-[var(--crm-text-dim)]">
                      {fmtDate(l.performed_at)} · {personName(l.performed_by)} ·{" "}
                      {l.meter_at_service.toLocaleString("es-AR")} {unit} · {l.downtime_hours} h fuera
                      de servicio
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <Chip>{MAINTENANCE_KIND_LABEL[l.kind]}</Chip>
                    <p className="mt-1 text-xs font-semibold">{fmtMoney(l.cost, l.currency)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Sin intervenciones registradas." />
          )}
        </BentoCard>
      </BentoGrid>
    </>
  );
}

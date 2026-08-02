import { Link } from "react-router";
import { FileCheck2, Wrench } from "lucide-react";
import { maintenanceLogs, maintenanceTasks } from "../data/mock";
import { MAINTENANCE_KIND_LABEL, MAINTENANCE_STATUS_LABEL } from "../data/labels";
import { getEquipment, personName, serviceUrgency } from "../data/selectors";
import { equipment } from "../data/mock";
import { deadlineColor, fmtDate, fmtMoney, relativeDays, daysTo } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  BentoCard,
  BentoGrid,
  Chip,
  ColorDot,
  EmptyState,
  Kpi,
  PageHeader,
  SectionTitle,
  StatusChip,
} from "../ui/primitives";

export default function Maintenance() {
  const overdue = maintenanceTasks.filter((t) => t.status === "vencido");
  const inProgress = maintenanceTasks.filter((t) => t.status === "en_curso");
  const plannedCost = maintenanceTasks
    .filter((t) => t.status !== "realizado")
    .reduce((a, t) => a + t.estimated_cost, 0);

  const dueByMeter = equipment
    .filter((e) => serviceUrgency(e) !== "green")
    .sort((a, b) => a.next_service_meter - a.meter_value - (b.next_service_meter - b.meter_value));

  const recentLogs = [...maintenanceLogs]
    .sort((a, b) => b.performed_at.localeCompare(a.performed_at))
    .slice(0, 6);

  return (
    <>
      <PageHeader
        title="Mantenimiento"
        subtitle="Plan preventivo por horómetro y kilometraje, más correctivos en curso"
      />

      <BentoGrid>
        <BentoCard span={4} accent={overdue.length > 0}>
          <Kpi
            label="Vencidos"
            value={overdue.length}
            tone={overdue.length ? "danger" : undefined}
            hint={overdue.length ? "equipos comprometidos" : "plan al día"}
          />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi label="En curso" value={inProgress.length} hint="intervenciones abiertas" />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi
            label="Costo previsto"
            value={fmtMoney(plannedCost)}
            hint="trabajos no realizados"
          />
        </BentoCard>

        {/* Services disparados por medidor */}
        <BentoCard span={5}>
          <SectionTitle>Services por medidor</SectionTitle>
          <p className="mt-1 text-xs text-[var(--crm-text-dim)]">
            El preventivo se dispara por uso, no por calendario.
          </p>
          <div className="mt-3 flex flex-col">
            {dueByMeter.map((e) => {
              const remaining = e.next_service_meter - e.meter_value;
              const unit = e.meter_type === "horometro" ? "h" : "km";
              return (
                <Link
                  key={e.id}
                  to={crmPath(`flota/${e.id}`)}
                  className="flex items-center gap-2.5 border-b py-2.5 transition-opacity first:pt-0 last:border-b-0 hover:opacity-75"
                  style={{ borderColor: "var(--crm-border)" }}
                >
                  <ColorDot color={serviceUrgency(e)} />
                  <span className="font-mono text-xs font-bold">{e.internal_code}</span>
                  <span className="min-w-0 flex-1 truncate text-sm text-[var(--crm-text-dim)]">
                    {e.name}
                  </span>
                  <span
                    className="shrink-0 text-xs font-medium"
                    style={{ color: remaining <= 0 ? "var(--crm-danger)" : "var(--crm-text-dim)" }}
                  >
                    {remaining <= 0
                      ? `pasado ${Math.abs(remaining).toLocaleString("es-AR")} ${unit}`
                      : `${remaining.toLocaleString("es-AR")} ${unit}`}
                  </span>
                </Link>
              );
            })}
            {!dueByMeter.length && <EmptyState title="Ningún equipo cerca del service." />}
          </div>
        </BentoCard>

        {/* Trabajos programados */}
        <BentoCard span={7}>
          <SectionTitle>Trabajos programados</SectionTitle>
          <ul className="mt-3 flex flex-col gap-3.5">
            {maintenanceTasks.map((t) => {
              const eq = getEquipment(t.equipment_id);
              const d = daysTo(t.due_date);
              return (
                <li key={t.id}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Wrench size={15} className="shrink-0 text-[var(--crm-text-dim)]" />
                    <Link
                      to={crmPath(`flota/${t.equipment_id}`)}
                      className="font-mono text-xs font-bold transition-colors hover:text-[var(--crm-accent)]"
                    >
                      {eq?.internal_code}
                    </Link>
                    <span className="min-w-0 flex-1 text-sm font-semibold">{t.title}</span>
                    <Chip>{MAINTENANCE_KIND_LABEL[t.kind]}</Chip>
                    <StatusChip value={t.status} label={MAINTENANCE_STATUS_LABEL[t.status]} />
                  </div>
                  <p className="mt-1 pl-[23px] text-xs text-[var(--crm-text-dim)]">{t.scope}</p>
                  <p className="mt-1 flex items-center gap-2 pl-[23px] text-xs text-[var(--crm-text-faint)]">
                    {t.due_date && (
                      <>
                        <ColorDot color={t.status === "vencido" ? "red" : deadlineColor(t.due_date)} />
                        {fmtDate(t.due_date)} · {relativeDays(d)} ·{" "}
                      </>
                    )}
                    {fmtMoney(t.estimated_cost, t.currency)}
                  </p>
                </li>
              );
            })}
          </ul>
        </BentoCard>

        {/* Historial */}
        <BentoCard span={12}>
          <SectionTitle>Últimas intervenciones</SectionTitle>
          <ul className="mt-3 flex flex-col gap-3.5">
            {recentLogs.map((l) => {
              const eq = getEquipment(l.equipment_id);
              const unit = eq?.meter_type === "horometro" ? "h" : "km";
              return (
                <li key={l.id} className="flex items-start gap-2.5">
                  <FileCheck2 size={16} className="mt-0.5 shrink-0 text-[var(--crm-text-faint)]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <Link
                        to={crmPath(`flota/${l.equipment_id}`)}
                        className="font-mono text-xs font-bold transition-colors hover:text-[var(--crm-accent)]"
                      >
                        {eq?.internal_code}
                      </Link>{" "}
                      {l.notes}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--crm-text-dim)]">
                      {fmtDate(l.performed_at)} · {personName(l.performed_by)} ·{" "}
                      {l.meter_at_service.toLocaleString("es-AR")} {unit} · {l.downtime_hours} h
                      fuera de servicio
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <Chip>{MAINTENANCE_KIND_LABEL[l.kind]}</Chip>
                    <p className="mt-1 text-xs font-semibold">{fmtMoney(l.cost, l.currency)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </BentoCard>
      </BentoGrid>
    </>
  );
}

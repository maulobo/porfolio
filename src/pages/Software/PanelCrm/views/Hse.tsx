import { Link } from "react-router";
import { ClipboardCheck, HardHat } from "lucide-react";
import { DAYS_WITHOUT_LTI, incidents, inspections } from "../data/mock";
import {
  INCIDENT_KIND_LABEL,
  INCIDENT_SEVERITY_LABEL,
  INCIDENT_STATUS_LABEL,
  INSPECTION_RESULT_LABEL,
} from "../data/labels";
import { contractName, equipmentCode, personName } from "../data/selectors";
import { fmtDate } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  BentoCard,
  BentoGrid,
  Chip,
  Divider,
  EmptyState,
  Kpi,
  PageHeader,
  SectionTitle,
  StatusChip,
} from "../ui/primitives";

export default function Hse() {
  const open = incidents.filter((i) => i.status !== "cerrado");
  const lostDays = incidents.reduce((a, i) => a + i.lost_days, 0);
  const openFindings = inspections.reduce((a, i) => a + i.open_findings, 0);
  const spills = incidents.filter((i) => i.kind === "derrame");

  return (
    <>
      <PageHeader
        title="HSE / Seguridad"
        subtitle="Incidentes, casi incidentes, derrames e inspecciones de campo"
      />

      <BentoGrid>
        <BentoCard span={3}>
          <Kpi
            label="Días sin accidentes"
            value={DAYS_WITHOUT_LTI}
            tone="success"
            hint="sin jornadas perdidas"
          />
        </BentoCard>
        <BentoCard span={3} accent={open.length > 0}>
          <Kpi
            label="Casos abiertos"
            value={open.length}
            tone={open.length ? "danger" : undefined}
            hint="incidentes sin cerrar"
          />
        </BentoCard>
        <BentoCard span={3}>
          <Kpi label="Hallazgos abiertos" value={openFindings} hint="de inspecciones y auditorías" />
        </BentoCard>
        <BentoCard span={3}>
          <Kpi
            label="Jornadas perdidas"
            value={lostDays}
            hint="acumuladas en el período"
            tone={lostDays > 0 ? "warning" : undefined}
          />
        </BentoCard>

        <BentoCard span={12}>
          <div
            className="flex flex-wrap items-center gap-4 rounded-[var(--crm-radius-sm)] border p-4"
            style={{
              borderColor: "color-mix(in srgb, var(--crm-success) 35%, transparent)",
              background: "color-mix(in srgb, var(--crm-success) 8%, transparent)",
            }}
          >
            <HardHat size={28} style={{ color: "var(--crm-success)" }} />
            <div className="flex-1">
              <p className="text-2xl font-bold" style={{ color: "var(--crm-success)" }}>
                {DAYS_WITHOUT_LTI} días sin accidentes con días perdidos
              </p>
              <p className="text-sm text-[var(--crm-text-dim)]">
                Último caso con jornadas perdidas: lesión leve en manipulación de eslinga.
              </p>
            </div>
            {spills.length > 0 && (
              <Chip tone="danger">
                {spills.length} {spills.length === 1 ? "derrame registrado" : "derrames registrados"}
              </Chip>
            )}
          </div>
        </BentoCard>

        {/* Incidentes */}
        <BentoCard span={7}>
          <SectionTitle>Incidentes y observaciones</SectionTitle>
          <ul className="mt-3 flex flex-col">
            {incidents.map((i) => (
              <li
                key={i.id}
                className="border-b py-3 first:pt-0 last:border-b-0"
                style={{ borderColor: "var(--crm-border)" }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="min-w-0 flex-1 text-sm font-semibold">{i.title}</span>
                  <StatusChip value={i.kind} label={INCIDENT_KIND_LABEL[i.kind]} />
                  <StatusChip value={i.severity} label={INCIDENT_SEVERITY_LABEL[i.severity]} />
                  <StatusChip value={i.status} label={INCIDENT_STATUS_LABEL[i.status]} />
                </div>

                <p className="mt-1 text-xs text-[var(--crm-text-dim)]">{i.description}</p>

                <p className="mt-1.5 text-xs text-[var(--crm-text-faint)]">
                  {fmtDate(i.occurred_at)} ·{" "}
                  <Link
                    to={crmPath(`contratos/${i.contract_id}`)}
                    className="transition-colors hover:text-[var(--crm-accent)]"
                  >
                    {contractName(i.contract_id)}
                  </Link>
                  {i.equipment_id && ` · ${equipmentCode(i.equipment_id)}`}
                  {i.person_id && ` · ${personName(i.person_id)}`}
                  {i.lost_days > 0 && ` · ${i.lost_days} jornadas perdidas`}
                </p>

                {i.corrective_action && (
                  <p className="mt-1.5 text-xs">
                    <span className="font-semibold">Acción correctiva: </span>
                    <span className="text-[var(--crm-text-dim)]">{i.corrective_action}</span>
                  </p>
                )}
              </li>
            ))}
            {!incidents.length && <EmptyState title="Sin incidentes registrados." />}
          </ul>
        </BentoCard>

        {/* Inspecciones */}
        <BentoCard span={5}>
          <SectionTitle>Inspecciones y auditorías</SectionTitle>
          <ul className="mt-3 flex flex-col">
            {inspections.map((i) => (
              <li
                key={i.id}
                className="border-b py-3 first:pt-0 last:border-b-0"
                style={{ borderColor: "var(--crm-border)" }}
              >
                <div className="flex items-start gap-2.5">
                  <ClipboardCheck size={16} className="mt-0.5 shrink-0 text-[var(--crm-text-faint)]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{i.title}</p>
                    <p className="mt-0.5 text-xs text-[var(--crm-text-dim)]">
                      {fmtDate(i.performed_at)} · {personName(i.performed_by)}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--crm-text-faint)]">
                      {contractName(i.contract_id)}
                    </p>
                  </div>
                  <StatusChip value={i.result} label={INSPECTION_RESULT_LABEL[i.result]} />
                </div>
                {i.open_findings > 0 && (
                  <p className="mt-1.5 pl-[26px] text-xs" style={{ color: "var(--crm-warning)" }}>
                    {i.open_findings}{" "}
                    {i.open_findings === 1 ? "hallazgo abierto" : "hallazgos abiertos"}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <Divider className="my-4" />

          <p className="text-xs text-[var(--crm-text-dim)]">
            Las operadoras auditan HSE periódicamente. Un hallazgo sin cerrar puede frenar la
            habilitación para seguir operando en el área.
          </p>
        </BentoCard>
      </BentoGrid>
    </>
  );
}

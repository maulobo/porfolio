import { useParams } from "react-router";
import { ClipboardCheck } from "lucide-react";
import {
  INCIDENT_KIND_LABEL,
  INCIDENT_SEVERITY_LABEL,
  INCIDENT_STATUS_LABEL,
  INSPECTION_RESULT_LABEL,
} from "../../data/labels";
import {
  equipmentCode,
  incidentsOfContract,
  inspectionsOfContract,
  personName,
} from "../../data/selectors";
import { fmtDate } from "../../lib/format";
import {
  BentoCard,
  BentoGrid,
  ColorDot,
  EmptyState,
  Kpi,
  SectionTitle,
  StatusChip,
} from "../../ui/primitives";

export default function ContractHse() {
  const { contractId = "" } = useParams();
  const incidents = incidentsOfContract(contractId);
  const inspections = inspectionsOfContract(contractId);

  const open = incidents.filter((i) => i.status !== "cerrado");
  const findings = inspections.reduce((a, i) => a + i.open_findings, 0);
  const lostDays = incidents.reduce((a, i) => a + i.lost_days, 0);

  return (
    <BentoGrid>
      <BentoCard span={4} accent={open.length > 0}>
        <Kpi
          label="Casos abiertos"
          value={open.length}
          tone={open.length ? "danger" : undefined}
          hint={`${incidents.length} registrados en total`}
        />
      </BentoCard>
      <BentoCard span={4}>
        <Kpi label="Hallazgos abiertos" value={findings} hint="de inspecciones del contrato" />
      </BentoCard>
      <BentoCard span={4}>
        <Kpi
          label="Jornadas perdidas"
          value={lostDays}
          tone={lostDays > 0 ? "warning" : undefined}
          hint="en este contrato"
        />
      </BentoCard>

      <BentoCard span={7}>
        <SectionTitle>Incidentes del contrato</SectionTitle>
        {incidents.length ? (
          <ul className="mt-3 flex flex-col">
            {incidents.map((i) => (
              <li
                key={i.id}
                className="border-b py-3 first:pt-0 last:border-b-0"
                style={{ borderColor: "var(--crm-border)" }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <ColorDot
                    color={i.severity === "grave" || i.severity === "critico" ? "red" : "yellow"}
                  />
                  <span className="min-w-0 flex-1 text-sm font-semibold">{i.title}</span>
                  <StatusChip value={i.kind} label={INCIDENT_KIND_LABEL[i.kind]} />
                  <StatusChip value={i.severity} label={INCIDENT_SEVERITY_LABEL[i.severity]} />
                  <StatusChip value={i.status} label={INCIDENT_STATUS_LABEL[i.status]} />
                </div>

                <p className="mt-1 text-xs text-[var(--crm-text-dim)]">{i.description}</p>

                <p className="mt-1.5 text-xs text-[var(--crm-text-faint)]">
                  {fmtDate(i.occurred_at)}
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
          </ul>
        ) : (
          <EmptyState title="Sin incidentes registrados en este contrato." />
        )}
      </BentoCard>

      <BentoCard span={5}>
        <SectionTitle>Inspecciones</SectionTitle>
        {inspections.length ? (
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
        ) : (
          <EmptyState title="Sin inspecciones registradas." />
        )}
      </BentoCard>
    </BentoGrid>
  );
}

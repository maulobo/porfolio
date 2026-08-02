import { Link, useParams } from "react-router";
import {
  CERTIFICATE_KIND_LABEL,
  EQUIPMENT_CATEGORY_LABEL,
  EQUIPMENT_STATUS_LABEL,
} from "../../data/labels";
import {
  certificatesOfSubject,
  equipmentOfContract,
  meterToService,
  serviceUrgency,
} from "../../data/selectors";
import { daysTo, deadlineColor, fmtMoney, relativeDays } from "../../lib/format";
import { crmPath } from "../../lib/routes";
import {
  BentoCard,
  BentoGrid,
  ColorDot,
  Divider,
  EmptyState,
  SectionTitle,
  StatusChip,
} from "../../ui/primitives";

export default function ContractEquipment() {
  const { contractId = "" } = useParams();
  const assigned = equipmentOfContract(contractId);

  if (!assigned.length) {
    return <EmptyState title="Este contrato no tiene equipos afectados." />;
  }

  return (
    <BentoGrid>
      {assigned.map((e) => {
        const unit = e.meter_type === "horometro" ? "h" : "km";
        const remaining = meterToService(e);
        const certs = certificatesOfSubject("equipo", e.id);

        return (
          <BentoCard key={e.id} span={6}>
            <div className="flex items-center gap-2.5">
              <ColorDot color={serviceUrgency(e)} title="Proximidad del próximo service" />
              <Link
                to={crmPath(`flota/${e.id}`)}
                className="font-mono text-xs font-bold transition-colors hover:text-[var(--crm-accent)]"
                style={{ color: "var(--crm-accent)" }}
              >
                {e.internal_code}
              </Link>
              <h3 className="min-w-0 flex-1 truncate text-base font-bold">{e.name}</h3>
              <StatusChip value={e.status} label={EQUIPMENT_STATUS_LABEL[e.status]} />
            </div>

            <p className="mt-1 text-xs text-[var(--crm-text-dim)]">
              {EQUIPMENT_CATEGORY_LABEL[e.category]} · {e.brand} {e.model}
              {e.plate && ` · ${e.plate}`}
            </p>

            <Divider className="my-3" />

            <dl className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--crm-text-dim)]">Tarifa</dt>
                <dd className="font-semibold">
                  {fmtMoney(e.rate_amount, e.currency)} / {e.rate_unit}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--crm-text-dim)]">
                  {e.meter_type === "horometro" ? "Horómetro" : "Odómetro"}
                </dt>
                <dd>{e.meter_value.toLocaleString("es-AR")} {unit}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--crm-text-dim)]">Próximo service</dt>
                <dd style={{ color: remaining <= 0 ? "var(--crm-danger)" : undefined }}>
                  {remaining <= 0
                    ? `pasado ${Math.abs(remaining).toLocaleString("es-AR")} ${unit}`
                    : `en ${remaining.toLocaleString("es-AR")} ${unit}`}
                </dd>
              </div>
            </dl>

            {certs.length > 0 && (
              <>
                <Divider className="my-3" />
                <SectionTitle>Habilitaciones</SectionTitle>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {certs.map((c) => {
                    const d = daysTo(c.expires_at);
                    return (
                      <li key={c.id} className="flex items-center gap-2 text-xs">
                        <ColorDot color={deadlineColor(c.expires_at)} />
                        <span className="min-w-0 flex-1 truncate">
                          {CERTIFICATE_KIND_LABEL[c.kind]}
                        </span>
                        <span
                          style={{
                            color: (d ?? 0) <= 3 ? "var(--crm-danger)" : "var(--crm-text-dim)",
                          }}
                        >
                          {(d ?? 0) < 0 ? "vencida" : relativeDays(d)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </BentoCard>
        );
      })}
    </BentoGrid>
  );
}

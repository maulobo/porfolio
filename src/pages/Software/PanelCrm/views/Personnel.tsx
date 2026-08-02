import { UserPlus } from "lucide-react";
import { contracts, people } from "../data/mock";
import { CERTIFICATE_KIND_LABEL, ROLE_LABEL } from "../data/labels";
import { certificatesOfSubject } from "../data/selectors";
import { daysTo, deadlineColor, fmtDate, relativeDays } from "../lib/format";
import {
  Avatar,
  BentoCard,
  BentoGrid,
  Button,
  Chip,
  ColorDot,
  Divider,
  EmptyState,
  Kpi,
  PageHeader,
  SectionTitle,
  StatusChip,
} from "../ui/primitives";

export default function Personnel() {
  const active = people.filter((p) => p.is_active);

  /** Personas con al menos una habilitación vencida o por vencer en 30 días. */
  const atRisk = active.filter((p) =>
    certificatesOfSubject("persona", p.id).some((c) => (daysTo(c.expires_at) ?? 999) <= 30),
  );

  const bases = Array.from(new Set(active.map((p) => p.base)));

  return (
    <>
      <PageHeader
        title="Personal"
        subtitle="Legajos, roles y estado de habilitaciones para ingreso a yacimiento"
        actions={
          <Button disabled title="En la demo el alta está deshabilitada: no hay backend detrás.">
            <UserPlus size={16} />
            Alta de personal
          </Button>
        }
      />

      <BentoGrid>
        <BentoCard span={4}>
          <Kpi
            label="Personal activo"
            value={active.length}
            hint={`${people.length - active.length} inactivos · ${bases.length} bases`}
          />
        </BentoCard>
        <BentoCard span={4} accent={atRisk.length > 0}>
          <Kpi
            label="Con habilitaciones críticas"
            value={atRisk.length}
            tone={atRisk.length ? "danger" : undefined}
            hint={atRisk.length ? "no podrían ingresar" : "todos en regla"}
          />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi
            label="Asignados a contrato"
            value={
              new Set(contracts.flatMap((c) => c.members.map((m) => m.person_id))).size
            }
            hint="con rol en algún contrato"
          />
        </BentoCard>

        {people.map((p) => {
          const certs = certificatesOfSubject("persona", p.id);
          const assigned = contracts.filter((c) =>
            c.members.some((m) => m.person_id === p.id),
          );
          const critical = certs.filter((c) => (daysTo(c.expires_at) ?? 999) <= 30);

          return (
            <BentoCard key={p.id} span={4} accent={p.is_active && critical.length > 0}>
              <div className="flex items-center gap-3">
                <Avatar name={p.full_name} size={42} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold">{p.full_name}</p>
                  <p className="truncate text-xs text-[var(--crm-text-dim)]">{p.position}</p>
                </div>
                {!p.is_active && <StatusChip value="archived" label="Inactivo" />}
              </div>

              <p className="mt-2 text-xs text-[var(--crm-text-faint)]">
                Legajo {p.file_number} · Base {p.base} · desde {fmtDate(p.hired_at)}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.roles.map((r) => (
                  <Chip key={r}>{ROLE_LABEL[r]}</Chip>
                ))}
              </div>

              <Divider className="my-3" />

              <SectionTitle>Habilitaciones</SectionTitle>
              {certs.length ? (
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
                          className="shrink-0 font-medium"
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
              ) : (
                <EmptyState title="Sin habilitaciones cargadas." />
              )}

              {assigned.length > 0 && (
                <p className="mt-3 text-xs text-[var(--crm-text-dim)]">
                  {assigned.length} {assigned.length === 1 ? "contrato asignado" : "contratos asignados"}
                </p>
              )}
            </BentoCard>
          );
        })}
      </BentoGrid>
    </>
  );
}

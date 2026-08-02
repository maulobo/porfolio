import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ShieldAlert } from "lucide-react";
import { certificates } from "../data/mock";
import { CERTIFICATE_KIND_LABEL } from "../data/labels";
import { certificateSubjectName, getEquipment } from "../data/selectors";
import type { Certificate, CertificateKind, CertificateSubject } from "../data/types";
import { daysTo, deadlineColor, fmtDate, relativeDays } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  BentoCard,
  BentoGrid,
  ColorDot,
  Field,
  Kpi,
  Note,
  PageHeader,
  Select,
  StatusChip,
} from "../ui/primitives";
import { DataTable, type Column } from "../ui/DataTable";

/**
 * Tablero de vencimientos de equipos y personal.
 *
 * En el rubro esto no es burocracia: una habilitación vencida deja al equipo o
 * a la persona afuera del yacimiento y el día se pierde igual.
 */
export default function Certificates() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<"all" | CertificateSubject>("all");
  const [kind, setKind] = useState<"all" | CertificateKind>("all");
  const [horizon, setHorizon] = useState<"all" | "30" | "60">("30");

  const rows = useMemo(() => {
    const limit = horizon === "all" ? Infinity : Number(horizon);
    return certificates
      .filter(
        (c) =>
          (subject === "all" || c.subject_type === subject) &&
          (kind === "all" || c.kind === kind) &&
          (daysTo(c.expires_at) ?? 9999) <= limit,
      )
      .sort((a, b) => a.expires_at.localeCompare(b.expires_at));
  }, [subject, kind, horizon]);

  const expired = certificates.filter((c) => (daysTo(c.expires_at) ?? 1) < 0);
  const within7 = certificates.filter((c) => {
    const d = daysTo(c.expires_at) ?? 999;
    return d >= 0 && d <= 7;
  });
  const within30 = certificates.filter((c) => {
    const d = daysTo(c.expires_at) ?? 999;
    return d >= 0 && d <= 30;
  });

  const columns: Column<Certificate>[] = [
    {
      key: "subject",
      header: "Equipo / Persona",
      sortValue: (c) => certificateSubjectName(c),
      cell: (c) => (
        <div className="flex items-center gap-2.5">
          <ColorDot color={deadlineColor(c.expires_at)} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{certificateSubjectName(c)}</p>
            <p className="text-xs text-[var(--crm-text-dim)]">
              {c.subject_type === "equipo" ? "Equipo" : "Personal"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "kind",
      header: "Habilitación",
      sortValue: (c) => CERTIFICATE_KIND_LABEL[c.kind],
      cell: (c) => (
        <div className="min-w-0">
          <p className="truncate text-sm">{CERTIFICATE_KIND_LABEL[c.kind]}</p>
          <p className="truncate text-xs text-[var(--crm-text-dim)]">Nº {c.number}</p>
        </div>
      ),
    },
    {
      key: "issuer",
      header: "Emisor",
      sortValue: (c) => c.issuer,
      cell: (c) => c.issuer,
      hideBelow: "lg",
    },
    {
      key: "expires",
      header: "Vence",
      sortValue: (c) => c.expires_at,
      cell: (c) => fmtDate(c.expires_at),
      hideBelow: "sm",
    },
    {
      key: "status",
      header: "Estado",
      align: "right",
      sortValue: (c) => daysTo(c.expires_at) ?? 9999,
      cell: (c) => {
        const d = daysTo(c.expires_at) ?? 0;
        if (d < 0) return <StatusChip value="vencido" label={`Vencida hace ${Math.abs(d)} d`} />;
        if (d <= 7) return <StatusChip value="en_curso" label={relativeDays(d)} />;
        return <StatusChip value="realizado" label={relativeDays(d)} />;
      },
    },
  ];

  return (
    <>
      <PageHeader
        title="Habilitaciones"
        subtitle="Vencimientos de equipos y personal — VTV, seguros, RUTA, aptos médicos y cursos"
      />

      {expired.length > 0 && (
        <Note icon={<ShieldAlert size={16} />}>
          Hay <strong>{expired.length}</strong>{" "}
          {expired.length === 1 ? "habilitación vencida" : "habilitaciones vencidas"}. Un equipo o
          una persona sin habilitación vigente no puede ingresar al yacimiento, y el día se factura
          igual en costos.
        </Note>
      )}

      <BentoGrid>
        <BentoCard span={4} accent={expired.length > 0}>
          <Kpi
            label="Vencidas"
            value={expired.length}
            tone={expired.length ? "danger" : undefined}
            hint={expired.length ? "regularizar de inmediato" : "ninguna vencida"}
          />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi label="Vencen en 7 días" value={within7.length} hint="gestionar esta semana" />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi label="Vencen en 30 días" value={within30.length} hint="planificar renovación" />
        </BentoCard>

        <BentoCard span={12}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Field label="Alcance">
              <Select
                value={subject}
                onChange={(e) => setSubject(e.target.value as typeof subject)}
                className="sm:w-40"
              >
                <option value="all">Todo</option>
                <option value="equipo">Equipos</option>
                <option value="persona">Personal</option>
              </Select>
            </Field>
            <Field label="Tipo">
              <Select
                value={kind}
                onChange={(e) => setKind(e.target.value as typeof kind)}
                className="sm:w-52"
              >
                <option value="all">Todos</option>
                {(Object.keys(CERTIFICATE_KIND_LABEL) as CertificateKind[]).map((k) => (
                  <option key={k} value={k}>
                    {CERTIFICATE_KIND_LABEL[k]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Ventana">
              <Select
                value={horizon}
                onChange={(e) => setHorizon(e.target.value as typeof horizon)}
                className="sm:w-44"
              >
                <option value="30">Próximos 30 días</option>
                <option value="60">Próximos 60 días</option>
                <option value="all">Todas</option>
              </Select>
            </Field>
          </div>

          <DataTable
            columns={columns}
            data={rows}
            emptyMessage="No hay habilitaciones con esos filtros."
            onRowClick={(c) => {
              if (c.subject_type === "equipo" && getEquipment(c.subject_id)) {
                navigate(crmPath(`flota/${c.subject_id}`));
              } else {
                navigate(crmPath("personal"));
              }
            }}
          />
        </BentoCard>
      </BentoGrid>
    </>
  );
}

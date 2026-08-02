import { useMemo, useState } from "react";
import { Recycle } from "lucide-react";
import { wasteManifests } from "../data/mock";
import { MANIFEST_STATUS_LABEL, WASTE_KIND_LABEL } from "../data/labels";
import { clientName, equipmentCode, openManifests } from "../data/selectors";
import type { ManifestStatus, WasteManifest } from "../data/types";
import { daysTo, fmtDate } from "../lib/format";
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

/** Un manifiesto abierto hace mucho tiempo es un riesgo ambiental y legal. */
const opennessColor = (m: WasteManifest) => {
  if (m.disposal_certificate_at) return "green" as const;
  const age = -(daysTo(m.dispatched_at) ?? 0);
  if (age > 30) return "red" as const;
  if (age > 10) return "yellow" as const;
  return "grey" as const;
};

export default function Waste() {
  const [status, setStatus] = useState<"all" | ManifestStatus>("all");
  const [kind, setKind] = useState<"all" | string>("all");

  const rows = useMemo(
    () =>
      wasteManifests
        .filter(
          (m) => (status === "all" || m.status === status) && (kind === "all" || m.waste_kind === kind),
        )
        .sort((a, b) => b.dispatched_at.localeCompare(a.dispatched_at)),
    [status, kind],
  );

  const open = openManifests();
  const totalTn = wasteManifests.reduce((a, m) => a + m.quantity_tn, 0);
  const openTn = open.reduce((a, m) => a + m.quantity_tn, 0);
  const stale = open.filter((m) => -(daysTo(m.dispatched_at) ?? 0) > 30);

  const columns: Column<WasteManifest>[] = [
    {
      key: "number",
      header: "Manifiesto",
      sortValue: (m) => m.manifest_number,
      cell: (m) => (
        <div className="flex items-center gap-2.5">
          <ColorDot
            color={opennessColor(m)}
            title={m.disposal_certificate_at ? "Cerrado" : "Sin certificado de disposición"}
          />
          <span className="font-mono text-xs font-bold">{m.manifest_number}</span>
        </div>
      ),
    },
    {
      key: "waste",
      header: "Residuo",
      sortValue: (m) => WASTE_KIND_LABEL[m.waste_kind],
      cell: (m) => (
        <div className="min-w-0">
          <p className="truncate text-sm">{WASTE_KIND_LABEL[m.waste_kind]}</p>
          <p className="text-xs text-[var(--crm-text-dim)]">{m.origin}</p>
        </div>
      ),
    },
    {
      key: "qty",
      header: "Cantidad",
      align: "right",
      sortValue: (m) => m.quantity_tn,
      cell: (m) => <span className="font-semibold">{m.quantity_tn} t</span>,
    },
    {
      key: "client",
      header: "Generador",
      sortValue: (m) => clientName(m.client_id),
      cell: (m) => clientName(m.client_id),
      hideBelow: "lg",
    },
    {
      key: "transport",
      header: "Transporte",
      sortValue: (m) => equipmentCode(m.transport_equipment_id),
      cell: (m) => <span className="font-mono text-xs">{equipmentCode(m.transport_equipment_id)}</span>,
      hideBelow: "lg",
    },
    {
      key: "dispatched",
      header: "Despacho",
      sortValue: (m) => m.dispatched_at,
      cell: (m) => fmtDate(m.dispatched_at),
      hideBelow: "md",
    },
    {
      key: "disposal",
      header: "Disposición final",
      sortValue: (m) => m.disposal_certificate_at ?? "",
      cell: (m) =>
        m.disposal_certificate_at ? (
          <span className="text-sm">{fmtDate(m.disposal_certificate_at)}</span>
        ) : (
          <span className="text-xs font-semibold" style={{ color: "var(--crm-warning)" }}>
            pendiente
          </span>
        ),
      hideBelow: "sm",
    },
    {
      key: "status",
      header: "Estado",
      sortValue: (m) => m.status,
      cell: (m) => <StatusChip value={m.status} label={MANIFEST_STATUS_LABEL[m.status]} />,
    },
  ];

  return (
    <>
      <PageHeader
        title="Residuos"
        subtitle="Trazabilidad de manifiestos desde el yacimiento hasta la disposición final"
      />

      <Note icon={<Recycle size={16} />}>
        Mientras la planta no emita el <strong>certificado de disposición final</strong>, la
        responsabilidad ambiental sobre el residuo sigue siendo del generador. Por eso el sistema
        marca en rojo todo manifiesto abierto hace más de 30 días.
      </Note>

      <BentoGrid>
        <BentoCard span={3}>
          <Kpi label="Manifiestos" value={wasteManifests.length} hint="en el período" />
        </BentoCard>
        <BentoCard span={3}>
          <Kpi label="Total gestionado" value={`${totalTn.toLocaleString("es-AR")} t`} hint="todas las corrientes" />
        </BentoCard>
        <BentoCard span={3} accent={open.length > 0}>
          <Kpi
            label="Sin cerrar"
            value={open.length}
            tone={open.length ? "warning" : undefined}
            hint={`${openTn.toLocaleString("es-AR")} t con responsabilidad abierta`}
          />
        </BentoCard>
        <BentoCard span={3} accent={stale.length > 0}>
          <Kpi
            label="Abiertos +30 días"
            value={stale.length}
            tone={stale.length ? "danger" : undefined}
            hint={stale.length ? "reclamar certificado" : "todo en plazo"}
          />
        </BentoCard>

        <BentoCard span={12}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <Field label="Estado">
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as typeof status)}
                className="sm:w-48"
              >
                <option value="all">Todos</option>
                {(Object.keys(MANIFEST_STATUS_LABEL) as ManifestStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {MANIFEST_STATUS_LABEL[s]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Tipo de residuo">
              <Select value={kind} onChange={(e) => setKind(e.target.value)} className="sm:w-60">
                <option value="all">Todos</option>
                {Object.entries(WASTE_KIND_LABEL).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <DataTable columns={columns} data={rows} emptyMessage="No hay manifiestos con esos filtros." />
        </BentoCard>
      </BentoGrid>
    </>
  );
}

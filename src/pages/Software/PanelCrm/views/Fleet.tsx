import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { equipment } from "../data/mock";
import {
  EQUIPMENT_CATEGORY_LABEL,
  EQUIPMENT_STATUS_LABEL,
} from "../data/labels";
import { contractName, serviceUrgency } from "../data/selectors";
import type { Equipment, EquipmentStatus } from "../data/types";
import { fmtMoney } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  BentoCard,
  BentoGrid,
  Button,
  ColorDot,
  Field,
  Kpi,
  PageHeader,
  Progress,
  Select,
  StatusChip,
} from "../ui/primitives";
import { DataTable, type Column } from "../ui/DataTable";

const meterLabel = (e: Equipment) =>
  `${e.meter_value.toLocaleString("es-AR")} ${e.meter_type === "horometro" ? "h" : "km"}`;

const columns: Column<Equipment>[] = [
  {
    key: "code",
    header: "Equipo",
    sortValue: (e) => e.internal_code,
    cell: (e) => (
      <div className="flex items-center gap-2.5">
        <ColorDot color={serviceUrgency(e)} title="Proximidad del próximo service" />
        <div className="min-w-0">
          <p className="font-mono text-xs font-bold">{e.internal_code}</p>
          <p className="truncate text-xs text-[var(--crm-text-dim)]">{e.name}</p>
        </div>
      </div>
    ),
  },
  {
    key: "category",
    header: "Tipo",
    sortValue: (e) => EQUIPMENT_CATEGORY_LABEL[e.category],
    cell: (e) => EQUIPMENT_CATEGORY_LABEL[e.category],
    hideBelow: "md",
  },
  {
    key: "plate",
    header: "Dominio",
    sortValue: (e) => e.plate ?? "",
    cell: (e) => <span className="font-mono text-xs">{e.plate ?? "—"}</span>,
    hideBelow: "lg",
  },
  {
    key: "location",
    header: "Ubicación",
    sortValue: (e) => e.location,
    cell: (e) => (
      <div className="min-w-0">
        <p className="truncate text-sm">{e.location}</p>
        {e.contract_id && (
          <p className="truncate text-xs text-[var(--crm-text-dim)]">
            {contractName(e.contract_id)}
          </p>
        )}
      </div>
    ),
    hideBelow: "sm",
  },
  {
    key: "meter",
    header: "Medidor",
    align: "right",
    sortValue: (e) => e.meter_value,
    cell: (e) => {
      const remaining = e.next_service_meter - e.meter_value;
      const unit = e.meter_type === "horometro" ? "h" : "km";
      return (
        <div>
          <p className="text-sm font-semibold">{meterLabel(e)}</p>
          <p
            className="text-xs"
            style={{ color: remaining <= 0 ? "var(--crm-danger)" : "var(--crm-text-dim)" }}
          >
            {remaining <= 0
              ? `service pasado ${Math.abs(remaining).toLocaleString("es-AR")} ${unit}`
              : `service en ${remaining.toLocaleString("es-AR")} ${unit}`}
          </p>
        </div>
      );
    },
    hideBelow: "md",
  },
  {
    key: "status",
    header: "Estado",
    sortValue: (e) => e.status,
    cell: (e) => <StatusChip value={e.status} label={EQUIPMENT_STATUS_LABEL[e.status]} />,
  },
];

export default function Fleet() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"all" | EquipmentStatus>("all");
  const [location, setLocation] = useState<"all" | string>("all");

  const locations = useMemo(
    () => Array.from(new Set(equipment.map((e) => e.location))).sort(),
    [],
  );

  const filtered = useMemo(
    () =>
      equipment.filter(
        (e) =>
          (status === "all" || e.status === status) &&
          (location === "all" || e.location === location),
      ),
    [status, location],
  );

  const outOfService = equipment.filter((e) => e.status === "fuera_servicio").length;
  const availability = Math.round(((equipment.length - outOfService) / equipment.length) * 100);
  const assigned = equipment.filter((e) => e.contract_id !== null);
  /** Facturación potencial diaria de lo que está afectado a un contrato. */
  const dailyPotential = assigned.reduce(
    (a, e) => a + (e.rate_unit === "hora" ? e.rate_amount * 8 : e.rate_amount),
    0,
  );

  return (
    <>
      <PageHeader
        title="Flota y equipos"
        subtitle="Estado, ubicación y próximo service de cada activo"
        actions={
          <Button disabled title="En la demo el alta está deshabilitada: no hay backend detrás.">
            <Plus size={16} />
            Alta de equipo
          </Button>
        }
      />

      <BentoGrid>
        <BentoCard span={4}>
          <Kpi label="Equipos en flota" value={equipment.length} hint={`${assigned.length} afectados a contrato`} />
        </BentoCard>
        <BentoCard span={4} accent={availability < 85}>
          <Kpi
            label="Disponibilidad"
            value={`${availability}%`}
            tone={availability < 85 ? "danger" : undefined}
            hint={`${outOfService} fuera de servicio`}
          />
          <div className="mt-2">
            <Progress value={availability} height={6} tone={availability < 85 ? "warning" : "success"} />
          </div>
        </BentoCard>
        <BentoCard span={4}>
          <Kpi
            label="Facturación potencial diaria"
            value={fmtMoney(dailyPotential)}
            hint="equipos afectados, jornada de 8 h"
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
                {(Object.keys(EQUIPMENT_STATUS_LABEL) as EquipmentStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {EQUIPMENT_STATUS_LABEL[s]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Ubicación">
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="sm:w-52"
              >
                <option value="all">Todas</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <DataTable
            columns={columns}
            data={filtered}
            emptyMessage="No hay equipos con esos filtros."
            onRowClick={(e) => navigate(crmPath(`flota/${e.id}`))}
          />
        </BentoCard>
      </BentoGrid>
    </>
  );
}

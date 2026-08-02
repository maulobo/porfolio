import {
  certificates,
  certifications,
  clientBilling,
  clientContacts,
  clients,
  contracts,
  equipment,
  incidents,
  inspections,
  invoices,
  maintenanceLogs,
  maintenanceTasks,
  people,
  quotes,
  schedules,
  wasteManifests,
  workOrderColumns,
  workOrders,
} from "./mock";
import type { Certificate, Equipment } from "./types";
import { daysTo } from "../lib/format";

/**
 * Lecturas sobre los datos de muestra.
 *
 * En el producto real esto sería la capa de acceso a datos. Acá son funciones
 * síncronas sobre arrays en memoria, para que las vistas se lean igual que si
 * consultaran una API.
 */

/* ── Búsquedas simples ──────────────────────────────────────────────────── */

export const getClient = (id: string) => clients.find((c) => c.id === id);
export const getContract = (id: string) => contracts.find((c) => c.id === id);
export const getEquipment = (id: string | null) =>
  id ? equipment.find((e) => e.id === id) : undefined;
export const getPerson = (id: string | null) => (id ? people.find((p) => p.id === id) : undefined);

export const clientName = (id: string) => getClient(id)?.fantasy_name ?? "—";
export const contractName = (id: string) => getContract(id)?.name ?? "—";
export const personName = (id: string | null) => getPerson(id)?.full_name ?? "—";
export const equipmentCode = (id: string | null) => getEquipment(id)?.internal_code ?? "—";

/* ── Cliente ────────────────────────────────────────────────────────────── */

export const contactsOfClient = (clientId: string) =>
  clientContacts.filter((c) => c.client_id === clientId);

export const billingOfClient = (clientId: string) =>
  clientBilling.find((b) => b.client_id === clientId);

export const contractsOfClient = (clientId: string) =>
  contracts.filter((c) => c.client_id === clientId);

/* ── Contrato ───────────────────────────────────────────────────────────── */

export const schedulesOfContract = (contractId: string) =>
  schedules.filter((s) => s.contract_id === contractId);

export const activeScheduleOfContract = (contractId: string) =>
  schedules.find((s) => s.contract_id === contractId && s.status === "active");

export const columnsOfContract = (contractId: string) =>
  workOrderColumns
    .filter((c) => c.contract_id === contractId)
    .sort((a, b) => a.position - b.position);

export const workOrdersOfContract = (contractId: string) =>
  workOrders.filter((w) => w.contract_id === contractId);

export const equipmentOfContract = (contractId: string) =>
  equipment.filter((e) => e.contract_id === contractId);

export const certificationsOfContract = (contractId: string) =>
  certifications
    .filter((c) => c.contract_id === contractId)
    .sort((a, b) => b.period.localeCompare(a.period));

export const incidentsOfContract = (contractId: string) =>
  incidents
    .filter((i) => i.contract_id === contractId)
    .sort((a, b) => b.occurred_at.localeCompare(a.occurred_at));

export const inspectionsOfContract = (contractId: string) =>
  inspections
    .filter((i) => i.contract_id === contractId)
    .sort((a, b) => b.performed_at.localeCompare(a.performed_at));

export const manifestsOfContract = (contractId: string) =>
  wasteManifests.filter((m) => m.contract_id === contractId);

export const quotesOf = (filter: { clientId?: string; contractId?: string }) =>
  quotes.filter(
    (q) =>
      (!filter.clientId || q.client_id === filter.clientId) &&
      (!filter.contractId || q.contract_id === filter.contractId),
  );

export const invoicesOf = (filter: { clientId?: string; contractId?: string }) =>
  invoices.filter(
    (i) =>
      (!filter.clientId || i.client_id === filter.clientId) &&
      (!filter.contractId || i.contract_id === filter.contractId),
  );

/** Columna terminal del tablero de órdenes, para calcular avance. */
export const closedColumnOfContract = (contractId: string) => {
  const cols = columnsOfContract(contractId);
  return cols.find((c) => /cerrad/i.test(c.name)) ?? cols[cols.length - 1];
};

export const workOrderProgress = (contractId: string) => {
  const all = workOrdersOfContract(contractId);
  if (!all.length) return { done: 0, total: 0, pct: 0 };
  const closed = closedColumnOfContract(contractId);
  const done = all.filter((w) => w.column_id === closed?.id).length;
  return { done, total: all.length, pct: Math.round((done / all.length) * 100) };
};

/* ── Equipos ────────────────────────────────────────────────────────────── */

export const maintenanceTasksOfEquipment = (equipmentId: string) =>
  maintenanceTasks.filter((t) => t.equipment_id === equipmentId);

export const maintenanceLogsOfEquipment = (equipmentId: string) =>
  maintenanceLogs
    .filter((l) => l.equipment_id === equipmentId)
    .sort((a, b) => b.performed_at.localeCompare(a.performed_at));

export const manifestsOfEquipment = (equipmentId: string) =>
  wasteManifests.filter((m) => m.transport_equipment_id === equipmentId);

/** Unidades del medidor que faltan para el próximo service. Negativo = pasado. */
export const meterToService = (e: Equipment) => e.next_service_meter - e.meter_value;

/**
 * Un service se considera crítico cuando el equipo ya pasó la lectura prevista
 * o le quedan menos del 3 % de margen respecto del intervalo típico.
 */
export const serviceUrgency = (e: Equipment): "green" | "yellow" | "red" => {
  const remaining = meterToService(e);
  if (remaining <= 0) return "red";
  const threshold = e.meter_type === "horometro" ? 100 : 5000;
  if (remaining <= threshold * 0.5) return "red";
  if (remaining <= threshold) return "yellow";
  return "green";
};

/* ── Habilitaciones ─────────────────────────────────────────────────────── */

export const certificatesOfSubject = (type: "equipo" | "persona", id: string) =>
  certificates
    .filter((c) => c.subject_type === type && c.subject_id === id)
    .sort((a, b) => a.expires_at.localeCompare(b.expires_at));

/** Nombre legible del equipo o persona al que pertenece la habilitación. */
export const certificateSubjectName = (c: Certificate) =>
  c.subject_type === "equipo"
    ? (() => {
        const e = getEquipment(c.subject_id);
        return e ? `${e.internal_code} · ${e.name}` : "—";
      })()
    : personName(c.subject_id);

/** Habilitaciones vencidas o próximas a vencer, de más urgente a menos. */
export const expiringCertificates = (withinDays = 30) =>
  certificates
    .filter((c) => (daysTo(c.expires_at) ?? 999) <= withinDays)
    .sort((a, b) => a.expires_at.localeCompare(b.expires_at));

/* ── Certificaciones y cobranza ─────────────────────────────────────────── */

/** Trabajo certificado o aprobado que todavía no se facturó. */
export const pendingToInvoice = () =>
  certifications.filter((c) => c.status === "presentada" || c.status === "aprobada");

/** Certificaciones devueltas por el cliente: plata trabada por un papel. */
export const observedCertifications = () =>
  certifications.filter((c) => c.status === "observada");

/* ── Residuos ───────────────────────────────────────────────────────────── */

/** Manifiestos sin certificado de disposición final: responsabilidad abierta. */
export const openManifests = () =>
  wasteManifests.filter((m) => m.disposal_certificate_at === null);

/**
 * Modelo de dominio — servicios a yacimiento (oil & gas).
 *
 * Es una maqueta: no hay backend ni persistencia. Los tipos existen para que la
 * demo se comporte como el producto real y sirvan de referencia de lo que se
 * entrega en un sistema de gestión a medida para el sector.
 *
 * La empresa dueña del panel presta servicios a operadoras: alquila equipos con
 * y sin operador, mueve fluidos con flota propia y trata residuos petroleros.
 */

/* ── Personal ───────────────────────────────────────────────────────────── */

export type RoleCode =
  | "admin"
  | "operaciones"
  | "supervisor"
  | "chofer"
  | "operador"
  | "mantenimiento"
  | "hse"
  | "administracion"
  | "comercial";

export interface Person {
  id: string;
  /** Número de legajo interno. */
  file_number: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  roles: RoleCode[];
  is_active: boolean;
  /** Base operativa desde la que sale a yacimiento. */
  base: string;
  hired_at: string;
}

/* ── Clientes ───────────────────────────────────────────────────────────── */

export type ClientStatus = "active" | "prospect" | "archived";
/** Las operadoras son titulares del área; los contratistas subcontratan servicios. */
export type ClientKind = "operadora" | "contratista";

export interface Client {
  id: string;
  kind: ClientKind;
  legal_name: string;
  fantasy_name: string;
  tax_id: string;
  /** Cuenca o región donde opera. */
  basin: string;
  website: string | null;
  notes: string | null;
  status: ClientStatus;
  created_at: string;
}

export interface ClientContact {
  id: string;
  client_id: string;
  full_name: string;
  position: string;
  email: string;
  phone: string;
  is_primary: boolean;
}

export interface ClientBillingInfo {
  id: string;
  client_id: string;
  billing_email: string;
  billing_address: string;
  tax_condition: string;
  /** Plazo de pago pactado, en días desde la aprobación del certificado. */
  payment_terms_days: number;
  payment_method: string;
}

/* ── Contratos ──────────────────────────────────────────────────────────── */

export type ServiceLine =
  | "alquiler_equipos"
  | "transporte_fluidos"
  | "residuos"
  | "movimiento_suelos"
  | "mantenimiento_industrial";

export type ContractStatus =
  | "cotizacion"
  | "activo"
  | "suspendido"
  | "en_cierre"
  | "finalizado";

export type Health = "green" | "yellow" | "red";

export interface Contract {
  id: string;
  client_id: string;
  service_line: ServiceLine;
  name: string;
  /** Número de contrato u orden de compra del cliente. */
  code: string;
  /** Yacimiento o área donde se presta el servicio. */
  field: string;
  description: string;
  status: ContractStatus;
  start_date: string;
  end_date: string | null;
  health: Health;
  /** Monto total adjudicado del contrato marco. */
  contract_amount: number;
  currency: string;
  /** Responsables internos asignados. */
  members: { person_id: string; role_in_contract: string }[];
}

/* ── Órdenes de trabajo ─────────────────────────────────────────────────── */

export type WorkOrderPriority = "low" | "medium" | "high" | "urgent";

export interface WorkOrderColumn {
  id: string;
  contract_id: string;
  name: string;
  position: number;
}

export interface WorkOrder {
  id: string;
  contract_id: string;
  /** Programación (quincena/semana) a la que pertenece. */
  schedule_id: string | null;
  column_id: string;
  /** Número de OT visible para el cliente. */
  code: string;
  title: string;
  description: string;
  /** Equipo afectado a la orden, si aplica. */
  equipment_id: string | null;
  assignee_id: string | null;
  priority: WorkOrderPriority;
  estimated_hours: number | null;
  due_date: string | null;
  position: number;
}

/* ── Programación ───────────────────────────────────────────────────────── */

export type ScheduleStatus = "planned" | "active" | "closed";

export interface Schedule {
  id: string;
  contract_id: string;
  name: string;
  goal: string;
  start_date: string;
  end_date: string;
  status: ScheduleStatus;
}

/* ── Flota y equipos ────────────────────────────────────────────────────── */

export type EquipmentCategory =
  | "grua"
  | "excavadora"
  | "cargadora"
  | "camion_cisterna"
  | "camion_volcador"
  | "generador"
  | "planta_agua"
  | "pickup";

export type EquipmentStatus = "operativo" | "disponible" | "en_service" | "fuera_servicio";
/** Los equipos móviles miden kilómetros; los estáticos, horas de motor. */
export type MeterType = "horometro" | "odometro";

export interface Equipment {
  id: string;
  /** Número interno con el que lo llama la operación. */
  internal_code: string;
  name: string;
  category: EquipmentCategory;
  brand: string;
  model: string;
  year: number;
  /** Dominio del vehículo; los equipos sin patente no lo tienen. */
  plate: string | null;
  status: EquipmentStatus;
  meter_type: MeterType;
  meter_value: number;
  /** Lectura del medidor en la que toca el próximo service preventivo. */
  next_service_meter: number;
  /** Yacimiento donde está afectado, o la base si está en planta. */
  location: string;
  contract_id: string | null;
  /** Tarifa de alquiler por hora o por día, según la línea de servicio. */
  rate_amount: number;
  rate_unit: "hora" | "dia" | "viaje";
  currency: string;
}

/* ── Habilitaciones y vencimientos ──────────────────────────────────────── */

export type CertificateSubject = "equipo" | "persona";

export type CertificateKind =
  | "vtv"
  | "seguro"
  | "ruta"
  | "habilitacion_equipo"
  | "apto_medico"
  | "induccion"
  | "manejo_defensivo"
  | "carga_peligrosa"
  | "licencia_conducir"
  | "altura";

export interface Certificate {
  id: string;
  subject_type: CertificateSubject;
  /** Id del equipo o de la persona, según `subject_type`. */
  subject_id: string;
  kind: CertificateKind;
  /** Organismo o entidad emisora. */
  issuer: string;
  number: string;
  issued_at: string;
  expires_at: string;
}

/* ── Mantenimiento ──────────────────────────────────────────────────────── */

export type MaintenanceKind = "preventivo" | "correctivo" | "predictivo";
export type MaintenanceStatus = "programado" | "en_curso" | "realizado" | "vencido";

export interface MaintenanceTask {
  id: string;
  equipment_id: string;
  kind: MaintenanceKind;
  title: string;
  scope: string;
  /** Lectura del medidor que dispara la intervención. */
  due_meter: number | null;
  due_date: string | null;
  status: MaintenanceStatus;
  estimated_cost: number;
  currency: string;
}

export interface MaintenanceLog {
  id: string;
  equipment_id: string;
  performed_at: string;
  performed_by: string;
  kind: MaintenanceKind;
  meter_at_service: number;
  notes: string;
  cost: number;
  currency: string;
  /** Horas que el equipo estuvo fuera de servicio por la intervención. */
  downtime_hours: number;
}

/* ── Certificaciones mensuales ──────────────────────────────────────────── */

/**
 * El ciclo real del rubro: se emiten partes diarios, el cliente certifica el
 * mes y recién con el certificado aprobado se emite la factura.
 */
export type CertificationStatus =
  | "borrador"
  | "presentada"
  | "aprobada"
  | "observada"
  | "facturada";

export interface Certification {
  id: string;
  contract_id: string;
  /** Período liquidado, en formato YYYY-MM. */
  period: string;
  /** Horas o viajes computados en el período. */
  units: number;
  unit_label: string;
  amount: number;
  currency: string;
  status: CertificationStatus;
  submitted_at: string | null;
  approved_at: string | null;
  /** Motivo cuando el cliente la devuelve observada. */
  observation: string | null;
  invoice_id: string | null;
}

/* ── Comercial ──────────────────────────────────────────────────────────── */

export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";

export interface Quote {
  id: string;
  client_id: string;
  contract_id: string | null;
  title: string;
  /** Número de licitación o pedido de cotización del cliente. */
  tender_number: string | null;
  total_amount: number;
  currency: string;
  status: QuoteStatus;
  sent_at: string | null;
  valid_until: string | null;
  pdf_filename: string | null;
}

export type InvoiceStatus = "draft" | "issued" | "paid" | "overdue" | "cancelled";

export interface Invoice {
  id: string;
  client_id: string;
  contract_id: string | null;
  certification_id: string | null;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  total_amount: number;
  currency: string;
  status: InvoiceStatus;
  payment_date: string | null;
  payment_method: string | null;
  pdf_filename: string | null;
}

/* ── HSE ────────────────────────────────────────────────────────────────── */

export type IncidentKind = "incidente" | "casi_incidente" | "observacion" | "derrame";
export type IncidentSeverity = "leve" | "moderado" | "grave" | "critico";
export type IncidentStatus = "abierto" | "en_investigacion" | "cerrado";

export interface Incident {
  id: string;
  contract_id: string;
  equipment_id: string | null;
  person_id: string | null;
  occurred_at: string;
  kind: IncidentKind;
  severity: IncidentSeverity;
  title: string;
  description: string;
  status: IncidentStatus;
  /** Jornadas perdidas por lesión. Cero si no hubo días caídos. */
  lost_days: number;
  corrective_action: string | null;
}

export type InspectionResult = "conforme" | "observaciones" | "no_conforme";

export interface Inspection {
  id: string;
  contract_id: string;
  performed_at: string;
  performed_by: string;
  title: string;
  result: InspectionResult;
  open_findings: number;
}

/* ── Residuos ───────────────────────────────────────────────────────────── */

export type WasteKind =
  | "lodos_perforacion"
  | "agua_produccion"
  | "suelo_contaminado"
  | "aceites_usados"
  | "trapos_epp"
  | "chatarra_contaminada";

/**
 * El manifiesto acompaña al residuo desde que sale del yacimiento hasta que la
 * planta emite el certificado de disposición final. Mientras no se cierre, la
 * responsabilidad ambiental sigue siendo del generador.
 */
export type ManifestStatus = "emitido" | "en_transito" | "recibido" | "tratado" | "cerrado";

export interface WasteManifest {
  id: string;
  contract_id: string;
  client_id: string;
  manifest_number: string;
  waste_kind: WasteKind;
  quantity_tn: number;
  /** Yacimiento de origen. */
  origin: string;
  transport_equipment_id: string | null;
  treatment_plant: string;
  dispatched_at: string;
  received_at: string | null;
  /** Fecha del certificado de disposición final. Null = manifiesto abierto. */
  disposal_certificate_at: string | null;
  status: ManifestStatus;
}

/* ── Notificaciones ─────────────────────────────────────────────────────── */

export type NotificationKind =
  | "certificate_expiring"
  | "service_due"
  | "certification_pending"
  | "invoice_overdue"
  | "incident_open"
  | "manifest_open";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  link: string;
  is_read: boolean;
  created_at: string;
}

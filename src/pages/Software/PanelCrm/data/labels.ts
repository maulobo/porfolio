import type {
  CertificateKind,
  CertificationStatus,
  ClientKind,
  ClientStatus,
  ContractStatus,
  EquipmentCategory,
  EquipmentStatus,
  IncidentKind,
  IncidentSeverity,
  IncidentStatus,
  InspectionResult,
  InvoiceStatus,
  MaintenanceKind,
  MaintenanceStatus,
  ManifestStatus,
  QuoteStatus,
  RoleCode,
  ScheduleStatus,
  ServiceLine,
  WasteKind,
  WorkOrderPriority,
} from "./types";

export const ROLE_LABEL: Record<RoleCode, string> = {
  admin: "Administrador",
  operaciones: "Operaciones",
  supervisor: "Supervisor",
  chofer: "Chofer",
  operador: "Operador",
  mantenimiento: "Mantenimiento",
  hse: "HSE",
  administracion: "Administración",
  comercial: "Comercial",
};

export const CLIENT_KIND_LABEL: Record<ClientKind, string> = {
  operadora: "Operadora",
  contratista: "Contratista",
};

export const CLIENT_STATUS_LABEL: Record<ClientStatus, string> = {
  active: "Activo",
  prospect: "Prospecto",
  archived: "Archivado",
};

export const SERVICE_LINE_LABEL: Record<ServiceLine, string> = {
  alquiler_equipos: "Alquiler de equipos",
  transporte_fluidos: "Transporte de fluidos",
  residuos: "Tratamiento de residuos",
  movimiento_suelos: "Movimiento de suelos",
  mantenimiento_industrial: "Mantenimiento industrial",
};

export const CONTRACT_STATUS_LABEL: Record<ContractStatus, string> = {
  cotizacion: "En cotización",
  activo: "Activo",
  suspendido: "Suspendido",
  en_cierre: "En cierre",
  finalizado: "Finalizado",
};

export const SCHEDULE_STATUS_LABEL: Record<ScheduleStatus, string> = {
  planned: "Planificada",
  active: "En curso",
  closed: "Cerrada",
};

export const PRIORITY_LABEL: Record<WorkOrderPriority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  urgent: "Urgente",
};

export const EQUIPMENT_CATEGORY_LABEL: Record<EquipmentCategory, string> = {
  grua: "Grúa",
  excavadora: "Excavadora",
  cargadora: "Cargadora",
  camion_cisterna: "Camión cisterna",
  camion_volcador: "Camión volcador",
  generador: "Grupo electrógeno",
  planta_agua: "Planta de agua",
  pickup: "Camioneta",
};

export const EQUIPMENT_STATUS_LABEL: Record<EquipmentStatus, string> = {
  operativo: "En operación",
  disponible: "Disponible",
  en_service: "En service",
  fuera_servicio: "Fuera de servicio",
};

export const CERTIFICATE_KIND_LABEL: Record<CertificateKind, string> = {
  vtv: "VTV",
  seguro: "Seguro",
  ruta: "RUTA",
  habilitacion_equipo: "Habilitación de equipo",
  apto_medico: "Apto médico",
  induccion: "Inducción de seguridad",
  manejo_defensivo: "Manejo defensivo",
  carga_peligrosa: "Carga peligrosa",
  licencia_conducir: "Licencia de conducir",
  altura: "Trabajo en altura",
};

export const MAINTENANCE_KIND_LABEL: Record<MaintenanceKind, string> = {
  preventivo: "Preventivo",
  correctivo: "Correctivo",
  predictivo: "Predictivo",
};

export const MAINTENANCE_STATUS_LABEL: Record<MaintenanceStatus, string> = {
  programado: "Programado",
  en_curso: "En curso",
  realizado: "Realizado",
  vencido: "Vencido",
};

export const CERTIFICATION_STATUS_LABEL: Record<CertificationStatus, string> = {
  borrador: "Borrador",
  presentada: "Presentada",
  aprobada: "Aprobada",
  observada: "Observada",
  facturada: "Facturada",
};

export const QUOTE_STATUS_LABEL: Record<QuoteStatus, string> = {
  draft: "Borrador",
  sent: "Enviada",
  accepted: "Adjudicada",
  rejected: "No adjudicada",
  expired: "Vencida",
};

export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  draft: "Borrador",
  issued: "Emitida",
  paid: "Cobrada",
  overdue: "Vencida",
  cancelled: "Anulada",
};

export const INCIDENT_KIND_LABEL: Record<IncidentKind, string> = {
  incidente: "Incidente",
  casi_incidente: "Casi incidente",
  observacion: "Observación",
  derrame: "Derrame",
};

export const INCIDENT_SEVERITY_LABEL: Record<IncidentSeverity, string> = {
  leve: "Leve",
  moderado: "Moderado",
  grave: "Grave",
  critico: "Crítico",
};

export const INCIDENT_STATUS_LABEL: Record<IncidentStatus, string> = {
  abierto: "Abierto",
  en_investigacion: "En investigación",
  cerrado: "Cerrado",
};

export const INSPECTION_RESULT_LABEL: Record<InspectionResult, string> = {
  conforme: "Conforme",
  observaciones: "Con observaciones",
  no_conforme: "No conforme",
};

export const WASTE_KIND_LABEL: Record<WasteKind, string> = {
  lodos_perforacion: "Lodos de perforación",
  agua_produccion: "Agua de producción",
  suelo_contaminado: "Suelo contaminado",
  aceites_usados: "Aceites usados",
  trapos_epp: "Trapos y EPP contaminados",
  chatarra_contaminada: "Chatarra contaminada",
};

export const MANIFEST_STATUS_LABEL: Record<ManifestStatus, string> = {
  emitido: "Emitido",
  en_transito: "En tránsito",
  recibido: "Recibido en planta",
  tratado: "Tratado",
  cerrado: "Cerrado",
};

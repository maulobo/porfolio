import type {
  AppNotification,
  Certificate,
  Certification,
  Client,
  ClientBillingInfo,
  ClientContact,
  Contract,
  Equipment,
  Incident,
  Inspection,
  Invoice,
  MaintenanceLog,
  MaintenanceTask,
  Person,
  Quote,
  Schedule,
  WasteManifest,
  WorkOrder,
  WorkOrderColumn,
} from "./types";
import { crmPath } from "../lib/routes";

/**
 * DATOS DE DEMOSTRACIÓN — ninguno corresponde a una entidad real.
 *
 * Este panel es público, así que los datos están construidos para que sea
 * imposible confundirlos con información real:
 *
 *  - Personas y empresas se llaman por su función más la palabra «Demo».
 *  - Los CUIT usan el prefijo 00, que no existe en el padrón real.
 *  - Teléfonos, patentes y números de comprobante son secuencias evidentes.
 *  - Los dominios usan `.test`, un TLD reservado que nunca resuelve.
 *  - Las localizaciones son genéricas («Área Demo Norte»), sin referencia
 *    geográfica real.
 *
 * Las fechas se calculan relativas a hoy para que la demo nunca se vea vieja:
 * siempre hay habilitaciones por vencer, services al límite y certificaciones
 * esperando aprobación.
 */

/** Empresa ficticia dueña de este espacio de trabajo. */
export const WORKSPACE = {
  name: "Servicios Demo",
  legal_name: "Servicios Demo S.A. — empresa ficticia",
  tagline: "Panel de demostración",
  initials: "SD",
} as const;

const today = new Date();

const shift = (days: number) => {
  const d = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 12));
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

const addDays = (days: number) => shift(days);
const subDays = (days: number) => shift(-days);
const iso = () => shift(0);

/** Período YYYY-MM desplazado N meses hacia atrás. */
const monthsAgo = (n: number) => {
  const d = new Date(Date.UTC(today.getFullYear(), today.getMonth() - n, 1));
  return d.toISOString().slice(0, 7);
};

/* ── Áreas de operación ─────────────────────────────────────────────────── */

export const FIELDS = [
  "Área Demo Norte",
  "Área Demo Sur",
  "Área Demo Centro",
  "Área Demo Este",
  "Área Demo Oeste",
] as const;

/* ── Personal ───────────────────────────────────────────────────────────── */

export const people: Person[] = [
  { id: "u-1", file_number: "DEMO-01", full_name: "Operaciones Demo", email: "operaciones@empresa-demo.test", phone: "+54 000 000-0001", position: "Gerencia de Operaciones", roles: ["admin", "operaciones"], is_active: true, base: "Base Demo Norte", hired_at: subDays(2200) },
  { id: "u-2", file_number: "DEMO-02", full_name: "Supervisión Demo", email: "supervision@empresa-demo.test", phone: "+54 000 000-0002", position: "Supervisión de campo", roles: ["supervisor"], is_active: true, base: "Base Demo Norte", hired_at: subDays(1450) },
  { id: "u-3", file_number: "DEMO-03", full_name: "Chofer Demo Uno", email: "chofer1@empresa-demo.test", phone: "+54 000 000-0003", position: "Chofer categoría E", roles: ["chofer"], is_active: true, base: "Base Demo Norte", hired_at: subDays(980) },
  { id: "u-4", file_number: "DEMO-04", full_name: "Seguridad Demo", email: "hse@empresa-demo.test", phone: "+54 000 000-0004", position: "Jefatura de HSE", roles: ["hse"], is_active: true, base: "Base Demo Sur", hired_at: subDays(1760) },
  { id: "u-5", file_number: "DEMO-05", full_name: "Operador Demo Uno", email: "operador1@empresa-demo.test", phone: "+54 000 000-0005", position: "Operador de grúa", roles: ["operador"], is_active: true, base: "Base Demo Norte", hired_at: subDays(720) },
  { id: "u-6", file_number: "DEMO-06", full_name: "Administración Demo", email: "administracion@empresa-demo.test", phone: "+54 000 000-0006", position: "Administración y certificaciones", roles: ["administracion"], is_active: true, base: "Base Demo Central", hired_at: subDays(2600) },
  { id: "u-7", file_number: "DEMO-07", full_name: "Mantenimiento Demo", email: "mantenimiento@empresa-demo.test", phone: "+54 000 000-0007", position: "Jefatura de mantenimiento", roles: ["mantenimiento"], is_active: true, base: "Base Demo Sur", hired_at: subDays(1600) },
  { id: "u-8", file_number: "DEMO-08", full_name: "Chofer Demo Dos", email: "chofer2@empresa-demo.test", phone: "+54 000 000-0008", position: "Chofer categoría E", roles: ["chofer"], is_active: true, base: "Base Demo Sur", hired_at: subDays(420) },
  { id: "u-9", file_number: "DEMO-09", full_name: "Comercial Demo", email: "comercial@empresa-demo.test", phone: "+54 000 000-0009", position: "Responsable comercial", roles: ["comercial"], is_active: true, base: "Base Demo Central", hired_at: subDays(1900) },
  { id: "u-10", file_number: "DEMO-10", full_name: "Operador Demo Dos", email: "operador2@empresa-demo.test", phone: "+54 000 000-0010", position: "Operador de equipos", roles: ["operador"], is_active: false, base: "Base Demo Norte", hired_at: subDays(600) },
];

export const currentUser = people[0];

/* ── Clientes ───────────────────────────────────────────────────────────── */

export const clients: Client[] = [
  { id: "c-1", kind: "operadora", legal_name: "Operadora Demo Norte S.A.", fantasy_name: "Operadora Demo Norte", tax_id: "00-00000001-0", basin: "Cuenca Demo Norte", website: "https://operadora-demo-norte.test", notes: "Cliente principal de la demo. Exige carga de partes diarios antes de las 9 h.", status: "active", created_at: subDays(1500) },
  { id: "c-2", kind: "operadora", legal_name: "Operadora Demo Sur S.A.", fantasy_name: "Operadora Demo Sur", tax_id: "00-00000002-0", basin: "Cuenca Demo Sur", website: "https://operadora-demo-sur.test", notes: "Pago a 60 días desde la aprobación del certificado.", status: "active", created_at: subDays(900) },
  { id: "c-3", kind: "operadora", legal_name: "Operadora Demo Austral S.A.", fantasy_name: "Operadora Demo Austral", tax_id: "00-00000003-0", basin: "Cuenca Demo Austral", website: "https://operadora-demo-austral.test", notes: "Audita HSE trimestralmente. Última auditoría con dos hallazgos abiertos.", status: "active", created_at: subDays(540) },
  { id: "c-4", kind: "operadora", legal_name: "Operadora Demo Oeste S.R.L.", fantasy_name: "Operadora Demo Oeste", tax_id: "00-00000004-0", basin: "Cuenca Demo Norte", website: null, notes: "Prospecto. Pidió cotización por alquiler de equipos para su primera locación.", status: "prospect", created_at: subDays(45) },
  { id: "c-5", kind: "contratista", legal_name: "Contratista Demo S.A.", fantasy_name: "Contratista Demo", tax_id: "00-00000005-0", basin: "Cuenca Demo Norte", website: "https://contratista-demo.test", notes: "Contratista principal. Subcontrata mantenimiento de instalaciones de superficie.", status: "active", created_at: subDays(700) },
  { id: "c-6", kind: "operadora", legal_name: "Operadora Demo Este S.A.", fantasy_name: "Operadora Demo Este", tax_id: "00-00000006-0", basin: "Cuenca Demo Norte", website: null, notes: "Archivada: ejemplo de cuenta dada de baja.", status: "archived", created_at: subDays(1900) },
];

export const clientContacts: ClientContact[] = [
  { id: "cc-1", client_id: "c-1", full_name: "Contacto Demo Uno", position: "Superintendencia de Operaciones", email: "contacto1@operadora-demo-norte.test", phone: "+54 000 100-0001", is_primary: true },
  { id: "cc-2", client_id: "c-1", full_name: "Contacto Demo Dos", position: "Administración de contratos", email: "contacto2@operadora-demo-norte.test", phone: "+54 000 100-0002", is_primary: false },
  { id: "cc-3", client_id: "c-1", full_name: "Contacto Demo Tres", position: "Referente HSE", email: "contacto3@operadora-demo-norte.test", phone: "+54 000 100-0003", is_primary: false },
  { id: "cc-4", client_id: "c-2", full_name: "Contacto Demo Cuatro", position: "Jefatura de Producción", email: "contacto4@operadora-demo-sur.test", phone: "+54 000 200-0001", is_primary: true },
  { id: "cc-5", client_id: "c-3", full_name: "Contacto Demo Cinco", position: "Gerencia de Medio Ambiente", email: "contacto5@operadora-demo-austral.test", phone: "+54 000 300-0001", is_primary: true },
  { id: "cc-6", client_id: "c-3", full_name: "Contacto Demo Seis", position: "Compras y Contratos", email: "contacto6@operadora-demo-austral.test", phone: "+54 000 300-0002", is_primary: false },
  { id: "cc-7", client_id: "c-5", full_name: "Contacto Demo Siete", position: "Jefatura de Obra", email: "contacto7@contratista-demo.test", phone: "+54 000 500-0001", is_primary: true },
  { id: "cc-8", client_id: "c-4", full_name: "Contacto Demo Ocho", position: "Gerencia General", email: "contacto8@operadora-demo-oeste.test", phone: "+54 000 400-0001", is_primary: true },
];

export const clientBilling: ClientBillingInfo[] = [
  { id: "cb-1", client_id: "c-1", billing_email: "pagos@operadora-demo-norte.test", billing_address: "Calle Demo 100, Ciudad Demo", tax_condition: "Responsable Inscripto", payment_terms_days: 45, payment_method: "Transferencia" },
  { id: "cb-2", client_id: "c-2", billing_email: "pagos@operadora-demo-sur.test", billing_address: "Calle Demo 200, Ciudad Demo", tax_condition: "Responsable Inscripto", payment_terms_days: 60, payment_method: "Transferencia" },
  { id: "cb-3", client_id: "c-3", billing_email: "pagos@operadora-demo-austral.test", billing_address: "Calle Demo 300, Ciudad Demo", tax_condition: "Responsable Inscripto", payment_terms_days: 30, payment_method: "Transferencia" },
  { id: "cb-4", client_id: "c-5", billing_email: "pagos@contratista-demo.test", billing_address: "Calle Demo 500, Ciudad Demo", tax_condition: "Responsable Inscripto", payment_terms_days: 30, payment_method: "Cheque 30 días" },
];

/* ── Contratos ──────────────────────────────────────────────────────────── */

export const contracts: Contract[] = [
  {
    id: "ct-1", client_id: "c-1", service_line: "alquiler_equipos",
    name: "Alquiler de equipos con operador — Área Demo Norte", code: "OC-DEMO-0001", field: "Área Demo Norte",
    description: "Provisión de grúas, excavadoras y cargadoras con operador para armado de locaciones y montaje de instalaciones de superficie. Régimen 14x14, disponibilidad 24 h.",
    status: "activo", start_date: subDays(210), end_date: addDays(520),
    health: "green", contract_amount: 486000000, currency: "ARS",
    members: [
      { person_id: "u-1", role_in_contract: "Responsable de contrato" },
      { person_id: "u-2", role_in_contract: "Supervisión de campo" },
      { person_id: "u-5", role_in_contract: "Operador de grúa" },
    ],
  },
  {
    id: "ct-2", client_id: "c-2", service_line: "transporte_fluidos",
    name: "Transporte de agua de producción — Área Demo Sur", code: "OC-DEMO-0002", field: "Área Demo Sur",
    description: "Retiro y traslado de agua de producción desde baterías hasta planta de tratamiento. Flota de cisternas con habilitación para carga peligrosa.",
    status: "activo", start_date: subDays(120), end_date: addDays(245),
    health: "yellow", contract_amount: 212400000, currency: "ARS",
    members: [
      { person_id: "u-2", role_in_contract: "Responsable de contrato" },
      { person_id: "u-3", role_in_contract: "Chofer asignado" },
      { person_id: "u-8", role_in_contract: "Chofer asignado" },
    ],
  },
  {
    id: "ct-3", client_id: "c-3", service_line: "residuos",
    name: "Retiro y tratamiento de residuos — Área Demo Austral", code: "OC-DEMO-0003", field: "Área Demo Centro",
    description: "Gestión integral de residuos: retiro en el área, transporte habilitado, tratamiento y certificado de disposición final.",
    status: "activo", start_date: subDays(300), end_date: addDays(65),
    health: "red", contract_amount: 168900000, currency: "ARS",
    members: [
      { person_id: "u-4", role_in_contract: "Responsable ambiental" },
      { person_id: "u-2", role_in_contract: "Coordinación logística" },
    ],
  },
  {
    id: "ct-4", client_id: "c-1", service_line: "movimiento_suelos",
    name: "Preparación de locaciones — Área Demo Este", code: "OC-DEMO-0004", field: "Área Demo Este",
    description: "Movimiento de suelos, nivelación y compactación para cuatro locaciones, incluida la construcción de accesos.",
    status: "en_cierre", start_date: subDays(430), end_date: subDays(25),
    health: "green", contract_amount: 298700000, currency: "ARS",
    members: [
      { person_id: "u-1", role_in_contract: "Responsable de contrato" },
      { person_id: "u-2", role_in_contract: "Supervisión de campo" },
    ],
  },
  {
    id: "ct-5", client_id: "c-5", service_line: "mantenimiento_industrial",
    name: "Mantenimiento de instalaciones de superficie — Área Demo Oeste", code: "SUB-DEMO-0005", field: "Área Demo Oeste",
    description: "Mantenimiento preventivo y correctivo de baterías, colectores y tanques, con cuadrilla propia y grupo electrógeno de respaldo.",
    status: "activo", start_date: subDays(75), end_date: addDays(290),
    health: "green", contract_amount: 94500000, currency: "ARS",
    members: [
      { person_id: "u-7", role_in_contract: "Responsable técnico" },
      { person_id: "u-2", role_in_contract: "Supervisión de campo" },
    ],
  },
  {
    id: "ct-6", client_id: "c-4", service_line: "alquiler_equipos",
    name: "Alquiler de equipos — Área Demo Oeste", code: "COT-DEMO-0006", field: "Área Demo Oeste",
    description: "Cotización en curso para provisión de equipos con operador durante la construcción de la primera locación del área.",
    status: "cotizacion", start_date: iso(), end_date: null,
    health: "green", contract_amount: 132000000, currency: "ARS",
    members: [{ person_id: "u-9", role_in_contract: "Responsable comercial" }],
  },
];

/* ── Flota y equipos ────────────────────────────────────────────────────── */

export const equipment: Equipment[] = [
  { id: "eq-1", internal_code: "GR-04", name: "Grúa hidráulica 70 t", category: "grua", brand: "Marca Demo", model: "Modelo D-70", year: 2021, plate: "DEMO-001", status: "operativo", meter_type: "horometro", meter_value: 8420, next_service_meter: 8500, location: "Área Demo Norte", contract_id: "ct-1", rate_amount: 185000, rate_unit: "hora", currency: "ARS" },
  { id: "eq-2", internal_code: "GR-07", name: "Grúa hidráulica 40 t", category: "grua", brand: "Marca Demo", model: "Modelo D-40", year: 2019, plate: "DEMO-002", status: "en_service", meter_type: "horometro", meter_value: 14310, next_service_meter: 14500, location: "Base Demo Norte", contract_id: null, rate_amount: 142000, rate_unit: "hora", currency: "ARS" },
  { id: "eq-3", internal_code: "EX-11", name: "Excavadora sobre orugas 22 t", category: "excavadora", brand: "Marca Demo", model: "Modelo E-220", year: 2022, plate: null, status: "operativo", meter_type: "horometro", meter_value: 5180, next_service_meter: 5250, location: "Área Demo Norte", contract_id: "ct-1", rate_amount: 128000, rate_unit: "hora", currency: "ARS" },
  { id: "eq-4", internal_code: "EX-12", name: "Excavadora sobre orugas 30 t", category: "excavadora", brand: "Marca Demo", model: "Modelo E-300", year: 2020, plate: null, status: "operativo", meter_type: "horometro", meter_value: 9870, next_service_meter: 9900, location: "Área Demo Este", contract_id: "ct-4", rate_amount: 156000, rate_unit: "hora", currency: "ARS" },
  { id: "eq-5", internal_code: "CA-03", name: "Cargadora frontal 5 m³", category: "cargadora", brand: "Marca Demo", model: "Modelo C-500", year: 2018, plate: null, status: "fuera_servicio", meter_type: "horometro", meter_value: 18640, next_service_meter: 18700, location: "Base Demo Norte", contract_id: null, rate_amount: 98000, rate_unit: "hora", currency: "ARS" },
  { id: "eq-6", internal_code: "CT-21", name: "Camión cisterna 30 m³", category: "camion_cisterna", brand: "Marca Demo", model: "Modelo T-3000", year: 2021, plate: "DEMO-003", status: "operativo", meter_type: "odometro", meter_value: 214800, next_service_meter: 220000, location: "Área Demo Sur", contract_id: "ct-2", rate_amount: 340000, rate_unit: "viaje", currency: "ARS" },
  { id: "eq-7", internal_code: "CT-22", name: "Camión cisterna 30 m³", category: "camion_cisterna", brand: "Marca Demo", model: "Modelo T-3000", year: 2020, plate: "DEMO-004", status: "operativo", meter_type: "odometro", meter_value: 289400, next_service_meter: 290000, location: "Área Demo Sur", contract_id: "ct-2", rate_amount: 340000, rate_unit: "viaje", currency: "ARS" },
  { id: "eq-8", internal_code: "CT-23", name: "Camión cisterna 20 m³ (residuos)", category: "camion_cisterna", brand: "Marca Demo", model: "Modelo T-2000", year: 2019, plate: "DEMO-005", status: "operativo", meter_type: "odometro", meter_value: 341200, next_service_meter: 345000, location: "Área Demo Centro", contract_id: "ct-3", rate_amount: 295000, rate_unit: "viaje", currency: "ARS" },
  { id: "eq-9", internal_code: "VO-31", name: "Camión volcador 14 m³", category: "camion_volcador", brand: "Marca Demo", model: "Modelo V-1400", year: 2022, plate: "DEMO-006", status: "operativo", meter_type: "odometro", meter_value: 98700, next_service_meter: 105000, location: "Área Demo Este", contract_id: "ct-4", rate_amount: 210000, rate_unit: "viaje", currency: "ARS" },
  { id: "eq-10", internal_code: "VO-32", name: "Camión volcador 14 m³", category: "camion_volcador", brand: "Marca Demo", model: "Modelo V-1400", year: 2022, plate: "DEMO-007", status: "disponible", meter_type: "odometro", meter_value: 76200, next_service_meter: 85000, location: "Base Demo Norte", contract_id: null, rate_amount: 210000, rate_unit: "viaje", currency: "ARS" },
  { id: "eq-11", internal_code: "GE-41", name: "Grupo electrógeno 250 kVA", category: "generador", brand: "Marca Demo", model: "Modelo G-250", year: 2021, plate: null, status: "operativo", meter_type: "horometro", meter_value: 6240, next_service_meter: 6300, location: "Área Demo Oeste", contract_id: "ct-5", rate_amount: 64000, rate_unit: "dia", currency: "ARS" },
  { id: "eq-12", internal_code: "GE-42", name: "Grupo electrógeno 150 kVA", category: "generador", brand: "Marca Demo", model: "Modelo G-150", year: 2017, plate: null, status: "disponible", meter_type: "horometro", meter_value: 21470, next_service_meter: 21600, location: "Base Demo Sur", contract_id: null, rate_amount: 48000, rate_unit: "dia", currency: "ARS" },
  { id: "eq-13", internal_code: "PA-51", name: "Planta de tratamiento de agua móvil", category: "planta_agua", brand: "Marca Demo", model: "Modelo P-Movil", year: 2023, plate: null, status: "operativo", meter_type: "horometro", meter_value: 2180, next_service_meter: 2400, location: "Área Demo Centro", contract_id: "ct-3", rate_amount: 128000, rate_unit: "dia", currency: "ARS" },
  { id: "eq-14", internal_code: "PK-61", name: "Camioneta 4x4 doble cabina", category: "pickup", brand: "Marca Demo", model: "Modelo K-4", year: 2023, plate: "DEMO-008", status: "operativo", meter_type: "odometro", meter_value: 68400, next_service_meter: 70000, location: "Área Demo Norte", contract_id: "ct-1", rate_amount: 42000, rate_unit: "dia", currency: "ARS" },
  { id: "eq-15", internal_code: "PK-62", name: "Camioneta 4x4 doble cabina", category: "pickup", brand: "Marca Demo", model: "Modelo K-4", year: 2022, plate: "DEMO-009", status: "operativo", meter_type: "odometro", meter_value: 112300, next_service_meter: 115000, location: "Área Demo Oeste", contract_id: "ct-5", rate_amount: 42000, rate_unit: "dia", currency: "ARS" },
];

/* ── Habilitaciones y vencimientos ──────────────────────────────────────── */

export const certificates: Certificate[] = [
  // Equipos
  { id: "hb-1", subject_type: "equipo", subject_id: "eq-1", kind: "habilitacion_equipo", issuer: "Organismo Demo de Control", number: "DEMO-HAB-001", issued_at: subDays(340), expires_at: addDays(25) },
  { id: "hb-2", subject_type: "equipo", subject_id: "eq-1", kind: "seguro", issuer: "Aseguradora Demo", number: "DEMO-SEG-001", issued_at: subDays(300), expires_at: addDays(65) },
  { id: "hb-3", subject_type: "equipo", subject_id: "eq-2", kind: "habilitacion_equipo", issuer: "Organismo Demo de Control", number: "DEMO-HAB-002", issued_at: subDays(400), expires_at: subDays(12) },
  { id: "hb-4", subject_type: "equipo", subject_id: "eq-6", kind: "vtv", issuer: "Verificadora Demo", number: "DEMO-VTV-001", issued_at: subDays(180), expires_at: addDays(3) },
  { id: "hb-5", subject_type: "equipo", subject_id: "eq-6", kind: "ruta", issuer: "Registro Demo de Transporte", number: "DEMO-RUT-001", issued_at: subDays(210), expires_at: addDays(155) },
  { id: "hb-6", subject_type: "equipo", subject_id: "eq-7", kind: "vtv", issuer: "Verificadora Demo", number: "DEMO-VTV-002", issued_at: subDays(150), expires_at: addDays(32) },
  { id: "hb-7", subject_type: "equipo", subject_id: "eq-7", kind: "seguro", issuer: "Aseguradora Demo", number: "DEMO-SEG-002", issued_at: subDays(280), expires_at: addDays(85) },
  { id: "hb-8", subject_type: "equipo", subject_id: "eq-8", kind: "ruta", issuer: "Registro Demo de Transporte", number: "DEMO-RUT-002", issued_at: subDays(330), expires_at: addDays(1) },
  { id: "hb-9", subject_type: "equipo", subject_id: "eq-8", kind: "vtv", issuer: "Verificadora Demo", number: "DEMO-VTV-003", issued_at: subDays(200), expires_at: addDays(160) },
  { id: "hb-10", subject_type: "equipo", subject_id: "eq-9", kind: "vtv", issuer: "Verificadora Demo", number: "DEMO-VTV-004", issued_at: subDays(90), expires_at: addDays(275) },
  { id: "hb-11", subject_type: "equipo", subject_id: "eq-14", kind: "vtv", issuer: "Verificadora Demo", number: "DEMO-VTV-005", issued_at: subDays(60), expires_at: addDays(305) },
  { id: "hb-12", subject_type: "equipo", subject_id: "eq-15", kind: "seguro", issuer: "Aseguradora Demo", number: "DEMO-SEG-003", issued_at: subDays(310), expires_at: addDays(55) },
  { id: "hb-13", subject_type: "equipo", subject_id: "eq-13", kind: "habilitacion_equipo", issuer: "Autoridad Demo Ambiental", number: "DEMO-HAB-003", issued_at: subDays(120), expires_at: addDays(245) },

  // Personal
  { id: "hb-14", subject_type: "persona", subject_id: "u-3", kind: "licencia_conducir", issuer: "Municipio Demo", number: "DEMO-LIC-001", issued_at: subDays(700), expires_at: addDays(4) },
  { id: "hb-15", subject_type: "persona", subject_id: "u-3", kind: "carga_peligrosa", issuer: "Instituto Demo de Transporte", number: "DEMO-CAR-001", issued_at: subDays(300), expires_at: addDays(65) },
  { id: "hb-16", subject_type: "persona", subject_id: "u-3", kind: "apto_medico", issuer: "Centro Médico Demo", number: "DEMO-APT-001", issued_at: subDays(200), expires_at: addDays(165) },
  { id: "hb-17", subject_type: "persona", subject_id: "u-8", kind: "carga_peligrosa", issuer: "Instituto Demo de Transporte", number: "DEMO-CAR-002", issued_at: subDays(360), expires_at: subDays(5) },
  { id: "hb-18", subject_type: "persona", subject_id: "u-8", kind: "licencia_conducir", issuer: "Municipio Demo", number: "DEMO-LIC-002", issued_at: subDays(400), expires_at: addDays(330) },
  { id: "hb-19", subject_type: "persona", subject_id: "u-5", kind: "induccion", issuer: "Operadora Demo Norte", number: "DEMO-IND-001", issued_at: subDays(150), expires_at: addDays(30) },
  { id: "hb-20", subject_type: "persona", subject_id: "u-5", kind: "altura", issuer: "Instituto Demo de Seguridad", number: "DEMO-ALT-001", issued_at: subDays(240), expires_at: addDays(120) },
  { id: "hb-21", subject_type: "persona", subject_id: "u-2", kind: "induccion", issuer: "Operadora Demo Norte", number: "DEMO-IND-002", issued_at: subDays(160), expires_at: addDays(20) },
  { id: "hb-22", subject_type: "persona", subject_id: "u-2", kind: "manejo_defensivo", issuer: "Instituto Demo de Seguridad", number: "DEMO-MAN-001", issued_at: subDays(320), expires_at: addDays(45) },
  { id: "hb-23", subject_type: "persona", subject_id: "u-4", kind: "apto_medico", issuer: "Centro Médico Demo", number: "DEMO-APT-002", issued_at: subDays(340), expires_at: addDays(25) },
  { id: "hb-24", subject_type: "persona", subject_id: "u-7", kind: "apto_medico", issuer: "Centro Médico Demo", number: "DEMO-APT-003", issued_at: subDays(190), expires_at: addDays(175) },
  { id: "hb-25", subject_type: "persona", subject_id: "u-1", kind: "induccion", issuer: "Operadora Demo Austral", number: "DEMO-IND-003", issued_at: subDays(280), expires_at: addDays(85) },
];

/* ── Programación y órdenes de trabajo ──────────────────────────────────── */

export const schedules: Schedule[] = [
  { id: "sc-1", contract_id: "ct-1", name: "Quincena 1 — Montaje batería norte", goal: "Montaje de separadores y tanques en batería norte.", start_date: subDays(44), end_date: subDays(30), status: "closed" },
  { id: "sc-2", contract_id: "ct-1", name: "Quincena 2 — Locación 14", goal: "Izaje y montaje de equipos en la nueva locación.", start_date: subDays(29), end_date: subDays(15), status: "closed" },
  { id: "sc-3", contract_id: "ct-1", name: "Quincena 3 — Colector y accesos", goal: "Montaje de colector y acondicionamiento de accesos internos.", start_date: subDays(14), end_date: addDays(2), status: "active" },
  { id: "sc-4", contract_id: "ct-1", name: "Quincena 4 — Cierre de locación", goal: "Desmovilización parcial y orden final de locación.", start_date: addDays(3), end_date: addDays(17), status: "planned" },
  { id: "sc-5", contract_id: "ct-2", name: "Semana en curso — Rutas norte", goal: "Cubrir el retiro de agua de las baterías 3, 4 y 7.", start_date: subDays(4), end_date: addDays(3), status: "active" },
  { id: "sc-6", contract_id: "ct-3", name: "Campaña de retiro — Mes en curso", goal: "Retirar el pasivo acumulado y cerrar manifiestos pendientes.", start_date: subDays(20), end_date: addDays(1), status: "active" },
];

export const workOrderColumns: WorkOrderColumn[] = [
  { id: "col-1", contract_id: "ct-1", name: "Solicitada", position: 0 },
  { id: "col-2", contract_id: "ct-1", name: "Programada", position: 1 },
  { id: "col-3", contract_id: "ct-1", name: "En ejecución", position: 2 },
  { id: "col-4", contract_id: "ct-1", name: "A certificar", position: 3 },
  { id: "col-5", contract_id: "ct-1", name: "Cerrada", position: 4 },

  { id: "col-6", contract_id: "ct-2", name: "Solicitada", position: 0 },
  { id: "col-7", contract_id: "ct-2", name: "Programada", position: 1 },
  { id: "col-8", contract_id: "ct-2", name: "En ejecución", position: 2 },
  { id: "col-9", contract_id: "ct-2", name: "A certificar", position: 3 },
  { id: "col-10", contract_id: "ct-2", name: "Cerrada", position: 4 },

  { id: "col-11", contract_id: "ct-3", name: "Solicitada", position: 0 },
  { id: "col-12", contract_id: "ct-3", name: "En ejecución", position: 1 },
  { id: "col-13", contract_id: "ct-3", name: "A certificar", position: 2 },
  { id: "col-14", contract_id: "ct-3", name: "Cerrada", position: 3 },

  { id: "col-15", contract_id: "ct-5", name: "Solicitada", position: 0 },
  { id: "col-16", contract_id: "ct-5", name: "En ejecución", position: 1 },
  { id: "col-17", contract_id: "ct-5", name: "Cerrada", position: 2 },
];

export const workOrders: WorkOrder[] = [
  // ct-1
  { id: "wo-1", contract_id: "ct-1", schedule_id: "sc-3", column_id: "col-2", code: "OT-DEMO-0412", title: "Izaje de separador trifásico", description: "Descarga e izaje del separador en batería norte. Requiere grúa de 70 t y plan de izaje aprobado.", equipment_id: "eq-1", assignee_id: "u-5", priority: "urgent", estimated_hours: 10, due_date: addDays(1), position: 0 },
  { id: "wo-2", contract_id: "ct-1", schedule_id: "sc-3", column_id: "col-3", code: "OT-DEMO-0413", title: "Excavación de zanja para colector", description: "Zanjeo de 320 m para colector de producción, profundidad 1,20 m.", equipment_id: "eq-3", assignee_id: "u-2", priority: "high", estimated_hours: 24, due_date: addDays(2), position: 0 },
  { id: "wo-3", contract_id: "ct-1", schedule_id: "sc-3", column_id: "col-3", code: "OT-DEMO-0414", title: "Acondicionamiento de acceso interno", description: "Nivelación y compactación del acceso a la locación 14.", equipment_id: "eq-3", assignee_id: "u-2", priority: "medium", estimated_hours: 16, due_date: addDays(6), position: 1 },
  { id: "wo-4", contract_id: "ct-1", schedule_id: "sc-3", column_id: "col-4", code: "OT-DEMO-0409", title: "Montaje de tanques de almacenaje", description: "Izaje y posicionamiento de tres tanques de 500 m³. Parte diario firmado por el supervisor del cliente.", equipment_id: "eq-1", assignee_id: "u-5", priority: "medium", estimated_hours: 18, due_date: addDays(4), position: 0 },
  { id: "wo-5", contract_id: "ct-1", schedule_id: "sc-2", column_id: "col-5", code: "OT-DEMO-0398", title: "Izaje de skid de medición", description: "Completada y certificada en la quincena anterior.", equipment_id: "eq-1", assignee_id: "u-5", priority: "high", estimated_hours: 8, due_date: subDays(18), position: 0 },
  { id: "wo-6", contract_id: "ct-1", schedule_id: null, column_id: "col-1", code: "OT-DEMO-0420", title: "Traslado de equipos a locación 16", description: "Pedido informal del superintendente. Falta orden de compra formal.", equipment_id: null, assignee_id: null, priority: "low", estimated_hours: null, due_date: null, position: 0 },
  { id: "wo-7", contract_id: "ct-1", schedule_id: "sc-3", column_id: "col-2", code: "OT-DEMO-0416", title: "Retiro de material sobrante", description: "Carga y retiro de escombro y material de descarte de la locación.", equipment_id: "eq-9", assignee_id: "u-2", priority: "medium", estimated_hours: 12, due_date: addDays(7), position: 1 },
  { id: "wo-8", contract_id: "ct-1", schedule_id: "sc-2", column_id: "col-5", code: "OT-DEMO-0401", title: "Nivelación de plataforma de bombas", description: "Cerrada y certificada.", equipment_id: "eq-3", assignee_id: "u-2", priority: "medium", estimated_hours: 14, due_date: subDays(20), position: 1 },

  // ct-2
  { id: "wo-9", contract_id: "ct-2", schedule_id: "sc-5", column_id: "col-8", code: "OT-DEMO-0501", title: "Retiro de agua — Batería 3", description: "Cuatro viajes diarios desde batería 3 a planta de tratamiento.", equipment_id: "eq-6", assignee_id: "u-3", priority: "high", estimated_hours: 9, due_date: addDays(1), position: 0 },
  { id: "wo-10", contract_id: "ct-2", schedule_id: "sc-5", column_id: "col-8", code: "OT-DEMO-0502", title: "Retiro de agua — Batería 7", description: "Tres viajes diarios. Acceso complicado con lluvia.", equipment_id: "eq-7", assignee_id: "u-8", priority: "high", estimated_hours: 9, due_date: addDays(1), position: 1 },
  { id: "wo-11", contract_id: "ct-2", schedule_id: "sc-5", column_id: "col-9", code: "OT-DEMO-0498", title: "Retiro de agua — Batería 4", description: "Semana cerrada, con remitos conformados. Pendiente de incluir en el certificado.", equipment_id: "eq-6", assignee_id: "u-3", priority: "medium", estimated_hours: 40, due_date: subDays(2), position: 0 },
  { id: "wo-12", contract_id: "ct-2", schedule_id: null, column_id: "col-6", code: "OT-DEMO-0505", title: "Refuerzo por parada de planta", description: "El cliente anticipa mayor volumen la semana próxima. Evaluar tercer camión.", equipment_id: null, assignee_id: null, priority: "medium", estimated_hours: null, due_date: addDays(9), position: 0 },
  { id: "wo-13", contract_id: "ct-2", schedule_id: "sc-5", column_id: "col-10", code: "OT-DEMO-0488", title: "Retiro extraordinario fin de semana", description: "Cerrada y facturada.", equipment_id: "eq-7", assignee_id: "u-8", priority: "urgent", estimated_hours: 16, due_date: subDays(9), position: 0 },

  // ct-3
  { id: "wo-14", contract_id: "ct-3", schedule_id: "sc-6", column_id: "col-12", code: "OT-DEMO-0611", title: "Retiro de lodos — Pileta 2", description: "Carga y transporte de 48 t de lodos a planta de tratamiento.", equipment_id: "eq-8", assignee_id: "u-4", priority: "urgent", estimated_hours: 20, due_date: iso(), position: 0 },
  { id: "wo-15", contract_id: "ct-3", schedule_id: "sc-6", column_id: "col-12", code: "OT-DEMO-0612", title: "Retiro de suelo contaminado — Sector B", description: "Excavación y retiro del suelo afectado por el derrame de la semana pasada.", equipment_id: "eq-8", assignee_id: "u-4", priority: "urgent", estimated_hours: 30, due_date: addDays(2), position: 1 },
  { id: "wo-16", contract_id: "ct-3", schedule_id: "sc-6", column_id: "col-13", code: "OT-DEMO-0605", title: "Retiro de aceites usados", description: "Retirado y en planta. Falta el certificado de disposición final para cerrar.", equipment_id: "eq-8", assignee_id: "u-4", priority: "high", estimated_hours: 8, due_date: subDays(3), position: 0 },
  { id: "wo-17", contract_id: "ct-3", schedule_id: null, column_id: "col-11", code: "OT-DEMO-0615", title: "Retiro de chatarra contaminada", description: "A la espera de que el cliente habilite el sector.", equipment_id: null, assignee_id: null, priority: "low", estimated_hours: null, due_date: addDays(12), position: 0 },

  // ct-5
  { id: "wo-18", contract_id: "ct-5", schedule_id: null, column_id: "col-16", code: "OT-DEMO-0703", title: "Mantenimiento de colector principal", description: "Inspección, limpieza y reemplazo de bridas del colector de la batería central.", equipment_id: "eq-11", assignee_id: "u-7", priority: "high", estimated_hours: 22, due_date: addDays(3), position: 0 },
  { id: "wo-19", contract_id: "ct-5", schedule_id: null, column_id: "col-16", code: "OT-DEMO-0704", title: "Recambio de válvulas en tanque 04", description: "Provisión de mano de obra y grupo electrógeno de respaldo.", equipment_id: "eq-11", assignee_id: "u-7", priority: "medium", estimated_hours: 12, due_date: addDays(8), position: 1 },
  { id: "wo-20", contract_id: "ct-5", schedule_id: null, column_id: "col-17", code: "OT-DEMO-0698", title: "Pintura y protección de cañerías", description: "Trabajo cerrado y conformado.", equipment_id: null, assignee_id: "u-7", priority: "low", estimated_hours: 26, due_date: subDays(12), position: 0 },
];

/* ── Mantenimiento ──────────────────────────────────────────────────────── */

export const maintenanceTasks: MaintenanceTask[] = [
  { id: "mt-1", equipment_id: "eq-1", kind: "preventivo", title: "Service 8.500 h — grúa GR-04", scope: "Cambio de aceite hidráulico, filtros, revisión de cables de izaje y ensayo de frenos.", due_meter: 8500, due_date: addDays(6), status: "programado", estimated_cost: 4200000, currency: "ARS" },
  { id: "mt-2", equipment_id: "eq-2", kind: "correctivo", title: "Reparación de bomba hidráulica — GR-07", scope: "Pérdida de presión en el circuito de izaje. Equipo fuera de contrato hasta resolver.", due_meter: null, due_date: addDays(2), status: "en_curso", estimated_cost: 7800000, currency: "ARS" },
  { id: "mt-3", equipment_id: "eq-4", kind: "preventivo", title: "Service 9.900 h — excavadora EX-12", scope: "Cambio de aceite de motor, filtros y revisión de tren de rodaje.", due_meter: 9900, due_date: addDays(4), status: "programado", estimated_cost: 3100000, currency: "ARS" },
  { id: "mt-4", equipment_id: "eq-5", kind: "correctivo", title: "Rotura de transmisión — cargadora CA-03", scope: "Equipo fuera de servicio desde hace tres semanas. Presupuesto de caja en evaluación.", due_meter: null, due_date: subDays(6), status: "vencido", estimated_cost: 15400000, currency: "ARS" },
  { id: "mt-5", equipment_id: "eq-7", kind: "preventivo", title: "Service 290.000 km — cisterna CT-22", scope: "Service completo de motor, revisión de suspensión y prueba hidráulica del tanque.", due_meter: 290000, due_date: addDays(9), status: "programado", estimated_cost: 5600000, currency: "ARS" },
  { id: "mt-6", equipment_id: "eq-13", kind: "predictivo", title: "Análisis de vibraciones — planta PA-51", scope: "Medición de vibraciones en bombas centrífugas para anticipar desgaste de rodamientos.", due_meter: null, due_date: addDays(18), status: "programado", estimated_cost: 980000, currency: "ARS" },
];

export const maintenanceLogs: MaintenanceLog[] = [
  { id: "ml-1", equipment_id: "eq-1", performed_at: subDays(62), performed_by: "u-7", kind: "preventivo", meter_at_service: 8000, notes: "Service de 8.000 h completo. Se detectó desgaste incipiente en cable auxiliar, se programa recambio.", cost: 3900000, currency: "ARS", downtime_hours: 14 },
  { id: "ml-2", equipment_id: "eq-6", performed_at: subDays(28), performed_by: "u-7", kind: "preventivo", meter_at_service: 210000, notes: "Service de 210.000 km. Cambio de cubiertas del tren delantero.", cost: 5100000, currency: "ARS", downtime_hours: 20 },
  { id: "ml-3", equipment_id: "eq-3", performed_at: subDays(40), performed_by: "u-7", kind: "preventivo", meter_at_service: 5000, notes: "Service de 5.000 h sin novedades. Tren de rodaje al 70 %.", cost: 2800000, currency: "ARS", downtime_hours: 10 },
  { id: "ml-4", equipment_id: "eq-5", performed_at: subDays(21), performed_by: "u-7", kind: "correctivo", meter_at_service: 18640, notes: "Diagnóstico de rotura de transmisión. Equipo inmovilizado en base a la espera de repuestos.", cost: 620000, currency: "ARS", downtime_hours: 504 },
  { id: "ml-5", equipment_id: "eq-8", performed_at: subDays(15), performed_by: "u-7", kind: "correctivo", meter_at_service: 338900, notes: "Reemplazo de válvula de descarga con pérdida. Se verificó estanqueidad antes de reingresar a servicio.", cost: 1450000, currency: "ARS", downtime_hours: 26 },
  { id: "ml-6", equipment_id: "eq-11", performed_at: subDays(9), performed_by: "u-7", kind: "preventivo", meter_at_service: 6000, notes: "Service de 6.000 h del grupo electrógeno. Cambio de filtros y prueba de carga al 100 %.", cost: 1900000, currency: "ARS", downtime_hours: 8 },
];

/* ── Certificaciones mensuales ──────────────────────────────────────────── */

export const certifications: Certification[] = [
  { id: "ce-1", contract_id: "ct-1", period: monthsAgo(0), units: 612, unit_label: "horas equipo", amount: 78400000, currency: "ARS", status: "borrador", submitted_at: null, approved_at: null, observation: null, invoice_id: null },
  { id: "ce-2", contract_id: "ct-1", period: monthsAgo(1), units: 688, unit_label: "horas equipo", amount: 86200000, currency: "ARS", status: "presentada", submitted_at: subDays(11), approved_at: null, observation: null, invoice_id: null },
  { id: "ce-3", contract_id: "ct-1", period: monthsAgo(2), units: 654, unit_label: "horas equipo", amount: 81900000, currency: "ARS", status: "facturada", submitted_at: subDays(42), approved_at: subDays(35), observation: null, invoice_id: "i-1" },
  { id: "ce-4", contract_id: "ct-2", period: monthsAgo(0), units: 184, unit_label: "viajes", amount: 62560000, currency: "ARS", status: "borrador", submitted_at: null, approved_at: null, observation: null, invoice_id: null },
  { id: "ce-5", contract_id: "ct-2", period: monthsAgo(1), units: 201, unit_label: "viajes", amount: 68340000, currency: "ARS", status: "observada", submitted_at: subDays(14), approved_at: null, observation: "El cliente observa 7 viajes sin remito conformado en origen. Hay que adjuntar los partes firmados.", invoice_id: null },
  { id: "ce-6", contract_id: "ct-3", period: monthsAgo(0), units: 342, unit_label: "toneladas", amount: 41040000, currency: "ARS", status: "presentada", submitted_at: subDays(6), approved_at: null, observation: null, invoice_id: null },
  { id: "ce-7", contract_id: "ct-3", period: monthsAgo(1), units: 388, unit_label: "toneladas", amount: 46560000, currency: "ARS", status: "aprobada", submitted_at: subDays(38), approved_at: subDays(24), observation: null, invoice_id: null },
  { id: "ce-8", contract_id: "ct-5", period: monthsAgo(0), units: 96, unit_label: "días equipo", amount: 15800000, currency: "ARS", status: "presentada", submitted_at: subDays(4), approved_at: null, observation: null, invoice_id: null },
  { id: "ce-9", contract_id: "ct-4", period: monthsAgo(1), units: 240, unit_label: "horas equipo", amount: 32600000, currency: "ARS", status: "facturada", submitted_at: subDays(46), approved_at: subDays(40), observation: null, invoice_id: "i-3" },
];

/* ── Comercial ──────────────────────────────────────────────────────────── */

export const quotes: Quote[] = [
  { id: "q-1", client_id: "c-4", contract_id: "ct-6", title: "Alquiler de equipos con operador — Área Demo Oeste", tender_number: "LIC-DEMO-018", total_amount: 132000000, currency: "ARS", status: "sent", sent_at: subDays(9), valid_until: addDays(11), pdf_filename: "cotizacion-demo-01.pdf" },
  { id: "q-2", client_id: "c-1", contract_id: "ct-1", title: "Alquiler de equipos con operador — Área Demo Norte", tender_number: "LIC-DEMO-204", total_amount: 486000000, currency: "ARS", status: "accepted", sent_at: subDays(240), valid_until: subDays(210), pdf_filename: "cotizacion-demo-02.pdf" },
  { id: "q-3", client_id: "c-3", contract_id: null, title: "Ampliación de capacidad de tratamiento", tender_number: "LIC-DEMO-031", total_amount: 88400000, currency: "ARS", status: "draft", sent_at: null, valid_until: null, pdf_filename: null },
  { id: "q-4", client_id: "c-2", contract_id: null, title: "Incorporación de tercer camión cisterna", tender_number: null, total_amount: 54800000, currency: "ARS", status: "sent", sent_at: subDays(5), valid_until: addDays(25), pdf_filename: "cotizacion-demo-03.pdf" },
  { id: "q-5", client_id: "c-1", contract_id: null, title: "Movimiento de suelos — cuatro locaciones adicionales", tender_number: "LIC-DEMO-009", total_amount: 214000000, currency: "ARS", status: "rejected", sent_at: subDays(75), valid_until: subDays(45), pdf_filename: "cotizacion-demo-04.pdf" },
  { id: "q-6", client_id: "c-5", contract_id: "ct-5", title: "Mantenimiento de instalaciones — Área Demo Oeste", tender_number: null, total_amount: 94500000, currency: "ARS", status: "accepted", sent_at: subDays(100), valid_until: subDays(80), pdf_filename: "cotizacion-demo-05.pdf" },
  { id: "q-7", client_id: "c-3", contract_id: null, title: "Retiro de pasivo ambiental histórico", tender_number: "LIC-DEMO-188", total_amount: 47300000, currency: "ARS", status: "expired", sent_at: subDays(140), valid_until: subDays(110), pdf_filename: "cotizacion-demo-06.pdf" },
];

export const invoices: Invoice[] = [
  { id: "i-1", client_id: "c-1", contract_id: "ct-1", certification_id: "ce-3", invoice_number: "FAC-DEMO-000142", issue_date: subDays(34), due_date: subDays(4), total_amount: 81900000, currency: "ARS", status: "overdue", payment_date: null, payment_method: null, pdf_filename: "factura-demo-01.pdf" },
  { id: "i-2", client_id: "c-2", contract_id: "ct-2", certification_id: null, invoice_number: "FAC-DEMO-000151", issue_date: subDays(12), due_date: addDays(48), total_amount: 71200000, currency: "ARS", status: "issued", payment_date: null, payment_method: null, pdf_filename: "factura-demo-02.pdf" },
  { id: "i-3", client_id: "c-1", contract_id: "ct-4", certification_id: "ce-9", invoice_number: "FAC-DEMO-000138", issue_date: subDays(39), due_date: addDays(6), total_amount: 32600000, currency: "ARS", status: "issued", payment_date: null, payment_method: null, pdf_filename: "factura-demo-03.pdf" },
  { id: "i-4", client_id: "c-3", contract_id: "ct-3", certification_id: null, invoice_number: "FAC-DEMO-000120", issue_date: subDays(66), due_date: subDays(36), total_amount: 44100000, currency: "ARS", status: "paid", payment_date: subDays(30), payment_method: "Transferencia", pdf_filename: "factura-demo-04.pdf" },
  { id: "i-5", client_id: "c-1", contract_id: "ct-1", certification_id: null, invoice_number: "FAC-DEMO-000099", issue_date: subDays(95), due_date: subDays(50), total_amount: 79300000, currency: "ARS", status: "paid", payment_date: subDays(47), payment_method: "Transferencia", pdf_filename: "factura-demo-05.pdf" },
  { id: "i-6", client_id: "c-2", contract_id: "ct-2", certification_id: null, invoice_number: "FAC-DEMO-000105", issue_date: subDays(88), due_date: subDays(28), total_amount: 64900000, currency: "ARS", status: "paid", payment_date: subDays(26), payment_method: "Transferencia", pdf_filename: "factura-demo-06.pdf" },
  { id: "i-7", client_id: "c-5", contract_id: "ct-5", certification_id: null, invoice_number: "FAC-DEMO-000155", issue_date: subDays(3), due_date: addDays(27), total_amount: 15800000, currency: "ARS", status: "draft", payment_date: null, payment_method: null, pdf_filename: null },
  { id: "i-8", client_id: "c-3", contract_id: "ct-3", certification_id: null, invoice_number: "FAC-DEMO-000144", issue_date: subDays(28), due_date: subDays(2), total_amount: 38700000, currency: "ARS", status: "overdue", payment_date: null, payment_method: null, pdf_filename: "factura-demo-07.pdf" },
  { id: "i-9", client_id: "c-1", contract_id: "ct-4", certification_id: null, invoice_number: "FAC-DEMO-000080", issue_date: subDays(120), due_date: subDays(75), total_amount: 58200000, currency: "ARS", status: "paid", payment_date: subDays(70), payment_method: "Transferencia", pdf_filename: "factura-demo-08.pdf" },
];

/* ── HSE ────────────────────────────────────────────────────────────────── */

export const incidents: Incident[] = [
  { id: "in-1", contract_id: "ct-3", equipment_id: "eq-8", person_id: null, occurred_at: subDays(9), kind: "derrame", severity: "grave", title: "Derrame de 400 l en carga de cisterna", description: "Falla en el acople de descarga durante la carga en pileta 2. Se afectaron aproximadamente 12 m² de suelo.", status: "en_investigacion", lost_days: 0, corrective_action: "Recambio de acoples en toda la flota de residuos y refuerzo del procedimiento de carga." },
  { id: "in-2", contract_id: "ct-1", equipment_id: "eq-1", person_id: "u-5", occurred_at: subDays(26), kind: "casi_incidente", severity: "moderado", title: "Carga oscilante durante izaje", description: "Ráfaga de viento superior a la prevista generó oscilación de la carga. Se abortó la maniobra sin consecuencias.", status: "cerrado", lost_days: 0, corrective_action: "Se incorporó anemómetro en locación y límite operativo de 45 km/h." },
  { id: "in-3", contract_id: "ct-2", equipment_id: "eq-7", person_id: "u-8", occurred_at: subDays(48), kind: "incidente", severity: "moderado", title: "Despiste en acceso a batería 7", description: "Pérdida de adherencia en camino de ripio tras lluvia. Sin lesiones, daños menores en el paragolpes.", status: "cerrado", lost_days: 0, corrective_action: "Restricción de circulación con lluvia y capacitación de manejo en ripio." },
  { id: "in-4", contract_id: "ct-1", equipment_id: null, person_id: "u-2", occurred_at: subDays(72), kind: "incidente", severity: "leve", title: "Lesión en mano por manipulación de eslinga", description: "Corte superficial al manipular eslinga desgastada. Atención en enfermería de locación.", status: "cerrado", lost_days: 2, corrective_action: "Descarte de eslingas fuera de norma y control quincenal de elementos de izaje." },
  { id: "in-5", contract_id: "ct-3", equipment_id: null, person_id: null, occurred_at: subDays(4), kind: "observacion", severity: "leve", title: "EPP incompleto en cuadrilla de retiro", description: "Dos operarios sin protección facial durante la carga de lodos.", status: "abierto", lost_days: 0, corrective_action: null },
  { id: "in-6", contract_id: "ct-5", equipment_id: "eq-11", person_id: null, occurred_at: subDays(17), kind: "casi_incidente", severity: "moderado", title: "Sobrecalentamiento de grupo electrógeno", description: "Alarma de temperatura por obstrucción del radiador. Se detuvo el equipo antes de daño mayor.", status: "cerrado", lost_days: 0, corrective_action: "Limpieza semanal de radiadores incorporada al plan preventivo." },
];

export const inspections: Inspection[] = [
  { id: "is-1", contract_id: "ct-1", performed_at: subDays(12), performed_by: "u-4", title: "Inspección de elementos de izaje", result: "conforme", open_findings: 0 },
  { id: "is-2", contract_id: "ct-3", performed_at: subDays(7), performed_by: "u-4", title: "Auditoría ambiental del cliente", result: "no_conforme", open_findings: 2 },
  { id: "is-3", contract_id: "ct-2", performed_at: subDays(21), performed_by: "u-4", title: "Control de habilitaciones de choferes", result: "observaciones", open_findings: 1 },
  { id: "is-4", contract_id: "ct-5", performed_at: subDays(30), performed_by: "u-4", title: "Inspección de orden y limpieza", result: "conforme", open_findings: 0 },
  { id: "is-5", contract_id: "ct-1", performed_at: subDays(45), performed_by: "u-4", title: "Simulacro de emergencia en locación", result: "observaciones", open_findings: 1 },
];

/** Días transcurridos desde el último incidente con jornadas perdidas. */
export const DAYS_WITHOUT_LTI = 72;

/* ── Residuos ───────────────────────────────────────────────────────────── */

export const wasteManifests: WasteManifest[] = [
  { id: "wm-1", contract_id: "ct-3", client_id: "c-3", manifest_number: "MAN-DEMO-0411", waste_kind: "lodos_perforacion", quantity_tn: 48, origin: "Área Demo Centro", transport_equipment_id: "eq-8", treatment_plant: "Planta de Tratamiento Demo", dispatched_at: subDays(2), received_at: subDays(1), disposal_certificate_at: null, status: "recibido" },
  { id: "wm-2", contract_id: "ct-3", client_id: "c-3", manifest_number: "MAN-DEMO-0408", waste_kind: "aceites_usados", quantity_tn: 6.4, origin: "Área Demo Centro", transport_equipment_id: "eq-8", treatment_plant: "Planta de Tratamiento Demo", dispatched_at: subDays(11), received_at: subDays(10), disposal_certificate_at: null, status: "tratado" },
  { id: "wm-3", contract_id: "ct-3", client_id: "c-3", manifest_number: "MAN-DEMO-0395", waste_kind: "suelo_contaminado", quantity_tn: 92, origin: "Área Demo Centro", transport_equipment_id: "eq-8", treatment_plant: "Planta de Tratamiento Demo", dispatched_at: subDays(26), received_at: subDays(25), disposal_certificate_at: subDays(12), status: "cerrado" },
  { id: "wm-4", contract_id: "ct-3", client_id: "c-3", manifest_number: "MAN-DEMO-0418", waste_kind: "lodos_perforacion", quantity_tn: 36, origin: "Área Demo Centro", transport_equipment_id: "eq-8", treatment_plant: "Planta de Tratamiento Demo", dispatched_at: iso(), received_at: null, disposal_certificate_at: null, status: "en_transito" },
  { id: "wm-5", contract_id: "ct-3", client_id: "c-3", manifest_number: "MAN-DEMO-0371", waste_kind: "trapos_epp", quantity_tn: 1.8, origin: "Área Demo Centro", transport_equipment_id: "eq-8", treatment_plant: "Planta de Tratamiento Demo", dispatched_at: subDays(54), received_at: subDays(53), disposal_certificate_at: subDays(40), status: "cerrado" },
  { id: "wm-6", contract_id: "ct-3", client_id: "c-3", manifest_number: "MAN-DEMO-0384", waste_kind: "chatarra_contaminada", quantity_tn: 14.2, origin: "Área Demo Centro", transport_equipment_id: "eq-8", treatment_plant: "Planta de Tratamiento Demo", dispatched_at: subDays(38), received_at: subDays(37), disposal_certificate_at: null, status: "tratado" },
  { id: "wm-7", contract_id: "ct-2", client_id: "c-2", manifest_number: "MAN-DEMO-0402", waste_kind: "agua_produccion", quantity_tn: 210, origin: "Área Demo Sur", transport_equipment_id: "eq-6", treatment_plant: "Planta de Tratamiento Demo", dispatched_at: subDays(16), received_at: subDays(16), disposal_certificate_at: subDays(6), status: "cerrado" },
  { id: "wm-8", contract_id: "ct-3", client_id: "c-3", manifest_number: "MAN-DEMO-0420", waste_kind: "suelo_contaminado", quantity_tn: 24, origin: "Área Demo Centro", transport_equipment_id: null, treatment_plant: "Planta de Tratamiento Demo", dispatched_at: iso(), received_at: null, disposal_certificate_at: null, status: "emitido" },
];

/* ── Notificaciones ─────────────────────────────────────────────────────── */

export const notifications: AppNotification[] = [
  { id: "n-1", kind: "certificate_expiring", title: "RUTA vence mañana — CT-23", body: "El camión de residuos queda sin habilitación para circular a partir de mañana.", link: crmPath("habilitaciones"), is_read: false, created_at: iso() },
  { id: "n-2", kind: "certificate_expiring", title: "Licencia por vencer — Chofer Demo Uno", body: "Vence en 4 días. Sin renovarla no puede salir a ruta.", link: crmPath("habilitaciones"), is_read: false, created_at: iso() },
  { id: "n-3", kind: "certification_pending", title: "Certificación observada — Operadora Demo Sur", body: "Devuelta por 7 viajes sin remito conformado. $68.340.000 trabados.", link: crmPath("certificaciones"), is_read: false, created_at: subDays(1) },
  { id: "n-4", kind: "invoice_overdue", title: "Factura vencida — Operadora Demo Norte", body: "FAC-DEMO-000142 venció hace 4 días ($81.900.000).", link: crmPath("facturacion"), is_read: false, created_at: subDays(1) },
  { id: "n-5", kind: "service_due", title: "Service próximo — GR-04", body: "Faltan 80 h para el service de 8.500 h de la grúa.", link: crmPath("mantenimiento"), is_read: true, created_at: subDays(2) },
  { id: "n-6", kind: "incident_open", title: "Derrame en investigación — Área Demo Centro", body: "El cliente pide el informe de causa raíz antes del viernes.", link: crmPath("hse"), is_read: true, created_at: subDays(3) },
  { id: "n-7", kind: "manifest_open", title: "3 manifiestos sin certificado de disposición", body: "La responsabilidad ambiental sigue siendo del generador hasta cerrarlos.", link: crmPath("residuos"), is_read: true, created_at: subDays(3) },
];

/**
 * Certificado vs. cobrado por mes. La brecha entre las dos curvas es el capital
 * de trabajo inmovilizado: trabajo hecho y aprobado que todavía no entró.
 */
export const revenueByMonth = [
  { month: "Mes 1", certificado: 168000000, cobrado: 142000000 },
  { month: "Mes 2", certificado: 174500000, cobrado: 151000000 },
  { month: "Mes 3", certificado: 192300000, cobrado: 160400000 },
  { month: "Mes 4", certificado: 186700000, cobrado: 171200000 },
  { month: "Mes 5", certificado: 201200000, cobrado: 164800000 },
  { month: "Mes 6", certificado: 197800000, cobrado: 158900000 },
];

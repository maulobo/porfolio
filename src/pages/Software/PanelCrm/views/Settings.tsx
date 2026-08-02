import { FlaskConical } from "lucide-react";
import { WORKSPACE } from "../data/mock";
import {
  BentoCard,
  BentoGrid,
  Chip,
  Divider,
  Note,
  PageHeader,
  SectionTitle,
} from "../ui/primitives";

/** Capacidades del producto: lo que ya se recorre acá y lo que se suma al implementarlo. */
const MODULES = [
  { name: "Contratos y órdenes de trabajo", detail: "Contratos por yacimiento, tablero de OT y programación por quincena.", state: "demo" },
  { name: "Flota y equipos", detail: "Ficha de cada activo con horómetro, ubicación, tarifa y disponibilidad.", state: "demo" },
  { name: "Habilitaciones y vencimientos", detail: "VTV, seguros, RUTA, aptos médicos y cursos, con semáforo de vencimiento.", state: "demo" },
  { name: "Mantenimiento", detail: "Preventivo disparado por horómetro o kilometraje, correctivos e historial.", state: "demo" },
  { name: "Certificaciones", detail: "Ciclo parte diario → certificado del cliente → factura, con observaciones.", state: "demo" },
  { name: "HSE / Seguridad", detail: "Incidentes, casi incidentes, derrames, inspecciones y días sin accidentes.", state: "demo" },
  { name: "Residuos", detail: "Manifiestos con trazabilidad hasta el certificado de disposición final.", state: "demo" },
  { name: "Comercial y cobranza", detail: "Cotizaciones, licitaciones, facturación y seguimiento de cobranza.", state: "demo" },
  { name: "Partes diarios desde el campo", detail: "Carga en el celular del supervisor, con firma del cliente y foto, aun sin señal.", state: "real" },
  { name: "Usuarios y permisos por rol", detail: "Cada rol ve sólo lo suyo: el chofer su OT, administración la cobranza.", state: "real" },
  { name: "Avisos automáticos", detail: "Email y WhatsApp ante vencimientos, services y certificados observados.", state: "real" },
  { name: "Reportes exportables", detail: "Descarga a planilla y PDF de certificaciones, horas equipo y costos de flota.", state: "real" },
  { name: "Integración contable", detail: "Emisión de comprobantes y conciliación con el sistema de facturación.", state: "real" },
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-[var(--crm-text-dim)]">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

export default function Settings() {
  return (
    <>
      <PageHeader title="Ajustes" subtitle="Configuración del espacio de trabajo" />

      <Note icon={<FlaskConical size={16} />}>
        Estás viendo una <strong>muestra</strong> de un sistema de gestión para servicios a
        yacimiento. La empresa, los clientes, los equipos y los montos son ficticios, y todo vive en
        el navegador: no hay base de datos, ni login, ni información real. Al contratar el
        desarrollo, el sistema se entrega conectado a su propio backend y adaptado a los procesos y
        la nomenclatura de tu operación.
      </Note>

      <BentoGrid>
        <BentoCard span={5}>
          <SectionTitle>Espacio de trabajo</SectionTitle>
          <div className="mt-3 flex flex-col gap-2.5">
            <Row label="Razón social" value={WORKSPACE.legal_name} />
            <Row label="Actividad" value="Servicios a yacimiento" />
            <Row label="Moneda" value="Peso argentino (ARS)" />
            <Row label="Zona horaria" value="America/Argentina/Buenos_Aires" />
            <Row label="Bases operativas" value="Añelo · Neuquén · Comodoro Rivadavia" />
          </div>

          <Divider className="my-4" />

          <SectionTitle>Parámetros de alerta</SectionTitle>
          <div className="mt-3 flex flex-col gap-2.5">
            <Row label="Aviso de habilitaciones" value="30 días antes" />
            <Row label="Aviso de service" value="100 h / 5.000 km antes" />
            <Row label="Manifiesto abierto" value="alerta a los 30 días" />
          </div>

          <Divider className="my-4" />

          <SectionTitle>Estado de la demo</SectionTitle>
          <div className="mt-3 flex flex-col gap-2.5">
            <Row label="Origen de datos" value="Ficticios, en memoria" />
            <Row label="Autenticación" value="Sin login (acceso abierto)" />
            <Row label="Persistencia" value="Ninguna: se reinicia al recargar" />
          </div>
        </BentoCard>

        <BentoCard span={7}>
          <SectionTitle>Módulos del sistema</SectionTitle>
          <ul className="mt-3 flex flex-col gap-3">
            {MODULES.map((m) => (
              <li key={m.name} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{m.name}</p>
                  <p className="text-xs text-[var(--crm-text-dim)]">{m.detail}</p>
                </div>
                <Chip tone={m.state === "demo" ? "success" : "info"}>
                  {m.state === "demo" ? "En la muestra" : "En el producto"}
                </Chip>
              </li>
            ))}
          </ul>
        </BentoCard>
      </BentoGrid>
    </>
  );
}

import { Link, Outlet, useParams } from "react-router";
import { MapPin } from "lucide-react";
import { CONTRACT_STATUS_LABEL, SERVICE_LINE_LABEL } from "../data/labels";
import { clientName, getContract } from "../data/selectors";
import { crmPath } from "../lib/routes";
import { BentoCard, Chip, ColorDot, EmptyState, PageHeader, StatusChip } from "../ui/primitives";
import { LinkTabs } from "../ui/Tabs";

const TABS = [
  { segment: "", label: "Resumen", end: true },
  { segment: "ordenes", label: "Órdenes de trabajo" },
  { segment: "programacion", label: "Programación" },
  { segment: "equipos", label: "Equipos" },
  { segment: "certificaciones", label: "Certificaciones" },
  { segment: "hse", label: "HSE" },
  { segment: "cotizaciones", label: "Cotizaciones" },
  { segment: "facturas", label: "Facturas" },
];

/** Encabezado + tabs del detalle de contrato. Cada tab es una subruta enlazable. */
export default function ContractShell() {
  const { contractId = "" } = useParams();
  const contract = getContract(contractId);

  if (!contract) {
    return (
      <>
        <PageHeader title="Contrato no encontrado" />
        <BentoCard span={12}>
          <EmptyState
            title="Ese contrato no existe en los datos de muestra."
            action={
              <Link to={crmPath("contratos")} className="font-semibold" style={{ color: "var(--crm-accent)" }}>
                Volver a Contratos
              </Link>
            }
          />
        </BentoCard>
      </>
    );
  }

  const base = crmPath(`contratos/${contractId}`);

  return (
    <>
      <div className="mb-4">
        <Link
          to={crmPath("contratos")}
          className="text-xs font-semibold text-[var(--crm-text-dim)] transition-colors hover:text-[var(--crm-text)]"
        >
          ← Contratos
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-2.5">
          <ColorDot color={contract.health} title={`Salud del contrato: ${contract.health}`} />
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{contract.name}</h1>
          <span className="font-mono text-xs text-[var(--crm-text-dim)]">{contract.code}</span>
          <StatusChip value={contract.status} label={CONTRACT_STATUS_LABEL[contract.status]} />
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-[var(--crm-text-dim)]">
          <Link
            to={crmPath(`clientes/${contract.client_id}`)}
            className="transition-colors hover:text-[var(--crm-accent)]"
          >
            {clientName(contract.client_id)}
          </Link>
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} />
            {contract.field}
          </span>
          <Chip>{SERVICE_LINE_LABEL[contract.service_line]}</Chip>
        </div>
      </div>

      <LinkTabs
        items={TABS.map((t) => ({
          to: t.segment ? `${base}/${t.segment}` : base,
          label: t.label,
          end: t.end,
        }))}
      />

      {/* Cada tab lee `contractId` con useParams desde su propia ruta. */}
      <Outlet />
    </>
  );
}

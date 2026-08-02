import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { clients } from "../data/mock";
import { CLIENT_KIND_LABEL, CLIENT_STATUS_LABEL } from "../data/labels";
import { contractsOfClient, invoicesOf } from "../data/selectors";
import type { Client, ClientStatus } from "../data/types";
import { fmtMoney } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  BentoCard,
  BentoGrid,
  Button,
  Chip,
  Field,
  Input,
  Kpi,
  PageHeader,
  Select,
  StatusChip,
} from "../ui/primitives";
import { DataTable, type Column } from "../ui/DataTable";

const columns: Column<Client>[] = [
  {
    key: "name",
    header: "Cliente",
    sortValue: (c) => c.fantasy_name,
    cell: (c) => (
      <div className="min-w-0">
        <p className="truncate font-semibold">{c.fantasy_name}</p>
        <p className="truncate text-xs text-[var(--crm-text-dim)]">
          {c.legal_name} · {c.tax_id}
        </p>
      </div>
    ),
  },
  {
    key: "kind",
    header: "Tipo",
    sortValue: (c) => c.kind,
    cell: (c) => <Chip>{CLIENT_KIND_LABEL[c.kind]}</Chip>,
    hideBelow: "md",
  },
  { key: "basin", header: "Cuenca", sortValue: (c) => c.basin, cell: (c) => c.basin, hideBelow: "sm" },
  {
    key: "contracts",
    header: "Contratos",
    align: "right",
    sortValue: (c) => contractsOfClient(c.id).length,
    cell: (c) => {
      const list = contractsOfClient(c.id);
      const active = list.filter((x) => x.status === "activo").length;
      return (
        <div>
          <p className="text-sm font-semibold">{list.length}</p>
          <p className="text-xs text-[var(--crm-text-dim)]">{active} activos</p>
        </div>
      );
    },
    hideBelow: "lg",
  },
  {
    key: "status",
    header: "Estado",
    sortValue: (c) => c.status,
    cell: (c) => <StatusChip value={c.status} label={CLIENT_STATUS_LABEL[c.status]} />,
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | ClientStatus>("all");

  const filtered = useMemo(
    () =>
      clients.filter(
        (c) =>
          (status === "all" || c.status === status) &&
          (search === "" ||
            `${c.fantasy_name} ${c.legal_name} ${c.basin}`
              .toLowerCase()
              .includes(search.toLowerCase())),
      ),
    [search, status],
  );

  const active = clients.filter((c) => c.status === "active");
  /** Facturado histórico sobre toda la cartera, para dimensionar cada cuenta. */
  const billed = clients.reduce(
    (a, c) => a + invoicesOf({ clientId: c.id }).reduce((x, i) => x + i.total_amount, 0),
    0,
  );

  return (
    <>
      <PageHeader
        title="Clientes"
        subtitle="Operadoras y contratistas de la cartera"
        actions={
          <Button disabled title="En la demo el alta está deshabilitada: no hay backend detrás.">
            <Plus size={16} />
            Nuevo cliente
          </Button>
        }
      />

      <BentoGrid>
        <BentoCard span={4}>
          <Kpi label="Clientes activos" value={active.length} hint={`${clients.length} en la cartera`} />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi
            label="Operadoras"
            value={clients.filter((c) => c.kind === "operadora").length}
            hint={`${clients.filter((c) => c.kind === "contratista").length} contratistas`}
          />
        </BentoCard>
        <BentoCard span={4}>
          <Kpi label="Facturado histórico" value={fmtMoney(billed)} hint="toda la cartera" />
        </BentoCard>

        <BentoCard span={12}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <Field label="Buscar">
              <Input
                type="search"
                placeholder="Nombre o cuenca…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sm:w-56"
              />
            </Field>
            <Field label="Estado">
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as typeof status)}
                className="sm:w-44"
              >
                <option value="all">Todos</option>
                {(Object.keys(CLIENT_STATUS_LABEL) as ClientStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {CLIENT_STATUS_LABEL[s]}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <DataTable
            columns={columns}
            data={filtered}
            emptyMessage="No hay clientes con esos filtros."
            onRowClick={(c) => navigate(crmPath(`clientes/${c.id}`))}
          />
        </BentoCard>
      </BentoGrid>
    </>
  );
}

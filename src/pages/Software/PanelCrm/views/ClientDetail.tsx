import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import { MapPin } from "lucide-react";
import {
  CERTIFICATION_STATUS_LABEL,
  CLIENT_KIND_LABEL,
  CLIENT_STATUS_LABEL,
  CONTRACT_STATUS_LABEL,
  INVOICE_STATUS_LABEL,
  MANIFEST_STATUS_LABEL,
  QUOTE_STATUS_LABEL,
  SERVICE_LINE_LABEL,
} from "../data/labels";
import {
  billingOfClient,
  certificationsOfContract,
  contactsOfClient,
  contractsOfClient,
  getClient,
  invoicesOf,
  quotesOf,
} from "../data/selectors";
import { wasteManifests } from "../data/mock";
import { fmtDate, fmtMoney } from "../lib/format";
import { crmPath } from "../lib/routes";
import {
  BentoCard,
  BentoGrid,
  Chip,
  ColorDot,
  Divider,
  EmptyState,
  PageHeader,
  SectionTitle,
  StatusChip,
} from "../ui/primitives";
import { Tabs } from "../ui/Tabs";

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <SectionTitle>{label}</SectionTitle>
      <div className="text-sm">{value || "—"}</div>
    </div>
  );
}

type TabKey =
  | "datos"
  | "contactos"
  | "facturacion"
  | "contratos"
  | "certificaciones"
  | "cotizaciones"
  | "comprobantes"
  | "residuos";

export default function ClientDetail() {
  const { clientId = "" } = useParams();
  const [tab, setTab] = useState<TabKey>("datos");

  const client = getClient(clientId);
  if (!client) {
    return (
      <>
        <PageHeader title="Cliente no encontrado" />
        <BentoCard span={12}>
          <EmptyState
            title="Ese cliente no existe en los datos de muestra."
            action={
              <Link to={crmPath("clientes")} className="font-semibold" style={{ color: "var(--crm-accent)" }}>
                Volver a Clientes
              </Link>
            }
          />
        </BentoCard>
      </>
    );
  }

  const contacts = contactsOfClient(clientId);
  const billing = billingOfClient(clientId);
  const clientContracts = contractsOfClient(clientId);
  const clientQuotes = quotesOf({ clientId });
  const clientInvoices = invoicesOf({ clientId });
  const clientCerts = clientContracts.flatMap((c) => certificationsOfContract(c.id));
  const clientManifests = wasteManifests.filter((m) => m.client_id === clientId);

  return (
    <>
      <PageHeader
        title={client.fantasy_name}
        subtitle={`${client.legal_name} · ${client.basin}`}
        actions={
          <div className="flex items-center gap-2">
            <Chip>{CLIENT_KIND_LABEL[client.kind]}</Chip>
            <StatusChip value={client.status} label={CLIENT_STATUS_LABEL[client.status]} />
          </div>
        }
      />

      <Tabs<TabKey>
        value={tab}
        onChange={setTab}
        items={[
          { value: "datos", label: "Datos" },
          { value: "contactos", label: `Contactos (${contacts.length})` },
          { value: "facturacion", label: "Condiciones" },
          { value: "contratos", label: `Contratos (${clientContracts.length})` },
          { value: "certificaciones", label: `Certificaciones (${clientCerts.length})` },
          { value: "cotizaciones", label: `Cotizaciones (${clientQuotes.length})` },
          { value: "comprobantes", label: `Comprobantes (${clientInvoices.length})` },
          ...(clientManifests.length
            ? [{ value: "residuos" as TabKey, label: `Residuos (${clientManifests.length})` }]
            : []),
        ]}
      />

      {tab === "datos" && (
        <BentoGrid>
          <BentoCard span={7}>
            <div className="flex flex-col gap-5">
              <Field label="Razón social" value={client.legal_name} />
              <Field label="CUIT" value={client.tax_id} />
              <Field label="Tipo" value={CLIENT_KIND_LABEL[client.kind]} />
              <Field label="Cuenca" value={client.basin} />
              <Field
                label="Sitio web"
                value={
                  client.website ? (
                    <span className="underline" style={{ color: "var(--crm-accent)" }}>
                      {client.website}
                    </span>
                  ) : null
                }
              />
              <Field label="Cliente desde" value={fmtDate(client.created_at)} />
            </div>
          </BentoCard>
          <BentoCard span={5}>
            <Field label="Notas internas" value={client.notes} />
          </BentoCard>
        </BentoGrid>
      )}

      {tab === "contactos" && (
        <BentoGrid>
          {contacts.map((c) => (
            <BentoCard key={c.id} span={4}>
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-base font-bold">{c.full_name}</p>
                {c.is_primary && <StatusChip value="active" label="Principal" />}
              </div>
              <p className="mt-0.5 text-sm text-[var(--crm-text-dim)]">{c.position}</p>
              <Divider className="my-3" />
              <p className="truncate text-sm">{c.email}</p>
              <p className="text-sm">{c.phone}</p>
            </BentoCard>
          ))}
          {!contacts.length && (
            <BentoCard span={12}>
              <EmptyState title="Sin contactos cargados." />
            </BentoCard>
          )}
        </BentoGrid>
      )}

      {tab === "facturacion" && (
        <BentoGrid>
          <BentoCard span={6}>
            {billing ? (
              <div className="flex flex-col gap-5">
                <Field label="Email de facturación" value={billing.billing_email} />
                <Field label="Dirección" value={billing.billing_address} />
                <Field label="Condición fiscal" value={billing.tax_condition} />
                <Field
                  label="Plazo de pago"
                  value={`${billing.payment_terms_days} días desde la aprobación del certificado`}
                />
                <Field label="Método de pago habitual" value={billing.payment_method} />
              </div>
            ) : (
              <EmptyState title="Sin condiciones comerciales cargadas." />
            )}
          </BentoCard>
        </BentoGrid>
      )}

      {tab === "contratos" && (
        <BentoGrid>
          {clientContracts.map((c) => (
            <BentoCard key={c.id} span={6} padded={false}>
              <Link
                to={crmPath(`contratos/${c.id}`)}
                className="flex flex-col gap-1.5 p-5 transition-opacity hover:opacity-80"
              >
                <span className="flex items-center gap-2">
                  <ColorDot color={c.health} />
                  <span className="min-w-0 flex-1 truncate text-base font-bold">{c.name}</span>
                  <StatusChip value={c.status} label={CONTRACT_STATUS_LABEL[c.status]} />
                </span>
                <span className="flex flex-wrap items-center gap-x-2 text-xs text-[var(--crm-text-dim)]">
                  <span className="font-mono">{c.code}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={11} />
                    {c.field}
                  </span>
                  <span>· {SERVICE_LINE_LABEL[c.service_line]}</span>
                </span>
                <span className="text-sm font-semibold">
                  {fmtMoney(c.contract_amount, c.currency)}
                </span>
              </Link>
            </BentoCard>
          ))}
          {!clientContracts.length && (
            <BentoCard span={12}>
              <EmptyState title="Este cliente todavía no tiene contratos." />
            </BentoCard>
          )}
        </BentoGrid>
      )}

      {tab === "certificaciones" && (
        <BentoGrid>
          <BentoCard span={12}>
            {clientCerts.length ? (
              <ul className="flex flex-col">
                {clientCerts.map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-wrap items-center gap-2 border-b py-3 first:pt-0 last:border-b-0"
                    style={{ borderColor: "var(--crm-border)" }}
                  >
                    <span className="font-mono text-sm font-semibold">{c.period}</span>
                    <span className="min-w-0 flex-1 text-xs text-[var(--crm-text-dim)]">
                      {c.units.toLocaleString("es-AR")} {c.unit_label}
                    </span>
                    <span className="text-sm font-semibold">{fmtMoney(c.amount, c.currency)}</span>
                    <StatusChip value={c.status} label={CERTIFICATION_STATUS_LABEL[c.status]} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="Sin certificaciones para este cliente." />
            )}
          </BentoCard>
        </BentoGrid>
      )}

      {tab === "cotizaciones" && (
        <BentoGrid>
          {clientQuotes.map((q) => (
            <BentoCard key={q.id} span={6}>
              <div className="flex items-center justify-between gap-2">
                <p className="min-w-0 truncate text-base font-bold">{q.title}</p>
                <StatusChip value={q.status} label={QUOTE_STATUS_LABEL[q.status]} />
              </div>
              <p className="mt-1 text-sm text-[var(--crm-text-dim)]">
                {fmtMoney(q.total_amount, q.currency)} ·{" "}
                {q.sent_at ? `enviada ${fmtDate(q.sent_at)}` : "sin enviar"}
              </p>
              {q.tender_number && (
                <p className="mt-1 font-mono text-xs text-[var(--crm-text-faint)]">
                  {q.tender_number}
                </p>
              )}
            </BentoCard>
          ))}
          {!clientQuotes.length && (
            <BentoCard span={12}>
              <EmptyState title="Sin cotizaciones para este cliente." />
            </BentoCard>
          )}
        </BentoGrid>
      )}

      {tab === "comprobantes" && (
        <BentoGrid>
          {clientInvoices.map((i) => (
            <BentoCard key={i.id} span={6}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-sm font-bold">{i.invoice_number}</p>
                <StatusChip value={i.status} label={INVOICE_STATUS_LABEL[i.status]} />
              </div>
              <p className="mt-1 text-sm text-[var(--crm-text-dim)]">
                {fmtMoney(i.total_amount, i.currency)} · vence {fmtDate(i.due_date)}
              </p>
            </BentoCard>
          ))}
          {!clientInvoices.length && (
            <BentoCard span={12}>
              <EmptyState title="Sin comprobantes para este cliente." />
            </BentoCard>
          )}
        </BentoGrid>
      )}

      {tab === "residuos" && (
        <BentoGrid>
          <BentoCard span={12}>
            <ul className="flex flex-col">
              {clientManifests.map((m) => (
                <li
                  key={m.id}
                  className="flex flex-wrap items-center gap-2 border-b py-3 first:pt-0 last:border-b-0"
                  style={{ borderColor: "var(--crm-border)" }}
                >
                  <span className="font-mono text-xs font-bold">{m.manifest_number}</span>
                  <span className="min-w-0 flex-1 text-sm text-[var(--crm-text-dim)]">
                    {m.origin} · {m.quantity_tn} t
                  </span>
                  <span className="text-xs text-[var(--crm-text-dim)]">
                    {m.disposal_certificate_at
                      ? `cerrado ${fmtDate(m.disposal_certificate_at)}`
                      : "sin certificado"}
                  </span>
                  <StatusChip value={m.status} label={MANIFEST_STATUS_LABEL[m.status]} />
                </li>
              ))}
            </ul>
          </BentoCard>
        </BentoGrid>
      )}
    </>
  );
}

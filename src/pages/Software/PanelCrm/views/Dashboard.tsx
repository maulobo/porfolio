import { Link } from "react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertTriangle, FlaskConical, HardHat } from "lucide-react";
import {
  contracts,
  currentUser,
  DAYS_WITHOUT_LTI,
  equipment,
  incidents,
  invoices,
  revenueByMonth,
} from "../data/mock";
import {
  CERTIFICATE_KIND_LABEL,
  CERTIFICATION_STATUS_LABEL,
  EQUIPMENT_STATUS_LABEL,
  MANIFEST_STATUS_LABEL,
} from "../data/labels";
import {
  certificateSubjectName,
  contractName,
  expiringCertificates,
  observedCertifications,
  openManifests,
  pendingToInvoice,
  serviceUrgency,
} from "../data/selectors";
import { daysTo, deadlineColor, fmtDate, fmtMoney, relativeDays } from "../lib/format";
import { crmPath } from "../lib/routes";
import { CHART_COLORS, useCrmTheme } from "../lib/theme";
import {
  BentoCard,
  BentoGrid,
  ColorDot,
  Divider,
  EmptyState,
  Kpi,
  PageHeader,
  Progress,
  SectionTitle,
  StatusChip,
} from "../ui/primitives";

function RevenueChart() {
  const theme = useCrmTheme();
  const c = CHART_COLORS[theme];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={revenueByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="crm-grad-1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.series1} stopOpacity={0.35} />
            <stop offset="100%" stopColor={c.series1} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="crm-grad-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.series2} stopOpacity={0.3} />
            <stop offset="100%" stopColor={c.series2} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={c.grid} vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: c.axis }} />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={44}
          tick={{ fontSize: 11, fill: c.axis }}
          tickFormatter={(v: number) => `${Math.round(v / 1e6)}M`}
        />
        <Tooltip
          formatter={(value) => fmtMoney(Number(value))}
          contentStyle={{
            background: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: 12,
            color: c.text,
            fontSize: 13,
          }}
          labelStyle={{ color: c.text, fontWeight: 700 }}
          cursor={{ stroke: c.axis, strokeDasharray: "3 3" }}
        />
        <Area type="monotone" dataKey="certificado" name="Certificado" stroke={c.series1} fill="url(#crm-grad-1)" strokeWidth={2.5} />
        <Area type="monotone" dataKey="cobrado" name="Cobrado" stroke={c.series2} fill="url(#crm-grad-2)" strokeWidth={2.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function Dashboard() {
  const theme = useCrmTheme();
  const c = CHART_COLORS[theme];

  const activeContracts = contracts.filter((ct) => ct.status === "activo");
  const operating = equipment.filter((e) => e.status === "operativo");
  const outOfService = equipment.filter((e) => e.status === "fuera_servicio");
  const availability = Math.round(
    ((equipment.length - outOfService.length) / equipment.length) * 100,
  );

  const pending = pendingToInvoice();
  const pendingAmount = pending.reduce((a, x) => a + x.amount, 0);
  const observed = observedCertifications();

  const overdueInvoices = invoices.filter((i) => i.status === "overdue");
  const overdueAmount = overdueInvoices.reduce((a, i) => a + i.total_amount, 0);

  const expiring = expiringCertificates(30);
  const expired = expiring.filter((x) => (daysTo(x.expires_at) ?? 0) < 0);

  const servicesDue = equipment
    .filter((e) => serviceUrgency(e) !== "green")
    .sort((a, b) => a.next_service_meter - a.meter_value - (b.next_service_meter - b.meter_value));

  const openIncidents = incidents.filter((i) => i.status !== "cerrado");
  const manifests = openManifests();

  return (
    <>
      {/* Aviso principal: este panel es público, tiene que quedar claro de entrada. */}
      <div
        className="mb-5 flex flex-col gap-3 rounded-[var(--crm-radius)] border p-4 sm:flex-row sm:items-start"
        style={{
          borderColor: "color-mix(in srgb, var(--crm-warning) 45%, transparent)",
          background: "color-mix(in srgb, var(--crm-warning) 9%, transparent)",
        }}
      >
        <FlaskConical size={22} className="shrink-0" style={{ color: "var(--crm-warning)" }} />
        <div className="min-w-0">
          <p className="text-sm font-bold" style={{ color: "var(--crm-warning)" }}>
            Demostración — todos los datos de este panel son ficticios
          </p>
          <p className="mt-1 text-sm text-[var(--crm-text-dim)]">
            Las empresas, personas, equipos, importes y documentos que ves acá fueron inventados
            para este ejemplo: no existen y no corresponden a ningún cliente real. El objetivo es
            mostrar cómo funciona un sistema de gestión administrativa para una empresa de servicios
            a yacimiento. No hay base de datos ni información real detrás: podés recorrer todas las
            secciones libremente.
          </p>
        </div>
      </div>

      <PageHeader
        title={`Hola, ${currentUser.full_name.split(" ")[0]}`}
        subtitle="Estado de la operación, los activos y la cobranza."
      />

      <BentoGrid>
        {/* KPIs */}
        <BentoCard span={3}>
          <Kpi
            label="Contratos activos"
            value={activeContracts.length}
            hint={`${operating.length} equipos en yacimiento`}
          />
        </BentoCard>
        <BentoCard span={3} accent={expired.length > 0}>
          <Kpi
            label="Habilitaciones críticas"
            value={expiring.length}
            tone={expired.length ? "danger" : undefined}
            hint={expired.length ? `${expired.length} ya vencidas` : "vencen en 30 días"}
          />
        </BentoCard>
        <BentoCard span={3}>
          <Kpi
            label="Certificado sin facturar"
            value={fmtMoney(pendingAmount)}
            hint={`${pending.length} certificaciones`}
          />
        </BentoCard>
        <BentoCard span={3} accent={overdueInvoices.length > 0}>
          <Kpi
            label="Facturas vencidas"
            value={fmtMoney(overdueAmount)}
            tone={overdueInvoices.length ? "danger" : undefined}
            hint={`${overdueInvoices.length} comprobantes`}
          />
        </BentoCard>

        {/* Certificado vs cobrado */}
        <BentoCard span={8} className="min-h-[320px]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold">Certificado vs. cobrado</h2>
              <p className="text-xs text-[var(--crm-text-dim)]">
                La brecha es capital de trabajo inmovilizado.
              </p>
            </div>
            <div className="flex gap-3 text-xs text-[var(--crm-text-dim)]">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: c.series1 }} />
                Certificado
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: c.series2 }} />
                Cobrado
              </span>
            </div>
          </div>
          <div className="min-h-[230px] flex-1">
            <RevenueChart />
          </div>
        </BentoCard>

        {/* Vencimientos */}
        <BentoCard span={4} className="min-h-[320px]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-base font-bold">Vencimientos</h2>
            <Link to={crmPath("habilitaciones")} className="text-xs font-semibold" style={{ color: "var(--crm-accent)" }}>
              Ver todos
            </Link>
          </div>
          <div className="flex flex-col">
            {expiring.slice(0, 7).map((x) => {
              const d = daysTo(x.expires_at);
              return (
                <Link
                  key={x.id}
                  to={crmPath("habilitaciones")}
                  className="flex items-center gap-2.5 border-b py-2 transition-opacity first:pt-0 last:border-b-0 hover:opacity-75"
                  style={{ borderColor: "var(--crm-border)" }}
                >
                  <ColorDot color={deadlineColor(x.expires_at)} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {CERTIFICATE_KIND_LABEL[x.kind]}
                    </span>
                    <span className="block truncate text-xs text-[var(--crm-text-dim)]">
                      {certificateSubjectName(x)}
                    </span>
                  </span>
                  <span
                    className="shrink-0 text-xs font-medium"
                    style={{ color: (d ?? 0) <= 3 ? "var(--crm-danger)" : "var(--crm-text-dim)" }}
                  >
                    {(d ?? 0) < 0 ? "vencida" : relativeDays(d)}
                  </span>
                </Link>
              );
            })}
            {!expiring.length && <EmptyState title="Sin vencimientos en los próximos 30 días." />}
          </div>
        </BentoCard>

        {/* Flota */}
        <BentoCard span={5}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-base font-bold">Disponibilidad de flota</h2>
            <Link to={crmPath("flota")} className="text-xs font-semibold" style={{ color: "var(--crm-accent)" }}>
              Ver flota
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Progress value={availability} height={8} tone={availability < 85 ? "warning" : "success"} />
            <span className="shrink-0 text-sm font-bold">{availability}%</span>
          </div>
          <p className="mt-1.5 text-xs text-[var(--crm-text-dim)]">
            {equipment.length - outOfService.length} de {equipment.length} equipos disponibles ·{" "}
            {outOfService.length} fuera de servicio
          </p>

          <Divider className="my-4" />

          <SectionTitle>Services próximos</SectionTitle>
          <div className="mt-2 flex flex-col gap-2">
            {servicesDue.slice(0, 4).map((e) => {
              const remaining = e.next_service_meter - e.meter_value;
              const unit = e.meter_type === "horometro" ? "h" : "km";
              return (
                <Link
                  key={e.id}
                  to={crmPath(`flota/${e.id}`)}
                  className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-75"
                >
                  <ColorDot color={serviceUrgency(e)} />
                  <span className="font-mono text-xs font-bold">{e.internal_code}</span>
                  <span className="min-w-0 flex-1 truncate text-[var(--crm-text-dim)]">{e.name}</span>
                  <span
                    className="shrink-0 text-xs"
                    style={{ color: remaining <= 0 ? "var(--crm-danger)" : "var(--crm-text-dim)" }}
                  >
                    {remaining <= 0
                      ? `${Math.abs(remaining).toLocaleString("es-AR")} ${unit} pasado`
                      : `en ${remaining.toLocaleString("es-AR")} ${unit}`}
                  </span>
                </Link>
              );
            })}
            {!servicesDue.length && (
              <p className="text-sm text-[var(--crm-text-dim)]">Sin services próximos.</p>
            )}
          </div>
        </BentoCard>

        {/* Cobranza trabada */}
        <BentoCard span={7}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-base font-bold">Ciclo de certificación</h2>
            <Link
              to={crmPath("certificaciones")}
              className="text-xs font-semibold"
              style={{ color: "var(--crm-accent)" }}
            >
              Ver certificaciones
            </Link>
          </div>

          {observed.length > 0 && (
            <div
              className="mb-3 flex items-start gap-2.5 rounded-[var(--crm-radius-sm)] border p-3"
              style={{
                borderColor: "color-mix(in srgb, var(--crm-danger) 40%, transparent)",
                background: "color-mix(in srgb, var(--crm-danger) 8%, transparent)",
              }}
            >
              <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--crm-danger)" }} />
              <div className="text-sm">
                <p className="font-semibold">
                  {observed.length === 1 ? "Una certificación observada" : `${observed.length} certificaciones observadas`}{" "}
                  · {fmtMoney(observed.reduce((a, x) => a + x.amount, 0))} trabados
                </p>
                <p className="mt-0.5 text-xs text-[var(--crm-text-dim)]">{observed[0].observation}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            {pending.map((x) => (
              <Link
                key={x.id}
                to={crmPath("certificaciones")}
                className="flex items-center gap-2.5 border-b py-2.5 transition-opacity first:pt-0 last:border-b-0 hover:opacity-75"
                style={{ borderColor: "var(--crm-border)" }}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">
                    {contractName(x.contract_id)}
                  </span>
                  <span className="block text-xs text-[var(--crm-text-dim)]">
                    {x.period} · {x.units.toLocaleString("es-AR")} {x.unit_label}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-semibold">{fmtMoney(x.amount, x.currency)}</span>
                <StatusChip value={x.status} label={CERTIFICATION_STATUS_LABEL[x.status]} />
              </Link>
            ))}
            {!pending.length && <EmptyState title="Nada pendiente de facturar." />}
          </div>
        </BentoCard>

        {/* HSE */}
        <BentoCard span={5}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-base font-bold">HSE</h2>
            <Link to={crmPath("hse")} className="text-xs font-semibold" style={{ color: "var(--crm-accent)" }}>
              Ver detalle
            </Link>
          </div>

          <div
            className="flex items-center gap-3 rounded-[var(--crm-radius-sm)] border p-3"
            style={{
              borderColor: "color-mix(in srgb, var(--crm-success) 35%, transparent)",
              background: "color-mix(in srgb, var(--crm-success) 8%, transparent)",
            }}
          >
            <HardHat size={22} style={{ color: "var(--crm-success)" }} />
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--crm-success)" }}>
                {DAYS_WITHOUT_LTI} días
              </p>
              <p className="text-xs text-[var(--crm-text-dim)]">sin accidentes con días perdidos</p>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {openIncidents.map((i) => (
              <Link
                key={i.id}
                to={crmPath("hse")}
                className="flex items-start gap-2 text-sm transition-opacity hover:opacity-75"
              >
                <ColorDot color={i.severity === "grave" || i.severity === "critico" ? "red" : "yellow"} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{i.title}</span>
                  <span className="block text-xs text-[var(--crm-text-dim)]">
                    {contractName(i.contract_id)} · {fmtDate(i.occurred_at)}
                  </span>
                </span>
              </Link>
            ))}
            {!openIncidents.length && (
              <p className="text-sm text-[var(--crm-text-dim)]">Sin incidentes abiertos.</p>
            )}
          </div>
        </BentoCard>

        {/* Residuos */}
        <BentoCard span={7}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-base font-bold">Manifiestos abiertos</h2>
            <Link to={crmPath("residuos")} className="text-xs font-semibold" style={{ color: "var(--crm-accent)" }}>
              Ver residuos
            </Link>
          </div>
          <p className="mb-3 text-xs text-[var(--crm-text-dim)]">
            Sin certificado de disposición final la responsabilidad ambiental sigue siendo del
            generador.
          </p>

          <div className="flex flex-col">
            {manifests.map((m) => (
              <Link
                key={m.id}
                to={crmPath("residuos")}
                className="flex items-center gap-2.5 border-b py-2.5 transition-opacity first:pt-0 last:border-b-0 hover:opacity-75"
                style={{ borderColor: "var(--crm-border)" }}
              >
                <span className="font-mono text-xs">{m.manifest_number}</span>
                <span className="min-w-0 flex-1 truncate text-sm text-[var(--crm-text-dim)]">
                  {m.origin} · {m.quantity_tn} t
                </span>
                <span className="shrink-0 text-xs text-[var(--crm-text-dim)]">
                  {fmtDate(m.dispatched_at)}
                </span>
                <StatusChip value={m.status} label={MANIFEST_STATUS_LABEL[m.status]} />
              </Link>
            ))}
            {!manifests.length && <EmptyState title="Todos los manifiestos cerrados." />}
          </div>
        </BentoCard>

        {/* Equipos fuera de servicio */}
        {outOfService.length > 0 && (
          <BentoCard span={12}>
            <SectionTitle>Equipos fuera de servicio</SectionTitle>
            <div className="mt-3 flex flex-wrap gap-3">
              {outOfService.map((e) => (
                <Link
                  key={e.id}
                  to={crmPath(`flota/${e.id}`)}
                  className="flex items-center gap-2.5 rounded-[var(--crm-radius-sm)] border px-3 py-2 transition-colors hover:border-[var(--crm-border-strong)]"
                  style={{ borderColor: "var(--crm-border)" }}
                >
                  <ColorDot color="red" />
                  <span className="font-mono text-xs font-bold">{e.internal_code}</span>
                  <span className="text-sm text-[var(--crm-text-dim)]">{e.name}</span>
                  <StatusChip value="fuera_servicio" label={EQUIPMENT_STATUS_LABEL[e.status]} />
                </Link>
              ))}
            </div>
          </BentoCard>
        )}
      </BentoGrid>
    </>
  );
}

import { Route, Routes } from "react-router";
import CrmLayout from "./CrmLayout";
import Dashboard from "./views/Dashboard";
import Clients from "./views/Clients";
import ClientDetail from "./views/ClientDetail";
import Contracts from "./views/Contracts";
import ContractShell from "./views/ContractShell";
import ContractOverview from "./views/contract/ContractOverview";
import ContractWorkOrders from "./views/contract/ContractWorkOrders";
import ContractSchedule from "./views/contract/ContractSchedule";
import ContractEquipment from "./views/contract/ContractEquipment";
import ContractCertifications from "./views/contract/ContractCertifications";
import ContractHse from "./views/contract/ContractHse";
import ContractQuotes from "./views/contract/ContractQuotes";
import ContractInvoices from "./views/contract/ContractInvoices";
import WorkOrders from "./views/WorkOrders";
import Fleet from "./views/Fleet";
import EquipmentDetail from "./views/EquipmentDetail";
import Maintenance from "./views/Maintenance";
import Certificates from "./views/Certificates";
import Certifications from "./views/Certifications";
import Quotes from "./views/Quotes";
import Invoices from "./views/Invoices";
import Hse from "./views/Hse";
import Waste from "./views/Waste";
import Personnel from "./views/Personnel";
import Settings from "./views/Settings";
import NotFound from "./views/NotFound";
import "./crm.css";

/**
 * Panel de gestión de muestra — servicios a yacimiento.
 *
 * Se monta bajo /software/panel-crm/* fuera del chrome del portfolio (sin
 * navbar, cursor custom ni smooth scroll), porque un panel de gestión necesita
 * su propio layout y scroll nativo.
 */
export default function PanelCrm() {
  return (
    <Routes>
      <Route element={<CrmLayout />}>
        <Route index element={<Dashboard />} />

        {/* Operación */}
        <Route path="contratos" element={<Contracts />} />
        <Route path="contratos/:contractId" element={<ContractShell />}>
          <Route index element={<ContractOverview />} />
          <Route path="ordenes" element={<ContractWorkOrders />} />
          <Route path="programacion" element={<ContractSchedule />} />
          <Route path="equipos" element={<ContractEquipment />} />
          <Route path="certificaciones" element={<ContractCertifications />} />
          <Route path="hse" element={<ContractHse />} />
          <Route path="cotizaciones" element={<ContractQuotes />} />
          <Route path="facturas" element={<ContractInvoices />} />
        </Route>
        <Route path="ordenes" element={<WorkOrders />} />

        {/* Activos */}
        <Route path="flota" element={<Fleet />} />
        <Route path="flota/:equipmentId" element={<EquipmentDetail />} />
        <Route path="mantenimiento" element={<Maintenance />} />
        <Route path="habilitaciones" element={<Certificates />} />

        {/* Comercial */}
        <Route path="clientes" element={<Clients />} />
        <Route path="clientes/:clientId" element={<ClientDetail />} />
        <Route path="cotizaciones" element={<Quotes />} />
        <Route path="certificaciones" element={<Certifications />} />
        <Route path="facturacion" element={<Invoices />} />

        {/* Cumplimiento */}
        <Route path="hse" element={<Hse />} />
        <Route path="residuos" element={<Waste />} />

        {/* Empresa */}
        <Route path="personal" element={<Personnel />} />
        <Route path="ajustes" element={<Settings />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

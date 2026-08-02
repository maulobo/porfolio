/** Ruta raíz del panel de muestra dentro del portfolio. */
export const CRM_BASE = "/software/panel-crm";

/** Arma un enlace absoluto dentro del panel: crmPath("clientes/c-1"). */
export function crmPath(segment = "") {
  const clean = segment.replace(/^\/+/, "");
  return clean ? `${CRM_BASE}/${clean}` : CRM_BASE;
}

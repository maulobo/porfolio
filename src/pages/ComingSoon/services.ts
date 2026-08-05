import { serviceLinks, type ServiceLink } from "../../components/common/navbar/navigation";

/** Busca el servicio por ruta para no duplicar copys entre navbar y página. */
export const getServiceByPath = (path: string): ServiceLink => {
  const service = serviceLinks.find((item) => item.path === path);

  if (!service) {
    throw new Error(`No hay servicio configurado para la ruta ${path}`);
  }

  return service;
};

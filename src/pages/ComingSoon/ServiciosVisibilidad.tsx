import ComingSoonService from "./ComingSoonService";
import { getServiceByPath } from "./services";

const ServiciosVisibilidad = () => (
  <ComingSoonService service={getServiceByPath("/servicios/visibilidad")} />
);

export default ServiciosVisibilidad;

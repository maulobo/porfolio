import ComingSoonService from "./ComingSoonService";
import { getServiceByPath } from "./services";

const ServiciosWeb = () => <ComingSoonService service={getServiceByPath("/servicios/web")} />;

export default ServiciosWeb;

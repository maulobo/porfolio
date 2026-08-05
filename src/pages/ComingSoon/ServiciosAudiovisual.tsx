import ComingSoonService from "./ComingSoonService";
import { getServiceByPath } from "./services";

const ServiciosAudiovisual = () => (
  <ComingSoonService service={getServiceByPath("/servicios/audiovisual")} />
);

export default ServiciosAudiovisual;

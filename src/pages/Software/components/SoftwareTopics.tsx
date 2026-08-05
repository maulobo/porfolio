import SoftwareSectionHead, { type SoftwareShape } from "./SoftwareSectionHead";

type Topic = {
  title: string;
  body: string;
};

type SoftwareTopicsProps = {
  title: string;
  body: string | readonly string[];
  items: readonly Topic[];
  shape: SoftwareShape;
  /** Columnas máximas en escritorio. */
  columns?: 3 | 4;
  white?: boolean;
};

/**
 * Sección de retícula: cabecera y celdas con título y descripción. La usan el
 * diagnóstico del problema, el alcance de la solución y las capas del sistema.
 */
const SoftwareTopics = ({
  title,
  body,
  items,
  shape,
  columns = 3,
  white = false,
}: SoftwareTopicsProps) => (
  <section className={`software-section${white ? " software-section--white" : ""}`}>
    <div className="software-section__inner">
      <SoftwareSectionHead title={title} body={body} shape={shape} />

      <div className={`software-grid software-grid--${columns === 4 ? "four" : "three"}`}>
        {items.map((item) => (
          <article key={item.title} className="software-grid__cell">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SoftwareTopics;

export type SoftwareShape = "one" | "two" | "three";

const SHAPE_SOURCES: Record<SoftwareShape, string> = {
  one: "/iconOne.svg",
  two: "/iconTwo.svg",
  three: "/iconTree.svg",
};

type SoftwareSectionHeadProps = {
  title: string;
  /** Uno o varios párrafos de bajada. */
  body?: string | readonly string[];
  /** Marca que identifica la sección. */
  shape: SoftwareShape;
};

/**
 * Cabecera común a todas las secciones: marca decorativa a la izquierda,
 * título y bajada a la derecha. Da el ritmo institucional de la página.
 */
const SoftwareSectionHead = ({ title, body, shape }: SoftwareSectionHeadProps) => {
  const paragraphs = body === undefined ? [] : typeof body === "string" ? [body] : body;

  return (
    <div className="software-head">
      <SoftwareShapeMark shape={shape} />
      <div>
        <h2 className="software-head__title">{title}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="software-head__body">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

/** Marca sola, para las cabeceras que no usan el layout completo. */
export const SoftwareShapeMark = ({ shape }: { shape: SoftwareShape }) => (
  /* El modificador tiñe la línea con el color propio de cada marca. */
  <div className={`software-head__mark software-head__mark--${shape}`}>
    <img className="software-head__shape" src={SHAPE_SOURCES[shape]} alt="" aria-hidden="true" />
  </div>
);

export default SoftwareSectionHead;

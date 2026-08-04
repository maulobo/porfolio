const screenshots = [
  {
    src: "/software/1.png",
    alt: "Resumen operativo",
    width: 2996,
    height: 1540,
  },
  {
    src: "/software/2.png",
    alt: "Seguimiento comercial",
    width: 2998,
    height: 1548,
  },
  {
    src: "/software/3.png",
    alt: "Gestión de equipos",
    width: 3006,
    height: 1390,
  },
] as const;

const SoftwareShowcase = () => (
  <section className="software-showcase">
    <div className="software-showcase__intro">
      <p className="software-label">Ejemplo de software</p>
      <h2>Una interfaz para ver, decidir y actuar.</h2>
      <p className="software-section-copy">
        Mostramos una plataforma operativa de demostración. Las pantallas permiten recorrer
        información comercial, equipos y estados de trabajo.
      </p>
    </div>

    <div className="software-showcase__gallery grid grid-cols-1 lg:grid-cols-3">
      {screenshots.map((screenshot, index) => (
        <figure
          key={screenshot.src}
          className={`software-showcase__figure software-showcase__figure--${index + 1}`}
        >
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            loading="lazy"
          />
          <figcaption>{screenshot.alt}</figcaption>
        </figure>
      ))}
    </div>

    <a
      className="software-showcase__demo-link"
      href="/software/panel-crm"
      target="_blank"
      rel="noopener noreferrer"
    >
      Abrir demostración
    </a>
  </section>
);

export default SoftwareShowcase;

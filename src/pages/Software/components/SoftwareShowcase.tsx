import { softwareContent } from "../softwareContent";

const SoftwareShowcase = () => (
  <section className="software-showcase">
    <div className="software-showcase__intro">
      <h2>Una interfaz para ver, decidir y actuar.</h2>
      <p className="software-section-copy">
        Mostramos una plataforma operativa de demostración. Cada pantalla responde a una tarea y
        mantiene la información necesaria dentro del mismo sistema.
      </p>
    </div>

    <div className="software-showcase__stories">
      {softwareContent.productStories.map((story, index) => (
        <article
          className={`software-product-story${index % 2 ? " software-product-story--reverse" : ""}`}
          key={story.image.src}
        >
          <div className="software-product-story__copy">
            <h3>{story.title}</h3>
            <p>{story.body}</p>
          </div>
          <figure className="software-product-story__media">
            <img {...story.image} loading="lazy" />
          </figure>
        </article>
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

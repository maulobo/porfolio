import SoftwareFigure from "./SoftwareFigure";
import SoftwareSectionHead from "./SoftwareSectionHead";
import { softwarePageCopy } from "../softwareContent";

const { showcase } = softwarePageCopy;

const SoftwareShowcase = () => (
  <section className="software-section">
    <div className="software-section__inner">
      <SoftwareSectionHead title={showcase.title} body={showcase.body} shape="three" />

      <div className="software-stories">
        {showcase.stories.map((story, index) => (
          <article
            key={story.image.src}
            className={`software-story${index % 2 ? " software-story--reverse" : ""}`}
          >
            <div className="software-story__copy">
              <h3>{story.title}</h3>
              <p>{story.body}</p>
            </div>
            <SoftwareFigure {...story.image} />
          </article>
        ))}
      </div>

      <div className="software-showcase__cta">
        <a
          className="software-button software-button--demo"
          href={showcase.cta.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {showcase.cta.label}
        </a>
      </div>
    </div>
  </section>
);

export default SoftwareShowcase;

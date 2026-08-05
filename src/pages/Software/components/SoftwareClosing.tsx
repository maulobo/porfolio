import { softwarePageCopy } from "../softwareContent";

const { closing } = softwarePageCopy;

const SoftwareClosing = () => (
  <section className="software-section software-section--white">
    <div className="software-section__inner software-closing">
      <div>
        <h2>{closing.title}</h2>
        <p>{closing.body}</p>
      </div>
      <a
        className="software-button software-button--primary"
        href={closing.cta.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {closing.cta.label}
      </a>
    </div>
  </section>
);

export default SoftwareClosing;

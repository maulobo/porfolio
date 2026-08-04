import { softwarePageCopy } from "../softwareContent";

const SoftwareClosing = () => (
  <section className="software-closing">
    <div className="software-closing__copy">
      <h2>{softwarePageCopy.closing.title}</h2>
      <p>{softwarePageCopy.closing.body}</p>
    </div>
    <a
      className="software-button software-button--closing"
      href="https://wa.me/5492995831639"
      target="_blank"
      rel="noopener noreferrer"
    >
      {softwarePageCopy.closing.cta}
    </a>
  </section>
);

export default SoftwareClosing;

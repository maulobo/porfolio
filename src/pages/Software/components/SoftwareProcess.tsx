import SoftwareSectionHead from "./SoftwareSectionHead";
import { softwarePageCopy } from "../softwareContent";

const { process } = softwarePageCopy;

const SoftwareProcess = () => (
  <section className="software-section software-section--white">
    <div className="software-section__inner">
      <SoftwareSectionHead title={process.title} body={process.body} shape="one" />

      <ol className="software-steps">
        {process.steps.map((step) => (
          <li key={step.name}>
            <h3>{step.name}</h3>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default SoftwareProcess;
